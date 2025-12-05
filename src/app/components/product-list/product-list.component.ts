import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  productService = inject(ProductService);

  cartService = inject(CartService);

  authService = inject(AuthService);


  products = signal<Product[]>([]);

  filteredProducts = signal<Product[]>([]);

  loading = signal(true);


  constructor() {

    this.loadProducts();

  }


  loadProducts() {

    this.loading.set(true);

    this.productService.getProducts().subscribe(data => {

      this.products.set(data);

      this.filteredProducts.set(data);

      this.loading.set(false);

    });
  }

  filter(event: Event) {

    const query = (event.target as HTMLInputElement).value.
    toLowerCase();

    this.filteredProducts.set(

      this.products().filter(p => p.title.toLowerCase().includes(query))

    );
  }

  addToCart(product: Product) {

    if (!this.authService.isAuthenticated()) {

      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }


  deleteProduct(id: number) {

    if (confirm('¿Estás seguro de eliminar este producto?')) {

      this.productService.deleteProduct(id).subscribe(() => {

        this.loadProducts();

      });

    }

  }

}
