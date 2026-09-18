const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, 'src', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove lines with "subtitle": "We offer...
  content = content.split('\n').filter(line => !line.includes('"subtitle": "We offer')).join('\n');
  
  // We should also ensure the `title:...` lines that ended with a trailing comma are fine.
  // Wait, I did `c.replace(/"title": (.*?),/g, '"title": $1,\n      "subtitle":...')` 
  // Wait! Did I remove trailing commas in my original replace?
  // Original replace: `c = c.replace(/"title": (.*?),/g, '"title": $1,\n      "subtitle": "We offer 10% reward for all the spendings of the invited clients for 6 months.",');`
  // So the original title retained its comma (because of `,` at the end of the replace string but wait, `$1` didn't have a comma, so I added `,` explicitly? Let's check).
  // Yes, I did `"title": $1,`.
  
  fs.writeFileSync(filePath, content, 'utf8');
});
