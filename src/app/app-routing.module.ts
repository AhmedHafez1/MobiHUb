import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { PhoneListComponent } from './products/Phones/phone-list/phone-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShippingComponent } from './check-out/shipping/shipping.component';
import { PaymentComponent } from './check-out/payment/payment.component';
import { ConfirmationComponent } from './check-out/confirmation/confirmation.component';
import { ReceiptComponent } from './check-out/receipt/receipt.component';
import { PhonesComponent } from './products/Phones/phones.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { LabtopsComponent } from './products/labtops/labtops.component';
import { LabtopsListComponent } from './products/labtops/labtops-list/labtops-list.component';
import { ProductsComponent } from './products/products.component';
import { TabletsComponent } from './products/tablets/tablets.component';
import { TabletsListComponent } from './products/tablets/tablets-list/tablets-list.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductResolverService } from './services/product-resolver.service';
import { WishListComponent } from './wish-list/wish-list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, resolve: [ProductResolverService]},
  {
    path: 'products', component: ProductsComponent, children: [
      { path: 'all-products', component: ProductsListComponent },
      {
        path: 'phones', component: PhonesComponent, children: [
          { path: '', component: PhoneListComponent }
        ]
      },
      {
        path: 'labtops', component: LabtopsComponent, children: [
          { path: '', component: LabtopsListComponent }
        ]
      },
      {
        path: 'tablets', component: TabletsComponent, children: [
          { path: '', component: TabletsListComponent }
        ]
      },
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailsComponent, resolve: [ProductResolverService] },
      { path: ':id/edit', component: ProductEditComponent, resolve: [ProductResolverService] },
    ]
  },
  {path: 'search/:keyword', component: SearchComponent},
  {path: 'brand/:brand', component: SearchComponent},
  { path: 'cart', component: CartComponent },
  { path: 'wish-list', component: WishListComponent },
  {
    path: 'check-out', component: CheckOutComponent, children: [
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'receipt', component: ReceiptComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }