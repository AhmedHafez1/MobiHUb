import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy,AfterViewChecked {

  firstStepDone: boolean;
  secondStepDone: boolean;
  thirdStepDone: boolean;

  firstStepActive: boolean;
  secondStepActive: boolean;
  thirdStepActive: boolean;

  subscriptiondone1: Subscription;
  subscriptiondone2: Subscription;
  subscriptiondone3: Subscription;

  subscriptionactive1: Subscription;
  subscriptionactive2: Subscription;
  subscriptionactive3: Subscription;

  constructor(private checkoutService: CheckoutService, private router: Router,private changeDetector : ChangeDetectorRef) {

  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.subscriptiondone1 = this.checkoutService.firstStepCompleted.subscribe(state => this.firstStepDone = state);
    this.subscriptiondone2 = this.checkoutService.secondStepCompleted.subscribe(state => this.secondStepDone = state);
    this.subscriptiondone3 = this.checkoutService.thirdStepCompleted.subscribe(state => this.thirdStepDone = state);

    this.subscriptionactive1 = this.checkoutService.firstStepActive.subscribe(isActive => this.firstStepActive = isActive);
    this.subscriptionactive2 = this.checkoutService.secondStepActive.subscribe(isActive => this.secondStepActive = isActive);
    this.subscriptionactive3 = this.checkoutService.thirdStepActive.subscribe(isActive => this.thirdStepActive = isActive);
  }

  ngOnDestroy() {
    this.subscriptiondone1.unsubscribe();
    this.subscriptiondone2.unsubscribe();
    this.subscriptiondone3.unsubscribe();

    this.subscriptionactive1.unsubscribe();
    this.subscriptionactive2.unsubscribe();
    this.subscriptionactive3.unsubscribe();
  }

  goToSecondStep() {
    if (this.firstStepDone) {
      this.router.navigate(['/check-out/payment']);
    }
  }



}