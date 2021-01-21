import { Product } from "./product.model";
import { User } from './user.model';

export class Order {
    products?: Product[];
    productQt?: number[];
    totalPayment?:number;
    cartPrice?:number;
    shippingCost?:number;
    user?: User;
}