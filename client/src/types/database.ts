export interface User {
    id : number
    username : string,
    email : string,
    is_admin : boolean
}

export interface Jwt{
    access : string,
    refersh : string
}

export interface category{
    id : number,
    name:string,
    image:string,
    created_at: string,
    updated_at:string
}

export interface products{
    id : number
    name:string
    image:string
    created_at : string
    updated_at :string
    description:string
    price:number
    quantity:number
    category:category
}

export interface Cart{
    id: number,
    product:products,
    user: User,
    quantity:number,
    total_price:number,
    date_added: string
}

export interface Order{
    id : number,
    user:User,
    created_at:string,
    total_price:number,
    status:string,
    razorpay_order_id:string,
    address:string,  
}

export interface OrderItem{
    id:number,
    order:Order,
    product:products,
    quantity:number,
    price:number
}