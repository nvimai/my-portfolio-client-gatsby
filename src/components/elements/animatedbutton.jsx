import React from "react"
import { Link } from 'gatsby'
import '../../styles/components/elements/button.scss'
import { OutboundLink } from "gatsby-plugin-google-analytics";

export default function AnimatedButton(props) {

  const { internal, href, children } = props;

  return (
    internal ?
    <Link to={href || '#'} {...props}>
      {children}
    </Link>
    :
    <OutboundLink {...props}>
      {children}
    </OutboundLink>
  )
}
