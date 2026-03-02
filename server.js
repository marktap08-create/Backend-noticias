const express = require("express");
const cors = require("cors");

const app = express();

// Permite conexiones desde cualquier origen (Vercel, celular, etc.)
app.use(cors());
app.use(express.json());

let noticias = {
    "noticia1": { vistas: 0, usuarios: [] },
    "noticia2": { vistas: 0, usuarios: [] },
    "noticia3": { vistas: 0, usuarios: [] }
};

app.get("/vistas", (req, res) => {
    res.json(noticias);
});

app.post("/vistas/:id", (req, res) => {
    const noticiaId = req.params.id;
    const usuarioId = req.body.usuarioId;

    if (!noticias[noticiaId]) {
        return res.status(404).json({ mensaje: "Noticia no encontrada" });
    }

    if (!noticias[noticiaId].usuarios.includes(usuarioId)) {
        noticias[noticiaId].usuarios.push(usuarioId);
        noticias[noticiaId].vistas = noticias[noticiaId].vistas + 1;
    }

    res.json(noticias[noticiaId]);
});

// USAR EL PUERTO QUE DA RAILWAY O EL 3000 POR DEFECTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor listo en el puerto: " + PORT);
});
