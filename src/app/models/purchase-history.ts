import { Product } from "./product";
import { UserDetails } from "./user-details";

export interface PurchaseHistory {
    id:string,
    userDetails : UserDetails,
    products : Product[],
    totalPrice : number
}
