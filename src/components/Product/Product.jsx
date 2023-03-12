import s from './Product.module.css';
import cn from 'classnames';
import { calcDiscountPrice } from '../../utils/products'


const Product = ({ currentUser, _id, onProductLike, available, description, discount, price }) => {
    const discountPrice = calcDiscountPrice(price, discount);
    return (
        <>
            <div>
                <a href="#" className='button-back'>Назад</a>
                <h1 className={s.productTitle}>Бублик из бычьего корня</h1>
                <div>
                    <span>Артикул: <b>2388907</b></span>
                </div>
            </div>


            <div className={s.product}>
                <div className={s.imgWrapper}>
                    <img src="#" alt="product" />
                </div>
                <div className={s.desc}>
                    <span className={discount !== 0 ? s.oldPrice: s.price}>{price}</span>
                    {discount !== 0 && <span className={cn(s.price, 'card__price_type_discount')}>{discountPrice}&nbsp;₽</span>}
                </div>
            </div>
        </>
    )
}

export default Product;