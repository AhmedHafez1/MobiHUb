import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedItems: Product[] = [];
  itemsQuantities: number[] = []
  updateCart = new Subject<Product[]>();
  totalPrice;
  cartPrice;
  shippingCost;
  constructor() { }

  getCartItems(): Product[] {
    return this.selectedItems.slice();
  }

  getItemsQuantities(): number[] {
    return this.itemsQuantities
  }

  removeCartItem(i: number) {
    this.selectedItems.splice(i, 1);
    this.itemsQuantities.splice(i, 1);
    this.updateCart.next(this.selectedItems.slice());
  }

  addCartItem(device: Product) {
    this.selectedItems.push(device);
    this.itemsQuantities.push(1);
    this.updateCart.next(this.selectedItems.slice());
  }

  clearCart() {
    this.selectedItems = [];
    this.itemsQuantities =[];
    this.cartPrice = 0;
    this.shippingCost = 0;
    this.totalPrice = 0;
    this.updateCart.next(this.selectedItems.slice());
  }

  sendPrice(cartPrice: number, shippingCost: number) {
    this.totalPrice = cartPrice + shippingCost;
    this.shippingCost = shippingCost;
    this.cartPrice = cartPrice;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getCartPrice() {
    return this.cartPrice;
  }

  getShippingCost() {
    return this.shippingCost;
  }
}
