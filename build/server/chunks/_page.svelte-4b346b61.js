import { c as create_ssr_component, v as validate_component, d as createEventDispatcher, f as add_attribute } from './ssr-adb2d652.js';
import uFetch from '@edwinspire/universal-fetch';
import 'events';

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

Transform.prototype;

const css = {
  code: '@import "bulma/css/bulma.min.css";.container.svelte-osrx57{max-width:400px;margin:0 auto;padding:2rem;margin-top:10vh;border:1px solid #ccc;border-radius:4px}.form.svelte-osrx57{margin-bottom:1rem}',
  map: null
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let username = "";
  let password = "";
  new uFetch();
  $$result.css.add(css);
  return `<div class="container svelte-osrx57"><h1 class="title is-4" data-svelte-h="svelte-1yeihy2">Iniciar sesión</h1> <form class="form svelte-osrx57"><div class="field"><label class="label" data-svelte-h="svelte-1tq2mwz">Nombre de usuario</label> <div class="control"><input class="input" type="text" placeholder="Nombre de usuario" required${add_attribute("value", username, 0)}></div></div> <div class="field"><label class="label" data-svelte-h="svelte-66z98u">Contraseña</label> <div class="control"><input class="input" type="password" placeholder="Contraseña" required${add_attribute("value", password, 0)}></div></div> <div class="field" data-svelte-h="svelte-u84jsi"><div class="control"><button class="button is-primary" type="submit">Iniciar sesión</button></div></div></form> </div>`;
});
const Gui = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${`${validate_component(Login, "Login").$$render($$result, {}, {}, {})}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Gui, "APIServerGUI").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4b346b61.js.map
