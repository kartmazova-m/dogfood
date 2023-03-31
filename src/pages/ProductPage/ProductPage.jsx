import s from "../../components/Product/Product.module.css";
import { useContext, useEffect, useState } from "react";
import { isLiked } from "../../utils/products";
import api from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";
import Product from "../../components/Product/Product";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { UserContext } from "../../context/userContext";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { productId } = useParams();
  const {user: currentUser} = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    api
      .getProductById(productId)
      .then((productData) => {
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
    api.changeLikeProduct(product._id, liked).then((updateCard) => {
      setProduct(updateCard);
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
