import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  wishCount: number = 0;
  cartCountNumber: number = 0;
  username:string = ""

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      const existingUser = JSON.parse(sessionStorage.getItem('existingUser') as string)
      this.username = existingUser.username
      console.log(this.username);
      
      this.api.wishListCount.subscribe({
        next: (res: any) => {
          this.wishCount = res
        }
      })
 
      this.api.cartCount.subscribe((res: any) => {
        this.cartCountNumber = res
        console.log(res);
        
      })
    }
  }

  getSearch(value:any){
    this.api.getSearchKey(value)
  }
}
