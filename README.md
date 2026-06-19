# TelcoX - Plataforma de Autogestión Fullstack

Plataforma desarrollada para la autogestión de servicios de telecomunicaciones, permitiendo a los clientes visualizar consumos, historial de facturación y gestión de paquetes mediante una arquitectura Full Stack moderna.

## 🛠 Tecnologías Utilizadas

### Frontend

* Angular 22
* Bootstrap 5
* TypeScript

### Backend

* Django 6.0
* Django REST Framework
* Gunicorn

### Base de Datos

* MySQL

### Infraestructura y DevOps

* Docker
* Docker Compose
* Railway

---

## 🚀 Demo en Producción

La aplicación se encuentra desplegada y disponible para pruebas en los siguientes enlaces:

### Frontend

https://victorious-warmth-production.up.railway.app/login

### Backend (Panel Administrativo)

https://telcox-production.up.railway.app/admin/

---

## 📦 Ejecución Local con Docker

### 1. Clonar el repositorio

```bash
git clone https://github.com/TeranHc/telcox.git
cd telcox
```

### 2. Configurar variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend/` con la configuración de la base de datos:

```env
DATABASE_URL=mysql://root:hZlINDZkMoqIqnSHPKcbbqLROXliwcdv@thomas.proxy.rlwy.net:24355/railway
```

### 3. Levantar la aplicación

```bash
docker compose up --build
```

---

## 🔗 Accesos Locales

Una vez iniciados los contenedores:

### Frontend

http://localhost:4200/login

### Backend (Panel Administrativo)

http://localhost:8000/admin/

---

## 🔑 Credenciales de Acceso

### Administrador

**Usuario:** teran

**Contraseña:** Teran1456823

---

## 🐳 Docker

El proyecto se encuentra completamente dockerizado mediante Docker Compose, permitiendo ejecutar Frontend y Backend con un único comando.

Contenedores incluidos:

* Frontend Angular
* Backend Django + Gunicorn
* Conexión a Base de Datos MySQL mediante variables de entorno

---

## 📋 Funcionalidades Implementadas

* Inicio de sesión de usuarios.
* Visualización de consumo de datos.
* Visualización de consumo de minutos.
* Consulta de saldo disponible.
* Consulta de historial de facturación.
* Gestión y visualización de paquetes contratados.
* API REST para integración con sistemas BSS simulados.
* Panel administrativo de Django para gestión de datos.

---

## 👨‍💻 Autor

Kevin Johao Terán Rodríguez

Prueba Técnica - TelcoX
