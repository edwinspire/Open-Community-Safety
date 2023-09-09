import { app_name } from "../../../ocs/utils.js";
//"$lib/ocs/utils.js";

//export const prefix_tbl = 'ocs_';

export const tbl_with_prefix = (/** @type {string} */ tbl_name) => {
    return app_name + "_" + tbl_name;
}