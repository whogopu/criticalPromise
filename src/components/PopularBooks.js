import React from 'react'
import Widget from './Widget'

export default function PopularBooks({ data }) {
  if (!data) return null
  
  return (
    <div className="container">
      <p className="h4">Popular Books</p>
      <Widget data={data} />
    </div>
  )
}