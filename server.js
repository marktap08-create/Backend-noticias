const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simulación de base de datos en memoria
let noticias = {
    "noticia1": { vistas: 0, usuarios: [] },
    "noticia2": { vistas: 0, usuarios: [] },
    "noticia3": { vistas: 0, usuarios: [] }
};

// Endpoint para obtener vistas
app.get("/vistas", (req, res) => {
    res.json(noticias);
});

// Endpoint para sumar vista (solo 1 por usuario)
app.post("/vistas/:id", (req, res) => {
    const noticiaId = req.params.id;
    const usuarioId = req.body.usuarioId;

    if (!noticias[noticiaId]) {
        return res.status(404).json({ mensaje: "Noticia no encontrada" });
    }

    if (!noticias[noticiaId].usuarios.includes(usuarioId)) {
        noticias[noticiaId].usuarios.push(usuarioId);
        noticias[noticiaId].vistas++;
    }

    res.json(noticias[noticiaId]);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
