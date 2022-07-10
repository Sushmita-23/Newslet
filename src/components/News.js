import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  Capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    console.log("hellow");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.Capitalize(this.props.category)} - Newslet`;
  }
  
 
  async update(){     
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d0e31f8ba046678a986d16af599166&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    // ${this.props.apiKey}
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      page: this.state.page,
      articles: parsedData.articles,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // console.log("cdm executes after render");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d0e31f8ba046678a986d16af599166&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    this.update();
  }
   
  prev = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d0e31f8ba046678a986d16af599166&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({
      page: this.state.page - 1})
      this.update()
    
  }

  next = async () => {
    // console.log("Next")
    // // if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54d0e31f8ba046678a986d16af599166&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({
      page: this.state.page + 1 })
      this.update()
   
  }




  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'35px 0px'}}>Newslet - Top {this.Capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((ele) => {
            return <div className="col-md-4" key={ele.url}>
              <Newsitem title={ele.title} description={ele.description} imgurl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.prev}>  &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.next}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
