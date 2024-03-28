import React, { useState } from 'react';
import FetchPayments from '../components/DashBoard/PaymentTable';
import { Datepicker } from 'flowbite-react';
import { useSelector } from 'react-redux';
function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };
  const {currentUser} = useSelector(state => state.user)
  if(currentUser.roles.includes('Chief Staff')){
    return <h1>Unauthorized Route</h1>
  }

  return (
    <>
      <div className='flex m-1'>
        <div>
          <Datepicker onSelectedDateChanged={handleDateChange} />
        </div>
      </div>
      <FetchPayments date={selectedDate} />
    </>
  );
}

export default Dashboard;
