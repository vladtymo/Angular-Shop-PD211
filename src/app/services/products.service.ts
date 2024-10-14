import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel, EditProductModel, ProductModel, ProductsResponse } from '../models/products';
import { Observable } from 'rxjs';

const apiFake = "https://dummyjson.com/products/";
const localApi = "https://localhost:7295/api/products/";
const api = "https://shop-pd211-awdhcvf3ebdpb7es.polandcentral-01.azurewebsites.net/api/products/"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(api + "all");
  }

  get(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(api + id);
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(api + "categories");
  }

  edit(model: EditProductModel): Observable<any> {
    console.log("editing...");

    return this.http.put(api, model);
  }

  create(model: ProductModel): Observable<any> {
    return this.http.post(api, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(api + id);
  }
}
