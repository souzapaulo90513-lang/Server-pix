const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/gerar-pix', async (req, res) => {
  try {
    const valorDinamico = req.body.value || 4.95;
    const descricaoDinamica = req.body.description || "Liberação de Conteúdo Exclusivo";

    const response = await fetch("https://app.flowinpay.com.br/api/v1/charges", {
      method: "POST",
      headers: {
        "X-Api-Key": "fpk_UOEWrfB28cJ9MBidNW9dQXGdVA9YwPQU",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        value: valorDinamico,
        description: descricaoDinamica
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Erro interno no servidor:", error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
