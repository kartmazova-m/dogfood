import s from '../../components/Product/Product.module.css';
import Logo from '../../components/Logo/Logo';
import Search from '../../components/Search/Search';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { isLiked } from '../../utils/products';
import api from '../../utils/api';
import Spinner from '../../components/Spinner/Spinner';
import Footer from '../../components/Footer/Footer';
import Product from '../../components/Product/Product';





const ProductPage = () => {
    const [product, setProduct] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductById( '64085a894ee419975fbd2eea' )])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData.products);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const handleRequest = () => {
        api.search(searchQuery).then(data => {
            setCards(data);
        }).catch(err => console.error(err));
    }

    const handleProductLike = (product) => {
        const liked = isLiked(product.likes, currentUser._id); //ищем в массиве лайков айди текущего пользователя
        api.changeLikeProduct(product._id, liked).then((newCard) => { //В зависимости от наличия лайка отправляем завпрос 'DELETE' или 'PUT'
            const newCards = cards.map((card) => {
                // console.log('Карточка в переборе', card);
                // console.log('Карточка с сервера', newCard);
                return card._id === newCard._id ? newCard : card;
            })
            setCards(newCards);
        })
    }

    return (
        <>
            <Header>
                <Logo className={'logo logo_place_header'} href='/' />
                <Search onSubmit={handleRequest} />
            </Header>
            <main className='content container'>
                {isLoading ? (
                    <div className={s.wrapperLoader}>
                        <Spinner />
                    </div>
                ) : (
                        <Product onProductLike={handleProductLike} />
                )}

            </main>
            <Footer />
        </>
    )
}

export default ProductPage;