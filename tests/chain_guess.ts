import BN from "bn.js";
import assert from "assert";
import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ChainGuess } from "../target/types/chain_guess";
import assert from "assert";
import type { ChainGuess } from "../target/types/chain_guess";

describe("chain_guess_test", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ChainGuess as anchor.Program<ChainGuess>;
  
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.ChainGuess as Program<ChainGuess>;

const seedId = "final_test_" + Date.now();
const [gamePda] = anchor.web3.PublicKey.findProgramAddressSync(
[Buffer.from(seedId), provider.wallet.publicKey.toBuffer()],
program.programId
);

it("Inicia el juego, confirma la cuenta y adivina el numero", async () => {
const apuesta = new anchor.BN(0.05 * anchor.web3.LAMPORTS_PER_SOL);

console.log("1. Inicializando en PDA:", gamePda.toString());
const txInit = await program.methods
  .initialize(seedId, 7, apuesta)
  .accounts({
    game: gamePda,
    user: provider.wallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
  })
  .rpc();

// Sincronización con la red
const latestBlockHash = await provider.connection.getLatestBlockhash();
await provider.connection.confirmTransaction({
  blockhash: latestBlockHash.blockhash,
  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  signature: txInit,
});

console.log("✅ Cuenta confirmada en Blockchain.");

// 2. Adivinar
console.log("2. Enviando intento ganador...");
await program.methods
  .guess(7)
  .accounts({
    game: gamePda,
    user: provider.wallet.publicKey,
  })
  .rpc();

const state = await program.account.game.fetch(gamePda);
assert.strictEqual(state.isWon, true, "El juego deberia estar ganado");
console.log("🏆 ¡TEST COMPLETADO CON EXITO!");
});
});