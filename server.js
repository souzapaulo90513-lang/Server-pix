const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Libera requisições de qualquer origem (CORS)
app.use(cors());
app.use(express.json());

// Rota para gerar a cobrança Pix (valor e descrição dinâmicos)
app.post('/api/gerar-pix', async (req, res) => {
  try {
    // Pega o valor e a descrição enviados pelo site (ou usa R$ 4,79 como padrão se não vier nada)
    const valorDinamico = req.body.value || 4.79;
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

// Porta padrão fornecida pela plataforma de hospedagem ou 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
