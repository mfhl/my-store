import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
//models
import { Product } from 'src/app/models/product.model';
//services
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route:ActivatedRoute,
    private productsService:ProductsService,
    private location:Location
  ) { }

  ngOnInit(): void {
    console.log('holi');
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.productId=params.get('id');
        if(this.productId){
          return this.productsService.getOne(this.productId)
        }
        return [null];
      })
      //si hay mas peticiones seguir usando switchmap y se concatena con coma y siempre espera un retunr como respuesta para evitat el callback hell
    )
    .subscribe(data => {
      this.product=data;
      console.log(this.product);
    })
  }

  //back pages
  goToBack(){
    this.location.back();

  }

}
