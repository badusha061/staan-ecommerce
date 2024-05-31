import { useEffect, useState } from "react"
import axios from "axios"
import { category } from "@/types/database"

function useFetchCategory() {
  const [data, setData] = useState<category[]>([])
  const FetchCategory = async () => {
    
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    try{
      const response = await axios.get(`${BASE_URL}/api/categorys/`)
      setData(response.data)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
        FetchCategory()
    },[])

    return data
  }

export default useFetchCategory