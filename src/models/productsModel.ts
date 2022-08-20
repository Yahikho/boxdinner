import { Decimal } from "@prisma/client/runtime"

export interface Product {
    productId: number
    quantity: number
    total: Decimal

}