/*import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import Image from 'next/image';

const FoodItem = ({ image, name, price, desc , id }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={url+"/images/"+image} alt="" />
                {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem
*/

import React, { useContext } from 'react';
import Image from 'next/image';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const { cartItems, addToCart, removeFromCart, currency } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                {/* Use Next.js Image for better performance */}
                <Image
                    className='food-item-image'
                    src={`/images/${image}`} // Make sure images are in `public/images/`
                    alt={name}
                    width={200}
                    height={200}
                    priority
                />

                {!cartItems[id] ? (
                    <Image
                        className='add'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to Cart"
                        width={30}
                        height={30}
                    />
                ) : (
                    <div className="food-item-counter">
                        <Image
                            src={assets.remove_icon_red}
                            onClick={() => removeFromCart(id)}
                            alt="Remove"
                            width={30}
                            height={30}
                        />
                        <p>{cartItems[id]}</p>
                        <Image
                            src={assets.add_icon_green}
                            onClick={() => addToCart(id)}
                            alt="Add More"
                            width={30}
                            height={30}
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <Image
                        src={assets.rating_starts}
                        alt="Rating"
                        width={100}
                        height={20}
                    />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
}

export default FoodItem;
