import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/products/product.service';
import { Product } from '../../shared/product.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-phone-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  editMode: boolean = false;
  id: number;
  model: NgbDateStruct;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private http: HttpService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null ? true : false;
      this.initForm();
    });
  }

  initForm() {
    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      this.productForm = new FormGroup({
        'name': new FormControl(product.name),
        'brand': new FormControl(product.brand),
        'imagePath': new FormControl(product.imagePath),
        'oS': new FormControl(product.oS),
        'display': new FormControl(product.display),
        'camera': new FormControl(product.camera),
        'storage': new FormControl(product.storage),
        'hardware': new FormControl(product.hardware),
        'price': new FormControl(product.price),
        'type': new FormControl(product.type),
        'highlight': new FormControl(product.highlight),
        'description': new FormControl(product.description),
        'available': new FormControl(product.available),
        'released': new FormControl(product.released),
        'battery': new FormControl(product.battery)
      });
    } else {
      this.productForm = new FormGroup({
        'name': new FormControl(null),
        'brand': new FormControl(null),
        'imagePath': new FormControl(null),
        'oS': new FormControl(null),
        'display': new FormControl(null),
        'camera': new FormControl(null),
        'storage': new FormControl(null),
        'hardware': new FormControl(null),
        'price': new FormControl(null),
        'type': new FormControl(null),
        'highlight': new FormControl(null),
        'description': new FormControl(null),
        'available': new FormControl(null),
        'released': new FormControl(null),
        'battery': new FormControl(null)
      });
    }
  }

  onSubmit() {

    const product = { ...this.productForm.value, rating: this.productForm.value.rating ? this.productService.getProduct(this.id).rating : [] }
    if (this.editMode) {
      this.productService.editProduct(product, this.id);
    } else {

      this.productService.addProduct(product);
    }

    this.http.saveProducts();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}