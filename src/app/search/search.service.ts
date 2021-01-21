import { Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchProduct(product: Product, keyword: string) {
    if (product.name.includes(keyword) || product.brand.includes(keyword) || product.description.includes(keyword)) {
      return true;
    } else
      return false;
  }
}

