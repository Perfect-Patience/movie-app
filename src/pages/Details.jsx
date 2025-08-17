import React from 'react'
import { useParams } from 'react-router'

function Details() {
    const {id} = useParams()
    console.log(id)
  return (
    <div></div>
  )
}

export default Details