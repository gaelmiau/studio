
# 🧩 Lotería Seguridad de la Información

Proyecto demostrativo desarrollado para el evento InfoSegura – 
[Universidad Veracruzana](https://www.uv.mx/)

## 📖 Descripción General

Lotería Seguridad de la Información es una aplicación web interactiva y educativa que adapta el tradicional juego de la lotería mexicana al contexto de la ciberseguridad.
El propósito principal del proyecto es servir como una herramienta dinámica y entretenida que promueva el conocimiento sobre seguridad informática entre estudiantes, profesores y público general durante el evento InfoSegura organizado por la Universidad Veracruzana.

La aplicación permite que múltiples jugadores participen en una partida en tiempo real desde diferentes dispositivos, conectándose mediante salas compartidas alojadas en la nube con Firebase Realtime Database.
Cada jugador recibe un tablero con conceptos de seguridad digital en lugar de imágenes tradicionales, y puede competir en diferentes modos de juego, buscando ser el primero en completar el patrón correspondiente.
## 🎯 Objetivos

* Fomentar la concientización en seguridad informática mediante un juego educativo.

* Ofrecer una experiencia interactiva y colaborativa en tiempo real.

* Mostrar las capacidades de desarrollo con Next.js + Firebase en un entorno responsivo y multiplataforma.

* Proveer un ejemplo práctico de software educativo gamificado con sincronización en la nube.
## 👥 Usuarios objetivo

* Estudiantes universitarios.

* Profesores y personal académico.

* Público general interesado en la ciberseguridad.
## 🕹️ Modos de juego disponibles
* Tablero completo

* Filas

* Columnas

* Esquinas

* Diagonales

* Cuadro central

Cada modo tiene sus propias condiciones de victoria implementadas en el sistema de validación del juego.
## 🧠 Tecnologías empleadas

| Tipo                   | Herramienta / Librería             | Descripción                                          |
| ---------------------- | ---------------------------------- | ---------------------------------------------------- |
| Framework principal    | **Next.js v15.3.3 (pages router)** | Base del proyecto web                                |
| Lenguaje               | **TypeScript**                     | Tipado estático y seguridad en tiempo de compilación |
| Estilos                | **Tailwind CSS + PostCSS**         | Diseño responsivo, fluido y personalizable           |
| Componentes UI         | **shadcn/ui + Radix UI**           | Interfaz moderna, accesible y reutilizable           |
| Backend en tiempo real | **Firebase Realtime Database**     | Sincronización de estado entre jugadores             |
| Hosting                | **Vercel** *(sugerido)*            | Despliegue rápido y optimizado                       |
| Control de versiones   | **Git + GitHub**                   | Colaboración y respaldo del código                   |

## 🏗️ Arquitectura del sistema
El proyecto sigue una **arquitectura modular por capas**, organizada en el directorio ```src/app/.```

**Estructura general:**
```
src/
├── app/
│   ├── page.tsx               → Página principal (Login / Unirse a sala)
│   ├── room/[roomId].tsx      → Pantalla principal del juego
│   ├── glosary/page.tsx       → Glosario educativo de cartas
│   └── components/            → Componentes de Interfaz de Usuario (UI)
│        ├── Header.tsx          → Componente de encabezado
│        ├── Board.tsx           → Componente del tablero de juego
│        ├── Card.tsx            → Componente individual de la carta
│        └── WinnerModal.tsx     → Modal para el anuncio del ganador
├── lib/
│   ├── firebase.ts            → Configuración e inicialización de Firebase
│   ├── firebaseRoom.ts        → Funciones de lectura y escritura en la base de datos (Firestore)
│   ├── loteria.ts             → Lógica de generación y validación de tableros de Lotería
│   └── utils.ts               → Funciones auxiliares y utilidades generales
```
##### Flujo de datos

1. El jugador ingresa su **nombre** y **código de sala.**

2. Si la sala no existe, se crea en Firebase y el primer jugador se convierte en **anfitrión.**

3. Si ya existe, se añade el nuevo jugador al nodo ```players``` dentro de la base de datos.

4. Los cambios (cartas marcadas, turno actual, estado del juego) se sincronizan en tiempo real mediante ```onValue().```

5. Si el anfitrión abandona, el sistema reasigna automáticamente un nuevo anfitrión entre los jugadores restantes.

El juego termina al cumplirse una condición de victoria según el modo elegido.


## 🧩 Casos de uso principales

| Caso                  | Descripción                                                          |
| --------------------- | -------------------------------------------------------------------- |
| **Crear sala**        | El primer jugador genera una sala nueva al ingresar un código único. |
| **Unirse a sala**     | Otros jugadores ingresan el mismo código para unirse.                |
| **Seleccionar modo**  | El anfitrión elige el tipo de patrón para ganar.                     |
| **Iniciar partida**   | El sistema baraja las cartas y comienza el juego.                  |
| **Cantar carta**      | Los jugadores pueden activar el “cantado” de la carta actual.        |
| **Marcar carta**      | Cada jugador marca manualmente si tiene la carta mostrada.           |
| **Detectar ganador**  | El sistema verifica automáticamente la condición de victoria.        |
| **Reiniciar tablero** | Al finalizar, se puede reiniciar con nuevas cartas y modo.           |

## ⚙️ Requisitos no funcionales

* **Responsividad completa**: adaptado a pantallas móviles, tablet y escritorio.

* **Latencia baja**: sincronización en tiempo real mediante Firebase.

* **Reasignación de anfitrión automática**: si un jugador se desconecta abruptamente.

* **Diseño accesible y claro**: siguiendo la identidad visual del evento InfoSegura.
## 🔐 Configuración y entorno

#### Requisitos previos

* Node.js ≥ 18

* Git

* Navegador moderno (Chrome, Firefox, Edge, etc.)

### Instalación local

#### 1. Clonar el repositorio
```
git clone https://github.com/gaelmiau/studio.git
```

#### 2. Entrar al proyecto
```
cd studio
```

#### 3. Instalar dependencias
```
npm install
```

#### 4. Ejecutar en desarrollo
```
npm run dev
```
## 🧰 Módulos clave


**`firebaseRoom.ts`**

Maneja toda la lógica de comunicación con la base de datos:

* Crear, actualizar y obtener salas (setRoom, updateRoom, getRoom).

* Escuchar cambios en tiempo real (listenRoom).

* Reasignar anfitrión en caso de desconexión (handlePlayerLeave).

**`loteria.ts`** 

Contiene la lógica de:

* Generación aleatoria de tableros.

* Validación de condiciones de victoria según modo de juego.
## 📱 Diseño y experiencia de usuario

* Interfaz desarrollada con shadcn/ui y Tailwind, asegurando una visual limpia, moderna y adaptativa.

* Colores institucionales y elementos representativos del evento InfoSegura.

* Distribución flexible (grillas fluidas, tipografía escalable y accesible).
## 🚀 Despliegue

El proyecto puede desplegarse en:

* **Vercel** (configuración recomendada para Next.js)

* **Firebase Hosting** (si se desea mantener todo en el ecosistema Google)

Comando de build:
```
npm run build
```
## 🔮 Futuras extensiones

* Sistema de **chat en sala** entre jugadores.

* **Ranking global** de partidas ganadas.

* **Estadísticas de juego** (tiempo por partida, número de cartas cantadas).

* **Modo observador** para espectadores sin participar directamente.

* **Autenticación** con cuentas UV o Google.
## 🧑‍💻 Créditos

Desarrollado por: **Célula de Desarrollo de Contenidos DGTI Xalapa**

Proyecto de demostración para:
Evento InfoSegura – **Universidad Veracruzana**

