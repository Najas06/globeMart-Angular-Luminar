import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverURL = 'http://localhost:3000'

  wishListCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject('')
  constructor(private http:HttpClient) {
    this.getWishListCount()
    this.getCartCount()
  }
  getAllProductAPI(){
    return this.http.get(`${this.serverURL}/all-products`)
  }

  registerAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/register`,reqBody)
  }

  loginAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/login`,reqBody)
  }

  addHeaderToRequest(){
    let headers = new HttpHeaders()
    let token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }
  addWishListAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/add-wishlist`,reqBody,this.addHeaderToRequest()
    )
  }

  getWishListAPI(){
    return this.http.get(`${this.serverURL}/get-wishlist`,this.addHeaderToRequest())
  }

  deleteWishListAPI(id:any){
    return this.http.delete(`${this.serverURL}/delete-wishlistItem/${id}`)
  }

  getAProductAPI(id:any){
    return this.http.get(`${this.serverURL}/view-product/${id}`)
  }

  getWishListCount(){
    this.getWishListAPI().subscribe({
      next:(res:any)=>{
        this.wishListCount.next(res.length)
      },
      error(err) {
        console.log(err);
      },
    })
  }

  addToCartAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/add-cart`,reqBody,this.addHeaderToRequest())
  }

  getAllCartItemsAPI(){
    return this.http.get(`${this.serverURL}/get-cartItems`,this.addHeaderToRequest())
  }

  removeItemCartAPI(id:any){
    return this.http.delete(`${this.serverURL}/remove-cartItem/${id}`)
  }

  emptyCartAPI(){
    return this.http.delete(`${this.serverURL}/empty-cart`,this.addHeaderToRequest())
  }

  getCartCount(){
    this.getAllCartItemsAPI().subscribe({
      next:(res:any)=>{
        this.cartCount.next(res.length)
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  // api to increment product
  incrementCartItem(id:any){
    return this.http.get(`${this.serverURL}/cart/increament/${id}`)
  }

  // api to decrement product
  decrementCartItem(id:any){
    return this.http.get(`${this.serverURL}/cart/decreament/${id}`)
  }

  getSearchKey(value:any){
    this.searchKey.next(value)
  }
}
