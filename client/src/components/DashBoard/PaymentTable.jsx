import React, { useState, useEffect } from 'react';
import { Alert, Table } from 'flowbite-react';
import fetchWithAuth from '../../services/fetchWithAuth';
const FetchPayments = ({date}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching payments :', date);
        let url = '/api/Payments';
        if (date) {
          url += `?date=${date.toISOString()}`;
        }
        const response = await fetchWithAuth(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }

        const data = await response.json();
        setPayments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [date]);

  return (
    <div>
      {loading && <Alert color="info">Loading...</Alert>}
      {error && <Alert color="failure">{error}</Alert>}
      <Table hoverable>
        <Table.Head>
            <Table.HeadCell className='text-xl' colSpan={5}>
                Total Payments: {payments.length} ||
                Total Amount: ${payments.reduce((acc, payment) => acc + payment.amount, 0)}
            </Table.HeadCell>
        </Table.Head>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Order ID</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {payments.map(payment => (
            <Table.Row key={payment.id}>
              <Table.Cell>{payment.id}</Table.Cell>
              <Table.Cell>{payment.name}</Table.Cell>
              <Table.Cell>${payment.amount}</Table.Cell>
              <Table.Cell>{payment.orderId}</Table.Cell>
              <Table.Cell>{payment.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default FetchPayments;
