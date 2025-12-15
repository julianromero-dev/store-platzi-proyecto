import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  router = inject(Router);

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    image: ['', [Validators.required, Validators.minLength(5)]]
  });

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.getRawValue() as any).subscribe({
        next: (response) => {

          alert(`categoría creada exitosamente! id: ${response.id}nombre: ${response.name} puedes usar el id: ${response.id} para crear productos con esta categoría`);
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('error al crear la categoría');
        }
      });
    }
  }
}
