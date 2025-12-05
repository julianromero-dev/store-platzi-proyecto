import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';//GET, POST, PUT, DELETE
import { Observable } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';


  getProducts(): Observable<Product[]> {
    console.log(this.http.get<Product[]>(this.apiUrl));

    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(dto: CreateProductDTO): Observable<Product> {
    const token = this.authService.getToken();
    return this.http.post<Product>(this.apiUrl, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateProduct(id: number, dto: UpdateProductDTO): Observable<Product> {
    const token = this.authService.getToken();
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  deleteProduct(id: number): Observable<boolean> {
    const token = this.authService.getToken();
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
