import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-product-card-view',
  templateUrl: './product-card-view.component.html',
  styleUrls: ['./product-card-view.component.css']
})
export class ProductCardViewComponent implements OnInit {

  product? : Product = {id:0,name:'',price:'',image_url:'',quantity:0};
  products : Product[] = [];
  favProducts : Product[] = [];

  constructor(private activateRoute : ActivatedRoute,private productService : ProductService,
     private cartService : CartService, private route: Router,private snackbar : MatSnackBar,
    private sharedDataService : ShareDataService)
    {
    
      let id = this.activateRoute.snapshot.paramMap.get('id');
    
    if(id){
      this.product = this.productService.getProductById(id);
          }
    }

    
  ngOnInit(): void {
    this.sharedDataService.cartDetails = [];
  }

  expectedDeliveryDate(): string {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5)); // 5 days from today
    return deliveryDate.toDateString(); // Format the date as readable
  }

  addToFavorites():void{
    if(this.product){
      this.cartService.getFavoriteProducts().subscribe(
        data =>{
          this.favProducts = data;
        }
      )

      let exsistingFavProduct = this.favProducts.find(prod => prod.id === this.product?.id)
      if(exsistingFavProduct){
        this.cartService.removeFromFavorite(this.product).subscribe(
          res =>
            {
                // this.route.navigateByUrl('/cart')
                this.snackbar.open("Product removed from Favorite!","",{
                  duration:2000,
                  horizontalPosition:'right',
                  verticalPosition:'top'
                }) 

                this.cartService.getFavoriteProducts().subscribe(); // Force update of favorite count
            }
        );
      }
      else{
      this.cartService.addToFavorite(this.product).subscribe(
        res =>
          {
            if(res === "True"){
              // this.route.navigateByUrl('/cart')
              this.snackbar.open("Product added to Favorite!","",{
                duration:2000,
                horizontalPosition:'right',
                verticalPosition:'top'
              })

              this.cartService.getFavoriteProducts().subscribe(); // Force update of favorite count
            }
            
          }
      );
    }
    }
  }

  addToCart():void{
    if(this.product){
      this.cartService.addToCart(this.product).subscribe(res =>
      {
        if(res === "True"){
          // this.route.navigateByUrl('/cart')
          const snackbarRef: MatSnackBarRef<any> = this.snackbar.open("Product added to cart! - Go to card","",{
            duration:5000,
            horizontalPosition:'center',
            verticalPosition:'bottom'
          });

          // Listen for the action button click
        snackbarRef.onAction().subscribe(() => {
          // Navigate to the cart page
          this.route.navigateByUrl('/cart');
        });
        }
      }
      );
    }
  }

  checkOut(){
    if(this.product){
      this.products.push(this.product);
      this.sharedDataService.cartDetails = this.products;
      this.route.navigateByUrl('/check-out');
    }
  }

 
  
}
