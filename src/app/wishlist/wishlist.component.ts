import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allWishListProduct: any = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getWishListProducts()
  }
  getWishListProducts() {
    this.api.getWishListAPI().subscribe({
      next: (res: any) => {

        console.log(res);
        this.allWishListProduct = res
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  removeItemProducts(id:any) {
    this.api.deleteWishListAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getWishListProducts()
        this.api.getWishListCount()
      },
      error: (err: any) => {
        console.log(err);

      }

    })
  }

  addToCart(item:any){
    Object.assign(item,{quatity:1})
    this.api.addToCartAPI(item).subscribe({
      next: (res: any) => {
        console.log(res);
        this.removeItemProducts(item._id)
        this.api.getCartCount()
        alert('Product Added')
      },
      error: (err: any) => {
        if(err.error == 'Product Already In your Cart List'){
          alert('Product added successfully')
          this.removeItemProducts(item._id)
        }
        else{
          alert(err.err)
        }
      }
    })
  }
}
