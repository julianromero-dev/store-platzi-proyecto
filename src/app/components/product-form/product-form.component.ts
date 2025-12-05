import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
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
  router = inject(Router);
  route = inject(ActivatedRoute);

  isEditMode = false;
  productId: number | null = null;

  productForm = this.fb.group({
    title: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    categoryId: [1, Validators.required],
    images: ['', Validators.required]
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
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

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.getRawValue();
      const dto: any = {
        ...formValue,
        images: [formValue.images]
      };

      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, dto).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.productService.createProduct(dto).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
