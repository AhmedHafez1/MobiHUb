import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../shared/product.model';
import { CartService } from '../../cart/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WishListService } from '../../wish-list/wish-list.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  id: number;
  openWindow: boolean = false;
  overallRating = 0;
  modalRef: BsModalRef;
  rating = new FormControl(null, Validators.required);
  addedToCart = false;
  addedToWishing = false;
  cartItems: Product[] = [];
  wishItems: Product[] = [];
  cartSubscription: Subscription;
  wishSubscription: Subscription;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishService: WishListService,
    private modalService: BsModalService,
    private http: HttpService) { }

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

  openModalRate(template: TemplateRef<any>) {
    if (this.rating.invalid) this.modalRef = this.modalService.show(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  onAddToWishlist() {
    if(!this.addedToWishing){
    this.wishService.addWishtItem(this.product);
    } else {
      this.wishService.removeWishtItem(this.wishItems.indexOf(this.product));
    }
  }

  init() {
    this.cartItems = this.cartService.getCartItems();
    this.addedToCart = this.cartItems.indexOf(this.product) >= 0;

    this.wishItems = this.wishService.getWishItems();
    this.addedToWishing = this.wishItems.indexOf(this.product) >= 0;

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.product = this.productService.getProduct(this.id);
      this.overallRating = this.productService.calcProductRating(this.product);
    });

    this.cartSubscription = this.cartService.updateCart.subscribe(cart => {
      this.cartItems = cart;
      this.addedToCart = this.cartItems.indexOf(this.product) >= 0;
    });

    this.wishSubscription = this.wishService.updateWishList.subscribe(wishList => {
      this.wishItems = wishList;
      this.addedToWishing = this.wishItems.indexOf(this.product) >= 0;
    });

    this.rating.valueChanges.subscribe(rating => {
      this.product.rating.push(rating);
      this.overallRating = this.productService.calcProductRating(this.product);
      this.http.saveProducts();
    });
  }
}
