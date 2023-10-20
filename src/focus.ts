const focus = document.querySelector('#focus')!;

focus.addEventListener('click', empty);

export function getFocusNode() {
  empty();
  return focus;
}

function empty() {
  for (const child of focus.children) {
    child.remove();
  }
}
