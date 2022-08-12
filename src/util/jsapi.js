import app from "@/main.js";

export function getStorageItem(params = {}, stateKey = "") {
  // let res;
  return app.$store.state[stateKey][params.name];
  // return new Promise((resolve, reject) => {
  //   if (app.$store.state.Public.platform === "mobile") {
  //     dd.getStorageItem(params)
  //       .then((res) => {
  //         resolve(JSON.parse(res.value));
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   } else {
  //   //   dd.confirm({
  //   //     title: "user",
  //   //     message: JSON.stringify(app.$store.state[stateKey]),
  //   //     buttonLabels: ["ok", "cancel"],
  //   //   });
  //     res = app.$store.state[stateKey][params.name];
  //     resolve(res);
  //   }
  // });
}
