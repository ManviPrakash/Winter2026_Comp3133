const fs = require('fs');
const csv = require('csv-parser');

// Delete files if they already exist
const filesToDelete = ['canada.txt', 'usa.txt'];

filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`${file} deleted successfully`);
  }
});

// Read CSV file and filter data
const inputFile = 'input_countries.csv';

const canadaStream = fs.createWriteStream('canada.txt');
const usaStream = fs.createWriteStream('usa.txt');

// Write headers to the output files
canadaStream.write('country,year,population\n');
usaStream.write('country,year,population\n');

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // Convert country name to lowercase for safety
    const country = row.country.toLowerCase();

    if (country === 'canada') {
      canadaStream.write(`${row.country},${row.year},${row.population}\n`);
    } else if (country === 'united states') {
      usaStream.write(`${row.country},${row.year},${row.population}\n`);
    }
  })
  .on('end', () => {
    console.log('CSV file processed successfully.');
    canadaStream.end();
    usaStream.end();
  });
