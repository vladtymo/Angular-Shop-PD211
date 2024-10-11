import { Routes } from '@angular/router';
import { ProductsTableComponent } from './products-table/products-table.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ProductsTableComponent },
    { path: 'about', component: AboutComponent },
];
