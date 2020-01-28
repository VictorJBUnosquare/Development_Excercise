import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    constructor(private _http:HttpClient ) { }
  
    addProduct(product:Product):Observable<any>{
        return this._http.post(environment.PRODUCT,product);
    }
    updateProduct(id:number,product:Product):Observable<any>{
        return this._http.put(environment.PRODUCT+'/'+id,product);
      }
    getProducts():Observable<any>{
        return this._http.get(environment.PRODUCTS);
      }

    getProduct(id:number):Observable<any>{
        return this._http.get(environment.PRODUCT+'/'+id);
      }
    deleteProduct(id:number):Observable<any>{
        return this._http.delete(environment.PRODUCT+'/'+id);
    }
  }