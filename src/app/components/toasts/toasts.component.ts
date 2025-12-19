import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, ToastMessage } from '../../services/notification.service';
import { Subscription } from 'rxjs';
//toastr para manejo de errores
@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css'
})
export class ToastsComponent implements OnDestroy {
  messages: ToastMessage[] = [];
  sub: Subscription;

  constructor(private notification: NotificationService) {
    this.sub = this.notification.messages$.subscribe(msgs => this.messages = msgs);
  }

  close(id: number) {
    this.notification.remove(id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
