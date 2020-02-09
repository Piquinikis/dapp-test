import React from 'react';
import Balance  from './components/Balance'

import './App.css';

const App = () => {

    return (
        <div className="App">
            <header className="App-header">
                <p>Enter the address of an <code>ERC20 token</code></p>

                <Balance />
            </header>
        </div>
    );
}

export default App;
