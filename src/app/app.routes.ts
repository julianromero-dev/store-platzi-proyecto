import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', component: ProductListComponent },//ruta principal
  { path: 'login', component: LoginComponent },//ruta de login
  { path: 'create-product', component: ProductFormComponent, canActivate: [authGuard] },//ruta de creacion de productos con proteccion de rutas
  { path: 'edit-product/:id', component: ProductFormComponent, canActivate: [authGuard] },//ruta de edicion de productos con proteccion de rutas
  { path: '**', redirectTo: '404' },//ruta de redireccionamiento
  { path: '404', component: PageNotFound },//ruta de pagina no encontrada
];
