import React, { useState } from 'react';
import FetchPayments from '../components/DashBoard/PaymentTable';
import { Datepicker } from 'flowbite-react';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

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
