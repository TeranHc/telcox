🛠 Tecnologías
Frontend: Angular 22 + Bootstrap 5.

Backend: Django 6.0 + Django Rest Framework.

Base de Datos: MySQL.

Infraestructura: Docker & Docker Compose.

🚀 Instrucciones de Ejecución
1. Clonar el repositorio
Bash
git clone https://github.com/TeranHc/telcox.git
cd telcox
2. Configurar el entorno
Crea un archivo .env dentro de la carpeta backend/ con las credenciales de conexión. Este archivo es necesario para que el contenedor pueda conectarse a la base de datos:

Plaintext
# backend/.env
DATABASE_URL=mysql://root:hZlINDZkMoqIqnSHPKcbbqLROXliwcdv@thomas.proxy.rlwy.net:24355/railway

3. Iniciar la aplicación
Para levantar el sistema completo (Frontend y Backend), utiliza Docker Compose:

Bash
docker-compose up --build
🔗 Accesos
Una vez que el proceso de compilación finalice, puedes acceder a la plataforma:

Login (Frontend): http://localhost:4200/login

Panel de Administración (Backend): http://127.0.0.1:8000/admin/

🔑 Credenciales de Acceso
Puedes utilizar las siguientes credenciales para acceder al Panel de Administración:

Usuario: teran

Contraseña: Teran1456823

Desarrollado para TelcoX - Prueba Técnica.
