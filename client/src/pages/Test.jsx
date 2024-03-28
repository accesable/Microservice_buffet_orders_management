import React from 'react'
import { CustomKanban } from '../components/NotionKaban'
import LockMenuItem from '../components/LockMenuItem'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Test() {
  const {currentUser} = useSelector(state => state.user)
  if(!currentUser.roles.includes('Chief Staff')){
    return <h1>Unauthorized Route</h1>
  }
  return (
    <div>
        <CustomKanban/>
        <div>
          <LockMenuItem/>
        </div>

    </div>

  )
}

export default Test