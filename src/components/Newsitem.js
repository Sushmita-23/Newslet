import React, { Component } from 'react'

export  class Newsitem extends Component {
  render() {
    let{title,description,imgurl,newsurl,author,date,source} = this.props
    return (
       
        <div className="my-3">
        <div  className="card" style={{width: "18rem"}}>
          <div style={{
            display : 'flex',
            justifyContent: 'flex-end',
            position:'absolute',
            right: '0'
          }
          }> 
       <span class="badge rounded-pill bg-danger">{source}</span></div>
          <img src={!imgurl?"https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80":imgurl}  className="card-img-top" alt="..."/>
           
            <div  className="card-body">
            <h5  className="card-title">{title} </h5>
              <p  className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsurl} target="_blank"  className="btn btn-sm btn-dark"> Read More</a>
              {/* blank target means it will open in a new tab */}
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
