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
