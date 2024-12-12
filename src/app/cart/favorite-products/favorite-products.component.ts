import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.css']
})
export class FavoriteProductsComponent implements OnInit{
  
  favProducts: Product[] =[];

  constructor(private cartService : CartService){
     // Subscribe to the favorite products observable
     this.cartService.favProducts$.subscribe(favProducts => {
      this.favProducts = favProducts;
    });

  }

  ngOnInit(): void {
    this.cartService.getFavoriteProducts().subscribe(res=>{
      this.favProducts = res; 
    });
  }

  removeFromFavorite(product:Product){
    this.cartService.removeFromFavorite(product).subscribe();
  }

}
