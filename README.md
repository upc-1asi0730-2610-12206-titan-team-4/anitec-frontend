# AniTec Web App

Frontend Vue 3 + Vite para la aplicacion web de AniTec. La aplicacion esta organizada por bounded contexts y consume el backend real `anitec-backend`, desarrollado con .NET y MySQL.

## Stack

- Vue 3 + Vite
- Pinia
- Vue Router
- Vue I18n
- PrimeVue, PrimeFlex y PrimeIcons
- Axios
- Chart.js mediante el componente Chart de PrimeVue
- Backend AniTec Platform en .NET + MySQL

## Flujo De Ejecucion

El frontend consume el backend real de AniTec. Por eso, antes de abrir la aplicacion web, primero debe estar levantado MySQL y luego el backend.

### 1. Iniciar MySQL

Verifica que el servicio de MySQL este iniciado. En Windows puedes usar la aplicacion **Services** y revisar que `MySQL80` este en estado `Running`.

Tambien puedes probar desde PowerShell como administrador:

```powershell
net start MySQL80
```

La base de datos usada por defecto es:

```text
anitec-platform
```

Si todavia no existe, puedes crearla desde MySQL Workbench:

```sql
CREATE DATABASE `anitec-platform`;
```

### 2. Levantar El Backend

En una terminal:

```powershell
cd C:\Users\melga\Desktop\TrabajoFinalAppWeb\anitec-backend
dotnet run --project Anitec.Platform
```

El backend queda disponible en:

```text
http://localhost:5191/api/v1
http://localhost:5191/swagger
```

### 3. Levantar El Frontend

En otra terminal:

```powershell
cd C:\Users\melga\Desktop\TrabajoFinalAppWeb\anitec-frontend
npm install
npm run dev
```

El frontend queda disponible normalmente en:

```text
http://localhost:5173
```

El archivo `.env.development` apunta al backend local:

```text
VITE_ANITEC_API_URL="http://localhost:5191/api/v1"
```

Para validar el build:

```powershell
npm run build
```

## Acceso A La Aplicacion

AniTec ya usa IAM real. Puedes crear usuarios desde:

```text
http://localhost:5173/iam/sign-up
```

En el registro se debe seleccionar el tipo de cuenta:

- `Ganadero`, enviado al backend como `Rancher`.
- `Veterinario`, enviado al backend como `Veterinarian`.

Luego puedes iniciar sesion desde:

```text
http://localhost:5173/iam/sign-in
```

## Usuarios Iniciales Del Seed

Si la base de datos esta vacia, el backend crea algunos usuarios iniciales. Todos usan la contrasena `anitec123`.

| Rol | Usuario | Dashboard |
| --- | --- | --- |
| Ganadero | `ganadero` | `/rancher/dashboard` |
| Ganadero | `maria` | `/rancher/dashboard` |
| Ganadero | `jose` | `/rancher/dashboard` |
| Ganadero | `rosa` | `/rancher/dashboard` |
| Veterinario | `veterinaria` | `/veterinarian/dashboard` |
| Veterinario | `vetpedro` | `/veterinarian/dashboard` |
| Veterinario | `vetlucia` | `/veterinarian/dashboard` |

## Estructura

```text
src/
  iam/          # login, sesion, roles y clientes veterinarios
  livestock/    # fincas, animales, especies, razas e historial general
  sanitary/     # vacunas, tratamientos, diagnosticos y visitas medicas
  financial/    # ingresos, egresos y rentabilidad
  activities/   # calendario, actividades y recordatorios
  analytics/    # dashboard, estadisticas y analiticas
  shared/       # layout, API base, IoT, pagos y componentes comunes
```

## Tecnologias Aplicadas

### Vue.js

Se usa en toda la capa de presentacion mediante archivos `.vue`. Sirve para construir pantallas reactivas como dashboards, formularios, listados de animales, reportes, IoT y pagos. Vue conecta el estado de los stores con la interfaz: cuando llegan datos del backend, las vistas se actualizan automaticamente.

### Vite

Esta configurado en `vite.config.js` y `package.json`. Sirve para ejecutar el entorno de desarrollo con `npm run dev` y generar el build final con `npm run build`. Vite compila el frontend y entrega recarga rapida durante desarrollo.

### PrimeVue

Se registra en `src/main.js` y se usa con componentes `pv-*`, como `pv-button`, `pv-input-text`, `pv-select`, `pv-chart`, `pv-tag`, `pv-toast` y `pv-confirm-dialog`. Sirve para construir interfaces de aplicacion empresarial con componentes listos, consistentes y reutilizables.

### PrimeFlex

Se importa en `src/main.js`. Sirve como sistema de utilidades CSS para layout, espaciado y alineacion. En AniTec complementa los estilos propios definidos en `src/style.css`.

### PrimeIcons

Se importa en `src/main.js` y se usa con clases como `pi pi-heart`, `pi pi-wallet`, `pi pi-calendar`, `pi pi-chart-line`, `pi pi-wifi` y `pi pi-credit-card`. Sirve para reforzar visualmente modulos y acciones.

### @primeuix/themes

Se configura en `src/main.js`. Sirve para dar estilo base a los componentes PrimeVue. Los colores, paneles y tarjetas propias de AniTec se terminan de definir en `src/style.css`.

### Vue Router

Se configura en `src/router.js` y en los archivos de rutas de cada bounded context. Sirve para navegar sin recargar la pagina y proteger rutas por rol. El frontend normaliza los roles del backend `Rancher` y `Veterinarian` a `rancher` y `veterinarian`.

### Pinia

Se configura en `src/pinia.js` y se usa en los stores de cada modulo. Sirve para centralizar estado y casos de uso: cargar datos, crear registros, editar, eliminar y compartir informacion entre pantallas.

### Vue I18n

Se configura en `src/i18n.js`, con textos en `src/locales/es.json` y `src/locales/en.json`. Sirve para manejar traducciones en espanol e ingles. Las vistas usan `t()` para leer textos segun el idioma activo.

### Axios

Se usa en `src/shared/infrastructure/base-api.js`. Sirve para hacer peticiones HTTP al backend. La URL base se define en `.env.development` como `http://localhost:5191/api/v1`. El interceptor agrega el token JWT al header `Authorization`.

### Chart.js

Se usa a traves del componente `pv-chart` de PrimeVue en analiticas y reportes. Sirve para graficos de estado sanitario, registros por tipo y atenciones por hato.

### Backend AniTec Platform

El frontend consume el backend .NET real. Ya no depende de `json-server`. Los datos semilla se crean desde el backend cuando la base esta vacia, incluyendo usuarios, roles, fincas, animales, sanidad, finanzas, actividades, clientes veterinarios, dispositivos IoT, metricas, planes y pagos mock.

## Endpoints Consumidos

- `POST /authentication/sign-in`
- `POST /authentication/sign-up`
- `GET /users`
- `GET /herds`
- `GET /animals`
- `GET /health-events`
- `GET /financial-records`
- `GET /farm-events`
- `GET /report-metrics`
- `GET /analytics/ranchers/{rancherId}/dashboard`
- `GET /analytics/veterinarians/{veterinarianId}/dashboard`
- `GET /veterinarian/{veterinarianId}/clients`
- `GET /veterinarian/{veterinarianId}/available-ranchers`
- `POST /veterinarian/{veterinarianId}/clients/{rancherId}`
- `DELETE /veterinarian/{veterinarianId}/clients/{rancherId}`
- `GET /devices`
- `GET /devices/{id}/metrics`
- `GET /devices/{id}/latest-metric`
- `GET /subscription-plans`
- `GET /subscriptions/users/{userId}/active`
- `GET /subscriptions/users/{userId}/payments`
- `POST /subscriptions/mock-checkout`

## Rutas Principales

- `/iam/sign-in`
- `/iam/sign-up`
- `/rancher/dashboard`
- `/veterinarian/dashboard`
- `/veterinary/clients`
- `/veterinary/add-client`
- `/veterinary/patients`
- `/livestock/herds`
- `/livestock/animals`
- `/sanitary/health-events`
- `/financial/records`
- `/activities/calendar`
- `/analytics/dashboard`
- `/iot`
- `/subscriptions`

## Notas

La carpeta `server/` puede conservarse solo como referencia historica de datos mock, pero el flujo actual de la aplicacion no requiere ejecutar `npm run server`.

NewsAPI y Logo.dev no se usan actualmente. Podrian agregarse en el futuro para noticias agropecuarias o logos de aliados, pero no forman parte del frontend conectado al backend.
