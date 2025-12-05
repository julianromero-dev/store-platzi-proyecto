import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart = signal<Product[]>([]);


  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0);
  });



  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    });
  }



  addToCart(product: Product) {
    this.cart.update(products => [...products, product]);
  }



  removeFromCart(index: number) {
    this.cart.update(products => products.filter((_, i) => i !== index));
  }


  clearCart() {
    this.cart.set([]);
  }
}
