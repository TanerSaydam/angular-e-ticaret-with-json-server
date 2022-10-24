import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/products.model';
import { BasketService } from 'src/app/services/basket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  api: string = environment.api;
  product: ProductModel = new ProductModel();
  products: ProductModel[] = []
  constructor(
    private _http: HttpClient,
    private _basket: BasketService
  ) { }

  ngOnInit(): void {
    this.urunListesiGetir();
  }

  urunListesiGetir(){
    this._http.get<any>(this.api + "products").subscribe({
      next: (res)=> this.products = res,
      error: (err)=> console.log(err)      
    })
  }

  urunEkle(){
    this._http.post<any>(this.api + "products",this.product).subscribe({
      next: (res)=> {
        this.urunListesiGetir();
        this.product = new ProductModel();
      },
      error: (err)=> console.log(err)      
    })
  }


  sepeteUrunEkle(model: ProductModel){
    this._http.post<any>(this.api + "baskets", model).subscribe({
      next: ()=> {
        console.log("Sepete ürün eklendi")
        this.getBaskets();
    },
      error: (err)=> console.log(err)
    })
  }

  getBaskets(){
    this._http.get<any>(this.api + "baskets").subscribe({
      next: (res)=> this._basket.baskets = res,
      error: (err)=> console.log(err)      
    })
  }
}
