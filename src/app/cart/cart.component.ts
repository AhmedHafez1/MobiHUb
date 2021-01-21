import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartProducts: Product[] = [];
  subscription: Subscription;
  quantities: number[] = [];
  cartPrice = 0;
  totalPrice = 0;
  shippingType = 'standard';
  shippingCost = 2;

  shippingForm: FormGroup = new FormGroup({
    shippingType: new FormControl('standard')
  })

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.subscription = this.cartService.updateCart.subscribe(cartItems => {
      this.cartProducts = cartItems;
      this.calculatePrice();
    });

    this.shippingForm.controls['shippingType'].valueChanges.subscribe(type => {
      this.onSelectShippingType(type);
      this.calculatePrice();
    });
    this.cartProducts = this.cartService.getCartItems();
    this.quantities = this.cartService.getItemsQuantities();
    this.calculatePrice();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRemoveItem(i: number) {
    this.cartService.removeCartItem(i);
  }

  calculatePrice() {
    this.cartPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.cartPrice += this.cartProducts[i].price * this.quantities[i];
    }
    this.totalPrice = this.cartPrice + this.shippingCost;
  }

  proceedToPay(cartPrice: number, shippingCost: number) {
    this.cartService.sendPrice(cartPrice, shippingCost);
  }

  onSelectShippingType(shippingType: string) {
    switch (shippingType) {
      case 'standard':
        this.shippingCost = 2;
        break;
      case 'expedited':
        this.shippingCost = 5;
        break;
      case 'urgent':
        this.shippingCost = 8;
        break;
    }
  }
}
