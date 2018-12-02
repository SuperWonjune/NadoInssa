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
        <Route exact path='/' component={Words}/>
        <Route exact path='/:wordTitle' component={Word}/>
        <Route path='/new-word' component={NewWord} />
      </div>
    );
  }
}

export default App;