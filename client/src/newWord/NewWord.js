import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import {Link} from 'react-router-dom';

class NewWord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      content: '',
    };
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

  async submit() {

    if (this.state.title === '') {
      alert("단어 이름이 비었습니다.");
      return;
    }

    if (this.state.content === '') {
      alert("설명이 비었습니다.");
      return;
    }

    this.setState({
      disabled: true,
    });

    await axios.post('http://www.inssawiki.ml:8080/api/word', {
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
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateTitle(e.target.value)}}
                    className="form-control"
                    placeholder="단어를 입력하세요"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateContent(e.target.value)}}
                    className="form-control"
                    rows="20"
                    placeholder="설명을 입력하세요"
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary btn-space"
                  onClick={() => {this.submit()}}>
                  입력
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

export default withRouter(NewWord);