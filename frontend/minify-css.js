const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css') && !f.endsWith('.min.css'));

cssFiles.forEach(file => {
    const filePath = path.join(cssDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Simple minification
    const minified = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Multiple spaces to single
        .replace(/\s*{\s*/g, '{') // Trim around {
        .replace(/\s*}\s*/g, '}') // Trim around }
        .replace(/\s*:\s*/g, ':') // Trim around :
        .replace(/\s*;\s*/g, ';') // Trim around ;
        .replace(/\s*,\s*/g, ',') // Trim around ,
        .replace(/;\}/g, '}') // Remove last semicolon before }
        // In the minified output, point @imports at the .min.css versions so the
        // production stylesheet loads minified modules (not the source .css).
        .replace(/@import url\('([^']+)\.css'\)/g, "@import url('$1.min.css')")
        .trim();

    const minFile = path.join(cssDir, file.replace('.css', '.min.css'));
    fs.writeFileSync(minFile, minified);

    const original = fs.statSync(filePath).size;
    const compressed = fs.statSync(minFile).size;
    const savings = ((1 - compressed/original) * 100).toFixed(1);

    console.log(`${file}: ${original} → ${compressed} bytes (${savings}% reduction)`);
});

console.log('\nCSS minification complete!');
