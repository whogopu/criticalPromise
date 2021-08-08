import React from 'react'

export default function BookDetails({ bookDetails }) {

  const { title, author, year, isbn, price, image, description } = bookDetails || {};

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <img src={image} width={"180"} className="img-thumbnail" alt={title} />
        </div>
        <div className="col">
          <p className="h4">{title}</p>
          <p className="h5"> <span><i>by: </i> </span>{author}</p>
          <p className="h5">{year}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}