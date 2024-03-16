import React,{useEffect,useState} from 'react'
import TableRowOrderDetailTable from './TableRowOrderDetailTable';
import { Table } from 'flowbite-react'
import LoadingSpinner from '../LoadingSpinner';
function PendingOrderDetailsTable() {
    const [orderdetails, setOrderDetails] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
          setIsLoading(true);
          setError(null); // Reset previous errors
    
          try {
            const response = await fetch('http://localhost:8085/api/orders/pending');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setOrderDetails(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchOrders();
      }, []);
        if (isloading) {
            return <div><LoadingSpinner/></div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
  return (
    <div>
    <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Dish name</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Table ID</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {orderdetails.map((detail) => (
                <React.Fragment key={detail._id}>
                    <TableRowOrderDetailTable detail={detail}/>
                </React.Fragment>
            ))}
        </Table.Body>
    </Table>
    </div>
  )
}

export default PendingOrderDetailsTable