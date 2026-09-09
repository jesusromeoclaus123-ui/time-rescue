# Time Rescue - AGENTS.md

## Descripción del proyecto

**Time Rescue** es un juego 2D de plataformas desarrollado como trabajo práctico de Desarrollo Tecnológico. El jugador controla a un protagonista que debe rescatar NPCs y llegar a la meta en cada nivel antes de que se acabe el tiempo (30 segundos), evitando o derrotando enemigos. El juego tiene 4 niveles con dificultad progresiva, sistema de vidas (3 iniciales), puntuación por rescatar NPCs (+20), derrotar enemigos (+30), completar niveles (+50) y penalización por NPCs no rescatados (-10).

## Stack tecnológico

- **Lenguaje**: JavaScript (ES Modules)
- **Runtime**: Node.js
- **Bundler**: Vite 6.3.1
- **Motor de juego**: Phaser 4.0.0

## Objetivo del proyecto

Crear un juego de plataformas funcional con mecánicas de salto doble, rescate de NPCs, combate simple (saltar sobre enemigos), temporizador, vidas, puntuación, y pantalla de victoria/derrota. El foco está en la jugabilidad sólida y la integración visual de assets 2D.

## Arquitectura actual del proyecto

```
time-rescue/
├── index.html                 # Página HTML principal
├── package.json               # Configuración npm, scripts, dependencias
├── log.js                     # Script de telemetría anónima (opcional)
├── public/
│   ├── assets/                # Assets estáticos servidos directamente
│   │   ├── protagonista.png   # Sprite del jugador
│   │   ├── NPC1.png           # Primer tipo de NPC
│   │   ├── NPC2.png           # Segundo tipo de NPC
│   │   ├── plataforma.png     # Sprite de plataforma (reutilizable)
│   │   ├── meta.png           # Sprite de la meta/salida
│   │   ├── enemigo.png        # Sprite del enemigo
│   │   └── fondo.jpg          # Fondo de los niveles
│   └── style.css              # Estilos globales
├── src/
│   ├── main.js                # Bootstrap de la aplicación Vite
│   └── game/
│       ├── main.js            # Configuración y arranque del juego Phaser
│       ├── data/
│       │   ├── gameRules.js   # Reglas constantes del juego (puntos, vidas, tiempo)
│       │   ├── gameState.js   # Estado global mutable (singleton pattern)
│       │   └── levels.js      # Definición de los 4 niveles (plataformas, enemigos, NPCs)
│       └── scenes/
│           ├── Boot.js        # Escena de arranque -> Preloader
│           ├── Preloader.js   # Carga de assets (imágenes) -> MainMenu
│           ├── MainMenu.js    # Menú principal, SPACE para iniciar
│           ├── Game.js        # Escena principal de juego (lógica completa)
│           ├── GameOver.js    # Pantalla de game over -> MainMenu
│           └── Victory.js     # Pantalla de victoria (score final) -> MainMenu
└── dist/                      # Build de producción (generado por Vite)
```

### Flujo de escenas

```
Boot → Preloader → MainMenu → Game → (GameOver | Victory) → MainMenu
                          ↑______________________________|
```

### Flujo de datos principal

- `gameState.js`: Singleton que mantiene el estado global (`levelIndex`, `lives`, `confirmedScore`, `levelScore`, `timeRemaining`, `levelEntities.rescuedNpcIds`, `levelEntities.defeatedEnemyIds`).
- `gameRules.js`: Constantes inmutables (`GAME_RULES`, `createLevelAttempt`, `createNewGameState`, `resolveDamage`, `calculateCompletedLevelScore`).
- `levels.js`: Array `LEVELS` con 4 objetos nivel (playerStart, exit, platforms[], enemies[], npcs[]).
- `Game.js`: Única escena de gameplay. Lee/escribe `gameState` vía `getGameState()` / `updateGameState()`. Maneja input, física, colisiones, HUD, timer, respawn, transición de niveles.

## Reglas para el agente de programación

1. **Respetar el GDD**: No agregar funcionalidades no solicitadas. Implementar solo lo que se pide explícitamente.
2. **Sin dependencias externas**: No instalar paquetes npm sin justificación clara y aprobación.
3. **Código comprensible y organizado**: Mantener estilo existente, nombres claros, sin comentarios innecesarios.
4. **No modificar funcionalidades ajenas**: Si la tarea es "corregir salto", no tocar sistema de puntuación, ni enemigos, ni HUD.
5. **Analizar antes de cambiar**: Antes de modificaciones importantes, leer archivos afectados, explicar qué se va a tocar y por qué.
6. **Verificar al finalizar**: Ejecutar build, confirmar que compila, probar funcionalidad relacionada, resumir cambios.

## Flujo de trabajo obligatorio

**Plan → Revisión → Build → Prueba → Corrección → Commit**

1. **Plan**: Entender la tarea, identificar archivos a modificar, proponer enfoque.
2. **Revisión**: Leer código existente, confirmar arquitectura, detectar efectos colaterales.
3. **Build**: `npm run build-nolog` (o `npm run build`) para verificar que compila.
4. **Prueba**: Verificar funcionalidad manualmente o por lógica de código.
5. **Corrección**: Ajustar si hay errores o regresiones.
6. **Commit**: Solo cuando todo funciona, con mensaje descriptivo.

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala dependencias (Phaser, Vite, terser) |
| `npm run dev` | Servidor de desarrollo con hot-reload (puerto 8080) + log anónimo |
| `npm run dev-nolog` | Servidor de desarrollo sin telemetría |
| `npm run build` | Build de producción en `dist/` + log anónimo |
| `npm run build-nolog` | Build de producción sin telemetría |

> **Nota**: Usar `build-nolog` / `dev-nolog` para evitar la llamada a `log.js` durante desarrollo del agente.

## Estructura de datos clave (referencia rápida)

```js
// gameState.js - getGameState() devuelve clone del estado:
{
  levelIndex: 0,           // 0-3 (4 niveles)
  confirmedScore: 0,       // Score acumulado de niveles completados
  levelScore: 0,           // Score del intento actual
  timeRemaining: 30,       // Segundos restantes
  lives: 3,                // Vidas actuales
  levelEntities: {
    rescuedNpcIds: [],     // IDs de NPCs rescatados en nivel actual
    defeatedEnemyIds: []   // IDs de enemigos derrotados en nivel actual
  }
}
```

## Archivos que NO se deben tocar sin razón explícita

- `src/game/data/gameRules.js` — Reglas base del juego
- `src/game/data/gameState.js` — Singleton de estado (salvo `updateGameState` controlado)
- `src/game/scenes/Boot.js`, `GameOver.js`, `Victory.js` — Escenas simples de transición
- `src/main.js`, `src/game/main.js` — Bootstrap y config Phaser

## Historial reciente de fixes (contexto)

- **Bug 1 (triple salto)**: Fix en `Game.js:update()` usando `wasOnGround` para resetear `jumpsUsed` solo al aterrizar.
- **Bug 2 (Game Over)**: `takeDamage()` verifica `lives <= 1` ANTES de `resolveDamage()` y va a `GameOver`.
- **Bug 3 (NPCs ya rescatados)**: `handleExitReached()` resetea `levelEntities` al cambiar de nivel.
- **Bug 4 (Victory score 0)**: `handleExitReached()` guarda `finalGameState` en registry antes de `Victory`.
- **Integración visual**: `Preloader` carga assets, `Game.js` usa sprites, `levels.js` rediseñado con 4 niveles progresivos.

---

*Este documento debe mantenerse actualizado si cambian la arquitectura, comandos o reglas del proyecto.*