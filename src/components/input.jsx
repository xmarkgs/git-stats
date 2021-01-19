import { React } from 'react';

const Input = ({ onKeyPress, onChange, value }) => (
    <input
    type="text"
    onChange={onChange}
    value={value}
    placeholder="Enter username..." 
    className="searchInput"
    onKeyPress={onKeyPress} />
);


export default Input;