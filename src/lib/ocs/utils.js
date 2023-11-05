const { PORT, LOCAL_WS_USERNAME, LOCAL_WS_PASSWORD } = process.env
import uFetch from "@edwinspire/universal-fetch";

export const app_name = "ocs";

export const local_host_root = (/** @type {string} */ path) => {
    let p = `http://localhost:${PORT}${path}`;
    console.log(p);
    return p;
}

export const fetchOCS = (/** @type {string} */ url) => {
    // @ts-ignore
    let f = new uFetch(local_host_root(url));
    f.setBasicAuthorization(LOCAL_WS_USERNAME, LOCAL_WS_PASSWORD);
    return f;
}

export const CommunicationCommand =
{
    REGISTER_DEVICE: 1,
    SET_DEVICE_ID: 2, // Register on the server
    ALARM: 3,
    SETTING: 4,
    GET_SETTINGS: 5,
    SET_SETTINGS: 6,
    STATUS_DEVICE: 7,
    GET_STATUS_DEVICE: 8,
    ERROR: 9,
    RESTORE_DEFAULT_VALUES: 10,
    DISCONNET: 11,
    RESET_DEVICE: 12,
    REGISTER_DEVICE_SUCCESS: 13,
    REGISTER_DEVICE_ERROR: 14
};

/**
 * @param {number} val
 */
export function CommunicationCommandFromNumberExists(val) {

    for (const v in CommunicationCommand) {
        if (CommunicationCommand[v] === val) {
            return CommunicationCommand[v];
        }
    }
    return undefined;
}