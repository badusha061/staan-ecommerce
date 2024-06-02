import { Link, useNavigate } from "react-router-dom" 
import { Button } from "@/components/ui/button"
import useUserStore from "@/app/Store"
import {User} from '../types/database'
import Swal from 'sweetalert2';


function Navbar() {
    const navigate = useNavigate()
    const userDetails : User  = useUserStore((user) => user.user)
    const removeUser = useUserStore((user) => user.removeUser)
    const UserLogout = async () => {
        removeUser()
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Logout User"
          });
        navigate('/login')     
    }
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://www.staan.in/wp-content/themes/staan/images/logo-final.png" className="h-8" alt="Flowbite Logo"/>
    </a>
    {userDetails ? (
        <>
        <div className="flex md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
           <Button onClick={UserLogout} >
                    Logout
           </Button>
        </div>

        </>
    ):(
    
    <div className="flex md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
           <div  >
            <Button className="py-2 px-4" asChild>
            <Link to="/login">Login</Link>
            </Button>
           </div>
            <div>
            <Button className="py-2 px-4" asChild>
                <Link to="/register">Register</Link>
            </Button>
            </div>
        </div>
)}
    
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
            
            <Link to='/' className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        <li>
            <Link to='/productlist' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
        </li>
    {userDetails ? (
        <>
        <li>
            <Link to='/cart' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</Link>
        </li>
        <li>
            <Link to='/user' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Order</Link>
        </li>
        </>
    ):(
        <>
        </>
    )}
        </ul>
    </div>
    </div>
    </nav>
  )
}

export default Navbar