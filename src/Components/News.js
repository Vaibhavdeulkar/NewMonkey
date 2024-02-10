import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const update = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pagesize=${props.pageSize}`;
    props.settingProgress(10);
    let data = await fetch(url);
    props.settingProgress(30);
    let parsedData = await data.json();
    props.settingProgress(50);

    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);

    props.settingProgress(100);
  };

  useEffect(() => {
    return () => {
      let category = props.category;
      document.title =
        category.charAt(0).toUpperCase() + category.slice(1) + " | NewsMonkey";
      update();
    };
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.api_key}&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
  };

  // cosnt HandleNextClick = async () => {
  //   setState({ page: page + 1 });
  //   update();
  // };

  // const HandlePrevClick = async () => {
  //   setState({ page: page - 1 });
  //   update();
  // };

  return (
    <>
      <h4 className="text-center " style={{ marginTop: "6%" }}>
        NewsMonkey - Top{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
        Headlines{" "}
      </h4>
      <div className="position-absolute top-50 start-50 translate-middle">
        {loading && <Spinner />}
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResult}
        loader={
          <div className="position-absolute my-4 start-50 ">
            <Spinner />
          </div>
        }
      >
        <div className="container ">
          <div className="row my-4">
            {articles.map((element) => {
              if (
                element.title &&
                element.description &&
                element.urlToImage &&
                element.url
              ) {
                return (
                  <div
                    className="col-md-4 my-2 d-flex justify-content-center align-items-center"
                    key={element.url}
                  >
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
};

News.defaultProps = {
  applicationtitle: "NewsMonkey - Top Headlines",
  country: "in",
  pageSize: 6,
};

News.propTypes = {
  applicationtitle: PropTypes.string,
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;
