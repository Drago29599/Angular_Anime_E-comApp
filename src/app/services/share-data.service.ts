import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  cartDetails : Product[] = [];
  constructor() { }
}
