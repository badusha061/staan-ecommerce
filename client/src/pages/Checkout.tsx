import UserLayouts from '@/Layouts/UserLayouts'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cart , products } from '@/types/database'
import useUserStore from '@/app/Store'
import { useNavigate } from 'react-router-dom'
import useRazorpay from 'react-razorpay'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
const formSchema = z.object({
  address: z.string().min(15, {
    message: "Address must be at least 15 characters.",
  })
  .max(200,{
    message:"Address Must not be more than 200 characters"
  }),
  city: z.string().min(5,{
    message:"City must be at least 5 characters."
  })
  .max(15,{
    message:"City must be nore more than 15 characters"
  }),
  state: z.string()
  .min(5,{
    message:"State must be at least 15 characters"
  })
  .max(15,{
    message:"State must be nore more than 15 characters"
  }),
  zip:z.string()
  .min(6,{
    message:"Zip must be 6 characters"
  })
  .max(6,{
    message:"Zip not more than 6 characters"
  })
  .regex(/[0-9]/,{
    message:"Zip must be number"
  })

})


function Checkout() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
    mode : "onTouched"
  })
  const {isSubmitting} = form.formState
  const [Razorpay] = useRazorpay()
  const navigate = useNavigate()
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
},[userDetails]) 

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

  const handlePayment = (order_id : number) => {
    const options = {
        key: 'rzp_test_06I0X5ICtbRy76', 
        amount: total * 100,
        currency: 'INR',
        name: 'STAAN Bio-Med Engineering Private Limited',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async function (response) {
            const paymentResponse = await axios.post(`${BASE_URL}/api/verify-payment/${userDetails.id}/`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            });

            if (paymentResponse.data.status === 'Payment successful') {
                navigate('/success')
            } else {
                alert('Payment Failed');
            }
        },
        prefill: {
            name: 'Your Name',
            email: 'your.email@example.com',
            contact: '9999999999',
        },
        theme: {
            color: '#3399cc',
        },
    };

    const rzp = new Razorpay(options);
    rzp.open();
};
const onSubmit = async(values: z.infer<typeof formSchema>) => {
  try{
    const response = await axios.post(`${BASE_URL}/api/create-order/${userDetails.id}/`,{values})
   
    if(response.status === 201){
        handlePayment(response.data.razorpay_order_id)
    } 
}catch(error){
    console.log(error);
}
}




  
  return (
    <UserLayouts>
  <div  className="flex flex-col  mt-16 items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
  <a href="#" className="text-2xl font-bold text-gray-800">Checkout</a>
  <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
    <div className="relative">
      <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></a>
          <span className="font-semibold text-gray-900">Shop</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
          <span className="font-semibold text-gray-900">Shipping</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
          <span className="font-semibold text-gray-500">Payment</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    {data?.map((data , index) => (
      <div className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${BASE_URL}${data.product.image}`} alt="" />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold"> {data.product.name} </span>
          <span className="float-right text-gray-400">{data.product.price} × {data.quantity}</span>
          <p className="text-lg font-bold">₹{data.total_price} </p>
        </div>
      </div>
    ))}
    </div>


  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="542 W. 15th Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="NY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip</FormLabel>
              <FormControl>
                <Input placeholder="673631" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  className='w-full' type="submit">
        {isSubmitting ? 
              <Button className='w-full' disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Please wait
              </Button>
        : "Submit"}
        </Button>
      </form>
    </Form>
  </div>
</div>

    </UserLayouts>
  )
}

export default Checkout