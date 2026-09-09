# Time Rescue

## Descripción

**Time Rescue** es un videojuego 2D de plataformas desarrollado con Phaser y JavaScript.

El jugador controla a **John**, un joven pirata que debe atravesar el territorio controlado por un pirata rival para rescatar a sus dos compañeros y conseguir escapar.

El juego está dividido en cuatro niveles. Cada nivel presenta plataformas, enemigos y un límite de tiempo que obliga al jugador a avanzar rápidamente y tomar decisiones durante el recorrido.

El proyecto fue desarrollado como trabajo práctico de programación utilizando JavaScript, Node.js, Vite y Phaser, con asistencia de OpenCode durante el proceso de desarrollo.

---

## Integrantes

* Jesús Romeo Claus
* [Nombre del segundo integrante]

---

## Tecnologías utilizadas

* **JavaScript**
* **Node.js**
* **Vite**
* **Phaser**
* **Git / GitHub**
* **OpenCode** como herramienta de asistencia durante el desarrollo

---

## Instalación

Clonar el repositorio y acceder a la carpeta del proyecto:

```bash
git clone https://github.com/jesusromeoclaus123-ui/time-rescue.git
cd time-rescue
```

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego acceder a la dirección indicada por Vite en la terminal.

---

## Build de producción

Para comprobar que el proyecto puede generar una versión de producción:

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

---

## Gameplay

### Objetivo

El objetivo principal es completar los cuatro niveles, rescatar a los compañeros de John y llegar a la salida de cada nivel antes de que se termine el tiempo.

La progresión es:

```text
Inicio
  ↓
Nivel 1
  ↓
Nivel 2
  ↓
Nivel 3
  ↓
Nivel 4
  ↓
Victoria
```

Si el jugador pierde todas sus vidas o se termina el tiempo antes de completar el nivel, se produce la derrota del nivel y este debe comenzar nuevamente.

---

## Mecánicas principales

### Movimiento

El jugador puede desplazarse horizontalmente y saltar entre las plataformas.

### Doble salto

John puede realizar un segundo salto en el aire, permitiendo alcanzar plataformas ubicadas a diferentes alturas.

### Rescate de NPCs

Para rescatar a un compañero, el jugador debe acercarse al NPC y presionar `F`.

Cada NPC rescatado otorga puntos.

### Enemigos

Durante los niveles aparecen enemigos que dificultan el recorrido.

El contacto con un enemigo provoca la pérdida de una vida.

### Salida del nivel

Cada nivel posee una meta o salida. Al llegar a ella se completa el nivel y se pasa al siguiente.

---

## Sistema de vidas

Cada nivel comienza con **3 vidas**.

Cuando el jugador recibe daño:

* Pierde una vida.
* Si todavía quedan vidas, puede continuar el nivel.
* Si llega a 0 vidas, el nivel se considera perdido y debe reiniciarse.

Al reiniciar un nivel se restablecen:

* NPCs.
* Enemigos.
* Progreso del nivel.
* Temporizador.
* Vidas.

La puntuación obtenida en niveles anteriores se mantiene.

Los puntos obtenidos durante un intento fallido del nivel se descartan.

---

## Sistema de tiempo

Cada nivel dispone de **30 segundos** para ser completado.

Si el tiempo llega a 0 antes de alcanzar la salida, el nivel se pierde y debe comenzar nuevamente.

Al comenzar un nivel nuevo se establece nuevamente el límite de 30 segundos.

---

## Sistema de puntuación

La puntuación se obtiene de la siguiente manera:

| Acción                                 | Puntos |
| -------------------------------------- | -----: |
| Rescatar un NPC                        |    +20 |
| Derrotar un enemigo                    |    +30 |
| Completar un nivel                     |    +50 |
| NPC no rescatado al completar el nivel |    -10 |

La puntuación obtenida en niveles anteriores se conserva durante la partida.

---

## Controles

| Acción                 | Tecla     |
| ---------------------- | --------- |
| Moverse a la izquierda | `A` / `←` |
| Moverse a la derecha   | `D` / `→` |
| Saltar / doble salto   | `Espacio` |
| Rescatar NPC           | `F`       |

---

## Flujo del juego

El juego cuenta con un flujo básico de inicio, partida, victoria y derrota:

```text
Pantalla de inicio
       ↓
     Nivel
       ↓
 ┌─────┴─────┐
 ↓           ↓
Victoria    Derrota
 ↓           ↓
Siguiente   Reinicio
 nivel      del nivel
 ↓
Nivel 4
 ↓
Victoria final
```

---

## Arquitectura del proyecto

El código del juego se encuentra organizado dentro de `src/game`.

Estructura principal:

```text
time-rescue/
├── README.md
├── AGENTS.md
├── package.json
├── vite.config.js
├── docs/
│   └── GDD.pdf
├── public/
│   └── assets/
└── src/
    ├── main.js
    └── game/
        ├── data/
        │   └── levels.js
        ├── scenes/
        │   ├── Preloader.js
        │   ├── MainMenu.js
        │   ├── Game.js
        │   └── Victory.js
        └── ...
```

### Escenas principales

* **Preloader:** carga los recursos necesarios para el juego.
* **MainMenu:** muestra la pantalla inicial.
* **Game:** contiene la lógica principal de los niveles y el gameplay.
* **Victory:** muestra la pantalla de victoria al completar el juego.

### Datos de los niveles

El archivo `levels.js` contiene la información utilizada para configurar los diferentes niveles, como posiciones y distribución de elementos.

Los recursos gráficos se encuentran dentro de:

```text
public/assets/
```

---

## Patrón utilizado

El proyecto utiliza una organización basada en **escenas de Phaser**, separando diferentes estados y partes del flujo del juego.

Las escenas permiten mantener separadas funcionalidades como:

* Pantalla inicial.
* Carga de recursos.
* Gameplay.
* Pantalla de victoria.

Esta organización facilita mantener el código separado y realizar modificaciones sin afectar innecesariamente otras partes del juego.

---

## Uso de OpenCode

OpenCode fue utilizado como herramienta de asistencia durante el desarrollo del proyecto.

El proceso de trabajo siguió una metodología basada en:

```text
Idea / GDD
   ↓
Plan
   ↓
Revisión del plan
   ↓
Build
   ↓
Prueba del juego
   ↓
Corrección de errores
   ↓
Commit
```

Antes de implementar diferentes partes del proyecto se utilizaron instrucciones específicas para que OpenCode analizara el problema y propusiera una solución.

Posteriormente se revisaron los cambios realizados, se ejecutó el juego y se verificó su funcionamiento.

---

## Principales instrucciones utilizadas con OpenCode

Las instrucciones dadas a OpenCode se enfocaron principalmente en:

* Crear la estructura inicial del juego.
* Implementar las reglas y mecánicas principales.
* Implementar el movimiento y físicas del jugador.
* Crear la estructura de niveles.
* Implementar enemigos y NPCs.
* Implementar vidas, puntuación y temporizador.
* Crear las pantallas de inicio, derrota y victoria.
* Integrar los recursos gráficos.
* Organizar los niveles.
* Corregir errores encontrados durante las pruebas.
* Mantener el proyecto dentro del alcance definido en el GDD.

Se buscó evitar la incorporación de funcionalidades que no fueran necesarias para el trabajo práctico.

---

## Problemas y soluciones

Durante el desarrollo se realizaron diferentes pruebas del juego para detectar errores de funcionamiento.

Entre los problemas encontrados se realizaron correcciones relacionadas con:

* Funcionamiento del gameplay.
* Colisiones y comportamiento de los elementos.
* Flujo entre escenas.
* Integración de los recursos gráficos.
* Organización de los niveles.
* Funcionamiento de la pantalla de victoria.

Los cambios fueron revisados y probados antes de continuar con nuevas tareas.

---

## Estado del proyecto

El proyecto cuenta con el flujo principal solicitado:

* Pantalla de inicio.
* Cuatro niveles.
* Movimiento del jugador.
* Salto y doble salto.
* Plataformas.
* NPCs para rescatar.
* Enemigos.
* Sistema de vidas.
* Sistema de puntuación.
* Temporizador.
* Victoria.
* Derrota y reinicio.
* Integración de recursos gráficos.

El proyecto puede ejecutarse mediante Vite y generar un build de producción mediante `npm run build`.

---

## Repositorio

Repositorio público del proyecto:

https://github.com/jesusromeoclaus123-ui/time-rescue.git

