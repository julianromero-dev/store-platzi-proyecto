import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/product.model';
import { AuthService } from './auth.service';

export interface CreateCategoryDTO {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'https://api.escuelajs.co/api/v1/categories';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(dto: CreateCategoryDTO): Observable<Category> {
    const token = this.authService.getToken();
    return this.http.post<Category>(this.apiUrl, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
