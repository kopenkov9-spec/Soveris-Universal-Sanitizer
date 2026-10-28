'use strict';
// Defense in depth: a deliberately conservative static policy for our offline web app.
// This is NOT a malware scanner. It can be bypassed by sufficiently obfuscated code.
// Human review and branch protection remain necessary.
const fs = require('node:fs');
const path = require('node:path');

const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'";
const allowedAssets = new Set(['index.html', 'styles.css', 'app.js', 'core.js']);
const scriptChecks = [
  ['outbound fetch', /\bfetch\s*\(/],
  ['XHR', /\bXMLHttpRequest\b/],
  ['WebSocket', /\bWebSocket\b/],
  ['EventSource', /\bEventSource\b/],
  ['beacon', /\bsendBeacon\s*\(/],
  ['remote import', /\bimportScripts\s*\(/],
  ['dynamic import', /\bimport\s*\(/],
  ['CommonJS loading', /\brequire\s*\(/],
  ['dynamic execution', /\b(?:eval|Function)\s*\(/],
  ['worker', /\b(?:Worker|SharedWorker)\s*\(/],
  ['storage or cookies', /\b(?:localStorage|sessionStorage|document\.cookie)\b/],
  ['script insertion', /\bcreateElement\s*\(\s*['"`]script['"`]/],
  ['HTML injection', /\b(?:innerHTML|outerHTML|document\.write)\b/],
  ['new navigation window', /\bwindow\.open\s*\(/],
  ['hardcoded remote endpoint', /https?:\/\//i]
];
function checkScript(code) {
  return scriptChecks.filter(([, pattern]) => pattern.test(code)).map(([name]) => name);
}
function checkStyle(code) {
  const issues = [];
  if (/@import\b/i.test(code)) issues.push('CSS @import');
  if (/\burl\s*\(/i.test(code)) issues.push('CSS resource URL');
  if (/\bexpression\s*\(/i.test(code)) issues.push('CSS expression');
  return issues;
}
function checkHtml(html) {
  const issues = [];
  if (!html.includes('<meta http-equiv="Content-Security-Policy" content="' + CSP + '">')) issues.push('Missing or changed offline-only CSP');
  const scriptTags = html.match(/<script\b[^>]*>/gi) || [];
  const sources = scriptTags.map(tag => {
    const m = tag.match(/\bsrc="([^"]+)"/i);
    return m ? m[1] : '(inline or dynamic script)';
  });
  if (sources.join('|') !== 'core.js|app.js') issues.push('Unexpected script tags: ' + sources.join(', '));
  if (!/<link rel="stylesheet" href="styles\.css">/i.test(html)) issues.push('Unexpected stylesheet');
  if (/<(?:iframe|form|object|embed|base)\b/i.test(html)) issues.push('Potentially external HTML feature');
  if (/\bon[a-z]+\s*=/i.test(html)) issues.push('Inline event handler');
  if (/https?:\/\/|\b(?:href|src)\s*=\s*['"]\/\//i.test(html)) issues.push('Remote HTML reference');
  return issues;
}
function scanRepo(root) {
  const issues = [];
  const visit = (directory, prefix = '') => {
    for (const ent of fs.readdirSync(directory, { withFileTypes: true })) {
      if (['.git', '.github', 'node_modules', 'tests', 'scripts'].includes(ent.name)) continue;
      const rel = prefix ? prefix + '/' + ent.name : ent.name;
      if (ent.isSymbolicLink()) { issues.push(rel + ': symlink not allowed'); continue; }
      if (ent.isDirectory()) { visit(path.join(directory, ent.name), rel); continue; }
      if (!ent.isFile()) continue;
      if (!/\.(?:js|mjs|cjs|html|css)$/i.test(rel)) continue;
      if (!allowedAssets.has(rel)) { issues.push(rel + ': unreviewed web asset'); continue; }
      const source = fs.readFileSync(path.join(directory, ent.name), 'utf8');
      let result = rel === 'index.html' ? checkHtml(source) : rel === 'styles.css' ? checkStyle(source) : checkScript(source);
      for (const problem of result) issues.push(rel + ': ' + problem);
    }
  };
  visit(root);
  for (const needed of allowedAssets) if (!fs.existsSync(path.join(root, needed))) issues.push(needed + ': required asset missing');
  return issues;
}
module.exports = { CSP, checkHtml, checkStyle, checkScript, scanRepo };
if (require.main === module) {
  const issues = scanRepo(path.join(__dirname, '..'));
  if (issues.length) {
    console.error('Local-only policy violation:\n' + issues.map(x => ' - ' + x).join('\n'));
    process.exitCode = 1;
  } else {
    console.log('Static local-only security policy: PASS');
  }
}
