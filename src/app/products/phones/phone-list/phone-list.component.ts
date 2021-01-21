import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/shared/product.model';


@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  phoneList: Product[];
  isLoading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.phoneList = this.productService.getProducts();
    this.productService.productsUpdated.subscribe(products => this.phoneList = products)
    this.isLoading = false;
  }
}
