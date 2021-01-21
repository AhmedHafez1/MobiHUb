import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product } from '../shared/product.model';
import { HttpService } from '../services/http.service';
import { WishListService } from '../wish-list/wish-list.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartProducts: Product[];
  wishList: Product[];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl()
  });

  constructor(private cartService: CartService, private wishService: WishListService, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {

    this.onFetchProducts();

    this.cartService.updateCart.subscribe(products => this.cartProducts = products);
    this.wishService.updateWishList.subscribe(products => this.wishList = products);

    this.cartProducts = this.cartService.getCartItems();
    this.wishList = this.wishService.getWishItems();

  }

  onSaveProducts() {
    this.httpService.saveProducts();
  }

  onFetchProducts() {
    this.httpService.fetchProducts().subscribe();
  }

  getBrand(keyword: string) {
    this.router.navigate(['/brand', keyword]);
  }
  search(keyword: string) {
    this.router.navigate(['/search', keyword]);
  }

  onSubmit() {
    this.search(this.searchForm.value.search);
  }

}
