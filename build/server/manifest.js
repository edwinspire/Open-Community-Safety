const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.af9b6f3b.js","app":"_app/immutable/entry/app.b1b7763c.js","imports":["_app/immutable/entry/start.af9b6f3b.js","_app/immutable/chunks/scheduler.5efc86c8.js","_app/immutable/chunks/singletons.0c1ed792.js","_app/immutable/chunks/index.a2bd2d17.js","_app/immutable/entry/app.b1b7763c.js","_app/immutable/chunks/scheduler.5efc86c8.js","_app/immutable/chunks/index.601d3939.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-ced74eb6.js')),
			__memo(() => import('./chunks/1-7f9258ad.js')),
			__memo(() => import('./chunks/2-5447f5c8.js')),
			__memo(() => import('./chunks/3-f0b7aef5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/apiserver",
				pattern: /^\/apiserver\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
