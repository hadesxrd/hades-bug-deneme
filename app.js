/* HADES Target Lab — deliberately synthetic test-only frontend.
 * None of the following fixture strings can access a real account or service.
 * The scanner should flag token-like patterns, not assume they are valid credentials.
 */
'use strict';
const LAB_ENV = 'synthetic';
// Scanner v2.2 third-party URL inventory fixture; NO actual network request.
const THIRD_PARTY_SAMPLE = 'https://code.example.invalid/vendor/demo.js';
const SYNTHETIC_DEPENDENCIES = ['/vendor/axios@1.6.0/demo.js', '/vendor/lodash@4.17.21/demo.js'];
// Detection fixtures, NOT valid credentials. Do not replace these with real tokens.
const FAKE_GITHUB_TOKEN = 'ghp_HADESLABONLYNOTREALAABBCCDDEEFF001122334455';
const FAKE_AWS_ACCESS_KEY_ID = 'AKIAFAKETESTABCD1234';
const firebaseConfig = {projectId: 'hades-test-fixture-only', authDomain: 'hades-test-fixture-only.firebaseapp.com'};
// Webpack detector fixture — this lab is not actually built with Webpack.
const webpackChunkHadesTargetLab = [];
// Synthetic dependency inventory reference: /vendor/axios@1.6.0/demo.js (not loaded)
const apiRoutes = [
  './api/v1/public/catalog.json',
  './api/v1/users/1001.json',
  './api/v1/users/1002.json',
  './api/v1/debug/config.json',
  './api/v1/probes/mixed-content.json',
  './api/v1/probes/http-form.json',
  './api/v1/admin/metrics.json'
];
async function readCatalog() {
  return fetch('./api/v1/public/catalog.json');
}
async function readUserDemo() {
  return fetch('./api/v1/users/1002.json');
}
async function loadSchema() {
  return fetch('./openapi.json');
}
function setupExplorer() {
  const req = document.querySelector('#request-url');
  const body = document.querySelector('#response-body');
  const status = document.querySelector('#response-status');
  const run = document.querySelector('#execute-btn');
  if (!req || !body || !status || !run) return;
  let selected = 'api/v1/public/catalog.json';
  document.querySelectorAll('[data-test][data-path]').forEach((button) => {
    button.addEventListener('click', () => {
      selected = button.dataset.path;
      req.textContent = selected;
      document.querySelector('#api-explorer-anchor')?.scrollIntoView({behavior:'smooth'});
      execute();
    });
  });
  async function execute() {
    status.textContent = 'LOADING';
    body.textContent = 'GET ' + selected + ' ...';
    try {
      const response = await fetch(selected, {method: 'GET', cache: 'no-store'});
      const text = await response.text();
      let displayed = text;
      try { displayed = JSON.stringify(JSON.parse(text), null, 2); } catch { /* raw fixture */ }
      body.textContent = displayed.substring(0, 14000);
      status.textContent = String(response.status) + ' ' + (response.ok ? 'OK' : 'ERROR');
    } catch (err) {
      body.textContent = 'Bağlantı hatası: ' + (err && err.message ? err.message : String(err));
      status.textContent = 'FETCH FAILED';
    }
  }
  run.addEventListener('click', execute);
}
document.addEventListener('DOMContentLoaded', setupExplorer);
//# sourceMappingURL=app.js.map
