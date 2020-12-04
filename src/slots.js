export default function merge(targetNode, sourceNode) {
  let namedSlots = sourceNode.querySelectorAll('slot[name]');

  namedSlots.forEach((slot) => {
    let name = slot.attributes.name.value;
    let node = targetNode.querySelector(`[slot="${name}"]`);
    if (!node) return;
    node.removeAttribute('slot');
    slot.parentNode.replaceChild(node, slot);
  });

  let defaultSlot = sourceNode.querySelector('slot:not([name])');

  if (defaultSlot) {
    let frag = document.createDocumentFragment();
    while (targetNode.childNodes.length > 0) {
      frag.appendChild(targetNode.childNodes[0]);
    }
    defaultSlot.parentNode.replaceChild(frag, defaultSlot);
  }
}
