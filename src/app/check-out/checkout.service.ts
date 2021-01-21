import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { CartService } from '../cart/cart.service';
import { Order } from '../shared/order.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  totalPayment: number;
  firstStepCompleted = new Subject<boolean>();
  secondStepCompleted = new Subject<boolean>();
  thirdStepCompleted = new Subject<boolean>();

  firstStepActive = new Subject<boolean>();
  secondStepActive = new Subject<boolean>();;
  thirdStepActive = new Subject<boolean>();;

  user: User = {
    firstName: null,
    lastName: null, email: null,
    address: null, mobile: null,
    confirmedPay: null,
    cardNumber: null,
    fullName: null,
    cardExpMMYY: null,
    cVV: null
  }

  constructor(private cartService: CartService, private router: Router) {
  }

  saveUserShippingInfo(user: User) {
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.address = user.address;
    this.user.mobile = user.mobile;
    this.user.email = user.email;
    this.firstStepCompleted.next(true);
    this.router.navigate(['/check-out/payment']);
  }

  saveUserPaymentInfo(user: User) {
    // this.user.cardNumber = user.cardNumber;
    // this.user.fullName = user.fullName;
    // this.user.cVC = user.cVC;
    // this.user.cardExpMMYY = user.cardExpMMYY;
    this.secondStepCompleted.next(true);
  }

  getUserInfo(): User {
    return this.user;
  }

  submitOrder() {
    const order: Order = new Order();
    order.user = this.user;
    order.totalPayment = this.cartService.getTotalPrice();
    order.products = this.cartService.getCartItems();
    order.productQt = this.cartService.getItemsQuantities();
    this.thirdStepCompleted.next(true);
    this.cartService.clearCart();
    this.router.navigate(['/check-out/confirmation']);
  }

  resetSteps() {
    this.firstStepCompleted.next(false);
    this.secondStepCompleted.next(false);
    this.thirdStepCompleted.next(false);
  }

  setStepOne(status: boolean) {
    this.firstStepActive.next(status);
  }

  setSteptwo(status: boolean) {
    this.secondStepActive.next(status);
  }

  setStepThree(status: boolean) {
    this.thirdStepActive.next(status);
  }
}