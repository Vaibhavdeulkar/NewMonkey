import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    applicationtitle: "NewsMonkey - Top Headlines",
    country: "in",
    pageSize: 6,
  };

  static propTypes = {
    applicationtitle: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    let category = this.props.category;
    document.title =
      category.charAt(0).toUpperCase() + category.slice(1) + " | NewsMonkey";
  }

  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f8888285f94b48b7ad58035fe1165cd2&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.props.settingProgress(10);
    let data = await fetch(url);
    this.props.settingProgress(30);
    let parsedData = await data.json();
    this.props.settingProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.settingProgress(100);

  }

  async componentDidMount() {
    this.update();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f8888285f94b48b7ad58035fe1165cd2&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totaconcatlResults,
    });
  };

  // HandleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.update();
  // };

  // HandlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.update();
  // };

  render() {
    return (
      <>
        <h4 className="text-center ">
          NewsMonkey - Top{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines{" "}
        </h4>
        <div className="position-absolute top-50 start-50 translate-middle">
          {this.state.loading && <Spinner />}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<div className="position-absolute my-4 start-50 "> <Spinner  /> </div>}
        >

          <div className="container ">
            <div className="row my-4">
              {this.state.articles.map((element) => {
                if (
                  element.title &&
                  element.description &&
                  element.urlToImage &&
                  element.url
                ) {
                  return (
                    <div className="col-md-4 my-2 d-flex justify-content-center align-items-center" key={element.url}>
                      <NewsItems
                        title={element.title ? element.title.slice(0, 60) : ""}
                        desc={
                          element.description
                            ? element.description.slice(0, 150)
                            : ""
                        }
                        ImgUrl={element.urlToImage ? element.urlToImage : ""}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.id}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
