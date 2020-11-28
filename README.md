# @defx/elementary

Simple Custom Elements.

## Features

- Declarative data binding
- Factory functions instead of classes
- No Shadow DOM
- Manually resolved template slots
- Pre-render / hydrate

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
  import define from 'https://unpkg.com/@defx/elementary@x.x.x';
</script>
```

## Usage

```html
<script type="module">
  import define from 'https://unpkg.com/@defx/elementary@0.0.1';

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
<template id="x-drawer">
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
    <slot name="panel-content"></slot>
  </div>
</template>
```
