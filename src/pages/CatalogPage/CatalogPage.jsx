import React, { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
import { CardContext } from "../../context/cardContext";


const CatalogPage = () => {
    const { cards } = useContext(CardContext);

  return (
    <>
      <Sort />
      <CardList cards={cards} />
    </>
  );
};

export default CatalogPage;
