// FloatingButton.jsx
import React from 'react';
import { Button } from 'flowbite-react';
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'; 
function FloatingButton({ onClick }) {
    const cartItems = useSelector((state) => state.cart.items.length);
    // const itemCount = cartItems.length;
  return (
    <div className="fixed  bottom-0 right-0 m-20  ">
      <Button className='h-20 w-20 rounded-full' onClick={onClick}>
        <IoCartOutline className='text-4xl'/>
            <span className="absolute bottom-0 right-0 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 transform translate-x-1/3 -translate-y-1/3">
            {cartItems}
        </span>
      </Button>
    </div>
  );
}

export default FloatingButton;
