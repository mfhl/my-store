import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  createProductDTO,
  Product,
  updateProductDTO,
} from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { Subscriber,zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Toast } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  //var close button detail product
  @ViewChild('closeButtonModalDetailProduct') closebutton: any;

  alertBool = '';
  alertBoolError = '';
  errorMessage = '';
  errorMessageTest = '';
  dataTitle = '';
  dataId = '';
  messageAlert = '';
  messageAlertPriv = '';

  //products var
  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  today = new Date();
  date = new Date(1992, 7, 11);
  showProductDetail = false;
  producChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
      typeImg: '',
    },
    description: '',
  };

  //pagination var
  limit = 10;
  offset = 0;

  constructor(
    private StoreService: StoreService,
    private producstServices: ProductsService
  ) {
    this.myShoppingCart = this.StoreService.getShoppingCart();
  }

  ngOnInit(): void {

  }


  onAddToShoppingCart(product: Product) {
    // console.log(product); //recibo los objetos del hijo y los imprimo consola
    //this.myShoppingCart.push(product);
    this.StoreService.addProduct(product);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.producstServices.getProduct(id).subscribe((data) => {
      this.toggleProductDetail();
      this.producChosen = data;
    });
  }

  createNewProduct() {
    const product: createProductDTO = {
      title: 'nuevo producto ',
      price: 1000,
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 1,
      description: 'cualquier cosa',
    };
    this.producstServices.create(product).subscribe(
      (data) => {
        //console.log('create',data);
        //this.products.unshift(data);//insertar al grid el nuevo producto agregado
        this.products.unshift(data);
        this.toastbtn();
        this.dataTitle = data.title;
        this.dataId = data.id;
        this.alertSusscesfull('Product Create susscesfull' + ' ' + data.title);
      },
      (error) => {
        this.errorMessage = error.message;
        this.alertsError('Error Created Product, Check error!');
      }
    );
  }

  //toasr susscesfull insert post new product
  toastbtn() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });
    toastList.forEach((toast) => toast.show());
  }

  updateProduct() {
    const changes: updateProductDTO = {
      title: 'hola como estas',
    };
    const id = this.producChosen.id;
    this.producstServices.update(id, changes).subscribe(
      (data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.producChosen.id
        );
        this.products[productIndex] = data;
        this.alertSusscesfull('Product update susscesfull' + ' ' + data.title);
        //close modal
        this.closebutton.nativeElement.click();
      },
      (error) => {
        this.errorMessage = error.message;
        this.alertsError('Error Update Product, Check error!');
        //close modal
        this.closebutton.nativeElement.click();
      }
    );
  }

  //delete Product
  deleteProduct() {
    const id = this.producChosen.id;
    this.producstServices.delete(id).subscribe(
      (data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.producChosen.id
        );
        this.products.splice(productIndex, 1);
        //close modal
        this.closebutton.nativeElement.click();
        //send message
        this.alertSusscesfull(
          'Product Deleted susscesfull ' + 'id product=  ' + id
        );
      },
      (error) => {
        this.errorMessage = error.message;
        //alerts
        this.alertsError(
          'Product Deleted unsusscesfull ' + 'id product=  ' + id
        );
        //close modal
        this.closebutton.nativeElement.click();
      }
    );
  }

  loadMorePagination() {
    this.producstServices
      .getProductByPage(this.limit, this.offset) //traer los datos de forma asyncrona
      .subscribe((data) => {
        //tener la informacion lista del api
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

  //callback hell anidar peticiones
  readAndUpdate(id: string) {
    this.producstServices.getProduct(id)
    .pipe(
      //depender de una respuesta sigu el sgt proceso switchMap
      switchMap((product) =>this.producstServices.update(product.id,{title:'change title'})),
    )
    .subscribe(data=>{
     // console.log(data);
    });

    //llamar al zip de rxj puede mandar varias peticiones sin depender una de la otra
    this.producstServices.fetchReadAndUpdate(id,{title:'title nuevo zip'})
    .subscribe(response=>{
      const read=response[0];
      const uptade=response[1];
    })
  }
  //end callback hell


  //error Alerts
  alertsError(messageAlertPriv: string) {
    this.alertBoolError = '2';
    this.messageAlert = messageAlertPriv;
  }

  alertSusscesfull(messageAlertPriv: string) {
    this.alertBool = '1';
    this.messageAlert = messageAlertPriv;
  }

  closeAlertError() {
    this.alertBool = '';
    this.alertBoolError = '';
    this.messageAlert = '';
    //console.log(this.messageAlert);
  }
  //end alerts
}
