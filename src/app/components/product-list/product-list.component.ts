import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { Product, Category } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
//componente de inicio (home)
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  notification = inject(NotificationService);

  @ViewChild('catSlider') catSlider!: ElementRef<HTMLElement>;

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  selectedCategoryId = signal<number | null>(null);

  constructor() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
      this.filteredProducts.set(data);
      this.loading.set(false);
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories.set(data);

    });
  }

  filter(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.selectedCategoryId.set(null);
    this.filteredProducts.set(
      this.products().filter(p => p.title.toLowerCase().includes(query))
    );
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId.set(categoryId);

    if (categoryId === null) {
      this.filteredProducts.set(this.products());

    } else {
      this.filteredProducts.set(
        this.products().filter(p => p.category.id === categoryId)
      );
    }
  }

  addToCart(product: Product) {
    if (!this.authService.isAuthenticated()) {
      this.notification.warn('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    this.cartService.addToCart(product);
    this.notification.success('Producto agregado al carrito');
  }

  deleteProduct(id: number) {
    if (confirm('estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.notification.success('Producto eliminado');
          this.loadProducts();
        },
        error: () => this.notification.error('Error al eliminar el producto')
      });
    }
  }

  slideLeft() {
    const el = this.catSlider?.nativeElement;
    if (el) el.scrollBy({ left: -200, behavior: 'smooth' });
  }

  slideRight() {
    const el = this.catSlider?.nativeElement;
    if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
