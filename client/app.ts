import BN from "bn.js";
import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";import type { ChainGuess } from "../target/types/chain_guess";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.ChainGuess as anchor.Program<ChainGuess>;



async function main() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChainGuess as Program<any>;
  const wallet = provider.wallet;

  // Creamos una semilla única basada en milisegundos para evitar el error 3003
  const seedId = "game_" + Date.now(); 
  
  const [gameAddress] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(seedId), wallet.publicKey.toBuffer()],
    program.programId
  );

  console.log("🚀 EJECUCIÓN MAESTRA INICIADA");
  console.log("📍 ID de Semilla:", seedId);
  console.log("📍 Dirección PDA:", gameAddress.toString());

  const apuesta = new anchor.BN(0.01 * anchor.web3.LAMPORTS_PER_SOL);
  
  try {
    console.log("📦 Inicializando cuenta limpia...");
    await program.methods
      .initialize(seedId, 7, apuesta)
      .accounts({
        game: gameAddress,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("✅ Inicialización completada.");

    console.log("🎯 Adivinando con el número 7...");
    await program.methods
      .guess(7)
      .accounts({
        game: gameAddress,
        user: wallet.publicKey,
      })
      .rpc();

    const state = await program.account.game.fetch(gameAddress);
    console.log("-----------------------------------------");
    console.log("📊 RESULTADO: " + (state.isWon ? "¡POR FIN GANASTE! 🎉" : "ERROR"));
    console.log("-----------------------------------------");

  } catch (err) {
    console.error("❌ Error detectado:");
    console.log(err.message);
  }
}

main();