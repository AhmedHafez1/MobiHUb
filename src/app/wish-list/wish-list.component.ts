import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/product.model';
import { WishListService } from './wish-list.service';
import { CartService } from '../cart/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishList: Product[] = [];
  subscription: Subscription;
  modalRef: BsModalRef;
  addedToCart = false;

  constructor(private wishService: WishListService,
    private cartService: CartService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.subscription = this.wishService.updateWishList.subscribe(wishItems => this.wishList = wishItems);
    this.wishList = this.wishService.getWishItems();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRemoveItem(i: number) {
    this.wishService.removeWishtItem(i);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddToCart(product: Product) {
    this.cartService.addCartItem(product);
    this.removeFromWishList(product);
  }

  removeFromWishList(product: Product) {
    this.wishService.removeWishtItem(this.wishList.indexOf(product));
  }
}
