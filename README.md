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


## Estructura del Proyecto

```
src/app/
├── components/         
│   ├── header/        
│   ├── login/          
│   ├── product-list/   
│   └── product-form/   
├── guards/        
├── models/       
├── services/        
├── app.component     
├── app.config.ts       
└── app.routes.ts       
```
