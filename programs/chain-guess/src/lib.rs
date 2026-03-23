use anchor_lang::prelude::*;
use anchor_lang::system_program;

// IMPORTANTE: Asegúrate de que este ID coincida con el de la pestaña "Deploy"
declare_id!("FydUWyryHSJWsofMMTz5kCNnuRUVEW2hMoDPX8iik8Xj"); 

#[program]
pub mod chain_guess {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, _seed_id: String, number: u8, bet_amount: u64) -> Result<()> {
        let game = &mut ctx.accounts.game;
        game.secret_number = number;
        game.authority = ctx.accounts.user.key();
        game.is_won = false;
        game.attempts = 0;
        game.prize_amount = bet_amount;

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.user.to_account_info(),
                to: ctx.accounts.game.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, bet_amount)?;
        
        Ok(())
    }

    pub fn guess(ctx: Context<Guess>, number: u8) -> Result<()> {
        let game = &mut ctx.accounts.game;
        let user = &ctx.accounts.user;

        if game.is_won {
            return err!(GuessError::AlreadyWon);
        }

        game.attempts += 1;

        if number == game.secret_number {
            game.is_won = true;
            **game.to_account_info().try_borrow_mut_lamports()? -= game.prize_amount;
            **user.to_account_info().try_borrow_mut_lamports()? += game.prize_amount;
        }
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(seed_id: String)]
pub struct Initialize<'info> {
    #[account(
        init, 
        payer = user, 
        space = 8 + 32 + 1 + 1 + 8 + (4 + seed_id.len()), 
        seeds = [seed_id.as_bytes(), user.key().as_ref()], 
        bump
    )]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Guess<'info> {
    #[account(mut)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Game {
    pub authority: Pubkey,
    pub secret_number: u8,
    pub is_won: bool,
    pub attempts: u8,
    pub prize_amount: u64,
}

#[error_code]
pub enum GuessError {
    #[msg("El juego ya terminó.")]
    AlreadyWon,
}