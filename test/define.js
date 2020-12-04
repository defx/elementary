describe('define', () => {
  let count = 0;

  it('should define a custom element', () => {
    let name = `x-${count++}`;
    define(name, () => {}, '');
    assert.ok(customElements.get(name));
  });
  it('should initialise factory with initial attributes', () => {
    let name = `x-${count++}`;
    let factory = ({ title }) => ({ title });
    define(name, factory, '<p>{{ title }}</p>');
    mount(`
    <${name} title="ok!"></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.querySelector('p').textContent, 'ok!');
  });
  it('should use template with id matching element name if no string template is provided', () => {
    let name = `x-${count++}`;
    let factory = ({ title }) => ({ title });
    let template = document.createElement('template');
    template.innerHTML = '<p>{{ title }}</p>';
    template.id = name;
    document.body.appendChild(template);
    define(name, factory);
    mount(`
    <${name} title="ok!"></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.querySelector('p').textContent, 'ok!');
  });
  it('should reflect attribute changes on to viewmodel', async () => {
    let name = `x-${count++}`;
    let factory = ({ title }) => ({
      title,
    });
    factory.observedAttributes = ['title'];
    define(name, factory, '<p>{{ title }}</p>');
    mount(`
    <${name} title="ok!"></${name}>
    `);
    document.querySelector(name).setAttribute('title', 'foo!');
    await nextFrame();
    assert.equal(document.querySelector(`${name} p`).textContent, 'foo!');
  });
  it('should reflect viewmodel changes back on to attributes', async () => {
    let name = `x-${count++}`;
    let factory = ({ hidden = true }) => ({
      hidden,
      toggle() {
        this.hidden = !this.hidden;
      },
    });
    factory.observedAttributes = ['hidden'];
    define(name, factory, '<p hidden={{ hidden }}>hello world!</p><button onclick="toggle">toggle</button>');
    mount(`
    <${name}></${name}>
    `);
    document.querySelector(`${name} button`).click();
    await nextFrame();
    let el = document.querySelector(name);
    assert.equal(el.hasAttribute('hidden'), false);
  });
  it('should manually resolve default slot', () => {
    let name = `x-${count++}`;
    define(name, () => ({}), '<p>one</p><slot></slot><p>two</p>');
    assert.ok(customElements.get(name));
    mount(`
    <${name}><span>Hey!</span></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.innerHTML, '<p>one</p><span>Hey!</span><p>two</p>');
  });
  it('should manually resolve named slots', () => {
    let name = `x-${count++}`;
    define(name, () => ({}), '<slot name="first">one</slot><p>bar</p><slot name="last">two</slot>');
    assert.ok(customElements.get(name));
    mount(`
    <${name}><span slot="first">foo</span><span slot="last">baa</span></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.innerHTML, '<span>foo</span><p>bar</p><span>baa</span>');
  });
  it('should preserve default content of unmatched default slot', () => {
    let name = `x-${count++}`;
    define(name, () => ({}), '<slot>one</slot>');
    assert.ok(customElements.get(name));
    mount(`
    <${name}></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.innerHTML, 'one');
  });
  it('should preserve default content of unmatched default slot', () => {
    let name = `x-${count++}`;
    define(name, () => ({}), '<slot>one</slot>');
    assert.ok(customElements.get(name));
    mount(`
    <${name}>foo<span slot="last">baa</span></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.innerHTML, 'foo<span slot="last">baa</span>');
  });
  it('should preserve default content of unmatched named slot', () => {
    let name = `x-${count++}`;
    define(name, () => ({}), '<slot name="first">one</slot>');
    assert.ok(customElements.get(name));
    mount(`
    <${name}>foo<span slot="last">baa</span></${name}>
    `);
    let el = document.querySelector(name);
    assert.equal(el.innerHTML, 'one');
  });
});
