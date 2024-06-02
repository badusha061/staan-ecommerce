import UserLayouts from '@/Layouts/UserLayouts'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { products } from '@/types/database'
import axios from 'axios'
import useUserStore from '@/app/Store';
import Swal from 'sweetalert2';
import {User} from '../types/database'

function ProductView() {
    const navigate = useNavigate()
    const userDetails : User  = useUserStore((user) => user.user)
    const [data , setData] = useState<products[]>([])
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const productid  = searchParams.get("productid")
    console.log(productid);
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        if(productid){
            FetchData()
        }
    },[productid])

    const FetchData = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/products/${productid}/`)  
            console.log(response.data);
                      
            if(response.status === 200){
                setData(response.data)
            }
        }catch(error){
            console.log(error);   
        }
    }

    const CreateCart = async (product : number) => {
        try{
          const response = await axios.post(`${BASE_URL}/api/cart/${userDetails.id}/`,{"product":product})
          if(response.status === 201){
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
              title: "Successfully Added Into Cart"
            });
            navigate('/cart')
          }
        }catch(error){
          if(error.response.status === 400){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
              
            });
            
            Toast.fire({
              icon: 'error',
              title: "Product is already in the cart",
            });
            return false
          }
        }
      }
    
    
  return (
    <UserLayouts>
<section className="py-24">
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  
                    <img   className="w-full h-full object-cover" src={data.image} alt="Product Image"/>
                  
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button onClick={() => CreateCart(data.id)} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {data.name}
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">₹{data.price}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                        {data.quantity > 0 ?  (
                            <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                        ):(
                            <span className="text-gray-600 dark:text-gray-300">Out Stock</span>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Category:</span>
                    <div className="flex items-center mt-2">
                        {data.category ? (
                            <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"> {data.category.name} </button>
                        ):(
                            <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">  </button>
                        )}
                    </div>
                </div>
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
    </UserLayouts>
  )
}

export default ProductView