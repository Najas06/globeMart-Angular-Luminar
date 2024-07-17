import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProduct: any = []
  token: any = ""
  
  searchKey:any = ""
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.api.getAllProductAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProduct = res

      },
      error: (err: any) => {
        console.log(err);

      }
    })

    this.token = sessionStorage.getItem('token')

    this.api.searchKey.subscribe((res:any)=>{
      this.searchKey = res
      console.log(this.searchKey);
      
    })
  }
  addWishItem(item: any) {
    if (!this.token) {
      alert('please Login')
    }
    else {
      this.api.addWishListAPI(item).subscribe({
        next: (res: any) => {
          console.log(res);
          this.api.getWishListCount()
          alert('Product Added')

        },
        error: (err: any) => {
          console.log(err);
          alert('already added')
        }
      })
    }
  }

  addCartItem(item: any) {
    if (this.token) {
      Object.assign(item,{quatity:1})
      this.api.addToCartAPI(item).subscribe({
        next: (res: any) => {
          console.log(res);
          this.api.getCartCount()
          alert('Product Added')

        },
        error: (err: any) => {
          console.log(err);
          alert(err.error)
        }
      })
    }
    else{
      alert('Please Login First')
    }
  }
}

