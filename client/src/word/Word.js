import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../index.css';
import {withRouter} from 'react-router-dom';
import Words from '../words/Words';


class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
      modUrl: null,
      wordSearchData: null,
      startDate: null,
      endDate: null,
      results: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const word = (await axios.get(`http://www.inssawiki.ml:8080/api/word/${params.wordTitle}`)).data;
    this.setState({
      word,
      modUrl: '/modify/' + word.title
    });

    // 네이버 검색 API 갖고오기
    const wordSearchData = (await axios.get(`http://www.inssawiki.ml:8080/api/word/searchdata/${params.wordTitle}`)).data;
    this.setState({
      wordSearchData,
      startDate: wordSearchData.startDate,
      endDate: wordSearchData.endDate,
    })
  }

  async delete_word() {
    await axios.delete('http://www.inssawiki.ml:8080/api/word/' + this.state.word.id);
    this.props.history.push('/');
  }

  render() {
    const {word} = this.state;
    if (word === null) return <p></p>

    else if (word === '') 
    return <div className="container">
    <div className="row">
      <div className="jumbotron col-12">
        <h1 className="display-3">요청하신 단어가 '아직' 없습니다.</h1>
        <br/>
        <br/>
        <Link to= "/create/new-word">
          <button
              className="btn btn-primary btn-space">
              내가 만들거야!
            </button>
        </Link>
      </div>
    </div>
    
    <div class="text-right" >
    </div>
    </div>
    
    else {
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
        <Link to= {this.state.modUrl}>
          <button
              className="btn btn-primary btn-space">
              수정
            </button>
        </Link>
        
          <button
            className="btn btn-primary btn-space"
            onClick={() => {this.delete_word()}}>
            삭제
          </button>
        </div>

        <p>{this.state.startDate}</p>
        <p>{this.state.endDate}</p>
        <p>{this.state.results}</p>
        
      </div>
    )
    }
  }
}

export default Word;