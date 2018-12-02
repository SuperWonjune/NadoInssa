import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Word from './word/Word'
import Words from './words/Words'
import NewWord from './newWord/NewWord'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/create/new-word' component={NewWord}/>
        <Route exact path='/' component={Words}/>
        <Route exact path='/:wordTitle' component={Word}/>
      </div>
    );
  }
}

export default App;