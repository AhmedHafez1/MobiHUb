import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../shared/product.model';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  productsUrl: string = 'https://mubihub-81128-default-rtdb.firebaseio.com/products.json';

  constructor(private httpClient: HttpClient, private productService: ProductService) { }

  saveProducts() {
    const products = this.productService.getProducts();

    this.httpClient.put(this.productsUrl, products).subscribe();
  }

  fetchProducts() {
    return this.httpClient.get<Product[]>(this.productsUrl)
      .pipe(map(products => {
        return products.map(product => {
          return { ...product, rating: product.rating ? product.rating : [] }
        });
      }), tap(products => this.productService.setProducts(products)));
  }
}