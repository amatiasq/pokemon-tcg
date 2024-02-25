import { existsSync } from 'fs';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import type { Plugin } from 'vite';

const CACHE_DIR = '.cache/web-components';
const DOM_STUB = `
    class HTMLElement {};
    const customElements = {define() {}};
`;

mkdir(CACHE_DIR, { recursive: true });

export function webComponentLoader() {
  const prefix = 'web-component:/';
  const path = 'https:/';
  const hook = '\0' + prefix;

  const asWebComponent = (id: string) => `\0${id}`;
  const isWebComponent = (id: string) => id.startsWith(hook);
  const toUrl = (id: string) => id.slice(1).replace(prefix, path);

  return {
    name: 'web-components',

    resolveId(id) {
      if (id.startsWith(prefix)) {
        return asWebComponent(id);
      }
    },

    load(id) {
      if (isWebComponent(id)) {
        return importWebComponent(toUrl(id));
      }
    },

    async transform(src: string, id: string) {
      if (!isWebComponent(id)) return;

      const { tagName: TagName, template } = await evaluateComponent(src);

      return `export default function WebComponent({ class: className, ...props }) {
        const el = document.createElement('${TagName}');
        Object.assign(el, props);
        if (className) el.classList.add(className);
        el.innerHTML = \`
          <template shadowrootmode="open">
            ${template}
          </template>
        \`;

        const script = document.createElement('script');
        script.type = 'module';
        script.src="${toUrl(id)}";
        script.defer = true;

        const fragment = document.createDocumentFragment();
        fragment.appendChild(el);
        fragment.appendChild(script);
        return fragment;
      }`;
    },
  } as Plugin;
}

async function importWebComponent(url: string) {
  const cachePath = `${CACHE_DIR}/${url.replace(/\//g, '_')}`;

  if (existsSync(cachePath)) {
    try {
      const source = await readFile(cachePath, 'utf-8');
      return source;
    } catch (e) {
      await unlink(cachePath);
    }
  }

  const request = await fetch(url);
  const source = await request.text();
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, source, 'utf-8');
  return source;
}

async function evaluateComponent(source: string) {
  const viteValidSource = `${DOM_STUB}\n${source}`;

  const module = await import(
    // This is an import to evaluate the source as a module
    /* @vite-ignore */
    `data:text/javascript;base64,${btoa(viteValidSource)}`
  );

  return { ...module, source };
}
