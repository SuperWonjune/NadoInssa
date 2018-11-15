import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Words extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: null,
    };
  }

  async componentDidMount() {
    const words = (await axios.get('http://localhost:8080/api/words')).data;
    this.setState({
      words,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <Link to="/new-word">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-body">
                <h4 className="card-title">+ 단어 추가</h4>
              </div>
            </div>
          </Link>
          {this.state.words === null && <p></p>}
          {
            this.state.words && this.state.words.map(word => (
              <div key={word.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/word/${word.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h4 className="card-title">{word.title}</h4>
                      <p className="card-text">{word.content}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Words;