const { PORT } = process.env

export const app_name = "ocs";

export const local_host_root = (/** @type {string} */ path)=>{
return `http://localhost:${PORT}/${path}`; 
}