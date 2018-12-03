import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../index.css';
import {withRouter} from 'react-router-dom';


class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const word = (await axios.get(`http://localhost:8080/api/word/${params.wordTitle}`)).data;
    this.setState({
      word,
    });
  }

  async delete_word() {
    await axios.delete('http://localhost:8080/api/word/' + this.state.word.id);
    this.props.history.push('/');
  }

  render() {
    const {word} = this.state;
    if (word === null) return <p></p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{word.title}</h1>
            <br/>
            <br/>
            <p id="p_wrap" className="lead">{word.content}</p>
          </div>
        </div>
        
        <div class="text-right" >
        <button
            className="btn btn-primary btn-space">
            수정
          </button>
          <button
            className="btn btn-primary btn-space"
            onClick={() => {this.delete_word()}}>
            삭제
          </button>
        </div>
        
      </div>
    )
  }
}

export default Word;