import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),//optimiza la deteccion de cambios
    provideRouter(routes),//sistema de rutas el cual nos permite usar el router-outlet y la navegacione entre rutas
    provideHttpClient()//permite las peticiones http y el httpclient para peticiones de apis mediante http
  ]
};
