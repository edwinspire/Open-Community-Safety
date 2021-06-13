import { FetchData } from "@edwinspire/fetch/FetchData.js";
export async function GetData(url, params, method) {
  const FData = new FetchData();
  let DataArray = [];
  if (FData) {
    try {
      let res;
      switch (method) {
        case "GET":
          res = await FData.get(url, params, {
            "Content-Type": "application/json",
          });

          break;
        default:
          res = await FData.get(url, params, {
            "Content-Type": "application/json",
          });
          break;
      }

      if (res && res.ok) {
        let data = await res.json();

        if (Array.isArray(data)) {
          DataArray = data;
        } else {
          console.warn(data);
        }
      } else {
        console.error(res);
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    console.warn("FDada no ha sido inicializada");
  }

  return DataArray;
}
