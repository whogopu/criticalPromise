import React from 'react'

export default function WidgetCard({ item, index }) {

  const { title, author, year, isbn, image, description } = item;

  return (
      <div className="col-sm-4">
      <div className="card widget-card">
        <img src={image} height={180} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  )
}