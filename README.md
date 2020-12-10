# @defx/elementary

## [![npm](https://img.shields.io/npm/v/@defx/elementary.svg)](http://npm.im/@defx/elementary) [![Build Status](https://travis-ci.com/defx/elementary.svg?branch=main)](https://travis-ci.com/defx/elementary) [![Coverage Status](https://coveralls.io/repos/github/defx/elementary/badge.svg?branch=main)](https://coveralls.io/github/defx/elementary?branch=main) [![gzip size](https://img.badgesize.io/https://unpkg.com/@defx/elementary/dist/elementary.min.js?compression=gzip&label=gzip)]()

Elementary is a lightweight wrapper around the [Synergy](https://github.com/defx/synergy) library, allowing you to create reusable Custom Elements with declarative templates and reactive data bindings.

Check out the Synergy README first if you're not already familiar!

## Features

- Declarative templates
- Reactive data binding
- Small footprint (<4k)
- No special tooling required (e.g., compilers, plugins)
- Minimal learning curve (almost entirely standard HTML, JS, and CSS!)
- Opt-in Shadow DOM

## Browser Support

Works in any [modern browser](https://caniuse.com/mdn-javascript_builtins_proxy_proxy) that supports JavaScript Proxy.

## Install

Using npm:

```bash
$ npm i @defx/elementary
```

Using unpkg CDN:

```html
<script type="module">
  import define from 'https://unpkg.com/@defx/elementary@0.3.0';
</script>
```

## Define

The `define()` function registers your Custom Element.

### Syntax

```js
define(tagName, factory, template);
```

### Parameters

- `tagName` Name for the new custom element. Note that custom element names must contain a hyphen.

- `factory` A Factory function that returns a plain JavaScript object that will provide the data for your element.

- `template` (optional) Either an HTML string or a `<template>` node. If ommited, Elementary expects your document to include a [Template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element with an id matching `tagName`.

### Example

```html
<script type="module">
  import define from 'https://unpkg.com/@defx/elementary@0.3.0';

  let count = 0;

  const factory = ({ expanded = false, title, disabled = false }) => {
    return {
      id: `drawer-${count++}`,
      title,
      expanded,
      disabled,
      toggle() {
        this.expanded = !this.expanded;
      },
    };
  };

  factory.observedAttributes = ['expanded'];

  define('x-drawer', factory);
</script>
<template id="x-drawer" shadow="open">
  <style>
    button {
      all: inherit;
    }
  </style>
  <h3>
    <button
      id="{{ id }}"
      disabled="{{ disabled }}"
      aria-expanded="{{ expanded }}"
      onclick="toggle"
    >
      {{ title }}
    </button>
  </h3>
  <div hidden="{{ !expanded }}" aria-labelledby="{{ id }}">
    <slot></slot>
  </div>
</template>
```

In the example above, we create a new `x-drawer` Custom Element that can be used anywhere on the page, like so...

```html
<x-drawer title="foo"></x-drawer>
```

In the example above, I've used a Template element to contain my Custom Elements markup, but you can also pass your template as a string or element node as the third argument to `define` (see [#parameters](#parameters) above).

I've used the `shadow` attribute on my template to tell Elementary that I want to use Shadow DOM in 'open' mode. Using Shadow DOM is entirely optional, and you simply omit the `shadow` attribute from your template if you don't wish to use it. If you _do_ use it, then you should provide an attribute value of either `open` or `closed` to indicate the Shadow root "mode". For more info, see [Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
