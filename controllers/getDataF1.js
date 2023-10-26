const axios = require('axios');
const cheerio = require('cheerio');

async function getF1Data() {
    const f1DataS = ''; 
    const lastUpdateTime = '';
  try {
    const url = 'https://www.formula1.com/en/results.html/2023/drivers.html';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const table = $('.resultsarchive-table');
    const rows = table.find('tbody tr');

    const f1Data = [];

    rows.each((row_id, row) => {
      const columns = $(row).find('td');

      if (columns.length > 0) {
        const position = columns.eq(1).text().trim();
        const driver_name = columns.eq(2).text().trim().replace(/\s+/g, ' ');
        const nationality = columns.eq(3).text().trim();
        const car_name = columns.eq(4).text().trim();
        const pts = columns.eq(5).text().trim();

        f1Data.push({
          Position: position,
          DriverName: driver_name,
          Nationality: nationality,
          Car: car_name,
          Points: pts,
        });
      }
    });

    const currentTime = new Date().toLocaleString();
    lastUpdateTime = currentTime;

    const f1DataString = f1Data.map((data) => {
      return `Position: ${data.Position}, DriverName: ${data.DriverName}, Nationality: ${data.Nationality}, Car: ${data.Car}, Points: ${data.Points}`;
    });

    f1DataS = `Data updated at ${currentTime}:\n${f1DataString.join('\n')}`;
    return f1Data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { getF1Data };
