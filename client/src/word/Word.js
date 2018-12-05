import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../index.css';
import {withRouter} from 'react-router-dom';
import Words from '../words/Words';
import {bb} from "billboard.js";


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
      chart: null
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
      endDate: wordSearchData.endDate
  })
  const chart = bb.generate({
    data: {
      x: "x",
      columns: [
       ["x", wordSearchData.startDate, wordSearchData.results[0].data[1].period,
       wordSearchData.results[0].data[2].period, wordSearchData.results[0].data[3].period, wordSearchData.results[0].data[4].period,
       wordSearchData.results[0].data[5].period, wordSearchData.results[0].data[6].period, wordSearchData.results[0].data[7].period,
       wordSearchData.results[0].data[8].period, wordSearchData.results[0].data[9].period, wordSearchData.results[0].data[10].period,
       wordSearchData.results[0].data[11].period, wordSearchData.endDate],
       ["\'"+ wordSearchData.results[0].title+"\' 검색 빈도", wordSearchData.results[0].data[0].ratio, wordSearchData.results[0].data[1].ratio,
        wordSearchData.results[0].data[2].ratio, wordSearchData.results[0].data[3].ratio,
        wordSearchData.results[0].data[4].ratio, wordSearchData.results[0].data[5].ratio,
        wordSearchData.results[0].data[6].ratio, wordSearchData.results[0].data[7].ratio,
        wordSearchData.results[0].data[8].ratio, wordSearchData.results[0].data[9].ratio,
        wordSearchData.results[0].data[10].ratio, wordSearchData.results[0].data[11].ratio, wordSearchData.results[0].data[12].ratio]
     ],
     type: "bar"
   },
   axis: {
      x: {
          type: "timeseries",
          tick: {
              count: 13,
              format: "%Y-%m"
          }
      },
      y: {
        label: {
            text: "단위: %(퍼센트)",
            position: "outer-middle",
        },
        padding: {
          top: 5,
          bottom: 0
      }
    }
    },
    bindto: "#chart"
})
console.log(wordSearchData.results[0].data[0].ratio);
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
        <div id="chart"> </div>
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
        
       
        
      </div>
    )
    }
  }
}

export default Word;