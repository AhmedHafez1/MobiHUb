import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  user?: User;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.user = this.checkoutService.getUserInfo();
  }

}