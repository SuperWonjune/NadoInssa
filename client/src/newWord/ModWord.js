import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import {Link} from 'react-router-dom';

class ModWord extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          word: '',
          disabled: false,
          title: '',
          content: '',
        };
      }
    
      async componentDidMount() {
        const { match: { params } } = this.props;
        const word = (await axios.get(`http://localhost:8080/api/word/${params.wordTitle}`)).data;
        this.setState({
          word,
          title: word.title,
          content: word.content
        });
        this.updateContent(this.content)
      }
  

  updateContent(value) {
    this.setState({
      content: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async update_word() {

    this.setState({
        disabled: true,
      });

    await axios.put('http://localhost:8080/api/word/' + this.state.word.id, {
        title: this.state.title,
        content: this.state.content,
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-body text-left">
                <div className="form-group">
                  { /* <label htmlFor="exampleInputEmail1">Title:</label> */}
                  <h1 className="display-3">{this.state.word.title}</h1>
                </div>
                <div className="form-group">
                  <textarea
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateContent(e.target.value)}}
                    className="form-control"
                    rows="20"
                    placeholder="설명을 입력하세요"
                    value = {this.state.content}
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary btn-space"
                  onClick={() => {this.update_word()}}>
                  수정
                </button>
                <Link to="/">
                  <button
                    className="btn btn-primary btn-space">
                    취소
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ModWord);