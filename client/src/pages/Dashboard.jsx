import React, { useState } from 'react';
import FetchPayments from '../components/DashBoard/PaymentTable';
import { Datepicker } from 'flowbite-react';
import { useSelector } from 'react-redux';
import NotFounded from '../components/NotFounded';
function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };
  const {currentUser} = useSelector(state => state.user)
  if(!currentUser.roles.includes('Manager')){
    return <NotFounded/>
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
