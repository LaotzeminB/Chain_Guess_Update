# 🎰 ChainGuess | Solana Hackathon 2026

---
> **A high-performance, decentralized gaming protocol built on Solana.**

[![Solana Devnet](https://img.shields.io/badge/Solana-Devnet-14F195?style=for-the-badge&logo=solana&logoColor=black)](https://explorer.solana.com/?cluster=devnet)
[![Framework: Anchor](https://img.shields.io/badge/Framework-Anchor_0.29.0-38429F?style=for-the-badge)](https://www.anchor-lang.com/)
[![Language: Rust](https://img.shields.io/badge/Language-Rust-DEA584?style=for-the-badge&logo=rust)](https://www.rust-lang.org/)

---

### 📺 Video de Presentación y Demo
[![Ver Video en YouTube](https://img.shields.io/badge/YouTube-Video_Demo-red?style=for-the-badge&logo=youtube)](https://youtu.be/8S8hOtjEoe4?si=CXmxTQCwgLWe5OKD)

---

## 🎯 Visión General
**ChainGuess** es un protocolo de juego on-chain que elimina la necesidad de intermediarios. El contrato actúa como un **Escrow inteligente** que gestiona el ciclo de vida completo de una apuesta: compromiso de fondos, validación de aciertos y liquidación instantánea del premio mediante la arquitectura paralela de Solana.

### 🎨 Interfaz de Usuario (Mockup Profesional)
Para complementar la lógica de bajo nivel, se diseñó una experiencia de usuario (UX) moderna y de alta fidelidad, optimizada para la navegación Web3 y la interacción fluida con wallets.

👉 **[Explorar Diseño Prototipo en Figma](https://www.figma.com/make/QVKkmzSjYEK1mxfVhmYxLm/Web3-Crypto-Dashboard?t=nw0C7RNujayO4dre-1)**

---

## 🏗️ Arquitectura del Contrato

| Componente | Descripción |
| :--- | :--- |
| **PDA Management** | Implementamos *Program Derived Addresses* dinámicas para garantizar partidas únicas: `seeds = [seed_id, user.key()]`. |
| **Atomic Settlement** | La validación del número secreto y el pago de premios ocurren en una única instrucción atómica. |
| **Direct Manipulation** | Optimización de *Compute Units* (CU) modificando directamente los Lamports de las cuentas. |

### Instrucciones Principales
* `initialize`: Configura la partida, cifra el estado inicial y ejecuta un **CPI (Cross-Program Invocation)** para el depósito de fondos.
* `guess`: Valida el intento del usuario contra el estado de la cuenta. Si es correcto, el contrato dispara un pago automático instantáneo.

---

## 🔐 Seguridad y Optimización
* **Manejo de Errores Custom:** Implementación de errores específicos (`AlreadyWon`, `InvalidGuess`) para prevenir ataques de re-entrada o doble gasto.
* **Account Validation:** Verificación estricta de *owners* y *signers* para evitar inyecciones de cuentas maliciosas.
* **Status: MVP Functional ✅**

---

## 🚀 Guía de Ejecución Rápida

### 1. Despliegue (Deploy)
* **Program ID:** `FydUWyryHSJWsofMMTz5kCNnuRUVEW2hMoDPX8iik8Xj`
* **Cluster:** Solana Devnet

### 2. Pruebas e Interacción
```bash
# Ejecutar suite de pruebas de integración
anchor test

# Ejecutar cliente de demostración (Terminal UI)
run client/app.ts
📁 Estructura del Repositorio
Plaintext
├── programs/chain_guess/src/lib.rs  # Lógica del Smart Contract (Rust)
├── tests/chain_guess.test.ts        # Pruebas de integración (TypeScript)
├── client/app.ts                    # Script de interacción de cliente
└── target/                          # Artefactos de compilación (BPF)
Desarrollado para el Solana Hackathon 2026. Innovando en la transparencia de los juegos de azar mediante tecnología blockchain.
