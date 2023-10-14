const path = require('path');
const fs = require('fs');

const sessionsDir = path.join(__dirname, 'user-sessions');

function formatSessionFiles() {
  fs.readdir(sessionsDir, (err, files) => {
    if (err) {
      console.error('Error reading sessions directory: ', err);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(sessionsDir, file);
        const rawData = fs.readFileSync(filePath);

        try {
          const jsonData = JSON.parse(rawData);
          const formattedData = JSON.stringify(jsonData, null, 2);

          fs.writeFileSync(filePath, formattedData);

          if (err) throw new Error(`Error formatting ${file}: `, err);
          console.log(`${file} formatted successfully`);
        } catch (err) {
          console.error(err);
        }
      }
    });
  });
}

module.exports = { formatSessionFiles };
