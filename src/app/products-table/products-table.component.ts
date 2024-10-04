import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price'];
  dataSource = new MatTableDataSource<ProductModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private http: HttpClient) {
    http.get<ProductsResponse>('https://dummyjson.com/products').subscribe(data => 
      this.dataSource.data = data.products
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


export interface ProductModel {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export interface ProductsResponse {
  products: ProductModel[];
}

const ELEMENT_DATA: ProductModel[] = [
  {
    id: 100, title: "iPhone X", category: "Electronics", price: 3400, stock: 10, image: "https://applehome.te.ua/wp-content/uploads/2021/04/apple-iphone-x-64gb-used-silver-2.1000x.jpg"
  },
  {
    id: 103, title: "Xiaomi GT56", category: "Electronics", price: 445, stock: 10, image: "https://applehome.te.ua/wp-content/uploads/2021/04/apple-iphone-x-64gb-used-silver-2.1000x.jpg"
  },
  {
    id: 105, title: "iPhone XS", category: "Electronics", price: 234, stock: 1, image: "https://applehome.te.ua/wp-content/uploads/2021/04/apple-iphone-x-64gb-used-silver-2.1000x.jpg"
  }
];