import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  selectedItems: Product[] = [];
  updateWishList = new Subject<Product[]>();

  constructor() { }

  getWishItems(): Product[] {
    return this.selectedItems.slice();
  }

  removeWishtItem(i: number) {
    this.selectedItems.splice(i,1);
    this.updateWishList.next(this.selectedItems.slice());
  }

  addWishtItem(device: Product) {
    this.selectedItems.push(device);
    this.updateWishList.next(this.selectedItems.slice());
  }

  clearWish() {
    this.selectedItems = [];
    this.updateWishList.next(this.selectedItems.slice());
  }

}
