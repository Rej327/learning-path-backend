import { Request, Response } from "express";
import { findPokemonByName, findPokemonByType } from "../models/pokemonModel";

/** Get Pokemon by name */
export async function getPokemonByName(req: Request, res: Response) {
    const { name } = req.params;
    const result = await findPokemonByName(name);
    res.json(result);
}

/** Get Pokemon by type */
export async function getPokemonByType(req: Request, res: Response) {
    const { type } = req.params;
    const result = await findPokemonByType(type);
    res.json(result);
}
