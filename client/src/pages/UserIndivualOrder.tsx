import UserLayouts from '@/Layouts/UserLayouts'
import React, { useEffect, useState } from 'react'
import { OrderItem } from '@/types/database'
import axios from 'axios'
import { useLocation,  useSearchParams } from 'react-router-dom'


function UserIndivualOrder() {
    const [data , setData] = useState<OrderItem>()
    const [total , setTotal] = useState<number>(0)
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const orderId = searchParams.get("id")
    console.log(orderId);
    useEffect(() => {
        FetchOrderItems()
    },[])

    const FetchOrderItems = async () => {
        try{
          const response = await axios.get(`${BASE_URL}/api/userorderview/${orderId}/`)
          console.log(response.data);
          
          if(response.status === 200){
            setData(response.data.order)
            setTotal(response.data.total)
          } 
        }catch(error){
          console.log(error);
        }
      }

  return (
    <UserLayouts>
    <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                you can
                check our order summary frm below</p>
            <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                <div
                    className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                    <div className="data">
                        <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">#{orderId}</span></p>
                        <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium"> Done</span></p>
                    </div>
                </div>
            {data?.map((data , index) => (

                <div className="w-full px-3 min-[400px]:px-6">
                    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                            <img src={`${BASE_URL}${data.product.image}`} alt="Premium Watch image" 
                                className="aspect-square w-full lg:max-w-[140px]"/>
                        </div>
                        <div className="flex flex-row items-center w-full ">
                            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                <div className="flex items-center">
                                    <div className="">
                                        <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                            {data.product.name}</h2>
                                        <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                            By: {data.product.category.name} </p>
                                        <div className="flex items-center ">
                                            
                                            <p className="font-medium text-base leading-7 text-black ">Qty: <span
                                                    className="text-gray-500"> {data.quantity} </span></p>
                                        </div>
                                    </div>

                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                        <div className="flex gap-3 lg:block">
                                            <p className="font-medium text-sm leading-7 text-black">price</p>
                                            <p className="lg:mt-4 font-medium text-sm leading-7 text-black">₹1{data.price}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                        <div className="flex gap-3 lg:block">
                                            <p className="font-medium text-sm leading-7 text-black">Status
                                            </p>
                                        {data.order.status === 'cancelled' ? (
                                            <p
                                            className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-red-600 text-white">
                                           {data.order.status}</p>
                                        ):(

                                            <p
                                                className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                               {data.order.status}</p>
                                        )}
                                        </div>

                                    </div>
                                    <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                    <div className="flex gap-3 lg:block">
                                        <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">Address</p>
                                        <div className="w-full lg:w-auto">
                                        <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 truncate">
                                            {data.order.address}
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    

                </div>
            ))}

                <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                    <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">                       
                    </div>
                    <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-black"> ₹{total} </span></p>
                </div>

            </div>
        </div>
    </section>
                                            
    </UserLayouts>
  )
}

export default UserIndivualOrder