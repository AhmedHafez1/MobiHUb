import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../shared/product.model';
import { HttpService } from './http.service';
import { ProductService } from '../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]> {

  constructor(private httpService: HttpService,private productService: ProductService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const products = this.productService.getProducts();

    if(products.length === 0) {
      return this.httpService.fetchProducts();
    } else {
      return products;
    }
    
  }
}
