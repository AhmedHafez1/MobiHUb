import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-tablets-list',
  templateUrl: './tablets-list.component.html',
  styleUrls: ['./tablets-list.component.scss']
})
export class TabletsListComponent implements OnInit {

  tabletsList: Product[];
  isLoading = false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.tabletsList = this.productService.getProducts();
    this.productService.productsUpdated.subscribe(products => this.tabletsList = products)
    this.isLoading = false;
  }
}
