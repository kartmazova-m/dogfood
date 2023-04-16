import s from "../../components/Product/Product.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";
import Product from "../../components/Product/Product";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import useApi from "../../hooks/useApi";

const ProductPage = () => {
  const { productId } = useParams();
  const { handleLike } = useContext(CardContext);
  const handleGetProduct = useCallback(
    () => api.getProductById(productId),
    [productId]
  );
  const { data: product, setData: setProduct, isLoading, error: isError } = useApi(handleGetProduct);

  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    })

  }, [product, setProduct, handleLike]);

  return (
    <>
      {isLoading ? (
        <div className={s.wrapperLoader}>
          <Spinner />
        </div>
      ) : (
        !isError && (
          <Product
            {...product}
            onProductLike={handleProductLike}
          />
        )
      )}
      {isError ? <NotFoundPage /> : null}
    </>
  );
};

export default ProductPage;
