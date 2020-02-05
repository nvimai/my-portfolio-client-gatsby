import React from "react"
import styled from "styled-components"

const Tag = props => (
  <TagWrapper props={props}>{props.children}</TagWrapper>
)

const TagWrapper = styled.button`
  display: block;
  float: left;
  text-decoration: none;
  padding: 3px 5px;
  cursor: pointer;
  position: relative;
  border: unset;

  background: ${props => props.props.background || "black"};
  color: ${props => props.props.color || "rgb(255, 255, 255)"};
  font-size: ${props => props.props.fontSize || "10px"};
  font-weight: ${props => props.props.fontWeight || "400"};
  border-radius: ${props => props.props.radius || "0 4px 4px 0"};
  margin: ${props => props.props.margin || "3px 7px"};

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -12px;
    width: 0;
    height: 0;
    border-color: transparent #000 transparent transparent;
    border-style: solid;
    border-width: 9px 12px 9px 0;
  }
`

export default Tag
