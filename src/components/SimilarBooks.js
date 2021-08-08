import React from 'react'
import Widget from './Widget'

export default function SimilarBooks({ data }) {
  if (!data) return null

  return (
    <div className="container">
          <p className="h4">Similar Books</p>
          <Widget data={data} />
    </div>
  )
}