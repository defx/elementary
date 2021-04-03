# @defx/elementary

## [![npm](https://img.shields.io/npm/v/@defx/elementary.svg)](http://npm.im/@defx/elementary) [![Build Status](https://travis-ci.com/defx/elementary.svg?branch=main)](https://travis-ci.com/defx/elementary) [![Coverage Status](https://coveralls.io/repos/github/defx/elementary/badge.svg?branch=main)](https://coveralls.io/github/defx/elementary?branch=main) [![gzip size](https://img.badgesize.io/https://unpkg.com/@defx/elementary/dist/elementary.min.js?compression=gzip&label=gzip)]()

**This is no longer supported, please consider using [Synergy](https://synergyjs.org/) which provides all of same the features and much more.**

Elementary is a lightweight wrapper around the [Synergy](https://github.com/defx/synergy) library, allowing you to create reusable Custom Elements with declarative templates and reactive data bindings.

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
  import define from 'https://unpkg.com/@defx/elementary@0.4.1';
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

- `template` (optional) Either an HTML string or a `<template>` element. If ommited, Elementary expects your document to include a Template element with an id matching `tagName`.

### Example

```html
<script type="module">
  import define from 'https://unpkg.com/@defx/elementary@0.4.1';

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
  <style scoped>
    button {
      all: inherit;
    }
  </style>
  <h3>
    <button id="{{ id }}" disabled="{{ disabled }}" aria-expanded="{{ expanded }}" onclick="toggle">
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

## Factory Props

The elements initial attribute keys and values will be passed to your factory function during initialisation

## Observed Attributes

Observed attributes can be declared directly on your factory function like so...

```js
const factory = (props) => props;

factory.observedAttributes = ['name'];
```

## Slots

Elementary doesn't support Shadow DOM, but it does polyfill (slots)[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot], so you can use these as per the spec to provide placeholders for custom markup.

## Scoped CSS

Elementary provides lightweight, opt-in CSS scoping. Apply the `scoped` boolean attribute to a style tag within your Custom Elements template, and all of the selectors will be prefixed with an additional _type selector_ and hoisted up into the document head, giving you one style tag shared between all instances. This effectively stops your Custom Element styles from leaking _out_ into the document, but doesn't stop anything from sneaking in. Note that Elementary assumes that you will only every supply _one_ scoped style tag at the most, per Custom Element.
