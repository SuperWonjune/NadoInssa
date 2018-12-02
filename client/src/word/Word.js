import React, {Component} from 'react';
import axios from 'axios';

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

  render() {
    const {word} = this.state;
    if (word === null) return <p></p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{word.title}</h1>
            <p className="lead">{word.content}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Word;