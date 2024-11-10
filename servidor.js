const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const express = require('express');

const url = 'https://es.wikipedia.org/wiki/Web_scraping';

async function scrapWeb() {
  try {
    // Descargamos el HTML de la página
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const info = $('.mw-parser-output p').first().text().trim();

    if (info) {
      console.log(`${info}`);
    } else {
      console.log('Verificar selector.');
    }

  } catch (error) {
    console.error('Error ocurrido', error.message);
  }
}

// Programar la función para ejecutarse cada 5 minutos
scrapWeb(); //Comprobamos en el segundo 0 de que se extrae correctamente
cron.schedule('*/5 * * * *', scrapWeb);

const app = express();

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

