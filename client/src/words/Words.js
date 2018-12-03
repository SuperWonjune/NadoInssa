import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../index.css';

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
      <Link to="/create/new-word">
        <div className="card text-white bg-secondary mb-3">
          <div className="card-body">
            <h4 className="card-title">새로운 단어를 만들어보세요!</h4>
          </div>
        </div>
      </Link>
        <div className="row">
          {this.state.words === null && <p></p>}
          {
            this.state.words && this.state.words.map(word => (
              <div key={word.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/${word.title}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h4 className="card-title">{word.title}</h4>
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