import React,{useState} from 'react'
import { Badge, Card } from 'flowbite-react'
import { Button } from 'flowbite-react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
function FoodCard({itemId,itemName,itemDescription,itemPrice,itemImage,isLocked,isCharged}) {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Create an object for the item
        const item = { itemId, itemPrice , itemName, quantity , totalPrice : itemPrice * quantity};
    
        // Dispatch the action
        dispatch(addToCart(item));
    
        alert(`${itemName} added to cart!`); // Optional: for immediate user feedback
      };
      const handleChange = (event) => {
        const value = event.target.value;
        setQuantity(Math.max(1, Math.min(5, Number(value)))); // Clamp value to range [1, 10]
      };
  return (
    <div>
        <Card
        key={itemId}
        id={itemId}
        className="max-w-sm opacity-90 hover:opacity-100"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={`http://localhost:5267/ImageStaticFiles${itemImage}`}
        >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {itemName}
        </h5>
        <h1 className='hidden'>{itemId}</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
            {itemDescription}
        </p>
        {/* {isCharged &&
        <p className="font-bold text-gray-900 dark:text-white">
            <Badge className='inline'>This Food Item is Charged ${itemPrice}</Badge> 
        </p> } */}

        <div className="flex flex-wrap gap-2">
            {isLocked ? <Badge color='failure' className='text-lg'>This Food Item is not Available</Badge> : 
              <>
            <Button
            className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
            onClick={handleAddToCart}
            >
            Add to Cart
            </Button>

            <input type="number" name="quantity" min={1} max={5} id="quantity" className='rounded-xl w-15' value={quantity} // Controlled component
      onChange={handleChange} />
              </>
            }
        </div>
        </Card>
    </div>
  )
}

export default FoodCard