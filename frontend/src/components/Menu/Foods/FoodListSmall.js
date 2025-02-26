import React, { useEffect, useState, useRef } from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import useFetch from '../../../useFetch'
import { useDispatch,useSelector } from 'react-redux'
import './foodlistsmall.css'
import Carousel from '../Carousel/Carousel'
import { cartActions } from '../../../store/cartSlice'
import Cart from '../Cart/Cart'

const FoodListSmall = () => {
    //====================Fetch Data dari API==============================
    const {data:foods,isPending,error} = useFetch('http://localhost:5000/api/foods')
    const [data, setData] = useState(foods)
    useEffect(()=>{
        setData(foods)
    },[foods])

     //==================BUAT CAROUSEL CATEGORY======================================
    const catCarousel = useRef()
    const [width,setWidth] = useState(0);
    useEffect(()=>{
        setWidth(catCarousel.current.scrollWidth - catCarousel.current.offsetWidth)
    },[])

    const filterResult = (catItem) => {
        const result = foods.filter((curDate) => {
            return curDate.category === catItem;
        });
        setData(result)
    }

    //==================================================================
    //==================BUAT SEARCH======================================
    const [filter,setFilter] = useState('')
    const searchText = (e) => {
        setFilter(e.target.value)
    }

    let dataSearch = data.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
    })
    //==================================================================
    //============Redux=============================================
    const dispatch = useDispatch();
    let total = 0
    const itemsList = useSelector((state) => state.cart.itemsList);
    itemsList.forEach((item) => {
        total += item.totalPrice;
    });
    const addToCart = (i) => {
        dispatch(
            cartActions.addToCart({
                name :data[i].name,
                _id:data[i]._id,
                price:data[i].price,
                image:data[i].image
            })
        )
        setCounter(itemsList[i].quantity)
    } 
    const [counter,setCounter] = useState()
    return (
        <>
        <div className='food-list'>
        <div className="search-cont">
            <input 
                type="text" 
                className='search-bar'
                value={filter}
                placeholder='What Would You Like ?'
                onChange={searchText.bind(this)}
                />
        </div>
        {/* <Carousel /> */}
        <div className="category-lookup">
            {dataSearch.map((food) => (    
            <motion.div className='cat-item'>
                <button className='category-btn' onClick={()=> filterResult(food.category)}>{food.category}</button>
            </motion.div>
            ))}
        </div>
        <div className="category-btn-cont">
        <motion.div ref={catCarousel} className='category-carousel'>
            <motion.div 
                drag="x" 
                className='cat-inner-carousel'
                dragConstraints={{right:0,left: -width}}
                >
                    <motion.div className='cat-item'>
                        <button className='category-btn' onClick={()=> setData(foods)}>All</button>
                    </motion.div>
                    <motion.div className='cat-item'>
                        <button className='category-btn' onClick={()=> filterResult('Signature')}>Signature</button>
                    </motion.div>

                    <motion.div className='cat-item'>
                        <button className='category-btn' onClick={()=> filterResult('Coffee')}>Coffee</button>
                    </motion.div>

                    <motion.div className='cat-item'>  
                        <button className='category-btn' onClick={()=> filterResult('Manual Brew')}>Manual Brew</button>
                    </motion.div>

                    <motion.div className='cat-item'>       
                        <button className='category-btn' onClick={()=> filterResult('Milk Base')}>Milk Base</button>
                    </motion.div>

                    <motion.div className='cat-item'>  
                        <button className='category-btn' onClick={()=> filterResult('Refreshment')}>Refreshment</button>
                    </motion.div>

                    <motion.div className='cat-item'>  
                        <button className='category-btn' onClick={()=> filterResult('Tea')}>Tea</button>
                    </motion.div>

                    <motion.div className='cat-item'>  
                        <button className='category-btn' onClick={()=> filterResult('Main Course')}>Main Course</button>
                    </motion.div>

                    <motion.div className='cat-item'>  
                        <button className='category-btn' onClick={()=> filterResult('Snack')}>Snacks</button>
                    </motion.div>
                </motion.div>
        </motion.div>              
        </div>
         <div className="food-list-cont">
            {dataSearch.map((value,index)=>(
           
            <div className="food-item" key={value._id} >
            <img src={`http://localhost:5000/${value.image}`} alt="" className='food-img'/>
            <div className="food-info">
                <p className="food-name">{value.name}</p>
                <p className="food-desc">{value.description}</p>
                <div className="price-cont">
                    <p className='food-price'>{`Rp.${value.price}`}</p>
                    {/* {counter && itemsList[index].quantity > 1 && <button>ADDDDDD</button>} */}
                    {value.status === "Available" && <button className='add-btn-sm' onClick={() => addToCart(index)} >Add Item</button>}
                    {value.status === "Out" && <p className='out-desc-sm'>Out of Stock</p>}
                </div>
            </div>
            </div>
            
        ))}
        </div>
        </div>
        {total && <Cart total={total}/>} 
    </>
  )
}

export default FoodListSmall