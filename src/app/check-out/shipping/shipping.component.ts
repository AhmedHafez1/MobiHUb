import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit,OnDestroy {

  totalPay: number = 0;
  active = false;

  @ViewChild('form', { static: false }) shippingForm: NgForm;

  constructor(private checkoutService: CheckoutService, private router: Router) { }
  ngOnDestroy(): void {
    this.checkoutService.setStepOne(false);
  }

  ngOnInit(): void {
    this.checkoutService.setStepOne(true);
  }

  onSubmit(shippingForm: NgForm) {
    if (shippingForm.valid) {
      const user = new User();

      user.firstName = shippingForm.value.firstName;
      user.lastName = shippingForm.value.lastName;
      user.email = shippingForm.value.email;
      user.address = shippingForm.value.address;
      user.mobile = shippingForm.value.mobile;

      this.checkoutService.saveUserShippingInfo(user);
      
    }
  }

}

