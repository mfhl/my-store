import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  @Input() product: Product={
    id:'',
    price:0,
    images:[],
    title:'',
    category:{
      id:'',
      name:'',
      typeImg:''
    },
    description:''
  }
  @Output() addedProduct=new EventEmitter<Product>();//envio al padre los objetos products
  @Output() showProdut=new EventEmitter<string>();

  constructor() { }

  onAddToCart(){//clase donde recibo el evento y los objetos y se los paso a product
    this.addedProduct.emit(this.product);

  }

  onShowDetail(){
    this.showProdut.emit(this.product.id);
  }



}
