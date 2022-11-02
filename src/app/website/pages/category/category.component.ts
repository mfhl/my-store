import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from  'rxjs/operators'
//models
import { Product } from 'src/app/models/product.model';
//services
import {ProductsService} from '../../../services/products.service'



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId:string |null=null;

    //pagination var
    limit = 10;
    offset = 0;

    products: Product[] = [];

  constructor(
    private route:ActivatedRoute,
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.categoryId=params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
      //si hay mas peticiones seguir usando switchmap y se concatena con coma y siempre espera un retunr como respuesta para evitat el callback hell
    )
    .subscribe(data => {
      this.products=data;
    })
  }

}
