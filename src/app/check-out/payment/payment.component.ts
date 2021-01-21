import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  submitted: boolean = false;

  constructor(private checkoutService: CheckoutService, private router: Router) { }

  ngOnDestroy(): void {
    this.checkoutService.setSteptwo(false);
  }

  ngOnInit(): void {
    this.checkoutService.setSteptwo(true);
  }

  onSubmit(paymentForm: NgForm) {
    if (paymentForm.valid) {
      const user = new User();

      user.cardNumber = paymentForm.value.cardNumber;
      user.fullName = paymentForm.value.fullName;
      user.cVV = paymentForm.value.cVV;
      user.cardExpMMYY = paymentForm.value.monthYear;

      this.checkoutService.saveUserPaymentInfo(user);
      this.checkoutService.submitOrder();

    }
  }
}