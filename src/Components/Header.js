
import React from 'react';
import { Button, Row } from 'react-bootstrap';

const Header = ({ toggleTheme, theme }) => {
    return (
        <div className="header">
            <div className="  text-end">
                <Button variant="secondary" onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
                </Button>
            </div>
            <h1 className="text-center my-4">Code Editor</h1>
        </div>
    );
};

export default Header;
