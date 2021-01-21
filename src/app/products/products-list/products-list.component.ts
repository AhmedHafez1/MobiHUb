import { Component, OnInit, OnDestroy } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  productList: Product[];
  subscribtion: Subscription
  isLoading = false;

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.productList = this.productService.getProducts();
    this.subscribtion = this.productService.productsUpdated.subscribe(products => this.productList = products);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
