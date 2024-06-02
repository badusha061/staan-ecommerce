import UserLayouts from '@/Layouts/UserLayouts'
import React, { useEffect, useReducer, useState } from 'react'
import { Order  } from '@/types/database'
import axios from 'axios'
import useUserStore from '@/app/Store'
import {formatDate} from '../custom/DateFormat'
import { Link } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Swal from 'sweetalert2';



function UserOrder() {
  const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
  const [reason , setReason] = useState<string>("")
  const [data , setData] = useState<Order>([])
  const userDetails : User   = useUserStore((user) => user.user)
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    FetchOrderItems()
  },[reducer])




  const onSubmit  =  async (id : number) => {
    if(!reason.trim()){
      return false
    }
    try{
      const response = await axios.put(`${BASE_URL}/api/cancel/${id}/`,{reason})
      console.log(response.data.total);
      console.log(response.data);
      
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
          title: "Successfully Canceled Your Order"
        });
          forceUpdate()
      } 
    }catch(error){
      console.log(error);
    }
  }




  const FetchOrderItems = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/api/userorder/${userDetails.id}/`)
      console.log(response.data.total);
      console.log(response.data);
      
      if(response.status === 200){
        setData(response.data)
      } 
    }catch(error){
      console.log(error);
    }
  }
  

  return (
    <UserLayouts>
  <section className="bg-white  mt-4 py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mx-auto max-w-5xl">
      <div className="gap-4 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>

        <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
          <div>
            <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
            <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
              <option selected>All orders</option>
              <option value="pre-order">Pre-order</option>
              <option value="transit">In transit</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

          <div>
            <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
            <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
              <option selected>this week</option>
              <option value="this month">this month</option>
              <option value="last 3 months">the last 3 months</option>
              <option value="lats 6 months">the last 6 months</option>
              <option value="this year">this year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flow-root sm:mt-8">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((data , index) => (
       
          <div className="flex flex-wrap items-center gap-y-4 py-6">
            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">#{data.id} </a>
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatDate(data.created_at)}</dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">₹{data.total_price}</dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order Status:</dt>
              <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                </svg>
                  {data.status}
              </dd>
            </dl>

            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
              {data.status == 'completed' ? (

              <AlertDialog>
              <AlertDialogTrigger asChild>
              <Button variant="custom"   type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely Cancel this products?</AlertDialogTitle>
                  <AlertDialogDescription>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="reason">Reason for Cancel Product</Label>
                    <Input onChange={(e) => setReason(e.target.value)} type="text" id="reason"  />
                  </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onSubmit(data.id)} className='bg-red-600' >Continue</AlertDialogAction>
              </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>             
                
              ):(
                <Badge className="w-full rounded-lg border border-black px-3 py-2 text-center text-sm font-medium text-black  focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto" variant="outline">Order Cancelled</Badge>
              )}
              
              <Link to={`/userorder/?id=${data.id}`} className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</Link>
            </div>
          </div>
      ))}
        </div>
      </div>

 
    </div>
  </div>
</section>
    </UserLayouts>
  )
}

export default UserOrder