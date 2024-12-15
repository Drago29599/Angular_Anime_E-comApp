import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { ProductCardViewComponent } from './product/product-card-view/product-card-view.component';
import { CheckOutPageComponent } from './cart/check-out-page/check-out-page.component';
import { FavoriteProductsComponent } from './cart/favorite-products/favorite-products.component';
import { MyOrdersComponent } from './cart/my-orders/my-orders.component';

const routes: Routes = [
  {
    path:'' , redirectTo: '/products' , pathMatch:'full'
  },
  {
    path:'products',
    component:ProductListComponent
  },
  {
    path:'cart',
    component: CartViewComponent

  },
  {
    path:'product/:id',
    component:ProductCardViewComponent
  },
  {
    path:'check-out',
    component:CheckOutPageComponent
  },
  {
    path:'favorite',
    component:FavoriteProductsComponent
  },
  {
    path:'my-orders',
    component:MyOrdersComponent
  },
  { path: '**', redirectTo: ''},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
