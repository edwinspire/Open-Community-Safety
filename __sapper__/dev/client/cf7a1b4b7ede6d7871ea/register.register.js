(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["register"],{

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
          country: country,
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

/***/ "./src/routes/register/index.svelte":
/*!******************************************!*\
  !*** ./src/routes/register/index.svelte ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _components_FetchData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/FetchData.js */ "./src/components/FetchData.js");
/* src/routes/register/index.svelte generated by Svelte v3.23.2 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__["globals"];


const file = "src/routes/register/index.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-9tt436-style";
	style.textContent = "@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:200;src:local(\"Source Sans Pro ExtraLight\"), local(\"SourceSansPro-ExtraLight\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf)\n        format(\"truetype\")}@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:300;src:local(\"Source Sans Pro Light\"), local(\"SourceSansPro-Light\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf)\n        format(\"truetype\")}.root.svelte-9tt436.svelte-9tt436{box-sizing:border-box;margin:0;padding:0;font-weight:300;display:block}.body.svelte-9tt436.svelte-9tt436{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-9tt436 .svelte-9tt436::-webkit-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-9tt436 .svelte-9tt436:-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-9tt436 .svelte-9tt436::-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-9tt436 .svelte-9tt436:-ms-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.wrapper.svelte-9tt436.svelte-9tt436{background:#4877af;background:-webkit-gradient(\n      linear,\n      left top,\n      right bottom,\n      from(#4877af),\n      to(#12284a)\n    );background:linear-gradient(to bottom right, #4877af 0%, #12284a 100%);position:absolute;left:0;width:100%;height:100%;overflow:hidden}.wrapper.form-success .container.svelte-9tt436 h1.svelte-9tt436{-webkit-transform:translateY(85px) !important;transform:translateY(85px) !important}.container.svelte-9tt436.svelte-9tt436{max-width:300px;margin:0 auto;padding:80px 0;height:400px;text-align:center}.container.svelte-9tt436 h1.svelte-9tt436{font-size:40px !important;-webkit-transition-duration:1s;transition-duration:1s;-webkit-transition-timing-function:ease-in-put;transition-timing-function:ease-in-put;font-weight:200 !important}.form.svelte-9tt436.svelte-9tt436{padding:20px 0;z-index:99;position:relative}.links_block.svelte-9tt436.svelte-9tt436{text-align:right;padding:1em}.form.svelte-9tt436 a.svelte-9tt436{color:white}.form.svelte-9tt436 a.svelte-9tt436:visited{color:floralwhite}.form.svelte-9tt436 input.svelte-9tt436{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;border:1px solid rgba(255, 255, 255, 0.4);background-color:rgba(255, 255, 255, 0.2);width:-webkit-fill-available !important;border-radius:3px;padding:10px 15px;margin:0 auto 10px auto;display:block;text-align:center;font-size:1em !important;color:white;-webkit-transition-duration:0.25s;transition-duration:0.25s;font-weight:300 !important}.form.svelte-9tt436 input.svelte-9tt436:hover{background-color:rgba(255, 255, 255, 0.4)}.form.svelte-9tt436 input.svelte-9tt436:focus{background-color:white;width:300px;color:#12284a}.bg_bubbles.svelte-9tt436.svelte-9tt436{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.bg_bubbles.svelte-9tt436 li.svelte-9tt436{position:absolute;list-style:none;display:block;width:40px;height:40px;background-color:rgba(255, 255, 255, 0.15);bottom:-160px;-webkit-animation:svelte-9tt436-square 25s infinite;animation:svelte-9tt436-square 25s infinite;-webkit-transition-timing-function:linear;transition-timing-function:linear}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(1){left:10%}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(2){left:20%;width:80px;height:80px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:17s;animation-duration:17s}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(3){left:25%;-webkit-animation-delay:4s;animation-delay:4s}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(4){left:40%;width:60px;height:60px;-webkit-animation-duration:22s;animation-duration:22s;background-color:rgba(255, 255, 255, 0.25)}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(5){left:70%}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(6){left:80%;width:120px;height:120px;-webkit-animation-delay:3s;animation-delay:3s;background-color:rgba(255, 255, 255, 0.2)}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(7){left:32%;width:160px;height:160px;-webkit-animation-delay:7s;animation-delay:7s}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(8){left:55%;width:20px;height:20px;-webkit-animation-delay:15s;animation-delay:15s;-webkit-animation-duration:40s;animation-duration:40s}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(9){left:25%;width:10px;height:10px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:40s;animation-duration:40s;background-color:rgba(255, 255, 255, 0.3)}.bg_bubbles.svelte-9tt436 li.svelte-9tt436:nth-child(10){left:90%;width:160px;height:160px;-webkit-animation-delay:11s;animation-delay:11s}@-webkit-keyframes svelte-9tt436-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}@keyframes svelte-9tt436-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcbiAgbGV0IFJldHVyblJlZ2lzdGVyID0ge2lkYWNjb3VudHVzZXI6IDB9O1xuXG4gIGZ1bmN0aW9uIENvdW50cnkoKSB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihhc3luYyAocG9zaXRpb24pID0+IHtcbiAgICAgICAgUGFyYW1zLmdlb3ggPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgIFBhcmFtcy5nZW95ID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgICAgR2V0Q291bnRyeSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2UgcHVkbyBvYnRlbmVyIGxhcyBjb29yZGVuYWRhc1wiKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBHZXRDb3VudHJ5KCkge1xuICAgIC8vZGF0YT1bdGltZW91dDoxMF1bb3V0Ompzb25dO2lzX2luKC0wLjIxMjYzLC03OC40MTA1MyktPi5hO3dheShwaXZvdC5hKTtvdXQrdGFncytiYjtvdXQraWRzK2dlb20oLTAuMjE4MDMsLTc4LjQxMTExLC0wLjIxMTQxLC03OC40MDU2MCk7cmVsYXRpb24ocGl2b3QuYSk7b3V0K3RhZ3MrYmI7XG4gICAgbGV0IHF1ZXJ5ID0gYFtvdXQ6anNvbl1bdGltZW91dDoxMF07aXNfaW4oJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pLT4uYTtyZWxhdGlvbihwaXZvdC5hKTtvdXQgdGFncyBxdDsod2F5KGFyb3VuZDoyMCwke1BhcmFtcy5nZW94fSwke1BhcmFtcy5nZW95fSk7KTtvdXQgdGFncyBxdDtgO1xuICAgIGxldCByID0gYXdhaXQgZmV0Y2goXCJodHRwczovL292ZXJwYXNzLWFwaS5kZS9hcGkvaW50ZXJwcmV0ZXJcIiwge1xuICAgICAgY3JlZGVudGlhbHM6IFwib21pdFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBhY2NlcHQ6IFwiKi8qXCIsXG4gICAgICAgIFwiYWNjZXB0LWxhbmd1YWdlXCI6IFwiZXMtRVMsZXM7cT0wLjksZW47cT0wLjhcIixcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtZGVzdFwiOiBcImVtcHR5XCIsXG4gICAgICAgIFwic2VjLWZldGNoLW1vZGVcIjogXCJjb3JzXCIsXG4gICAgICAgIFwic2VjLWZldGNoLXNpdGVcIjogXCJjcm9zcy1zaXRlXCIsXG4gICAgICB9LFxuICAgICAgcmVmZXJyZXI6IGBodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9xdWVyeT9sYXQ9JHtQYXJhbXMuZ2VveH0mbG9uPSR7UGFyYW1zLmdlb3l9YCxcbiAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlXCIsXG4gICAgICAvL1wiYm9keVwiOiBgZGF0YT0lNUJ0aW1lb3V0JTNBMTAlNUQlNUJvdXQlM0Fqc29uJTVEJTNCaXNfaW4oJHt0aGlzLlBhcmFtcy5nZW94fSUyQyR7dGhpcy5QYXJhbXMuZ2VveX0pLSUzRS5hJTNCd2F5KHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JvdXQraWRzK2dlb20oJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveCkudG9GaXhlZCg1KX0lMkMke051bWJlcih0aGlzLlBhcmFtcy5nZW95KS50b0ZpeGVkKDUpfSUyQyR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KSUzQnJlbGF0aW9uKHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JgLFxuICAgICAgYm9keTogcXVlcnksXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCByLmpzb24oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZWxlbWVudHMpICYmIGRhdGEuZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdICYmXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0udGFncyAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MubmFtZVxuICAgICAgKSB7XG4gICAgICAgIFBhcmFtcy5jb3VudHJ5ID0gZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gUmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3Ryby5cIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLnBvc3QoXG4gICAgICAgIFwiL3BnYXBpL3YyL3JlZ2lzdGVyL2NvbW11bml0eS1zYWZldHktcHdhXCIsXG4gICAgICAgIFBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIFJldHVyblJlZ2lzdGVyID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coUmV0dXJuUmVnaXN0ZXIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBSZXR1cm5SZWdpc3RlciA9IHt9O1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gXG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbmljaWFcIik7XG4gICAgQ291bnRyeSgpO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cblxuXG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gRXh0cmFMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUV4dHJhTGlnaHRcIiksXG4gICAgICB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3NvdXJjZXNhbnNwcm8vdjEzLzZ4S3lkU0JZS2NTVi1MQ29lUXFmWDFSWU9vM2k5NF93bHhkci50dGYpXG4gICAgICAgIGZvcm1hdChcInRydWV0eXBlXCIpO1xuICB9XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gTGlnaHRcIiksIGxvY2FsKFwiU291cmNlU2Fuc1Byby1MaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaWs0endseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgLnJvb3Qge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAuYm9keSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBXZWJLaXQgYnJvd3NlcnMgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDQgdG8gMTggKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDE5KyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTArICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLndyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICM0ODc3YWY7XG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChcbiAgICAgIGxpbmVhcixcbiAgICAgIGxlZnQgdG9wLFxuICAgICAgcmlnaHQgYm90dG9tLFxuICAgICAgZnJvbSgjNDg3N2FmKSxcbiAgICAgIHRvKCMxMjI4NGEpXG4gICAgKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCAjNDg3N2FmIDAlLCAjMTIyODRhIDEwMCUpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIC53cmFwcGVyLmZvcm0tc3VjY2VzcyAuY29udGFpbmVyIGgxIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogODBweCAwO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5jb250YWluZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogNDBweCAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tcHV0O1xuICAgIGZvbnQtd2VpZ2h0OiAyMDAgIWltcG9ydGFudDtcbiAgfVxuICAuZm9ybSB7XG4gICAgcGFkZGluZzogMjBweCAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5saW5rc19ibG9jayB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMWVtO1xuICB9XG5cbiAgLmZvcm0gYSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG4gIC5mb3JtIGE6dmlzaXRlZCB7XG4gICAgY29sb3I6IGZsb3JhbHdoaXRlO1xuICB9XG4gIC5mb3JtIGlucHV0IHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMWVtICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgZm9udC13ZWlnaHQ6IDMwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIGlucHV0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBjb2xvcjogIzEyMjg0YTtcbiAgfVxuXG4gIC5iZ19idWJibGVzIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xuICAgIGJvdHRvbTogLTE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xuICAgIGxlZnQ6IDEwJTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xuICAgIGxlZnQ6IDIwJTtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMykge1xuICAgIGxlZnQ6IDI1JTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogNHM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNCkge1xuICAgIGxlZnQ6IDQwJTtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XG4gICAgbGVmdDogNzAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg2KSB7XG4gICAgbGVmdDogODAlO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAzcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNykge1xuICAgIGxlZnQ6IDMyJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogN3M7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoOCkge1xuICAgIGxlZnQ6IDU1JTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg5KSB7XG4gICAgbGVmdDogMjUlO1xuICAgIHdpZHRoOiAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcbiAgICBsZWZ0OiA5MCU7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGhlaWdodDogMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDExcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDExcztcbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG4gIEBrZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwicm9vdFwiPlxuICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMT5SZWdpc3RybzwvaDE+XG5cbiAgICAgICAgeyNpZiBSZXR1cm5SZWdpc3Rlci5pZGFjY291bnR1c2VyIDw9IDB9XG4gICAgICAgIDxkaXYgPlxuICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgY2xhc3M9XCJmb3JtXCJcbiAgICAgICAgICBhY3Rpb249XCIvcGdhcGkvdjIvcmVnaXN0ZXJcIlxuICAgICAgICAgIG1ldGhvZD1cInBvc3RcIlxuICAgICAgICAgIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD17UmVnaXN0ZXJ9PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImdlb3hcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkdlb3hcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmdlb3h9IC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZ2VveVwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2VveVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveX0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJjb3VudHJ5XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvdW50cnlcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmNvdW50cnl9IC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZmlyc3RuYW1lXCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOb21icmVcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmZpcnN0bmFtZX1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImxhc3RuYW1lXCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBcGVsbGlkb1wiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMubGFzdG5hbWV9XG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbWFpbFwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZW1haWx9XG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJwd2RcIlxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ29udHJhc2XDsWFcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLnB3ZH1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cInB3ZDJcIlxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ29uZmlybWUgQ29udHJhc2XDsWFcIlxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJyZWdpc3RlclwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkFjZXB0YXJcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rc19ibG9ja1wiPjxhIGhyZWY9XCIvXCI+TG9naW48L2E+PC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHs6ZWxzZX1cbjxoMj5cbiAge1JldHVyblJlZ2lzdGVyLm1lc3NhZ2V9XG5cbiAgXG48L2gyPlxuPGRpdj5cbiAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cIi9cIj5Mb2dpbjwvYT48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cIi9cIj5SZWN1cGVyYXIgY2xhdmU8L2E+PC9kaXY+XG48L2Rpdj5cbiAgICAgICAgey9pZiB9XG4gICAgICAgICAgXG5cblxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDx1bCBjbGFzcz1cImJnX2J1YmJsZXNcIj5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgICA8bGkgLz5cbiAgPC91bD5cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNGRSxVQUFVLEFBQUMsQ0FBQyxBQUNWLFdBQVcsQ0FBRSxpQkFBaUIsQ0FDOUIsVUFBVSxDQUFFLE1BQU0sQ0FDbEIsV0FBVyxDQUFFLEdBQUcsQ0FDaEIsR0FBRyxDQUFFLE1BQU0sNEJBQTRCLENBQUMsQ0FBQyxDQUFDLE1BQU0sMEJBQTBCLENBQUMsQ0FBQztNQUMxRSxJQUFJLHNGQUFzRixDQUFDO1FBQ3pGLE9BQU8sVUFBVSxDQUFDLEFBQ3hCLENBQUMsQUFDRCxVQUFVLEFBQUMsQ0FBQyxBQUNWLFdBQVcsQ0FBRSxp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 */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

// (397:8) {:else}
function create_else_block(ctx) {
	let h2;
	let t0_value = /*ReturnRegister*/ ctx[1].message + "";
	let t0;
	let t1;
	let div2;
	let div0;
	let a0;
	let t2;
	let t3;
	let div1;
	let a1;
	let t4;

	const block = {
		c: function create() {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Login");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Recuperar clave");
			this.h();
		},
		l: function claim(nodes) {
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, t0_value);
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "A", { href: true, class: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a0_nodes, "Login");
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "A", { href: true, class: true });
			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a1_nodes, "Recuperar clave");
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 397, 0, 10365);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "/");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 403, 27, 10440);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "links_block svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 403, 2, 10415);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "href", "/");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 404, 27, 10495);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "links_block svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 404, 2, 10470);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 402, 0, 10407);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, h2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t4);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*ReturnRegister*/ 2 && t0_value !== (t0_value = /*ReturnRegister*/ ctx[1].message + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(h2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div2);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(397:8) {:else}",
		ctx
	});

	return block;
}

// (339:8) {#if ReturnRegister.idaccountuser <= 0}
function create_if_block(ctx) {
	let div1;
	let form;
	let input0;
	let t0;
	let input1;
	let t1;
	let input2;
	let t2;
	let input3;
	let t3;
	let input4;
	let t4;
	let input5;
	let t5;
	let input6;
	let t6;
	let input7;
	let t7;
	let input8;
	let t8;
	let div0;
	let a;
	let t9;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("form");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Login");
			this.h();
		},
		l: function claim(nodes) {
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "FORM", { class: true, action: true, method: true });
			var form_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(form);

			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				readonly: true,
				placeholder: true,
				class: true
			});

			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				value: true,
				class: true
			});

			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "A", { href: true, class: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Login");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			form_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "name", "geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "placeholder", "Geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input0, file, 345, 10, 8885);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "name", "geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "placeholder", "Geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input1, file, 350, 10, 9023);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "name", "country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "type", "text");
			input2.readOnly = true;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "placeholder", "Country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input2, file, 355, 10, 9161);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "name", "firstname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "placeholder", "Nombre");
			input3.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input3, file, 361, 10, 9327);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "name", "lastname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "placeholder", "Apellido");
			input4.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input4, file, 367, 10, 9509);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "name", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "type", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "placeholder", "Email");
			input5.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input5, file, 373, 10, 9691);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "name", "pwd");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "placeholder", "Contraseña");
			input6.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input6, file, 379, 10, 9863);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "name", "pwd2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "placeholder", "Confirme Contraseña");
			input7.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input7, file, 385, 10, 10039);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "name", "register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "type", "submit");
			input8.value = "Aceptar";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input8, file, 390, 10, 10189);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", "/");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 391, 35, 10280);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "links_block svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 391, 10, 10255);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "class", "form svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "action", "/pgapi/v2/register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "method", "post");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form, file, 340, 10, 8737);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 339, 8, 8720);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, form);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*Params*/ ctx[0].geox);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*Params*/ ctx[0].geoy);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input2, /*Params*/ ctx[0].country);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input3, /*Params*/ ctx[0].firstname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input4, /*Params*/ ctx[0].lastname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input5, /*Params*/ ctx[0].email);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input6, /*Params*/ ctx[0].pwd);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t9);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input0, "input", /*input0_input_handler*/ ctx[3]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input1, "input", /*input1_input_handler*/ ctx[4]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input2, "input", /*input2_input_handler*/ ctx[5]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input3, "input", /*input3_input_handler*/ ctx[6]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input4, "input", /*input4_input_handler*/ ctx[7]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input5, "input", /*input5_input_handler*/ ctx[8]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input6, "input", /*input6_input_handler*/ ctx[9]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(form, "submit", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prevent_default"])(/*Register*/ ctx[2]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*Params*/ ctx[0].geox);
			}

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*Params*/ ctx[0].geoy);
			}

			if (dirty & /*Params*/ 1 && input2.value !== /*Params*/ ctx[0].country) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input2, /*Params*/ ctx[0].country);
			}

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input3, /*Params*/ ctx[0].firstname);
			}

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input4, /*Params*/ ctx[0].lastname);
			}

			if (dirty & /*Params*/ 1 && input5.value !== /*Params*/ ctx[0].email) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input5, /*Params*/ ctx[0].email);
			}

			if (dirty & /*Params*/ 1 && input6.value !== /*Params*/ ctx[0].pwd) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input6, /*Params*/ ctx[0].pwd);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div1);
			mounted = false;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(dispose);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(339:8) {#if ReturnRegister.idaccountuser <= 0}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div3;
	let div2;
	let div1;
	let div0;
	let h1;
	let t0;
	let t1;
	let t2;
	let ul;
	let li0;
	let t3;
	let li1;
	let t4;
	let li2;
	let t5;
	let li3;
	let t6;
	let li4;
	let t7;
	let li5;
	let t8;
	let li6;
	let t9;
	let li7;
	let t10;
	let li8;
	let t11;
	let li9;

	function select_block_type(ctx, dirty) {
		if (/*ReturnRegister*/ ctx[1].idaccountuser <= 0) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Registro");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if_block.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("ul");
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			this.h();
		},
		l: function claim(nodes) {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "H1", { class: true });
			var h1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h1_nodes, "Registro");
			h1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			if_block.l(div0_nodes);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "UL", { class: true });
			var ul_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(ul);
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li3).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li4).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li5).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li6).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li7).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li8).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li9).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			ul_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h1, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 336, 8, 8645);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "container svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 335, 6, 8613);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "wrapper svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 334, 4, 8585);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "body svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 333, 2, 8562);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li0, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li0, file, 415, 4, 10632);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li1, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li1, file, 416, 4, 10643);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li2, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li2, file, 417, 4, 10654);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li3, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li3, file, 418, 4, 10665);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li4, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li4, file, 419, 4, 10676);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li5, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li5, file, 420, 4, 10687);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li6, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li6, file, 421, 4, 10698);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li7, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li7, file, 422, 4, 10709);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li8, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li8, file, 423, 4, 10720);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li9, "class", "svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li9, file, 424, 4, 10731);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(ul, "class", "bg_bubbles svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(ul, file, 414, 2, 10604);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "root svelte-9tt436");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 332, 0, 8541);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, h1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t1);
			if_block.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, ul);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li9);
		},
		p: function update(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div0, null);
				}
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div3);
			if_block.d();
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
	let Params = {
		geox: 0,
		geoy: 0,
		country: "default",
		firstname: "",
		lastname: ""
	};

	let FData = new _components_FetchData_js__WEBPACK_IMPORTED_MODULE_2__["FetchData"]();
	let ReturnRegister = { idaccountuser: 0 };

	function Country() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async position => {
				$$invalidate(0, Params.geox = position.coords.latitude, Params);
				$$invalidate(0, Params.geoy = position.coords.longitude, Params);
				GetCountry();
			});
		} else {
			console.log("No se pudo obtener las coordenadas");
		}
	}

	async function GetCountry() {
		//data=[timeout:10][out:json];is_in(-0.21263,-78.41053)->.a;way(pivot.a);out+tags+bb;out+ids+geom(-0.21803,-78.41111,-0.21141,-78.40560);relation(pivot.a);out+tags+bb;
		let query = `[out:json][timeout:10];is_in(${Params.geox},${Params.geoy})->.a;relation(pivot.a);out tags qt;(way(around:20,${Params.geox},${Params.geoy}););out tags qt;`;

		let r = await fetch("https://overpass-api.de/api/interpreter", {
			credentials: "omit",
			headers: {
				accept: "*/*",
				"accept-language": "es-ES,es;q=0.9,en;q=0.8",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "cross-site"
			},
			referrer: `https://www.openstreetmap.org/query?lat=${Params.geox}&lon=${Params.geoy}`,
			referrerPolicy: "no-referrer-when-downgrade",
			//"body": `data=%5Btimeout%3A10%5D%5Bout%3Ajson%5D%3Bis_in(${this.Params.geox}%2C${this.Params.geoy})-%3E.a%3Bway(pivot.a)%3Bout+tags+bb%3Bout+ids+geom(${Number(this.Params.geox).toFixed(5)}%2C${Number(this.Params.geoy).toFixed(5)}%2C${this.Params.geox}%2C${this.Params.geoy})%3Brelation(pivot.a)%3Bout+tags+bb%3B`,
			body: query,
			method: "POST",
			mode: "cors"
		});

		let data = await r.json();

		if (Array.isArray(data.elements) && data.elements.length > 0) {
			if (data.elements[0] && data.elements[0].tags && data.elements[0].tags.name) {
				$$invalidate(0, Params.country = data.elements[0].tags.name, Params);
			}
		}
	}

	async function Register() {
		console.log("Registro.");

		try {
			const res = await FData.post("/pgapi/v2/register/community-safety-pwa", Params, { "Content-Type": "application/json" });

			if (res.ok) {
				$$invalidate(1, ReturnRegister = await res.json());
				console.log(ReturnRegister);
			}
		} catch(error) {
			$$invalidate(1, ReturnRegister = {});
			console.log(error);
		}
	}

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		console.log("Inicia");
		Country();
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Register> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Register", $$slots, []);

	function input0_input_handler() {
		Params.geox = this.value;
		$$invalidate(0, Params);
	}

	function input1_input_handler() {
		Params.geoy = this.value;
		$$invalidate(0, Params);
	}

	function input2_input_handler() {
		Params.country = this.value;
		$$invalidate(0, Params);
	}

	function input3_input_handler() {
		Params.firstname = this.value;
		$$invalidate(0, Params);
	}

	function input4_input_handler() {
		Params.lastname = this.value;
		$$invalidate(0, Params);
	}

	function input5_input_handler() {
		Params.email = this.value;
		$$invalidate(0, Params);
	}

	function input6_input_handler() {
		Params.pwd = this.value;
		$$invalidate(0, Params);
	}

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		FetchData: _components_FetchData_js__WEBPACK_IMPORTED_MODULE_2__["FetchData"],
		Params,
		FData,
		ReturnRegister,
		Country,
		GetCountry,
		Register
	});

	$$self.$inject_state = $$props => {
		if ("Params" in $$props) $$invalidate(0, Params = $$props.Params);
		if ("FData" in $$props) FData = $$props.FData;
		if ("ReturnRegister" in $$props) $$invalidate(1, ReturnRegister = $$props.ReturnRegister);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		Params,
		ReturnRegister,
		Register,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		input3_input_handler,
		input4_input_handler,
		input5_input_handler,
		input6_input_handler
	];
}

class Register_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-9tt436-style")) add_css();
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Register_1",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Register_1);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLy8vLy8vLy8vLy8vLy8vLy4vc3JjL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzIiwid2VicGFjazovLy8vLy8vLy8vLy8vLy8vLy8vLi9zcmMvY29tcG9uZW50cy9zaGExLmpzIiwid2VicGFjazovLy8vLy8vLy8vLy8vLy8vLy8vLi9zcmMvcm91dGVzL3JlZ2lzdGVyL2luZGV4LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQzs7QUFFeEM7QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLDBEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBLDJFQUEyRTtBQUMzRSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLFdBQVcseURBQVE7QUFDbkI7QUFD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Q0FBQyxJQUFJO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYzs7VUFFckIsS0FBSzttQkFDWixjQUFjO0dBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLOzs7O0NBTXJCLHNEQUFPO0VBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRO0VBQ3BCLE9BQU87Ozs7Ozs7Ozs7Ozs7RUErUWEsTUFBTSxDQUFDLElBQUk7Ozs7O0VBS1gsTUFBTSxDQUFDLElBQUk7Ozs7O0VBTVgsTUFBTSxDQUFDLE9BQU87Ozs7O0VBS2QsTUFBTSxDQUFDLFNBQVM7Ozs7O0VBTWhCLE1BQU0sQ0FBQyxRQUFROzs7OztFQU1mLE1BQU0sQ0FBQyxLQUFLOzs7OztFQU1aLE1BQU0sQ0FBQyxHQUFHIiwiZmlsZSI6ImNmN2ExYjRiN2VkZTZkNzg3MWVhL3JlZ2lzdGVyLnJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vU3RvcmVzLmpzXCI7XG5pbXBvcnQgeyBoZXhfc2hhMSwgc3RyX3NoYTEgfSBmcm9tIFwiLi9zaGExLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBGZXRjaERhdGEge1xuICBhc3luYyBwdXQodXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgLy9jYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy9jb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcG9zdCh1cmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9KTtcbiAgICAgIC8vY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIC8vY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChldmVudC5yZXF1ZXN0KTtcbiAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuICBhc3luYyBnZXQodXJsLCBxdWVyeSwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZTtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaFVSTCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgICAgbGV0IHVybHEgPSB1cmwgKyBcIj9cIiArIHNlYXJjaFVSTC50b1N0cmluZygpO1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmxxLCB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2dpbih1cmwsIHVzZXIsIHBhc3N3b3JkLCBjb3VudHJ5KSB7XG4gICAgbGV0IExTdG9yYWdlID0gbmV3IEFQUExvY2FsU3RvcmFnZSgpO1xuICAgIGxldCBwd2RvZmYgPSBhd2FpdCB0aGlzLmRpZ2VzdE1lc3NhZ2UodXNlciArIHBhc3N3b3JkKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGYgPSBhd2FpdCB0aGlzLnBvc3QoXG4gICAgICAgIHVybCxcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLFxuICAgICAgICAgIHB3ZDogcGFzc3dvcmQsXG4gICAgICAgICAgY291bnRyeTogY291bnRyeSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coZik7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGYuanNvbigpO1xuXG4gICAgICBkYXRhLm9mZmxpbmUgPSBwd2RvZmY7XG4gICAgICBMU3RvcmFnZS5zZXRVc2VyKGRhdGEpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUudHJhY2UoZXJyb3IpO1xuICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgIGRhdGEubG9naW4gPSBmYWxzZTtcbiAgICAgIGxldCB1c2VyID0gTFN0b3JhZ2UuZ2V0VXNlcihkYXRhKTtcblxuICAgICAgY29uc29sZS5sb2codXNlcik7XG5cbiAgICAgIGlmICh1c2VyLm9mZmxpbmUgPT0gcHdkb2ZmKSB7XG4gICAgICAgIGRhdGEgPSB1c2VyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaWdlc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhoZXhfc2hhMSgnaG9sYScpLCBzdHJfc2hhMSgnaG9sYScpKTtcbiAgICAgICAgY29uc3QgbXNnVWludDggPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobWVzc2FnZSk7IC8vIGVuY29kZSBhcyAodXRmLTgpIFVpbnQ4QXJyYXlcbiAgICAgICAgY29uc29sZS5sb2coY3J5cHRvKTtcbiAgICAgICAgY29uc3QgaGFzaEJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTI1NlwiLCBtc2dVaW50OCk7IC8vIGhhc2ggdGhlIG1lc3NhZ2VcbiAgICAgICAgY29uc3QgaGFzaEFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoQnVmZmVyKSk7IC8vIGNvbnZlcnQgYnVmZmVyIHRvIGJ5dGUgYXJyYXlcbiAgICAgICAgY29uc3QgaGFzaEhleCA9IGhhc2hBcnJheVxuICAgICAgICAgICAgLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAgICAgLmpvaW4oXCJcIik7IC8vIGNvbnZlcnQgYnl0ZXMgdG8gaGV4IHN0cmluZ1xuICAgICAgICAgICAgKi9cbiAgICByZXR1cm4gaGV4X3NoYTEobWVzc2FnZSk7XG4gIH1cbn1cbiIsIi8qXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTEsIGFzIGRlZmluZWRcbiAqIGluIEZJUFMgUFVCIDE4MC0xXG4gKiBWZXJzaW9uIDIuMWEgQ29weXJpZ2h0IFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDIuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBkZXRhaWxzLlxuICovXG5cbi8qXG4gKiBDb25maWd1cmFibGUgdmFyaWFibGVzLiBZb3UgbWF5IG5lZWQgdG8gdHdlYWsgdGhlc2UgdG8gYmUgY29tcGF0aWJsZSB3aXRoXG4gKiB0aGUgc2VydmVyLXNpZGUsIGJ1dCB0aGUgZGVmYXVsdHMgd29yayBpbiBtb3N0IGNhc2VzLlxuICovXG52YXIgaGV4Y2FzZSA9IDA7ICAvKiBoZXggb3V0cHV0IGZvcm1hdC4gMCAtIGxvd2VyY2FzZTsgMSAtIHVwcGVyY2FzZSAgICAgICAgKi9cbnZhciBiNjRwYWQgID0gXCJcIjsgLyogYmFzZS02NCBwYWQgY2hhcmFjdGVyLiBcIj1cIiBmb3Igc3RyaWN0IFJGQyBjb21wbGlhbmNlICAgKi9cbnZhciBjaHJzeiAgID0gODsgIC8qIGJpdHMgcGVyIGlucHV0IGNoYXJhY3Rlci4gOCAtIEFTQ0lJOyAxNiAtIFVuaWNvZGUgICAgICAqL1xuXG4vKlxuICogVGhlc2UgYXJlIHRoZSBmdW5jdGlvbnMgeW91J2xsIHVzdWFsbHkgd2FudCB0byBjYWxsXG4gKiBUaGV5IHRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciBoZXggb3IgYmFzZS02NCBlbmNvZGVkIHN0cmluZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhleF9zaGExKHMpe3JldHVybiBiaW5iMmhleChjb3JlX3NoYTEoc3RyMmJpbmIocykscy5sZW5ndGggKiBjaHJzeikpO31cbmV4cG9ydCBmdW5jdGlvbiBiNjRfc2hhMShzKXtyZXR1cm4gYmluYjJiNjQoY29yZV9zaGExKHN0cjJiaW5iKHMpLHMubGVuZ3RoICogY2hyc3opKTt9XG5leHBvcnQgZnVuY3Rpb24gc3RyX3NoYTEocyl7cmV0dXJuIGJpbmIyc3RyKGNvcmVfc2hhMShzdHIyYmluYihzKSxzLmxlbmd0aCAqIGNocnN6KSk7fVxuZnVuY3Rpb24gaGV4X2htYWNfc2hhMShrZXksIGRhdGEpeyByZXR1cm4gYmluYjJoZXgoY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKSk7fVxuZnVuY3Rpb24gYjY0X2htYWNfc2hhMShrZXksIGRhdGEpeyByZXR1cm4gYmluYjJiNjQoY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKSk7fVxuZnVuY3Rpb24gc3RyX2htYWNfc2hhMShrZXksIGRhdGEpeyByZXR1cm4gYmluYjJzdHIoY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKSk7fVxuXG4vKlxuICogUGVyZm9ybSBhIHNpbXBsZSBzZWxmLXRlc3QgdG8gc2VlIGlmIHRoZSBWTSBpcyB3b3JraW5nXG4gKi9cbmZ1bmN0aW9uIHNoYTFfdm1fdGVzdCgpXG57XG4gIHJldHVybiBoZXhfc2hhMShcImFiY1wiKSA9PSBcImE5OTkzZTM2NDcwNjgxNmFiYTNlMjU3MTc4NTBjMjZjOWNkMGQ4OWRcIjtcbn1cblxuLypcbiAqIENhbGN1bGF0ZSB0aGUgU0hBLTEgb2YgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aFxuICovXG5mdW5jdGlvbiBjb3JlX3NoYTEoeCwgbGVuKVxue1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGxlbiAlIDMyKTtcbiAgeFsoKGxlbiArIDY0ID4+IDkpIDw8IDQpICsgMTVdID0gbGVuO1xuXG4gIHZhciB3ID0gQXJyYXkoODApO1xuICB2YXIgYSA9ICAxNzMyNTg0MTkzO1xuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gIHZhciBkID0gIDI3MTczMzg3ODtcbiAgdmFyIGUgPSAtMTAwOTU4OTc3NjtcblxuICBmb3IodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpXG4gIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgdmFyIG9sZGUgPSBlO1xuXG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDgwOyBqKyspXG4gICAge1xuICAgICAgaWYoaiA8IDE2KSB3W2pdID0geFtpICsgal07XG4gICAgICBlbHNlIHdbal0gPSByb2wod1tqLTNdIF4gd1tqLThdIF4gd1tqLTE0XSBeIHdbai0xNl0sIDEpO1xuICAgICAgdmFyIHQgPSBzYWZlX2FkZChzYWZlX2FkZChyb2woYSwgNSksIHNoYTFfZnQoaiwgYiwgYywgZCkpLFxuICAgICAgICAgICAgICAgICAgICAgICBzYWZlX2FkZChzYWZlX2FkZChlLCB3W2pdKSwgc2hhMV9rdChqKSkpO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSByb2woYiwgMzApO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gdDtcbiAgICB9XG5cbiAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XG4gICAgZSA9IHNhZmVfYWRkKGUsIG9sZGUpO1xuICB9XG4gIHJldHVybiBBcnJheShhLCBiLCBjLCBkLCBlKTtcblxufVxuXG4vKlxuICogUGVyZm9ybSB0aGUgYXBwcm9wcmlhdGUgdHJpcGxldCBjb21iaW5hdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGN1cnJlbnRcbiAqIGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBzaGExX2Z0KHQsIGIsIGMsIGQpXG57XG4gIGlmKHQgPCAyMCkgcmV0dXJuIChiICYgYykgfCAoKH5iKSAmIGQpO1xuICBpZih0IDwgNDApIHJldHVybiBiIF4gYyBeIGQ7XG4gIGlmKHQgPCA2MCkgcmV0dXJuIChiICYgYykgfCAoYiAmIGQpIHwgKGMgJiBkKTtcbiAgcmV0dXJuIGIgXiBjIF4gZDtcbn1cblxuLypcbiAqIERldGVybWluZSB0aGUgYXBwcm9wcmlhdGUgYWRkaXRpdmUgY29uc3RhbnQgZm9yIHRoZSBjdXJyZW50IGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBzaGExX2t0KHQpXG57XG4gIHJldHVybiAodCA8IDIwKSA/ICAxNTE4NTAwMjQ5IDogKHQgPCA0MCkgPyAgMTg1OTc3NTM5MyA6XG4gICAgICAgICAodCA8IDYwKSA/IC0xODk0MDA3NTg4IDogLTg5OTQ5NzUxNDtcbn1cblxuLypcbiAqIENhbGN1bGF0ZSB0aGUgSE1BQy1TSEExIG9mIGEga2V5IGFuZCBzb21lIGRhdGFcbiAqL1xuZnVuY3Rpb24gY29yZV9obWFjX3NoYTEoa2V5LCBkYXRhKVxue1xuICB2YXIgYmtleSA9IHN0cjJiaW5iKGtleSk7XG4gIGlmKGJrZXkubGVuZ3RoID4gMTYpIGJrZXkgPSBjb3JlX3NoYTEoYmtleSwga2V5Lmxlbmd0aCAqIGNocnN6KTtcblxuICB2YXIgaXBhZCA9IEFycmF5KDE2KSwgb3BhZCA9IEFycmF5KDE2KTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXG4gIHtcbiAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVDNUM1QzVDO1xuICB9XG5cbiAgdmFyIGhhc2ggPSBjb3JlX3NoYTEoaXBhZC5jb25jYXQoc3RyMmJpbmIoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIGNocnN6KTtcbiAgcmV0dXJuIGNvcmVfc2hhMShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTYwKTtcbn1cblxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cbmZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpXG57XG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG59XG5cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cbmZ1bmN0aW9uIHJvbChudW0sIGNudClcbntcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xufVxuXG4vKlxuICogQ29udmVydCBhbiA4LWJpdCBvciAxNi1iaXQgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHNcbiAqIEluIDgtYml0IGZ1bmN0aW9uLCBjaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaS1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cbmZ1bmN0aW9uIHN0cjJiaW5iKHN0cilcbntcbiAgdmFyIGJpbiA9IEFycmF5KCk7XG4gIHZhciBtYXNrID0gKDEgPDwgY2hyc3opIC0gMTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGggKiBjaHJzejsgaSArPSBjaHJzeilcbiAgICBiaW5baT4+NV0gfD0gKHN0ci5jaGFyQ29kZUF0KGkgLyBjaHJzeikgJiBtYXNrKSA8PCAoMzIgLSBjaHJzeiAtIGklMzIpO1xuICByZXR1cm4gYmluO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGJpbmIyc3RyKGJpbilcbntcbiAgdmFyIHN0ciA9IFwiXCI7XG4gIHZhciBtYXNrID0gKDEgPDwgY2hyc3opIC0gMTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJpbi5sZW5ndGggKiAzMjsgaSArPSBjaHJzeilcbiAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYmluW2k+PjVdID4+PiAoMzIgLSBjaHJzeiAtIGklMzIpKSAmIG1hc2spO1xuICByZXR1cm4gc3RyO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgaGV4IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmluYjJoZXgoYmluYXJyYXkpXG57XG4gIHZhciBoZXhfdGFiID0gaGV4Y2FzZSA/IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiIDogXCIwMTIzNDU2Nzg5YWJjZGVmXCI7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYmluYXJyYXkubGVuZ3RoICogNDsgaSsrKVxuICB7XG4gICAgc3RyICs9IGhleF90YWIuY2hhckF0KChiaW5hcnJheVtpPj4yXSA+PiAoKDMgLSBpJTQpKjgrNCkpICYgMHhGKSArXG4gICAgICAgICAgIGhleF90YWIuY2hhckF0KChiaW5hcnJheVtpPj4yXSA+PiAoKDMgLSBpJTQpKjggICkpICYgMHhGKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgYmFzZS02NCBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gYmluYjJiNjQoYmluYXJyYXkpXG57XG4gIHZhciB0YWIgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcbiAgdmFyIHN0ciA9IFwiXCI7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnJheS5sZW5ndGggKiA0OyBpICs9IDMpXG4gIHtcbiAgICB2YXIgdHJpcGxldCA9ICgoKGJpbmFycmF5W2kgICA+PiAyXSA+PiA4ICogKDMgLSAgaSAgICU0KSkgJiAweEZGKSA8PCAxNilcbiAgICAgICAgICAgICAgICB8ICgoKGJpbmFycmF5W2krMSA+PiAyXSA+PiA4ICogKDMgLSAoaSsxKSU0KSkgJiAweEZGKSA8PCA4IClcbiAgICAgICAgICAgICAgICB8ICAoKGJpbmFycmF5W2krMiA+PiAyXSA+PiA4ICogKDMgLSAoaSsyKSU0KSkgJiAweEZGKTtcbiAgICBmb3IodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGkgKiA4ICsgaiAqIDYgPiBiaW5hcnJheS5sZW5ndGggKiAzMikgc3RyICs9IGI2NHBhZDtcbiAgICAgIGVsc2Ugc3RyICs9IHRhYi5jaGFyQXQoKHRyaXBsZXQgPj4gNiooMy1qKSkgJiAweDNGKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn0iLCI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBpbXBvcnQgeyBGZXRjaERhdGEgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9GZXRjaERhdGEuanNcIjtcblxuICBsZXQgUGFyYW1zID0geyBnZW94OiAwLCBnZW95OiAwLCBjb3VudHJ5OiBcImRlZmF1bHRcIiwgZmlyc3RuYW1lOiAnJywgbGFzdG5hbWU6ICcnfTtcbiAgbGV0IEZEYXRhID0gbmV3IEZldGNoRGF0YSgpO1xuICBsZXQgUmV0dXJuUmVnaXN0ZXIgPSB7aWRhY2NvdW50dXNlcjogMH07XG5cbiAgZnVuY3Rpb24gQ291bnRyeSgpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGFzeW5jIChwb3NpdGlvbikgPT4ge1xuICAgICAgICBQYXJhbXMuZ2VveCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgUGFyYW1zLmdlb3kgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICBHZXRDb3VudHJ5KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJObyBzZSBwdWRvIG9idGVuZXIgbGFzIGNvb3JkZW5hZGFzXCIpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIEdldENvdW50cnkoKSB7XG4gICAgLy9kYXRhPVt0aW1lb3V0OjEwXVtvdXQ6anNvbl07aXNfaW4oLTAuMjEyNjMsLTc4LjQxMDUzKS0+LmE7d2F5KHBpdm90LmEpO291dCt0YWdzK2JiO291dCtpZHMrZ2VvbSgtMC4yMTgwMywtNzguNDExMTEsLTAuMjExNDEsLTc4LjQwNTYwKTtyZWxhdGlvbihwaXZvdC5hKTtvdXQrdGFncytiYjtcbiAgICBsZXQgcXVlcnkgPSBgW291dDpqc29uXVt0aW1lb3V0OjEwXTtpc19pbigke1BhcmFtcy5nZW94fSwke1BhcmFtcy5nZW95fSktPi5hO3JlbGF0aW9uKHBpdm90LmEpO291dCB0YWdzIHF0Oyh3YXkoYXJvdW5kOjIwLCR7UGFyYW1zLmdlb3h9LCR7UGFyYW1zLmdlb3l9KTspO291dCB0YWdzIHF0O2A7XG4gICAgbGV0IHIgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vb3ZlcnBhc3MtYXBpLmRlL2FwaS9pbnRlcnByZXRlclwiLCB7XG4gICAgICBjcmVkZW50aWFsczogXCJvbWl0XCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGFjY2VwdDogXCIqLypcIixcbiAgICAgICAgXCJhY2NlcHQtbGFuZ3VhZ2VcIjogXCJlcy1FUyxlcztxPTAuOSxlbjtxPTAuOFwiLFxuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxuICAgICAgICBcInNlYy1mZXRjaC1kZXN0XCI6IFwiZW1wdHlcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtbW9kZVwiOiBcImNvcnNcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtc2l0ZVwiOiBcImNyb3NzLXNpdGVcIixcbiAgICAgIH0sXG4gICAgICByZWZlcnJlcjogYGh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL3F1ZXJ5P2xhdD0ke1BhcmFtcy5nZW94fSZsb249JHtQYXJhbXMuZ2VveX1gLFxuICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXItd2hlbi1kb3duZ3JhZGVcIixcbiAgICAgIC8vXCJib2R5XCI6IGBkYXRhPSU1QnRpbWVvdXQlM0ExMCU1RCU1Qm91dCUzQWpzb24lNUQlM0Jpc19pbigke3RoaXMuUGFyYW1zLmdlb3h9JTJDJHt0aGlzLlBhcmFtcy5nZW95fSktJTNFLmElM0J3YXkocGl2b3QuYSklM0JvdXQrdGFncytiYiUzQm91dCtpZHMrZ2VvbSgke051bWJlcih0aGlzLlBhcmFtcy5nZW94KS50b0ZpeGVkKDUpfSUyQyR7TnVtYmVyKHRoaXMuUGFyYW1zLmdlb3kpLnRvRml4ZWQoNSl9JTJDJHt0aGlzLlBhcmFtcy5nZW94fSUyQyR7dGhpcy5QYXJhbXMuZ2VveX0pJTNCcmVsYXRpb24ocGl2b3QuYSklM0JvdXQrdGFncytiYiUzQmAsXG4gICAgICBib2R5OiBxdWVyeSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9KTtcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHIuanNvbigpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5lbGVtZW50cykgJiYgZGF0YS5lbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0gJiZcbiAgICAgICAgZGF0YS5lbGVtZW50c1swXS50YWdzICYmXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0udGFncy5uYW1lXG4gICAgICApIHtcbiAgICAgICAgUGFyYW1zLmNvdW50cnkgPSBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MubmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBSZWdpc3RlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdHJvLlwiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgRkRhdGEucG9zdChcbiAgICAgICAgXCIvcGdhcGkvdjIvcmVnaXN0ZXIvY29tbXVuaXR5LXNhZmV0eS1wd2FcIixcbiAgICAgICAgUGFyYW1zLFxuICAgICAgICB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgUmV0dXJuUmVnaXN0ZXIgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhSZXR1cm5SZWdpc3Rlcik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIFJldHVyblJlZ2lzdGVyID0ge307XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiBcblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkluaWNpYVwiKTtcbiAgICBDb3VudHJ5KCk7XG4gIH0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuXG5cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XG4gICAgc3JjOiBsb2NhbChcIlNvdXJjZSBTYW5zIFBybyBFeHRyYUxpZ2h0XCIpLCBsb2NhbChcIlNvdXJjZVNhbnNQcm8tRXh0cmFMaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaTk0X3dseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgc3JjOiBsb2NhbChcIlNvdXJjZSBTYW5zIFBybyBMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUxpZ2h0XCIpLFxuICAgICAgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9zb3VyY2VzYW5zcHJvL3YxMy82eEt5ZFNCWUtjU1YtTENvZVFxZlgxUllPbzNpazR6d2x4ZHIudHRmKVxuICAgICAgICBmb3JtYXQoXCJ0cnVldHlwZVwiKTtcbiAgfVxuICAucm9vdCB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5ib2R5IHtcbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIC8qIFdlYktpdCBicm93c2VycyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBNb3ppbGxhIEZpcmVmb3ggNCB0byAxOCAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBNb3ppbGxhIEZpcmVmb3ggMTkrICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBJbnRlcm5ldCBFeHBsb3JlciAxMCsgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAud3JhcHBlciB7XG4gICAgYmFja2dyb3VuZDogIzQ4NzdhZjtcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KFxuICAgICAgbGluZWFyLFxuICAgICAgbGVmdCB0b3AsXG4gICAgICByaWdodCBib3R0b20sXG4gICAgICBmcm9tKCM0ODc3YWYpLFxuICAgICAgdG8oIzEyMjg0YSlcbiAgICApO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20gcmlnaHQsICM0ODc3YWYgMCUsICMxMjI4NGEgMTAwJSk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbiAgLndyYXBwZXIuZm9ybS1zdWNjZXNzIC5jb250YWluZXIgaDEge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDg1cHgpICFpbXBvcnRhbnQ7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDg1cHgpICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiAzMDBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiA4MHB4IDA7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgLmNvbnRhaW5lciBoMSB7XG4gICAgZm9udC1zaXplOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAxcztcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxcztcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLXB1dDtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgZm9udC13ZWlnaHQ6IDIwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIHtcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gICAgei1pbmRleDogOTk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLmxpbmtzX2Jsb2NrIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBwYWRkaW5nOiAxZW07XG4gIH1cblxuICAuZm9ybSBhIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLmZvcm0gYTp2aXNpdGVkIHtcbiAgICBjb2xvcjogZmxvcmFsd2hpdGU7XG4gIH1cbiAgLmZvcm0gaW5wdXQge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGUgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xuICAgIG1hcmdpbjogMCBhdXRvIDEwcHggYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxZW0gIWltcG9ydGFudDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjI1cztcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjI1cztcbiAgICBmb250LXdlaWdodDogMzAwICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgfVxuICAuZm9ybSBpbnB1dDpmb2N1cyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDMwMHB4O1xuICAgIGNvbG9yOiAjMTIyODRhO1xuICB9XG5cbiAgLmJnX2J1YmJsZXMge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgei1pbmRleDogMTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XG4gICAgYm90dG9tOiAtMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNxdWFyZSAyNXMgaW5maW5pdGU7XG4gICAgYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgxKSB7XG4gICAgbGVmdDogMTAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgyKSB7XG4gICAgbGVmdDogMjAlO1xuICAgIHdpZHRoOiA4MHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgzKSB7XG4gICAgbGVmdDogMjUlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDRzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg0KSB7XG4gICAgbGVmdDogNDAlO1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGhlaWdodDogNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDUpIHtcbiAgICBsZWZ0OiA3MCU7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDYpIHtcbiAgICBsZWZ0OiA4MCU7XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogM3M7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg3KSB7XG4gICAgbGVmdDogMzIlO1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBoZWlnaHQ6IDE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDdzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg4KSB7XG4gICAgbGVmdDogNTUlO1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMTVzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMTVzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDkpIHtcbiAgICBsZWZ0OiAyNSU7XG4gICAgd2lkdGg6IDEwcHg7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICBhbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgxMCkge1xuICAgIGxlZnQ6IDkwJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMTFzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMTFzO1xuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzcXVhcmUge1xuICAgIDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzMHZoKSByb3RhdGUoNjAwZGVnKTtcbiAgICB9XG4gIH1cbiAgQGtleWZyYW1lcyBzcXVhcmUge1xuICAgIDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzMHZoKSByb3RhdGUoNjAwZGVnKTtcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJyb290XCI+XG4gIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgxPlJlZ2lzdHJvPC9oMT5cblxuICAgICAgICB7I2lmIFJldHVyblJlZ2lzdGVyLmlkYWNjb3VudHVzZXIgPD0gMH1cbiAgICAgICAgPGRpdiA+XG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICBjbGFzcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gICAgICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZ2VveFwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveH0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW95XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWJyZVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwZWxsaWRvXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cInB3ZFwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb250cmFzZcOxYVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkMlwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb25maXJtZSBDb250cmFzZcOxYVwiXG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cIi9cIj5Mb2dpbjwvYT48L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICBcbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgezplbHNlfVxuPGgyPlxuICB7UmV0dXJuUmVnaXN0ZXIubWVzc2FnZX1cblxuICBcbjwvaDI+XG48ZGl2PlxuICA8ZGl2IGNsYXNzPVwibGlua3NfYmxvY2tcIj48YSBocmVmPVwiL1wiPkxvZ2luPC9hPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibGlua3NfYmxvY2tcIj48YSBocmVmPVwiL1wiPlJlY3VwZXJhciBjbGF2ZTwvYT48L2Rpdj5cbjwvZGl2PlxuICAgICAgICB7L2lmIH1cbiAgICAgICAgICBcblxuXG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiYmdfYnViYmxlc1wiPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICA8L3VsPlxuPC9kaXY+XG4iXSwic291cmNlUm9vdCI6IiJ9