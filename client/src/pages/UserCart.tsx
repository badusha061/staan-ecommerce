import AdminLayouts from '@/Layouts/AdminLayouts'
import UserLayouts from '@/Layouts/UserLayouts'
import React, { useEffect, useReducer, useState } from 'react'
import { Cart , User } from '@/types/database'
import axios from 'axios'
import useUserStore from '@/app/Store'
import { Link, useNavigate } from 'react-router-dom'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Swal from 'sweetalert2';
  

function UserCart() {
    const navigate = useNavigate()
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
    const [data , setData] = useState<Cart[]>([])
    const[total  , setTotal]  = useState<number>(0)
    const userDetails : User   = useUserStore((user) => user.user)
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        if(userDetails.id){
            FetchCart()
        }else{
            navigate('/')   
        }
    },[userDetails,reducer]) 

    const FetchCart = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/list/cart/${userDetails.id}/`)
            console.log(response.data.total);
            if(response.status === 200){
                setData(response.data.data)
                setTotal(response.data.total)
            } 
        }catch(error){
            console.log(error);
        }
    }

    const DeleteCart = async (cart_id : number) => {
        try{
            const response = await axios.delete(`${BASE_URL}/api/delete/cart/${cart_id}/`)
            if(response.status === 200){
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
                    title: "Successfully Deleted Cart Item"
                  });
                  forceUpdate()
            } 
        }catch(error){
            console.log(error);
            
        }
    }

    const IncreaseCartItems = async (product : number) => {
        try{
            const response = await axios.put(`${BASE_URL}/api/cart/update/${userDetails.id}/`,{
                "action":"increase",
                "product": product
            })
            if(response.status === 200){
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
                    title: "Successfully Increase Qunaitity Item"
                  });
                  forceUpdate()
            } 
        }catch(error){
            console.log(error);
            
        }   
    }

    const DecreaseCartItems = async (product : number) => {
        try{
            const response = await axios.put(`${BASE_URL}/api/cart/update/${userDetails.id}/`,{
                "action":"decrease",
                "product": product
            })
            if(response.status === 200){
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
                    title: "Successfully Decrease Quanity Item"
                  });
                  forceUpdate()
            } 
        }catch(error){
            console.log(error);
            
        }   
    }

    return (
    <UserLayouts>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            
                <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
                </h2>
                {data?.map((data , index) => (  
                <div  key={index} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                    <div className="col-span-12 lg:col-span-2 img box">
                        {data.product.image ? (
                            <img src={`${BASE_URL}${data.product.image}`} alt="speaker image" className="max-lg:w-full lg:w-[180px] "/>
                        ):null}
                    </div>
                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                        <div className="flex items-center justify-between w-full mb-4">
                            <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900"> {data.product.name} </h5>

                            <AlertDialog>
                            <AlertDialogTrigger>
                                
                            <button className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                        cx="17" cy="17" r="17" fill="" />
                                    <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                        d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                        stroke="#EF4444" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                            </button>

                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
                                <AlertDialogDescription>
                            

                            <div className="p-6 pt-0 text-center">
                                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              
                            </div>
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => DeleteCart(data.id)} className='text-white bg-red-600' >Yes, I'm sure</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <p className="font-normal text-base leading-7 text-gray-500 mb-6 truncate ">
                            {data.product.description}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => DecreaseCartItems(data.product.id)}
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9.5H13.5" stroke="" stroke-width="1.6" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <input  id="number"
                                    className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                                    placeholder={data.quantity}/>
                                <button
                                    onClick={() => IncreaseCartItems(data.product.id)}
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <h6 className="text-customBlue font-manrope font-bold text-2xl leading-9 text-right">₹{data.total_price}</h6>
                        </div>
                    </div>
                </div>
               ))}
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                    <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>

                    <div className="flex items-center justify-between gap-5 ">
                   
                        <h6 className="font-manrope font-bold text-3xl lead-10 text-customBlue">₹{total} </h6>
                    </div>
                </div>
                <div className="max-lg:max-w-lg max-lg:mx-auto">
                    <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts
                        calculated
                        at checkout</p>
                    <Link to='/checkout' >
                    <button
                        className="rounded-full py-4 px-6 bg-black text-white font-semibold text-lg w-full text-center transition-all duration-500  ">Checkout</button>
                        </Link>
    
                </div>
                
            
        </div>
      
      
    </section>
                                            
    </UserLayouts>
  )
}

export default UserCart