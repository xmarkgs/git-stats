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
    state = {
        inputValue: '',
        searchQuery: '',
        errorMessage: '',
    }


    handleInputChange = ({ target: { value } }) => {
        this.setState({
            inputValue: value,
        });
    }

    fetchUserData = ({ key }) => {
        const { inputValue } = this.state;

        if (inputValue.length >= 5 && key === 'Enter') { 
            this.setState({
                searchQuery: inputValue,
                inputValue: '',
                result: {},
                errorMessage: '',
            });
            fetch(`https://api.github.com/users/${inputValue}`)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json();
                
            })
            .then(result => this.setResult(result))
            .catch(error => {
                console.log('Error occured');
                this.setState({ errorMessage: 'No user with such a nickname found! Make sure you didn’t misspelled it' })
                return error;
            });
        }
    }

    setResult = result => {
        console.log(result);
        console.log(`The search query is: ${this.state.searchQuery}`)
        window.setTimeout(() => {
                this.setState({ result });
        }, 1000);  
    }

    render() {
        const { inputValue, searchQuery, result, errorMessage } = this.state;
        let containerClass;
        searchQuery.length >= 1 ? containerClass = "container containerWithContent fadeIn" : containerClass = "container containerWithoutContent fadeIn";

        return (
            <div className={containerClass}>
                <Header />
                <Input onKeyPress={this.fetchUserData} onChange={this.handleInputChange} value={inputValue} />
                {searchQuery.length >= 1 && result && errorMessage.length < 1 ? <DataComponent result={result} /> : <Error>{errorMessage}</Error>}
            </div>
        )
    }
}

export default SearchApp;

