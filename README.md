# Control Gastos - App Móvil

Aplicación móvil para el control de gastos y finanzas personales, desarrollada con React Native, Expo, TypeScript y Firebase.

## Integrantes del equipo

| Nombres | Apellidos | Carné |
|---------|-----------|-------|
| Diego Guillermo | Esnard Romero | ER231474 |
| Eduardo Ezequiel | López Rivera | LR230061 |
| Diego René | López Martínez | LM231893 |
| Christian Gustavo | Crespín Lozano | CL060107 |
| Andrés René | Velásquez Rodríguez | VR222732 |

## Distribución de Trabajo por Módulos

| Integrante | Módulo Asignado | Descripción de Tareas |
|------------|-----------------|-----------------------|
| **Eduardo Ezequiel** | Core & Navegación | Configuración inicial de Expo Router, layouts base y estructura general (`app/_layout.tsx`). |
| **Diego Guillermo** | Autenticación | Integración de Firebase Auth, pantallas públicas de Login/Registro y estado global (`AuthContext`). |
| **Diego René** | Dashboard | Vista principal (Index), cálculo de métricas financieras y resumen del estado de cuenta. |
| **Christian Gustavo** | Gestión de Gastos | Módulo de registro de nuevos gastos (`add.tsx`), validación de formularios y guardado en BD. |
| **Andrés René** | Historial de Transacciones | Vista de historial (`history.tsx`), listado de movimientos financieros, y formateadores de moneda/fecha. |

## Tech Stack

- **Frontend**: React Native 0.81, Expo ~54, TypeScript
- **Navegación**: Expo Router (Enrutamiento basado en archivos)
- **Backend / Auth**: Firebase ^12.12.1
- **Almacenamiento Local**: AsyncStorage  
- **Iconos**: Lucide React Native

## Ejecutar en local

### Requisitos

- Node.js 18+
- npm
- Expo CLI (opcional, se usa mediante `npx`)
- Android Studio (para el emulador de Android) o Xcode (para el simulador de iOS)

### Instalación

```bash
# Instalar dependencias
npm install
```

### Iniciar la aplicación

```bash
# Levantar el servidor de desarrollo de Expo
npm start
```

Esto iniciará **Expo Metro bundler**. Una vez ejecutado, puedes escanear el código QR con la app **Expo Go** en tu dispositivo físico, o presionar `a` en la terminal para abrir el emulador de Android, e `i` para el simulador de iOS.

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Ejecuta la aplicación en Android (`expo run:android`) |
| `npm run ios` | Ejecuta la aplicación en iOS (`expo run:ios`) |
| `npm run web` | Inicia la versión web de la aplicación |
| `npm run emulator` | Ejecuta el script local para levantar el emulador de Android (Windows) |

## Estructura del proyecto

```text
control-gastos/
├── app/                    # App Router de Expo
│   ├── (app)/              # Rutas protegidas
│   │   ├── index.tsx       # Dashboard principal
│   │   ├── add.tsx         # Agregar un gasto
│   │   └── history.tsx     # Historial de gastos
│   ├── (auth)/             # Rutas públicas / de autenticación
│   │   ├── login.tsx       # Iniciar sesión
│   │   └── register.tsx    # Registro de usuario
│   ├── _layout.tsx         # Layout principal de la app
│   └── oauthredirect.tsx   # Redirección para inicio de sesión social
├── src/                    # Lógica y componentes de la aplicación
│   ├── features/           # Módulos divididos por dominio de negocio
│   │   ├── auth/           # Funcionalidades de autenticación
│   │   ├── dashboard/      # Lógica del panel principal
│   │   ├── expenses/       # Lógica del manejo de gastos
│   │   └── history/        # Lógica del historial
│   └── shared/             # Recursos compartidos y reutilizables
│       ├── components/     # Componentes de UI genéricos
│       ├── context/        # Estado global (ej. AuthContext)
│       ├── hooks/          # Custom hooks reutilizables
│       ├── types/          # Interfaces y tipos TypeScript
│       └── utils/          # Helpers (firebase.ts, formatters, validators)
├── scripts/                # Scripts utilitarios (start-emulator.ps1)
└── package.json            # Dependencias y scripts del proyecto
```
