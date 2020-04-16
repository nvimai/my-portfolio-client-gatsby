import React from "react"
import { Link } from 'gatsby'
import '../../styles/components/elements/button.scss'

export default function AnimatedButton(props) {


  return (
    
      props.isInternal ?
      <Link to={props.href} {...props}>
        {props.children}
      </Link>
      :
      <a {...props}>
        {props.children}
      </a>
  )
}
