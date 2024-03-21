import React,{useState,useEffect} from 'react'
import { Table,Button } from 'flowbite-react'
import { MdDone } from "react-icons/md";
function Serving() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null); // Reset previous errors
      try {
        const response = await fetch('/api/orders/in_serve');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    const handleServeButtonClick = async (orderId) => {
        try {
            const response = await fetch(`/api/orders/detail-status/${orderId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  status: 'served',
                }),
              });
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchOrders();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
      fetchOrders();
    }, []);
  return (
    <div className='flex justify-center'>      
    <Table className='mx-3'>
    <Table.Head>
      <Table.HeadCell  className='bg-green-500'>
        Meal Ready To Served
      </Table.HeadCell>
    </Table.Head>
    <Table.Body>
        {orders.map((order) => (
            <Table.Row key={order._id}>
            <Table.Cell>{order.table}</Table.Cell>
            <Table.Cell>{order.itemName}</Table.Cell>
            <Table.Cell>{order.quantity}</Table.Cell>
            <Table.Cell>
                <Button onClick={() =>handleServeButtonClick(order._id)} color='default'><MdDone/></Button>
            </Table.Cell>
            </Table.Row>
        ))}
      </Table.Body>
  </Table></div>
  )
}

export default Serving