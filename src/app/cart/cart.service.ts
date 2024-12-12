import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { PurchaseHistory } from '../models/purchase-history';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private apiUrl  = environment.apiUrl;
 private cartDetails: Product[] = [];
 private favProducts: Product[] = [];
 private purchase : PurchaseHistory[] =[];
 

 private favProductsSubject = new BehaviorSubject<Product[]>(this.favProducts);
  favProducts$ = this.favProductsSubject.asObservable(); // Observable for components to subscribe to

  //for purchase 
  private purchesSubject = new BehaviorSubject<PurchaseHistory[]>(this.purchase);
  purchase$ = this.purchesSubject.asObservable(); // Observable for components to subscribe to
  
  constructor(private http : HttpClient) {
    this.favProducts = JSON.parse(localStorage.getItem('FavProducts') || '[]');
    this.favProductsSubject.next(this.favProducts); // Emit the initial value

    //For purchase
    this.purchase = JSON.parse(localStorage.getItem('PurchaseHistory') || '[]');
    this.purchesSubject.next(this.purchase); // Emit the initial value
   }

  getCartItems():Observable<Product[]>{
    // return this.http.get<Product[]>(this.apiUrl+'/cart');
    this.cartDetails = JSON.parse(localStorage.getItem('cartDetails') || "[]");
    return of(this.cartDetails);
  }

  addToCart(product:Product):Observable<string>{
    // return this.http.post<Product>(this.apiUrl+'/cart',product);
    this.cartDetails.push(product);
    localStorage.setItem('cartDetails',JSON.stringify(this.cartDetails))
    return of("True");
  }

  clearCart():Observable<Product[]>{
    // return this.http.delete<void>(this.apiUrl+'/cart');
    localStorage.removeItem('cartDetails');
    this.cartDetails = JSON.parse(localStorage.getItem('cartDetails') || "[]");
    return of(this.cartDetails);
  }

  checkOut(produtcs: Product[]):Observable<void>{
    return this.http.post<void>(this.apiUrl+'/checkout',produtcs)
  }

  addToFavorite(product:Product){
    this.favProducts.push(product);
    localStorage.setItem('FavProducts',JSON.stringify(this.favProducts));
    this.favProductsSubject.next(this.favProducts); // Emit the updated list
    return of("True");
  }

  getFavoriteProducts():Observable<Product[]>{
    this.favProducts = JSON.parse(localStorage.getItem('FavProducts') || "[]");
    return  of(this.favProducts);
  }

  removeFromFavorite(product:Product):Observable<Product[]>{
    this.favProducts = JSON.parse(localStorage.getItem('FavProducts') || "[]");
    
    // Find the index of the product to remove
    const productIndex = this.favProducts.findIndex(p => p.id === product.id);

    if (productIndex !== -1) {
      // Remove the product from the array
      this.favProducts.splice(productIndex, 1);

      // Update the localStorage with the updated list of favorite products
      localStorage.setItem('FavProducts', JSON.stringify(this.favProducts));
      this.favProductsSubject.next(this.favProducts); // Emit the updated list
    }

    // Return the updated favorite products list
    return of(this.favProducts);
  }

  addPurchase(purchase:PurchaseHistory):Observable<PurchaseHistory[]>{
    this.purchase.push(purchase);
    localStorage.setItem('PurchaseHistory',JSON.stringify(this.purchase));
    this.purchesSubject.next(this.purchase); // Emit the updated list
    this.clearCart();
    return of(this.purchase);
  }

  
  getPurchaseData():Observable<PurchaseHistory[]>{
    this.purchase = JSON.parse(localStorage.getItem('PurchaseHistory') || "[]");
    return  of(this.purchase);
  }
}
