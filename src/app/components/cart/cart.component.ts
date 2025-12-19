import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
//componente del carrito
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);
  notification = inject(NotificationService);

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  clearCart() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.cartService.clearCart();
      this.notification.success('Carrito vaciado');
    }
  }
}
