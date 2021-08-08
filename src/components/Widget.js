import React from 'react'
import WidgetCard from './WidgetCard'

export default function Widget({ data = [] }) {

  return (
    <div className="row" >
      {
        data.map((item, index) => <WidgetCard index={index} item={item} />)
      }
    </div>
  )
}