import s from './Button.module.css';
import cn from 'classnames';
import React from 'react';

function Button ({type, children}) {
    return (
        <button className={cn(s.button, {
            [s.primary]: type === 'primary',  //[если пришел type со значением primary, то установить класс primary]
            [s.secondary]: type === 'secondary'
        })}>
            {children}
        </button>
    )
}


export default Button;