import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, desc, ImgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={ImgUrl} className="card-img-top" alt="...loading" />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1' ,left:'75%' }}>
               {source ? source : null}
              </span>
            </h5>
            <p className="card-text">{desc}...</p>
            <footer className="blockquote-footer" >
              By {author} on {new Date(date).toUTCString()}
            </footer>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
