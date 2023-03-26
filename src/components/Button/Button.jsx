import s from './Button.module.css';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

function Button({ type = 'primary', children, onClick, href, className, ...restProps }) {
    if (href) {
        return (
          <Link
            to={href}
            className={cn(s.button, className, {
              [s.primary]: type === "primary", //[если пришел type со значением primary, то установить класс primary]
              [s.secondary]: type === "secondary",
            })} {...restProps}
          >
            {children}
          </Link>
        );
    }
  return (
    <button
      className={cn(s.button, className, {
        [s.primary]: type === "primary", //[если пришел type со значением primary, то установить класс primary]
        [s.secondary]: type === "secondary",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


export default Button;