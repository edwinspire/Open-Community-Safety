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
	style.textContent = ".loca.svelte-1ll8o90{padding:0.5em;border:solid;border-width:1px;border-color:black}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5zdmVsdGUiLCJzb3VyY2VzIjpbIk1haW4uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCB7IEZldGNoRGF0YSB9IGZyb20gXCIuLi9GZXRjaERhdGEuanNcIjtcbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcblxuICBsZXQgR2VvTGF0aXR1ZGUgPSAwO1xuICBsZXQgR2VvTG9uZ2l0dWRlID0gMDtcbiAgbGV0IEZEYXRhID0gbmV3IEZldGNoRGF0YSgpO1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxuICAgICgpID0+IHt9LFxuICAgICgpID0+IHt9XG4gICk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gR2V0RXZlbnRzQXJvdW5kKHNlYXJjaCkge1xuICAgIGxldCBxdWVyeSA9IHsgbGF0aXR1ZGU6IEdlb0xhdGl0dWRlLCBsb25naXR1ZGU6IEdlb0xvbmdpdHVkZSB9O1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLmdldChcIi9wZ2FwaS92Mi9ldmVudHMvYXJvdW5kXCIsIHF1ZXJ5LCB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9KTtcblxuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coZGF0YXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzZSBwdWRvIGNhcmdhciBsYSBpbmZvcm1hY2nDs25cIik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gR2VvTG9jYXRpb24oKSB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihhc3luYyAocG9zaXRpb24pID0+IHtcbiAgICAgICAgR2VvTGF0aXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgIEdlb0xvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIHByb21pc2UgPSBHZXRFdmVudHNBcm91bmQoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgR2VvTG9jYXRpb24oKTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAubG9jYSB7XG4gICAgcGFkZGluZzogMC41ZW07XG4gICAgYm9yZGVyOiBzb2xpZDtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiXCI+XG4gIHsjYXdhaXQgcHJvbWlzZX1cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICA8YSBjbGFzcz1cImlzLWxvYWRpbmdcIj5DYXJnYW5kby4uLjwvYT5cbiAgezp0aGVuIGRhdGFzfVxuICAgIHsjZWFjaCBkYXRhcyBhcyB7IGlkZXZlbnQsIGxhYmVsLCBkYXRlZXZlbnQsIG1ldGVycywgZGVzY3JpcHRpb24gfSwgaX1cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2NhXCI+XG5cbiAgICAgICAgPGRpdj48c3Bhbj57ZGF0ZWV2ZW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkIGlzLWdyb3VwZWQgaXMtZ3JvdXBlZC1tdWx0aWxpbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3MgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYXJrXCI+e2RhdGVldmVudC50b0xvY2FsZURhdGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhbmdlclwiPjxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPntuZXcgRGF0ZShkYXRlZXZlbnQpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFuZ2VyXCI+PHNwYW4gY2xhc3M9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jbG9jay1vXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICA8L3NwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3MgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYXJrXCI+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFuZ2VyXCI+PHNwYW4gY2xhc3M9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtaG9tZVwiIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj57TWF0aC5jZWlsKG1ldGVycyl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1zdWNjZXNzXCI+bWV0cm8ocyk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPmNoYXQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLXByaW1hcnlcIj5vbiBnaXR0ZXI8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdj48c3Bhbj57ZGVzY3JpcHRpb259PC9zcGFuPjwvZGl2PlxuICAgICAgICBcbiAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICB7L2VhY2h9XG4gIHs6Y2F0Y2ggZXJyb3J9XG4gICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktbWlzc2luZy1hdHRyaWJ1dGUgLS0+XG4gICAgPGEgc3R5bGU9XCJjb2xvcjogcmVkXCIgY2xhc3M9XCJpcy1sb2FkaW5nXCI+e2Vycm9yLm1lc3NhZ2V9PC9hPlxuICB7L2F3YWl0fVxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNENFLEtBQUssZUFBQyxDQUFDLEFBQ0wsT0FBTyxDQUFFLEtBQUssQ0FDZCxNQUFNLENBQUUsS0FBSyxDQUNiLFlBQVksQ0FBRSxHQUFHLENBQ2pCLFlBQVksQ0FBRSxLQUFLLEFBQ3JCLENBQUMifQ== */";
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

// (110:2) {:catch error}
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
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 111, 4, 3151);
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
		source: "(110:2) {:catch error}",
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
	let div13;
	let div0;
	let span0;
	let t0_value = /*dateevent*/ ctx[9] + "";
	let t0;
	let t1;
	let div11;
	let div2;
	let div1;
	let span1;
	let t2_value = /*dateevent*/ ctx[9].toLocaleDateString() + "";
	let t2;
	let t3;
	let span3;
	let span2;
	let i0;
	let t4;
	let div4;
	let div3;
	let span4;
	let t5_value = new Date(/*dateevent*/ ctx[9]).toLocaleTimeString() + "";
	let t5;
	let t6;
	let span6;
	let span5;
	let i1;
	let t7;
	let div6;
	let div5;
	let span7;
	let t8_value = /*label*/ ctx[8] + "";
	let t8;
	let t9;
	let span9;
	let span8;
	let i2;
	let t10;
	let div8;
	let div7;
	let span10;
	let t11_value = Math.ceil(/*meters*/ ctx[10]) + "";
	let t11;
	let t12;
	let span11;
	let t13;
	let t14;
	let div10;
	let div9;
	let span12;
	let t15;
	let t16;
	let span13;
	let t17;
	let t18;
	let div12;
	let span14;
	let t19_value = /*description*/ ctx[11] + "";
	let t19;
	let t20;

	const block = {
		c: function create() {
			div13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t5_value);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t8_value);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			span8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			i2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("i");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t11_value);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("metro(s)");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("chat");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("on gitter");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t19_value);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			div13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div13_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div13);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div13_nodes, "DIV", {});
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			span0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "SPAN", {});
			var span0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span0);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span0_nodes, t0_value);
			span0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div13_nodes);
			div11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div13_nodes, "DIV", { class: true });
			var div11_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div11);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div11_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			span1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "SPAN", { class: true });
			var span1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span1);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span1_nodes, t2_value);
			span1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			span3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "SPAN", { class: true });
			var span3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span3);
			span2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span3_nodes, "SPAN", { class: true });
			var span2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span2);
			i0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span2_nodes, "I", { class: true, "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div11_nodes);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div11_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			span4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "SPAN", { class: true });
			var span4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span4);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span4_nodes, t5_value);
			span4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			span6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "SPAN", { class: true });
			var span6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span6);
			span5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span6_nodes, "SPAN", { class: true });
			var span5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span5);
			i1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span5_nodes, "I", { class: true, "aria-hidden": true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div11_nodes);
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div11_nodes, "DIV", { class: true });
			var div6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div6);
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			span7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "SPAN", { class: true });
			var span7_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span7);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span7_nodes, t8_value);
			span7_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			span9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "SPAN", { class: true });
			var span9_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span9);
			span8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span9_nodes, "SPAN", { class: true });
			var span8_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span8);
			i2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(span8_nodes, "I", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(i2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span8_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			span9_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div11_nodes);
			div8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div11_nodes, "DIV", { class: true });
			var div8_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div8);
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div8_nodes, "DIV", { class: true });
			var div7_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div7);
			span10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div7_nodes, "SPAN", { class: true });
			var span10_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span10);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span10_nodes, t11_value);
			span10_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div7_nodes);
			span11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div7_nodes, "SPAN", { class: true });
			var span11_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span11);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span11_nodes, "metro(s)");
			span11_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div7_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div8_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div11_nodes);
			div10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div11_nodes, "DIV", { class: true });
			var div10_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div10);
			div9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div10_nodes, "DIV", { class: true });
			var div9_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div9);
			span12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div9_nodes, "SPAN", { class: true });
			var span12_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span12);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span12_nodes, "chat");
			span12_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div9_nodes);
			span13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div9_nodes, "SPAN", { class: true });
			var span13_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span13);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span13_nodes, "on gitter");
			span13_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div9_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div10_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div11_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div13_nodes);
			div12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div13_nodes, "DIV", {});
			var div12_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div12);
			span14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div12_nodes, "SPAN", {});
			var span14_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span14);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span14_nodes, t19_value);
			span14_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div12_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div13_nodes);
			div13_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span0, file, 60, 13, 1405);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 60, 8, 1400);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span1, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span1, file, 64, 14, 1584);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i0, "class", "fa fa-calendar");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i0, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i0, file, 66, 16, 1728);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span2, "class", "icon");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span2, file, 65, 42, 1692);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span3, "class", "tag is-danger");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span3, file, 65, 14, 1664);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 63, 12, 1540);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 62, 10, 1506);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span4, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span4, file, 73, 14, 1940);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i1, "class", "fa fa-clock-o");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i1, "aria-hidden", "true");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i1, file, 75, 16, 2094);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span5, "class", "icon");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span5, file, 74, 42, 2058);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span6, "class", "tag is-danger");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span6, file, 74, 14, 2030);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 72, 12, 1896);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 71, 10, 1862);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span7, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span7, file, 82, 14, 2297);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(i2, "class", "fas fa-home");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(i2, file, 84, 16, 2416);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span8, "class", "icon");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span8, file, 83, 42, 2380);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span9, "class", "tag is-danger");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span9, file, 83, 14, 2352);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 81, 12, 2253);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 80, 10, 2219);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span10, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span10, file, 91, 14, 2596);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span11, "class", "tag is-success");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span11, file, 92, 14, 2663);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div7, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div7, file, 90, 12, 2552);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div8, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div8, file, 89, 10, 2518);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span12, "class", "tag is-dark");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span12, file, 98, 14, 2841);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span13, "class", "tag is-primary");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span13, file, 99, 14, 2893);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div9, "class", "tags has-addons");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div9, file, 97, 12, 2797);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div10, "class", "control");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div10, file, 96, 10, 2763);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div11, "class", "field is-grouped is-grouped-multiline");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div11, file, 61, 8, 1444);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span14, file, 104, 13, 3004);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div12, file, 104, 8, 2999);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div13, "class", "loca svelte-1ll8o90");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div13, file, 58, 6, 1372);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div13, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div13, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, span0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div13, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div13, div11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, span1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span1, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, span3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span3, span2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span2, i0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, span4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span4, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, span6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span6, span5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span5, i1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, div6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, span7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span7, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, span9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span9, span8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span8, i2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, div8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div8, div7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div7, span10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span10, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div7, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div7, span11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span11, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div11, div10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div10, div9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div9, span12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span12, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div9, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div9, span13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span13, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div13, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div13, div12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div12, span14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(span14, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div13, t20);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*promise*/ 1 && t0_value !== (t0_value = /*dateevent*/ ctx[9] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);
			if (dirty & /*promise*/ 1 && t2_value !== (t2_value = /*dateevent*/ ctx[9].toLocaleDateString() + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, t2_value);
			if (dirty & /*promise*/ 1 && t5_value !== (t5_value = new Date(/*dateevent*/ ctx[9]).toLocaleTimeString() + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t5, t5_value);
			if (dirty & /*promise*/ 1 && t8_value !== (t8_value = /*label*/ ctx[8] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t8, t8_value);
			if (dirty & /*promise*/ 1 && t11_value !== (t11_value = Math.ceil(/*meters*/ ctx[10]) + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t11, t11_value);
			if (dirty & /*promise*/ 1 && t19_value !== (t19_value = /*description*/ ctx[11] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t19, t19_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div13);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFwL01hcC5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTm90aWZpY2F0aW9ucy9NYWluLnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZXBvcnQvQWNjaWRlbnQvTWFpbi5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L0Fzc2F1bHQvTWFpbi5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L01haW4uc3ZlbHRlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1JlcG9ydC9TZW5kRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L1N1c3BlY3QvTWFpbi5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVwb3J0L1RoZWZ0L01haW4uc3ZlbHRlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NoYTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9ob21lL2luZGV4LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQzs7O0FBR3hDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnSEE5QmxCLEdBQWlCLFFBQUssc0VBQU07OztnSEFXNUIsR0FBaUIsUUFBSyw2RUFBYTs7O2dIQU1uQyxHQUFpQixRQUFLLHVFQUFPOzs7Z0hBSzdCLEdBQWlCLFFBQUssa0VBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUhBdEJoQyxHQUFpQixRQUFLLHNFQUFNOzs7O2lIQVc1QixHQUFpQixRQUFLLDZFQUFhOzs7O2lIQU1uQyxHQUFpQixRQUFLLHVFQUFPOzs7O2lIQUs3QixHQUFpQixRQUFLLGtFQUFVOzs7OERBUS9CLEdBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FqRm5DLGlCQUFpQixHQUFHLHNFQUFNOzs7Q0FJOUIsc0RBQU87Ozs7Ozs7Ozs7Ozs7O2tCQWdEWSxpQkFBaUIsR0FBRyxzRUFBTTs7OztrQkFXMUIsaUJBQWlCLEdBQUcsNkVBQWE7Ozs7a0JBTWpDLGlCQUFpQixHQUFHLHVFQUFPOzs7O2tCQUszQixpQkFBaUIsR0FBRyxrRUFBVSIsImZpbGUiOiI2NzI4MTMzMjc0ZGEwNzcyZWM0YS9ob21lLmhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9TdG9yZXMuanNcIjtcbmltcG9ydCB7IGhleF9zaGExLCBzdHJfc2hhMSB9IGZyb20gXCIuL3NoYTEuanNcIjtcblxuXG5leHBvcnQgY2xhc3MgRmV0Y2hEYXRhIHtcbiAgYXN5bmMgcHV0KHVybCwgZGF0YSwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgIH1cbiAgICAgIC8vY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIC8vY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChldmVudC5yZXF1ZXN0KTtcbiAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBvc3QodXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgdHJ5IHtcbiAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIH0pO1xuICAgICAgLy9jYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy9jb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG4gIGFzeW5jIGdldCh1cmwsIHF1ZXJ5LCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VhcmNoVVJMID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgICBsZXQgdXJscSA9IHVybCArIFwiP1wiICsgc2VhcmNoVVJMLnRvU3RyaW5nKCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybHEsIHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIFxuICB9XG5cbiAgYXN5bmMgbG9naW4odXJsLCB1c2VyLCBwYXNzd29yZCwgY291bnRyeSkge1xuICAgIGxldCBMU3RvcmFnZSA9IG5ldyBBUFBMb2NhbFN0b3JhZ2UoKTtcbiAgICBsZXQgcHdkb2ZmID0gYXdhaXQgdGhpcy5kaWdlc3RNZXNzYWdlKHVzZXIgKyBwYXNzd29yZCk7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBmID0gYXdhaXQgdGhpcy5wb3N0KFxuICAgICAgICB1cmwsXG4gICAgICAgIHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcixcbiAgICAgICAgICBwd2Q6IHBhc3N3b3JkLFxuICAgICAgICAgIGNvdW50cnk6IGNvdW50cnlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coZik7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGYuanNvbigpO1xuXG4gICAgICBkYXRhLm9mZmxpbmUgPSBwd2RvZmY7XG4gICAgICBMU3RvcmFnZS5zZXRVc2VyKGRhdGEpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUudHJhY2UoZXJyb3IpO1xuICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgIGRhdGEubG9naW4gPSBmYWxzZTtcbiAgICAgIGxldCB1c2VyID0gTFN0b3JhZ2UuZ2V0VXNlcihkYXRhKTtcblxuICAgICAgY29uc29sZS5sb2codXNlcik7XG5cbiAgICAgIGlmICh1c2VyLm9mZmxpbmUgPT0gcHdkb2ZmKSB7XG4gICAgICAgIGRhdGEgPSB1c2VyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaWdlc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhoZXhfc2hhMSgnaG9sYScpLCBzdHJfc2hhMSgnaG9sYScpKTtcbiAgICAgICAgY29uc3QgbXNnVWludDggPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobWVzc2FnZSk7IC8vIGVuY29kZSBhcyAodXRmLTgpIFVpbnQ4QXJyYXlcbiAgICAgICAgY29uc29sZS5sb2coY3J5cHRvKTtcbiAgICAgICAgY29uc3QgaGFzaEJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTI1NlwiLCBtc2dVaW50OCk7IC8vIGhhc2ggdGhlIG1lc3NhZ2VcbiAgICAgICAgY29uc3QgaGFzaEFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoQnVmZmVyKSk7IC8vIGNvbnZlcnQgYnVmZmVyIHRvIGJ5dGUgYXJyYXlcbiAgICAgICAgY29uc3QgaGFzaEhleCA9IGhhc2hBcnJheVxuICAgICAgICAgICAgLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAgICAgLmpvaW4oXCJcIik7IC8vIGNvbnZlcnQgYnl0ZXMgdG8gaGV4IHN0cmluZ1xuICAgICAgICAgICAgKi9cbiAgICByZXR1cm4gaGV4X3NoYTEobWVzc2FnZSk7XG4gIH1cbn1cbiIsIjxzdHlsZT5cbiAgICAubWFwe1xuICAgICAgICBoZWlnaHQ6IDgwMHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG48L3N0eWxlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgR2VvbG9jYXRpb24gZnJvbSAnb2wvR2VvbG9jYXRpb24nO1xuaW1wb3J0IFZlY3RvckxheWVyIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUnO1xuaW1wb3J0IEljb24gZnJvbSAnb2wvc3R5bGUvSWNvbic7XG5pbXBvcnQgT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IFRpbGVMYXllciBmcm9tICdvbC9sYXllci9UaWxlJztcblxuaW1wb3J0IHtvbk1vdW50fSBmcm9tICdzdmVsdGUnO1xuXG5sZXQgdmlld01hcDtcbmxldCBtYXA7XG5sZXQgZ2VveCA9IDA7XG5sZXQgZ2VveSA9IDA7XG5cblxub25Nb3VudCgoKT0+e1xuXG4gICAgdmlld01hcCA9IG5ldyBWaWV3KHtcbiAgICAgICAgY2VudGVyOiBvbFByb2ouZnJvbUxvbkxhdChbLTAuMjI5MDk1MSwgLTc4LjQxODMzNTM5OTk5OTk5XSksXG4gICAgICAgIHpvb206IDVcbiAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBHZW9sb2NhdGlvbiBvYmplY3Qgc2V0dXAgdG8gdHJhY2sgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXZpY2VcbiAgICAgICAgICAgIHZhciBnZW9sb2NhdGlvbiA9IG5ldyBHZW9sb2NhdGlvbih7XG4gICAgICAgIHRyYWNraW5nOiB0cnVlXG4gICAgICB9KTtcbmNvbnNvbGUubG9nKGdlb2xvY2F0aW9uKTtcbiAgICAgIC8vIGJpbmQgdGhlIHByb2plY3Rpb24gdG8gdGhlIHZpZXcgc28gdGhhdCBwb3NpdGlvbnMgYXJlIHJlcG9ydGVkIGluIHRoZVxuICAgICAgLy8gcHJvamVjdGlvbiBvZiB0aGUgdmlld1xuICAgICAgLy9nZW9sb2NhdGlvbi5iaW5kVG8oJ3Byb2plY3Rpb24nLCB2aWV3TWFwKTtcblxuICAgICAgLy8gYmluZCB0aGUgbWFya2VyJ3MgcG9zaXRpb24gdG8gdGhlIGdlb2xvY2F0aW9uIG9iamVjdCwgdGhlIG1hcmtlciB3aWxsXG4gICAgICAvLyBtb3ZlIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgR2VvTG9jYXRpb24gQVBJIHByb3ZpZGVzIHBvc2l0aW9uIHVwZGF0ZXNcbiAgICAgIC8vbWFya2VyLmJpbmRUbygncG9zaXRpb24nLCBnZW9sb2NhdGlvbik7XG5cbiAgICAgIC8vIHdoZW4gdGhlIEdlb0xvY2F0aW9uIEFQSSBwcm92aWRlcyBhIHBvc2l0aW9uIHVwZGF0ZSwgY2VudGVyIHRoZSB2aWV3XG4gICAgICAvLyBvbiB0aGUgbmV3IHBvc2l0aW9uXG4gICAgICBnZW9sb2NhdGlvbi5vbignY2hhbmdlOnBvc2l0aW9uJywgKCk9PiB7XG4gICAgICAgIHZhciBwID0gZ2VvbG9jYXRpb24uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cocFswXSArICcgOiAnICsgcFsxXSk7XG4gICAgICAgIHZpZXdNYXAuc2V0Q2VudGVyKFtwYXJzZUZsb2F0KHBbMV0pLCBwYXJzZUZsb2F0KHBbMF0pXSk7XG4gICAgICAgIG1hcC5yZW5kZXIoKTtcbiAgICAgIH0pO1xuICAgIFxuXG5cbm1hcCA9IG5ldyBNYXAoe1xuICAgICAgdGFyZ2V0OiAnaG90ZWxfbWFwJyxcbiAgICAgIGxheWVyczogW1xuICAgICAgICBuZXcgVGlsZUxheWVyKHtcbiAgICAgICAgICBzb3VyY2U6IG5ldyBPU00oKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIHZpZXc6IHZpZXdNYXBcbiAgICB9KTtcblxuXG59KTtcbjwvc2NyaXB0PlxuXG5cblxuPGRpdiBjbGFzcz1cIm1hcFwiIGlkPVwiaG90ZWxfbWFwXCI+PC9kaXY+IiwiPHNjcmlwdD5cbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uL0ZldGNoRGF0YS5qc1wiO1xuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiO1xuXG4gIGxldCBHZW9MYXRpdHVkZSA9IDA7XG4gIGxldCBHZW9Mb25naXR1ZGUgPSAwO1xuICBsZXQgRkRhdGEgPSBuZXcgRmV0Y2hEYXRhKCk7XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoXG4gICAgKCkgPT4ge30sXG4gICAgKCkgPT4ge31cbiAgKTtcblxuICBhc3luYyBmdW5jdGlvbiBHZXRFdmVudHNBcm91bmQoc2VhcmNoKSB7XG4gICAgbGV0IHF1ZXJ5ID0geyBsYXRpdHVkZTogR2VvTGF0aXR1ZGUsIGxvbmdpdHVkZTogR2VvTG9uZ2l0dWRlIH07XG4gICAgY29uc3QgcmVzID0gYXdhaXQgRkRhdGEuZ2V0KFwiL3BnYXBpL3YyL2V2ZW50cy9hcm91bmRcIiwgcXVlcnksIHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHNlIHB1ZG8gY2FyZ2FyIGxhIGluZm9ybWFjacOzblwiKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBHZW9Mb2NhdGlvbigpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGFzeW5jIChwb3NpdGlvbikgPT4ge1xuICAgICAgICBHZW9MYXRpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgR2VvTG9uZ2l0dWRlID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgICAgcHJvbWlzZSA9IEdldEV2ZW50c0Fyb3VuZCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2UgcHVkbyBvYnRlbmVyIGxhcyBjb29yZGVuYWRhc1wiKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICBHZW9Mb2NhdGlvbigpO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIC5sb2NhIHtcbiAgICBwYWRkaW5nOiAwLjVlbTtcbiAgICBib3JkZXI6IHNvbGlkO1xuICAgIGJvcmRlci13aWR0aDogMXB4O1xuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJcIj5cbiAgeyNhd2FpdCBwcm9taXNlfVxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxhIGNsYXNzPVwiaXMtbG9hZGluZ1wiPkNhcmdhbmRvLi4uPC9hPlxuICB7OnRoZW4gZGF0YXN9XG4gICAgeyNlYWNoIGRhdGFzIGFzIHsgaWRldmVudCwgbGFiZWwsIGRhdGVldmVudCwgbWV0ZXJzLCBkZXNjcmlwdGlvbiB9LCBpfVxuICAgICAgPGRpdiBjbGFzcz1cImxvY2FcIj5cblxuICAgICAgICA8ZGl2PjxzcGFuPntkYXRlZXZlbnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGQgaXMtZ3JvdXBlZCBpcy1ncm91cGVkLW11bHRpbGluZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj57ZGF0ZWV2ZW50LnRvTG9jYWxlRGF0ZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFuZ2VyXCI+PHNwYW4gY2xhc3M9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgPC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3MgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYXJrXCI+e25ldyBEYXRlKGRhdGVldmVudCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYW5nZXJcIj48c3BhbiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNsb2NrLW9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIDwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncyBoYXMtYWRkb25zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLWRhcmtcIj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYW5nZXJcIj48c3BhbiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1ob21lXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzIGhhcy1hZGRvbnNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPntNYXRoLmNlaWwobWV0ZXJzKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnIGlzLXN1Y2Nlc3NcIj5tZXRybyhzKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3MgaGFzLWFkZG9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZyBpcy1kYXJrXCI+Y2hhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtcHJpbWFyeVwiPm9uIGdpdHRlcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2PjxzcGFuPntkZXNjcmlwdGlvbn08L3NwYW4+PC9kaXY+XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgIHsvZWFjaH1cbiAgezpjYXRjaCBlcnJvcn1cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICA8YSBzdHlsZT1cImNvbG9yOiByZWRcIiBjbGFzcz1cImlzLWxvYWRpbmdcIj57ZXJyb3IubWVzc2FnZX08L2E+XG4gIHsvYXdhaXR9XG48L2Rpdj5cbiIsIlxuPHNjcmlwdD5cbiAgICBpbXBvcnQge1NlbmRFdmVudH0gZnJvbSBcIi4uL1NlbmRFdmVudC5qc1wiOyAgXG4gICAgZnVuY3Rpb24gU2VuZChwYXJhbXMpIHtcbiAgICAgIFNlbmRFdmVudCgnY3Nwd2EtYWNjaWRlbnQtYWxhcm0nKTtcbiAgICB9XG4gIDwvc2NyaXB0PlxuPGJ1dHRvbiBvbjpjbGljaz1cIntTZW5kfVwiIGNsYXNzPVwiYnV0dG9uIGlzLXdhcm5pbmcgaXMtb3V0bGluZWQgaXMtbGFyZ2UgaXMtZnVsbHdpZHRoXCI+QUNDSURFTlRFPC9idXR0b24+IiwiPHNjcmlwdD5cbiAgICBpbXBvcnQge1NlbmRFdmVudH0gZnJvbSBcIi4uL1NlbmRFdmVudC5qc1wiOyAgXG4gICAgZnVuY3Rpb24gU2VuZChwYXJhbXMpIHtcbiAgICAgIFNlbmRFdmVudCgnY3Nwd2EtYXNzYXVsdC1hbGFybScpO1xuICAgIH1cbiAgPC9zY3JpcHQ+XG5cbjxidXR0b24gb246Y2xpY2s9XCJ7U2VuZH1cIiBjbGFzcz1cImJ1dHRvbiBpcy1kYW5nZXIgaXMtb3V0bGluZWQgaXMtbGFyZ2UgaXMtZnVsbHdpZHRoXCI+QVNBTFRPPC9idXR0b24+IiwiPHNjcmlwdD5cbiAgaW1wb3J0IEFjY2lkZW50IGZyb20gXCIuL0FjY2lkZW50L01haW4uc3ZlbHRlXCI7XG4gIGltcG9ydCBBc3NhdWx0IGZyb20gXCIuL0Fzc2F1bHQvTWFpbi5zdmVsdGVcIjtcbiAgaW1wb3J0IFN1c3BlY3QgZnJvbSBcIi4vU3VzcGVjdC9NYWluLnN2ZWx0ZVwiO1xuICBpbXBvcnQgVGhlZnQgZnJvbSBcIi4vVGhlZnQvTWFpbi5zdmVsdGVcIjtcbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgPEFzc2F1bHQgLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICA8VGhlZnQgLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICA8QWNjaWRlbnQgLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICA8U3VzcGVjdCAvPlxuICA8L2Rpdj5cbjwvZGl2PlxuIiwiaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uL0ZldGNoRGF0YS5qc1wiO1xuXG5sZXQgRkRhdGEgPSBuZXcgRmV0Y2hEYXRhKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBTZW5kRXZlbnQoY29kZSkge1xuICBpZiAoXCJnZW9sb2NhdGlvblwiIGluIG5hdmlnYXRvcikge1xuICAgIGNvbnNvbGUubG9nKFwiT2J0aWVuZSBsb2NhbGl6YWNpw7NuXCIpO1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2cocG9zaXRpb24pO1xuICAgICAgICAgU2VuZChjb2RlLCBwb3NpdGlvbik7XG4gICAgICB9LFxuICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgIFNlbmQoY29kZSwgZXJyKTtcbiAgICAgIH0sXG4gICAgICB7IGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSB9XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkdlb0xvY2FsaXphY2nDs24gbm8gc29wb3J0YWRhXCIpO1xuICAgIFNlbmQoY29kZSwgeyBsb2NhdGlvbjogXCJ1bnNvcG9ydGVkXCIgfSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gU2VuZChjb2RlLCBnbG9jYXRpb24pIHtcbiAgbGV0IGdlbyA9IHtcbiAgICBsYXRpdHVkZTogZ2xvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICBsb25naXR1ZGU6IGdsb2NhdGlvbi5jb29yZHMubG9uZ2l0dWRlLFxuICAgIGFjY3VyYWN5OiBnbG9jYXRpb24uY29vcmRzLmFjY3VyYWN5LFxuICAgIGFsdGl0dWRlOiBnbG9jYXRpb24uY29vcmRzLmFsdGl0dWRlLFxuICAgIGFsdGl0dWRlQWNjdXJhY3k6IGdsb2NhdGlvbi5jb29yZHMuYWx0aXR1ZGVBY2N1cmFjeSxcbiAgICBoZWFkaW5nOiBnbG9jYXRpb24uY29vcmRzLmhlYWRpbmcsXG4gICAgc3BlZWQ6IGdsb2NhdGlvbi5jb29yZHMuc3BlZWRcbiAgfTtcbiAgbGV0IGRhdGFVc2VyID0geyBjb2RlOiBjb2RlLCBkZXRhaWxzOiB7IGdlbzogZ2VvfSB9O1xuICBjb25zb2xlLmxvZyhkYXRhVXNlcik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgRkRhdGEucG9zdChcbiAgICAgIFwiL3BnYXBpL2NvbW11bml0eS1zYWZldHktcHdhL3YxL3JlY2VpdmVyXCIsXG4gICAgICBkYXRhVXNlcixcbiAgICAgIHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGlmIChyZXMub2spIHtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGNvbnNvbGUud2FybihkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xuICAgIH1cbiAgICBcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS53YXJuKGVycik7XG4gIH1cbn1cbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7U2VuZEV2ZW50fSBmcm9tIFwiLi4vU2VuZEV2ZW50LmpzXCI7ICBcbiAgZnVuY3Rpb24gU2VuZChwYXJhbXMpIHtcbiAgICBTZW5kRXZlbnQoJ2NzcHdhLXN1c3BlY3QtYWxhcm0nKTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxidXR0b25cbiAgY2xhc3M9XCJidXR0b24gaXMtbGluayBpcy1vdXRsaW5lZCBpcy1sYXJnZSBpcy1mdWxsd2lkdGhcIlxuICBvbjpjbGljaz17U2VuZH0+U09TUEVDSE9TTzwvYnV0dG9uPlxuIiwiPHNjcmlwdD5cbiAgICBpbXBvcnQge1NlbmRFdmVudH0gZnJvbSBcIi4uL1NlbmRFdmVudC5qc1wiOyAgXG4gICAgZnVuY3Rpb24gU2VuZChwYXJhbXMpIHtcbiAgICAgIFNlbmRFdmVudCgnY3Nwd2EtdGhlZnQtYWxhcm0nKTtcbiAgICB9XG4gIDwvc2NyaXB0PlxuPGJ1dHRvbiBvbjpjbGljaz1cIntTZW5kfVwiIGNsYXNzPVwiYnV0dG9uIGlzLWRhbmdlciBpcy1vdXRsaW5lZCBpcy1sYXJnZSBpcy1mdWxsd2lkdGhcIj5IVVJUTzwvYnV0dG9uPiIsIi8qXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTEsIGFzIGRlZmluZWRcbiAqIGluIEZJUFMgUFVCIDE4MC0xXG4gKiBWZXJzaW9uIDIuMWEgQ29weXJpZ2h0IFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDIuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBkZXRhaWxzLlxuICovXG5cbi8qXG4gKiBDb25maWd1cmFibGUgdmFyaWFibGVzLiBZb3UgbWF5IG5lZWQgdG8gdHdlYWsgdGhlc2UgdG8gYmUgY29tcGF0aWJsZSB3aXRoXG4gKiB0aGUgc2VydmVyLXNpZGUsIGJ1dCB0aGUgZGVmYXVsdHMgd29yayBpbiBtb3N0IGNhc2VzLlxuICovXG52YXIgaGV4Y2FzZSA9IDA7ICAvKiBoZXggb3V0cHV0IGZvcm1hdC4gMCAtIGxvd2VyY2FzZTsgMSAtIHVwcGVyY2FzZSAgICAgICAgKi9cbnZhciBiNjRwYWQgID0gXCJcIjsgLyogYmFzZS02NCBwYWQgY2hhcmFjdGVyLiBcIj1cIiBmb3Igc3RyaWN0IFJGQyBjb21wbGlhbmNlICAgKi9cbnZhciBjaHJzeiAgID0gODsgIC8qIGJpdHMgcGVyIGlucHV0IGNoYXJhY3Rlci4gOCAtIEFTQ0lJOyAxNiAtIFVuaWNvZGUgICAgICAqL1xuXG4vKlxuICogVGhlc2UgYXJlIHRoZSBmdW5jdGlvbnMgeW91J2xsIHVzdWFsbHkgd2FudCB0byBjYWxsXG4gKiBUaGV5IHRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciBoZXggb3IgYmFzZS02NCBlbmNvZGVkIHN0cmluZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhleF9zaGExKHMpe3JldHVybiBiaW5iMmhleChjb3JlX3NoYTEoc3RyMmJpbmIocykscy5sZW5ndGggKiBjaHJzeikpO31cbmV4cG9ydCBmdW5jdGlvbiBiNjRfc2hhMShzKXtyZXR1cm4gYmluYjJiNjQoY29yZV9zaGExKHN0cjJiaW5iKHMpLHMubGVuZ3RoICogY2hyc3opKTt9XG5leHBvcnQgZnVuY3Rpb24gc3RyX3NoYTEocyl7cmV0dXJuIGJpbmIyc3RyKGNvcmVfc2hhMShzdHIyYmluYihzKSxzLmxlbmd0aCAqIGNocnN6KSk7fVxuZnVuY3Rpb24gaGV4X2htYWNfc2hhMShrZXksIGRhdGEpeyByZXR1cm4gYmluYjJoZXgoY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKSk7fVxuZnVuY3Rpb24gYjY0X2htYWNfc2hhMShrZXksIGRhdGEpeyByZXR1cm4gYmluYjJiNjQoY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKSk7fVxuZnVuY3Rpb24gc3RyX2htYWNfc2hhMShrZXksIGRhdGEpeyByZXR1cm4gYmluYjJzdHIoY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKSk7fVxuXG4vKlxuICogUGVyZm9ybSBhIHNpbXBsZSBzZWxmLXRlc3QgdG8gc2VlIGlmIHRoZSBWTSBpcyB3b3JraW5nXG4gKi9cbmZ1bmN0aW9uIHNoYTFfdm1fdGVzdCgpXG57XG4gIHJldHVybiBoZXhfc2hhMShcImFiY1wiKSA9PSBcImE5OTkzZTM2NDcwNjgxNmFiYTNlMjU3MTc4NTBjMjZjOWNkMGQ4OWRcIjtcbn1cblxuLypcbiAqIENhbGN1bGF0ZSB0aGUgU0hBLTEgb2YgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aFxuICovXG5mdW5jdGlvbiBjb3JlX3NoYTEoeCwgbGVuKVxue1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGxlbiAlIDMyKTtcbiAgeFsoKGxlbiArIDY0ID4+IDkpIDw8IDQpICsgMTVdID0gbGVuO1xuXG4gIHZhciB3ID0gQXJyYXkoODApO1xuICB2YXIgYSA9ICAxNzMyNTg0MTkzO1xuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gIHZhciBkID0gIDI3MTczMzg3ODtcbiAgdmFyIGUgPSAtMTAwOTU4OTc3NjtcblxuICBmb3IodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpXG4gIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgdmFyIG9sZGUgPSBlO1xuXG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDgwOyBqKyspXG4gICAge1xuICAgICAgaWYoaiA8IDE2KSB3W2pdID0geFtpICsgal07XG4gICAgICBlbHNlIHdbal0gPSByb2wod1tqLTNdIF4gd1tqLThdIF4gd1tqLTE0XSBeIHdbai0xNl0sIDEpO1xuICAgICAgdmFyIHQgPSBzYWZlX2FkZChzYWZlX2FkZChyb2woYSwgNSksIHNoYTFfZnQoaiwgYiwgYywgZCkpLFxuICAgICAgICAgICAgICAgICAgICAgICBzYWZlX2FkZChzYWZlX2FkZChlLCB3W2pdKSwgc2hhMV9rdChqKSkpO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSByb2woYiwgMzApO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gdDtcbiAgICB9XG5cbiAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XG4gICAgZSA9IHNhZmVfYWRkKGUsIG9sZGUpO1xuICB9XG4gIHJldHVybiBBcnJheShhLCBiLCBjLCBkLCBlKTtcblxufVxuXG4vKlxuICogUGVyZm9ybSB0aGUgYXBwcm9wcmlhdGUgdHJpcGxldCBjb21iaW5hdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGN1cnJlbnRcbiAqIGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBzaGExX2Z0KHQsIGIsIGMsIGQpXG57XG4gIGlmKHQgPCAyMCkgcmV0dXJuIChiICYgYykgfCAoKH5iKSAmIGQpO1xuICBpZih0IDwgNDApIHJldHVybiBiIF4gYyBeIGQ7XG4gIGlmKHQgPCA2MCkgcmV0dXJuIChiICYgYykgfCAoYiAmIGQpIHwgKGMgJiBkKTtcbiAgcmV0dXJuIGIgXiBjIF4gZDtcbn1cblxuLypcbiAqIERldGVybWluZSB0aGUgYXBwcm9wcmlhdGUgYWRkaXRpdmUgY29uc3RhbnQgZm9yIHRoZSBjdXJyZW50IGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBzaGExX2t0KHQpXG57XG4gIHJldHVybiAodCA8IDIwKSA/ICAxNTE4NTAwMjQ5IDogKHQgPCA0MCkgPyAgMTg1OTc3NTM5MyA6XG4gICAgICAgICAodCA8IDYwKSA/IC0xODk0MDA3NTg4IDogLTg5OTQ5NzUxNDtcbn1cblxuLypcbiAqIENhbGN1bGF0ZSB0aGUgSE1BQy1TSEExIG9mIGEga2V5IGFuZCBzb21lIGRhdGFcbiAqL1xuZnVuY3Rpb24gY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKVxue1xuICB2YXIgYmtleSA9IHN0cjJiaW5iKGtleSk7XG4gIGlmKGJrZXkubGVuZ3RoID4gMTYpIGJrZXkgPSBjb3JlX3NoYTEoYmtleSwga2V5Lmxlbmd0aCAqIGNocnN6KTtcblxuICB2YXIgaXBhZCA9IEFycmF5KDE2KSwgb3BhZCA9IEFycmF5KDE2KTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXG4gIHtcbiAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVDNUM1QzVDO1xuICB9XG5cbiAgdmFyIGhhc2ggPSBjb3JlX3NoYTEoaXBhZC5jb25jYXQoc3RyMmJpbmIoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIGNocnN6KTtcbiAgcmV0dXJuIGNvcmVfc2hhMShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTYwKTtcbn1cblxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cbmZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpXG57XG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG59XG5cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cbmZ1bmN0aW9uIHJvbChudW0sIGNudClcbntcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xufVxuXG4vKlxuICogQ29udmVydCBhbiA4LWJpdCBvciAxNi1iaXQgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHNcbiAqIEluIDgtYml0IGZ1bmN0aW9uLCBjaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaS1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cbmZ1bmN0aW9uIHN0cjJiaW5iKHN0cilcbntcbiAgdmFyIGJpbiA9IEFycmF5KCk7XG4gIHZhciBtYXNrID0gKDEgPDwgY2hyc3opIC0gMTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGggKiBjaHJzejsgaSArPSBjaHJzeilcbiAgICBiaW5baT4+NV0gfD0gKHN0ci5jaGFyQ29kZUF0KGkgLyBjaHJzeikgJiBtYXNrKSA8PCAoMzIgLSBjaHJzeiAtIGklMzIpO1xuICByZXR1cm4gYmluO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGJpbmIyc3RyKGJpbilcbntcbiAgdmFyIHN0ciA9IFwiXCI7XG4gIHZhciBtYXNrID0gKDEgPDwgY2hyc3opIC0gMTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJpbi5sZW5ndGggKiAzMjsgaSArPSBjaHJzeilcbiAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYmluW2k+PjVdID4+PiAoMzIgLSBjaHJzeiAtIGklMzIpKSAmIG1hc2spO1xuICByZXR1cm4gc3RyO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgaGV4IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmluYjJoZXgoYmluYXJyYXkpXG57XG4gIHZhciBoZXhfdGFiID0gaGV4Y2FzZSA/IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiIDogXCIwMTIzNDU2Nzg5YWJjZGVmXCI7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYmluYXJyYXkubGVuZ3RoICogNDsgaSsrKVxuICB7XG4gICAgc3RyICs9IGhleF90YWIuY2hhckF0KChiaW5hcnJheVtpPj4yXSA+PiAoKDMgLSBpJTQpKjgrNCkpICYgMHhGKSArXG4gICAgICAgICAgIGhleF90YWIuY2hhckF0KChiaW5hcnJheVtpPj4yXSA+PiAoKDMgLSBpJTQpKjggICkpICYgMHhGKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgYmFzZS02NCBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gYmluYjJiNjQoYmluYXJyYXkpXG57XG4gIHZhciB0YWIgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcbiAgdmFyIHN0ciA9IFwiXCI7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnJheS5sZW5ndGggKiA0OyBpICs9IDMpXG4gIHtcbiAgICB2YXIgdHJpcGxldCA9ICgoKGJpbmFycmF5W2kgICA+PiAyXSA+PiA4ICogKDMgLSAgaSAgICU0KSkgJiAweEZGKSA8PCAxNilcbiAgICAgICAgICAgICAgICB8ICgoKGJpbmFycmF5W2krMSA+PiAyXSA+PiA4ICogKDMgLSAoaSsxKSU0KSkgJiAweEZGKSA8PCA4IClcbiAgICAgICAgICAgICAgICB8ICAoKGJpbmFycmF5W2krMiA+PiAyXSA+PiA4ICogKDMgLSAoaSsyKSU0KSkgJiAweEZGKTtcbiAgICBmb3IodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGkgKiA4ICsgaiAqIDYgPiBiaW5hcnJheS5sZW5ndGggKiAzMikgc3RyICs9IGI2NHBhZDtcbiAgICAgIGVsc2Ugc3RyICs9IHRhYi5jaGFyQXQoKHRyaXBsZXQgPj4gNiooMy1qKSkgJiAweDNGKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn0iLCI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBpbXBvcnQgUmVwb3J0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1JlcG9ydC9NYWluLnN2ZWx0ZVwiO1xuICBpbXBvcnQgV2F0Y2hlZCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9XYXRjaGVkL01haW4uc3ZlbHRlXCI7XG4gIGltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL05vdGlmaWNhdGlvbnMvTWFpbi5zdmVsdGVcIjtcbiAgaW1wb3J0IE1hcEFjY291bnQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvTWFwL01hcC5zdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgLy8gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcbiAgbGV0IGNvbXBvbmVudFNlbGVjdGVkID0gUmVwb3J0O1xuXG4gIC8vZXhwb3J0IGxldCBzZWdtZW50O1xuXG4gIG9uTW91bnQoYXN5bmMgKCkgPT4ge30pO1xuPC9zY3JpcHQ+XG5cbjxuYXYgY2xhc3M9XCJuYXZiYXJcIiByb2xlPVwibmF2aWdhdGlvblwiIGFyaWEtbGFiZWw9XCJtYWluIG5hdmlnYXRpb25cIj5cbiAgPGRpdiBjbGFzcz1cIm5hdmJhci1icmFuZFwiPlxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWl0ZW1cIiBocmVmPVwiL2hvbWVcIj5cbiAgICAgIDxpbWcgc3JjPVwibG9nby5wbmdcIiB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMjVcIiBhbHQ9XCJTZWd1cmlkYWQgQ29tdW5pdGFyaWFcIiAvPlxuICAgICAgPHN0cm9uZz4gU0VHVVJJREFEIENJVURBREFOQTwvc3Ryb25nPlxuICAgIDwvYT5cblxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxhXG4gICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwibmF2YmFyLWJ1cmdlciBidXJnZXJcIlxuICAgICAgYXJpYS1sYWJlbD1cIm1lbnVcIlxuICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgIGRhdGEtdGFyZ2V0PVwibmF2YmFyQmFzaWNFeGFtcGxlXCI+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgPC9hPlxuICA8L2Rpdj5cblxuICA8ZGl2IGlkPVwibmF2YmFyQmFzaWNFeGFtcGxlXCIgY2xhc3M9XCJuYXZiYXItbWVudVwiPlxuICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItc3RhcnRcIj5cbiAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgICAgPGEgY2xhc3M9XCJuYXZiYXItaXRlbVwiPiBNaSBjdWVudGEgPC9hPlxuXG4gICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICAgIDxhIGNsYXNzPVwibmF2YmFyLWl0ZW1cIj4gUmVwb3J0ZXMgPC9hPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm5hdmJhci1lbmRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxuICAgICAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uIGlzLWxpZ2h0XCI+IExvZ291dCA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uYXY+XG5cbjxkaXYgY2xhc3M9XCJ0YWJzIGlzLWJveGVkXCI+XG4gIDx1bD5cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICA8bGlcbiAgICAgIGNsYXNzOmlzLWFjdGl2ZT17Y29tcG9uZW50U2VsZWN0ZWQgPT09IFJlcG9ydH1cbiAgICAgIG9uOmNsaWNrPXsoKT0+e2NvbXBvbmVudFNlbGVjdGVkID0gUmVwb3J0fX0+XG4gICAgICA8YT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlcbiAgICAgICAgICAgIGNsYXNzPVwiZmFzIGZhLWltYWdlXCJcbiAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+PC9zcGFuPlxuICAgICAgICA8c3Bhbj5SZXBvcnRhcjwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICA8L2xpPlxuICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW1pc3NpbmctYXR0cmlidXRlIC0tPlxuICAgIDxsaVxuICAgICAgY2xhc3M6aXMtYWN0aXZlPXtjb21wb25lbnRTZWxlY3RlZCA9PT0gTm90aWZpY2F0aW9uc31cbiAgICAgIG9uOmNsaWNrPXsoKT0+e2NvbXBvbmVudFNlbGVjdGVkID0gTm90aWZpY2F0aW9uc319PlxuICAgICAgPGE+Tm90aWZpY2FjaW9uZXM8L2E+XG4gICAgPC9saT5cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICA8bGlcbiAgICAgIGNsYXNzOmlzLWFjdGl2ZT17Y29tcG9uZW50U2VsZWN0ZWQgPT09IFdhdGNoZWR9XG4gICAgICBvbjpjbGljaz17KCk9Pntjb21wb25lbnRTZWxlY3RlZCA9IFdhdGNoZWR9fT5cbiAgICAgIDxhPlNlZ3VpbWllbnRvPC9hPlxuICAgIDwvbGk+XG4gICAgPGxpXG4gICAgICBjbGFzczppcy1hY3RpdmU9e2NvbXBvbmVudFNlbGVjdGVkID09PSBNYXBBY2NvdW50fVxuICAgICAgb246Y2xpY2s9eygpPT57Y29tcG9uZW50U2VsZWN0ZWQgPSBNYXBBY2NvdW50fX0+XG4gICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1taXNzaW5nLWF0dHJpYnV0ZSAtLT5cbiAgICAgIDxhPk1hcGE8L2E+XG4gICAgPC9saT5cblxuICA8L3VsPlxuPC9kaXY+XG48c3ZlbHRlOmNvbXBvbmVudCB0aGlzPXtjb21wb25lbnRTZWxlY3RlZH0gLz5cbiJdLCJzb3VyY2VSb290IjoiIn0=