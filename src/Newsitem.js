import React, { Component } from 'react'

export class Newsitem extends Component {
    
  render() {
    let {title , description , imgUrl , newsUrl , auther , date , source} = this.props; // url coz its unique
    return (
      <div className='my-3' >
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%' , zIndex : 1}}>{source}</span>
            <img src={!imgUrl ? "https://techcrunch.com/wp-content/uploads/2022/12/gift-guide-22-coffee.jpg?resize=1200,645" : imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p> 
            <p className = "card-text" > <small className="text-muted">By {!auther ? "Unknown" : auther} :: on {new Date (date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}


export default Newsitem
