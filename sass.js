const fs = require('fs');
const sass = require('sass');
const scssFilename = `styles`;
const result = sass.compile(`${scssFilename}.scss`);
// console.log(result.css);

fs.writeFile(`${scssFilename}.css`, result.css, (err) => {
    if (err)
        console.log(err);
    else {
        console.log(`${scssFilename}.css File written successfully\n`);
    }
}); 