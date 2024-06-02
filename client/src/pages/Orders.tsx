import AdminLayouts from '@/Layouts/AdminLayouts'
import {
  File,
  ListFilter,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Eye } from "lucide-react"
import { OrderItem } from '@/types/database'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {formatDate} from '../custom/DateFormat'
import { Link } from 'react-router-dom'


function Orders() {
  const [data , setData] = useState<OrderItem>([])
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    FetchOrder()
  },[])
  const FetchOrder = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/api/orders/`)
     
      if(response.status === 200){
        setData(response.data)
      } 
  }catch(error){
      console.log(error);
  }

  }
  return (
    <AdminLayouts>  
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Prduct Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Quantity
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          Views
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                     {data?.map((data , index) => (
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={`${BASE_URL}${data.product.image}`}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {data.product.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline"> {data.order.status} </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${data.product.price}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data.quantity}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data.price}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(data.order.created_at)}
                        </TableCell>
                      <Link to={`/orderview/${data.id}/`}>
                        <TableCell>
                          <Eye className=' cursor-pointer ' />
                        </TableCell>
                        </Link>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
    </AdminLayouts>
  )
}

export default Orders