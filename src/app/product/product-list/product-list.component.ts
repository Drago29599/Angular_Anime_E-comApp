import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products : Product[] = [];
  filterProducts : Product[] = [];
  sortorder : string = '';

  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 18;  // Default for laptop view
  totalPages: number = 1;

  constructor(private productService :ProductService,private cartService : CartService, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res =>{
      this.products = res
      this.filterProducts = res
      this.updatePagination();
    })

    window.addEventListener('resize', () => this.updatePagination());  // Update on window resize
  }

  updatePagination(): void {
    // Update itemsPerPage based on screen size
    if (window.innerWidth <= 768) {  // Mobile view
      this.itemsPerPage = 8;
    } else if (window.innerWidth <= 1024) {  // Tablet view
      this.itemsPerPage = 12;
    } else {  // Laptop/Desktop view
      this.itemsPerPage = 18;
    }

    this.totalPages = Math.ceil(this.filterProducts.length / this.itemsPerPage);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filterProducts.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }
  

  applyFilter(event : Event): void{
    let searchTerm = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.filterProducts  = this.products.filter(
      product => product.name.toLocaleLowerCase().includes(searchTerm)
    )
    this.sortProducts(this.sortorder);
  }

  sortProducts(sortValue : string){
    this.sortorder = sortValue;

    if(this.sortorder === "priceLowToHigh"){
      this.filterProducts.sort((a,b)=> parseInt(a.price)-parseInt(b.price))
    }else if (this.sortorder === "priceHighToLow"){
      this.filterProducts.sort((a,b)=> parseInt(b.price)-parseInt(a.price))
    }

    this.currentPage = 1;  // Reset to first page after sorting
    this.updatePagination();
  }
}
