const fs = require('fs');
const t = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
console.log('token count:', Object.keys(t).length);
const varNames = Object.keys(t).map(k => '--' + k.replace(/\./g, '-'));
const css = fs.readFileSync('prototype-utils.css', 'utf8');
const used = new Set([...css.matchAll(/var\((--[a-z0-9-]+)\)/g)].map(m => m[1]));
const missing = [...used].filter(v => !varNames.includes(v));
console.log('vars used in css not found in tokens:', missing);
