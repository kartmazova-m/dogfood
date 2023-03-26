import s from "../../components/Product/Product.module.css";
import { useEffect, useState } from "react";
import { isLiked } from "../../utils/products";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";
import Product from "../../components/Product/Product";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const ProductPage = ({ currentUser }) => {
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api
      .getProductById(productId)
      .then(([productData]) => {
        setProduct(productData);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRequest = () => {
    api
      .search(searchQuery)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error(err));
  };

  const handleProductLike = () => {
    const liked = isLiked(product.likes, currentUser._id); //ищем в массиве лайков айди текущего пользователя
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      //В зависимости от наличия лайка отправляем завпрос 'DELETE' или 'PUT'
      const newCards = product.map((card) => {
        return card._id === newCard._id ? newCard : card;
      });
      setProduct(newCards);
    });
  };

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
            currentUser={currentUser}
            onProductLike={handleProductLike}
          />
        )
      )}
      {isError ? <NotFoundPage /> : null}
    </>
  );
};

export default ProductPage;
