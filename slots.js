export default function merge(targetNode, templateNode) {
  let namedSlots = templateNode.querySelectorAll('slot[name]');
  let slotWithoutName = false;

  namedSlots.forEach((slot) => {
    let name = slot.attributes.name.value;
    let node = targetNode.querySelector(`[slot="${name}"]`);
    if (!node) return;
    node.removeAttribute('slot');
    slot.parentNode.replaceChild(node, slot);
    //?remove slot if no match?
  });

  let anonSlot = templateNode.querySelector('slot:not([name])');

  if (anonSlot) {
    let frag = document.createDocumentFragment();
    while (targetNode.childNodes.length > 0) {
      frag.appendChild(targetNode.childNodes[0]);
    }
    anonSlot.parentNode.replaceChild(frag, anonSlot);
  }
}
