const https = require("https");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

var app = (module.exports = express());
app.use(cors());

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
function builderTNpop() {
  https.get(
    "https://earthmc.net/map/nova/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        for (let i in areas) {
          var pop = areas[i]["desc"];
          let resList = pop.match(
            /Members <span style=\"font-weight:bold\">(.+?)<\/span>/
          );
          var mCount = (resList[1].match(/,/g) || []).length + 1;

          var popcolor = "#000000";
          mCount >= 50 ? (popcolor = "#00AA00") : "";
          mCount <= 49 ? (popcolor = "#00CC00") : "";
          mCount <= 42 ? (popcolor = "#00FF00") : "";
          mCount <= 36 ? (popcolor = "#66FF00") : "";
          mCount <= 28 ? (popcolor = "#99FF00") : "";
          mCount <= 20 ? (popcolor = "#CCFF00") : "";
          mCount <= 15 ? (popcolor = "#EEEE00") : "";
          mCount <= 10 ? (popcolor = "#FFCC00") : "";
          mCount <= 6 ? (popcolor = "#FF6600") : "";
          mCount <= 4 ? (popcolor = "#FF2200") : "";
          mCount = 2 ? (popcolor = "#EE0000") : "";
          mCount = 1 ? (popcolor = "#CC0000") : "";

          Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            popcolor;
          Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            popcolor;
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth_tn_pop.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}

function builderTApop() {
  https.get(
    "https://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        for (let i in areas) {
          var pop = areas[i]["desc"];
          let resList = pop.match(
            /Members <span style=\"font-weight:bold\">(.+?)<\/span>/
          );
          var mCount = (resList[1].match(/,/g) || []).length + 1;

          var popcolor = "#000000";
          mCount >= 100 ? (popcolor = "#008800") : "";
          mCount <= 99 ? (popcolor = "#00AA00") : "";
          mCount <= 49 ? (popcolor = "#00CC00") : "";
          mCount <= 42 ? (popcolor = "#00FF00") : "";
          mCount <= 36 ? (popcolor = "#66FF00") : "";
          mCount <= 28 ? (popcolor = "#99FF00") : "";
          mCount <= 20 ? (popcolor = "#CCFF00") : "";
          mCount <= 15 ? (popcolor = "#EEEE00") : "";
          mCount <= 10 ? (popcolor = "#FFCC00") : "";
          mCount <= 6 ? (popcolor = "#FF6600") : "";
          mCount <= 4 ? (popcolor = "#FF2200") : "";
          mCount = 2 ? (popcolor = "#EE0000") : "";
          mCount = 1 ? (popcolor = "#CC0000") : "";

          Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            popcolor;
          Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            popcolor;
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth_ta_pop.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}

function builderTAarea() {
  https.get(
    "https://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        for (let i in areas) {
          let area =
            calcArea(
              Response["sets"]["townyPlugin.markerset"]["areas"][i]["x"],
              Response["sets"]["townyPlugin.markerset"]["areas"][i]["z"],
              Response["sets"]["townyPlugin.markerset"]["areas"][i]["x"].length
            ) / 256;

          var areacolor = "#000000";
          area >= 940 ? (areacolor = "#008800") : "";
          area <= 939 ? (areacolor = "#00AA00") : "";
          area <= 768 ? (areacolor = "#00FF00") : "";
          area <= 640 ? (areacolor = "#66FF00") : "";
          area <= 512 ? (areacolor = "#99FF00") : "";
          area <= 384 ? (areacolor = "#CCFF00") : "";
          area <= 256 ? (areacolor = "#EEEE00") : "";
          area <= 128 ? (areacolor = "#FFCC00") : "";
          area <= 64 ? (areacolor = "#FF6600") : "";
          area <= 32 ? (areacolor = "#FF2200") : "";
          area <= 16 ? (areacolor = "#EE0000") : "";
          area = 1 ? (areacolor = "#CC0000") : "";

          Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            areacolor;
          Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            areacolor;
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth_tn_area.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}

function builderTNarea() {
  https.get(
    "https://earthmc.net/map/nova/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        for (let i in areas) {
          let area =
            calcArea(
              Response["sets"]["townyPlugin.markerset"]["areas"][i]["x"],
              Response["sets"]["townyPlugin.markerset"]["areas"][i]["z"],
              Response["sets"]["townyPlugin.markerset"]["areas"][i]["x"].length
            ) / 256;

          var areacolor = "#000000";
          area >= 940 ? (areacolor = "#008800") : "";
          area <= 939 ? (areacolor = "#00AA00") : "";
          area <= 768 ? (areacolor = "#00FF00") : "";
          area <= 640 ? (areacolor = "#66FF00") : "";
          area <= 512 ? (areacolor = "#99FF00") : "";
          area <= 384 ? (areacolor = "#CCFF00") : "";
          area <= 256 ? (areacolor = "#EEEE00") : "";
          area <= 128 ? (areacolor = "#FFCC00") : "";
          area <= 64 ? (areacolor = "#FF6600") : "";
          area <= 32 ? (areacolor = "#FF2200") : "";
          area <= 16 ? (areacolor = "#EE0000") : "";
          area = 1 ? (areacolor = "#CC0000") : "";

          Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            areacolor;
          Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            areacolor;
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth_ta_area.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}

function builderTNopen() {
  https.get(
    "https://earthmc.net/map/nova/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        for (let i in areas) {
          var pop = areas[i]["desc"];

          var public = pop.toLowerCase().includes("public: true");

          if (public) {
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
              "#00EE00";
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
              "#00EE00";
          } else {
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
              "#EE0000";
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
              "#EE0000";
          }
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth_tn_open.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}

function builderTAopen() {
  https.get(
    "https://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        for (let i in areas) {
          var pop = areas[i]["desc"];

          var public = pop.toLowerCase().includes("public: true");

          if (public) {
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
              "#00EE00";
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
              "#00EE00";
          } else {
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
              "#EE0000";
            Response["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
              "#EE0000";
          }
        }

        // Write file and push to web
        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth_ta_open.json", final, (err) => {
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
builderTNpop();
builderTApop();
builderTNarea();
builderTAarea();
builderTNopen();
builderTAopen();

// ...and every three minutes.
setInterval(function () {
  builderTNpop();
  builderTApop();
  builderTNarea();
  builderTAarea();
  builderTNopen();
  builderTAopen();
}, 180000);

// Filters player updates
// Runs every 2 seconds to always have up-to-date data.
setInterval(function () {
  https.get(
    `https://earthmc.net/map/nova/up/world/earth/${Date.now()}`,
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        // If update is bigger than 64KB, it definitifly contains areas updates which reset the map colors
        if (body.length < 65536) {
          // Update is less than 64KB, it is a player data update only. Simply pass it to the web server
          fs.writeFileSync("update_tn.json", body, (err) => {
            if (err) console.log(err);
          });
        } else {
          // Update is more than 64KB, skipping it.
          let byte = formatBytes(body.length, 2);
          console.log(`Update is ${byte}, skipping.`);
        }
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}, 2000); // 2 seconds

setInterval(function () {
  https.get(
    `https://earthmc.net/map/aurora/up/world/earth/${Date.now()}`,
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        // If update is bigger than 64KB, it definitifly contains areas updates which reset the map colors
        if (body.length < 65536) {
          // Update is less than 64KB, it is a player data update only. Simply pass it to the web server
          fs.writeFileSync("update_ta.json", body, (err) => {
            if (err) console.log(err);
          });
        } else {
          // Update is more than 64KB, skipping it.
          let byte = formatBytes(body.length, 2);
          console.log(`Update is ${byte}, skipping.`);
        }
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}, 2000); // 2 seconds

// Passes the recolored marker_earth.json or clean update.json when requested
app.get("/:file(*)", function (req, re, next) {
  var file = req.params.file,
    path = __dirname + "/" + file;
  re.sendFile(path);
  console.log(`${file} sent!`);
});

app.listen(process.env.PORT);
console.log("Express started on port %d", process.env.PORT);
