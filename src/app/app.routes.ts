import { Routes } from '@angular/router';
import { ProductsTableComponent } from './products-table/products-table.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ProductsTableComponent },
    { path: 'create', component: ProductFormComponent },
    { path: 'about', component: AboutComponent },
];
