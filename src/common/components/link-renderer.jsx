/* eslint-disable */
import React from 'react';

export default function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
