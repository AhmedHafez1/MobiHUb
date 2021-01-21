import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor() { }

  calculateDeliveryDate(shippingCost: number): Date {

    let deliveryDate: Date;

    switch (shippingCost) {

      case 2:
        deliveryDate = new Date(new Date().getTime() + 1 * 86400000);
        break;
      case 5:
        deliveryDate = new Date(new Date().getTime() + 3 * 86400000);
        break;
      case 8:
        deliveryDate = new Date(new Date().getTime() + 7 * 86400000);
        break;
    }

    return deliveryDate;
  }
}
