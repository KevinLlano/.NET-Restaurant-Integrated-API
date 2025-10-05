import { Routes } from '@angular/router';
import { FoodItemsComponent } from './components/food-items/food-items.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'food-items', component: FoodItemsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '**', redirectTo: '/login' }
];
