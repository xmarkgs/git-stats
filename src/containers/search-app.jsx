import { React, Component } from 'react';
import Header from '../components/header.jsx';
import Input from '../components/input.jsx';
import Data from '../components/data.jsx';
import Error from '../components/error.jsx';


// Preloader for fetched data

const isEmpty = (prop) => (
    prop === null ||
    prop === undefined ||
    (prop.hasOwnProperty('length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
);

const LoadingHOC = (loadingProp) => (WrappedComponent) => {
    return class LoadingHOC extends Component {
        render() {
            return isEmpty(this.props[loadingProp]) ? <div className="loader" />
                : <WrappedComponent {...this.props} />;
        }
    }
}

const DataComponent = LoadingHOC('result')(Data);


class SearchApp extends Component {
    user; 
    repos; 
    starred;

    state = {
        inputValue: '',
        searchQuery: '',
        errorMessage: '',
        result: {},
        repos: {},
        starred: {}
    }


    handleInputChange = ({ target: { value } }) => {
        this.setState({
            inputValue: value,
        });
    }

    fetchUserData = ({ key }) => {
        const { inputValue } = this.state;
        let user;
        let repos;
        let starred;

        if (inputValue.length >= 5 && key === 'Enter') {
            this.setState({
                searchQuery: inputValue,
                inputValue: '',
                result: {},
                errorMessage: '',
            });

            fetch(`https://api.github.com/users/${inputValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    console.log(data);
                    user = data;

                    // Make another API call and pass it into the stream
                    return fetch(`https://api.github.com/users/${inputValue}/repos`);

                })
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    console.log(data);
                    repos = data;

                    return fetch(`https://api.github.com/users/${inputValue}/starred`);
                })
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    console.log(data);
                    starred = data;

                    return this.setResult(user, repos, starred);
                }).catch(error => {
                    console.error(error);
                    this.setState({ errorMessage: 'No user with such a nickname found! Make sure you didn’t misspelled it' })
                    return error;
                });
        }
    }

    setResult = (result, repos, starred) => {
        console.log(`The search query is: ${this.state.searchQuery}`)
        window.setTimeout(() => {
            this.setState({ result, repos, starred });
        }, 1000);
    }

    render() {
        const { inputValue, searchQuery, result, errorMessage, repos, starred } = this.state;
        let containerClass;
        console.log(this.state);
        searchQuery.length >= 1 ? containerClass = "container containerWithContent fadeIn" : containerClass = "container containerWithoutContent fadeIn";

        return (
            <>
            <div className={containerClass}>
                <Header />
                <Input onKeyPress={this.fetchUserData} onChange={this.handleInputChange} value={inputValue} />
                {searchQuery.length >= 1 && result && errorMessage.length < 1 ? <DataComponent result={result} repos={repos} starred={starred} /> : <Error>{errorMessage}</Error>}
                
            </div>
            {/* <div className="developer fadeIn">developed by <a href="https://github.com/xmarkgs" className="author-link" target="_blank">Marko Zhyvotkov</a></div> */}
            </>
        )
    }
}

export default SearchApp;

