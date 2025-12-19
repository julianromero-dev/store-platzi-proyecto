import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFound } from './components/page-not-found/page-not-found';
//rutas protegidas
export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'create-product', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'edit-product/:id', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'create-category', component: CategoryFormComponent, canActivate: [authGuard] },
  { path: '404', component: PageNotFound },
  { path: '**', redirectTo: '404' }
];
