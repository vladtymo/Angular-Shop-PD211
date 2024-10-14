import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../services/products.service';
import { CategoryModel, EditProductModel, ProductModel } from '../models/products';
import { ActivatedRoute, Router } from '@angular/router';

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
export class ProductFormComponent implements OnInit {

  editMode = false;
  product: ProductModel | null = null;

  form: FormGroup;
  categories: CategoryModel[] = [];

  constructor(
    fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      id: [0],
      title: ['', Validators.required],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [null, Validators.maxLength(2000)],
      categoryId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    //this.productsService.getCategories().subscribe(data => this.categories = data);

    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.editMode = true;

      this.productsService.get(productId).subscribe(data => {
        this.product = data;
        this.form.patchValue(this.product);
        this.form.controls["categoryId"].setValue(this.product.categoryId.toString());
      });
    }

  }

  submit() {
    if (!this.form.valid) {
      this.openSnackBar("Invalid data.");
      return;
    }

    let model = this.form.value;

    if (model.description === "")
      model.description = null;

    console.log(model);
    console.log(this.editMode);


    if (this.editMode) {
      this.productsService.edit(model).subscribe(x => {
        this.openSnackBar("Product was updated successfully.");
        this.back();
      });
    }
    else {
      this.productsService.create(model).subscribe(x => {
        this.openSnackBar("Product was created successfully.");
        this.back();
      });
    }
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
