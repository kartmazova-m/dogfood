import './index.css';
import cn from 'classnames';
import { ReactComponent as Save } from './save.svg';
import { isLiked, calcDiscountPrice } from '../../utils/products';
import { Link } from "react-router-dom";


function Card({ name, price, discount, wight, pictures, available, description, tags, currentUser, onProductLike, likes, _id }) {
    const discountPrice = calcDiscountPrice(price, discount);
    const liked = isLiked(likes, currentUser?._id);

    const handleLikeClick = () => {
        console.log('click');
        onProductLike({_id, likes})
    }

    return (
        <div className='card'>
            <div className="card__sticky card__sticky_type_top-left">
                {discount !== 0 ? <span className='card__discount'>{`-${discount}%`} </span> : null}
                {tags && tags.map(tag => <span key={tag} className={cn('tag', {
                    // [`tag_type_${tag}`]: true
                    ['tag_type_new']: tag === 'new',
                    ['tag_type_sale']: tag === 'sale'
                })}>{tag}</span>)}
            </div>
            <div className='card__sticky card__sticky_type_top-right'>
                <button className={cn('card__favorite', {
                    'card__favorite_is-active': liked
                })} onClick={handleLikeClick}>
                    <Save className='card__favorite-icon' />
                </button>
            </div>
            <Link to={`/product/${_id}`} className='card__link'>
                <img src={pictures} className='card__image' alt={description} />
                <div className="card__desc">
                    <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>{price}</span>
                    {discount !== 0 && <span className="card__price card__price_type_discount">{discountPrice}&nbsp;₽</span>}
                    <span className="card__wight">{wight}</span>
                    <p className="card__name">{name}</p>
                </div>
            </Link>
            <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
        </div>
    )
}

export default Card;