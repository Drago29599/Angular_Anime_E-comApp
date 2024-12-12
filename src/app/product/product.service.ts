import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  products: Product[] = [
    // Existing Products
    {
      "id": 1,
      "name": "Attack On Titan Fire",
      "price": "15.99",
      "image_url": "attack-on-titan-fire.jpg",
      "quantity":1
    },
    {
      "id": 2,
      "name": "Attack On Titan Season 2",
      "price": "18.99",
      "image_url": "attack-on-titan-season-2.jpg",
      "quantity":1
    },
    {
      "id": 3,
      "name": "Attack On Titan Season 3 Group",
      "price": "19.99",
      "image_url": "attack-on-titan-season-3-group.jpg",
      "quantity":1
    },
    {
      "id": 4,
      "name": "Attack On Titan Season 3",
      "price": "17.99",
      "image_url": "attack-on-titan-season-3.jpg",
      "quantity":1
    },
    {
      "id": 5,
      "name": "Attack On Titan Season 4",
      "price": "20.99",
      "image_url": "attack-on-titan-season-4.jpg",
      "quantity":1
    },
    {
      "id": 6,
      "name": "Attack On Titan Swords",
      "price": "22.99",
      "image_url": "attack-on-titan-swords.jpg",
      "quantity":1
    },
    {
      "id": 7,
      "name": "Attack On Titan The Final Season Fragments",
      "price": "25.99",
      "image_url": "attack-on-titan-the-final-season-fragments.jpg",
      "quantity":1
    },
    {
      "id": 8,
      "name": "Attack On Titan The Final Season",
      "price": "23.99",
      "image_url": "attack-on-titan-the-final-season.jpg",
      "quantity":1
    },
    {
      "id": 9,
      "name": "Attack On Titans Attack",
      "price": "21.99",
      "image_url": "attack-on-titans-attack.jpg",
      "quantity":1
    },
    {
      "id": 10,
      "name": "Demon Slayer Group Art",
      "price": "19.99",
      "image_url": "demon-slayer-group-art.jpg",
      "quantity":1
    },
    {
      "id": 11,
      "name": "Demon Slayer Key Visual",
      "price": "18.99",
      "image_url": "demon-slayer-key-visual.jpg",
      "quantity":1
    },
    {
      "id": 12,
      "name": "Demon Slayer Key",
      "price": "16.99",
      "image_url": "demon-slayer-key.jpg",
      "quantity":1
    },
    {
      "id": 13,
      "name": "Demon Slayer Mugen Train Collage",
      "price": "22.99",
      "image_url": "demon-slayer-mugen-train-collage.jpg",
      "quantity":1
    },
    {
      "id": 14,
      "name": "Demon Slayer Mugen Train Versus",
      "price": "20.99",
      "image_url": "demon-slayer-mugen-train-versus.jpg",
      "quantity":1
    },
    {
      "id": 15,
      "name": "Demon Slayer Mugen Train",
      "price": "19.99",
      "image_url": "demon-slayer-mugen-train.jpg",
      "quantity":1
    },
    {
      "id": 16,
      "name": "Logo Anime",
      "price": "14.99",
      "image_url": "logo-anime.jpg",
      "quantity":1
    },
    {
      "id": 17,
      "name": "Naruto Shippuden Itachi Uchiha",
      "price": "24.99",
      "image_url": "naruto-shippuden-itachi-uchiha.jpg",
      "quantity":1
    },
    {
      "id": 18,
      "name": "Naruto Shippuden Itachi",
      "price": "23.99",
      "image_url": "naruto-shippuden-itachi.jpg",
      "quantity":1
    },
    {
      "id": 19,
      "name": "Naruto Shippuden Kakashi 2",
      "price": "22.99",
      "image_url": "naruto-shippuden-kakashi-2.jpg",
      "quantity":1
    },
    {
      "id": 20,
      "name": "Naruto Shippuden Kakashi",
      "price": "21.99",
      "image_url": "naruto-shippuden-kakashi.jpg",
      "quantity":1
    },
    {
      "id": 21,
      "name": "Naruto Shippuden Pack 2",
      "price": "24.99",
      "image_url": "naruto-shippuden-pack-2.jpg",
      "quantity":1
    },
    {
      "id": 22,
      "name": "Netflix One Piece Going Merry",
      "price": "25.99",
      "image_url": "netflix-one-piece-going-merry.jpg",
      "quantity":1
    },
    {
      "id": 23,
      "name": "Netflix One Piece Jolly Roger",
      "price": "22.99",
      "image_url": "netflix-one-piece-jolly-roger.jpg",
      "quantity":1
    },
    {
      "id": 24,
      "name": "Netflix One Piece",
      "price": "20.99",
      "image_url": "netflix-one-piece.jpg",
      "quantity":1
    },
    {
      "id": 25,
      "name": "One Piece Alliance",
      "price": "27.99",
      "image_url": "one-piece-alliance.jpg",
      "quantity":1
    },
    {
      "id": 26,
      "name": "One Piece Brook Wanted Poster",
      "price": "24.99",
      "image_url": "one-piece-brook-wanted-poster.jpg",
      "quantity":1
    },
    {
      "id": 27,
      "name": "One Piece Chopper Wanted Poster",
      "price": "23.99",
      "image_url": "one-piece-chopper-wanted-poster.jpg",
      "quantity":1
    },
    {
      "id": 28,
      "name": "One Piece Fishman Island 2",
      "price": "22.99",
      "image_url": "one-piece-fishman-island-2.jpg",
      "quantity":1
    },
    {
      "id": 29,
      "name": "One Piece Fishman Island",
      "price": "21.99",
      "image_url": "one-piece-fishman-island.jpg",
      "quantity":1
    },
    {
      "id": 30,
      "name": "One Piece Going Merry",
      "price": "29.99",
      "image_url": "one-piece-going-merry.jpg",
      "quantity":1
    },
    {
      "id": 31,
      "name": "One Piece Thousand Sunny",
      "price": "19.99",
      "image_url": "one-piece-thousand-sunny.jpg",
      "quantity":1
    },
    {
      "id": 32,
      "name": "One Piece",
      "price": "18.99",
      "image_url": "one-piece.jpg",
      "quantity":1
    },
    {
      "id": 33,
      "name": "One Piece Roronoa Zoro Wanted Poster",
      "price": "27.99",
      "image_url": "one-piece-roronoa-zoro-wanted-poster.jpg",
      "quantity":1
    },
    {
      "id": 34,
      "name": "One Piece Wano Country Fighting",
      "price": "25.99",
      "image_url": "one-piece-wano-country-fighting.jpg",
      "quantity":1
    },
    {
      "id": 35,
      "name": "One Piece Wano Country",
      "price": "23.99",
      "image_url": "one-piece-wano-country.jpg",
      "quantity":1
    }
  ];
  
  
  
  getProducts():Observable<Product[]>{
    //return this.http.get<Product[]>(this.apiUrl+'/products');
    return of(this.products);
  }

  getProductById(id:string): Product | undefined{
    return this.products.find(data=> data.id === parseInt(id) );
  }
}
