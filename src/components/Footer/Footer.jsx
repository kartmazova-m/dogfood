import './index.css';
import telegram from "./img/telegram.svg";
import instagram from "./img/instagram.svg";
import viber from "./img/viber.svg";
import whatsapp from "./img/whatsapp.svg";
import vk from "./img/vk.svg";
import Logo from '../Logo/Logo';

function Footer() {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__wrapper">
                    <div>
                        <Logo />
                        <p className='footer__copyright'>© «Интернет-магазин DogFood.ru»</p>
                    </div>
                    <div className="footer__col">
                        <a href="#">Каталог</a>
                        <a href="#">Акции</a>
                        <a href="#">Новости</a>
                        <a href="#">Отзывы</a>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer;