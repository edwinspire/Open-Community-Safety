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
	style.id = "svelte-2e58v0-style";
	style.textContent = "@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:200;src:local(\"Source Sans Pro ExtraLight\"), local(\"SourceSansPro-ExtraLight\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf)\n        format(\"truetype\")}@font-face{font-family:\"Source Sans Pro\";font-style:normal;font-weight:300;src:local(\"Source Sans Pro Light\"), local(\"SourceSansPro-Light\"),\n      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf)\n        format(\"truetype\")}.root.svelte-2e58v0.svelte-2e58v0{box-sizing:border-box;margin:0;padding:0;font-weight:300;display:block}.body.svelte-2e58v0.svelte-2e58v0{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-2e58v0 .svelte-2e58v0::-webkit-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.body.svelte-2e58v0 .svelte-2e58v0:-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-2e58v0 .svelte-2e58v0::-moz-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;opacity:1;font-weight:300}.body.svelte-2e58v0 .svelte-2e58v0:-ms-input-placeholder{font-family:\"Source Sans Pro\", sans-serif;color:white;font-weight:300}.wrapper.svelte-2e58v0.svelte-2e58v0{background:#4877af;background:-webkit-gradient(\n      linear,\n      left top,\n      right bottom,\n      from(#4877af),\n      to(#12284a)\n    );background:linear-gradient(to bottom right, #4877af 0%, #12284a 100%);position:absolute;left:0;width:100%;height:100%;overflow:hidden}.wrapper.form-success .container.svelte-2e58v0 h1.svelte-2e58v0{-webkit-transform:translateY(85px) !important;transform:translateY(85px) !important}.container.svelte-2e58v0.svelte-2e58v0{max-width:300px;margin:0 auto;padding:80px 0;height:400px;text-align:center}.container.svelte-2e58v0 h1.svelte-2e58v0{font-size:40px !important;-webkit-transition-duration:1s;transition-duration:1s;-webkit-transition-timing-function:ease-in-put;transition-timing-function:ease-in-put;font-weight:200 !important}.form.svelte-2e58v0.svelte-2e58v0{padding:20px 0;z-index:99;position:relative}.links_block.svelte-2e58v0.svelte-2e58v0{text-align:right;padding:1em}.form.svelte-2e58v0 a.svelte-2e58v0{color:white}.form.svelte-2e58v0 a.svelte-2e58v0:visited{color:floralwhite}.form.svelte-2e58v0 input.svelte-2e58v0{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;border:1px solid rgba(255, 255, 255, 0.4);background-color:rgba(255, 255, 255, 0.2);width:-webkit-fill-available !important;border-radius:3px;padding:10px 15px;margin:0 auto 10px auto;display:block;text-align:center;font-size:1em !important;color:white;-webkit-transition-duration:0.25s;transition-duration:0.25s;font-weight:300 !important}.form.svelte-2e58v0 input.svelte-2e58v0:hover{background-color:rgba(255, 255, 255, 0.4)}.form.svelte-2e58v0 input.svelte-2e58v0:focus{background-color:white;width:300px;color:#12284a}.bg_bubbles.svelte-2e58v0.svelte-2e58v0{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0{position:absolute;list-style:none;display:block;width:40px;height:40px;background-color:rgba(255, 255, 255, 0.15);bottom:-160px;-webkit-animation:svelte-2e58v0-square 25s infinite;animation:svelte-2e58v0-square 25s infinite;-webkit-transition-timing-function:linear;transition-timing-function:linear}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(1){left:10%}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(2){left:20%;width:80px;height:80px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:17s;animation-duration:17s}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(3){left:25%;-webkit-animation-delay:4s;animation-delay:4s}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(4){left:40%;width:60px;height:60px;-webkit-animation-duration:22s;animation-duration:22s;background-color:rgba(255, 255, 255, 0.25)}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(5){left:70%}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(6){left:80%;width:120px;height:120px;-webkit-animation-delay:3s;animation-delay:3s;background-color:rgba(255, 255, 255, 0.2)}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(7){left:32%;width:160px;height:160px;-webkit-animation-delay:7s;animation-delay:7s}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(8){left:55%;width:20px;height:20px;-webkit-animation-delay:15s;animation-delay:15s;-webkit-animation-duration:40s;animation-duration:40s}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(9){left:25%;width:10px;height:10px;-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-duration:40s;animation-duration:40s;background-color:rgba(255, 255, 255, 0.3)}.bg_bubbles.svelte-2e58v0 li.svelte-2e58v0:nth-child(10){left:90%;width:160px;height:160px;-webkit-animation-delay:11s;animation-delay:11s}@-webkit-keyframes svelte-2e58v0-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}@keyframes svelte-2e58v0-square{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(-330vh) rotate(600deg);transform:translateY(-330vh) rotate(600deg)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcbiAgbGV0IFJldHVyblJlZ2lzdGVyID0ge307XG5cbiAgZnVuY3Rpb24gQ291bnRyeSgpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGFzeW5jIChwb3NpdGlvbikgPT4ge1xuICAgICAgICBQYXJhbXMuZ2VveCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgUGFyYW1zLmdlb3kgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICBHZXRDb3VudHJ5KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJObyBzZSBwdWRvIG9idGVuZXIgbGFzIGNvb3JkZW5hZGFzXCIpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0cm8uXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBGRGF0YS5wb3N0KFxuICAgICAgICBcIi9wZ2FwaS92Mi9yZWdpc3Rlci9jb21tdW5pdHktc2FmZXR5LXB3YVwiLFxuICAgICAgICBQYXJhbXMsXG4gICAgICAgIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gR2V0Q291bnRyeSgpIHtcbiAgICAvL2RhdGE9W3RpbWVvdXQ6MTBdW291dDpqc29uXTtpc19pbigtMC4yMTI2MywtNzguNDEwNTMpLT4uYTt3YXkocGl2b3QuYSk7b3V0K3RhZ3MrYmI7b3V0K2lkcytnZW9tKC0wLjIxODAzLC03OC40MTExMSwtMC4yMTE0MSwtNzguNDA1NjApO3JlbGF0aW9uKHBpdm90LmEpO291dCt0YWdzK2JiO1xuICAgIGxldCBxdWVyeSA9IGBbb3V0Ompzb25dW3RpbWVvdXQ6MTBdO2lzX2luKCR7UGFyYW1zLmdlb3h9LCR7UGFyYW1zLmdlb3l9KS0+LmE7cmVsYXRpb24ocGl2b3QuYSk7b3V0IHRhZ3MgcXQ7KHdheShhcm91bmQ6MjAsJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pOyk7b3V0IHRhZ3MgcXQ7YDtcbiAgICBsZXQgciA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9vdmVycGFzcy1hcGkuZGUvYXBpL2ludGVycHJldGVyXCIsIHtcbiAgICAgIGNyZWRlbnRpYWxzOiBcIm9taXRcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgYWNjZXB0OiBcIiovKlwiLFxuICAgICAgICBcImFjY2VwdC1sYW5ndWFnZVwiOiBcImVzLUVTLGVzO3E9MC45LGVuO3E9MC44XCIsXG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG4gICAgICAgIFwic2VjLWZldGNoLWRlc3RcIjogXCJlbXB0eVwiLFxuICAgICAgICBcInNlYy1mZXRjaC1tb2RlXCI6IFwiY29yc1wiLFxuICAgICAgICBcInNlYy1mZXRjaC1zaXRlXCI6IFwiY3Jvc3Mtc2l0ZVwiLFxuICAgICAgfSxcbiAgICAgIHJlZmVycmVyOiBgaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvcXVlcnk/bGF0PSR7UGFyYW1zLmdlb3h9Jmxvbj0ke1BhcmFtcy5nZW95fWAsXG4gICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlci13aGVuLWRvd25ncmFkZVwiLFxuICAgICAgLy9cImJvZHlcIjogYGRhdGE9JTVCdGltZW91dCUzQTEwJTVEJTVCb3V0JTNBanNvbiU1RCUzQmlzX2luKCR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KS0lM0UuYSUzQndheShwaXZvdC5hKSUzQm91dCt0YWdzK2JiJTNCb3V0K2lkcytnZW9tKCR7TnVtYmVyKHRoaXMuUGFyYW1zLmdlb3gpLnRvRml4ZWQoNSl9JTJDJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveSkudG9GaXhlZCg1KX0lMkMke3RoaXMuUGFyYW1zLmdlb3h9JTJDJHt0aGlzLlBhcmFtcy5nZW95fSklM0JyZWxhdGlvbihwaXZvdC5hKSUzQm91dCt0YWdzK2JiJTNCYCxcbiAgICAgIGJvZHk6IHF1ZXJ5LFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgIH0pO1xuICAgIGxldCBkYXRhID0gYXdhaXQgci5qc29uKCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLmVsZW1lbnRzKSAmJiBkYXRhLmVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZGF0YS5lbGVtZW50c1swXSAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MgJiZcbiAgICAgICAgZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWVcbiAgICAgICkge1xuICAgICAgICBQYXJhbXMuY291bnRyeSA9IGRhdGEuZWxlbWVudHNbMF0udGFncy5uYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiSW5pY2lhXCIpO1xuICAgIENvdW50cnkoKTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4uaGlkZGVuX2Zvcm17XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XG4gICAgc3JjOiBsb2NhbChcIlNvdXJjZSBTYW5zIFBybyBFeHRyYUxpZ2h0XCIpLCBsb2NhbChcIlNvdXJjZVNhbnNQcm8tRXh0cmFMaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaTk0X3dseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgc3JjOiBsb2NhbChcIlNvdXJjZSBTYW5zIFBybyBMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUxpZ2h0XCIpLFxuICAgICAgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9zb3VyY2VzYW5zcHJvL3YxMy82eEt5ZFNCWUtjU1YtTENvZVFxZlgxUllPbzNpazR6d2x4ZHIudHRmKVxuICAgICAgICBmb3JtYXQoXCJ0cnVldHlwZVwiKTtcbiAgfVxuICAucm9vdCB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5ib2R5IHtcbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIC8qIFdlYktpdCBicm93c2VycyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBNb3ppbGxhIEZpcmVmb3ggNCB0byAxOCAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBNb3ppbGxhIEZpcmVmb3ggMTkrICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBJbnRlcm5ldCBFeHBsb3JlciAxMCsgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAud3JhcHBlciB7XG4gICAgYmFja2dyb3VuZDogIzQ4NzdhZjtcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KFxuICAgICAgbGluZWFyLFxuICAgICAgbGVmdCB0b3AsXG4gICAgICByaWdodCBib3R0b20sXG4gICAgICBmcm9tKCM0ODc3YWYpLFxuICAgICAgdG8oIzEyMjg0YSlcbiAgICApO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20gcmlnaHQsICM0ODc3YWYgMCUsICMxMjI4NGEgMTAwJSk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbiAgLndyYXBwZXIuZm9ybS1zdWNjZXNzIC5jb250YWluZXIgaDEge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDg1cHgpICFpbXBvcnRhbnQ7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDg1cHgpICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiAzMDBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiA4MHB4IDA7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgLmNvbnRhaW5lciBoMSB7XG4gICAgZm9udC1zaXplOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAxcztcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxcztcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLXB1dDtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgZm9udC13ZWlnaHQ6IDIwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIHtcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gICAgei1pbmRleDogOTk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLmxpbmtzX2Jsb2NrIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBwYWRkaW5nOiAxZW07XG4gIH1cblxuICAuZm9ybSBhIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLmZvcm0gYTp2aXNpdGVkIHtcbiAgICBjb2xvcjogZmxvcmFsd2hpdGU7XG4gIH1cbiAgLmZvcm0gaW5wdXQge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGUgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xuICAgIG1hcmdpbjogMCBhdXRvIDEwcHggYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxZW0gIWltcG9ydGFudDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjI1cztcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjI1cztcbiAgICBmb250LXdlaWdodDogMzAwICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgfVxuICAuZm9ybSBpbnB1dDpmb2N1cyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDMwMHB4O1xuICAgIGNvbG9yOiAjMTIyODRhO1xuICB9XG5cbiAgLmJnX2J1YmJsZXMge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgei1pbmRleDogMTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XG4gICAgYm90dG9tOiAtMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNxdWFyZSAyNXMgaW5maW5pdGU7XG4gICAgYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgxKSB7XG4gICAgbGVmdDogMTAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgyKSB7XG4gICAgbGVmdDogMjAlO1xuICAgIHdpZHRoOiA4MHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgzKSB7XG4gICAgbGVmdDogMjUlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDRzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg0KSB7XG4gICAgbGVmdDogNDAlO1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGhlaWdodDogNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDUpIHtcbiAgICBsZWZ0OiA3MCU7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDYpIHtcbiAgICBsZWZ0OiA4MCU7XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogM3M7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg3KSB7XG4gICAgbGVmdDogMzIlO1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBoZWlnaHQ6IDE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDdzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg4KSB7XG4gICAgbGVmdDogNTUlO1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMTVzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMTVzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDkpIHtcbiAgICBsZWZ0OiAyNSU7XG4gICAgd2lkdGg6IDEwcHg7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICBhbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgxMCkge1xuICAgIGxlZnQ6IDkwJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMTFzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMTFzO1xuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzcXVhcmUge1xuICAgIDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzMHZoKSByb3RhdGUoNjAwZGVnKTtcbiAgICB9XG4gIH1cbiAgQGtleWZyYW1lcyBzcXVhcmUge1xuICAgIDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzMHZoKSByb3RhdGUoNjAwZGVnKTtcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJyb290XCI+XG4gIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgxPlJlZ2lzdHJvPC9oMT5cblxuICAgICAgICB7I2lmIHggPiAxMH1cbiAgICAgICAgPGRpdiA+XG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICBjbGFzcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gICAgICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZ2VveFwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveH0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW95XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWJyZVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwZWxsaWRvXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cInB3ZFwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb250cmFzZcOxYVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkMlwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb25maXJtZSBDb250cmFzZcOxYVwiXG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cImxvZ2luXCI+TG9naW48L2E+PC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHs6ZWxzZX1cbjxkaXY+XG4gIFNlIGhhIHJlZ2lzdHJhZG9cbjwvZGl2PlxuICAgICAgICB7L2lmIH1cbiAgICAgICAgICBcblxuXG5cbjxkaXYgPlxuICA8Zm9ybVxuICBjbGFzcz1cImZvcm1cIlxuICBhY3Rpb249XCIvcGdhcGkvdjIvcmVnaXN0ZXJcIlxuICBtZXRob2Q9XCJwb3N0XCJcbiAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJnZW94XCJcbiAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICBwbGFjZWhvbGRlcj1cIkdlb3hcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW94fSAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwiZ2VveVwiXG4gICAgdHlwZT1cImhpZGRlblwiXG4gICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveX0gLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cImNvdW50cnlcIlxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICByZWFkb25seVxuICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmNvdW50cnl9IC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgIHBsYWNlaG9sZGVyPVwiTm9tYnJlXCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgIHBsYWNlaG9sZGVyPVwiQXBlbGxpZG9cIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cImVtYWlsXCJcbiAgICB0eXBlPVwiZW1haWxcIlxuICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cInB3ZFwiXG4gICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICBwbGFjZWhvbGRlcj1cIkNvbnRyYXNlw7FhXCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwicHdkMlwiXG4gICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICBwbGFjZWhvbGRlcj1cIkNvbmZpcm1lIENvbnRyYXNlw7FhXCJcbiAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgPGlucHV0IG5hbWU9XCJyZWdpc3RlclwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkFjZXB0YXJcIiAvPlxuICA8ZGl2IGNsYXNzPVwibGlua3NfYmxvY2tcIj48YSBocmVmPVwibG9naW5cIj5Mb2dpbjwvYT48L2Rpdj5cbjwvZm9ybT5cblxuPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiYmdfYnViYmxlc1wiPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICA8L3VsPlxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUZFLFVBQVUsQUFBQyxDQUFDLEFBQ1Ys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 */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

// (396:8) {:else}
function create_else_block(ctx) {
	let div;
	let t;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Se ha registrado");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(div_nodes, "Se ha registrado");
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 396, 0, 10312);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(396:8) {:else}",
		ctx
	});

	return block;
}

// (338:8) {#if x > 10}
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
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input0, file, 344, 10, 8828);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "name", "geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "placeholder", "Geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input1, file, 349, 10, 8966);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "name", "country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "type", "text");
			input2.readOnly = true;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "placeholder", "Country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input2, file, 354, 10, 9104);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "name", "firstname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "placeholder", "Nombre");
			input3.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input3, file, 360, 10, 9270);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "name", "lastname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "placeholder", "Apellido");
			input4.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input4, file, 366, 10, 9452);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "name", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "type", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "placeholder", "Email");
			input5.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input5, file, 372, 10, 9634);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "name", "pwd");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "placeholder", "Contraseña");
			input6.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input6, file, 378, 10, 9806);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "name", "pwd2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "placeholder", "Confirme Contraseña");
			input7.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input7, file, 384, 10, 9982);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "name", "register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "type", "submit");
			input8.value = "Aceptar";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input8, file, 389, 10, 10132);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", "login");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 390, 35, 10223);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "links_block svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 390, 10, 10198);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "class", "form svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "action", "/pgapi/v2/register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "method", "post");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form, file, 339, 10, 8680);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 338, 8, 8663);
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
		source: "(338:8) {#if x > 10}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div5;
	let div4;
	let div3;
	let div2;
	let h1;
	let t0;
	let t1;
	let t2;
	let div1;
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
	let div0;
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

	function select_block_type(ctx, dirty) {
		if (x > 10) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Registro");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if_block.c();
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
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
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
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
			if_block.l(div2_nodes);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			form = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "FORM", { class: true, action: true, method: true });
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
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(form_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "A", { href: true, class: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t12 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Login");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			form_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
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
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h1, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 335, 8, 8615);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "name", "geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "placeholder", "Geox");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input0, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input0, file, 410, 2, 10490);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "name", "geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "placeholder", "Geoy");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input1, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input1, file, 415, 2, 10588);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "name", "country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "type", "text");
			input2.readOnly = true;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "placeholder", "Country");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input2, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input2, file, 420, 2, 10686);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "name", "firstname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "placeholder", "Nombre");
			input3.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input3, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input3, file, 426, 2, 10804);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "name", "lastname");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "type", "hidden");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "placeholder", "Apellido");
			input4.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input4, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input4, file, 432, 2, 10938);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "name", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "type", "email");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "placeholder", "Email");
			input5.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input5, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input5, file, 438, 2, 11072);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "name", "pwd");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "placeholder", "Contraseña");
			input6.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input6, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input6, file, 444, 2, 11196);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "name", "pwd2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "type", "password");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "placeholder", "Confirme Contraseña");
			input7.required = "required";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input7, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input7, file, 450, 2, 11324);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "name", "register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "type", "submit");
			input8.value = "Aceptar";
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(input8, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(input8, file, 455, 2, 11434);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", "login");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 456, 27, 11517);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "links_block svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 456, 2, 11492);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "class", "form svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "action", "/pgapi/v2/register");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(form, "method", "post");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(form, file, 405, 2, 10382);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 404, 0, 10373);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "container svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 334, 6, 8583);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "wrapper svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 333, 4, 8555);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "body svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 332, 2, 8532);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li0, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li0, file, 465, 4, 11629);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li1, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li1, file, 466, 4, 11640);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li2, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li2, file, 467, 4, 11651);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li3, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li3, file, 468, 4, 11662);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li4, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li4, file, 469, 4, 11673);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li5, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li5, file, 470, 4, 11684);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li6, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li6, file, 471, 4, 11695);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li7, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li7, file, 472, 4, 11706);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li8, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li8, file, 473, 4, 11717);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(li9, "class", "svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(li9, file, 474, 4, 11728);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(ul, "class", "bg_bubbles svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(ul, file, 464, 2, 11601);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "root svelte-2e58v0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 331, 0, 8511);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div5, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, h1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t1);
			if_block.m(div2, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, form);
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
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(form, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, a);
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
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input0, "input", /*input0_input_handler_1*/ ctx[9]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input1, "input", /*input1_input_handler_1*/ ctx[10]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input2, "input", /*input2_input_handler_1*/ ctx[11]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input3, "input", /*input3_input_handler_1*/ ctx[12]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input4, "input", /*input4_input_handler_1*/ ctx[13]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input5, "input", /*input5_input_handler_1*/ ctx[14]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(input6, "input", /*input6_input_handler_1*/ ctx[15]),
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["listen_dev"])(form, "submit", Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prevent_default"])(/*Register*/ ctx[1]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if_block.p(ctx, dirty);

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
			if_block.d();
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
	let ReturnRegister = {};

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

	function input0_input_handler_1() {
		Params.geox = this.value;
		$$invalidate(0, Params);
	}

	function input1_input_handler_1() {
		Params.geoy = this.value;
		$$invalidate(0, Params);
	}

	function input2_input_handler_1() {
		Params.country = this.value;
		$$invalidate(0, Params);
	}

	function input3_input_handler_1() {
		Params.firstname = this.value;
		$$invalidate(0, Params);
	}

	function input4_input_handler_1() {
		Params.lastname = this.value;
		$$invalidate(0, Params);
	}

	function input5_input_handler_1() {
		Params.email = this.value;
		$$invalidate(0, Params);
	}

	function input6_input_handler_1() {
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
		Register,
		GetCountry
	});

	$$self.$inject_state = $$props => {
		if ("Params" in $$props) $$invalidate(0, Params = $$props.Params);
		if ("FData" in $$props) FData = $$props.FData;
		if ("ReturnRegister" in $$props) ReturnRegister = $$props.ReturnRegister;
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
		input0_input_handler_1,
		input1_input_handler_1,
		input2_input_handler_1,
		input3_input_handler_1,
		input4_input_handler_1,
		input5_input_handler_1,
		input6_input_handler_1
	];
}

class Register_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-2e58v0-style")) add_css();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2hhMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3JlZ2lzdGVyL2luZGV4LnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQzs7O0FBR3hDO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsdUJBQXVCLDBEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQSwyRUFBMkU7QUFDM0UsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxXQUFXLHlEQUFRO0FBQ25CO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4SEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7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QUMsS0FBSzs7Ozs7RUFNWixNQUFNLENBQUMsR0FBRyIsImZpbGUiOiI5MzRhNTNiNDU0MDU3YzNlMWYwMy9yZWdpc3Rlci5yZWdpc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL1N0b3Jlcy5qc1wiO1xuaW1wb3J0IHsgaGV4X3NoYTEsIHN0cl9zaGExIH0gZnJvbSBcIi4vc2hhMS5qc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBGZXRjaERhdGEge1xuICBhc3luYyBwdXQodXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgLy9jYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy9jb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcG9zdCh1cmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICB0cnkge1xuICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICAvL2NhY2hlLnB1dChldmVudC5yZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAvL2NvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XG4gICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZ2V0KHVybCwgcXVlcnksIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2hVUkwgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICAgIGxldCB1cmxxID0gdXJsICsgXCI/XCIgKyBzZWFyY2hVUkwudG9TdHJpbmcoKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJscSwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgXG4gIH1cblxuICBhc3luYyBsb2dpbih1cmwsIHVzZXIsIHBhc3N3b3JkKSB7XG4gICAgbGV0IExTdG9yYWdlID0gbmV3IEFQUExvY2FsU3RvcmFnZSgpO1xuICAgIGxldCBwd2RvZmYgPSBhd2FpdCB0aGlzLmRpZ2VzdE1lc3NhZ2UodXNlciArIHBhc3N3b3JkKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGYgPSBhd2FpdCB0aGlzLnBvc3QoXG4gICAgICAgIHVybCxcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLFxuICAgICAgICAgIHB3ZDogcGFzc3dvcmQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKGYpO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmLmpzb24oKTtcblxuICAgICAgZGF0YS5vZmZsaW5lID0gcHdkb2ZmO1xuICAgICAgTFN0b3JhZ2Uuc2V0VXNlcihkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLnRyYWNlKGVycm9yKTtcbiAgICAgIGxldCBkYXRhID0ge307XG4gICAgICBkYXRhLmxvZ2luID0gZmFsc2U7XG4gICAgICBsZXQgdXNlciA9IExTdG9yYWdlLmdldFVzZXIoZGF0YSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuXG4gICAgICBpZiAodXNlci5vZmZsaW5lID09IHB3ZG9mZikge1xuICAgICAgICBkYXRhID0gdXNlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGlnZXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgLypcbiAgICAgICAgY29uc29sZS5sb2coaGV4X3NoYTEoJ2hvbGEnKSwgc3RyX3NoYTEoJ2hvbGEnKSk7XG4gICAgICAgIGNvbnN0IG1zZ1VpbnQ4ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1lc3NhZ2UpOyAvLyBlbmNvZGUgYXMgKHV0Zi04KSBVaW50OEFycmF5XG4gICAgICAgIGNvbnNvbGUubG9nKGNyeXB0byk7XG4gICAgICAgIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgbXNnVWludDgpOyAvLyBoYXNoIHRoZSBtZXNzYWdlXG4gICAgICAgIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpOyAvLyBjb252ZXJ0IGJ1ZmZlciB0byBieXRlIGFycmF5XG4gICAgICAgIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXlcbiAgICAgICAgICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgICAgIC5qb2luKFwiXCIpOyAvLyBjb252ZXJ0IGJ5dGVzIHRvIGhleCBzdHJpbmdcbiAgICAgICAgICAgICovXG4gICAgcmV0dXJuIGhleF9zaGExKG1lc3NhZ2UpO1xuICB9XG59XG4iLCIvKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vKlxuICogQ29uZmlndXJhYmxlIHZhcmlhYmxlcy4gWW91IG1heSBuZWVkIHRvIHR3ZWFrIHRoZXNlIHRvIGJlIGNvbXBhdGlibGUgd2l0aFxuICogdGhlIHNlcnZlci1zaWRlLCBidXQgdGhlIGRlZmF1bHRzIHdvcmsgaW4gbW9zdCBjYXNlcy5cbiAqL1xudmFyIGhleGNhc2UgPSAwOyAgLyogaGV4IG91dHB1dCBmb3JtYXQuIDAgLSBsb3dlcmNhc2U7IDEgLSB1cHBlcmNhc2UgICAgICAgICovXG52YXIgYjY0cGFkICA9IFwiXCI7IC8qIGJhc2UtNjQgcGFkIGNoYXJhY3Rlci4gXCI9XCIgZm9yIHN0cmljdCBSRkMgY29tcGxpYW5jZSAgICovXG52YXIgY2hyc3ogICA9IDg7ICAvKiBiaXRzIHBlciBpbnB1dCBjaGFyYWN0ZXIuIDggLSBBU0NJSTsgMTYgLSBVbmljb2RlICAgICAgKi9cblxuLypcbiAqIFRoZXNlIGFyZSB0aGUgZnVuY3Rpb25zIHlvdSdsbCB1c3VhbGx5IHdhbnQgdG8gY2FsbFxuICogVGhleSB0YWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgaGV4IG9yIGJhc2UtNjQgZW5jb2RlZCBzdHJpbmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZXhfc2hhMShzKXtyZXR1cm4gYmluYjJoZXgoY29yZV9zaGExKHN0cjJiaW5iKHMpLHMubGVuZ3RoICogY2hyc3opKTt9XG5leHBvcnQgZnVuY3Rpb24gYjY0X3NoYTEocyl7cmV0dXJuIGJpbmIyYjY0KGNvcmVfc2hhMShzdHIyYmluYihzKSxzLmxlbmd0aCAqIGNocnN6KSk7fVxuZXhwb3J0IGZ1bmN0aW9uIHN0cl9zaGExKHMpe3JldHVybiBiaW5iMnN0cihjb3JlX3NoYTEoc3RyMmJpbmIocykscy5sZW5ndGggKiBjaHJzeikpO31cbmZ1bmN0aW9uIGhleF9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyaGV4KGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cbmZ1bmN0aW9uIGI2NF9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyYjY0KGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cbmZ1bmN0aW9uIHN0cl9obWFjX3NoYTEoa2V5LCBkYXRhKXsgcmV0dXJuIGJpbmIyc3RyKGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSkpO31cblxuLypcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xuICovXG5mdW5jdGlvbiBzaGExX3ZtX3Rlc3QoKVxue1xuICByZXR1cm4gaGV4X3NoYTEoXCJhYmNcIikgPT0gXCJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkXCI7XG59XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIFNIQS0xIG9mIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9zaGExKHgsIGxlbilcbntcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsZW4gJSAzMik7XG4gIHhbKChsZW4gKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGxlbjtcblxuICB2YXIgdyA9IEFycmF5KDgwKTtcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XG4gIHZhciBlID0gLTEwMDk1ODk3NzY7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxuICB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIHZhciBvbGRlID0gZTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCA4MDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGogPCAxNikgd1tqXSA9IHhbaSArIGpdO1xuICAgICAgZWxzZSB3W2pdID0gcm9sKHdbai0zXSBeIHdbai04XSBeIHdbai0xNF0gXiB3W2otMTZdLCAxKTtcbiAgICAgIHZhciB0ID0gc2FmZV9hZGQoc2FmZV9hZGQocm9sKGEsIDUpLCBzaGExX2Z0KGosIGIsIGMsIGQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgc2FmZV9hZGQoc2FmZV9hZGQoZSwgd1tqXSksIHNoYTFfa3QoaikpKTtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gcm9sKGIsIDMwKTtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHQ7XG4gICAgfVxuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgIGUgPSBzYWZlX2FkZChlLCBvbGRlKTtcbiAgfVxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCwgZSk7XG5cbn1cblxuLypcbiAqIFBlcmZvcm0gdGhlIGFwcHJvcHJpYXRlIHRyaXBsZXQgY29tYmluYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBjdXJyZW50XG4gKiBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9mdCh0LCBiLCBjLCBkKVxue1xuICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgaWYodCA8IDQwKSByZXR1cm4gYiBeIGMgXiBkO1xuICBpZih0IDwgNjApIHJldHVybiAoYiAmIGMpIHwgKGIgJiBkKSB8IChjICYgZCk7XG4gIHJldHVybiBiIF4gYyBeIGQ7XG59XG5cbi8qXG4gKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9rdCh0KVxue1xuICByZXR1cm4gKHQgPCAyMCkgPyAgMTUxODUwMDI0OSA6ICh0IDwgNDApID8gIDE4NTk3NzUzOTMgOlxuICAgICAgICAgKHQgPCA2MCkgPyAtMTg5NDAwNzU4OCA6IC04OTk0OTc1MTQ7XG59XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIEhNQUMtU0hBMSBvZiBhIGtleSBhbmQgc29tZSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGNvcmVfaG1hY19zaGExKGtleSwgZGF0YSlcbntcbiAgdmFyIGJrZXkgPSBzdHIyYmluYihrZXkpO1xuICBpZihia2V5Lmxlbmd0aCA+IDE2KSBia2V5ID0gY29yZV9zaGExKGJrZXksIGtleS5sZW5ndGggKiBjaHJzeik7XG5cbiAgdmFyIGlwYWQgPSBBcnJheSgxNiksIG9wYWQgPSBBcnJheSgxNik7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKVxuICB7XG4gICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgfVxuXG4gIHZhciBoYXNoID0gY29yZV9zaGExKGlwYWQuY29uY2F0KHN0cjJiaW5iKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiBjaHJzeik7XG4gIHJldHVybiBjb3JlX3NoYTEob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDE2MCk7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxue1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiByb2wobnVtLCBjbnQpXG57XG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gOC1iaXQgb3IgMTYtYml0IHN0cmluZyB0byBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzXG4gKiBJbiA4LWJpdCBmdW5jdGlvbiwgY2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGktYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5mdW5jdGlvbiBzdHIyYmluYihzdHIpXG57XG4gIHZhciBiaW4gPSBBcnJheSgpO1xuICB2YXIgbWFzayA9ICgxIDw8IGNocnN6KSAtIDE7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoICogY2hyc3o7IGkgKz0gY2hyc3opXG4gICAgYmluW2k+PjVdIHw9IChzdHIuY2hhckNvZGVBdChpIC8gY2hyc3opICYgbWFzaykgPDwgKDMyIC0gY2hyc3ogLSBpJTMyKTtcbiAgcmV0dXJuIGJpbjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBiaW5iMnN0cihiaW4pXG57XG4gIHZhciBzdHIgPSBcIlwiO1xuICB2YXIgbWFzayA9ICgxIDw8IGNocnN6KSAtIDE7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW4ubGVuZ3RoICogMzI7IGkgKz0gY2hyc3opXG4gICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGJpbltpPj41XSA+Pj4gKDMyIC0gY2hyc3ogLSBpJTMyKSkgJiBtYXNrKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIGhleCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJpbmIyaGV4KGJpbmFycmF5KVxue1xuICB2YXIgaGV4X3RhYiA9IGhleGNhc2UgPyBcIjAxMjM0NTY3ODlBQkNERUZcIiA6IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xuICB2YXIgc3RyID0gXCJcIjtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFycmF5Lmxlbmd0aCAqIDQ7IGkrKylcbiAge1xuICAgIHN0ciArPSBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKCgzIC0gaSU0KSo4KzQpKSAmIDB4RikgK1xuICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKCgzIC0gaSU0KSo4ICApKSAmIDB4Rik7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcyB0byBhIGJhc2UtNjQgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGJpbmIyYjY0KGJpbmFycmF5KVxue1xuICB2YXIgdGFiID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYmluYXJyYXkubGVuZ3RoICogNDsgaSArPSAzKVxuICB7XG4gICAgdmFyIHRyaXBsZXQgPSAoKChiaW5hcnJheVtpICAgPj4gMl0gPj4gOCAqICgzIC0gIGkgICAlNCkpICYgMHhGRikgPDwgMTYpXG4gICAgICAgICAgICAgICAgfCAoKChiaW5hcnJheVtpKzEgPj4gMl0gPj4gOCAqICgzIC0gKGkrMSklNCkpICYgMHhGRikgPDwgOCApXG4gICAgICAgICAgICAgICAgfCAgKChiaW5hcnJheVtpKzIgPj4gMl0gPj4gOCAqICgzIC0gKGkrMiklNCkpICYgMHhGRik7XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDQ7IGorKylcbiAgICB7XG4gICAgICBpZihpICogOCArIGogKiA2ID4gYmluYXJyYXkubGVuZ3RoICogMzIpIHN0ciArPSBiNjRwYWQ7XG4gICAgICBlbHNlIHN0ciArPSB0YWIuY2hhckF0KCh0cmlwbGV0ID4+IDYqKDMtaikpICYgMHgzRik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59IiwiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgRmV0Y2hEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRmV0Y2hEYXRhLmpzXCI7XG5cbiAgbGV0IFBhcmFtcyA9IHsgZ2VveDogMCwgZ2VveTogMCwgY291bnRyeTogXCJkZWZhdWx0XCIsIGZpcnN0bmFtZTogJycsIGxhc3RuYW1lOiAnJ307XG4gIGxldCBGRGF0YSA9IG5ldyBGZXRjaERhdGEoKTtcbiAgbGV0IFJldHVyblJlZ2lzdGVyID0ge307XG5cbiAgZnVuY3Rpb24gQ291bnRyeSgpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGFzeW5jIChwb3NpdGlvbikgPT4ge1xuICAgICAgICBQYXJhbXMuZ2VveCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgUGFyYW1zLmdlb3kgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICBHZXRDb3VudHJ5KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJObyBzZSBwdWRvIG9idGVuZXIgbGFzIGNvb3JkZW5hZGFzXCIpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0cm8uXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBGRGF0YS5wb3N0KFxuICAgICAgICBcIi9wZ2FwaS92Mi9yZWdpc3Rlci9jb21tdW5pdHktc2FmZXR5LXB3YVwiLFxuICAgICAgICBQYXJhbXMsXG4gICAgICAgIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gR2V0Q291bnRyeSgpIHtcbiAgICAvL2RhdGE9W3RpbWVvdXQ6MTBdW291dDpqc29uXTtpc19pbigtMC4yMTI2MywtNzguNDEwNTMpLT4uYTt3YXkocGl2b3QuYSk7b3V0K3RhZ3MrYmI7b3V0K2lkcytnZW9tKC0wLjIxODAzLC03OC40MTExMSwtMC4yMTE0MSwtNzguNDA1NjApO3JlbGF0aW9uKHBpdm90LmEpO291dCt0YWdzK2JiO1xuICAgIGxldCBxdWVyeSA9IGBbb3V0Ompzb25dW3RpbWVvdXQ6MTBdO2lzX2luKCR7UGFyYW1zLmdlb3h9LCR7UGFyYW1zLmdlb3l9KS0+LmE7cmVsYXRpb24ocGl2b3QuYSk7b3V0IHRhZ3MgcXQ7KHdheShhcm91bmQ6MjAsJHtQYXJhbXMuZ2VveH0sJHtQYXJhbXMuZ2VveX0pOyk7b3V0IHRhZ3MgcXQ7YDtcbiAgICBsZXQgciA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9vdmVycGFzcy1hcGkuZGUvYXBpL2ludGVycHJldGVyXCIsIHtcbiAgICAgIGNyZWRlbnRpYWxzOiBcIm9taXRcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgYWNjZXB0OiBcIiovKlwiLFxuICAgICAgICBcImFjY2VwdC1sYW5ndWFnZVwiOiBcImVzLUVTLGVzO3E9MC45LGVuO3E9MC44XCIsXG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG4gICAgICAgIFwic2VjLWZldGNoLWRlc3RcIjogXCJlbXB0eVwiLFxuICAgICAgICBcInNlYy1mZXRjaC1tb2RlXCI6IFwiY29yc1wiLFxuICAgICAgICBcInNlYy1mZXRjaC1zaXRlXCI6IFwiY3Jvc3Mtc2l0ZVwiLFxuICAgICAgfSxcbiAgICAgIHJlZmVycmVyOiBgaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvcXVlcnk/bGF0PSR7UGFyYW1zLmdlb3h9Jmxvbj0ke1BhcmFtcy5nZW95fWAsXG4gICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlci13aGVuLWRvd25ncmFkZVwiLFxuICAgICAgLy9cImJvZHlcIjogYGRhdGE9JTVCdGltZW91dCUzQTEwJTVEJTVCb3V0JTNBanNvbiU1RCUzQmlzX2luKCR7dGhpcy5QYXJhbXMuZ2VveH0lMkMke3RoaXMuUGFyYW1zLmdlb3l9KS0lM0UuYSUzQndheShwaXZvdC5hKSUzQm91dCt0YWdzK2JiJTNCb3V0K2lkcytnZW9tKCR7TnVtYmVyKHRoaXMuUGFyYW1zLmdlb3gpLnRvRml4ZWQoNSl9JTJDJHtOdW1iZXIodGhpcy5QYXJhbXMuZ2VveSkudG9GaXhlZCg1KX0lMkMke3RoaXMuUGFyYW1zLmdlb3h9JTJDJHt0aGlzLlBhcmFtcy5nZW95fSklM0JyZWxhdGlvbihwaXZvdC5hKSUzQm91dCt0YWdzK2JiJTNCYCxcbiAgICAgIGJvZHk6IHF1ZXJ5LFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgIH0pO1xuICAgIGxldCBkYXRhID0gYXdhaXQgci5qc29uKCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLmVsZW1lbnRzKSAmJiBkYXRhLmVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZGF0YS5lbGVtZW50c1swXSAmJlxuICAgICAgICBkYXRhLmVsZW1lbnRzWzBdLnRhZ3MgJiZcbiAgICAgICAgZGF0YS5lbGVtZW50c1swXS50YWdzLm5hbWVcbiAgICAgICkge1xuICAgICAgICBQYXJhbXMuY291bnRyeSA9IGRhdGEuZWxlbWVudHNbMF0udGFncy5uYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiSW5pY2lhXCIpO1xuICAgIENvdW50cnkoKTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG4uaGlkZGVuX2Zvcm17XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XG4gICAgc3JjOiBsb2NhbChcIlNvdXJjZSBTYW5zIFBybyBFeHRyYUxpZ2h0XCIpLCBsb2NhbChcIlNvdXJjZVNhbnNQcm8tRXh0cmFMaWdodFwiKSxcbiAgICAgIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3Mvc291cmNlc2Fuc3Byby92MTMvNnhLeWRTQllLY1NWLUxDb2VRcWZYMVJZT28zaTk0X3dseGRyLnR0ZilcbiAgICAgICAgZm9ybWF0KFwidHJ1ZXR5cGVcIik7XG4gIH1cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgc3JjOiBsb2NhbChcIlNvdXJjZSBTYW5zIFBybyBMaWdodFwiKSwgbG9jYWwoXCJTb3VyY2VTYW5zUHJvLUxpZ2h0XCIpLFxuICAgICAgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9zb3VyY2VzYW5zcHJvL3YxMy82eEt5ZFNCWUtjU1YtTENvZVFxZlgxUllPbzNpazR6d2x4ZHIudHRmKVxuICAgICAgICBmb3JtYXQoXCJ0cnVldHlwZVwiKTtcbiAgfVxuICAucm9vdCB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5ib2R5IHtcbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIC8qIFdlYktpdCBicm93c2VycyAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICB9XG4gIC5ib2R5IDotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBNb3ppbGxhIEZpcmVmb3ggNCB0byAxOCAqL1xuICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbiAgLmJvZHkgOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBNb3ppbGxhIEZpcmVmb3ggMTkrICovXG4gICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAuYm9keSA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBJbnRlcm5ldCBFeHBsb3JlciAxMCsgKi9cbiAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIiwgc2Fucy1zZXJpZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuICAud3JhcHBlciB7XG4gICAgYmFja2dyb3VuZDogIzQ4NzdhZjtcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KFxuICAgICAgbGluZWFyLFxuICAgICAgbGVmdCB0b3AsXG4gICAgICByaWdodCBib3R0b20sXG4gICAgICBmcm9tKCM0ODc3YWYpLFxuICAgICAgdG8oIzEyMjg0YSlcbiAgICApO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20gcmlnaHQsICM0ODc3YWYgMCUsICMxMjI4NGEgMTAwJSk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbiAgLndyYXBwZXIuZm9ybS1zdWNjZXNzIC5jb250YWluZXIgaDEge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDg1cHgpICFpbXBvcnRhbnQ7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDg1cHgpICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiAzMDBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiA4MHB4IDA7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgLmNvbnRhaW5lciBoMSB7XG4gICAgZm9udC1zaXplOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAxcztcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxcztcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLXB1dDtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1wdXQ7XG4gICAgZm9udC13ZWlnaHQ6IDIwMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtIHtcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gICAgei1pbmRleDogOTk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLmxpbmtzX2Jsb2NrIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBwYWRkaW5nOiAxZW07XG4gIH1cblxuICAuZm9ybSBhIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLmZvcm0gYTp2aXNpdGVkIHtcbiAgICBjb2xvcjogZmxvcmFsd2hpdGU7XG4gIH1cbiAgLmZvcm0gaW5wdXQge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGUgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xuICAgIG1hcmdpbjogMCBhdXRvIDEwcHggYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxZW0gIWltcG9ydGFudDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjI1cztcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjI1cztcbiAgICBmb250LXdlaWdodDogMzAwICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmZvcm0gaW5wdXQ6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgfVxuICAuZm9ybSBpbnB1dDpmb2N1cyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDMwMHB4O1xuICAgIGNvbG9yOiAjMTIyODRhO1xuICB9XG5cbiAgLmJnX2J1YmJsZXMge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgei1pbmRleDogMTtcbiAgfVxuICAuYmdfYnViYmxlcyBsaSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XG4gICAgYm90dG9tOiAtMTYwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNxdWFyZSAyNXMgaW5maW5pdGU7XG4gICAgYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgxKSB7XG4gICAgbGVmdDogMTAlO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgyKSB7XG4gICAgbGVmdDogMjAlO1xuICAgIHdpZHRoOiA4MHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMnM7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgzKSB7XG4gICAgbGVmdDogMjUlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA0cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDRzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg0KSB7XG4gICAgbGVmdDogNDAlO1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGhlaWdodDogNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDUpIHtcbiAgICBsZWZ0OiA3MCU7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDYpIHtcbiAgICBsZWZ0OiA4MCU7XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDNzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogM3M7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg3KSB7XG4gICAgbGVmdDogMzIlO1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBoZWlnaHQ6IDE2MHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA3cztcbiAgICBhbmltYXRpb24tZGVsYXk6IDdzO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCg4KSB7XG4gICAgbGVmdDogNTUlO1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMTVzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMTVzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gIH1cbiAgLmJnX2J1YmJsZXMgbGk6bnRoLWNoaWxkKDkpIHtcbiAgICBsZWZ0OiAyNSU7XG4gICAgd2lkdGg6IDEwcHg7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgICBhbmltYXRpb24tZGVsYXk6IDJzO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICB9XG4gIC5iZ19idWJibGVzIGxpOm50aC1jaGlsZCgxMCkge1xuICAgIGxlZnQ6IDkwJTtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMTFzO1xuICAgIGFuaW1hdGlvbi1kZWxheTogMTFzO1xuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzcXVhcmUge1xuICAgIDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzMHZoKSByb3RhdGUoNjAwZGVnKTtcbiAgICB9XG4gIH1cbiAgQGtleWZyYW1lcyBzcXVhcmUge1xuICAgIDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMzB2aCkgcm90YXRlKDYwMGRlZyk7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzMHZoKSByb3RhdGUoNjAwZGVnKTtcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJyb290XCI+XG4gIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgxPlJlZ2lzdHJvPC9oMT5cblxuICAgICAgICB7I2lmIHggPiAxMH1cbiAgICAgICAgPGRpdiA+XG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICBjbGFzcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj1cIi9wZ2FwaS92Mi9yZWdpc3RlclwiXG4gICAgICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwiZ2VveFwiXG4gICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2VveFwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveH0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJnZW95XCJcbiAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW95fSAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuY291bnRyeX0gLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWJyZVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwZWxsaWRvXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICAgICAgICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbmFtZT1cInB3ZFwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb250cmFzZcOxYVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBuYW1lPVwicHdkMlwiXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb25maXJtZSBDb250cmFzZcOxYVwiXG4gICAgICAgICAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cInJlZ2lzdGVyXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQWNlcHRhclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmtzX2Jsb2NrXCI+PGEgaHJlZj1cImxvZ2luXCI+TG9naW48L2E+PC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHs6ZWxzZX1cbjxkaXY+XG4gIFNlIGhhIHJlZ2lzdHJhZG9cbjwvZGl2PlxuICAgICAgICB7L2lmIH1cbiAgICAgICAgICBcblxuXG5cbjxkaXYgPlxuICA8Zm9ybVxuICBjbGFzcz1cImZvcm1cIlxuICBhY3Rpb249XCIvcGdhcGkvdjIvcmVnaXN0ZXJcIlxuICBtZXRob2Q9XCJwb3N0XCJcbiAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtSZWdpc3Rlcn0+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJnZW94XCJcbiAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICBwbGFjZWhvbGRlcj1cIkdlb3hcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5nZW94fSAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwiZ2VveVwiXG4gICAgdHlwZT1cImhpZGRlblwiXG4gICAgcGxhY2Vob2xkZXI9XCJHZW95XCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZ2VveX0gLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cImNvdW50cnlcIlxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICByZWFkb25seVxuICAgIHBsYWNlaG9sZGVyPVwiQ291bnRyeVwiXG4gICAgYmluZDp2YWx1ZT17UGFyYW1zLmNvdW50cnl9IC8+XG4gIDxpbnB1dFxuICAgIG5hbWU9XCJmaXJzdG5hbWVcIlxuICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgIHBsYWNlaG9sZGVyPVwiTm9tYnJlXCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMuZmlyc3RuYW1lfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwibGFzdG5hbWVcIlxuICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgIHBsYWNlaG9sZGVyPVwiQXBlbGxpZG9cIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5sYXN0bmFtZX1cbiAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cImVtYWlsXCJcbiAgICB0eXBlPVwiZW1haWxcIlxuICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgIGJpbmQ6dmFsdWU9e1BhcmFtcy5lbWFpbH1cbiAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgPGlucHV0XG4gICAgbmFtZT1cInB3ZFwiXG4gICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICBwbGFjZWhvbGRlcj1cIkNvbnRyYXNlw7FhXCJcbiAgICBiaW5kOnZhbHVlPXtQYXJhbXMucHdkfVxuICAgIHJlcXVpcmVkPVwicmVxdWlyZWRcIiAvPlxuICA8aW5wdXRcbiAgICBuYW1lPVwicHdkMlwiXG4gICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICBwbGFjZWhvbGRlcj1cIkNvbmZpcm1lIENvbnRyYXNlw7FhXCJcbiAgICByZXF1aXJlZD1cInJlcXVpcmVkXCIgLz5cbiAgPGlucHV0IG5hbWU9XCJyZWdpc3RlclwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkFjZXB0YXJcIiAvPlxuICA8ZGl2IGNsYXNzPVwibGlua3NfYmxvY2tcIj48YSBocmVmPVwibG9naW5cIj5Mb2dpbjwvYT48L2Rpdj5cbjwvZm9ybT5cblxuPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPHVsIGNsYXNzPVwiYmdfYnViYmxlc1wiPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICAgIDxsaSAvPlxuICA8L3VsPlxuPC9kaXY+XG4iXSwic291cmNlUm9vdCI6IiJ9