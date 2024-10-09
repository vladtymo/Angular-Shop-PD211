import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel, ProductsResponse } from '../models/products';
import { Observable } from 'rxjs';

const apiFake = "https://dummyjson.com/products/";
const api = "https://localhost:7295/api/products/";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(api + "all");
  }

  delete(id: number): Observable<any> {
    return this.http.delete(api + id);
  }
}
