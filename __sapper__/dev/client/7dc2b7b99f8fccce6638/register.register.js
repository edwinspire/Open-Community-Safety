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

  async login(url, user, password) {
    let LStorage = new _Stores_js__WEBPACK_IMPORTED_MODULE_0__["APPLocalStorage"]();
    let pwdoff = await this.digestMessage(user + password);
    try {
      let f = await this.post(
        url,
        {
          username: user,
          pwd: password,
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
	style.id = "svelte-1a2fiz0-style";
	style.textContent = "@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:200;src:local(\"Source Sans Pro ExtraLight\"), local(\"SourceSansPro-ExtraLight\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf)\n        format(\"truetype\")}@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:300;src:local(\"Source Sans Pro Light\"), local(\"SourceSansPro-Light\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf)\n        format(\"truetype\")}.root.svelte-1a2fiz0.svelte-1a2fiz0{box-sizing:border-box;margin:0;padding:0;font-weight:300;display:block}.body.svelte-1a2fiz0.svelte-1a2fiz0{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0::-webkit-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0:-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0::-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0:-ms-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.wrapper.svelte-1a2fiz0.svelte-1a2fiz0{background:#4877af;background:-webkit-gradient(\n      linear,\n      left top,\n      right bottom,\n      from(#4877af),\n      to(#12284a)\n    );background:linear-gradient(to bottom right, #4877af 0%, #12284a 100%);position:absolute;left:0;width:100%;height:100%;overflow:hidden}.wrapper.form-success .container.svelte-1a2fiz0 h1.svelte-1a2fiz0{-webkit-transform:translateY(85px) !important;transform:translateY(85px) !important}.container.svelte-1a2fiz0.svelte-1a2fiz0{max-width:300px;margin:0 auto;padding:80px 0;height:400px;text-align:center}.container.svelte-1a2fiz0 h1.svelte-1a2fiz0{font-size:40px !important;-webkit-transition-duration:1s;transition-duration:1s;-webkit-transition-timing-function:ease-in-put;transition-timing-function:ease-in-put;font-weight:200 !important}.form.svelte-1a2fiz0.svelte-1a2fiz0{padding:20px 0;z-index:99;position:relative}.links_block.svelte-1a2fiz0.svelte-1a2fiz0{text-align:right;padding:1em}.form.svelte-1a2fiz0 a.svelte-1a2fiz0{color:white}.form.svelte-1a2fiz0 a.svelte-1a2fiz0:visited{color:floralwhite}.form.svelte-1a2fiz0 input.svelte-1a2fiz0{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;border:1px solid rgba(255, 255, 255, 0.4);background-color:rgba(255, 255, 255, 0.2);width:-webkit-fill-available !important;border-radius:3px;padding:10px 15px;margin:0 auto 10px auto;display:block;text-align:center;font-size:1em !important;color:white;-webkit-transition-duration:0.25s;transition-duration:0.25s;font-weight:300 !important}.form.svelte-1a2fiz0 input.svelte-1a2fiz0:hover{background-color:rgba(255, 255, 255, 0.4)}.form.svelte-1a2fiz0 input.svelte-1a2fiz0:focus{background-color:white;width:300px;color:#12284a}.bg_bubbles.svelte-1a2fiz0.svelte-1a2fiz0{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0{position:absolute;list-style:none;display:block;width:40px;height:40px;background-color:rgba(255, 255, 255, 0.15);bottom:-160px;-webkit-animation:svelte-1a2fiz0-square 25s infinite;animation:svelte-1a2fiz0-square 25s infinite;-webkit-transition-timing-function:linear;transition-timing-function:linear}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(1){left:10%}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(2){left:20%;width:80px;height:80px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:17s;animation-duration:17s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(3){left:25%;-webkit-animation-delay:4s;animation-delay:4s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(4){left:40%;width:60px;height:60px;-webkit-animation-duration:22s;animation-duration:22s;background-color:rgba(255, 255, 255, 0.25)}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(5){left:70%}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(6){left:80%;width:120px;height:120px;-webkit-animation-delay:3s;animation-delay:3s;background-color:rgba(255, 255, 255, 0.2)}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(7){left:32%;width:160px;height:160px;-webkit-animation-delay:7s;animation-delay:7s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(8){left:55%;width:20px;height:20px;-webkit-animation-delay:15s;animation-delay:15s;-webkit-animation-duration:40s;animation-duration:40s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(9){left:25%;width:10px;height:10px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:40s;animation-duration:40s;background-color:rgba(255, 255, 255, 0.3)}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(10){left:90%;width:160px;height:160px;-webkit-animation-delay:11s;animation-delay:11s}@-webkit-keyframes svelte-1a2fiz0-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}@keyframes svelte-1a2fiz0-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcblxuICBmdW5jdGlvbiBDb3VudHJ5KCkge1xuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oYXN5bmMgKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIFBhcmFtcy5nZW94ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICBQYXJhbXMuZ2VveSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIEdldENvdW50cnkoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gUmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3Ryby5cIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLnBvc3QoXG4gICAgICAgIFwiL3BnYXBpL3YyL3JlZ2lzdGVyL2NvbW11bml0eS1zYWZldHktcHdhXCIsXG4gICAgICAgIFBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBHZXRDb3VudHJ5KCkge1xuICAgIC8vZGF0YT1bdGltZW91dDoxMF1bb3V0Ompzb25dO2lzX2luKC0wLjIxMjYzLC03OC40MTA1MyktPi5hO3dheShwaXZvdC5hKTtvdXQrdGFncytiYjtvdXQraWRzK2dlb20oLTAuMjE4MDMsLTc4LjQxMTExLC0wLjIxMTQxLC03OC40MDU2MCk7cmVsYXRpb24ocGl2b3QuYSk7b3V0K3RhZ3MrYmI7XG4gICAgbGV0IHF1ZXJ5ID0gYFtvdXQ6anNvbl1bdGltZW91dDoxMF07aXNfaW4oJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pLT4uYTtyZWxhdGlvbihwaXZvdC5hKTtvdXQgdGFncyBxdDsod2F5KGFyb3VuZDoyMCwke1BhcmFtcy5nZW94fSwke1BhcmFtcy5nZW95fSk7KTtvdXQgdGFncyBxdDtgO1xuICAgIGxldCByID0gYXdhaXQgZmV0Y2goXCJodHRwczovL292ZXJwYXNzLWFwaS5kZS9hcGkvaW50ZXJwcmV0ZXJcIiwge1xuICAgICAgY3JlZGVudGlhbHM6IFwib21pdFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBhY2NlcHQ6IFwiKi8qXCIsXG4gICAgICAgIFwiYWNjZXB0LWxhbmd1YWdlXCI6IFwiZXMtRVMsZXM7cT0wLjksZW47cT0wLjhcIixcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtZGVzdFwiOiBcImVtcHR5XCIsXG4gICAgICAgIFwic2VjLWZldGNoLW1vZGVcIjogXCJjb3JzXCIsXG4gICAgICAgIFwic2VjLWZldGNoLXNpdGVcIjogXCJjcm9zcy1zaXRlXCIsXG4gICAgICB9LFxuICAgICAgcmVmZXJyZXI6IGBodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9xdWVyeT9sYXQ9JHtQYXJhbXMuZ2VveH0mbG9uPSR7UGFyYW1zLmdlb3l9YCxcbiAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlXCIsXG4gICAgICAvL1wiYm9keVwiOiBgZGF0YT0lNUJ0aW1lb3V0JTNBMTAlNUQlNUJvdXQlM0Fqc29uJTVEJTNCaXNfaW4oJHt0aGlzLlBhcmFtcy5nZW94fSUyQyR7dGhpcy5QYXJhbXMuZ2VveX0pLSUzRS5hJTNCd2F5KHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JvdXQraWRzK2dlb20oJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveCkudG9GaXhlZCg1KX0lMkMke051bWJlcih0aGlzLlBhcmFtcy5nZW95KS50b0ZpeGVkKDUpfSUyQyR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KSUzQnJlbGF0aW9uKHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JgLFxuICAgICAgYm9keTogcXVlcnksXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCByLmpzb24oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZWxlbWVudHMpICYmIGRhdGEuZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdICYmXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0udGFncyAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MubmFtZVxuICAgICAgKSB7XG4gICAgICAgIFBhcmFtcy5jb3VudHJ5ID0gZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbmljaWFcIik7XG4gICAgQ291bnRyeSgpO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gRXh0cmFMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUV4dHJhTGlnaHRcIiksXG4gICAgICB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3NvdXJjZXNhbnNwcm8vdjEzLzZ4S3lkU0JZS2NTVi1MQ29lUXFmWDFSWU9vM2k5NF93bHhkci50dGYpXG4gICAgICAgIGZvcm1hdChcInRydWV0eXBlXCIpO1xuICB9XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gTGlnaHRcIiksIGxvY2FsKFwiU291cmNlU2Fuc1Byby1MaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaWs0endseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgLnJvb3Qge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAuYm9keSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBXZWJLaXQgYnJvd3NlcnMgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDQgdG8gMTggKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDE5KyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTArICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLndyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICM0ODc3YWY7XG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChcbiAgICAgIGxpbmVhcixcbiAgICAgIGxlZnQgdG9wLFxuICAgICAgcmlnaHQgYm90dG9tLFxuICAgICAgZnJvbSgjNDg3N2FmKSxcbiAgICAgIHRvKCMxMjI4NGEpXG4gICAgKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCAjNDg3N2FmIDAlLCAjMTIyODRhIDEwMCUpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIC53cmFwcGVyLmZvcm0tc3VjY2VzcyAuY29udGFpbmVyIGgxIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogODBweCAwO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5jb250YWluZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogNDBweCAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tcHV0O1xuICAgIGZvbnQtd2VpZ2h0OiAyMDAgIWltcG9ydGFudDtcbiAgfVxuICAuZm9ybSB7XG4gICAgcGFkZGluZzogMjBweCAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5saW5rc19ibG9jayB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMWVtO1xuICB9XG5cbiAgLmZvcm0gYSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG4gIC5mb3JtIGE6dmlzaXRlZCB7XG4gICAgY29sb3I6IGZsb3JhbHdoaXRlO1xuICB9XG4gIC5mb3JtIGlucHV0IHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMWVtICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgZm9udC13ZWlnaHQ6IDMwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIGlucHV0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBjb2xvcjogIzEyMjg0YTtcbiAgfVxuXG4gIC5iZ19idWJibGVzIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xuICAgIGJvdHRvbTogLTE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xuICAgIGxlZnQ6IDEwJTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xuICAgIGxlZnQ6IDIwJTtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMykge1xuICAgIGxlZnQ6IDI1JTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogNHM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNCkge1xuICAgIGxlZnQ6IDQwJTtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XG4gICAgbGVmdDogNzAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg2KSB7XG4gICAgbGVmdDogODAlO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAzcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNykge1xuICAgIGxlZnQ6IDMyJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogN3M7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoOCkge1xuICAgIGxlZnQ6IDU1JTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg5KSB7XG4gICAgbGVmdDogMjUlO1xuICAgIHdpZHRoOiAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcbiAgICBsZWZ0OiA5MCU7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGhlaWdodDogMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDExcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDExcztcbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG4gIEBrZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwicm9vdFwiPlxuICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMT5SZWdpc3RybzwvaDE+XG48ZGl2IHN0eWxlPVwiXCI+XG4gIDxmb3JtXG4gIGNsYXNzPVwiZm9ybVwiXG4gIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gIG1ldGhvZD1cInBvc3RcIlxuICBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e1JlZ2lzdGVyfT5cbiAgPGlucHV0XG4gICAgbmFtZT1cImdlb3hcIlxuICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmdlb3h9IC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJnZW95XCJcbiAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICBwbGFjZWhvbGRlcj1cIkdlb3lcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwiY291bnRyeVwiXG4gICAgdHlwZT1cInRleHRcIlxuICAgIHJlYWRvbmx5XG4gICAgcGxhY2Vob2xkZXI9XCJDb3VudHJ5XCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cImZpcnN0bmFtZVwiXG4gICAgdHlwZT1cImhpZGRlblwiXG4gICAgcGxhY2Vob2xkZXI9XCJOb21icmVcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5maXJzdG5hbWV9XG4gICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJsYXN0bmFtZVwiXG4gICAgdHlwZT1cImhpZGRlblwiXG4gICAgcGxhY2Vob2xkZXI9XCJBcGVsbGlkb1wiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmxhc3RuYW1lfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwiZW1haWxcIlxuICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgcGxhY2Vob2xkZXI9XCJFbWFpbFwiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmVtYWlsfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwicHdkXCJcbiAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgIHBsYWNlaG9sZGVyPVwiQ29udHJhc2XDsWFcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5wd2R9XG4gICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJwd2QyXCJcbiAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgIHBsYWNlaG9sZGVyPVwiQ29uZmlybWUgQ29udHJhc2XDsWFcIlxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gIDxkaXYgY2xhc3M9XCJsaW5rc19ibG9ja1wiPjxhIGhyZWY9XCJsb2dpblwiPkxvZ2luPC9hPjwvZGl2PlxuPC9mb3JtPlxuXG48L2Rpdj5cblxuICAgICAgICA8Zm9ybVxuICAgICAgICAgIGNsYXNzPVwiZm9ybVwiXG4gICAgICAgICAgYWN0aW9uPVwiL3BnYXBpL3YyL3JlZ2lzdGVyXCJcbiAgICAgICAgICBtZXRob2Q9XCJwb3N0XCJcbiAgICAgICAgICBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e1JlZ2lzdGVyfT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW94XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW94XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW94fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImdlb3lcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkdlb3lcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmdlb3l9IC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiY291bnRyeVwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb3VudHJ5XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5jb3VudHJ5fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImZpcnN0bmFtZVwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTm9tYnJlXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5maXJzdG5hbWV9XG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJsYXN0bmFtZVwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQXBlbGxpZG9cIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmxhc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmVtYWlsfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkXCJcbiAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvbnRyYXNlw7FhXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5wd2R9XG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJwd2QyXCJcbiAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvbmZpcm1lIENvbnRyYXNlw7FhXCJcbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwicmVnaXN0ZXJcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJBY2VwdGFyXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlua3NfYmxvY2tcIj48YSBocmVmPVwibG9naW5cIj5Mb2dpbjwvYT48L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8dWwgY2xhc3M9XCJiZ19idWJibGVzXCI+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gIDwvdWw+XG48L2Rpdj5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErRUUsVUFBVSxBQUFDLENBQUMsQUFDVixXQUFXLENBQUUsaUJBQWlCLENBQzlCLFVBQVUsQ0FBRSxNQUFNLENBQ2xCLFdBQVcsQ0FBRSxHQUFHLENBQ2hCLEdBQUcsQ0FBRSxNQUFNLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxNQUFNLDBCQUEwQixDQUFDLENBQUM7TUFDMUUsSUFBSSxzRkFBc0YsQ0FBQztRQUN6RixPQUFPLFVBQVUsQ0FBQyxBQUN4QixDQUFDLEFBQ0QsVUFBVSxBQUFDLENBQUMsQUFDVixXQUFXLENBQUUs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 */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function create_fragment(ctx) {
	let div6;
	let div5;
	let div4;
	let div3;
	let h1;
	let t0;
	let t1;
	let div1;
	let form0;
	let input0;
	let t2;
	let input1;
	let t3;
	let input2;
	let t4;
	let input3;
	let t5;
	let input4;
	let t6;
	let input5;
	let t7;
	let input6;
	let t8;
	let input7;
	let t9;
	let input8;
	let t10;
	let div0;
	let a0;
	let t11;
	let t12;
	let form1;
	let input9;
	let t13;
	let input10;
	let t14;
	let input11;
	let t15;
	let input12;
	let t16;
	let input13;
	let t17;
	let input14;
	let t18;
	let input15;
	let t19;
	let input16;
	let t20;
	let input17;
	let t21;
	let div2;
	let a1;
	let t22;
	let t23;
	let ul;
	let li0;
	let t24;
	let li1;
	let t25;
	let li2;
	let t26;
	let li3;
	let t27;
	let li4;
	let t28;
	let li5;
	let t29;
	let li6;
	let t30;
	let li7;
	let t31;
	let li8;
	let t32;
	let li9;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Registro");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			form0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("form");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Login");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			form1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("form");
			input9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Login");
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("ul");
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t27 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t28 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t29 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			this.h();
		},
		l: function claim(nodes) {
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div6);
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "H1", { class: true });
			var h1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h1_nodes, "Registro");
			h1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { style: true, class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			form0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "FORM", { class: true, action: true, method: true });
			var form0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(form0);

			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				readonly: true,
				placeholder: true,
				class: true
			});

			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);

			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "INPUT", {
				name: true,
				type: true,
				value: true,
				class: true
			});

			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form0_nodes);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form0_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "A", { href: true, class: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a0_nodes, "Login");
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			form0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			form1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "FORM", { class: true, action: true, method: true });
			var form1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(form1);

			input9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				readonly: true,
				placeholder: true,
				class: true
			});

			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);

			input17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "INPUT", {
				name: true,
				type: true,
				value: true,
				class: true
			});

			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form1_nodes);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form1_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "A", { href: true, class: true });
			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a1_nodes, "Login");
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			form1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t23 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div6_nodes);
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "UL", { class: true });
			var ul_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(ul);
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t24 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t25 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t26 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li3).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t27 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li4).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t28 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li5).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t29 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li6).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t30 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li7).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t31 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li8).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t32 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li9).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			ul_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 329, 8, 8553);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "name", "geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "placeholder", "Geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input0, file, 336, 2, 8696);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "name", "geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "placeholder", "Geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input1, file, 341, 2, 8794);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "name", "country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "type", "text");
			input2.readOnly = true;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "placeholder", "Country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input2, file, 346, 2, 8892);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "name", "firstname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "placeholder", "Nombre");
			input3.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input3, file, 352, 2, 9010);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "name", "lastname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "placeholder", "Apellido");
			input4.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input4, file, 358, 2, 9144);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "name", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "type", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "placeholder", "Email");
			input5.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input5, file, 364, 2, 9278);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "name", "pwd");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "placeholder", "Contraseña");
			input6.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input6, file, 370, 2, 9402);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "name", "pwd2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "placeholder", "Confirme Contraseña");
			input7.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input7, file, 376, 2, 9530);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "name", "register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "type", "submit");
			input8.value = "Aceptar";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input8, file, 381, 2, 9640);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "login");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 382, 27, 9723);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "links_block svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 382, 2, 9698);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form0, "class", "form svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form0, "action", "/pgapi/v2/register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form0, "method", "post");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form0, file, 331, 2, 8588);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 330, 0, 8571);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input9, "name", "geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input9, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input9, "placeholder", "Geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input9, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input9, file, 392, 10, 9928);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input10, "name", "geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input10, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input10, "placeholder", "Geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input10, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input10, file, 397, 10, 10066);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input11, "name", "country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input11, "type", "text");
			input11.readOnly = true;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input11, "placeholder", "Country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input11, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input11, file, 402, 10, 10204);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input12, "name", "firstname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input12, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input12, "placeholder", "Nombre");
			input12.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input12, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input12, file, 408, 10, 10370);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input13, "name", "lastname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input13, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input13, "placeholder", "Apellido");
			input13.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input13, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input13, file, 414, 10, 10552);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input14, "name", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input14, "type", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input14, "placeholder", "Email");
			input14.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input14, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input14, file, 420, 10, 10734);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input15, "name", "pwd");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input15, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input15, "placeholder", "Contraseña");
			input15.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input15, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input15, file, 426, 10, 10906);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input16, "name", "pwd2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input16, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input16, "placeholder", "Confirme Contraseña");
			input16.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input16, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input16, file, 432, 10, 11082);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input17, "name", "register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input17, "type", "submit");
			input17.value = "Aceptar";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input17, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input17, file, 437, 10, 11232);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "href", "login");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 438, 35, 11323);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "links_block svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 438, 10, 11298);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form1, "class", "form svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form1, "action", "/pgapi/v2/register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form1, "method", "post");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form1, file, 387, 8, 9780);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "container svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 328, 6, 8521);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "wrapper svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 327, 4, 8493);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "body svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 326, 2, 8470);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li0, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li0, file, 444, 4, 11434);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li1, file, 445, 4, 11445);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li2, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li2, file, 446, 4, 11456);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li3, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li3, file, 447, 4, 11467);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li4, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li4, file, 448, 4, 11478);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li5, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li5, file, 449, 4, 11489);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li6, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li6, file, 450, 4, 11500);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li7, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li7, file, 451, 4, 11511);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li8, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li8, file, 452, 4, 11522);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li9, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li9, file, 453, 4, 11533);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(ul, "class", "bg_bubbles svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(ul, file, 443, 2, 11406);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "root svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 325, 0, 8449);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div6, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, h1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, form0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*Params*/ ctx[0].geox);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*Params*/ ctx[0].geoy);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input2, /*Params*/ ctx[0].country);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input3, /*Params*/ ctx[0].firstname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input4, /*Params*/ ctx[0].lastname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input5, /*Params*/ ctx[0].email);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input6, /*Params*/ ctx[0].pwd);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, input8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form0, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, a0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, form1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input9, /*Params*/ ctx[0].geox);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input10, /*Params*/ ctx[0].geoy);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input11, /*Params*/ ctx[0].country);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input12, /*Params*/ ctx[0].firstname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input13, /*Params*/ ctx[0].lastname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input14, /*Params*/ ctx[0].email);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input15, /*Params*/ ctx[0].pwd);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t20);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, input17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form1, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, a1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t22);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, t23);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div6, ul);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t24);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t25);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t26);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t27);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t28);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t29);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t30);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t31);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t32);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li9);

			if (!mounted) {
				dispose = [
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input0, "input", /*input0_input_handler*/ ctx[2]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input1, "input", /*input1_input_handler*/ ctx[3]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input2, "input", /*input2_input_handler*/ ctx[4]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input3, "input", /*input3_input_handler*/ ctx[5]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input4, "input", /*input4_input_handler*/ ctx[6]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input5, "input", /*input5_input_handler*/ ctx[7]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input6, "input", /*input6_input_handler*/ ctx[8]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(form0, "submit", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prevent_default"])(/*Register*/ ctx[1]), false, true, false),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input9, "input", /*input9_input_handler*/ ctx[9]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input10, "input", /*input10_input_handler*/ ctx[10]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input11, "input", /*input11_input_handler*/ ctx[11]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input12, "input", /*input12_input_handler*/ ctx[12]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input13, "input", /*input13_input_handler*/ ctx[13]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input14, "input", /*input14_input_handler*/ ctx[14]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input15, "input", /*input15_input_handler*/ ctx[15]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(form1, "submit", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prevent_default"])(/*Register*/ ctx[1]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
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

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input9, /*Params*/ ctx[0].geox);
			}

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input10, /*Params*/ ctx[0].geoy);
			}

			if (dirty & /*Params*/ 1 && input11.value !== /*Params*/ ctx[0].country) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input11, /*Params*/ ctx[0].country);
			}

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input12, /*Params*/ ctx[0].firstname);
			}

			if (dirty & /*Params*/ 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input13, /*Params*/ ctx[0].lastname);
			}

			if (dirty & /*Params*/ 1 && input14.value !== /*Params*/ ctx[0].email) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input14, /*Params*/ ctx[0].email);
			}

			if (dirty & /*Params*/ 1 && input15.value !== /*Params*/ ctx[0].pwd) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input15, /*Params*/ ctx[0].pwd);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div6);
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
	let Params = {
		geox: 0,
		geoy: 0,
		country: "default",
		firstname: "",
		lastname: ""
	};

	let FData = new _components_FetchData_js__WEBPACK_IMPORTED_MODULE_2__["FetchData"]();

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

	async function Register() {
		console.log("Registro.");

		try {
			const res = await FData.post("/pgapi/v2/register/community-safety-pwa", Params, { "Content-Type": "application/json" });

			if (res.ok) {
				let data = await res.json();
				console.log(data);
			}
		} catch(error) {
			console.log(error);
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

	function input9_input_handler() {
		Params.geox = this.value;
		$$invalidate(0, Params);
	}

	function input10_input_handler() {
		Params.geoy = this.value;
		$$invalidate(0, Params);
	}

	function input11_input_handler() {
		Params.country = this.value;
		$$invalidate(0, Params);
	}

	function input12_input_handler() {
		Params.firstname = this.value;
		$$invalidate(0, Params);
	}

	function input13_input_handler() {
		Params.lastname = this.value;
		$$invalidate(0, Params);
	}

	function input14_input_handler() {
		Params.email = this.value;
		$$invalidate(0, Params);
	}

	function input15_input_handler() {
		Params.pwd = this.value;
		$$invalidate(0, Params);
	}

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		FetchData: _components_FetchData_js__WEBPACK_IMPORTED_MODULE_2__["FetchData"],
		Params,
		FData,
		Country,
		Register,
		GetCountry
	});

	$$self.$inject_state = $$props => {
		if ("Params" in $$props) $$invalidate(0, Params = $$props.Params);
		if ("FData" in $$props) FData = $$props.FData;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		Params,
		Register,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		input3_input_handler,
		input4_input_handler,
		input5_input_handler,
		input6_input_handler,
		input9_input_handler,
		input10_input_handler,
		input11_input_handler,
		input12_input_handler,
		input13_input_handler,
		input14_input_handler,
		input15_input_handler
	];
}

class Register_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1a2fiz0-style")) add_css();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2hhMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3JlZ2lzdGVyL2luZGV4LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQzs7O0FBR3hDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsdUJBQXVCLDBEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQSwyRUFBMkU7QUFDM0UsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxXQUFXLHlEQUFRO0FBQ25CO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4SEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7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RixjQUFjLEVBQUUsNEJBQTRCOztHQUU1QyxJQUFJLEVBQUUsS0FBSztHQUNYLE1BQU0sRUFBRSxNQUFNO0dBQ2QsSUFBSSxFQUFFLE1BQU07OztNQUVWLElBQUksU0FBUyxDQUFDLENBQUMsSUFBSTs7TUFFbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7T0FFeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFFMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSTs7Ozs7Q0FLakQsc0RBQU87RUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7RUFDcEIsT0FBTzs7Ozs7Ozs7Ozs7OztFQTBRSyxNQUFNLENBQUMsSUFBSTs7Ozs7RUFLWCxNQUFNLENBQUMsSUFBSTs7Ozs7RUFNWCxNQUFNLENBQUMsT0FBTzs7Ozs7RUFLZCxNQUFNLENBQUMsU0FBUzs7Ozs7RUFNaEIsTUFBTSxDQUFDLFFBQVE7Ozs7O0VBTWYsTUFBTSxDQUFDLEtBQUs7Ozs7O0VBTVosTUFBTSxDQUFDLEdBQUc7Ozs7O0VBc0JGLE1BQU0sQ0FBQyxJQUFJOzs7OztFQUtYLE1BQU0sQ0FBQyxJQUFJOzs7OztFQU1YLE1BQU0sQ0FBQyxPQUFPOzs7OztFQUtkLE1BQU0sQ0FBQyxTQUFTOzs7OztFQU1oQixNQUFNLENBQUMsUUFBUTs7Ozs7RUFNZixNQUFNLENBQUMsS0FBSzs7Ozs7RUFNWixNQUFNLENBQUMsR0FBRyIsImZpbGUiOiI3ZGMyYjdiOTlmOGZjY2NlNjYzOC9yZWdpc3Rlci5yZWdpc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL1N0b3Jlcy5qc1wiO1xuaW1wb3J0IHsgaGV4X3NoYTEsIHN0cl9zaGExIH0gZnJvbSBcIi4vc2hhMS5qc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBGZXRjaERhdGEge1xuICBhc3luYyBwdXQodXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgLy9jYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy9jb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcG9zdCh1cmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICB0cnkge1xuICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICAvL2NhY2hlLnB1dChldmVudC5yZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAvL2NvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XG4gICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZ2V0KHVybCwgcXVlcnksIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2hVUkwgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICAgIGxldCB1cmxxID0gdXJsICsgXCI/XCIgKyBzZWFyY2hVUkwudG9TdHJpbmcoKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJscSwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgXG4gIH1cblxuICBhc3luYyBsb2dpbih1cmwsIHVzZXIsIHBhc3N3b3JkKSB7XG4gICAgbGV0IExTdG9yYWdlID0gbmV3IEFQUExvY2FsU3RvcmFnZSgpO1xuICAgIGxldCBwd2RvZmYgPSBhd2FpdCB0aGlzLmRpZ2VzdE1lc3NhZ2UodXNlciArIHBhc3N3b3JkKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGYgPSBhd2FpdCB0aGlzLnBvc3QoXG4gICAgICAgIHVybCxcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLFxuICAgICAgICAgIHB3ZDogcGFzc3dvcmQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKGYpO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmLmpzb24oKTtcblxuICAgICAgZGF0YS5vZmZsaW5lID0gcHdkb2ZmO1xuICAgICAgTFN0b3JhZ2Uuc2V0VXNlcihkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLnRyYWNlKGVycm9yKTtcbiAgICAgIGxldCBkYXRhID0ge307XG4gICAgICBkYXRhLmxvZ2luID0gZmFsc2U7XG4gICAgICBsZXQgdXNlciA9IExTdG9yYWdlLmdldFVzZXIoZGF0YSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuXG4gICAgICBpZiAodXNlci5vZmZsaW5lID09IHB3ZG9mZikge1xuICAgICAgICBkYXRhID0gdXNlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGlnZXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgLypcbiAgICAgICAgY29uc29sZS5sb2coaGV4X3NoYTEoJ2hvbGEnKSwgc3RyX3NoYTEoJ2hvbGEnKSk7XG4gICAgICAgIGNvbnN0IG1zZ1VpbnQ4ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1lc3NhZ2UpOyAvLyBlbmNvZGUgYXMgKHV0Zi04KSBVaW50OEFycmF5XG4gICAgICAgIGNvbnNvbGUubG9nKGNyeXB0byk7XG4gICAgICAgIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgbXNnVWludDgpOyAvLyBoYXNoIHRoZSBtZXNzYWdlXG4gICAgICAgIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpOyAvLyBjb252ZXJ0IGJ1ZmZlciB0byBieXRlIGFycmF5XG4gICAgICAgIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXlcbiAgICAgICAgICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgICAgIC5qb2luKFwiXCIpOyAvLyBjb252ZXJ0IGJ5dGVzIHRvIGhleCBzdHJpbmdcbiAgICAgICAgICAgICovXG4gICAgcmV0dXJuIGhleF9zaGExKG1lc3NhZ2UpO1xuICB9XG59XG4iLCIvKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vKlxuICogQ29uZmlndXJhYmxlIHZhcmlhYmxlcy4gWW91IG1heSBuZWVkIHRvIHR3ZWFrIHRoZXNlIHRvIGJlIGNvbXBhdGlibGUgd2l0aFxuICogdGhlIHNlcnZlci1zaWRlLCBidXQgdGhlIGRlZmF1bHRzIHdvcmsgaW4gbW9zdCBjYXNlcy5cbiAqL1xudmFyIGhleGNhc2UgPSAwOyAgLyogaGV4IG91dHB1dCBmb3JtYXQuIDAgLSBsb3dlcmNhc2U7IDEgLSB1cHBlcmNhc2UgICAgICAgICovXG52YXIgYjY0cGFkICA9IFwiXCI7IC8qIGJhc2UtNjQgcGFkIGNoYXJhY3Rlci4gXCI9XCIgZm9yIHN0cmljdCBSRkMgY29tcGxpYW5jZSAgICovXG52YXIgY2hyc3ogICA9IDg7ICAvKiBiaXRzIHBlciBpbnB1dCBjaGFyYWN0ZXIuIDggLSBBU0NJSTsgMTYgLSBVbmljb2RlICAgICAgKi9cblxuLypcbiAqIFRoZXNlIGFyZSB0aGUgZnVuY3Rpb25zIHlvdSdsbCB1c3VhbGx5IHdhbnQgdG8gY2FsbFxuICogVGhleSB0YWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgaGV4IG9yIGJhc2UtNjQgZW5jb2RlZCBzdHJpbmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZXhfc2hhMShzKXtyZXR1cm4gYmluYjJoZXgoY29yZV9zaGExKHN0cjJiaW5iKHMpLHMubGVuZ3RoICogY2hyc3opKTt9XG5leHBvcnQgZnVuY3Rpb24gYjY0X3NoYTEocyl7cmV0dXJuIGJpbmIyYjY0KGNvcmVfc2hhMShzdHIyYmluYihzKSxzLmxlbmd0aCAqIGNocnN6KSk7fVxuZXhwb3J0IGZ1bmN0aW9uIHN0cl9zaGExKHMpe3JldHVybiBiaW5iMnN0cihjb3JlX3NoYTEoc3RyMmJpbmIocykscy5sZW5ndGggKiBjaHJzeikpO31cbmZ1bmN0aW9uIGhleF9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyaGV4KGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cbmZ1bmN0aW9uIGI2NF9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyYjY0KGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cbmZ1bmN0aW9uIHN0cl9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyc3RyKGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cblxuLypcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xuICovXG5mdW5jdGlvbiBzaGExX3ZtX3Rlc3QoKVxue1xuICByZXR1cm4gaGV4X3NoYTEoXCJhYmNcIikgPT0gXCJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkXCI7XG59XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIFNIQS0xIG9mIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9zaGExKHgsIGxlbilcbntcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsZW4gJSAzMik7XG4gIHhbKChsZW4gKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGxlbjtcblxuICB2YXIgdyA9IEFycmF5KDgwKTtcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XG4gIHZhciBlID0gLTEwMDk1ODk3NzY7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxuICB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIHZhciBvbGRlID0gZTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCA4MDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGogPCAxNikgd1tqXSA9IHhbaSArIGpdO1xuICAgICAgZWxzZSB3W2pdID0gcm9sKHdbai0zXSBeIHdbai04XSBeIHdbai0xNF0gXiB3W2otMTZdLCAxKTtcbiAgICAgIHZhciB0ID0gc2FmZV9hZGQoc2FmZV9hZGQocm9sKGEsIDUpLCBzaGExX2Z0KGosIGIsIGMsIGQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgc2FmZV9hZGQoc2FmZV9hZGQoZSwgd1tqXSksIHNoYTFfa3QoaikpKTtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gcm9sKGIsIDMwKTtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHQ7XG4gICAgfVxuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgIGUgPSBzYWZlX2FkZChlLCBvbGRlKTtcbiAgfVxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCwgZSk7XG5cbn1cblxuLypcbiAqIFBlcmZvcm0gdGhlIGFwcHJvcHJpYXRlIHRyaXBsZXQgY29tYmluYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBjdXJyZW50XG4gKiBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9mdCh0LCBiLCBjLCBkKVxue1xuICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgaWYodCA8IDQwKSByZXR1cm4gYiBeIGMgXiBkO1xuICBpZih0IDwgNjApIHJldHVybiAoYiAmIGMpIHwgKGIgJiBkKSB8IChjICYgZCk7XG4gIHJldHVybiBiIF4gYyBeIGQ7XG59XG5cbi8qXG4gKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9rdCh0KVxue1xuICByZXR1cm4gKHQgPCAyMCkgPyAgMTUxODUwMDI0OSA6ICh0IDwgNDApID8gIDE4NTk3NzUzOTMgOlxuICAgICAgICAgKHQgPCA2MCkgPyAtMTg5NDAwNzU4OCA6IC04OTk0OTc1MTQ7XG59XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIEhNQUMtU0hBMSBvZiBhIGtleSBhbmQgc29tZSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSlcbntcbiAgdmFyIGJrZXkgPSBzdHIyYmluYihrZXkpO1xuICBpZihia2V5Lmxlbmd0aCA+IDE2KSBia2V5ID0gY29yZV9zaGExKGJrZXksIGtleS5sZW5ndGggKiBjaHJzeik7XG5cbiAgdmFyIGlwYWQgPSBBcnJheSgxNiksIG9wYWQgPSBBcnJheSgxNik7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKVxuICB7XG4gICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgfVxuXG4gIHZhciBoYXNoID0gY29yZV9zaGExKGlwYWQuY29uY2F0KHN0cjJiaW5iKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiBjaHJzeik7XG4gIHJldHVybiBjb3JlX3NoYTEob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDE2MCk7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxue1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiByb2wobnVtLCBjbnQpXG57XG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gOC1iaXQgb3IgMTYtYml0IHN0cmluZyB0byBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzXG4gKiBJbiA4LWJpdCBmdW5jdGlvbiwgY2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGktYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5mdW5jdGlvbiBzdHIyYmluYihzdHIpXG57XG4gIHZhciBiaW4gPSBBcnJheSgpO1xuICB2YXIgbWFzayA9ICgxIDw8IGNocnN6KSAtIDE7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoICogY2hyc3o7IGkgKz0gY2hyc3opXG4gICAgYmluW2k+PjVdIHw9IChzdHIuY2hhckNvZGVBdChpIC8gY2hyc3opICYgbWFzaykgPDwgKDMyIC0gY2hyc3ogLSBpJTMyKTtcbiAgcmV0dXJuIGJpbjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBiaW5iMnN0cihiaW4pXG57XG4gIHZhciBzdHIgPSBcIlwiO1xuICB2YXIgbWFzayA9ICgxIDw8IGNocnN6KSAtIDE7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW4ubGVuZ3RoICogMzI7IGkgKz0gY2hyc3opXG4gICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGJpbltpPj41XSA+Pj4gKDMyIC0gY2hyc3ogLSBpJTMyKSkgJiBtYXNrKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIGhleCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJpbmIyaGV4KGJpbmFycmF5KVxue1xuICB2YXIgaGV4X3RhYiA9IGhleGNhc2UgPyBcIjAxMjM0NTY3ODlBQkNERUZcIiA6IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xuICB2YXIgc3RyID0gXCJcIjtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFycmF5Lmxlbmd0aCAqIDQ7IGkrKylcbiAge1xuICAgIHN0ciArPSBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKCgzIC0gaSU0KSo4KzQpKSAmIDB4RikgK1xuICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKCgzIC0gaSU0KSo4ICApKSAmIDB4Rik7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIGJhc2UtNjQgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGJpbmIyYjY0KGJpbmFycmF5KVxue1xuICB2YXIgdGFiID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYmluYXJyYXkubGVuZ3RoICogNDsgaSArPSAzKVxuICB7XG4gICAgdmFyIHRyaXBsZXQgPSAoKChiaW5hcnJheVtpICAgPj4gMl0gPj4gOCAqICgzIC0gIGkgICAlNCkpICYgMHhGRikgPDwgMTYpXG4gICAgICAgICAgICAgICAgfCAoKChiaW5hcnJheVtpKzEgPj4gMl0gPj4gOCAqICgzIC0gKGkrMSklNCkpICYgMHhGRikgPDwgOCApXG4gICAgICAgICAgICAgICAgfCAgKChiaW5hcnJheVtpKzIgPj4gMl0gPj4gOCAqICgzIC0gKGkrMiklNCkpICYgMHhGRik7XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDQ7IGorKylcbiAgICB7XG4gICAgICBpZihpICogOCArIGogKiA2ID4gYmluYXJyYXkubGVuZ3RoICogMzIpIHN0ciArPSBiNjRwYWQ7XG4gICAgICBlbHNlIHN0ciArPSB0YWIuY2hhckF0KCh0cmlwbGV0ID4+IDYqKDMtaikpICYgMHgzRik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59IiwiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcblxuICBmdW5jdGlvbiBDb3VudHJ5KCkge1xuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oYXN5bmMgKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIFBhcmFtcy5nZW94ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICBQYXJhbXMuZ2VveSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIEdldENvdW50cnkoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gUmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3Ryby5cIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLnBvc3QoXG4gICAgICAgIFwiL3BnYXBpL3YyL3JlZ2lzdGVyL2NvbW11bml0eS1zYWZldHktcHdhXCIsXG4gICAgICAgIFBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBHZXRDb3VudHJ5KCkge1xuICAgIC8vZGF0YT1bdGltZW91dDoxMF1bb3V0Ompzb25dO2lzX2luKC0wLjIxMjYzLC03OC40MTA1MyktPi5hO3dheShwaXZvdC5hKTtvdXQrdGFncytiYjtvdXQraWRzK2dlb20oLTAuMjE4MDMsLTc4LjQxMTExLC0wLjIxMTQxLC03OC40MDU2MCk7cmVsYXRpb24ocGl2b3QuYSk7b3V0K3RhZ3MrYmI7XG4gICAgbGV0IHF1ZXJ5ID0gYFtvdXQ6anNvbl1bdGltZW91dDoxMF07aXNfaW4oJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pLT4uYTtyZWxhdGlvbihwaXZvdC5hKTtvdXQgdGFncyBxdDsod2F5KGFyb3VuZDoyMCwke1BhcmFtcy5nZW94fSwke1BhcmFtcy5nZW95fSk7KTtvdXQgdGFncyBxdDtgO1xuICAgIGxldCByID0gYXdhaXQgZmV0Y2goXCJodHRwczovL292ZXJwYXNzLWFwaS5kZS9hcGkvaW50ZXJwcmV0ZXJcIiwge1xuICAgICAgY3JlZGVudGlhbHM6IFwib21pdFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBhY2NlcHQ6IFwiKi8qXCIsXG4gICAgICAgIFwiYWNjZXB0LWxhbmd1YWdlXCI6IFwiZXMtRVMsZXM7cT0wLjksZW47cT0wLjhcIixcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtZGVzdFwiOiBcImVtcHR5XCIsXG4gICAgICAgIFwic2VjLWZldGNoLW1vZGVcIjogXCJjb3JzXCIsXG4gICAgICAgIFwic2VjLWZldGNoLXNpdGVcIjogXCJjcm9zcy1zaXRlXCIsXG4gICAgICB9LFxuICAgICAgcmVmZXJyZXI6IGBodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9xdWVyeT9sYXQ9JHtQYXJhbXMuZ2VveH0mbG9uPSR7UGFyYW1zLmdlb3l9YCxcbiAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlXCIsXG4gICAgICAvL1wiYm9keVwiOiBgZGF0YT0lNUJ0aW1lb3V0JTNBMTAlNUQlNUJvdXQlM0Fqc29uJTVEJTNCaXNfaW4oJHt0aGlzLlBhcmFtcy5nZW94fSUyQyR7dGhpcy5QYXJhbXMuZ2VveX0pLSUzRS5hJTNCd2F5KHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JvdXQraWRzK2dlb20oJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveCkudG9GaXhlZCg1KX0lMkMke051bWJlcih0aGlzLlBhcmFtcy5nZW95KS50b0ZpeGVkKDUpfSUyQyR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KSUzQnJlbGF0aW9uKHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JgLFxuICAgICAgYm9keTogcXVlcnksXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCByLmpzb24oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZWxlbWVudHMpICYmIGRhdGEuZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdICYmXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0udGFncyAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MubmFtZVxuICAgICAgKSB7XG4gICAgICAgIFBhcmFtcy5jb3VudHJ5ID0gZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbmljaWFcIik7XG4gICAgQ291bnRyeSgpO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gRXh0cmFMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUV4dHJhTGlnaHRcIiksXG4gICAgICB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3NvdXJjZXNhbnNwcm8vdjEzLzZ4S3lkU0JZS2NTVi1MQ29lUXFmWDFSWU9vM2k5NF93bHhkci50dGYpXG4gICAgICAgIGZvcm1hdChcInRydWV0eXBlXCIpO1xuICB9XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gTGlnaHRcIiksIGxvY2FsKFwiU291cmNlU2Fuc1Byby1MaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaWs0endseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgLnJvb3Qge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAuYm9keSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBXZWJLaXQgYnJvd3NlcnMgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDQgdG8gMTggKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDE5KyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTArICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLndyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICM0ODc3YWY7XG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChcbiAgICAgIGxpbmVhcixcbiAgICAgIGxlZnQgdG9wLFxuICAgICAgcmlnaHQgYm90dG9tLFxuICAgICAgZnJvbSgjNDg3N2FmKSxcbiAgICAgIHRvKCMxMjI4NGEpXG4gICAgKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCAjNDg3N2FmIDAlLCAjMTIyODRhIDEwMCUpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIC53cmFwcGVyLmZvcm0tc3VjY2VzcyAuY29udGFpbmVyIGgxIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogODBweCAwO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5jb250YWluZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogNDBweCAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tcHV0O1xuICAgIGZvbnQtd2VpZ2h0OiAyMDAgIWltcG9ydGFudDtcbiAgfVxuICAuZm9ybSB7XG4gICAgcGFkZGluZzogMjBweCAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5saW5rc19ibG9jayB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMWVtO1xuICB9XG5cbiAgLmZvcm0gYSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG4gIC5mb3JtIGE6dmlzaXRlZCB7XG4gICAgY29sb3I6IGZsb3JhbHdoaXRlO1xuICB9XG4gIC5mb3JtIGlucHV0IHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMWVtICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgZm9udC13ZWlnaHQ6IDMwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIGlucHV0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBjb2xvcjogIzEyMjg0YTtcbiAgfVxuXG4gIC5iZ19idWJibGVzIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xuICAgIGJvdHRvbTogLTE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xuICAgIGxlZnQ6IDEwJTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xuICAgIGxlZnQ6IDIwJTtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMykge1xuICAgIGxlZnQ6IDI1JTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogNHM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNCkge1xuICAgIGxlZnQ6IDQwJTtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XG4gICAgbGVmdDogNzAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg2KSB7XG4gICAgbGVmdDogODAlO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAzcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNykge1xuICAgIGxlZnQ6IDMyJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogN3M7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoOCkge1xuICAgIGxlZnQ6IDU1JTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg5KSB7XG4gICAgbGVmdDogMjUlO1xuICAgIHdpZHRoOiAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcbiAgICBsZWZ0OiA5MCU7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGhlaWdodDogMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDExcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDExcztcbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG4gIEBrZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwicm9vdFwiPlxuICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMT5SZWdpc3RybzwvaDE+XG48ZGl2IHN0eWxlPVwiXCI+XG4gIDxmb3JtXG4gIGNsYXNzPVwiZm9ybVwiXG4gIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gIG1ldGhvZD1cInBvc3RcIlxuICBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e1JlZ2lzdGVyfT5cbiAgPGlucHV0XG4gICAgbmFtZT1cImdlb3hcIlxuICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmdlb3h9IC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJnZW95XCJcbiAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICBwbGFjZWhvbGRlcj1cIkdlb3lcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwiY291bnRyeVwiXG4gICAgdHlwZT1cInRleHRcIlxuICAgIHJlYWRvbmx5XG4gICAgcGxhY2Vob2xkZXI9XCJDb3VudHJ5XCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cImZpcnN0bmFtZVwiXG4gICAgdHlwZT1cImhpZGRlblwiXG4gICAgcGxhY2Vob2xkZXI9XCJOb21icmVcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5maXJzdG5hbWV9XG4gICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJsYXN0bmFtZVwiXG4gICAgdHlwZT1cImhpZGRlblwiXG4gICAgcGxhY2Vob2xkZXI9XCJBcGVsbGlkb1wiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmxhc3RuYW1lfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwiZW1haWxcIlxuICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgcGxhY2Vob2xkZXI9XCJFbWFpbFwiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmVtYWlsfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwicHdkXCJcbiAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgIHBsYWNlaG9sZGVyPVwiQ29udHJhc2XDsWFcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5wd2R9XG4gICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJwd2QyXCJcbiAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgIHBsYWNlaG9sZGVyPVwiQ29uZmlybWUgQ29udHJhc2XDsWFcIlxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gIDxkaXYgY2xhc3M9XCJsaW5rc19ibG9ja1wiPjxhIGhyZWY9XCJsb2dpblwiPkxvZ2luPC9hPjwvZGl2PlxuPC9mb3JtPlxuXG48L2Rpdj5cblxuICAgICAgICA8Zm9ybVxuICAgICAgICAgIGNsYXNzPVwiZm9ybVwiXG4gICAgICAgICAgYWN0aW9uPVwiL3BnYXBpL3YyL3JlZ2lzdGVyXCJcbiAgICAgICAgICBtZXRob2Q9XCJwb3N0XCJcbiAgICAgICAgICBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e1JlZ2lzdGVyfT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW94XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW94XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW94fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImdlb3lcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkdlb3lcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmdlb3l9IC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiY291bnRyeVwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb3VudHJ5XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5jb3VudHJ5fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImZpcnN0bmFtZVwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTm9tYnJlXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5maXJzdG5hbWV9XG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJsYXN0bmFtZVwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQXBlbGxpZG9cIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmxhc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgYmluZDp2YWx1ZT17UGFyYW1zLmVtYWlsfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkXCJcbiAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvbnRyYXNlw7FhXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5wd2R9XG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJwd2QyXCJcbiAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvbmZpcm1lIENvbnRyYXNlw7FhXCJcbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwicmVnaXN0ZXJcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJBY2VwdGFyXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlua3NfYmxvY2tcIj48YSBocmVmPVwibG9naW5cIj5Mb2dpbjwvYT48L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8dWwgY2xhc3M9XCJiZ19idWJibGVzXCI+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gICAgPGxpIC8+XG4gIDwvdWw+XG48L2Rpdj5cbiJdLCJzb3VyY2VSb290IjoiIn0=