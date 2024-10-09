import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductModel, ProductsResponse } from '../models/products';
import { ProductsService } from '../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];
  dataSource = new MatTableDataSource<ProductModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    productsService.getAll().subscribe(data =>
      this.dataSource.data = data.products
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(productName: string, productId: number): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
      data: {
        productName: productName,
        productId: productId
      }
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.delete(result).subscribe(res => {
          this.snackBar.open('Deleted succesfully', 'Dismiss', {
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        })
      }
    });
  }
}
