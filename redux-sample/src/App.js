import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Articles from './components/articles'


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Redux</h1>
                </header>
                <div className="App-intro">
                    <Articles/>
                </div>
            </div>
        );
    }
}

export default App;
