import { Button, Modal,List, Alert } from 'flowbite-react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { clearCart,setError,setLoading } from "../../redux/cartReducer";
import { io } from 'socket.io-client';
function OrderDetailsConfirmModal({ openModal, setOpenModal ,orderId }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isLoading = useSelector((state) => state.cart.loading);
    const [socket,setSocket] = useState(null);
    const [message,setMessage] = useState('');
    const [status ,setStatus] = useState('');

    useEffect(() => {
      const socket = io('http://localhost:8085');
      socket.on("connect", () => {
        console.log("Connected to server");
      });
      setSocket(socket);
    }, []);


    const handleConfirmDetails = async () => {
      const details = { orderId : orderId, listDetails : cartItems}
      dispatch(setLoading(true));
      try {
        socket.emit('add details',details);
        dispatch(clearCart());
        dispatch(setError(null));
        setStatus('success');
        setMessage('Order Details confirmed successfully');
      } catch (error) {
        dispatch(setError('There was a problem with the fetch operation'));
        setStatus('failure');
        setMessage('There was a problem with the fetch operation');
      }finally {
        dispatch(setLoading(false));
      }
      // dispatch(setLoading(true));
      // try {
      //     const response = await fetch(`/api/orders/append-details/${orderId}`, {
      //         method: 'POST',
      //         headers: {
      //             'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify(
      //             cartItems
      //             // You can add other order-related fields here
      //         ),
      //     });

      //     if (!response.ok) {
      //         throw new Error('Network response was not ok');
      //     }

      //     // Handle the response data as needed
      //     const data = await response.json();
      //     console.log('Order confirmed:', data);

      //     // Optionally clear the cart after successful confirmation
      //     dispatch(clearCart());
          // dispatch(setError(null));
          // setStatus('success');
          // setMessage('Order Details confirmed successfully');

      // } catch (error) {
      //     console.error('There was a problem with the fetch operation:', error);
          // dispatch(setError('There was a problem with the fetch operation'));
          // setStatus('failure');
          // setMessage('There was a problem with the fetch operation');
      // } finally {
      //   dispatch(setLoading(false));
      // }
  };
    const handleClearCart = () => {
        // Dispatch the clearCart action
        dispatch(clearCart());
        // Close the modal
        setOpenModal(false);
      };
      const resetStatus= () =>{
        setStatus('')
      }
  return (
    <>
    <Modal dismissible show={openModal} onClose={() => {setOpenModal(false);resetStatus()}}>
      <Modal.Header>Order Cart</Modal.Header>
      <Modal.Body>
      {cartItems.length > 0 ? (
        <List>
          {cartItems.map((item, index) => (
            <List.Item key={index}>
              Dish name : <span className='font-bold'>{item.itemName}</span> x {item.quantity}
            </List.Item>
          ))}
        </List>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
          <Button disabled={cartItems.length ===0} isProcessing={isLoading} onClick={() => handleConfirmDetails()}>Confirm All Details</Button>
          <Button disabled={cartItems.length ===0} color='failure' onClick={() => handleClearCart()}>Decline All Details</Button>
        </Modal.Footer>
        {status === 'success' && (
                <Alert color="success">{message}</Alert>
            )}
            {status === 'failure' && (
                <Alert color="failure">{message}</Alert>
            )}
    </Modal>
  </>
  )
}

export default OrderDetailsConfirmModal