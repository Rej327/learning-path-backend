import express from "express";
import pokemonRoutes from "./routes/pokemonRoutes";

export const app = express();
app.use(express.json());
app.use("/pokemon", pokemonRoutes);


// Optional: start server if running normally
if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}
