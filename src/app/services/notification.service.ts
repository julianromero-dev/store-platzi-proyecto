import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//servicio de notificaciones
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _messages$ = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this._messages$.asObservable();
  private counter = 0;

  private push(type: ToastType, text: string) {
    const id = ++this.counter;
    const current = this._messages$.getValue();
    this._messages$.next([...current, { id, type, text }]);
    setTimeout(() => this.remove(id), 5000);
  }

  remove(id: number) {
    this._messages$.next(this._messages$.getValue().filter(m => m.id !== id));
  }

  success(text: string) {
    this.push('success', text);
  }

  error(text: string) {
    this.push('error', text);
  }

  info(text: string) {
    this.push('info', text);
  }

  warn(text: string) {
    this.push('warning', text);
  }
}
