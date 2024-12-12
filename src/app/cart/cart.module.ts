import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MatCardModule } from '@angular/material/card';
import {MatListModule}  from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button';
import { CheckOutPageComponent } from './check-out-page/check-out-page.component'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    CartViewComponent,
    CheckOutPageComponent,
    FavoriteProductsComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    RouterModule
  ]
})
export class CartModule { }
