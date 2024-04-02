import React , {useState,useEffect} from 'react'
import FoodCard from '../components/FoodCard'
import { useParams } from 'react-router-dom';
import FloatingButton from '../components/OrderDetails/FloatingAddDetailsBtn';
import OrderDetailsConfirmModal from '../components/OrderDetails/OrderDetailsConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';
import fetchWithAuth from '../services/fetchWithAuth';
import { useSelector } from 'react-redux';
import NotFounded from '../components/NotFounded';
function Menu() {
  const { orderId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {currentUser} = useSelector(state => state.user)
    if(currentUser.roles.includes('Chief Staff')){
      return <NotFounded/>
    }

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    useEffect(() => {
        const fetchItems = async () => {
          try {
            // Using Fetch API to get the data
            const response = await fetchWithAuth('/api/Items',{
              method:'GET',
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItems(data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchItems();
      }, []);
    if (loading) return <div><LoadingSpinner/></div>;
    if (error) return <div>Error: {error.message}</div>;


  return (
    <div className='flex flex-wrap gap-4 justify-start'>
{items.map((item) => (
        <FoodCard
        key={item.itemId}
        itemId={item.itemId}
          itemImage={item.images.length > 0 ? item.images[0].imageUrl : img}
          itemName={item.itemName}
          itemDescription={item.itemDescription}
          itemPrice={item.originalPrice}
          isLocked={item.isLocked}
          isCharged={item.isCharged}
        />
      ))}
      <FloatingButton onClick={handleOpenModal}/>
      <OrderDetailsConfirmModal openModal={isModalOpen} setOpenModal={setIsModalOpen} orderId={orderId} />
    </div>
  )
}

export default Menu