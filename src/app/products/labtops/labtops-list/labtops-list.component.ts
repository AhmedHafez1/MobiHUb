import { Component, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/shared/device.type.enum';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-labtops-list',
  templateUrl: './labtops-list.component.html',
  styleUrls: ['./labtops-list.component.scss']
})
export class LabtopsListComponent implements OnInit {

  labtopList: Product[];
  isLoading =false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.labtopList = this.productService.getProducts();
    this.productService.productsUpdated.subscribe(products => this.labtopList = products);
    this.isLoading = false;
  }

}
