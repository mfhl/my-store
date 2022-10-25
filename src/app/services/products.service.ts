import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpStatusCode,HttpErrorResponse } from '@angular/common/http';
import { retry,catchError,map } from 'rxjs/operators';
import { zip,throwError } from 'rxjs';
//interceptors
import {checkTime} from '../interceptors/time.interceptor';

import {
  Product,
  createProductDTO,
  updateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/products`;
  private apiUrlCategory = `${environment.API_URL}/api/categories`;

  private apiUrltest = 'https://young-sands-07814.herokuapssp.com/api/prodsucsts';

  constructor(private http: HttpClient) {}

  getByCategory(categoryId:string ,limit?: number, offset?: number){
    let params = new HttpParams(); //crear instacia de httpParams
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrlCategory}/${categoryId}/products`, { params,context:checkTime() })

  }
//get product by id details
  getOne(id: string) {

    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }
  //get All Prudtcs
  getAllProducts(categoryId:string,limit?: number, offset?: number) {
    let params = new HttpParams(); //crear instacia de httpParams
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}`, { params,context:checkTime() })
    .pipe(retry(3));

  }//observadores pipe retry

  //consult Product
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  //create new Product
  create(dto: createProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  //update info product
  update(id: string, dto: updateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  //Delete product
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }


//all product pagination :)
  getProductByPage(limit: number, offset: number) {
    let params = new HttpParams(); //crear instacia de httpParams
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params,context:checkTime()});
  }


  fetchReadAndUpdate(id: string, dto: updateProductDTO){
    //correr todo en paralelo a la vez sin depender uno del otro unsar zip
    return zip(
     this.getProduct(id),
     this.update(id,dto)
   )

   }
}
