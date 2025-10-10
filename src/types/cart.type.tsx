

export interface Cart {
    price : number
    count : number
    product : Product[]
}

export interface Product {
    id : number
    name : string
    image : string
    count : number
    price : number
    topping : Topping[]
}

export interface Topping {
    id : number
    name : string
    type : string
    detail : Detail[]
}

export interface Detail {
    id : number
    name : string
    price : number
}