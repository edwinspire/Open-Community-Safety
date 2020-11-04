(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home"],{

/***/ "./src/components/FetchData.js":
/*!*************************************!*\
  !*** ./src/components/FetchData.js ***!
  \*************************************/
/*! exports provided: FetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchData", function() { return FetchData; });
/* harmony import */ var _Stores_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stores.js */ "./src/components/Stores.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./src/components/sha1.js");




class FetchData {
  async put(url, data, headers) {
    let response;

    try {
      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: headers,
      });
      if (response.status == 401) {
        window.location.href = "/";
      }
      //cache.put(event.request, response.clone());
      return response;
    } catch (err) {
      console.log(err);
      //const response = await cache.match(event.request);
      if (response) return response;
      throw err;
    }
  }

  async post(url, data, headers) {
    let response;

    try {
       response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
      });
      //cache.put(event.request, response.clone());
      if (response.status == 401) {
        window.location.href = "/";
      }

      return response;
    } catch (err) {
      console.log(err);
      //const response = await cache.match(event.request);
      if (response) return response;
      throw err;
    }
  }
  async get(url, query, headers) {
    let response;
    try {
      let searchURL = new URLSearchParams(query);
      let urlq = url + "?" + searchURL.toString();
      response = await fetch(urlq, {
        method: "GET",
        headers: headers,
      });

      if (response.status == 401) {
        window.location.href = "/";
      }
      return response;
    } catch (error) {
      if (response) return response;
      throw err;
    }

    
  }

  async login(url, user, password, country) {
    let LStorage = new _Stores_js__WEBPACK_IMPORTED_MODULE_0__["APPLocalStorage"]();
    let pwdoff = await this.digestMessage(user + password);
    try {
      let f = await this.post(
        url,
        {
          username: user,
          pwd: password,
          country: country
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(f);
      let data = await f.json();

      data.offline = pwdoff;
      LStorage.setUser(data);
      return data;
    } catch (error) {
      console.trace(error);
      let data = {};
      data.login = false;
      let user = LStorage.getUser(data);

      console.log(user);

      if (user.offline == pwdoff) {
        data = user;
      }

      return data;
    }
  }

  async digestMessage(message) {
    /*
        console.log(hex_sha1('hola'), str_sha1('hola'));
        const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
        console.log(crypto);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""); // convert bytes to hex string
            */
    return Object(_sha1_js__WEBPACK_IMPORTED_MODULE_1__["hex_sha1"])(message);
  }
}


/***/ }),

/***/ "./src/components/Map/Map.svelte":
/*!***************************************!*\
  !*** ./src/components/Map/Map.svelte ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_Geolocation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Geolocation */ "./node_modules/ol/Geolocation.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Icon */ "./node_modules/ol/style/Icon.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* src/components/Map/Map.svelte generated by Svelte v3.23.2 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__["globals"];










const file = "src/components/Map/Map.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-35o4oi-style";
	style.textContent = ".map.svelte-35o4oi{height:800px;width:100%}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiTWFwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c3R5bGU+XG4gICAgLm1hcHtcbiAgICAgICAgaGVpZ2h0OiA4MDBweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IEdlb2xvY2F0aW9uIGZyb20gJ29sL0dlb2xvY2F0aW9uJztcbmltcG9ydCBWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IFN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBJY29uIGZyb20gJ29sL3N0eWxlL0ljb24nO1xuaW1wb3J0IE9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qJztcbmltcG9ydCBUaWxlTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVGlsZSc7XG5cbmltcG9ydCB7b25Nb3VudH0gZnJvbSAnc3ZlbHRlJztcblxubGV0IHZpZXdNYXA7XG5sZXQgbWFwO1xubGV0IGdlb3ggPSAwO1xubGV0IGdlb3kgPSAwO1xuXG5cbm9uTW91bnQoKCk9PntcblxuICAgIHZpZXdNYXAgPSBuZXcgVmlldyh7XG4gICAgICAgIGNlbnRlcjogb2xQcm9qLmZyb21Mb25MYXQoWy0wLjIyOTA5NTEsIC03OC40MTgzMzUzOTk5OTk5OV0pLFxuICAgICAgICB6b29tOiA1XG4gICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgR2VvbG9jYXRpb24gb2JqZWN0IHNldHVwIHRvIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGV2aWNlXG4gICAgICAgICAgICB2YXIgZ2VvbG9jYXRpb24gPSBuZXcgR2VvbG9jYXRpb24oe1xuICAgICAgICB0cmFja2luZzogdHJ1ZVxuICAgICAgfSk7XG5jb25zb2xlLmxvZyhnZW9sb2NhdGlvbik7XG4gICAgICAvLyBiaW5kIHRoZSBwcm9qZWN0aW9uIHRvIHRoZSB2aWV3IHNvIHRoYXQgcG9zaXRpb25zIGFyZSByZXBvcnRlZCBpbiB0aGVcbiAgICAgIC8vIHByb2plY3Rpb24gb2YgdGhlIHZpZXdcbiAgICAgIC8vZ2VvbG9jYXRpb24uYmluZFRvKCdwcm9qZWN0aW9uJywgdmlld01hcCk7XG5cbiAgICAgIC8vIGJpbmQgdGhlIG1hcmtlcidzIHBvc2l0aW9uIHRvIHRoZSBnZW9sb2NhdGlvbiBvYmplY3QsIHRoZSBtYXJrZXIgd2lsbFxuICAgICAgLy8gbW92ZSBhdXRvbWF0aWNhbGx5IHdoZW4gdGhlIEdlb0xvY2F0aW9uIEFQSSBwcm92aWRlcyBwb3NpdGlvbiB1cGRhdGVzXG4gICAgICAvL21hcmtlci5iaW5kVG8oJ3Bvc2l0aW9uJywgZ2VvbG9jYXRpb24pO1xuXG4gICAgICAvLyB3aGVuIHRoZSBHZW9Mb2NhdGlvbiBBUEkgcHJvdmlkZXMgYSBwb3NpdGlvbiB1cGRhdGUsIGNlbnRlciB0aGUgdmlld1xuICAgICAgLy8gb24gdGhlIG5ldyBwb3NpdGlvblxuICAgICAgZ2VvbG9jYXRpb24ub24oJ2NoYW5nZTpwb3NpdGlvbicsICgpPT4ge1xuICAgICAgICB2YXIgcCA9IGdlb2xvY2F0aW9uLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBbMF0gKyAnIDogJyArIHBbMV0pO1xuICAgICAgICB2aWV3TWFwLnNldENlbnRlcihbcGFyc2VGbG9hdChwWzFdKSwgcGFyc2VGbG9hdChwWzBdKV0pO1xuICAgICAgICBtYXAucmVuZGVyKCk7XG4gICAgICB9KTtcbiAgICBcblxuXG5tYXAgPSBuZXcgTWFwKHtcbiAgICAgIHRhcmdldDogJ2hvdGVsX21hcCcsXG4gICAgICBsYXllcnM6IFtcbiAgICAgICAgbmV3IFRpbGVMYXllcih7XG4gICAgICAgICAgc291cmNlOiBuZXcgT1NNKClcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICB2aWV3OiB2aWV3TWFwXG4gICAgfSk7XG5cblxufSk7XG48L3NjcmlwdD5cblxuXG5cbjxkaXYgY2xhc3M9XCJtYXBcIiBpZD1cImhvdGVsX21hcFwiPjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSSxrQkFBSSxDQUFDLEFBQ0QsTUFBTSxDQUFFLEtBQUssQ0FDYixLQUFLLENBQUUsSUFBSSxBQUNmLENBQUMifQ== */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function create_fragment(ctx) {
	let div;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true, id: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "map svelte-35o4oi");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "id", "hotel_map");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 73, 0, 1708);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let viewMap;
	let map;
	let geox = 0;
	let geoy = 0;

	Object(svelte__WEBPACK_IMPORTED_MODULE_10__["onMount"])(() => {
		viewMap = new ol_View__WEBPACK_IMPORTED_MODULE_2__["default"]({
				center: ol_proj__WEBPACK_IMPORTED_MODULE_8__["fromLonLat"]([-0.2290951, -78.41833539999999]),
				zoom: 5
			});

		// create a Geolocation object setup to track the position of the device
		var geolocation = new ol_Geolocation__WEBPACK_IMPORTED_MODULE_3__["default"]({ tracking: true });

		console.log(geolocation);

		// bind the projection to the view so that positions are reported in the
		// projection of the view
		//geolocation.bindTo('projection', viewMap);
		// bind the marker's position to the geolocation object, the marker will
		// move automatically when the GeoLocation API provides position updates
		//marker.bindTo('position', geolocation);
		// when the GeoLocation API provides a position update, center the view
		// on the new position
		geolocation.on("change:position", () => {
			var p = geolocation.getPosition();
			console.log(p[0] + " : " + p[1]);
			viewMap.setCenter([parseFloat(p[1]), parseFloat(p[0])]);
			map.render();
		});

		map = new ol_Map__WEBPACK_IMPORTED_MODULE_1__["default"]({
				target: "hotel_map",
				layers: [new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_9__["default"]({ source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__["default"]() })],
				view: viewMap
			});
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Map> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Map", $$slots, []);

	$$self.$capture_state = () => ({
		Map: ol_Map__WEBPACK_IMPORTED_MODULE_1__["default"],
		View: ol_View__WEBPACK_IMPORTED_MODULE_2__["default"],
		Geolocation: ol_Geolocation__WEBPACK_IMPORTED_MODULE_3__["default"],
		VectorLayer: ol_layer_Vector__WEBPACK_IMPORTED_MODULE_4__["default"],
		Style: ol_style_Style__WEBPACK_IMPORTED_MODULE_5__["default"],
		Icon: ol_style_Icon__WEBPACK_IMPORTED_MODULE_6__["default"],
		OSM: ol_source_OSM__WEBPACK_IMPORTED_MODULE_7__["default"],
		olProj: ol_proj__WEBPACK_IMPORTED_MODULE_8__,
		TileLayer: ol_layer_Tile__WEBPACK_IMPORTED_MODULE_9__["default"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_10__["onMount"],
		viewMap,
		map,
		geox,
		geoy
	});

	$$self.$inject_state = $$props => {
		if ("viewMap" in $$props) viewMap = $$props.viewMap;
		if ("map" in $$props) map = $$props.map;
		if ("geox" in $$props) geox = $$props.geox;
		if ("geoy" in $$props) geoy = $$props.geoy;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [];
}

class Map_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-35o4oi-style")) add_css();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Map_1",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Map_1);

/***/ }),

/***/ "./src/components/Notifications/Main.svelte":
/*!**************************************************!*\
  !*** ./src/components/Notifications/Main.svelte ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _FetchData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FetchData.js */ "./src/components/FetchData.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* src/components/Notifications/Main.svelte generated by Svelte v3.23.2 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__["globals"];


const file = "src/components/Notifications/Main.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-1ll8o90-style";
	style.textContent = ".loca.svelte-1ll8o90{padding:0.5em;border:solid;border-width:1px;border-color:black}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5zdmVsdGUiLCJzb3VyY2VzIjpbIk1haW4uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCB7IEZldGNoRGF0YSB9IGZyb20gXCIuLi9GZXRjaERhdGEuanNcIjtcbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcblxuICBsZXQgR2VvTGF0aXR1ZGUgPSAwO1xuICBsZXQgR2VvTG9uZ2l0dWRlID0gMDtcbiAgbGV0IEZEYXRhID0gbmV3IEZldGNoRGF0YSgpO1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxuICAgICgpID0+IHt9LFxuICAgICgpID0+IHt9XG4gICk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gR2V0RXZlbnRzQXJvdW5kKHNlYXJjaCkge1xuICAgIGxldCBxdWVyeSA9IHsgbGF0aXR1ZGU6IEdlb0xhdGl0dWRlLCBsb25naXR1ZGU6IEdlb0xvbmdpdHVkZSB9O1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLmdldChcIi9wZ2FwaS92Mi9ldmVudHMvYXJvdW5kXCIsIHF1ZXJ5LCB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9KTtcblxuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coZGF0YXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzZSBwdWRvIGNhcmdhciBsYSBpbmZvcm1hY2nDs25cIik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gR2VvTG9jYXRpb24oKSB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihhc3luYyAocG9zaXRpb24pID0+IHtcbiAgICAgICAgR2VvTGF0aXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgIEdlb0xvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIHByb21pc2UgPSBHZXRFdmVudHNBcm91bmQoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgR2VvTG9jYXRpb24oKTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAubG9jYSB7XG4gICAgcGFkZGluZzogMC41ZW07XG4gICAgYm9yZGVyOiBzb2xpZDtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiXCI+XG4gIHsjYXdhaXQgcHJvbWlzZX1cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICA8YSBjbGFzcz1cImlzLWxvYWRpbmdcIj5DYXJnYW5kby4uLjwvYT5cbiAgezp0aGVuIGRhdGFzfVxuICAgIHsjZWFjaCBkYXRhcyBhcyB7IGlkZXZlbnQsIGxhYmVsLCBkYXRlZXZlbnQsIG1ldGVycywgZGVzY3JpcHRpb24gfSwgaX1cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2NhXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkIGlzLWdyb3VwZWQgaXMtZ3JvdXBlZC1tdWx0aWxpbmVcIj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYW5nZXJcIj48c3BhbiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1ob21lXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPntuZXcgRGF0ZShkYXRlZXZlbnQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtaW5mb1wiPjxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPntuZXcgRGF0ZShkYXRlZXZlbnQpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtaW5mb1wiPjxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuXG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3MgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYXJrXCI+e01hdGguY2VpbChtZXRlcnMpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtaW5mb1wiPm1ldHJvKHMpPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj5jaGF0PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1wcmltYXJ5XCI+b24gZ2l0dGVyPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXY+PHNwYW4+e2Rlc2NyaXB0aW9ufTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgPC9kaXY+XG4gICAgey9lYWNofVxuICB7OmNhdGNoIGVycm9yfVxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxhIHN0eWxlPVwiY29sb3I6IHJlZFwiIGNsYXNzPVwiaXMtbG9hZGluZ1wiPntlcnJvci5tZXNzYWdlfTwvYT5cbiAgey9hd2FpdH1cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRDRSxLQUFLLGVBQUMsQ0FBQyxBQUNMLE9BQU8sQ0FBRSxLQUFLLENBQ2QsTUFBTSxDQUFFLEtBQUssQ0FDYixZQUFZLENBQUUsR0FBRyxDQUNqQixZQUFZLENBQUUsS0FBSyxBQUNyQixDQUFDIn0= */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i].idevent;
	child_ctx[8] = list[i].label;
	child_ctx[9] = list[i].dateevent;
	child_ctx[10] = list[i].meters;
	child_ctx[11] = list[i].description;
	child_ctx[13] = i;
	return child_ctx;
}

// (112:2) {:catch error}
function create_catch_block(ctx) {
	let a;
	let t_value = /*error*/ ctx[14].message + "";
	let t;

	const block = {
		c: function create() {
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			this.h();
		},
		l: function claim(nodes) {
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "A", { style: true, class: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, t_value);
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_style"])(a, "color", "red");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "is-loading");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 113, 4, 3114);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, a, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*promise*/ 1 && t_value !== (t_value = /*error*/ ctx[14].message + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(a);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(112:2) {:catch error}",
		ctx
	});

	return block;
}

// (57:2) {:then datas}
function create_then_block(ctx) {
	let each_1_anchor;
	let each_value = /*datas*/ ctx[6];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*promise, Math, Date*/ 1) {
				each_value = /*datas*/ ctx[6];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(each_1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(57:2) {:then datas}",
		ctx
	});

	return block;
}

// (58:4) {#each datas as { idevent, label, dateevent, meters, description }
function create_each_block(ctx) {
	let div12;
	let div10;
	let div1;
	let div0;
	let span0;
	let t0_value = /*label*/ ctx[8] + "";
	let t0;
	let t1;
	let span2;
	let span1;
	let i0;
	let t2;
	let div3;
	let div2;
	let span3;
	let t3_value = new Date(/*dateevent*/ ctx[9]).toLocaleDateString() + "";
	let t3;
	let t4;
	let span5;
	let span4;
	let i1;
	let t5;
	let div5;
	let div4;
	let span6;
	let t6_value = new Date(/*dateevent*/ ctx[9]).toLocaleTimeString() + "";
	let t6;
	let t7;
	let span8;
	let span7;
	let i2;
	let t8;
	let div7;
	let div6;
	let span9;
	let t9_value = Math.ceil(/*meters*/ ctx[10]) + "";
	let t9;
	let t10;
	let span10;
	let t11;
	let t12;
	let div9;
	let div8;
	let span11;
	let t13;
	let t14;
	let span12;
	let t15;
	let t16;
	let div11;
	let span13;
	let t17_value = /*description*/ ctx[11] + "";
	let t17;
	let t18;

	const block = {
		c: function create() {
			div12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t3_value);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t6_value);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t9_value);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("metro(s)");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("chat");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("on gitter");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t17_value);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			div12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div12_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div12);
			div10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div12_nodes, "DIV", { class: true });
			var div10_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div10);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div10_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "SPAN", { class: true });
			var span0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span0);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span0_nodes, t0_value);
			span0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			span2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "SPAN", { class: true });
			var span2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span2);
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span2_nodes, "SPAN", { class: true });
			var span1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span1);
			i0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span1_nodes, "I", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div10_nodes);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div10_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			span3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "SPAN", { class: true });
			var span3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span3);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span3_nodes, t3_value);
			span3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			span5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "SPAN", { class: true });
			var span5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span5);
			span4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span5_nodes, "SPAN", { class: true });
			var span4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span4);
			i1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span4_nodes, "I", { class: true, "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div10_nodes);
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div10_nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			span6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "SPAN", { class: true });
			var span6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span6);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span6_nodes, t6_value);
			span6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			span8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "SPAN", { class: true });
			var span8_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span8);
			span7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span8_nodes, "SPAN", { class: true });
			var span7_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span7);
			i2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span7_nodes, "I", { class: true, "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span7_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span8_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div10_nodes);
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div10_nodes, "DIV", { class: true });
			var div7_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div7);
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div7_nodes, "DIV", { class: true });
			var div6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div6);
			span9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "SPAN", { class: true });
			var span9_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span9);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span9_nodes, t9_value);
			span9_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div6_nodes);
			span10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "SPAN", { class: true });
			var span10_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span10);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span10_nodes, "metro(s)");
			span10_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div7_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div10_nodes);
			div9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div10_nodes, "DIV", { class: true });
			var div9_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div9);
			div8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div9_nodes, "DIV", { class: true });
			var div8_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div8);
			span11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div8_nodes, "SPAN", { class: true });
			var span11_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span11);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span11_nodes, "chat");
			span11_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div8_nodes);
			span12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div8_nodes, "SPAN", { class: true });
			var span12_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span12);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span12_nodes, "on gitter");
			span12_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div8_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div9_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div10_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div12_nodes);
			div11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div12_nodes, "DIV", {});
			var div11_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div11);
			span13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div11_nodes, "SPAN", {});
			var span13_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span13);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span13_nodes, t17_value);
			span13_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div11_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div12_nodes);
			div12_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span0, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span0, file, 64, 14, 1541);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i0, "class", "fas fa-home");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i0, file, 66, 16, 1660);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span1, "class", "icon");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span1, file, 65, 42, 1624);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span2, "class", "tag is-danger");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span2, file, 65, 14, 1596);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 63, 12, 1497);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 62, 10, 1463);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span3, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span3, file, 73, 14, 1840);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i1, "class", "fa fa-calendar");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i1, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i1, file, 75, 16, 1992);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span4, "class", "icon");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span4, file, 74, 40, 1956);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span5, "class", "tag is-info");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span5, file, 74, 14, 1930);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 72, 12, 1796);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 71, 10, 1762);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span6, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span6, file, 82, 14, 2204);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i2, "class", "fa fa-calendar");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i2, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i2, file, 84, 16, 2356);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span7, "class", "icon");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span7, file, 83, 40, 2320);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span8, "class", "tag is-info");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span8, file, 83, 14, 2294);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 81, 12, 2160);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 80, 10, 2126);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span9, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span9, file, 93, 14, 2562);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span10, "class", "tag is-info");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span10, file, 94, 14, 2629);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 92, 12, 2518);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div7, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div7, file, 91, 10, 2484);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span11, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span11, file, 100, 14, 2804);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span12, "class", "tag is-primary");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span12, file, 101, 14, 2856);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div8, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div8, file, 99, 12, 2760);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div9, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div9, file, 98, 10, 2726);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div10, "class", "field is-grouped is-grouped-multiline");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div10, file, 60, 8, 1400);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span13, file, 106, 13, 2967);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div11, file, 106, 8, 2962);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div12, "class", "loca svelte-1ll8o90");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div12, file, 58, 6, 1372);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div12, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div12, div10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, span0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, span2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span2, span1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span1, i0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, span3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span3, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, span5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span5, span4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span4, i1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, span6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span6, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, span8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span8, span7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span7, i2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, div7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div7, div6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, span9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span9, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, span10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span10, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, div9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div9, div8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div8, span11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span11, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div8, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div8, span12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span12, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div12, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div12, div11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, span13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span13, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div12, t18);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*promise*/ 1 && t0_value !== (t0_value = /*label*/ ctx[8] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);
			if (dirty & /*promise*/ 1 && t3_value !== (t3_value = new Date(/*dateevent*/ ctx[9]).toLocaleDateString() + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t3, t3_value);
			if (dirty & /*promise*/ 1 && t6_value !== (t6_value = new Date(/*dateevent*/ ctx[9]).toLocaleTimeString() + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t6, t6_value);
			if (dirty & /*promise*/ 1 && t9_value !== (t9_value = Math.ceil(/*meters*/ ctx[10]) + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t9, t9_value);
			if (dirty & /*promise*/ 1 && t17_value !== (t17_value = /*description*/ ctx[11] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t17, t17_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div12);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(58:4) {#each datas as { idevent, label, dateevent, meters, description }",
		ctx
	});

	return block;
}

// (54:18)      <!-- svelte-ignore a11y-missing-attribute -->     <a class="is-loading">Cargando...</a>   {:then datas}
function create_pending_block(ctx) {
	let a;
	let t;

	const block = {
		c: function create() {
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Cargando...");
			this.h();
		},
		l: function claim(nodes) {
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "A", { class: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Cargando...");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "is-loading");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 55, 4, 1237);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, a, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(a);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(54:18)      <!-- svelte-ignore a11y-missing-attribute -->     <a class=\\\"is-loading\\\">Cargando...</a>   {:then datas}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let promise_1;

	let info = {
		ctx,
		current: null,
		token: null,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 6,
		error: 14
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["handle_promise"])(promise_1 = /*promise*/ ctx[0], info);

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			info.block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			info.block.l(div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 52, 0, 1149);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			info.block.m(div, info.anchor = null);
			info.mount = () => div;
			info.anchor = null;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*promise*/ 1 && promise_1 !== (promise_1 = /*promise*/ ctx[0]) && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["handle_promise"])(promise_1, info)) {
				
			} else {
				const child_ctx = ctx.slice();
				child_ctx[6] = info.resolved;
				info.block.p(child_ctx, dirty);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			info.block.d();
			info.token = null;
			info = null;
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let GeoLatitude = 0;
	let GeoLongitude = 0;
	let FData = new _FetchData_js__WEBPACK_IMPORTED_MODULE_1__["FetchData"]();

	let promise = new Promise(() => {
			
		},
	() => {
			
		});

	async function GetEventsAround(search) {
		let query = {
			latitude: GeoLatitude,
			longitude: GeoLongitude
		};

		const res = await FData.get("/pgapi/v2/events/around", query, { "Content-Type": "application/json" });

		if (res.ok) {
			return res.json();
			console.log(datas);
		} else {
			throw new Error("No se pudo cargar la información");
		}
	}

	function GeoLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async position => {
				GeoLatitude = position.coords.latitude;
				GeoLongitude = position.coords.longitude;
				$$invalidate(0, promise = GetEventsAround());
			});
		} else {
			console.log("No se pudo obtener las coordenadas");
		}
	}

	Object(svelte__WEBPACK_IMPORTED_MODULE_2__["onMount"])(async () => {
		GeoLocation();
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);

	$$self.$capture_state = () => ({
		FetchData: _FetchData_js__WEBPACK_IMPORTED_MODULE_1__["FetchData"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_2__["onMount"],
		GeoLatitude,
		GeoLongitude,
		FData,
		promise,
		GetEventsAround,
		GeoLocation
	});

	$$self.$inject_state = $$props => {
		if ("GeoLatitude" in $$props) GeoLatitude = $$props.GeoLatitude;
		if ("GeoLongitude" in $$props) GeoLongitude = $$props.GeoLongitude;
		if ("FData" in $$props) FData = $$props.FData;
		if ("promise" in $$props) $$invalidate(0, promise = $$props.promise);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [promise];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1ll8o90-style")) add_css();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/Report/Accident/Main.svelte":
/*!****************************************************!*\
  !*** ./src/components/Report/Accident/Main.svelte ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SendEvent.js */ "./src/components/Report/SendEvent.js");
/* src/components/Report/Accident/Main.svelte generated by Svelte v3.23.2 */



const file = "src/components/Report/Accident/Main.svelte";

function create_fragment(ctx) {
	let button;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("ACCIDENTE");
			this.h();
		},
		l: function claim(nodes) {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "BUTTON", { class: true });
			var button_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(button);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(button_nodes, "ACCIDENTE");
			button_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "class", "button is-warning is-outlined is-large is-fullwidth");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(button, file, 7, 0, 146);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(button, "click", /*Send*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(button);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	function Send(params) {
		Object(_SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"])("cspwa-accident-alarm");
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);
	$$self.$capture_state = () => ({ SendEvent: _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"], Send });
	return [Send];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/Report/Assault/Main.svelte":
/*!***************************************************!*\
  !*** ./src/components/Report/Assault/Main.svelte ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SendEvent.js */ "./src/components/Report/SendEvent.js");
/* src/components/Report/Assault/Main.svelte generated by Svelte v3.23.2 */



const file = "src/components/Report/Assault/Main.svelte";

function create_fragment(ctx) {
	let button;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("ASALTO");
			this.h();
		},
		l: function claim(nodes) {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "BUTTON", { class: true });
			var button_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(button);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(button_nodes, "ASALTO");
			button_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "class", "button is-danger is-outlined is-large is-fullwidth");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(button, file, 7, 0, 145);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(button, "click", /*Send*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(button);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	function Send(params) {
		Object(_SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"])("cspwa-assault-alarm");
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);
	$$self.$capture_state = () => ({ SendEvent: _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"], Send });
	return [Send];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/Report/Main.svelte":
/*!*******************************************!*\
  !*** ./src/components/Report/Main.svelte ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Accident_Main_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Accident/Main.svelte */ "./src/components/Report/Accident/Main.svelte");
/* harmony import */ var _Assault_Main_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Assault/Main.svelte */ "./src/components/Report/Assault/Main.svelte");
/* harmony import */ var _Suspect_Main_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Suspect/Main.svelte */ "./src/components/Report/Suspect/Main.svelte");
/* harmony import */ var _Theft_Main_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Theft/Main.svelte */ "./src/components/Report/Theft/Main.svelte");
/* src/components/Report/Main.svelte generated by Svelte v3.23.2 */






const file = "src/components/Report/Main.svelte";

function create_fragment(ctx) {
	let div4;
	let div0;
	let assault;
	let t0;
	let div1;
	let theft;
	let t1;
	let div2;
	let accident;
	let t2;
	let div3;
	let suspect;
	let current;
	assault = new _Assault_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({ $$inline: true });
	theft = new _Theft_Main_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({ $$inline: true });
	accident = new _Accident_Main_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });
	suspect = new _Suspect_Main_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(assault.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(theft.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(accident.$$.fragment);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(suspect.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(assault.$$.fragment, div0_nodes);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(theft.$$.fragment, div1_nodes);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(accident.$$.fragment, div2_nodes);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div4_nodes);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(suspect.$$.fragment, div3_nodes);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "column");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 8, 2, 230);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "column");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 11, 2, 278);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "column");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 14, 2, 324);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "column");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 17, 2, 373);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "columns");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 7, 0, 206);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div4, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(assault, div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(theft, div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(accident, div2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(suspect, div3, null);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(assault.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(theft.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(accident.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(suspect.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(assault.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(theft.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(accident.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(suspect.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(assault);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(theft);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(accident);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(suspect);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);
	$$self.$capture_state = () => ({ Accident: _Accident_Main_svelte__WEBPACK_IMPORTED_MODULE_1__["default"], Assault: _Assault_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"], Suspect: _Suspect_Main_svelte__WEBPACK_IMPORTED_MODULE_3__["default"], Theft: _Theft_Main_svelte__WEBPACK_IMPORTED_MODULE_4__["default"] });
	return [];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/Report/SendEvent.js":
/*!********************************************!*\
  !*** ./src/components/Report/SendEvent.js ***!
  \********************************************/
/*! exports provided: SendEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendEvent", function() { return SendEvent; });
/* harmony import */ var _FetchData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FetchData.js */ "./src/components/FetchData.js");


let FData = new _FetchData_js__WEBPACK_IMPORTED_MODULE_0__["FetchData"]();

function SendEvent(code) {
  if ("geolocation" in navigator) {
    console.log("Obtiene localización");
    navigator.geolocation.getCurrentPosition(
       (position) => {
        //console.log(position);
         Send(code, position);
      },
       (err) => {
        console.log(err);
         Send(code, err);
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("GeoLocalización no soportada");
    Send(code, { location: "unsoported" });
  }
}

async function Send(code, glocation) {
  let geo = {
    latitude: glocation.coords.latitude,
    longitude: glocation.coords.longitude,
    accuracy: glocation.coords.accuracy,
    altitude: glocation.coords.altitude,
    altitudeAccuracy: glocation.coords.altitudeAccuracy,
    heading: glocation.coords.heading,
    speed: glocation.coords.speed
  };
  let dataUser = { code: code, details: { geo: geo} };
  console.log(dataUser);
  try {
    const res = await FData.post(
      "/pgapi/community-safety-pwa/v1/receiver",
      dataUser,
      {
        "Content-Type": "application/json",
      }
    );

    if (res.ok) {
      let data = await res.json();
      console.warn(data);
    } else {
      console.error(res);
    }
    
  } catch (err) {
    console.warn(err);
  }
}


/***/ }),

/***/ "./src/components/Report/Suspect/Main.svelte":
/*!***************************************************!*\
  !*** ./src/components/Report/Suspect/Main.svelte ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SendEvent.js */ "./src/components/Report/SendEvent.js");
/* src/components/Report/Suspect/Main.svelte generated by Svelte v3.23.2 */



const file = "src/components/Report/Suspect/Main.svelte";

function create_fragment(ctx) {
	let button;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("SOSPECHOSO");
			this.h();
		},
		l: function claim(nodes) {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "BUTTON", { class: true });
			var button_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(button);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(button_nodes, "SOSPECHOSO");
			button_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "class", "button is-link is-outlined is-large is-fullwidth");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(button, file, 7, 0, 135);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(button, "click", /*Send*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(button);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	function Send(params) {
		Object(_SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"])("cspwa-suspect-alarm");
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);
	$$self.$capture_state = () => ({ SendEvent: _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"], Send });
	return [Send];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/Report/Theft/Main.svelte":
/*!*************************************************!*\
  !*** ./src/components/Report/Theft/Main.svelte ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SendEvent.js */ "./src/components/Report/SendEvent.js");
/* src/components/Report/Theft/Main.svelte generated by Svelte v3.23.2 */



const file = "src/components/Report/Theft/Main.svelte";

function create_fragment(ctx) {
	let button;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("button");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("HURTO");
			this.h();
		},
		l: function claim(nodes) {
			button = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "BUTTON", { class: true });
			var button_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(button);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(button_nodes, "HURTO");
			button_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(button, "class", "button is-danger is-outlined is-large is-fullwidth");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(button, file, 6, 0, 142);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, button, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(button, t);

			if (!mounted) {
				dispose = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(button, "click", /*Send*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(button);
			mounted = false;
			dispose();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	function Send(params) {
		Object(_SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"])("cspwa-theft-alarm");
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);
	$$self.$capture_state = () => ({ SendEvent: _SendEvent_js__WEBPACK_IMPORTED_MODULE_1__["SendEvent"], Send });
	return [Send];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/Watched/Main.svelte":
/*!********************************************!*\
  !*** ./src/components/Watched/Main.svelte ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src/components/Watched/Main.svelte generated by Svelte v3.23.2 */


const file = "src/components/Watched/Main.svelte";

function create_fragment(ctx) {
	let div;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Seguimiento");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", {});
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(div_nodes, "Seguimiento");
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Main", $$slots, []);
	return [];
}

class Main extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Main",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/components/sha1.js":
/*!********************************!*\
  !*** ./src/components/sha1.js ***!
  \********************************/
/*! exports provided: hex_sha1, b64_sha1, str_sha1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex_sha1", function() { return hex_sha1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b64_sha1", function() { return b64_sha1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str_sha1", function() { return str_sha1; });
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

/***/ }),

/***/ "./src/routes/home/index.svelte":
/*!**************************************!*\
  !*** ./src/routes/home/index.svelte ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _components_Report_Main_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Report/Main.svelte */ "./src/components/Report/Main.svelte");
/* harmony import */ var _components_Watched_Main_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Watched/Main.svelte */ "./src/components/Watched/Main.svelte");
/* harmony import */ var _components_Notifications_Main_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Notifications/Main.svelte */ "./src/components/Notifications/Main.svelte");
/* harmony import */ var _components_Map_Map_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Map/Map.svelte */ "./src/components/Map/Map.svelte");
/* harmony import */ var _components_FetchData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/FetchData.js */ "./src/components/FetchData.js");
/* src/routes/home/index.svelte generated by Svelte v3.23.2 */








const file = "src/routes/home/index.svelte";

function create_fragment(ctx) {
	let nav;
	let div0;
	let a0;
	let img;
	let img_src_value;
	let t0;
	let strong;
	let t1;
	let t2;
	let a1;
	let span0;
	let t3;
	let span1;
	let t4;
	let span2;
	let t5;
	let div5;
	let div1;
	let a2;
	let t6;
	let t7;
	let a3;
	let t8;
	let t9;
	let div4;
	let div3;
	let div2;
	let a4;
	let t10;
	let t11;
	let div6;
	let ul;
	let li0;
	let a5;
	let span3;
	let i;
	let t12;
	let span4;
	let t13;
	let t14;
	let li1;
	let a6;
	let t15;
	let t16;
	let li2;
	let a7;
	let t17;
	let t18;
	let li3;
	let a8;
	let t19;
	let t20;
	let switch_instance;
	let switch_instance_anchor;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*componentSelected*/ ctx[0];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			nav = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("nav");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			strong = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("strong");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("SEGURIDAD CIUDADANA");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Mi cuenta");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Reportes");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Logout");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("ul");
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			a5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			span3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Reportar");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			a6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Notificaciones");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			a7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Seguimiento");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			a8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Mapa");
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance.$$.fragment);
			switch_instance_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.h();
		},
		l: function claim(nodes) {
			nav = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "NAV", {
				class: true,
				role: true,
				"aria-label": true
			});

			var nav_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(nav);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nav_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "A", { class: true, href: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);

			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a0_nodes, "IMG", {
				src: true,
				width: true,
				height: true,
				alt: true
			});

			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(a0_nodes);
			strong = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a0_nodes, "STRONG", {});
			var strong_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(strong);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(strong_nodes, "SEGURIDAD CIUDADANA");
			strong_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);

			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "A", {
				role: true,
				class: true,
				"aria-label": true,
				"aria-expanded": true,
				"data-target": true
			});

			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a1_nodes, "SPAN", { "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(a1_nodes);
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a1_nodes, "SPAN", { "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(a1_nodes);
			span2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a1_nodes, "SPAN", { "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nav_nodes);
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nav_nodes, "DIV", { id: true, class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			a2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "A", { class: true });
			var a2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a2);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a2_nodes, "Mi cuenta");
			a2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			a3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "A", { class: true });
			var a3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a3);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a3_nodes, "Reportes");
			a3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			a4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "A", { class: true });
			var a4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a4);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a4_nodes, "Logout");
			a4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			nav_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div6);
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "UL", {});
			var ul_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(ul);
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", {});
			var li0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li0);
			a5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(li0_nodes, "A", {});
			var a5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a5);
			span3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a5_nodes, "SPAN", { class: true });
			var span3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span3);
			i = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span3_nodes, "I", { class: true, "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(a5_nodes);
			span4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(a5_nodes, "SPAN", {});
			var span4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span4);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span4_nodes, "Reportar");
			span4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			a5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			li0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", {});
			var li1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li1);
			a6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(li1_nodes, "A", {});
			var a6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a6);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a6_nodes, "Notificaciones");
			a6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			li1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", {});
			var li2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li2);
			a7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(li2_nodes, "A", {});
			var a7_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a7);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a7_nodes, "Seguimiento");
			a7_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			li2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", {});
			var li3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li3);
			a8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(li3_nodes, "A", {});
			var a8_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a8);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a8_nodes, "Mapa");
			a8_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			li3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			ul_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "logo.png")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "width", "25");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "height", "25");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "Seguridad Comunitaria");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 19, 6, 640);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(strong, file, 20, 6, 720);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "class", "navbar-item");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "/home");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 18, 4, 597);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span0, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span0, file, 30, 6, 978);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span1, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span1, file, 31, 6, 1012);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span2, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span2, file, 32, 6, 1046);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "role", "button");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "class", "navbar-burger burger");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "aria-label", "menu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "aria-expanded", "false");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "data-target", "navbarBasicExample");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 24, 4, 822);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "navbar-brand");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 17, 2, 566);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a2, "class", "navbar-item");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a2, file, 39, 6, 1234);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a3, "class", "navbar-item");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a3, file, 42, 6, 1332);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "navbar-start");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 37, 4, 1149);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a4, "class", "button is-light");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a4, file, 49, 10, 1539);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "buttons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 47, 8, 1451);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "navbar-item");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 46, 6, 1417);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "navbar-end");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 45, 4, 1386);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "id", "navbarBasicExample");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "navbar-menu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 36, 2, 1095);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(nav, "class", "navbar");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(nav, "role", "navigation");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(nav, "aria-label", "main navigation");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(nav, file, 16, 0, 496);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i, "class", "fas fa-image");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i, file, 63, 36, 1878);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span3, "class", "icon is-small");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span3, file, 63, 8, 1850);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span4, file, 66, 8, 1963);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a5, file, 62, 6, 1838);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li0, "is-active", /*componentSelected*/ ctx[0] === _components_Report_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li0, file, 59, 4, 1724);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a6, file, 73, 6, 2188);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li1, "is-active", /*componentSelected*/ ctx[0] === _components_Notifications_Main_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li1, file, 70, 4, 2060);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a7, file, 79, 6, 2390);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li2, "is-active", /*componentSelected*/ ctx[0] === _components_Watched_Main_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li2, file, 76, 4, 2274);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a8, file, 85, 6, 2597);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li3, "is-active", /*componentSelected*/ ctx[0] === _components_Map_Map_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li3, file, 81, 4, 2423);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(ul, file, 57, 2, 1665);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "tabs is-boxed");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 56, 0, 1635);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, nav, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, img);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, strong);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(strong, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, span0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, span1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, span2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(nav, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, a2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a2, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, a3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a3, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, a4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a4, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t11, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div6, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, ul);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li0, a5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a5, span3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span3, i);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a5, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a5, span4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span4, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li1, a6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a6, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li2, a7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a7, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(li3, a8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a8, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t20, anchor);

			if (switch_instance) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance, target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, switch_instance_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(li0, "click", /*click_handler*/ ctx[1], false, false, false),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(li1, "click", /*click_handler_1*/ ctx[2], false, false, false),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(li2, "click", /*click_handler_2*/ ctx[3], false, false, false),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(li3, "click", /*click_handler_3*/ ctx[4], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*componentSelected, Report*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li0, "is-active", /*componentSelected*/ ctx[0] === _components_Report_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]);
			}

			if (dirty & /*componentSelected, Notifications*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li1, "is-active", /*componentSelected*/ ctx[0] === _components_Notifications_Main_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]);
			}

			if (dirty & /*componentSelected, Watched*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li2, "is-active", /*componentSelected*/ ctx[0] === _components_Watched_Main_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]);
			}

			if (dirty & /*componentSelected, MapAccount*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["toggle_class"])(li3, "is-active", /*componentSelected*/ ctx[0] === _components_Map_Map_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]);
			}

			if (switch_value !== (switch_value = /*componentSelected*/ ctx[0])) {
				if (switch_instance) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				0;
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(nav);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t11);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div6);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t20);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(switch_instance_anchor);
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance, detaching);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let componentSelected = _components_Report_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"];

	//export let segment;
	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(async () => {
		
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Home", $$slots, []);

	const click_handler = () => {
		$$invalidate(0, componentSelected = _components_Report_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]);
	};

	const click_handler_1 = () => {
		$$invalidate(0, componentSelected = _components_Notifications_Main_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]);
	};

	const click_handler_2 = () => {
		$$invalidate(0, componentSelected = _components_Watched_Main_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]);
	};

	const click_handler_3 = () => {
		$$invalidate(0, componentSelected = _components_Map_Map_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]);
	};

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		Report: _components_Report_Main_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Watched: _components_Watched_Main_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Notifications: _components_Notifications_Main_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		MapAccount: _components_Map_Map_svelte__WEBPACK_IMPORTED_MODULE_5__["default"],
		FetchData: _components_FetchData_js__WEBPACK_IMPORTED_MODULE_6__["FetchData"],
		componentSelected
	});

	$$self.$inject_state = $$props => {
		if ("componentSelected" in $$props) $$invalidate(0, componentSelected = $$props.componentSelected);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		componentSelected,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class Home extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Home",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFwL01hcC5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTm90aWZpY2F0aW9ucy9NYWluLnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZXBvcnQvQWNjaWRlbnQvTWFpbi5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L0Fzc2F1bHQvTWFpbi5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L01haW4uc3ZlbHRlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1JlcG9ydC9TZW5kRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L1N1c3BlY3QvTWFpbi5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L1RoZWZ0L01haW4uc3ZlbHRlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NoYTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ob21lL2luZGV4LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQzs7O0FBR3hDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsdUJBQXVCLDBEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBLDJFQUEyRTtBQUMzRSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLFdBQVcseURBQVE7QUFDbkI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSHlCO0FBQ0U7QUFDYztBQUNDO0FBQ1A7QUFDRjtBQUNEO0FBQ0U7QUFDSTtBQUVQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FFM0IsT0FBTztLQUNQLEdBQUc7S0FDSCxJQUFJLEdBQUcsQ0FBQztLQUNSLElBQUksR0FBRyxDQUFDOztDQUdaLHVEQUFPO0VBRUgsT0FBTyxPQUFPLCtDQUFJO0lBQ2QsTUFBTSxFQUFFLGtEQUFpQixHQUFHLFNBQVMsR0FBRyxpQkFBaUI7SUFDekQsSUFBSSxFQUFFLENBQUM7Ozs7TUFJQyxXQUFXLE9BQU8sc0RBQVcsR0FDckMsUUFBUSxFQUFFLElBQUk7O0VBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVzs7Ozs7Ozs7OztFQVdqQixXQUFXLENBQUMsRUFBRSxDQUFDLGlCQUFpQjtPQUMxQixDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVc7R0FDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztHQUM5QixPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNuRCxHQUFHLENBQUMsTUFBTTs7O0VBS2xCLEdBQUcsT0FBTyw4Q0FBRztJQUNQLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sT0FDQSxxREFBUyxHQUNYLE1BQU0sTUFBTSxxREFBRztJQUduQixJQUFJLEVBQUUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9EMkI7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQStHVyxHQUFLLEtBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUVBQWIsR0FBSyxLQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkF4RGhELEdBQUs7Ozs7Z0NBQVYsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFBQyxHQUFLOzs7OytCQUFWLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBQUosTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQU8rQixHQUFLOzs7Ozs7Ozs7O29CQVNELElBQUksZUFBQyxHQUFTLEtBQUUsa0JBQWtCOzs7Ozs7Ozs7O29CQVNsQyxJQUFJLGVBQUMsR0FBUyxLQUFFLGtCQUFrQjs7Ozs7Ozs7OztnQkFXdEMsSUFBSSxDQUFDLElBQUksWUFBQyxHQUFNOzs7Ozs7Ozs7Ozs7Ozs7O2lDQWFyQyxHQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21FQTFDVSxHQUFLOzZEQVNELElBQUksZUFBQyxHQUFTLEtBQUUsa0JBQWtCOzZEQVNsQyxJQUFJLGVBQUMsR0FBUyxLQUFFLGtCQUFrQjt5REFXdEMsSUFBSSxDQUFDLElBQUksWUFBQyxHQUFNOzJFQWFyQyxHQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dHQXJEckIsR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUVBQVAsR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBakRYLFdBQVcsR0FBRyxDQUFDO0tBQ2YsWUFBWSxHQUFHLENBQUM7S0FDaEIsS0FBSyxPQUFPLHVEQUFTOztLQUNyQixPQUFPLE9BQU8sT0FBTzs7Ozs7OztnQkFLVixlQUFlLENBQUMsTUFBTTtNQUMvQixLQUFLO0dBQUssUUFBUSxFQUFFLFdBQVc7R0FBRSxTQUFTLEVBQUUsWUFBWTs7O1FBQ3RELEdBQUcsU0FBUyxLQUFLLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssSUFDMUQsY0FBYyxFQUFFLGtCQUFrQjs7TUFHaEMsR0FBRyxDQUFDLEVBQUU7VUFDRCxHQUFHLENBQUMsSUFBSTtHQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSzs7YUFFUCxLQUFLLENBQUMsa0NBQWtDOzs7O1VBSTdDLFdBQVc7TUFDZCxTQUFTLENBQUMsV0FBVztHQUN2QixTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixPQUFRLFFBQVE7SUFDdEQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUTtJQUN0QyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTO29CQUN4QyxPQUFPLEdBQUcsZUFBZTs7O0dBRzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DOzs7O0NBSXBELHNEQUFPO0VBQ0wsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDK0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkdBSzNCLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBSlYsSUFBSSxDQUFDLE1BQU07RUFDbEIsK0RBQVMsQ0FBQyxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSFE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkdBTTNCLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBTFYsSUFBSSxDQUFDLE1BQU07RUFDbEIsK0RBQVMsQ0FBQyxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRlc7QUFDRjtBQUNBO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0oxQztBQUFBO0FBQUE7QUFBNEM7O0FBRTVDLGdCQUFnQix1REFBUzs7QUFFbEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUIsVUFBVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RENEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkdBUWhDLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBUEwsSUFBSSxDQUFDLE1BQU07RUFDbEIsK0RBQVMsQ0FBQyxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRlc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkdBSzNCLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBSlYsSUFBSSxDQUFDLE1BQU07RUFDbEIsK0RBQVMsQ0FBQyxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0huQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isc0NBQXNDO0FBQ3RELGlCQUFpQjtBQUNqQixnQkFBZ0IseUNBQXlDOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNPLHFCQUFxQjtBQUNyQixxQkFBcUI7QUFDckIscUJBQXFCO0FBQzVCLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0NBQWtDOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUJBQXlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hNbUM7QUFDd0I7QUFDRTtBQUNZO0FBQ2Q7QUFDQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FvRnBDLEdBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0hBOUJsQixHQUFpQixRQUFLLHNFQUFNOzs7Z0hBVzVCLEdBQWlCLFFBQUssNkVBQWE7OztnSEFNbkMsR0FBaUIsUUFBSyx1RUFBTzs7O2dIQUs3QixHQUFpQixRQUFLLGtFQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lIQXRCaEMsR0FBaUIsUUFBSyxzRUFBTTs7OztpSEFXNUIsR0FBaUIsUUFBSyw2RUFBYTs7OztpSEFNbkMsR0FBaUIsUUFBSyx1RUFBTzs7OztpSEFLN0IsR0FBaUIsUUFBSyxrRUFBVTs7OzhEQVEvQixHQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBakZuQyxpQkFBaUIsR0FBRyxzRUFBTTs7O0NBSTlCLHNEQUFPOzs7Ozs7Ozs7Ozs7OztrQkFnRFksaUJBQWlCLEdBQUcsc0VBQU07Ozs7a0JBVzFCLGlCQUFpQixHQUFHLDZFQUFhOzs7O2tCQU1qQyxpQkFBaUIsR0FBRyx1RUFBTzs7OztrQkFLM0IsaUJBQWlCLEdBQUcsa0VBQVUiLCJmaWxlIjoiYTJkZmM1ZmZmNWNmNWY1NGZiNWEvaG9tZS5ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vU3RvcmVzLmpzXCI7XG5pbXBvcnQgeyBoZXhfc2hhMSwgc3RyX3NoYTEgfSBmcm9tIFwiLi9zaGExLmpzXCI7XG5cblxuZXhwb3J0IGNsYXNzIEZldGNoRGF0YSB7XG4gIGFzeW5jIHB1dCh1cmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICB9XG4gICAgICAvL2NhY2hlLnB1dChldmVudC5yZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAvL2NvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XG4gICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwb3N0KHVybCwgZGF0YSwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZTtcblxuICAgIHRyeSB7XG4gICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9KTtcbiAgICAgIC8vY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIC8vY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChldmVudC5yZXF1ZXN0KTtcbiAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuICBhc3luYyBnZXQodXJsLCBxdWVyeSwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZTtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaFVSTCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgICAgbGV0IHVybHEgPSB1cmwgKyBcIj9cIiArIHNlYXJjaFVSTC50b1N0cmluZygpO1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmxxLCB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICBcbiAgfVxuXG4gIGFzeW5jIGxvZ2luKHVybCwgdXNlciwgcGFzc3dvcmQsIGNvdW50cnkpIHtcbiAgICBsZXQgTFN0b3JhZ2UgPSBuZXcgQVBQTG9jYWxTdG9yYWdlKCk7XG4gICAgbGV0IHB3ZG9mZiA9IGF3YWl0IHRoaXMuZGlnZXN0TWVzc2FnZSh1c2VyICsgcGFzc3dvcmQpO1xuICAgIHRyeSB7XG4gICAgICBsZXQgZiA9IGF3YWl0IHRoaXMucG9zdChcbiAgICAgICAgdXJsLFxuICAgICAgICB7XG4gICAgICAgICAgdXNlcm5hbWU6IHVzZXIsXG4gICAgICAgICAgcHdkOiBwYXNzd29yZCxcbiAgICAgICAgICBjb3VudHJ5OiBjb3VudHJ5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKGYpO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmLmpzb24oKTtcblxuICAgICAgZGF0YS5vZmZsaW5lID0gcHdkb2ZmO1xuICAgICAgTFN0b3JhZ2Uuc2V0VXNlcihkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLnRyYWNlKGVycm9yKTtcbiAgICAgIGxldCBkYXRhID0ge307XG4gICAgICBkYXRhLmxvZ2luID0gZmFsc2U7XG4gICAgICBsZXQgdXNlciA9IExTdG9yYWdlLmdldFVzZXIoZGF0YSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuXG4gICAgICBpZiAodXNlci5vZmZsaW5lID09IHB3ZG9mZikge1xuICAgICAgICBkYXRhID0gdXNlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGlnZXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgLypcbiAgICAgICAgY29uc29sZS5sb2coaGV4X3NoYTEoJ2hvbGEnKSwgc3RyX3NoYTEoJ2hvbGEnKSk7XG4gICAgICAgIGNvbnN0IG1zZ1VpbnQ4ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1lc3NhZ2UpOyAvLyBlbmNvZGUgYXMgKHV0Zi04KSBVaW50OEFycmF5XG4gICAgICAgIGNvbnNvbGUubG9nKGNyeXB0byk7XG4gICAgICAgIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgbXNnVWludDgpOyAvLyBoYXNoIHRoZSBtZXNzYWdlXG4gICAgICAgIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpOyAvLyBjb252ZXJ0IGJ1ZmZlciB0byBieXRlIGFycmF5XG4gICAgICAgIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXlcbiAgICAgICAgICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgICAgIC5qb2luKFwiXCIpOyAvLyBjb252ZXJ0IGJ5dGVzIHRvIGhleCBzdHJpbmdcbiAgICAgICAgICAgICovXG4gICAgcmV0dXJuIGhleF9zaGExKG1lc3NhZ2UpO1xuICB9XG59XG4iLCI8c3R5bGU+XG4gICAgLm1hcHtcbiAgICAgICAgaGVpZ2h0OiA4MDBweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IEdlb2xvY2F0aW9uIGZyb20gJ29sL0dlb2xvY2F0aW9uJztcbmltcG9ydCBWZWN0b3JMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IFN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBJY29uIGZyb20gJ29sL3N0eWxlL0ljb24nO1xuaW1wb3J0IE9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qJztcbmltcG9ydCBUaWxlTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVGlsZSc7XG5cbmltcG9ydCB7b25Nb3VudH0gZnJvbSAnc3ZlbHRlJztcblxubGV0IHZpZXdNYXA7XG5sZXQgbWFwO1xubGV0IGdlb3ggPSAwO1xubGV0IGdlb3kgPSAwO1xuXG5cbm9uTW91bnQoKCk9PntcblxuICAgIHZpZXdNYXAgPSBuZXcgVmlldyh7XG4gICAgICAgIGNlbnRlcjogb2xQcm9qLmZyb21Mb25MYXQoWy0wLjIyOTA5NTEsIC03OC40MTgzMzUzOTk5OTk5OV0pLFxuICAgICAgICB6b29tOiA1XG4gICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgR2VvbG9jYXRpb24gb2JqZWN0IHNldHVwIHRvIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGV2aWNlXG4gICAgICAgICAgICB2YXIgZ2VvbG9jYXRpb24gPSBuZXcgR2VvbG9jYXRpb24oe1xuICAgICAgICB0cmFja2luZzogdHJ1ZVxuICAgICAgfSk7XG5jb25zb2xlLmxvZyhnZW9sb2NhdGlvbik7XG4gICAgICAvLyBiaW5kIHRoZSBwcm9qZWN0aW9uIHRvIHRoZSB2aWV3IHNvIHRoYXQgcG9zaXRpb25zIGFyZSByZXBvcnRlZCBpbiB0aGVcbiAgICAgIC8vIHByb2plY3Rpb24gb2YgdGhlIHZpZXdcbiAgICAgIC8vZ2VvbG9jYXRpb24uYmluZFRvKCdwcm9qZWN0aW9uJywgdmlld01hcCk7XG5cbiAgICAgIC8vIGJpbmQgdGhlIG1hcmtlcidzIHBvc2l0aW9uIHRvIHRoZSBnZW9sb2NhdGlvbiBvYmplY3QsIHRoZSBtYXJrZXIgd2lsbFxuICAgICAgLy8gbW92ZSBhdXRvbWF0aWNhbGx5IHdoZW4gdGhlIEdlb0xvY2F0aW9uIEFQSSBwcm92aWRlcyBwb3NpdGlvbiB1cGRhdGVzXG4gICAgICAvL21hcmtlci5iaW5kVG8oJ3Bvc2l0aW9uJywgZ2VvbG9jYXRpb24pO1xuXG4gICAgICAvLyB3aGVuIHRoZSBHZW9Mb2NhdGlvbiBBUEkgcHJvdmlkZXMgYSBwb3NpdGlvbiB1cGRhdGUsIGNlbnRlciB0aGUgdmlld1xuICAgICAgLy8gb24gdGhlIG5ldyBwb3NpdGlvblxuICAgICAgZ2VvbG9jYXRpb24ub24oJ2NoYW5nZTpwb3NpdGlvbicsICgpPT4ge1xuICAgICAgICB2YXIgcCA9IGdlb2xvY2F0aW9uLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBbMF0gKyAnIDogJyArIHBbMV0pO1xuICAgICAgICB2aWV3TWFwLnNldENlbnRlcihbcGFyc2VGbG9hdChwWzFdKSwgcGFyc2VGbG9hdChwWzBdKV0pO1xuICAgICAgICBtYXAucmVuZGVyKCk7XG4gICAgICB9KTtcbiAgICBcblxuXG5tYXAgPSBuZXcgTWFwKHtcbiAgICAgIHRhcmdldDogJ2hvdGVsX21hcCcsXG4gICAgICBsYXllcnM6IFtcbiAgICAgICAgbmV3IFRpbGVMYXllcih7XG4gICAgICAgICAgc291cmNlOiBuZXcgT1NNKClcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICB2aWV3OiB2aWV3TWFwXG4gICAgfSk7XG5cblxufSk7XG48L3NjcmlwdD5cblxuXG5cbjxkaXYgY2xhc3M9XCJtYXBcIiBpZD1cImhvdGVsX21hcFwiPjwvZGl2PiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IEZldGNoRGF0YSB9IGZyb20gXCIuLi9GZXRjaERhdGEuanNcIjtcbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcblxuICBsZXQgR2VvTGF0aXR1ZGUgPSAwO1xuICBsZXQgR2VvTG9uZ2l0dWRlID0gMDtcbiAgbGV0IEZEYXRhID0gbmV3IEZldGNoRGF0YSgpO1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxuICAgICgpID0+IHt9LFxuICAgICgpID0+IHt9XG4gICk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gR2V0RXZlbnRzQXJvdW5kKHNlYXJjaCkge1xuICAgIGxldCBxdWVyeSA9IHsgbGF0aXR1ZGU6IEdlb0xhdGl0dWRlLCBsb25naXR1ZGU6IEdlb0xvbmdpdHVkZSB9O1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLmdldChcIi9wZ2FwaS92Mi9ldmVudHMvYXJvdW5kXCIsIHF1ZXJ5LCB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9KTtcblxuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coZGF0YXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzZSBwdWRvIGNhcmdhciBsYSBpbmZvcm1hY2nDs25cIik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gR2VvTG9jYXRpb24oKSB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihhc3luYyAocG9zaXRpb24pID0+IHtcbiAgICAgICAgR2VvTGF0aXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgIEdlb0xvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIHByb21pc2UgPSBHZXRFdmVudHNBcm91bmQoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgR2VvTG9jYXRpb24oKTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAubG9jYSB7XG4gICAgcGFkZGluZzogMC41ZW07XG4gICAgYm9yZGVyOiBzb2xpZDtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiXCI+XG4gIHsjYXdhaXQgcHJvbWlzZX1cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICA8YSBjbGFzcz1cImlzLWxvYWRpbmdcIj5DYXJnYW5kby4uLjwvYT5cbiAgezp0aGVuIGRhdGFzfVxuICAgIHsjZWFjaCBkYXRhcyBhcyB7IGlkZXZlbnQsIGxhYmVsLCBkYXRlZXZlbnQsIG1ldGVycywgZGVzY3JpcHRpb24gfSwgaX1cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2NhXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkIGlzLWdyb3VwZWQgaXMtZ3JvdXBlZC1tdWx0aWxpbmVcIj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYW5nZXJcIj48c3BhbiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1ob21lXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPntuZXcgRGF0ZShkYXRlZXZlbnQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtaW5mb1wiPjxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPntuZXcgRGF0ZShkYXRlZXZlbnQpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtaW5mb1wiPjxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuXG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3MgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYXJrXCI+e01hdGguY2VpbChtZXRlcnMpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtaW5mb1wiPm1ldHJvKHMpPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj5jaGF0PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1wcmltYXJ5XCI+b24gZ2l0dGVyPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXY+PHNwYW4+e2Rlc2NyaXB0aW9ufTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgPC9kaXY+XG4gICAgey9lYWNofVxuICB7OmNhdGNoIGVycm9yfVxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxhIHN0eWxlPVwiY29sb3I6IHJlZFwiIGNsYXNzPVwiaXMtbG9hZGluZ1wiPntlcnJvci5tZXNzYWdlfTwvYT5cbiAgey9hd2FpdH1cbjwvZGl2PlxuIiwiXG48c2NyaXB0PlxuICAgIGltcG9ydCB7U2VuZEV2ZW50fSBmcm9tIFwiLi4vU2VuZEV2ZW50LmpzXCI7ICBcbiAgICBmdW5jdGlvbiBTZW5kKHBhcmFtcykge1xuICAgICAgU2VuZEV2ZW50KCdjc3B3YS1hY2NpZGVudC1hbGFybScpO1xuICAgIH1cbiAgPC9zY3JpcHQ+XG48YnV0dG9uIG9uOmNsaWNrPVwie1NlbmR9XCIgY2xhc3M9XCJidXR0b24gaXMtd2FybmluZyBpcy1vdXRsaW5lZCBpcy1sYXJnZSBpcy1mdWxsd2lkdGhcIj5BQ0NJREVOVEU8L2J1dHRvbj4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCB7U2VuZEV2ZW50fSBmcm9tIFwiLi4vU2VuZEV2ZW50LmpzXCI7ICBcbiAgICBmdW5jdGlvbiBTZW5kKHBhcmFtcykge1xuICAgICAgU2VuZEV2ZW50KCdjc3B3YS1hc3NhdWx0LWFsYXJtJyk7XG4gICAgfVxuICA8L3NjcmlwdD5cblxuPGJ1dHRvbiBvbjpjbGljaz1cIntTZW5kfVwiIGNsYXNzPVwiYnV0dG9uIGlzLWRhbmdlciBpcy1vdXRsaW5lZCBpcy1sYXJnZSBpcy1mdWxsd2lkdGhcIj5BU0FMVE88L2J1dHRvbj4iLCI8c2NyaXB0PlxuICBpbXBvcnQgQWNjaWRlbnQgZnJvbSBcIi4vQWNjaWRlbnQvTWFpbi5zdmVsdGVcIjtcbiAgaW1wb3J0IEFzc2F1bHQgZnJvbSBcIi4vQXNzYXVsdC9NYWluLnN2ZWx0ZVwiO1xuICBpbXBvcnQgU3VzcGVjdCBmcm9tIFwiLi9TdXNwZWN0L01haW4uc3ZlbHRlXCI7XG4gIGltcG9ydCBUaGVmdCBmcm9tIFwiLi9UaGVmdC9NYWluLnN2ZWx0ZVwiO1xuPC9zY3JpcHQ+XG5cbjxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICA8QXNzYXVsdCAvPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgIDxUaGVmdCAvPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgIDxBY2NpZGVudCAvPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgIDxTdXNwZWN0IC8+XG4gIDwvZGl2PlxuPC9kaXY+XG4iLCJpbXBvcnQgeyBGZXRjaERhdGEgfSBmcm9tIFwiLi4vRmV0Y2hEYXRhLmpzXCI7XG5cbmxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFNlbmRFdmVudChjb2RlKSB7XG4gIGlmIChcImdlb2xvY2F0aW9uXCIgaW4gbmF2aWdhdG9yKSB7XG4gICAgY29uc29sZS5sb2coXCJPYnRpZW5lIGxvY2FsaXphY2nDs25cIik7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAocG9zaXRpb24pID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwb3NpdGlvbik7XG4gICAgICAgICBTZW5kKGNvZGUsIHBvc2l0aW9uKTtcbiAgICAgIH0sXG4gICAgICAgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgU2VuZChjb2RlLCBlcnIpO1xuICAgICAgfSxcbiAgICAgIHsgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlIH1cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiR2VvTG9jYWxpemFjacOzbiBubyBzb3BvcnRhZGFcIik7XG4gICAgU2VuZChjb2RlLCB7IGxvY2F0aW9uOiBcInVuc29wb3J0ZWRcIiB9KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBTZW5kKGNvZGUsIGdsb2NhdGlvbikge1xuICBsZXQgZ2VvID0ge1xuICAgIGxhdGl0dWRlOiBnbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZTogZ2xvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGUsXG4gICAgYWNjdXJhY3k6IGdsb2NhdGlvbi5jb29yZHMuYWNjdXJhY3ksXG4gICAgYWx0aXR1ZGU6IGdsb2NhdGlvbi5jb29yZHMuYWx0aXR1ZGUsXG4gICAgYWx0aXR1ZGVBY2N1cmFjeTogZ2xvY2F0aW9uLmNvb3Jkcy5hbHRpdHVkZUFjY3VyYWN5LFxuICAgIGhlYWRpbmc6IGdsb2NhdGlvbi5jb29yZHMuaGVhZGluZyxcbiAgICBzcGVlZDogZ2xvY2F0aW9uLmNvb3Jkcy5zcGVlZFxuICB9O1xuICBsZXQgZGF0YVVzZXIgPSB7IGNvZGU6IGNvZGUsIGRldGFpbHM6IHsgZ2VvOiBnZW99IH07XG4gIGNvbnNvbGUubG9nKGRhdGFVc2VyKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBGRGF0YS5wb3N0KFxuICAgICAgXCIvcGdhcGkvY29tbXVuaXR5LXNhZmV0eS1wd2EvdjEvcmVjZWl2ZXJcIixcbiAgICAgIGRhdGFVc2VyLFxuICAgICAge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgY29uc29sZS53YXJuKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKHJlcyk7XG4gICAgfVxuICAgIFxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgfVxufVxuIiwiPHNjcmlwdD5cbiAgaW1wb3J0IHtTZW5kRXZlbnR9IGZyb20gXCIuLi9TZW5kRXZlbnQuanNcIjsgIFxuICBmdW5jdGlvbiBTZW5kKHBhcmFtcykge1xuICAgIFNlbmRFdmVudCgnY3Nwd2Etc3VzcGVjdC1hbGFybScpO1xuICB9XG48L3NjcmlwdD5cblxuPGJ1dHRvblxuICBjbGFzcz1cImJ1dHRvbiBpcy1saW5rIGlzLW91dGxpbmVkIGlzLWxhcmdlIGlzLWZ1bGx3aWR0aFwiXG4gIG9uOmNsaWNrPXtTZW5kfT5TT1NQRUNIT1NPPC9idXR0b24+XG4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCB7U2VuZEV2ZW50fSBmcm9tIFwiLi4vU2VuZEV2ZW50LmpzXCI7ICBcbiAgICBmdW5jdGlvbiBTZW5kKHBhcmFtcykge1xuICAgICAgU2VuZEV2ZW50KCdjc3B3YS10aGVmdC1hbGFybScpO1xuICAgIH1cbiAgPC9zY3JpcHQ+XG48YnV0dG9uIG9uOmNsaWNrPVwie1NlbmR9XCIgY2xhc3M9XCJidXR0b24gaXMtZGFuZ2VyIGlzLW91dGxpbmVkIGlzLWxhcmdlIGlzLWZ1bGx3aWR0aFwiPkhVUlRPPC9idXR0b24+IiwiLypcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2VjdXJlIEhhc2ggQWxnb3JpdGhtLCBTSEEtMSwgYXMgZGVmaW5lZFxuICogaW4gRklQUyBQVUIgMTgwLTFcbiAqIFZlcnNpb24gMi4xYSBDb3B5cmlnaHQgUGF1bCBKb2huc3RvbiAyMDAwIC0gMjAwMi5cbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIGRldGFpbHMuXG4gKi9cblxuLypcbiAqIENvbmZpZ3VyYWJsZSB2YXJpYWJsZXMuIFlvdSBtYXkgbmVlZCB0byB0d2VhayB0aGVzZSB0byBiZSBjb21wYXRpYmxlIHdpdGhcbiAqIHRoZSBzZXJ2ZXItc2lkZSwgYnV0IHRoZSBkZWZhdWx0cyB3b3JrIGluIG1vc3QgY2FzZXMuXG4gKi9cbnZhciBoZXhjYXNlID0gMDsgIC8qIGhleCBvdXRwdXQgZm9ybWF0LiAwIC0gbG93ZXJjYXNlOyAxIC0gdXBwZXJjYXNlICAgICAgICAqL1xudmFyIGI2NHBhZCAgPSBcIlwiOyAvKiBiYXNlLTY0IHBhZCBjaGFyYWN0ZXIuIFwiPVwiIGZvciBzdHJpY3QgUkZDIGNvbXBsaWFuY2UgICAqL1xudmFyIGNocnN6ICAgPSA4OyAgLyogYml0cyBwZXIgaW5wdXQgY2hhcmFjdGVyLiA4IC0gQVNDSUk7IDE2IC0gVW5pY29kZSAgICAgICovXG5cbi8qXG4gKiBUaGVzZSBhcmUgdGhlIGZ1bmN0aW9ucyB5b3UnbGwgdXN1YWxseSB3YW50IHRvIGNhbGxcbiAqIFRoZXkgdGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIGhleCBvciBiYXNlLTY0IGVuY29kZWQgc3RyaW5nc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaGV4X3NoYTEocyl7cmV0dXJuIGJpbmIyaGV4KGNvcmVfc2hhMShzdHIyYmluYihzKSxzLmxlbmd0aCAqIGNocnN6KSk7fVxuZXhwb3J0IGZ1bmN0aW9uIGI2NF9zaGExKHMpe3JldHVybiBiaW5iMmI2NChjb3JlX3NoYTEoc3RyMmJpbmIocykscy5sZW5ndGggKiBjaHJzeikpO31cbmV4cG9ydCBmdW5jdGlvbiBzdHJfc2hhMShzKXtyZXR1cm4gYmluYjJzdHIoY29yZV9zaGExKHN0cjJiaW5iKHMpLHMubGVuZ3RoICogY2hyc3opKTt9XG5mdW5jdGlvbiBoZXhfaG1hY19zaGExKGtleSwgZGF0YSl7IHJldHVybiBiaW5iMmhleChjb3JlX2htYWNfc2hhMShrZXksIGRhdGEpKTt9XG5mdW5jdGlvbiBiNjRfaG1hY19zaGExKGtleSwgZGF0YSl7IHJldHVybiBiaW5iMmI2NChjb3JlX2htYWNfc2hhMShrZXksIGRhdGEpKTt9XG5mdW5jdGlvbiBzdHJfaG1hY19zaGExKGtleSwgZGF0YSl7IHJldHVybiBiaW5iMnN0cihjb3JlX2htYWNfc2hhMShrZXksIGRhdGEpKTt9XG5cbi8qXG4gKiBQZXJmb3JtIGEgc2ltcGxlIHNlbGYtdGVzdCB0byBzZWUgaWYgdGhlIFZNIGlzIHdvcmtpbmdcbiAqL1xuZnVuY3Rpb24gc2hhMV92bV90ZXN0KClcbntcbiAgcmV0dXJuIGhleF9zaGExKFwiYWJjXCIpID09IFwiYTk5OTNlMzY0NzA2ODE2YWJhM2UyNTcxNzg1MGMyNmM5Y2QwZDg5ZFwiO1xufVxuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBTSEEtMSBvZiBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvcmVfc2hhMSh4LCBsZW4pXG57XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbGVuICUgMzIpO1xuICB4WygobGVuICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsZW47XG5cbiAgdmFyIHcgPSBBcnJheSg4MCk7XG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xuICB2YXIgZSA9IC0xMDA5NTg5Nzc2O1xuXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcbiAge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcbiAgICB2YXIgb2xkZSA9IGU7XG5cbiAgICBmb3IodmFyIGogPSAwOyBqIDwgODA7IGorKylcbiAgICB7XG4gICAgICBpZihqIDwgMTYpIHdbal0gPSB4W2kgKyBqXTtcbiAgICAgIGVsc2Ugd1tqXSA9IHJvbCh3W2otM10gXiB3W2otOF0gXiB3W2otMTRdIF4gd1tqLTE2XSwgMSk7XG4gICAgICB2YXIgdCA9IHNhZmVfYWRkKHNhZmVfYWRkKHJvbChhLCA1KSwgc2hhMV9mdChqLCBiLCBjLCBkKSksXG4gICAgICAgICAgICAgICAgICAgICAgIHNhZmVfYWRkKHNhZmVfYWRkKGUsIHdbal0pLCBzaGExX2t0KGopKSk7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IHJvbChiLCAzMCk7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSB0O1xuICAgIH1cblxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICBlID0gc2FmZV9hZGQoZSwgb2xkZSk7XG4gIH1cbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQsIGUpO1xuXG59XG5cbi8qXG4gKiBQZXJmb3JtIHRoZSBhcHByb3ByaWF0ZSB0cmlwbGV0IGNvbWJpbmF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgY3VycmVudFxuICogaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfZnQodCwgYiwgYywgZClcbntcbiAgaWYodCA8IDIwKSByZXR1cm4gKGIgJiBjKSB8ICgofmIpICYgZCk7XG4gIGlmKHQgPCA0MCkgcmV0dXJuIGIgXiBjIF4gZDtcbiAgaWYodCA8IDYwKSByZXR1cm4gKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpO1xuICByZXR1cm4gYiBeIGMgXiBkO1xufVxuXG4vKlxuICogRGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBhZGRpdGl2ZSBjb25zdGFudCBmb3IgdGhlIGN1cnJlbnQgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfa3QodClcbntcbiAgcmV0dXJuICh0IDwgMjApID8gIDE1MTg1MDAyNDkgOiAodCA8IDQwKSA/ICAxODU5Nzc1MzkzIDpcbiAgICAgICAgICh0IDwgNjApID8gLTE4OTQwMDc1ODggOiAtODk5NDk3NTE0O1xufVxuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBITUFDLVNIQTEgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YVxuICovXG5mdW5jdGlvbiBjb3JlX2htYWNfc2hhMShrZXksIGRhdGEpXG57XG4gIHZhciBia2V5ID0gc3RyMmJpbmIoa2V5KTtcbiAgaWYoYmtleS5sZW5ndGggPiAxNikgYmtleSA9IGNvcmVfc2hhMShia2V5LCBrZXkubGVuZ3RoICogY2hyc3opO1xuXG4gIHZhciBpcGFkID0gQXJyYXkoMTYpLCBvcGFkID0gQXJyYXkoMTYpO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgMTY7IGkrKylcbiAge1xuICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjtcbiAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUM7XG4gIH1cblxuICB2YXIgaGFzaCA9IGNvcmVfc2hhMShpcGFkLmNvbmNhdChzdHIyYmluYihkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogY2hyc3opO1xuICByZXR1cm4gY29yZV9zaGExKG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxNjApO1xufVxuXG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcbntcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn1cblxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuZnVuY3Rpb24gcm9sKG51bSwgY250KVxue1xuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIDgtYml0IG9yIDE2LWJpdCBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3Jkc1xuICogSW4gOC1iaXQgZnVuY3Rpb24sIGNoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAqL1xuZnVuY3Rpb24gc3RyMmJpbmIoc3RyKVxue1xuICB2YXIgYmluID0gQXJyYXkoKTtcbiAgdmFyIG1hc2sgPSAoMSA8PCBjaHJzeikgLSAxO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aCAqIGNocnN6OyBpICs9IGNocnN6KVxuICAgIGJpbltpPj41XSB8PSAoc3RyLmNoYXJDb2RlQXQoaSAvIGNocnN6KSAmIG1hc2spIDw8ICgzMiAtIGNocnN6IC0gaSUzMik7XG4gIHJldHVybiBiaW47XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gYmluYjJzdHIoYmluKVxue1xuICB2YXIgc3RyID0gXCJcIjtcbiAgdmFyIG1hc2sgPSAoMSA8PCBjaHJzeikgLSAxO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYmluLmxlbmd0aCAqIDMyOyBpICs9IGNocnN6KVxuICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChiaW5baT4+NV0gPj4+ICgzMiAtIGNocnN6IC0gaSUzMikpICYgbWFzayk7XG4gIHJldHVybiBzdHI7XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMgdG8gYSBoZXggc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiaW5iMmhleChiaW5hcnJheSlcbntcbiAgdmFyIGhleF90YWIgPSBoZXhjYXNlID8gXCIwMTIzNDU2Nzg5QUJDREVGXCIgOiBcIjAxMjM0NTY3ODlhYmNkZWZcIjtcbiAgdmFyIHN0ciA9IFwiXCI7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnJheS5sZW5ndGggKiA0OyBpKyspXG4gIHtcbiAgICBzdHIgKz0gaGV4X3RhYi5jaGFyQXQoKGJpbmFycmF5W2k+PjJdID4+ICgoMyAtIGklNCkqOCs0KSkgJiAweEYpICtcbiAgICAgICAgICAgaGV4X3RhYi5jaGFyQXQoKGJpbmFycmF5W2k+PjJdID4+ICgoMyAtIGklNCkqOCAgKSkgJiAweEYpO1xuICB9XG4gIHJldHVybiBzdHI7XG59XG5cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMgdG8gYSBiYXNlLTY0IHN0cmluZ1xuICovXG5mdW5jdGlvbiBiaW5iMmI2NChiaW5hcnJheSlcbntcbiAgdmFyIHRhYiA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuICB2YXIgc3RyID0gXCJcIjtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFycmF5Lmxlbmd0aCAqIDQ7IGkgKz0gMylcbiAge1xuICAgIHZhciB0cmlwbGV0ID0gKCgoYmluYXJyYXlbaSAgID4+IDJdID4+IDggKiAoMyAtICBpICAgJTQpKSAmIDB4RkYpIDw8IDE2KVxuICAgICAgICAgICAgICAgIHwgKCgoYmluYXJyYXlbaSsxID4+IDJdID4+IDggKiAoMyAtIChpKzEpJTQpKSAmIDB4RkYpIDw8IDggKVxuICAgICAgICAgICAgICAgIHwgICgoYmluYXJyYXlbaSsyID4+IDJdID4+IDggKiAoMyAtIChpKzIpJTQpKSAmIDB4RkYpO1xuICAgIGZvcih2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAge1xuICAgICAgaWYoaSAqIDggKyBqICogNiA+IGJpbmFycmF5Lmxlbmd0aCAqIDMyKSBzdHIgKz0gYjY0cGFkO1xuICAgICAgZWxzZSBzdHIgKz0gdGFiLmNoYXJBdCgodHJpcGxldCA+PiA2KigzLWopKSAmIDB4M0YpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufSIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tIFwic3ZlbHRlXCI7XG4gIGltcG9ydCBSZXBvcnQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvUmVwb3J0L01haW4uc3ZlbHRlXCI7XG4gIGltcG9ydCBXYXRjaGVkIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1dhdGNoZWQvTWFpbi5zdmVsdGVcIjtcbiAgaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvTm90aWZpY2F0aW9ucy9NYWluLnN2ZWx0ZVwiO1xuICBpbXBvcnQgTWFwQWNjb3VudCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9NYXAvTWFwLnN2ZWx0ZVwiO1xuICBpbXBvcnQgeyBGZXRjaERhdGEgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9GZXRjaERhdGEuanNcIjtcblxuICAvLyAgbGV0IEZEYXRhID0gbmV3IEZldGNoRGF0YSgpO1xuICBsZXQgY29tcG9uZW50U2VsZWN0ZWQgPSBSZXBvcnQ7XG5cbiAgLy9leHBvcnQgbGV0IHNlZ21lbnQ7XG5cbiAgb25Nb3VudChhc3luYyAoKSA9PiB7fSk7XG48L3NjcmlwdD5cblxuPG5hdiBjbGFzcz1cIm5hdmJhclwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgYXJpYS1sYWJlbD1cIm1haW4gbmF2aWdhdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+XG4gICAgPGEgY2xhc3M9XCJuYXZiYXItaXRlbVwiIGhyZWY9XCIvaG9tZVwiPlxuICAgICAgPGltZyBzcmM9XCJsb2dvLnBuZ1wiIHdpZHRoPVwiMjVcIiBoZWlnaHQ9XCIyNVwiIGFsdD1cIlNlZ3VyaWRhZCBDb211bml0YXJpYVwiIC8+XG4gICAgICA8c3Ryb25nPiBTRUdVUklEQUQgQ0lVREFEQU5BPC9zdHJvbmc+XG4gICAgPC9hPlxuXG4gICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktbWlzc2luZy1hdHRyaWJ1dGUgLS0+XG4gICAgPGFcbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJuYXZiYXItYnVyZ2VyIGJ1cmdlclwiXG4gICAgICBhcmlhLWxhYmVsPVwibWVudVwiXG4gICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgZGF0YS10YXJnZXQ9XCJuYXZiYXJCYXNpY0V4YW1wbGVcIj5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICA8L2E+XG4gIDwvZGl2PlxuXG4gIDxkaXYgaWQ9XCJuYXZiYXJCYXNpY0V4YW1wbGVcIiBjbGFzcz1cIm5hdmJhci1tZW51XCI+XG4gICAgPGRpdiBjbGFzcz1cIm5hdmJhci1zdGFydFwiPlxuICAgICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktbWlzc2luZy1hdHRyaWJ1dGUgLS0+XG4gICAgICA8YSBjbGFzcz1cIm5hdmJhci1pdGVtXCI+IE1pIGN1ZW50YSA8L2E+XG5cbiAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgICAgPGEgY2xhc3M9XCJuYXZiYXItaXRlbVwiPiBSZXBvcnRlcyA8L2E+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWVuZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zXCI+XG4gICAgICAgICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktbWlzc2luZy1hdHRyaWJ1dGUgLS0+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gaXMtbGlnaHRcIj4gTG9nb3V0IDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25hdj5cblxuPGRpdiBjbGFzcz1cInRhYnMgaXMtYm94ZWRcIj5cbiAgPHVsPlxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxsaVxuICAgICAgY2xhc3M6aXMtYWN0aXZlPXtjb21wb25lbnRTZWxlY3RlZCA9PT0gUmVwb3J0fVxuICAgICAgb246Y2xpY2s9eygpPT57Y29tcG9uZW50U2VsZWN0ZWQgPSBSZXBvcnR9fT5cbiAgICAgIDxhPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aVxuICAgICAgICAgICAgY2xhc3M9XCJmYXMgZmEtaW1hZ2VcIlxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz48L3NwYW4+XG4gICAgICAgIDxzcGFuPlJlcG9ydGFyPC9zcGFuPlxuICAgICAgPC9hPlxuICAgIDwvbGk+XG4gICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktbWlzc2luZy1hdHRyaWJ1dGUgLS0+XG4gICAgPGxpXG4gICAgICBjbGFzczppcy1hY3RpdmU9e2NvbXBvbmVudFNlbGVjdGVkID09PSBOb3RpZmljYXRpb25zfVxuICAgICAgb246Y2xpY2s9eygpPT57Y29tcG9uZW50U2VsZWN0ZWQgPSBOb3RpZmljYXRpb25zfX0+XG4gICAgICA8YT5Ob3RpZmljYWNpb25lczwvYT5cbiAgICA8L2xpPlxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxsaVxuICAgICAgY2xhc3M6aXMtYWN0aXZlPXtjb21wb25lbnRTZWxlY3RlZCA9PT0gV2F0Y2hlZH1cbiAgICAgIG9uOmNsaWNrPXsoKT0+e2NvbXBvbmVudFNlbGVjdGVkID0gV2F0Y2hlZH19PlxuICAgICAgPGE+U2VndWltaWVudG88L2E+XG4gICAgPC9saT5cbiAgICA8bGlcbiAgICAgIGNsYXNzOmlzLWFjdGl2ZT17Y29tcG9uZW50U2VsZWN0ZWQgPT09IE1hcEFjY291bnR9XG4gICAgICBvbjpjbGljaz17KCk9Pntjb21wb25lbnRTZWxlY3RlZCA9IE1hcEFjY291bnR9fT5cbiAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgICAgPGE+TWFwYTwvYT5cbiAgICA8L2xpPlxuXG4gIDwvdWw+XG48L2Rpdj5cbjxzdmVsdGU6Y29tcG9uZW50IHRoaXM9e2NvbXBvbmVudFNlbGVjdGVkfSAvPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==