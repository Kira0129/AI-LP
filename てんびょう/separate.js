const fs = require('fs');
const htmlPath = 'index.html';
const cssPath = 'CSS/style.css';
const jsPath = 'Js/main.js';

try {
    let content = fs.readFileSync(htmlPath, 'utf-8');

    const cssRegex = /    <style>([\s\S]*?)<\/style>/;
    const cssMatch = content.match(cssRegex);
    if (cssMatch) {
        fs.writeFileSync(cssPath, cssMatch[1].replace(/^\r?\n/, ''));
        content = content.replace(cssRegex, '    <link rel="stylesheet" href="CSS/style.css">');
        console.log("CSS separated.");
    }

    const jsRegex = /    <script>\s+(document\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?)<\/script>/;
    const jsMatch = content.match(jsRegex);
    if (jsMatch) {
        fs.writeFileSync(jsPath, "        " + jsMatch[1].replace(/\s*$/, '\n'));
        content = content.replace(jsRegex, '    <script src="Js/main.js"></script>');
        console.log("JS separated.");
    }

    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log("index.html updated.");
} catch(e) {
    console.error(e);
}
