const https = require("https");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

var app = (module.exports = express());
app.use(cors());

// Recolors for the script
var rawData = {};
var colors = [];
https.get(
  "https://raw.githubusercontent.com/32Vache/emc-map-colors/main/data.json",
  function (res) {
    var body = "";

    res.on("data", function (chunk) {
      body += chunk;
    });

    res.on("end", function () {
      rawData = JSON.parse(body);
      colors = rawData["data"];
    });

    res.on("error", function (r) {
      console.log(e);
    });
  }
);

// Area calculator
/**
 * Calculate area of polygon.
 * @function calcArea
 * @param {Array} x Array of X coordinates
 * @param {Array} y Array of Y coordinates
 * @param {number} ptsNum Amount of coordinate points
 * @returns {number} Calculated area
 */
function calcArea(x, y, ptsNum) {
  let area = 0;
  let j = ptsNum - 1;

  for (let i = 0; i < ptsNum; i++) {
    area = area + (x[j] + x[i]) * (y[j] - y[i]);
    j = i;
  }

  return Math.abs(area / 2);
}

// Byte convert function
/**
 * Format bytes into KB, MB, GB, etc.
 * @function formatBytes
 * @param {number} bytes Amount of bytes
 * @param {number} decimals Amount of decimals on the result
 * @returns {string} Formatted bytes
 */
function formatBytes(bytes, decimals) {
  if (bytes <= 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Builds recolored marker_earth.json
function builder() {
  https.get(
    "https://earthmc.net/map/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        // Iterate through areas, add town chunk amoun, and recolor and add meganation name if necessary
        for (let i in areas) {
          var desc = areas[i]["desc"];
          let desc_title = desc.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          if (desc_title) {
            desc_title = desc_title[1];

            if (desc_title) {
              let nation = desc_title.match(/.+? \((.+?)\)$/);
              if (nation) {
                nation = nation[1];
                if (nation) {
                  // Check if nation has recolor
                  for (let e of colors) {
                    let nats = e["nations"];
                    for (let n of nats) {
                      if (n.toLowerCase() === nation.toLowerCase()) {
                        // Nation has recolor, modify the color and the popup
                        // console.log(`Recolored ${nation}!`);

                        let start = desc.match(
                          /(<div><div><span style=\"font-size:120%\">.+? \(.+?\)<\/span>)/
                        );
                        let end = desc.match(/(<br \/> Mayor <span .+<\/div>)/);
                        let area = calcArea(
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "x"
                          ],
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "z"
                          ],
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "x"
                          ].length
                        );

                        // Show chunk amount and meganation name.

                        let popup = `${
                          start[1]
                        }<br /><span style="font-size:80%">Part of </span><span style="font-size:90%">${
                          e["name"]
                        }</span><br /><span style="font-size:80%">Town size: </span><span style="font-size:90%">${(
                          area / 256
                        ).toString()}</span><span style="font-size:80%"> chunks</span>${
                          end[1]
                        }`;
                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "desc"
                        ] = popup;

                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "fillcolor"
                        ] = e["color"][1] || e["color"][0];
                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "color"
                        ] = e["color"][0];
                      } else {
                        // No recolor, but add town chunk amount anyways

                        let start = desc.match(
                          /(<div><div><span style=\"font-size:120%\">.+? \(.+?\)<\/span>)/
                        );
                        let end = desc.match(/(<br \/> Mayor <span .+<\/div>)/);
                        let town = desc_title.match(/(.+?) \(.+?\)$/);
                        let area = calcArea(
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "x"
                          ],
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "z"
                          ],
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "x"
                          ].length
                        );
                        /*
                        if (!town[1].endsWith("(Shop)")) {
                          let popup = `${
                            start[1]
                          }<br /><span style="font-size:80%">Town size: </span><span style="font-size:90%">${(
                            area / 256
                          ).toString()}</span><span style="font-size:80%"> chunks</span>${
                            end[1]
                          }`;
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "desc"
                          ] = popup;
                        }
                        */
                      }
                    }
                  }
                }
              }
            }
          }
        }
        // Replace true/false attributes from popup with actual phrases
        for (let i in areas) {
          var pop = areas[i]["desc"];
          
          pop = pop.replace(/hasUpkeep: true/,'Upkeep enabled');
          pop = pop.replace(/hasUpkeep: false/,'Upkeep disabled');
          pop = pop.replace(/pvp: true/,'PvP is allowed');
          pop = pop.replace(/pvp: false/,'PvP is disallowed');
          pop = pop.replace(/mobs: true/,'Mob spawns enabled');
          pop = pop.replace(/mobs: false/,'Mob spawns disabled');
          pop = pop.replace(/public: true/,'Town is public');
          pop = pop.replace(/public: false/,'Town is not public');
          pop = pop.replace(/explosion: true/,'Explosions enabled');
          pop = pop.replace(/explosion: false/,'Explosions disabled');
          pop = pop.replace(/fire: true/,'Fire spread enabled');
          pop = pop.replace(/fire: false/,'Fire spread disabled');
          pop = pop.replace(/capital: true/,'Captial of the nation');
          pop = pop.replace(/capital: false/,'Town of the nation');

          Response["sets"]["townyPlugin.markerset"]["areas"][i][
            "desc"
          ] = pop;
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}

// Run it on startup...
builder();

// ...and every five minutes.
setInterval(function () {
  builder();
}, 300000);
// FIlters player updates
// Runs every 5 seconds to always have up to date data.
setInterval(function () {
  https.get(
    `https://earthmc.net/map/up/world/earth/${Date.now()}`,
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        // If update is bigger than 32KB, it definitifly contains areas updates which reset the map colors
        if (body.length < 32768) {
          // Update is less than 32KB, it is a player data update only. Simply pass it to the web server
          fs.writeFileSync("update.json", body, (err) => {
            if (err) console.log(err);
          });
        } else {
          // Update is more than 32KB, skipping it.
          let byte = formatBytes(body.length, 2);
          console.log(`Update is ${byte}, skipping.`);
        }
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}, 5000); // 5 seconds

// Passes the recolored marker_earth.json or clean update.json when requested
app.get("/:file(*)", function (req, re, next) {
  var file = req.params.file,
    path = __dirname + "/" + file;
  re.sendFile(path);
  console.log(`${file} sent!`);
});

app.listen(process.env.PORT);
console.log("Express started on port %d", process.env.PORT);
