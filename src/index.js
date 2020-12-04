import synergy from '../node_modules/synergy/src/index.js';

import mergeSlots from './slots.js';

const initialAttributes = (node) => {
  const o = {};
  for (let { name, value } of node.attributes) {
    o[name] = value === '' ? true : value;
  }
  return o;
};

const wrap = (target, name, method) => {
  let originalMethod = target[name] || (() => {});
  target[name] = function () {
    method(...arguments);
    originalMethod(...arguments);
  };
};

const forwards = [
  'connectedCallback',
  'disconnectedCallback',
  'adoptedCallback',
];

const define = (
  name,
  factory,
  template = document.querySelector(`template#${name}`)
) => {
  const observedAttributes = factory.observedAttributes || [];

  let X = class extends HTMLElement {
    static get observedAttributes() {
      return observedAttributes;
    }
    constructor() {
      super();

      let viewmodel = factory(initialAttributes(this));

      wrap(viewmodel, 'propertyChangedCallback', (k, v) => {
        if (observedAttributes.includes(k)) {
          if (v || v === '') {
            this.setAttribute(k, v);
          } else {
            this.removeAttribute(k);
          }
        }
      });

      wrap(viewmodel, 'preAppendCallback', (el) => mergeSlots(this, el));

      this.viewmodel = synergy.render(this, viewmodel, template);
    }
    attributeChangedCallback(k, _, v) {
      if (this.viewmodel) this.viewmodel[k] = v === '' ? true : v;
    }
  };

  forwards.forEach((k) =>
    Object.assign(X.prototype, {
      [k](...args) {
        if (this.viewmodel && this.viewmodel[k]) this.viewmodel[k](...args);
      },
    })
  );

  customElements.define(name, X);
};

export default define;
