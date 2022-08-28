export interface Product {
    productId: number
    quantity: number
    price_sale: number
    total : number
}

export interface SalesByCategory{
    name: string,
    total: number
}

export  interface ProducsBySale{
    name: string,
    quantity: number,
    total: number
}