import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { CheckoutService } from '../checkout.service';
import { CartService } from '../../cart/cart.service';
import { ShippingService } from '../../services/shipping.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  constructor(private checkoutService: CheckoutService,
    private cartService: CartService,
    private shippingService: ShippingService,
    private router: Router) { }

  user: User;
  totalPayment: number;
  shippingCost: number;
  cartPrice: number;
  deliverDate: Date;
  counter = 15;
  interval;
  intervalCount;
  ngOnInit(): void {
    this.user = this.checkoutService.getUserInfo();
    this.totalPayment = this.cartService.getTotalPrice();
    this.cartPrice = this.cartService.getCartPrice();
    this.shippingCost = this.cartService.getShippingCost();
    this.deliverDate = this.shippingService.calculateDeliveryDate(this.shippingCost);
    this.checkoutService.thirdStepActive.next(true);

    this.interval = setInterval(() => {
      this.router.navigate(['/']);
    }, 15000);

    this.intervalCount = setInterval(() => {
      this.counter = this.counter - 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.checkoutService.thirdStepActive.next(false);
    clearInterval(this.interval);
    clearInterval(this.intervalCount);
  }

}