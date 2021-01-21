import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-added-to-cart',
  templateUrl: './added-to-cart.component.html',
  styleUrls: ['./added-to-cart.component.scss']
})
export class AddedToCartComponent implements OnInit {

  @Output() closeWindow = new EventEmitter();
  @Input() viewMessage: boolean;
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

  onCloseWindow() {
    this.closeWindow.emit();
  }

}
