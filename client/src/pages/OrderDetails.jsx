import React,{useState,useEffect} from 'react'
import { Table } from 'flowbite-react'
import PendingOrderDetailsTable from '../components/OrderDetails/PendingOrderDetailsTable'
import ConfirmedOrderDetailsTable from '../components/OrderDetails/ConfirmedOrderDetailsTable'
import PreparingOrderDetailsTable from '../components/OrderDetails/PreparingOrderDetailsTable'
import ServeOrderDetailsTable from '../components/OrderDetails/ServeOrderDetailsTable'
function OrderDetails() {

  return (
    <div className='flex justify-center gap-5'>
      <PendingOrderDetailsTable/>
    </div>
  )
}

export default OrderDetails