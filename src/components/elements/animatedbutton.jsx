import React from "react"
import { Link } from 'gatsby'
import '../../styles/components/elements/button.scss'

export default function AnimatedButton(props) {

  const { internal, href, children } = props;

  return (
    internal ?
    <Link to={href || '#'} {...props}>
      {children}
    </Link>
    :
    <a {...props}>
      {children}
    </a>
  )
}
