import { Component, OnInit } from '@angular/core';
import { PurchaseHistory } from 'src/app/models/purchase-history';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  // Initialize empty purchase array with default values based on the models
  purchase: PurchaseHistory[] = [
  ];


  constructor(private cartService : CartService){}

  ngOnInit(): void {
    this.cartService.getPurchaseData().subscribe( data =>{
      this.purchase = data;
    })  
  }

  getDeliveryDate(): string {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5)); // Adding 5 days
    return deliveryDate.toLocaleDateString(); // Formats the date to a human-readable string
  }
  

}
