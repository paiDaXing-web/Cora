import React from 'react';
import './Button.css';

interface propsTypes {
  text: string;
  onClick: () => void;
  children: string;
}
export const Button = (props: propsTypes) => {
  return (
    <button className="btn" onClick={props.onClick}>
      <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className="css-1lc17o4-icon-svg"
      >
        <defs>
          <path id="play-arrow_svg__a" d="M8 5v14l11-7z"></path>
          <mask id="play-arrow_svg__b">
            <use fillRule="evenodd" xlinkHref="#play-arrow_svg__a"></use>
          </mask>
        </defs>
        <g fillRule="evenodd">
          <use xlinkHref="#play-arrow_svg__a"></use>
          <g fillRule="nonzero" mask="url(#play-arrow_svg__b)">
            <path d="M0 0h24v24H0z"></path>
          </g>
        </g>
      </svg>
      <span>{props.children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="currentColor"
        className="e17b2gky1 "
      >
        <path
          fillRule="evenodd"
          d="M16.293 9.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 13.586l4.293-4.293z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};
