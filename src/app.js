import express from "express";
import morgan from "morgan";
import cors from "cors";

import pkg from "../package.json";
import config from "./config";

// import de rutas
import authRoutes from "./routes/auth.routers";
import userRoutes from "./routes/user.routers";
import materiasRoutes from "./routes/materias.routers";

import { createRoles, createSuperUser } from "./libs/initialSetup";

// const para definir la version del api
const apiVer = "/api/v1";

// Creo la instancia del servidor express
const app = express();

// Creo los roles y el superUser la primera vez
createRoles();
createSuperUser();

// Express permite setear variables y luego recuperarlas
app.set("port", config.serverPort);
app.set("pkg", pkg);

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ruta por defecto para que si alguien entra a la url le muestre datos de la aplicacion
app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

// rutas del Rest API
app.use(apiVer + "/materias", materiasRoutes);
app.use(apiVer + "/auth", authRoutes);
app.use(apiVer + "/users", userRoutes);

export default app;
