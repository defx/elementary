import define from '../src/index.js';
window.define = define;

window.onload = function () {
  let container = document.createElement('div');
  container.setAttribute('id', 'container');
  document.body.appendChild(container);
};

const html = (strings, ...values) =>
  strings.reduce((a, v, i) => a + v + (values[i] || ''), '');

const mount = (html) => (document.getElementById('container').innerHTML = html);

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

window.mount = mount;
window.nextFrame = nextFrame;
window.assert = chai.assert;
window.$ = (v) => document.querySelector('#container ' + v);
window.$$ = (v) => Array.from(document.querySelectorAll('#container ' + v));
