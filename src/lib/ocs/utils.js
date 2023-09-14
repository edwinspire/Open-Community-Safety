const { PORT, LOCAL_WS_USERNAME, LOCAL_WS_PASSWORD } = process.env
import uFetch from "@edwinspire/universal-fetch";

export const app_name = "ocs";

export const local_host_root = (/** @type {string} */ path)=>{
    let p = `http://localhost:${PORT}${path}`;
    console.log(p); 
return p; 
}

export const fetchOCS = (/** @type {string} */ url)=>{
// @ts-ignore
let f = new uFetch(local_host_root(url));
f.setBasicAuthorization(LOCAL_WS_USERNAME, LOCAL_WS_PASSWORD);
return f;
}
