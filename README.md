# AniTec Web App

Frontend Vue 3 + Vite para la aplicación web de AniTec, construido a partir del modelo `learning-center-master` y organizado por bounded contexts con capas `domain`, `application`, `infrastructure` y `presentation`.

## Stack

- Vue 3 + Vite
- Pinia
- Vue Router
- Vue I18n
- PrimeVue, PrimeFlex y PrimeIcons
- Axios
- JSON Server para datos mock

## Tecnologías aplicadas

### Vue.js

**Donde se aplica:**  
Vue se utiliza en toda la capa de presentación del proyecto, principalmente en los archivos `.vue` ubicados dentro de cada bounded context:

- `src/shared/presentation/views/`
- `src/livestock/presentation/views/`
- `src/sanitary/presentation/views/`
- `src/financial/presentation/views/`
- `src/activities/presentation/views/`
- `src/analytics/presentation/views/`

**Por que se aplica:**  
Se usa Vue porque permite construir interfaces web reactivas y organizadas mediante componentes. Para AniTec esto es util porque la aplicación necesita pantallas dinámicas, como tablas de animales, formularios, dashboard de analíticas y actividades que cambian según los datos.

**Como funciona:**  
Vue conecta el estado de la aplicación con la interfaz. Por ejemplo, cuando el store de animales carga la lista desde la API mock, la tabla de animales se actualiza automáticamente. Las vistas usan `script setup` para definir lógica y `template` para renderizar la interfaz.

### Vite

**Donde se aplica:**  
Vite esta configurado en:

- `vite.config.js`
- `package.json`

**Por que se aplica:**  
Se usa como herramienta de desarrollo y construcción del proyecto. Permite levantar la aplicación rápidamente durante el desarrollo y generar una version optimizada para producción.

**Como funciona:**  
Durante el desarrollo, el comando `npm run dev` inicia un servidor local con recarga automática. Para validar la aplicación antes de entregarla se usa `npm run build`, que genera los archivos finales en la carpeta `dist/`.

### PrimeVue

**Donde se aplica:**  
PrimeVue se registra en:

- `src/main.js`

Y se usa en las vistas mediante componentes con prefijo `pv-`, por ejemplo:

- `pv-button`
- `pv-data-table`
- `pv-column`
- `pv-select`
- `pv-input-text`
- `pv-input-number`
- `pv-textarea`
- `pv-tag`
- `pv-drawer`
- `pv-toast`
- `pv-confirm-dialog`

**Por que se aplica:**  
Se usa PrimeVue porque ofrece componentes ya preparados para aplicaciones empresariales. AniTec necesita tablas, formularios, botones, confirmaciones y controles de entrada consistentes, por lo que PrimeVue acelera el desarrollo y mantiene una interfaz uniforme.

**Como funciona:**  
Los componentes se registran globalmente en `src/main.js`. Luego pueden usarse directamente en las vistas. Por ejemplo, el listado de animales usa `pv-data-table` para mostrar registros, paginar datos y organizar columnas.

### PrimeFlex

**Donde se aplica:**  
PrimeFlex se importa en:

- `src/main.js`

También se usa en algunas clases utilitarias dentro de componentes heredados del proyecto base.

**Por que se aplica:**  
Se usa para contar con utilidades CSS de layout, espaciado y alineación compatibles con PrimeVue. Ayuda a construir interfaces responsivas sin escribir CSS repetitivo para cada caso simple.

**Como funciona:**  
PrimeFlex proporciona clases CSS listas para usar. Por ejemplo, clases como `grid`, `col-12`, `mt-4`, `p-2` permiten controlar distribución, márgenes y espaciado.

### PrimeIcons

**Donde se aplica:**  
PrimeIcons se importa en:

- `src/main.js`

Y se usa en componentes y vistas mediante clases como:

- `pi pi-home`
- `pi pi-id-card`
- `pi pi-heart`
- `pi pi-wallet`
- `pi pi-calendar`
- `pi pi-chart-line`

**Por que se aplica:**  
Se usa para representar acciones y módulos de forma visual. En AniTec ayuda a que la navegación y los botones sean mas fáciles de reconocer.

**Como funciona:**  
PrimeIcons funciona mediante clases CSS. Al colocar una clase `pi pi-*` en una etiqueta `i`, se renderiza el icono correspondiente.

### @primeuix/themes

**Donde se aplica:**  
El tema se configura en:

- `src/main.js`

Actualmente se usa el preset `Material`.

**Por que se aplica:**  
PrimeVue necesita un sistema de tema para definir la apariencia base de sus componentes. El tema permite que botones, tablas, inputs y diálogos tengan estilos consistentes.

**Como funciona:**  
Al inicializar PrimeVue se pasa la configuración del tema. Luego todos los componentes PrimeVue adoptan esa apariencia base, mientras que los estilos propios de AniTec se definen en `src/style.css`.

### Vue Router

**Donde se aplica:**  
Vue Router se configura en:

- `src/router.js`

Y cada contexto define sus rutas en archivos como:

- `src/livestock/presentation/livestock-routes.js`
- `src/sanitary/presentation/sanitary-routes.js`
- `src/financial/presentation/financial-routes.js`
- `src/activities/presentation/activities-routes.js`
- `src/analytics/presentation/analytics-routes.js`

**Por que se aplica:**  
Se usa para manejar la navegación interna de la aplicación sin recargar la pagina. AniTec necesita moverse entre dashboard, animales, sanidad, finanzas, actividades y analíticas.

**Como funciona:**  
Cada ruta asocia una URL con una vista Vue. Por ejemplo, `/livestock/animals` carga el listado de animales. El componente `router-view` ubicado en el layout muestra la vista correspondiente según la ruta actual.

### Pinia

**Donde se aplica:**  
Pinia se configura en:

- `src/pinia.js`
- `src/main.js`

Y se usa en los stores de cada bounded context:

- `src/livestock/application/livestock.store.js`
- `src/sanitary/application/sanitary.store.js`
- `src/financial/application/financial.store.js`
- `src/activities/application/activities.store.js`
- `src/analytics/application/analytics.store.js`

**Por que se aplica:**  
Se usa para centralizar el estado y los casos de uso de cada modulo. Esto evita que las vistas llamen directamente a la API y mantiene la arquitectura ordenada.

**Como funciona:**  
Cada store contiene datos reactivos, funciones para cargar información, crear registros, editar registros y eliminarlos. Por ejemplo, `livestock.store.js` administra la lista de animales y expone acciones como `fetchAnimals`, `addAnimal`, `updateAnimal` y `deleteAnimal`.

### Vue I18n

**Donde se aplica:**  
Vue I18n se configura en:

- `src/i18n.js`

Los textos se almacenan en:

- `src/locales/es.json`
- `src/locales/en.json`

El cambio de idioma se maneja desde:

- `src/shared/presentation/components/language-switcher.vue`

**Por que se aplica:**  
Se usa para que la aplicación pueda manejar textos en mas de un idioma. Aunque AniTec esta orientado principalmente al contexto latinoamericano, el soporte multilenguaje permite mantener compatibilidad con usuarios o entregables en ingles y espanol.

**Como funciona:**  
Las vistas llaman a la función `t()` para obtener textos traducidos. Por ejemplo, `t('animals.title')` muestra "Animales" en espanol o "Animals" en ingles según el idioma activo.

### Axios

**Donde se aplica:**  
Axios se utiliza en:

- `src/shared/infrastructure/base-api.js`

Y es consumido por las APIs de cada contexto:

- `livestock-api.js`
- `sanitary-api.js`
- `financial-api.js`
- `activities-api.js`
- `analytics-api.js`

**Por que se aplica:**  
Se usa para realizar peticiones HTTP hacia el backend o, por ahora, hacia la API mock. AniTec necesita obtener, crear, actualizar y eliminar información desde una fuente de datos.

**Como funciona:**  
`base-api.js` crea una instancia central de Axios con la URL base definida en variables de entorno. Luego cada contexto usa endpoints específicos para consultar sus datos. Por ejemplo, el contexto `livestock` llama a `/animals` y `/herds`.

### JSON Server

**Donde se aplica:**  
JSON Server se configura mediante:

- `server/db.json`
- `server/routes.json`
- script `npm run server` en `package.json`

**Por que se aplica:**  
Se usa como backend simulado mientras no existe un backend real conectado. Permite probar el frontend con datos persistentes y endpoints REST.

**Como funciona:**  
JSON Server lee el archivo `server/db.json` y genera automáticamente endpoints REST. Por ejemplo:

- `/api/v1/animals`
- `/api/v1/health-events`
- `/api/v1/financial-records`
- `/api/v1/farm-events`
- `/api/v1/report-metrics`

Con esto, las vistas pueden listar, crear, editar y eliminar registros sin depender todavía del backend final en .NET.

### Node.js y npm

**Donde se aplica:**  
Node.js y npm se usan como entorno de desarrollo para instalar dependencias y ejecutar scripts del proyecto.

**Por que se aplica:**  
Son necesarios para trabajar con Vite, Vue, PrimeVue y las demás librerías del frontend.

**Como funciona:**  
`npm install` descarga las dependencias definidas en `package.json`. Luego los scripts permiten ejecutar tareas:

- `npm run dev`: levanta el frontend.
- `npm run server`: levanta la API mock.
- `npm run build`: genera la version de producción.

## Tecnologías consideradas pero no usadas aun

### NewsAPI

NewsAPI no se usa actualmente en el frontend. Podría utilizarse en el futuro si AniTec incorpora una sección de noticias agropecuarias, alertas del sector ganadero o novedades sanitarias externas.

### Logo.dev

Logo.dev no se usa actualmente. Podría utilizarse en el futuro si se necesita obtener logos de empresas, aliados, laboratorios veterinarios o instituciones de forma automática.

## Estructura

```text
src/
  iam/          # login, registro, sesión y roles
  livestock/    # animales, hatos, razas e historial general
  sanitary/     # vacunas, tratamientos y visitas medicas
  financial/    # ingresos, egresos y rentabilidad
  activities/   # calendario, actividades y recordatorios
  analytics/    # dashboard, estadísticas y analíticas
  shared/       # layout, API base y componentes comunes
```

## Ejecutar

```bash
npm install
cd server
sh start.sh
cd ..
npm run dev
```

La API mock queda configurada en:

```text
http://localhost:3000/api/v1
```

## Rutas principales

- `/iam/sign-in`
- `/rancher/dashboard`
- `/veterinarian/dashboard`
- `/veterinary/clients`
- `/veterinary/patients`
- `/home`
- `/livestock/animals`
- `/sanitary/health-events`
- `/financial/records`
- `/activities/calendar`
- `/analytics/dashboard`
- `/about`

## Datos mock

Los datos iniciales están en `server/db.json` e incluyen animales, hatos, eventos sanitarios, movimientos financieros, actividades de calendario y métricas para analíticas.

## Usuarios de prueba

La autenticación actual es mock y se maneja en `src/iam/application/iam.store.js`.

| Rol         | Usuario       | Contraseña  | Redirección               |
| ----------- | ------------- | ----------- | ------------------------- |
| Ganadero    | `ganadero`    | `anitec123` | `/rancher/dashboard`      |
| Veterinario | `veterinaria` | `anitec123` | `/veterinarian/dashboard` |

El menu lateral cambia según el rol autenticado. El ganadero accede a panel ganadero, fincas, animales, sanidad, calendario, finanzas y analíticas. El veterinario accede a clientes asignados, pacientes, registros sanitarios, agenda y analíticas.
