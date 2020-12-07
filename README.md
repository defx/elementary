# @defx/elementary

## [![npm](https://img.shields.io/npm/v/@defx/elementary.svg)](http://npm.im/@defx/elementary) [![Build Status](https://travis-ci.com/defx/elementary.svg?branch=main)](https://travis-ci.com/defx/elementary) [![Coverage Status](https://coveralls.io/repos/github/defx/elementary/badge.svg?branch=main)](https://coveralls.io/github/defx/elementary?branch=main) [![gzip size](https://img.badgesize.io/https://unpkg.com/@defx/elementary/dist/elementary.min.js?compression=gzip&label=gzip)]()

Web Components for Humans.

## Features

- Reactive data binding with Synergy
- Declarative Shadow DOM polyfill
- Factory functions instead of classes

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
  import define from 'https://unpkg.com/@defx/elementary@0.2.0';
</script>
```

## Example

```html
<script type="module">
  import define from 'https://unpkg.com/@defx/elementary@0.2.0';

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
<template id="x-drawer" shadowroot="open">
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
