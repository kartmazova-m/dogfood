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
        Promise.all([api.getUserInfo(), api.getProductById( '622c77e877d63f6e70967d22' )])
            .then(([userData, productData]) => {
                setCurrentUser(userData);
                setProduct(productData);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const handleRequest = () => {
        api.search(searchQuery).then(data => {
            setProduct(data);
        }).catch(err => console.error(err));
    }

    const handleProductLike = () => {
        const liked = isLiked(product.likes, currentUser._id); //ищем в массиве лайков айди текущего пользователя
        api.changeLikeProduct(product._id, liked).then((newCard) => { //В зависимости от наличия лайка отправляем завпрос 'DELETE' или 'PUT'
            const newCards = product.map((card) => {
                // console.log('Карточка в переборе', card);
                // console.log('Карточка с сервера', newCard);
                return card._id === newCard._id ? newCard : card;
            })
            setProduct(newCards);
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
                        <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
                )}

            </main>
            <Footer />
        </>
    )
}

export default ProductPage;