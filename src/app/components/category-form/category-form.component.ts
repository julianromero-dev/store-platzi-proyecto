import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { singleUrlValidator, noWhitespaceValidator } from '../../utils/validators';
//componente del formulario de categoria
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
  notification = inject(NotificationService);

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), noWhitespaceValidator]],
    image: ['', [Validators.required, Validators.minLength(5), singleUrlValidator]]
  });

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.getRawValue() as any).subscribe({
        next: (response) => {
          this.notification.success(`Categoría creada: ${response.name}`);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notification.error('Error al crear la categoría');
        }
      });
    }
  }
}
