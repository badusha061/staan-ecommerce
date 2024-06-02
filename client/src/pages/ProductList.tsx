import UserLayouts from '@/Layouts/UserLayouts'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { products , category} from "@/types/database"
import { Link, useNavigate } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import useUserStore from '@/app/Store';
import Swal from 'sweetalert2';
import {User} from '../types/database'

function ProductList() {
  const navigate = useNavigate()
    const userDetails : User  = useUserStore((user) => user.user)
    const [searchText , setSearchText] = useState<string>("")
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const[page , setPage] = useState(1)
    const [data, setData] = useState<products[]>([])
    const [categories, setCategories] = useState<category[]>([])

    useEffect(() => {
        FethProducts()
        FetchCategory()
    },[page , searchText])
    const FethProducts = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/products/?page=${page}&search=${searchText}`)
            setData(response.data.results)
            console.log(response.data.results);
            
        }catch(err){
            console.log(err);
        }
    }

    const FetchCategory =  async () => {
      try{
        const response = await axios.get(`${BASE_URL}/api/categorys/`)
        setCategories(response.data)
        
    }catch(err){
        console.log(err);
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
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">  
        <div className="flex justify-around items-center">
  <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
    Available Products
  </h2>
  <div className="pt-2 relative mx-auto text-gray-600">
    <input
      onChange={(e) => setSearchText(e.target.value)}
      value={searchText}
      className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      type="search"
      name="search"
      placeholder="Search"
    />
    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
      <svg
        className="text-gray-600 h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 56.966 56.966"
        xmlSpace="preserve"
        width="512px"
        height="512px"
      >
        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
      </svg>
    </button>
  </div>
</div>

            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
          
                    <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                        <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                            <p className="font-medium text-base leading-7 text-black ">Filter Plans</p>
                            <p
                                className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600">
                                RESET</p>
                        </div>


                        <div className="w-full mb-7">
                            <div className='accordion-group grid grid-cols-1 gap-5 sm:gap-9'
                                data-accordion="default-accordion">
                                <div className='accordion '
                                    id='category-heading-one'>
                                    <button
                                        className='accordion-toggle group accordion-active:text-indigo-600 inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 active:text-indigo-600'
                                        aria-controls='category-collapse-one'>
                                        <h5 className="font-medium text-sm text-gray-900">
                                            Availability
                                        </h5>
                                        <svg className='text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:rotate-180'
                                            width='22' height='22' viewBox='0 0 22 22' fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25'
                                                stroke='currentColor' stroke-width='1.6' stroke-linecap='round'
                                                stroke-linejoin='round'></path>
                                        </svg>

                                    </button>
                                    <div id='category-collapse-one'
                                        className='accordion-content w-full px-0 overflow-hidden pr-4 max-h-0 '
                                        aria-labelledby='category-heading-one'>
                                        
                                        <div className="box flex flex-col gap-2 mt-5">
                                           
                                            <div className="flex items-center mb-2">
                                                <input id="checkbox-option-1" type="checkbox" value="" className="checkbox-white w-5 h-5 appearance-none border border-gray-500  rounded mr-1 hover:border-indigo-100 hover:bg-indigo-600 checked:bg-no-repeat checked:bg-center checked:border-indigo-100 checked:bg-indigo-600 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                                <label htmlFor="checkbox-option-1" className="ml-1 font-normal text-xs cursor-pointer  text-gray-600">option-1</label>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input id="checkbox-option-2" type="checkbox" value="" className="checkbox-white w-5 h-5 appearance-none border border-gray-500  rounded mr-1 hover:border-indigo-100 hover:bg-indigo-600 checked:bg-no-repeat checked:bg-center checked:border-indigo-600 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                                    <label htmlFor="checkbox-option-2" className="ml-1 font-normal text-xs cursor-pointer  text-gray-600">option-2</label>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <input id="checkbox-option-3" type="checkbox" value="" className="checkbox-white w-5 h-5 appearance-none border border-gray-500  rounded mr-1 hover:border-indigo-600 hover:bg-indigo-600 checked:bg-no-repeat checked:bg-center checked:border-indigo-600 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"/>
                                                        <label htmlFor="checkbox-option-3" className="ml-1 font-normal text-xs cursor-pointer  text-gray-600">option-3</label>
                                                        </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <label htmlFor="Offer" className="font-medium text-sm leading-6 text-gray-600 mb-1">Filter Category</label>
                        <div className="relative w-full mb-7">
                            <select id="Offer" className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                              {categories.map((data , index) => (
                                <option key={index} value="option 1">{data.name}</option>
                              ))}
                            </select>
                            <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16" height="16"
                                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-9">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data.map((data , index) => (

                    <div key={index}   className="max-w-[384px] mx-auto">
                    <div className="w-full max-w-sm aspect-square">
                      <Link to={`/view/${data.id}?productid=${data.id}`}>
                          <img src={data.image} alt="cream image" className="w-64 h-64 object-cover shadow-lg rounded-xl"/>
                      </Link>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <div className="">
                            <h6 className="font-medium text-xl leading-8 text-black mb-2">{data.name}</h6>
                            <h6 className="font-semibold text-xl leading-8 text-customBlue">₹{data.price}</h6>
                        </div>  

                        <button
                            onClick={() => CreateCart(data.id)}
                            className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                fill="none">
                                <path
                                    d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                                    stroke="" stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                        </button>

                    </div>
                </div>
                ))}

               
            </div>

                </div>
            </div>

        </div>
    </section>
                                            
    <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
        </div>
        <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(page - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink  isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
     
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </section>
        

    </UserLayouts>
  )
}

export default ProductList