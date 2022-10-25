import { Component, OnInit } from '@angular/core';
//services
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

//components
import {createProductDTO, Product} from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private StoreService: StoreService,
    private producstServices: ProductsService
  ) { }

  ngOnInit(): void {
    this.producstServices
      .getProductByPage(10, 0) //traer los datos de forma asyncrona
      .subscribe((data) => {
        //tener la informacion lista del api
        this.products = data;
      });
  }

}
