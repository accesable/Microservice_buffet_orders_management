import React,{useState,useEffect} from 'react'
import LoadingSpinner from './LoadingSpinner';
import fetchWithAuth from '../services/fetchWithAuth';
import { Button, Table } from 'flowbite-react';
function LockMenuItem() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleStatusChange = async (itemId,status) => {
        try {
            const response = await fetchWithAuth(`/api/Items/status/${itemId}?status=${status}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchItems();
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchItems = async () => {
      try {
        // Using Fetch API to get the data
        const response = await fetchWithAuth('/api/Items');
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
    
    useEffect(() => {
    
        fetchItems();
      }, []);
    if (loading) return <div><LoadingSpinner/></div>;
    if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='flex mt-3'>
        <Table>
            <Table.Head>
                <Table.HeadCell>
                    Item Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Item Status
                </Table.HeadCell>
                <Table.HeadCell>
                    Actions
                </Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item.itemId}>
                        <Table.Cell>{item.itemName}</Table.Cell>
                        <Table.Cell>{item.isLocked ? 'Locked' : 'Unlocked'}</Table.Cell>
                        <Table.Cell>
                        {!item.isLocked ? <Button onClick={()=>handleStatusChange(item.itemId,'lock')} color='failure'>Lock</Button> : <Button onClick={()=>handleStatusChange(item.itemId,'unlock')} color='success'>Unlocked</Button>}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
  )
}

export default LockMenuItem