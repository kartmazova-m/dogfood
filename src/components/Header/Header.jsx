import s from "./Header.module.css";
import cn from 'classnames'

 const Header = ({user, updateUserHandle, children}) => {
    console.log('user---> ', user);
    // const handleClickEdit = (e) => {
    //     e.preventDefault();
    //     updateUserHandle({name: "Маргарита Картмазова", about: 'Студент'})
    // }
    return (
        <header className={cn(s.header, 'js-click')}>
            <div className="container">
                {/* {user?.email && <span>{user?.email}</span>}
                {user?.name && <span>{user?.name}</span>} */}
                {/* < onClick={handleClickEdit}>Изменить</> */}
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
 };

 export default Header;