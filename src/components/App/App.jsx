import './App.css';
import Header from '../Header/Header';
import CardList from '../CardList/CardList';
import { useEffect, useState } from 'react';
import data from '../../data.json';
import Logo from '../Logo/Logo';
import Search from '../Search/Search'
import Footer from '../Footer/Footer'
import Button from '../Button/Button';


function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRequest = () => {
    const filterCards = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
    setCards(filterCards);
  }

  // useEffect(() => {
  //   handleRequest();
  // }, [searchQuery])


  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(inputValue) {
    setSearchQuery(inputValue);
  }
  return (
    <>
      <Header>
        <Logo className={'logo logo_place_header'} href='/' />
        <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
      </Header>
      <main className='content container'>
        <Button type="primary">Купить</Button>
        <Button type="secondary">Оплатить</Button>
        <CardList goods={cards} />
      </main>

      <Footer />

    </>
  );
}

export default App;
