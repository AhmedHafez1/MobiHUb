import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';
import { Subject } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productList: Product[] = [];
  productsUpdated = new Subject<Product[]>();

  constructor() {
  }

  getProducts() {
    return this.productList.slice();
  }

  setProducts(products: Product[]) {
    this.productList = products;
    this.productsUpdated.next(this.productList.slice());
  }

  getProduct(id: number): Product {
    return this.productList[id];
  }

  addProduct(product: Product) {
    this.productList.push(product);

    this.productsUpdated.next(this.productList.slice());
  }

  editProduct(product: Product, id: number) {
    this.productList[id] = product;
    this.productsUpdated.next(this.productList.slice());
  }

  calcProductRating(product: Product): number {

    if (product.rating.length > 0) {

      return product.rating.reduce((sum, x) => sum + x) / product.rating.length;
    }

    else return 0;
  }
}