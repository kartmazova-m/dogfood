import { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
import s from "./FavouritesPage.module.css";
import { CardContext } from "../../context/cardContext";
import ContentHeader from "../../components/ContentHeader/ContentHeader";

const FavouritesPage = () => {

    const { favourites } = useContext(CardContext)

  return (
    <>
    <ContentHeader title='Избранное' />
      <Sort />
      <div>
        <CardList cards={favourites} />
      </div>
    </>
  );
};

export default FavouritesPage;
