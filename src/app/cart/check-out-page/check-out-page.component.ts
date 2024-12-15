import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UserDetails } from 'src/app/models/user-details';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseHistory } from 'src/app/models/purchase-history';
// import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.css']
})
export class CheckOutPageComponent implements OnInit{

  products: Product[] = [];
  totalPrice : number =0;
  isCartAvailable = false;

  customerDetails: UserDetails = {
    name: '',
    email: '',
    address: {
      flatNo: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    },
    contactNo: ''
  };

  purchase? : PurchaseHistory;

  constructor(private cartService: CartService, private sharedDataService : ShareDataService,private route : Router){}
  ngOnInit(): void {
  //   this.cartService.getCartItems().subscribe( data =>{
  //   this.products = this.groupProductsById(data);
  //   console.log(this.products);
  //   this.totalPrice = this.getTotalCartPrice();
  //  })
    this.products = this.getCartDetails();
    
    this.totalPrice = this.getTotalCartPrice();
  }

  getCartDetails():Product[]{
    return this.sharedDataService.cartDetails;
  }
  

  /**
   * Calculates the total price of all products in the cart
   */
  getTotalCartPrice(): number {
    return this.products.reduce((total, product) => {
      return total + (parseInt(product.price) * (product.quantity || 1));
    }, 0);
  }

  // Method to handle form submission and store form data in `customerDetails`
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.customerDetails = {
        name: form.value.customerName,
        email: form.value.customerEmail,
        address: {
          flatNo: form.value.flatNo,
          street: form.value.street,
          city: form.value.city,
          state: form.value.state,
          country: form.value.country,
          pincode: form.value.pincode
        },
        contactNo: form.value.contactNo
      };

      console.log('Customer Details:', this.customerDetails);
    } else {
      console.log('Form is invalid.');
    }
  }

  approvePayment():void{
    let purchaseId =  Date.now().toString();
    this.purchase = {
        id:purchaseId,
        userDetails :this.customerDetails,
        products:this.products,
        totalPrice:this.totalPrice
      };
    
    //Calling service 
    this.cartService.addPurchase(this.purchase).subscribe( data =>{
      this.route.navigateByUrl('/my-orders')
    })
  }
}
