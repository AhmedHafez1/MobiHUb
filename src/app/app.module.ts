import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneListComponent } from './products/Phones/phone-list/phone-list.component';
import { HomeComponent } from './home/home.component';
import { PhoneItemComponent } from './products/product-item/product-item.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSummaryComponent } from './check-out/order-summary/order-summary.component';
import { AddedToCartComponent } from './cart/added-to-cart/added-to-cart.component';
import { ShowHideFrameComponent } from './cart/added-to-cart/show-hide-frame/show-hide-frame.component';
import { ShippingComponent } from './check-out/shipping/shipping.component';
import { PaymentComponent } from './check-out/payment/payment.component';
import { ConfirmationComponent } from './check-out/confirmation/confirmation.component';
import { ReceiptComponent } from './check-out/receipt/receipt.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { PhonesComponent } from './products/Phones/phones.component';
import { LabtopsListComponent } from './products/labtops/labtops-list/labtops-list.component';
import { LabtopsComponent } from './products/labtops/labtops.component';
import { ProductsComponent } from './products/products.component';
import { TabletsComponent } from './products/tablets/tablets.component';
import { TabletsListComponent } from './products/tablets/tablets-list/tablets-list.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap/modal';
import { WishListComponent } from './wish-list/wish-list.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PhoneListComponent,
    ProductDetailsComponent,
    LabtopsListComponent,
    HomeComponent,
    PhoneItemComponent,
    HomeComponent,
    LabtopsComponent,
    PhonesComponent,
    ProductEditComponent,
    CartComponent,
    CheckOutComponent,
    OrderSummaryComponent,
    AddedToCartComponent,
    ShowHideFrameComponent,
    ShippingComponent,
    PaymentComponent,
    ConfirmationComponent,
    ReceiptComponent,
    ProductsComponent,
    TabletsComponent,
    TabletsListComponent,
    ProductsListComponent,
    WishListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
