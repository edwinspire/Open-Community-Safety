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
	style.textContent = "@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:200;src:local(\"Source Sans Pro ExtraLight\"), local(\"SourceSansPro-ExtraLight\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf)\n        format(\"truetype\")}@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:300;src:local(\"Source Sans Pro Light\"), local(\"SourceSansPro-Light\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf)\n        format(\"truetype\")}.root.svelte-1a2fiz0.svelte-1a2fiz0{box-sizing:border-box;margin:0;padding:0;font-weight:300;display:block}.body.svelte-1a2fiz0.svelte-1a2fiz0{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0::-webkit-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0:-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0::-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-1a2fiz0 .svelte-1a2fiz0:-ms-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.wrapper.svelte-1a2fiz0.svelte-1a2fiz0{background:#4877af;background:-webkit-gradient(\n      linear,\n      left top,\n      right bottom,\n      from(#4877af),\n      to(#12284a)\n    );background:linear-gradient(to bottom right, #4877af 0%, #12284a 100%);position:absolute;left:0;width:100%;height:100%;overflow:hidden}.wrapper.form-success .container.svelte-1a2fiz0 h1.svelte-1a2fiz0{-webkit-transform:translateY(85px) !important;transform:translateY(85px) !important}.container.svelte-1a2fiz0.svelte-1a2fiz0{max-width:300px;margin:0 auto;padding:80px 0;height:400px;text-align:center}.container.svelte-1a2fiz0 h1.svelte-1a2fiz0{font-size:40px !important;-webkit-transition-duration:1s;transition-duration:1s;-webkit-transition-timing-function:ease-in-put;transition-timing-function:ease-in-put;font-weight:200 !important}.form.svelte-1a2fiz0.svelte-1a2fiz0{padding:20px 0;z-index:99;position:relative}.links_block.svelte-1a2fiz0.svelte-1a2fiz0{text-align:right;padding:1em}.form.svelte-1a2fiz0 a.svelte-1a2fiz0{color:white}.form.svelte-1a2fiz0 a.svelte-1a2fiz0:visited{color:floralwhite}.form.svelte-1a2fiz0 input.svelte-1a2fiz0{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;border:1px solid rgba(255, 255, 255, 0.4);background-color:rgba(255, 255, 255, 0.2);width:-webkit-fill-available !important;border-radius:3px;padding:10px 15px;margin:0 auto 10px auto;display:block;text-align:center;font-size:1em !important;color:white;-webkit-transition-duration:0.25s;transition-duration:0.25s;font-weight:300 !important}.form.svelte-1a2fiz0 input.svelte-1a2fiz0:hover{background-color:rgba(255, 255, 255, 0.4)}.form.svelte-1a2fiz0 input.svelte-1a2fiz0:focus{background-color:white;width:300px;color:#12284a}.bg_bubbles.svelte-1a2fiz0.svelte-1a2fiz0{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0{position:absolute;list-style:none;display:block;width:40px;height:40px;background-color:rgba(255, 255, 255, 0.15);bottom:-160px;-webkit-animation:svelte-1a2fiz0-square 25s infinite;animation:svelte-1a2fiz0-square 25s infinite;-webkit-transition-timing-function:linear;transition-timing-function:linear}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(1){left:10%}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(2){left:20%;width:80px;height:80px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:17s;animation-duration:17s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(3){left:25%;-webkit-animation-delay:4s;animation-delay:4s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(4){left:40%;width:60px;height:60px;-webkit-animation-duration:22s;animation-duration:22s;background-color:rgba(255, 255, 255, 0.25)}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(5){left:70%}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(6){left:80%;width:120px;height:120px;-webkit-animation-delay:3s;animation-delay:3s;background-color:rgba(255, 255, 255, 0.2)}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(7){left:32%;width:160px;height:160px;-webkit-animation-delay:7s;animation-delay:7s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(8){left:55%;width:20px;height:20px;-webkit-animation-delay:15s;animation-delay:15s;-webkit-animation-duration:40s;animation-duration:40s}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(9){left:25%;width:10px;height:10px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:40s;animation-duration:40s;background-color:rgba(255, 255, 255, 0.3)}.bg_bubbles.svelte-1a2fiz0 li.svelte-1a2fiz0:nth-child(10){left:90%;width:160px;height:160px;-webkit-animation-delay:11s;animation-delay:11s}@-webkit-keyframes svelte-1a2fiz0-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}@keyframes svelte-1a2fiz0-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcblxuICBmdW5jdGlvbiBDb3VudHJ5KCkge1xuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oYXN5bmMgKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIFBhcmFtcy5nZW94ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICBQYXJhbXMuZ2VveSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIEdldENvdW50cnkoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gUmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3Ryby5cIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLnBvc3QoXG4gICAgICAgIFwiL3BnYXBpL3YyL3JlZ2lzdGVyL2NvbW11bml0eS1zYWZldHktcHdhXCIsXG4gICAgICAgIFBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBHZXRDb3VudHJ5KCkge1xuICAgIC8vZGF0YT1bdGltZW91dDoxMF1bb3V0Ompzb25dO2lzX2luKC0wLjIxMjYzLC03OC40MTA1MyktPi5hO3dheShwaXZvdC5hKTtvdXQrdGFncytiYjtvdXQraWRzK2dlb20oLTAuMjE4MDMsLTc4LjQxMTExLC0wLjIxMTQxLC03OC40MDU2MCk7cmVsYXRpb24ocGl2b3QuYSk7b3V0K3RhZ3MrYmI7XG4gICAgbGV0IHF1ZXJ5ID0gYFtvdXQ6anNvbl1bdGltZW91dDoxMF07aXNfaW4oJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pLT4uYTtyZWxhdGlvbihwaXZvdC5hKTtvdXQgdGFncyBxdDsod2F5KGFyb3VuZDoyMCwke1BhcmFtcy5nZW94fSwke1BhcmFtcy5nZW95fSk7KTtvdXQgdGFncyBxdDtgO1xuICAgIGxldCByID0gYXdhaXQgZmV0Y2goXCJodHRwczovL292ZXJwYXNzLWFwaS5kZS9hcGkvaW50ZXJwcmV0ZXJcIiwge1xuICAgICAgY3JlZGVudGlhbHM6IFwib21pdFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBhY2NlcHQ6IFwiKi8qXCIsXG4gICAgICAgIFwiYWNjZXB0LWxhbmd1YWdlXCI6IFwiZXMtRVMsZXM7cT0wLjksZW47cT0wLjhcIixcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtZGVzdFwiOiBcImVtcHR5XCIsXG4gICAgICAgIFwic2VjLWZldGNoLW1vZGVcIjogXCJjb3JzXCIsXG4gICAgICAgIFwic2VjLWZldGNoLXNpdGVcIjogXCJjcm9zcy1zaXRlXCIsXG4gICAgICB9LFxuICAgICAgcmVmZXJyZXI6IGBodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9xdWVyeT9sYXQ9JHtQYXJhbXMuZ2VveH0mbG9uPSR7UGFyYW1zLmdlb3l9YCxcbiAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlXCIsXG4gICAgICAvL1wiYm9keVwiOiBgZGF0YT0lNUJ0aW1lb3V0JTNBMTAlNUQlNUJvdXQlM0Fqc29uJTVEJTNCaXNfaW4oJHt0aGlzLlBhcmFtcy5nZW94fSUyQyR7dGhpcy5QYXJhbXMuZ2VveX0pLSUzRS5hJTNCd2F5KHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JvdXQraWRzK2dlb20oJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveCkudG9GaXhlZCg1KX0lMkMke051bWJlcih0aGlzLlBhcmFtcy5nZW95KS50b0ZpeGVkKDUpfSUyQyR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KSUzQnJlbGF0aW9uKHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JgLFxuICAgICAgYm9keTogcXVlcnksXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCByLmpzb24oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZWxlbWVudHMpICYmIGRhdGEuZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdICYmXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0udGFncyAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MubmFtZVxuICAgICAgKSB7XG4gICAgICAgIFBhcmFtcy5jb3VudHJ5ID0gZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbmljaWFcIik7XG4gICAgQ291bnRyeSgpO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gRXh0cmFMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUV4dHJhTGlnaHRcIiksXG4gICAgICB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3NvdXJjZXNhbnNwcm8vdjEzLzZ4S3lkU0JZS2NTVi1MQ29lUXFmWDFSWU9vM2k5NF93bHhkci50dGYpXG4gICAgICAgIGZvcm1hdChcInRydWV0eXBlXCIpO1xuICB9XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gTGlnaHRcIiksIGxvY2FsKFwiU291cmNlU2Fuc1Byby1MaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaWs0endseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgLnJvb3Qge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAuYm9keSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBXZWJLaXQgYnJvd3NlcnMgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDQgdG8gMTggKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDE5KyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTArICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLndyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICM0ODc3YWY7XG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChcbiAgICAgIGxpbmVhcixcbiAgICAgIGxlZnQgdG9wLFxuICAgICAgcmlnaHQgYm90dG9tLFxuICAgICAgZnJvbSgjNDg3N2FmKSxcbiAgICAgIHRvKCMxMjI4NGEpXG4gICAgKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCAjNDg3N2FmIDAlLCAjMTIyODRhIDEwMCUpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIC53cmFwcGVyLmZvcm0tc3VjY2VzcyAuY29udGFpbmVyIGgxIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogODBweCAwO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5jb250YWluZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogNDBweCAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tcHV0O1xuICAgIGZvbnQtd2VpZ2h0OiAyMDAgIWltcG9ydGFudDtcbiAgfVxuICAuZm9ybSB7XG4gICAgcGFkZGluZzogMjBweCAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5saW5rc19ibG9jayB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMWVtO1xuICB9XG5cbiAgLmZvcm0gYSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG4gIC5mb3JtIGE6dmlzaXRlZCB7XG4gICAgY29sb3I6IGZsb3JhbHdoaXRlO1xuICB9XG4gIC5mb3JtIGlucHV0IHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMWVtICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgZm9udC13ZWlnaHQ6IDMwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIGlucHV0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBjb2xvcjogIzEyMjg0YTtcbiAgfVxuXG4gIC5iZ19idWJibGVzIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xuICAgIGJvdHRvbTogLTE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xuICAgIGxlZnQ6IDEwJTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xuICAgIGxlZnQ6IDIwJTtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMykge1xuICAgIGxlZnQ6IDI1JTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogNHM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNCkge1xuICAgIGxlZnQ6IDQwJTtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XG4gICAgbGVmdDogNzAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg2KSB7XG4gICAgbGVmdDogODAlO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAzcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNykge1xuICAgIGxlZnQ6IDMyJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogN3M7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoOCkge1xuICAgIGxlZnQ6IDU1JTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg5KSB7XG4gICAgbGVmdDogMjUlO1xuICAgIHdpZHRoOiAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcbiAgICBsZWZ0OiA5MCU7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGhlaWdodDogMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDExcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDExcztcbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG4gIEBrZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwicm9vdFwiPlxuICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMT5SZWdpc3RybzwvaDE+XG48ZGl2PlxuXG4gIFxuPC9kaXY+XG5cbiAgICAgICAgPGZvcm1cbiAgICAgICAgICBjbGFzcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gICAgICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZ2VveFwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveH0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW95XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWJyZVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwZWxsaWRvXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cInB3ZFwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb250cmFzZcOxYVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkMlwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb25maXJtZSBDb250cmFzZcOxYVwiXG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cImxvZ2luXCI+TG9naW48L2E+PC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiYmdfYnViYmxlc1wiPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICA8L3VsPlxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0VFLFVBQVUsQUFBQyxDQUFDLEFBQ1YsV0FBVyxDQUFFLGlCQUFpQixDQUM5QixVQUFVLENBQUUsTUFBTSxDQUNsQixXQUFXLENBQUUsR0FBRyxDQUNoQixHQUFHLENBQUUsTUFBTSw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsTUFBTSwwQkFBMEIsQ0FBQyxDQUFDO01BQzFFLElBQUksc0ZBQXNGLENBQUM7UUFDekYsT0FBTyxVQUFVLENBQUMsQUFDeEIsQ0FBQyxBQUNELFVBQVUsQUFBQyxDQUFDLEFBQ1YsV0FBVyxDQUFFLGlCQUFpQixDQUM5QixVQUFVLENBQUUsTUFBTSxDQUNsQixXQUFXLENBQUUsR0FBRyxDQUNoQixHQUFHLENBQUUsTUFBTSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO01BQ2hFLElBQUksc0ZBQXNGLENBQUM7UUFDekYsT0FBTyxVQUFVLENBQUMsQUFDeEIsQ0FBQyxBQUNELEtBQUssOEJBQUMsQ0FBQyxBQUNMLFVBQVUsQ0FBRSxVQUFVLENBQ3RCLE1BQU0sQ0FBRSxDQUFDLENBQ1QsT0FBTyxDQUFFLENBQUMsQ0FDVixXQUFXLENBQUUsR0FBRyxDQUNoQixPQUFPLENBQUUsS0FBSyxBQUNoQixDQUFDLEFBQ0QsS0FBSyw4QkFBQyxDQUFDLEFBQ0wsV0FBVyxDQUFFLGlCQUFpQixDQUFDLENBQUMsVUFBVSxDQUMxQyxLQUFLLENBQUUsS0FBSyxDQUNaLFdBQVcsQ0FBRSxHQUFHLEFBQ2xCLENBQUMs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 */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function create_fragment(ctx) {
	let div5;
	let div4;
	let div3;
	let div2;
	let h1;
	let t0;
	let t1;
	let div0;
	let t2;
	let form;
	let input0;
	let t3;
	let input1;
	let t4;
	let input2;
	let t5;
	let input3;
	let t6;
	let input4;
	let t7;
	let input5;
	let t8;
	let input6;
	let t9;
	let input7;
	let t10;
	let input8;
	let t11;
	let div1;
	let a;
	let t12;
	let t13;
	let ul;
	let li0;
	let t14;
	let li1;
	let t15;
	let li2;
	let t16;
	let li3;
	let t17;
	let li4;
	let t18;
	let li5;
	let t19;
	let li6;
	let t20;
	let li7;
	let t21;
	let li8;
	let t22;
	let li9;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Registro");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("form");
			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("input");
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Login");
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("ul");
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			li9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("li");
			this.h();
		},
		l: function claim(nodes) {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "H1", { class: true });
			var h1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h1_nodes, "Registro");
			h1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "FORM", { class: true, action: true, method: true });
			var form_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(form);

			input0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				class: true
			});

			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				readonly: true,
				placeholder: true,
				class: true
			});

			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				placeholder: true,
				required: true,
				class: true
			});

			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);

			input8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "INPUT", {
				name: true,
				type: true,
				value: true,
				class: true
			});

			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(form_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "A", { href: true, class: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Login");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			form_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t13 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			ul = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "UL", { class: true });
			var ul_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(ul);
			li0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t14 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t15 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t16 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li3).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t17 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li4).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t18 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li5).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t19 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li6).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t20 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li7).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t21 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li8).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t22 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(ul_nodes);
			li9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(ul_nodes, "LI", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(li9).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			ul_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 329, 8, 8553);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 330, 0, 8571);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "name", "geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "placeholder", "Geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input0, file, 340, 10, 8745);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "name", "geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "placeholder", "Geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input1, file, 345, 10, 8883);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "name", "country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "type", "text");
			input2.readOnly = true;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "placeholder", "Country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input2, file, 350, 10, 9021);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "name", "firstname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "placeholder", "Nombre");
			input3.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input3, file, 356, 10, 9187);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "name", "lastname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "placeholder", "Apellido");
			input4.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input4, file, 362, 10, 9369);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "name", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "type", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "placeholder", "Email");
			input5.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input5, file, 368, 10, 9551);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "name", "pwd");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "placeholder", "Contraseña");
			input6.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input6, file, 374, 10, 9723);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "name", "pwd2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "placeholder", "Confirme Contraseña");
			input7.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input7, file, 380, 10, 9899);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "name", "register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "type", "submit");
			input8.value = "Aceptar";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input8, file, 385, 10, 10049);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", "login");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 386, 35, 10140);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "links_block svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 386, 10, 10115);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "class", "form svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "action", "/pgapi/v2/register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "method", "post");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form, file, 335, 8, 8597);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "container svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 328, 6, 8521);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "wrapper svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 327, 4, 8493);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "body svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 326, 2, 8470);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li0, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li0, file, 392, 4, 10251);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li1, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li1, file, 393, 4, 10262);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li2, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li2, file, 394, 4, 10273);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li3, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li3, file, 395, 4, 10284);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li4, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li4, file, 396, 4, 10295);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li5, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li5, file, 397, 4, 10306);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li6, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li6, file, 398, 4, 10317);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li7, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li7, file, 399, 4, 10328);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li8, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li8, file, 400, 4, 10339);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li9, "class", "svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li9, file, 401, 4, 10350);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(ul, "class", "bg_bubbles svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(ul, file, 391, 2, 10223);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "root svelte-1a2fiz0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 325, 0, 8449);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div5, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, h1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, form);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input0, /*Params*/ ctx[0].geox);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input1, /*Params*/ ctx[0].geoy);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input2, /*Params*/ ctx[0].country);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input3, /*Params*/ ctx[0].firstname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input4, /*Params*/ ctx[0].lastname);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input5, /*Params*/ ctx[0].email);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_input_value"])(input6, /*Params*/ ctx[0].pwd);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, input8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, t11);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a, t12);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t13);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, ul);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t14);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t15);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t16);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t17);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t18);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t19);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t20);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t21);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, li8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(ul, t22);
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
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(form, "submit", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prevent_default"])(/*Register*/ ctx[1]), false, true, false)
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
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div5);
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
		input6_input_handler
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2hhMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3JlZ2lzdGVyL2luZGV4LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQzs7O0FBR3hDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsdUJBQXVCLDBEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQSwyRUFBMkU7QUFDM0UsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxXQUFXLHlEQUFRO0FBQ25CO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4SEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7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RyIsImZpbGUiOiJhOGI3NmQwMzYyNGU5NWU5ZjRhNi9yZWdpc3Rlci5yZWdpc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL1N0b3Jlcy5qc1wiO1xuaW1wb3J0IHsgaGV4X3NoYTEsIHN0cl9zaGExIH0gZnJvbSBcIi4vc2hhMS5qc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBGZXRjaERhdGEge1xuICBhc3luYyBwdXQodXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgLy9jYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy9jb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcG9zdCh1cmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICB0cnkge1xuICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICAvL2NhY2hlLnB1dChldmVudC5yZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAvL2NvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XG4gICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZ2V0KHVybCwgcXVlcnksIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2hVUkwgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICAgIGxldCB1cmxxID0gdXJsICsgXCI/XCIgKyBzZWFyY2hVUkwudG9TdHJpbmcoKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJscSwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgXG4gIH1cblxuICBhc3luYyBsb2dpbih1cmwsIHVzZXIsIHBhc3N3b3JkKSB7XG4gICAgbGV0IExTdG9yYWdlID0gbmV3IEFQUExvY2FsU3RvcmFnZSgpO1xuICAgIGxldCBwd2RvZmYgPSBhd2FpdCB0aGlzLmRpZ2VzdE1lc3NhZ2UodXNlciArIHBhc3N3b3JkKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGYgPSBhd2FpdCB0aGlzLnBvc3QoXG4gICAgICAgIHVybCxcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLFxuICAgICAgICAgIHB3ZDogcGFzc3dvcmQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKGYpO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmLmpzb24oKTtcblxuICAgICAgZGF0YS5vZmZsaW5lID0gcHdkb2ZmO1xuICAgICAgTFN0b3JhZ2Uuc2V0VXNlcihkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLnRyYWNlKGVycm9yKTtcbiAgICAgIGxldCBkYXRhID0ge307XG4gICAgICBkYXRhLmxvZ2luID0gZmFsc2U7XG4gICAgICBsZXQgdXNlciA9IExTdG9yYWdlLmdldFVzZXIoZGF0YSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuXG4gICAgICBpZiAodXNlci5vZmZsaW5lID09IHB3ZG9mZikge1xuICAgICAgICBkYXRhID0gdXNlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGlnZXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgLypcbiAgICAgICAgY29uc29sZS5sb2coaGV4X3NoYTEoJ2hvbGEnKSwgc3RyX3NoYTEoJ2hvbGEnKSk7XG4gICAgICAgIGNvbnN0IG1zZ1VpbnQ4ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1lc3NhZ2UpOyAvLyBlbmNvZGUgYXMgKHV0Zi04KSBVaW50OEFycmF5XG4gICAgICAgIGNvbnNvbGUubG9nKGNyeXB0byk7XG4gICAgICAgIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgbXNnVWludDgpOyAvLyBoYXNoIHRoZSBtZXNzYWdlXG4gICAgICAgIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpOyAvLyBjb252ZXJ0IGJ1ZmZlciB0byBieXRlIGFycmF5XG4gICAgICAgIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXlcbiAgICAgICAgICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgICAgIC5qb2luKFwiXCIpOyAvLyBjb252ZXJ0IGJ5dGVzIHRvIGhleCBzdHJpbmdcbiAgICAgICAgICAgICovXG4gICAgcmV0dXJuIGhleF9zaGExKG1lc3NhZ2UpO1xuICB9XG59XG4iLCIvKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vKlxuICogQ29uZmlndXJhYmxlIHZhcmlhYmxlcy4gWW91IG1heSBuZWVkIHRvIHR3ZWFrIHRoZXNlIHRvIGJlIGNvbXBhdGlibGUgd2l0aFxuICogdGhlIHNlcnZlci1zaWRlLCBidXQgdGhlIGRlZmF1bHRzIHdvcmsgaW4gbW9zdCBjYXNlcy5cbiAqL1xudmFyIGhleGNhc2UgPSAwOyAgLyogaGV4IG91dHB1dCBmb3JtYXQuIDAgLSBsb3dlcmNhc2U7IDEgLSB1cHBlcmNhc2UgICAgICAgICovXG52YXIgYjY0cGFkICA9IFwiXCI7IC8qIGJhc2UtNjQgcGFkIGNoYXJhY3Rlci4gXCI9XCIgZm9yIHN0cmljdCBSRkMgY29tcGxpYW5jZSAgICovXG52YXIgY2hyc3ogICA9IDg7ICAvKiBiaXRzIHBlciBpbnB1dCBjaGFyYWN0ZXIuIDggLSBBU0NJSTsgMTYgLSBVbmljb2RlICAgICAgKi9cblxuLypcbiAqIFRoZXNlIGFyZSB0aGUgZnVuY3Rpb25zIHlvdSdsbCB1c3VhbGx5IHdhbnQgdG8gY2FsbFxuICogVGhleSB0YWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgaGV4IG9yIGJhc2UtNjQgZW5jb2RlZCBzdHJpbmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZXhfc2hhMShzKXtyZXR1cm4gYmluYjJoZXgoY29yZV9zaGExKHN0cjJiaW5iKHMpLHMubGVuZ3RoICogY2hyc3opKTt9XG5leHBvcnQgZnVuY3Rpb24gYjY0X3NoYTEocyl7cmV0dXJuIGJpbmIyYjY0KGNvcmVfc2hhMShzdHIyYmluYihzKSxzLmxlbmd0aCAqIGNocnN6KSk7fVxuZXhwb3J0IGZ1bmN0aW9uIHN0cl9zaGExKHMpe3JldHVybiBiaW5iMnN0cihjb3JlX3NoYTEoc3RyMmJpbmIocykscy5sZW5ndGggKiBjaHJzeikpO31cbmZ1bmN0aW9uIGhleF9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyaGV4KGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cbmZ1bmN0aW9uIGI2NF9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyYjY0KGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cbmZ1bmN0aW9uIHN0cl9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyc3RyKGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cblxuLypcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xuICovXG5mdW5jdGlvbiBzaGExX3ZtX3Rlc3QoKVxue1xuICByZXR1cm4gaGV4X3NoYTEoXCJhYmNcIikgPT0gXCJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkXCI7XG59XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIFNIQS0xIG9mIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9zaGExKHgsIGxlbilcbntcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsZW4gJSAzMik7XG4gIHhbKChsZW4gKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGxlbjtcblxuICB2YXIgdyA9IEFycmF5KDgwKTtcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XG4gIHZhciBlID0gLTEwMDk1ODk3NzY7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxuICB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIHZhciBvbGRlID0gZTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCA4MDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGogPCAxNikgd1tqXSA9IHhbaSArIGpdO1xuICAgICAgZWxzZSB3W2pdID0gcm9sKHdbai0zXSBeIHdbai04XSBeIHdbai0xNF0gXiB3W2otMTZdLCAxKTtcbiAgICAgIHZhciB0ID0gc2FmZV9hZGQoc2FmZV9hZGQocm9sKGEsIDUpLCBzaGExX2Z0KGosIGIsIGMsIGQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgc2FmZV9hZGQoc2FmZV9hZGQoZSwgd1tqXSksIHNoYTFfa3QoaikpKTtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gcm9sKGIsIDMwKTtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHQ7XG4gICAgfVxuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgIGUgPSBzYWZlX2FkZChlLCBvbGRlKTtcbiAgfVxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCwgZSk7XG5cbn1cblxuLypcbiAqIFBlcmZvcm0gdGhlIGFwcHJvcHJpYXRlIHRyaXBsZXQgY29tYmluYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBjdXJyZW50XG4gKiBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9mdCh0LCBiLCBjLCBkKVxue1xuICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgaWYodCA8IDQwKSByZXR1cm4gYiBeIGMgXiBkO1xuICBpZih0IDwgNjApIHJldHVybiAoYiAmIGMpIHwgKGIgJiBkKSB8IChjICYgZCk7XG4gIHJldHVybiBiIF4gYyBeIGQ7XG59XG5cbi8qXG4gKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9rdCh0KVxue1xuICByZXR1cm4gKHQgPCAyMCkgPyAgMTUxODUwMDI0OSA6ICh0IDwgNDApID8gIDE4NTk3NzUzOTMgOlxuICAgICAgICAgKHQgPCA2MCkgPyAtMTg5NDAwNzU4OCA6IC04OTk0OTc1MTQ7XG59XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIEhNQUMtU0hBMSBvZiBhIGtleSBhbmQgc29tZSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSlcbntcbiAgdmFyIGJrZXkgPSBzdHIyYmluYihrZXkpO1xuICBpZihia2V5Lmxlbmd0aCA+IDE2KSBia2V5ID0gY29yZV9zaGExKGJrZXksIGtleS5sZW5ndGggKiBjaHJzeik7XG5cbiAgdmFyIGlwYWQgPSBBcnJheSgxNiksIG9wYWQgPSBBcnJheSgxNik7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKVxuICB7XG4gICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgfVxuXG4gIHZhciBoYXNoID0gY29yZV9zaGExKGlwYWQuY29uY2F0KHN0cjJiaW5iKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiBjaHJzeik7XG4gIHJldHVybiBjb3JlX3NoYTEob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDE2MCk7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxue1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiByb2wobnVtLCBjbnQpXG57XG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gOC1iaXQgb3IgMTYtYml0IHN0cmluZyB0byBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzXG4gKiBJbiA4LWJpdCBmdW5jdGlvbiwgY2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGktYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5mdW5jdGlvbiBzdHIyYmluYihzdHIpXG57XG4gIHZhciBiaW4gPSBBcnJheSgpO1xuICB2YXIgbWFzayA9ICgxIDw8IGNocnN6KSAtIDE7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoICogY2hyc3o7IGkgKz0gY2hyc3opXG4gICAgYmluW2k+PjVdIHw9IChzdHIuY2hhckNvZGVBdChpIC8gY2hyc3opICYgbWFzaykgPDwgKDMyIC0gY2hyc3ogLSBpJTMyKTtcbiAgcmV0dXJuIGJpbjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBiaW5iMnN0cihiaW4pXG57XG4gIHZhciBzdHIgPSBcIlwiO1xuICB2YXIgbWFzayA9ICgxIDw8IGNocnN6KSAtIDE7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW4ubGVuZ3RoICogMzI7IGkgKz0gY2hyc3opXG4gICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGJpbltpPj41XSA+Pj4gKDMyIC0gY2hyc3ogLSBpJTMyKSkgJiBtYXNrKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIGhleCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJpbmIyaGV4KGJpbmFycmF5KVxue1xuICB2YXIgaGV4X3RhYiA9IGhleGNhc2UgPyBcIjAxMjM0NTY3ODlBQkNERUZcIiA6IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xuICB2YXIgc3RyID0gXCJcIjtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFycmF5Lmxlbmd0aCAqIDQ7IGkrKylcbiAge1xuICAgIHN0ciArPSBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKCgzIC0gaSU0KSo4KzQpKSAmIDB4RikgK1xuICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKCgzIC0gaSU0KSo4ICApKSAmIDB4Rik7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIGJhc2UtNjQgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGJpbmIyYjY0KGJpbmFycmF5KVxue1xuICB2YXIgdGFiID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYmluYXJyYXkubGVuZ3RoICogNDsgaSArPSAzKVxuICB7XG4gICAgdmFyIHRyaXBsZXQgPSAoKChiaW5hcnJheVtpICAgPj4gMl0gPj4gOCAqICgzIC0gIGkgICAlNCkpICYgMHhGRikgPDwgMTYpXG4gICAgICAgICAgICAgICAgfCAoKChiaW5hcnJheVtpKzEgPj4gMl0gPj4gOCAqICgzIC0gKGkrMSklNCkpICYgMHhGRikgPDwgOCApXG4gICAgICAgICAgICAgICAgfCAgKChiaW5hcnJheVtpKzIgPj4gMl0gPj4gOCAqICgzIC0gKGkrMiklNCkpICYgMHhGRik7XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDQ7IGorKylcbiAgICB7XG4gICAgICBpZihpICogOCArIGogKiA2ID4gYmluYXJyYXkubGVuZ3RoICogMzIpIHN0ciArPSBiNjRwYWQ7XG4gICAgICBlbHNlIHN0ciArPSB0YWIuY2hhckF0KCh0cmlwbGV0ID4+IDYqKDMtaikpICYgMHgzRik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59IiwiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcblxuICBmdW5jdGlvbiBDb3VudHJ5KCkge1xuICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oYXN5bmMgKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIFBhcmFtcy5nZW94ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICBQYXJhbXMuZ2VveSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgIEdldENvdW50cnkoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIHB1ZG8gb2J0ZW5lciBsYXMgY29vcmRlbmFkYXNcIik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gUmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3Ryby5cIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEZEYXRhLnBvc3QoXG4gICAgICAgIFwiL3BnYXBpL3YyL3JlZ2lzdGVyL2NvbW11bml0eS1zYWZldHktcHdhXCIsXG4gICAgICAgIFBhcmFtcyxcbiAgICAgICAge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBHZXRDb3VudHJ5KCkge1xuICAgIC8vZGF0YT1bdGltZW91dDoxMF1bb3V0Ompzb25dO2lzX2luKC0wLjIxMjYzLC03OC40MTA1MyktPi5hO3dheShwaXZvdC5hKTtvdXQrdGFncytiYjtvdXQraWRzK2dlb20oLTAuMjE4MDMsLTc4LjQxMTExLC0wLjIxMTQxLC03OC40MDU2MCk7cmVsYXRpb24ocGl2b3QuYSk7b3V0K3RhZ3MrYmI7XG4gICAgbGV0IHF1ZXJ5ID0gYFtvdXQ6anNvbl1bdGltZW91dDoxMF07aXNfaW4oJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pLT4uYTtyZWxhdGlvbihwaXZvdC5hKTtvdXQgdGFncyBxdDsod2F5KGFyb3VuZDoyMCwke1BhcmFtcy5nZW94fSwke1BhcmFtcy5nZW95fSk7KTtvdXQgdGFncyBxdDtgO1xuICAgIGxldCByID0gYXdhaXQgZmV0Y2goXCJodHRwczovL292ZXJwYXNzLWFwaS5kZS9hcGkvaW50ZXJwcmV0ZXJcIiwge1xuICAgICAgY3JlZGVudGlhbHM6IFwib21pdFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBhY2NlcHQ6IFwiKi8qXCIsXG4gICAgICAgIFwiYWNjZXB0LWxhbmd1YWdlXCI6IFwiZXMtRVMsZXM7cT0wLjksZW47cT0wLjhcIixcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgXCJzZWMtZmV0Y2gtZGVzdFwiOiBcImVtcHR5XCIsXG4gICAgICAgIFwic2VjLWZldGNoLW1vZGVcIjogXCJjb3JzXCIsXG4gICAgICAgIFwic2VjLWZldGNoLXNpdGVcIjogXCJjcm9zcy1zaXRlXCIsXG4gICAgICB9LFxuICAgICAgcmVmZXJyZXI6IGBodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9xdWVyeT9sYXQ9JHtQYXJhbXMuZ2VveH0mbG9uPSR7UGFyYW1zLmdlb3l9YCxcbiAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlXCIsXG4gICAgICAvL1wiYm9keVwiOiBgZGF0YT0lNUJ0aW1lb3V0JTNBMTAlNUQlNUJvdXQlM0Fqc29uJTVEJTNCaXNfaW4oJHt0aGlzLlBhcmFtcy5nZW94fSUyQyR7dGhpcy5QYXJhbXMuZ2VveX0pLSUzRS5hJTNCd2F5KHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JvdXQraWRzK2dlb20oJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveCkudG9GaXhlZCg1KX0lMkMke051bWJlcih0aGlzLlBhcmFtcy5nZW95KS50b0ZpeGVkKDUpfSUyQyR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KSUzQnJlbGF0aW9uKHBpdm90LmEpJTNCb3V0K3RhZ3MrYmIlM0JgLFxuICAgICAgYm9keTogcXVlcnksXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCByLmpzb24oKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZWxlbWVudHMpICYmIGRhdGEuZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdICYmXG4gICAgICAgIGRhdGEuZWxlbWVudHNbMF0udGFncyAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MubmFtZVxuICAgICAgKSB7XG4gICAgICAgIFBhcmFtcy5jb3VudHJ5ID0gZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbmljaWFcIik7XG4gICAgQ291bnRyeSgpO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gRXh0cmFMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUV4dHJhTGlnaHRcIiksXG4gICAgICB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3NvdXJjZXNhbnNwcm8vdjEzLzZ4S3lkU0JZS2NTVi1MQ29lUXFmWDFSWU9vM2k5NF93bHhkci50dGYpXG4gICAgICAgIGZvcm1hdChcInRydWV0eXBlXCIpO1xuICB9XG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIHNyYzogbG9jYWwoXCJTb3VyY2UgU2FucyBQcm8gTGlnaHRcIiksIGxvY2FsKFwiU291cmNlU2Fuc1Byby1MaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaWs0endseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgLnJvb3Qge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAuYm9keSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBXZWJLaXQgYnJvd3NlcnMgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDQgdG8gMTggKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgLyogTW96aWxsYSBGaXJlZm94IDE5KyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTArICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLndyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICM0ODc3YWY7XG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChcbiAgICAgIGxpbmVhcixcbiAgICAgIGxlZnQgdG9wLFxuICAgICAgcmlnaHQgYm90dG9tLFxuICAgICAgZnJvbSgjNDg3N2FmKSxcbiAgICAgIHRvKCMxMjI4NGEpXG4gICAgKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCAjNDg3N2FmIDAlLCAjMTIyODRhIDEwMCUpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIC53cmFwcGVyLmZvcm0tc3VjY2VzcyAuY29udGFpbmVyIGgxIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg4NXB4KSAhaW1wb3J0YW50O1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogODBweCAwO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5jb250YWluZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogNDBweCAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tcHV0O1xuICAgIGZvbnQtd2VpZ2h0OiAyMDAgIWltcG9ydGFudDtcbiAgfVxuICAuZm9ybSB7XG4gICAgcGFkZGluZzogMjBweCAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5saW5rc19ibG9jayB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMWVtO1xuICB9XG5cbiAgLmZvcm0gYSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG4gIC5mb3JtIGE6dmlzaXRlZCB7XG4gICAgY29sb3I6IGZsb3JhbHdoaXRlO1xuICB9XG4gIC5mb3JtIGlucHV0IHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMWVtICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgZm9udC13ZWlnaHQ6IDMwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIGlucHV0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBjb2xvcjogIzEyMjg0YTtcbiAgfVxuXG4gIC5iZ19idWJibGVzIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xuICAgIGJvdHRvbTogLTE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xuICAgIGxlZnQ6IDEwJTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xuICAgIGxlZnQ6IDIwJTtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMykge1xuICAgIGxlZnQ6IDI1JTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogNHM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNCkge1xuICAgIGxlZnQ6IDQwJTtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIycztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XG4gICAgbGVmdDogNzAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg2KSB7XG4gICAgbGVmdDogODAlO1xuICAgIHdpZHRoOiAxMjBweDtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAzcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoNykge1xuICAgIGxlZnQ6IDMyJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogN3M7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoOCkge1xuICAgIGxlZnQ6IDU1JTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDE1cztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg5KSB7XG4gICAgbGVmdDogMjUlO1xuICAgIHdpZHRoOiAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcbiAgICBsZWZ0OiA5MCU7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGhlaWdodDogMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDExcztcbiAgICBhbmltYXRpb24tZGVsYXk6IDExcztcbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG4gIEBrZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMwdmgpIHJvdGF0ZSg2MDBkZWcpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwicm9vdFwiPlxuICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMT5SZWdpc3RybzwvaDE+XG48ZGl2PlxuXG4gIFxuPC9kaXY+XG5cbiAgICAgICAgPGZvcm1cbiAgICAgICAgICBjbGFzcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gICAgICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZ2VveFwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveH0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW95XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWJyZVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwZWxsaWRvXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cInB3ZFwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb250cmFzZcOxYVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkMlwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb25maXJtZSBDb250cmFzZcOxYVwiXG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cImxvZ2luXCI+TG9naW48L2E+PC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiYmdfYnViYmxlc1wiPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICA8L3VsPlxuPC9kaXY+XG4iXSwic291cmNlUm9vdCI6IiJ9