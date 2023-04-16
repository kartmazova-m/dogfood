import Header from "../Header/Header";
import { useCallback, useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/products";
import { Route, Routes } from "react-router-dom";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import RegistrationForm from "../Forms/RegistrationForm/RegistrationForm";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";

function App() {
  const [cards, setCards] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const addContact = (contactInfo) => {
    setContacts([...contacts, contactInfo]);
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getProductList()])
      .then(([userData, cardData]) => {
        console.log("cardData", cardData);
        setCurrentUser(userData);
        setCards(cardData.products);
        const favouritesProducts = cardData.products.filter(item => isLiked(item.likes, userData._id));
        setFavourites(favouritesProducts);
        console.log("favouritesProducts", favouritesProducts);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRequest = () => {
    setIsLoading(true);
    api
      .search(debounceSearchQuery)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleRequest();
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
    });
  };

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id);
    return api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newCards = cards.map((card) => {
        return card._id === newCard._id ? newCard : card;
      })

      if (!liked) {
        setFavourites(prevState => [...prevState, newCard])
      } else {
        setFavourites(prevState => prevState.filter(card => card._id !== newCard._id))
      }

      setCards(newCards);
      return newCard;
    });
  }, [cards, currentUser])


  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      <CardContext.Provider
        value={{ cards, favourites, handleLike: handleProductLike }}
      >
        <Header user={currentUser} updateUserHandle={handleUpdateUser}>
          <Logo className={"logo logo_place_header"} href="/" />
          <Routes>
            <Route
              path="/"
              element={
                <Search
                  onInput={handleInputChange}
                  onSubmit={handleFormSubmit}
                />
              }
            />
          </Routes>
        </Header>

        <main className="content container">
          <SearchInfo searchText={searchQuery} searchCount={cards.length} />
          <Routes>
            <Route index element={<CatalogPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Routes>
        </main>

        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
