import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import CardList from "../../components/CardList/CardList";


const CatalogPage = ({ isLoading, cards, handleProductLike, currentUser }) => {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CardList
          goods={cards}
          onProductLike={handleProductLike}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default CatalogPage;;
