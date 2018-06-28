import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Articles from './components/articles'
import Reactotron from 'reactotron-react-js'

class App extends Component {
    render() {
        Reactotron.log('App js render')
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <img src="https://redux-saga.js.org/logo/0800/Redux-Saga-Logo-Landscape.png" alt="Redux Logo Landscape" width="500px" />
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
