import { Badge } from "@/components/ui/badge"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import AdminLayouts from "@/Layouts/AdminLayouts"
import { useEffect, useState } from "react"
import axios from "axios"
import { OrderItem , products } from "@/types/database"
import {formatDate} from '../custom/DateFormat'
import Swal from 'sweetalert2';



export default function Admin() {
  const[percentage_month_sales , setPercentage_month_sales] = useState<number>()
  const[percentage_week_sales , setPercentage_week_sales] = useState<number>()
  const[total_month_sales , setTotal_month_sales] = useState<number>()
  const[total_week_sales , setTotal_week_sales] = useState<number>()
  const[recend_order , setRecend_order] = useState<OrderItem>([])
  const[total_month_sales_count , setTotal_month_sales_count] = useState<number>([])
  const[total_week_sales_count , setTotal_week_sales_count] = useState<number>([])
  const[terndingProducts, setTrendngProducts] = useState<products>([])
  useEffect(() => {
    FetchAdminside()
  },[])
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const FetchAdminside = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/api/adminside/`)
     
      if(response.status === 200){
          setPercentage_month_sales(response.data.percentage_month_sales)
          setPercentage_week_sales(response.data.percentage_week_sales)
          setRecend_order(response.data.recend_order)
          setTotal_month_sales(response.data.total_month_sales)
          setTotal_week_sales(response.data.total_week_sales)
          setTotal_month_sales_count(response.data.total_month_sales_count)
          setTotal_week_sales_count(response.data.total_week_sales_count)
          setTrendngProducts(response.data.products)
      } 
  }catch(error){
      console.log(error);
  }

  }
  return (

      <AdminLayouts>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Admin Dashboard</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                  STAAN's vision is to contribute to the world's healthcare industry with complete comprehensive and cost effective solutions in surgical and critical care verticals.
                  </CardDescription>
                </CardHeader>
           
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">₹{total_week_sales}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    count {total_week_sales_count}
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={percentage_week_sales} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">₹{total_month_sales}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                      count {total_month_sales_count}
                    </div>
                </CardContent>
                <CardFooter>
                  <Progress value={percentage_month_sales} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Product
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {recend_order?.map((data , index) => (
                        <TableRow className="bg-accent">
                          <TableCell>
                            <div className="font-medium">{data.order.user.username}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {data.order.user.email}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {data.product.name}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {data.order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(data.order.created_at)}
                          </TableCell>
                          <TableCell className="text-right">₹{data.order.total_price}</TableCell>
                        </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Trending Products
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
  {terndingProducts?.map((data, index) => (
    <React.Fragment key={index}>
      <Separator className="my-4" />
      <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <img
          className="h-48 w-full object-cover object-center"
          src={`${BASE_URL}${data.image}`}
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
            {data.name}
          </h2>
          <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
            {data.description}
          </p>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
            ₹{data.price}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  ))}
</CardContent>

            </Card>
          </div>
        </main>

        </AdminLayouts>
   
  )
}
