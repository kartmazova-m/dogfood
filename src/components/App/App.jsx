import s from './App.module.css';
import Header from '../Header/Header';
import CardList from '../CardList/CardList';
import { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import api from '../../utils/api'
import SearchInfo from '../SearchInfo/SearchInfo';
import useDebounce from '../../hooks/useDebounce'
import {isLiked} from '../../utils/products'
import Spinner from '../Spinner/Spinner';


function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getProductList()])
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
    setIsLoading(true);
    // const filterCards = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
    api.search(debounceSearchQuery).then(data => {
      setCards(data);
    }).catch(err => console.error(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    handleRequest();
    console.log('INPUT', debounceSearchQuery)
  }, [debounceSearchQuery]);


  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(inputValue) {
    setSearchQuery(inputValue);
  }

  const handleUpdateUser = (userUpdate) => {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    }) 
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
      <Header user={currentUser} updateUserHandle={handleUpdateUser}>
        <Logo className={'logo logo_place_header'} href='/' />
        <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
      </Header>
      <main className='content container'>
        <SearchInfo searchText={searchQuery} searchCount={cards.length} />
        {!isLoading ? (
          <Spinner />
        ) : (
            <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
        )}
        
      </main>

      <Footer />

    </>
  );
}

export default App;
