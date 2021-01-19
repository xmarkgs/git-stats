import { React, Component } from 'react';
import Header from '../components/header.jsx';
import Input from '../components/input.jsx';

class SearchApp extends Component {
    state = {
        inputValue: '',
        searchQuery: '',
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            inputValue: value,
        });
    }

    findUserData = ({ key }) => {
        const { inputValue } = this.state;

        if (inputValue.length >= 5 && key === 'Enter') { 
            this.setState({
                searchQuery: inputValue
            });
        }
    }

    render() {
        const { inputValue, searchQuery } = this.state;
        let containerClass;
        console.log(`The searchQuery is: ${searchQuery}`);
        searchQuery.length >= 5 ? containerClass = "container containerWithContent" : containerClass = "container containerWithoutContent";


        return (
            <div className={containerClass}>
                <Header />
                <Input onKeyPress={this.findUserData} onChange={this.handleInputChange} value={inputValue} />
            </div>
        )
    }
}

export default SearchApp;