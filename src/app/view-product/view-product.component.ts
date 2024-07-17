import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: any = {}

  constructor(private api: ApiService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      const { id } = res
      // console.log(id);

      this.viewProduct(id)
    })
  }

  viewProduct(id: any) {
    this.api.getAProductAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addToWishList(reqBody: any) {
    this.api.addWishListAPI(reqBody).subscribe({
      next: (res: any) => {
        console.log(res);
        this.api.getWishListCount()
        alert('Product Added Successfully')
      },
      error: (err: any) => {
        alert('Something Went Wrong')
        console.log(err);
      }
    })
  }

  addToCart(reqBody:any){
    Object.assign(reqBody,{quatity:1})
    this.api.addToCartAPI(reqBody).subscribe({
      next: (res: any) => {
        console.log(res);
        this.api.getWishListCount()
        this.api.getCartCount()
        alert('Product Added Successfully')
      },
      error: (err: any) => {
        alert(err.error)
        console.log(err);
      }
    })
  }
}
