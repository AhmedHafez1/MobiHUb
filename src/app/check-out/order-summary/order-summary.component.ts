import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit,OnDestroy {

  products: Product[] = [];
  productQt: number[] = [];
  totalPrice: number = 0;
  cartPrice: number = 0;
  shippingCost: number = 0;
subscription : Subscription;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.updateCart.subscribe(products => {
      this.products = products;
      this.productQt = this.cartService.getItemsQuantities();
      this.totalPrice = this.cartService.getTotalPrice();
      this.cartPrice = this.cartService.getCartPrice();
      this.shippingCost = this.cartService.getShippingCost();
    });

    this.productQt = this.cartService.getItemsQuantities();
    this.products = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.cartPrice = this.cartService.getCartPrice();
    this.shippingCost = this.cartService.getShippingCost();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
