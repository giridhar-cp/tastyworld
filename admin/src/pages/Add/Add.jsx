/*import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Biriyani">Biriyani</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Beef">Beef</option>
                            <option value="Prawns">Prawns</option>
                            <option value="Fish">Fish</option>
                            <option value="Duck">Duck</option>
                            <option value="Fried Rice">Fried Rice</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Porotta">Porotta</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}
export default Add;
*/
import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error('Image not selected');
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);  // Make sure this key matches your backend expectation

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding food");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept="image/*"
            id="image"
            hidden
          />
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
          </label>
        </div>

        <input
          name="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
          placeholder="Product Name"
          required
        />

        <textarea
          name="description"
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={data.description}
          placeholder="Description"
          required
        />

        <input
          type="number"
          name="price"
          onChange={(e) => setData({ ...data, price: e.target.value })}
          value={data.price}
          placeholder="Price"
          required
        />

        <select
          name="category"
          onChange={(e) => setData({ ...data, category: e.target.value })}
          value={data.category}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Biriyani">Biriyani</option>
          <option value="Chicken">Chicken</option>
          <option value="Beef">Beef</option>
          <option value="Prawns">Prawns</option>
          <option value="Fish">Fish</option>
          <option value="Duck">Duck</option>
          <option value="Fried Rice">Fried Rice</option>
          <option value="Noodles">Noodles</option>
          <option value="Porotta">Porotta</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
