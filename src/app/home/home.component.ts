import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/product.service';
import { HttpService } from '../services/http.service';

import { Highlight } from '../shared/highlight.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestProducts = [];
  popularProducts = [];
  featuredProducts = [];
  topPopular;
  topFeatured;
  isLoading = false;

  popPhotos = ['../../assets/Cover/217-hero.jpg', '../../assets/Cover/Apple-iPad-Air-4th-Gen-1-1024x794.jpg', '../../assets/Cover/Lenovo-Legion-5-15-3.jpg']
  featuredPhotos = ['../../assets/Cover/Oppo-A7-specs-1024x576.png', '../../assets/Cover/Lenovo-Tab-M8.png', '../../assets/Cover/galaxy-tab-s7-732x488.jpg']
  constructor(private productService: ProductService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.onFetchProducts();
    this.isLoading = false;
  }

  onFetchProducts() {
    this.latestProducts = this.productService.getProducts().map((product, index) => {
      return { ...product, id: index };
    }).filter(product => product.highlight === Highlight.New).slice(0, 3);

    this.popularProducts = this.productService.getProducts().map((product, index) => {
      return { ...product, id: index };
    }).filter(product => product.highlight === Highlight.BestSeller).slice(0, 3);

    this.featuredProducts = this.productService.getProducts().map((product, index) => {
      return { ...product, id: index };
    }).filter(product => product.highlight === Highlight.Featured).slice(0, 3);

    this.topPopular = this.productService.getProducts().map((product, index) => {
      return { ...product, id: index };
    }).filter(product => product.highlight === Highlight.BestSeller).slice(3, 4);

    this.topFeatured = this.productService.getProducts().map((product, index) => {
      return { ...product, id: index };
    }).filter(product => product.highlight === Highlight.Featured).slice(3, 4);

  }
}
