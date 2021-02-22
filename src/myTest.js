const search = require("./search");
const data = require("./data");

console.log(
  search(data, {
    id: 3,
    "settings.live": true,
    "settings.lastActive": "2021-02-16",
    name: "Bill",
  })
);
