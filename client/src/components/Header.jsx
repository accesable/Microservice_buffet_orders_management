import { Navbar, TextInput,Button, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaCartPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {SignOut} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(SignOut());
        navigate('/');
    }
    const path = useLocation().pathname
    const {currentUser} = useSelector(state => state.user)
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-red-600 via-red-300 to-orange-400 rounded-lg text-white'>Halo's</span>
            HotPot
        </Link>
        <div className='flex gap-2 md:order-2'>
            { currentUser ? (
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                         alt='user avatar'
                         img={`http://localhost:8086${currentUser.imageURL}`}
                        />
                    }
                >
                    <Dropdown.Header>
                        <div className="block text-sm font-bold">@{currentUser.username}</div>
                        <div className="block text-sm font-medium truncate">
                            user@gmail.com
                        </div>
                    </Dropdown.Header>
                    {/* <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>
                            Profile
                        </Dropdown.Item>
                    </Link> */}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>

                </Dropdown>
            ) : (

                <Link to='/signin'>
                    <Button gradientDuoTone='purpleToBlue'>
                        Sign In
                    </Button>
                </Link>
            )}
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/orders'>Orders</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/dashboard'>Report</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/chief'>Chief</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/inserve'>Servings</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header