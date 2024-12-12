import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { Product } from './models/product';

type NewType = CartService;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Ecom-App';

  notificationMessage: string = '';
  initialHours: number = 1;
  initialMinutes: number = 3;
  initialSeconds: number = 37;
  countdownEndTime?: Date;

  favoriteCount : number = 0;
  // notification = 'Up to 33% OFF all Displates including Textra Code: XMAS Ends: 1d: 3h: 37m: 53'

  constructor(private cartService : CartService){}
  
  ngOnInit(): void {
    this.setCountdownEndTime();
    this.updateNotification(); // Update the initial message immediately
    setInterval(() => this.updateNotification(), 1000); // Update every seco
    // this.getFavoriteCount();

    // Subscribe to the favorite products observable
    this.cartService.favProducts$.subscribe(favProducts => {
      this.favoriteCount = favProducts.length;  // Update the count based on the number of products in the favorites
    });

    // Subscribe to the cart products observable
  }

  getFavoriteCount(): void {
    // Subscribe to the favorite products observable
    this.cartService.getFavoriteProducts().subscribe(favProducts => {
      this.favoriteCount = favProducts.length;  // Update the count based on the number of products in the favorites
    });
  }

  /**
   * Sets the countdown end time relative to the current time.
   */
  setCountdownEndTime(): void {
    const now = new Date();
    this.countdownEndTime = new Date(
      now.getFullYear(), 
      now.getMonth(), 
      now.getDate(), 
      now.getHours() + this.initialHours, 
      now.getMinutes() + this.initialMinutes, 
      now.getSeconds() + this.initialSeconds
    );
  }

  /**
   * Updates the notification message every second.
   */
  updateNotification(): void {
    if(this.countdownEndTime){
      const now = new Date();
    const timeDiff = this.countdownEndTime.getTime() - now.getTime();

    // If time runs out, reset the countdown
    if (timeDiff <= 0) {
      this.setCountdownEndTime();
    }

    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const timeString = `<strong>  Ends : ${hours}h: ${minutes}m: ${seconds}s</strong>`;
    this.notificationMessage = `${timeString}`;
    }
  }
}
