import s from "./Header.module.css";
 import { Children } from 'react';
import cn from 'classnames'
 
 const Header = ({children}) => {
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
 };

 export default Header;