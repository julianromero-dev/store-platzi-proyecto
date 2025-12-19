# Proyecto Platzi Store con Angular

Este es un proyecto de tipo E-commerce simple que consume la api falsa de platzi que realiza un CRUD simple

## Sus características

- Autenticación JWT y protección de rutas
- Operaciones CRUD de listar, editar, crear y eliminar
- Carrito de compras persistente
- Diseño simple
- Un loader de carga

## Credenciales de acceso

Inicia sesión con las siguientes credenciales

- **Email**: `john@mail.com`
- **Password**: `changeme`

## Requisitos

- Node.js 18 o superior
- Angular CLI

## Instalación y Ejecución

1.  **Instalar las dependencias**:

    ```bash
    npm install
    ```

2.  **Iniciar/ejecutar el proyecto**:

    ```bash
    npm start
    ```

    O tambien

    ```bash
    ng serve
    ```

3.  **Puerto predeterminado**:
    Puerto: `http://localhost:4200`

## Despliegue en vercel

Link del Vercel: `https://store-platzi-proyecto.vercel.app/`

## Notificaciones y validaciones nuevas 🔧

- Se agregó un sistema de notificaciones tipo "toasts" (componente `app-toasts` y `NotificationService`) para mostrar mensajes de éxito, error e información en lugar de `alert`.
- Se agregó un validador personalizado que evita pegar **múltiples URLs** en los campos de imagen (`productForm.images` y `categoryForm.image`). Si se detectan varias URLs o un formato inválido, el formulario mostrará un error y no permitirá enviar.
- Se añadió un **slider horizontal** simple para mostrar las categorías en `ProductList`.

## Estructura del Proyecto

```
src/app/
├── components/
│   ├── cart/
│   ├── category-form/
│   ├── header/
│   ├── login/
│   ├── page-not-found/
│   ├── product-detail/
│   ├── product-form/
│   └── product-list/
│   
├── guards/
├── models/
├── services/
├── app.component
├── app.config.ts
└── app.routes.ts
```
