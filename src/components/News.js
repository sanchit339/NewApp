import React, { Component } from "react";
import Newsitem from "../Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 3,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults : 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsDonkey`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?countryhttps://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eb1e2b398564355a4d1b273358a6e0dcd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({
      totalResults: parsedData.articles,
      articles: parsedData.articles,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?countryhttps://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77ad305d349d452eb20ea52ba52852cd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({
      totalResults: this.state.articles.concat(parsedData.articles),
      articles: parsedData.articles,
      loading: false,
    })
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          Fake HeadLines on {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    auther={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
        
      </div>
    );
  }
}

export default News;
