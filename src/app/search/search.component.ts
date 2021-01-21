import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../shared/product.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  products: Product[];
  keyword: string = '';
  subscribtion: Subscription;
  brandMode = false;
  isLoading = false;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {

    this.checkBrandMode();
    this.isLoading = true;
    this.products = this.productService.getProducts();
    this.subscribtion = this.productService.productsUpdated.subscribe(products => this.products = products)
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  onSearchProduct(product: Product) {
    return this.searchService.searchProduct(product, this.keyword);
  }

  checkBrandMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params['keyword']) {
        this.keyword = params['keyword'];
        this.brandMode = false;
      } else {
        this.keyword = params['brand'];
        this.brandMode = true;
      }
    });
  }

}
