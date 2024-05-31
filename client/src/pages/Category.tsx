import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
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

import AdminLayouts from "@/Layouts/AdminLayouts"
import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { category } from "@/types/database"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { z } from "zod"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import Swal from 'sweetalert2';

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    image: z.any()
  });



export default function Category() {
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
    const [modalOpen , setModalOpen] = useState(false)
    const[page , setPage] = useState(1)
    const [data, setData] = useState<category[]>([])
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
        mode:"onTouched"
      })

    useEffect(() => {
        FetchCategory()
    },[page , reducer])

    const FetchCategory = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/category/?page=${page}`)
            setData(response.data.results)
        }catch(err){
            console.log(err);
        }
    }

 
    const DeleteCategory = async (id : number) => {
        try{
            const response = await axios.delete(`${BASE_URL}/api/category/${id}/`)
            if(response.status ===  204){
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
                title: "Successfully Deleted Category"
              });
                forceUpdate()
            }
        }catch(erro){
            console.log(erro);
        }
    }

  
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const data = new FormData();
        data.append("name",values.name)
        if(values.image){
            data.append("image",values.image[0])
        }
        try{
            const response = await axios.post(`${BASE_URL}/api/category/`,data)

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
                title: "Successfully Added Category"
              });
                setModalOpen(false)
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
                <AlertDialog open={modalOpen} onOpenChange={(open) => setModalOpen(open)} >
                <AlertDialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Category
                  </span>
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent >
                    <AlertDialogHeader>
                    <AlertDialogTitle>CREATE CATEGORY</AlertDialogTitle>
                    <AlertDialogDescription>

                    <Form {...form} >
                        <form encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="image"
                            render={({}) => (
                                <FormItem>
                                <FormLabel>Category Image</FormLabel>
                                <FormControl>
                                <Input 
                                {...form.register("image")}
                                type="file"
                                accept="images/*"
                                 />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button className="w-full" type="submit">Submit</Button>
                        </form>
                        </Form>

                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                       
                        
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                 
                    <TableBody>

                    {data.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell className="hidden sm:table-cell">
                            <img
                                alt="alt"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={data.image}
                                width="64"
                            />
                            </TableCell>
                            <TableCell className="font-medium">
                            {data.name}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                            {new Date(data.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => DeleteCategory(data.id)} >Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}


                      
                    </TableBody>
               
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink > {page} </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext onClick={() => setPage(page + 1 )} />
            </PaginationItem>
        </PaginationContent>
        </Pagination>

    </AdminLayouts>
  )
}
