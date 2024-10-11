import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productsService: ProductsService
  ) {
    this.form = fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [null, Validators.maxLength(2000)],
      categoryId: [0, Validators.required]
    });
  }

  submit() {
    if (!this.form.valid) {
      this.openSnackBar("Invalid data.");
      return;
    }

    const item = this.form.value as ProductModel;

    this.productsService.create(item).subscribe(res => 
    {
      this.openSnackBar("Product created successfuly!");
      this.back();
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, "OK", {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  back() {
    history.back();
  }

}
