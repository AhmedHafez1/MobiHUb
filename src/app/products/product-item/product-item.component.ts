import { Component, Input, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WishListService } from '../../wish-list/wish-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class PhoneItemComponent implements OnInit, OnDestroy {


  @Input() product: Product;
  @Input() id: number;
  overallRating = 0;
  addedToCart = false;
  addedToWishing = false;
  modalRef: BsModalRef;
  cartItems: Product[] = [];
  wishItems: Product[] = [];
  cartSubscription: Subscription;
  wishSubscription: Subscription;

  constructor(private productService: ProductService, private cartService: CartService, private wishService: WishListService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.wishSubscription.unsubscribe();
  }

  onAddToCart() {
    this.cartService.addCartItem(this.product);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddToWishlist() {
    if (!this.addedToWishing) {
      this.wishService.addWishtItem(this.product);
    } else {
      this.wishService.removeWishtItem(this.wishItems.indexOf(this.product));
    }
  }

  init() {
    this.overallRating = this.productService.calcProductRating(this.product);

    this.cartItems = this.cartService.getCartItems();
    this.addedToCart = this.cartItems.indexOf(this.product) >= 0;

    this.wishItems = this.wishService.getWishItems();
    this.addedToWishing = this.wishItems.indexOf(this.product) >= 0;

    this.cartSubscription = this.cartService.updateCart.subscribe(cart => {
      this.cartItems = cart;
      this.addedToCart = this.cartItems.indexOf(this.product) >= 0;
    });

    this.wishSubscription = this.wishService.updateWishList.subscribe(wishList => {
      this.wishItems = wishList;
      this.addedToWishing = this.wishItems.indexOf(this.product) >= 0;
    });
  }

}
