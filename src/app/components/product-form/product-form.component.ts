import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  isEditMode = false;
  productId: number | null = null;
  errorMessage = '';
  isSubmitting = false;
  categories = signal<Category[]>([]);

  productForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    categoryId: [1, Validators.required],
    images: this.fb.control('', [Validators.required, Validators.minLength(15)])
  });

  ngOnInit() {

    this.loadCategories();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe(product => {
      this.productForm.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: product.images[0]
      });
    });
  }
//crud
  onSubmit() {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formValue = this.productForm.getRawValue();

      const dto: any = {
        title: formValue.title?.trim(),
        price: Number(formValue.price),
        description: formValue.description?.trim(),
        categoryId: Number(formValue.categoryId),
        images: [formValue.images?.trim()]
      };

      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, dto).subscribe({
          next: (response) => {
            alert(`producto actualizado exitosamente! id: ${response.id}título: ${response.title}precio: $${response.price}categoría: ${response.category?.name || 'N/A'}`);
            this.router.navigate(['/']);
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      } else {
        this.productService.createProduct(dto).subscribe({
          next: (response) => {
            alert(`producto creado exitosamente!id: ${response.id}título: ${response.title}precio: $${response.price}categoría: ${response.category?.name}puedes usar el id: ${response.id} para editar o eliminar este producto`);
            this.router.navigate(['/']);
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      }
    }
  }
}
