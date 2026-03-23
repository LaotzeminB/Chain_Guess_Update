🎰 ChainGuess | Solana Hackathon 2026
ChainGuess es un protocolo de juego on-chain desarrollado en Rust con el framework Anchor. El contrato gestiona el ciclo de vida completo de una apuesta: compromiso de fondos, validación de aciertos y liquidación instantánea del premio mediante la arquitectura de Solana.

📖 Tabla de Contenidos

* Visión General

* Arquitectura del Contrato

* Seguridad y Optimización

* Guía de Ejecución

* Estructura del Proyecto

🎯 Visión General

ChainGuess elimina la necesidad de intermediarios en los juegos de azar. El contrato actúa como un "Escrow" inteligente que retiene la apuesta inicial y solo libera los fondos cuando se verifica matemáticamente que el usuario ha adivinado el número secreto.

## 🎨 Interfaz de Usuario (Frontend Mockup)

Para complementar la lógica on-chain, se ha diseñado una experiencia de usuario (UX) moderna y de alta fidelidad en **Figma**. El diseño está optimizado para la navegación Web3, facilitando la conexión de wallets y la interacción con el contrato inteligente.

* **Prototipo Interactivo:** [Explorar Diseño en Figma](https://www.figma.com/make/QVKkmzSjYEK1mxfVhmYxLm/Web3-Crypto-Dashboard?t=nw0C7RNujayO4dre-1)

### Componentes Diseñados:
* **Dashboard de Usuario:** Visualización en tiempo real de balances en SOL y estadísticas de juego.
* **Módulo de Apuestas:** Interfaz limpia para el ingreso de predicciones (inputs) y ejecución de transacciones.
* **Leaderboard dinámico:** Diseño pensado para mostrar el ranking de ganadores extrayendo datos de las cuentas del programa.

---

🏗️ Arquitectura del Contrato

Program Derived Addresses (PDAs)
Implementamos PDAs dinámicas para garantizar que cada partida sea única y aislada. La dirección se deriva de:
seeds = [seed_id.as_bytes(), user.key().as_ref()]

Instrucciones Principales

initialize: Configura la partida, establece el número secreto y realiza un CPI (Cross-Program Invocation) para depositar el SOL del usuario en la cuenta del juego.

guess: Procesa los intentos del usuario. Si el número coincide, marca el estado como ganado y transfiere el premio automáticamente.

🔐 Seguridad y Optimización

Atomicidad: La validación y el pago ocurren en la misma transacción. Si algo falla, el estado no se altera.

Direct Lamport Manipulation: Optimizamos el consumo de Compute Units (CU) modificando directamente los balances de las cuentas en lugar de usar instrucciones de transferencia externas.

Manejo de Errores: Códigos de error personalizados (ej. AlreadyWon) para evitar reintegros dobles o intentos en juegos finalizados.

🚀 Guía de Ejecución en Solana Playground

1. Despliegue (Deploy)
ID del Programa: FydUWyryHSJWsofMMTz5kCNnuRUVEW2hMoDPX8iik8Xj

Red: Solana Devnet.

2. Pruebas (Tests)
Ejecuta la suite en tests/chain_guess.test.ts.

Los tests incluyen sincronización de red mediante confirmTransaction para asegurar la integridad de los datos en tiempo real.

3. Cliente (App)
Ejecuta run client/app.ts para ver la interacción completa desde la terminal, incluyendo logs detallados del proceso de victoria.

📁 Estructura del Proyecto

programs/chain_guess/src/lib.rs: Lógica del Smart Contract en Rust.

tests/chain_guess.test.ts: Suite de pruebas de integración en TypeScript.

client/app.ts: Script de cliente para demostración rápida.

Desarrollado para el Solana Hackathon 2026. Status: MVP Functional ✅
