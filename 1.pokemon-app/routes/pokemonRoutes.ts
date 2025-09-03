import express from "express";
import { getPokemonByName, getPokemonByType } from "../controllers/pokemonController";

const router = express.Router();

router.get("/name/:name", getPokemonByName);

router.get("/type/:type", getPokemonByType);

export default router;
