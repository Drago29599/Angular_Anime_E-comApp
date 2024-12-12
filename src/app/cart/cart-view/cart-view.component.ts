import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  products: Product[] = [];
  totalPrice : number =0;
  constructor(private cartService: CartService,private sharedData : ShareDataService,
    private route : Router
  ){}

  ngOnInit(): void {
   this.cartService.getCartItems().subscribe( data =>{
    this.products = this.groupProductsById(data);
    this.totalPrice = this.getTotalCartPrice();
   })

   this.sharedData.cartDetails = [];
  }

  /**
   * Groups the products by their ID and tracks the quantity of each product
   */
  groupProductsById(products: Product[]): Product[] {
    const groupedProducts: { [key: string]: Product } = {};
    products.forEach(product => {
      if (groupedProducts[product.id]) {
        groupedProducts[product.id].quantity! += 1;
      } else {
        groupedProducts[product.id] = { ...product, quantity: 1 };
      }
    });
    return Object.values(groupedProducts);
  }


  pricePerProduct(quantity:number,price:string):number{
    return quantity * parseInt(price);
  }
  /**
   * Calculates the total price of all products in the cart
   */
  getTotalCartPrice(): number {
    return this.products.reduce((total, product) => {
      return total + (parseInt(product.price) * (product.quantity || 1));
    }, 0);
  }
/**
   * Increases the quantity of a product in the cart
   */
increaseQuantity(productId: number): void {
  const product = this.products.find(item => item.id === productId);
  if (product) {
    product.quantity! += 1;
    this.updateTotalPrice();
  }
}

/**
 * Decreases the quantity of a product in the cart
 * If the quantity reaches zero, the product is removed from the cart
 */
decreaseQuantity(productId: number): void {
  const product = this.products.find(item => item.id === productId);
  if (product && product.quantity! > 1) {
    product.quantity! -= 1;
  } else {
    this.removeProduct(productId);
  }
  this.updateTotalPrice();
}

/**
 * Removes a product completely from the cart
 */
removeProduct(productId: number): void {
  this.products = this.products.filter(item => item.id !== productId);
  this.updateTotalPrice();
}

/**
 * Updates the total cart price after quantity changes
 */
updateTotalPrice(): void {
  this.totalPrice = this.getTotalCartPrice();
}

/**
 * Clears the cart
 */
clearCart(): void {
  // this.products = [];
  this.totalPrice = 0;
  this.cartService.clearCart().subscribe(data =>{
    this.products = data;
  });
}

/**
 * Proceeds to checkout
 */
checkOut(): void {
  this.sharedData.cartDetails = this.products;
  this.route.navigateByUrl('/check-out');
}

}
