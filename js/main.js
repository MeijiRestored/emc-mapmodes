// setInteractive Plugin
L.Layer.prototype.setInteractive = function (interactive) {
  if (this.getLayers) {
    this.getLayers().forEach((layer) => {
      layer.setInteractive(interactive);
    });
    return;
  }
  if (!this._path) {
    return;
  }

  this.options.interactive = interactive;

  if (interactive) {
    L.DomUtil.addClass(this._path, "leaflet-interactive");
  } else {
    L.DomUtil.removeClass(this._path, "leaflet-interactive");
  }
};

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

/**
 * Convert dynmap marker data to a leaflet layer group.
 */
function leafletConvert(dynMarker, layer) {
  var areas = dynMarker["sets"]["townyPlugin.markerset"]["areas"];
  for (let i in areas) {
    var desc = areas[i]["desc"];
    var coordArray = [];

    for (let j in dynMarker["sets"]["townyPlugin.markerset"]["areas"][i]["x"]) {
      coordArray.push([
        -dynMarker["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
        dynMarker["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
      ]);
    }

    if (desc.includes("(Shop)") == true) {
      // Destroy shop shapes.
    } else {
      mapdata[layer].addLayer(
        L.polygon(coordArray, {
          color:
            dynMarker["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
          fillColor:
            dynMarker["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
          fillOpacity: 0.3,
          weight: 2,
        }).bindPopup(desc, {
          maxWidth: 350,
        })
      );
    }
  }
}

// Pre-load data
var mapdata = {
  pvp: L.layerGroup(),
  clf: L.layerGroup(),
  claim: L.layerGroup(),
  popu: L.layerGroup(),
  deft: L.layerGroup(),
  den: L.layerGroup(),
  nb: L.layerGroup(),
  ttpop: L.layerGroup(),
};

var capitals = L.layerGroup();
var capitalNames = L.layerGroup();

var distEnabled = false;
var mapclicks = 0;
var pt1 = L.marker();
var pt2 = L.marker();
var distLine = L.polyline([
  [0, 0],
  [0, 0],
]);
var locked = false;
var distIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/32Vache/emc-mapmodes/main/assets/dist-point.png",

  iconSize: [15, 15],
  iconAnchor: [7, 7],
});

var current = "deft";

$("#loadingText").html("Fetching map data<br /><br />");
$("#barContainer").html(
  '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 25%; height: 100%"></div>'
);

fetch(
  "https://sus-9jn4.onrender.com/https://earthmc.net/map/aurora/standalone/MySQL_markers.php?marker=_markers_/marker_earth.json"
)
  .then((response) => response.json())
  .then((markerTA) => {
    if (markerTA.length < 2000) {
      $("#loadingtip").html("Error!");
      $("#loadingText").html(
        "EarthMC did not return any data!<br />Please try refreshing the page.<br /><br />"
      );
      $("#barContainer").html(
        '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-red"style="width: 25%; height: 100%"></div>'
      );
    } else {
      $("#loadingText").html("Processing data<br /><br />");
      $("#barContainer").html(
        '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 50%; height: 100%"></div>'
      );

      // Build recolors
      // =============
      // Coloful mode
      // =============

      var markerclf = JSON.stringify(markerTA);
      markerclf = JSON.parse(markerclf);
      var areasclf = markerclf["sets"]["townyPlugin.markerset"]["areas"];

      for (let i in areasclf) {
        var desc = areasclf[i]["desc"];
        let desc_title = desc.match(
          /<span style=\"font-size:120%\">(.+?)<\/span>/
        );
        if (desc_title) {
          var names = [];
          if (desc_title[1].includes("</a>") == true) {
            names = desc_title[1].match(
              /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
            );
            names = [names[0], names[1], names[3], names[2]];
          } else {
            names = desc_title[1].match(/(.+) \((.+|)\)/);
          }
          if (names[2] == "") {
            names[2] = "Nationless";
            markerclf["sets"]["townyPlugin.markerset"]["areas"][i][
              "fillcolor"
            ] = "#383838";
            markerclf["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
              "#121212";
          } else {
            // Generate random recolor for each nation
            var randomcolor = "#696969";
            var nationid = 0;
            for (let k = 0; k < names[2].length; k++) {
              nationid += names[2].charCodeAt(k) * (k + 1);
            }
            if (nationid > 16776) {
              nationid *= 100;
            } else if (nationid < 1049) {
              nationid *= 10000;
            } else {
              nationid *= 1000;
            }

            var nationhex = "#" + nationid.toString(16);
            if (nationhex.length != 7) {
              console.log([names[2], nationhex]);
            }

            markerclf["sets"]["townyPlugin.markerset"]["areas"][i][
              "fillcolor"
            ] = nationhex;
            markerclf["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
              nationhex;
          }

          var infos = desc.match(
            /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
          );

          desc = `<span style="font-size:130%">${
            infos[3] == "true" ? "★ " + names[1] : names[1]
          }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
            names[3]
              ? "<a href='" +
                names[3] +
                "' target='_blank' title='Wiki link'>📖</a>"
              : ""
          }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
            infos[1]
          }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
            infos[2]
          }`;

          markerclf["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] = desc;
          desc_title = desc_title[1];

          if (desc_title) {
            var nation = [];
            if (desc_title.includes("</a>") == true) {
              nation = desc_title.match(/.+? \(<.+?>(.+?)<\/a>\)$/);
            } else {
              nation = desc_title.match(/.+? \((.+?)\)$/);
            }
            if (nation) {
              nation = nation[1];
              if (nation) {
                // Check if nation has recolor
                for (let e of nationcolors) {
                  if (e["name"].toLowerCase() === nation.toLowerCase()) {
                    markerclf["sets"]["townyPlugin.markerset"]["areas"][i][
                      "fillcolor"
                    ] = e["color"];
                    markerclf["sets"]["townyPlugin.markerset"]["areas"][i][
                      "color"
                    ] = e["color"];
                  }
                }
              }
            }
          }
        }
      }

      // ===============
      // Population Mode
      // ===============

      var markerpop = JSON.stringify(markerTA);
      markerpop = JSON.parse(markerpop);
      var areaspop = markerpop["sets"]["townyPlugin.markerset"]["areas"];

      // First figure exact population for each town (fix for towns cut in several polygons)
      let poplist = {};
      for (let i in areaspop) {
        var pop = areaspop[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          let resList = pop.match(
            /Members <span style=\"font-weight:bold\">(.+?)<\/span>/
          );
          var mc = (resList[1].match(/,/g) || []).length + 1;

          if (poplist[desc_title] == undefined) {
            poplist[desc_title] = [mc, false];
          }
        }
      }

      for (let i in areaspop) {
        var pop = areaspop[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          var mCount = poplist[desc_title][0];

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
          mCount == 2 ? (popcolor = "#EE0000") : "";
          mCount == 1 ? (popcolor = "#CC0000") : "";

          var names = [];
          if (desc_title[1].includes("</a>") == true) {
            names = desc_title[1].match(
              /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
            );
            names = [names[0], names[1], names[3], names[2]];
          } else {
            names = desc_title[1].match(/(.+) \((.+|)\)/);
          }
          if (names[2] == "") {
            names[2] = "Nationless";
          }

          var infos = pop.match(
            /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
          );

          pop = `<span style="font-size:130%">${
            infos[3] == "true" ? "★ " + names[1] : names[1]
          }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
            names[3]
              ? "<a href='" +
                names[3] +
                "' target='_blank' title='Wiki link'>📖</a>"
              : ""
          }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
            infos[1]
          }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
            infos[2]
          }<br/><br/><span style="font-size:120%">P</span><span style="font-size:90%">OPULATION</span> : <b><span style="font-size:120%; color:${popcolor}">${mCount}</span></b>`;

          markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] = pop;

          markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            popcolor;
          markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            popcolor;
        }
      }

      // ===========
      // Claims Mode
      // ===========

      var markerclaim = JSON.stringify(markerTA);
      markerclaim = JSON.parse(markerclaim);
      var areasclaim = markerclaim["sets"]["townyPlugin.markerset"]["areas"];
      // First figure exact area for each town (fix for towns cut in several polygons)
      let arealist = {};
      for (let i in areasclaim) {
        var pop = areasclaim[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          let areao =
            calcArea(
              markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["x"],
              markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["z"],
              markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["x"]
                .length
            ) / 256;

          if (arealist[desc_title] == undefined) {
            arealist[desc_title] = areao;
          } else {
            arealist[desc_title] += areao;
          }
        }
      }

      for (let i in areasclaim) {
        var pop = areasclaim[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );

          let area = arealist[desc_title];

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
          area == 1 ? (areacolor = "#CC0000") : "";

          var names = [];
          if (desc_title[1].includes("</a>") == true) {
            names = desc_title[1].match(
              /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
            );
            names = [names[0], names[1], names[3], names[2]];
          } else {
            names = desc_title[1].match(/(.+) \((.+|)\)/);
          }
          if (names[2] == "") {
            names[2] = "Nationless";
          }

          var infos = pop.match(
            /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
          );

          pop = `<span style="font-size:130%">${
            infos[3] == "true" ? "★ " + names[1] : names[1]
          }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
            names[3]
              ? "<a href='" +
                names[3] +
                "' target='_blank' title='Wiki link'>📖</a>"
              : ""
          }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
            infos[1]
          }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
            infos[2]
          }<br/><br/><span style="font-size:120%">C</span><span style="font-size:90%">LAIMS</span> : <b><span style="font-size:120%; color:${areacolor}">${area}</span></b> <span style="font-size:85%">CHUNKS</span>`;

          markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] =
            pop;

          markerclaim["sets"]["townyPlugin.markerset"]["areas"][i][
            "fillcolor"
          ] = areacolor;
          markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            areacolor;
        }
      }

      // =================
      // Nation Bonus Mode
      // =================

      var markernb = JSON.stringify(markerTA);
      markernb = JSON.parse(markernb);
      var areasnb = markernb["sets"]["townyPlugin.markerset"]["areas"];
      let nationpop = {};
      // First figure population for every nation
      for (let i in areasnb) {
        var pop = areasnb[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          var mCount = 0;
          if (poplist[desc_title][1] == false) {
            mCount = poplist[desc_title][0];
            poplist[desc_title][1] = true;
          }
          var nation = [];
          if (desc_title.includes("</a>") == true) {
            nation = desc_title[1].match(/.+? \(<.+?>(.+?)<\/a>\)$/);
          } else {
            nation = desc_title[1].match(/.+? \((.+?)\)$/);
          }

          if (nation === null) {
            // ignore nationless
          } else {
            if (nationpop[nation[1]] == undefined) {
              nationpop[nation[1]] = mCount;
            } else {
              nationpop[nation[1]] += mCount;
            }
          }
        }
      }

      for (let i in areasnb) {
        var pop = areasnb[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          var nation = [];
          if (desc_title.includes("</a>") == true) {
            nation = desc_title[1].match(/.+? \(<.+?>(.+?)<\/a>\)$/);
          } else {
            nation = desc_title[1].match(/.+? \((.+?)\)$/);
          }

          var nbcolor = "#000000";
          var nbo = 0;
          if (nation === null) {
            nbcolor = "#000000";
          } else {
            let popul = nationpop[nation[1]];
            popul >= 120 ? (nbcolor = "#00BBEE") : "";
            popul <= 119 ? (nbcolor = "#009900") : "";
            popul <= 89 ? (nbcolor = "#55CC00") : "";
            popul <= 59 ? (nbcolor = "#FFCC00") : "";
            popul <= 39 ? (nbcolor = "#FF3300") : "";
            popul <= 9 ? (nbcolor = "#000000") : "";

            popul >= 120 ? (nbo = 80) : "";
            popul <= 119 ? (nbo = 60) : "";
            popul <= 89 ? (nbo = 50) : "";
            popul <= 59 ? (nbo = 30) : "";
            popul <= 39 ? (nbo = 10) : "";
            popul <= 9 ? (nbo = 0) : "";
          }

          var names = [];
          if (desc_title[1].includes("</a>") == true) {
            names = desc_title[1].match(
              /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
            );
            names = [names[0], names[1], names[3], names[2]];
          } else {
            names = desc_title[1].match(/(.+) \((.+|)\)/);
          }
          if (names[2] == "") {
            names[2] = "Nationless";
          }

          var infos = pop.match(
            /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
          );

          pop = `<span style="font-size:130%">${
            infos[3] == "true" ? "★ " + names[1] : names[1]
          }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
            names[3]
              ? "<a href='" +
                names[3] +
                "' target='_blank' title='Wiki link'>📖</a>"
              : ""
          }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
            infos[1]
          }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
            infos[2]
          }<br/><br/><span style="font-size:120%">N</span><span style="font-size:90%">ATION BONUS</span> : <b><span style="font-size:120%; color:${nbcolor}">${nbo}</span></b>`;

          markernb["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] = pop;

          markernb["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            nbcolor;
          markernb["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            nbcolor;
        }
      }

      // =======================
      // Nation Population Mode
      // =======================

      var markerttpop = JSON.stringify(markerTA);
      markerttpop = JSON.parse(markerttpop);
      var areasttpop = markerttpop["sets"]["townyPlugin.markerset"]["areas"];

      for (let i in areasttpop) {
        var pop = areasttpop[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          var nation = [];
          if (desc_title.includes("</a>") == true) {
            nation = desc_title[1].match(/.+? \(<.+?>(.+?)<\/a>\)$/);
          } else {
            nation = desc_title[1].match(/.+? \((.+?)\)$/);
          }

          var ttpopcolor = "#E1DFCE";
          if (nation === null) {
            ttpopcolor = "#E1DFCE";
          } else {
            let popul = nationpop[nation[1]];
            popul > 400 ? (ttpopcolor = "#51A96D") : "";
            popul <= 400 ? (ttpopcolor = "#5EA462") : "";
            popul <= 300 ? (ttpopcolor = "#7EB266") : "";
            popul <= 200 ? (ttpopcolor = "#A4BB59") : "";
            popul <= 160 ? (ttpopcolor = "#A9C065") : "";
            popul <= 120 ? (ttpopcolor = "#B7C76D") : "";
            popul <= 75 ? (ttpopcolor = "#C0CD77") : "";
            popul <= 50 ? (ttpopcolor = "#CCD392") : "";
            popul <= 30 ? (ttpopcolor = "#D3D6A1") : "";
            popul <= 20 ? (ttpopcolor = "#D7D9A8") : "";
            popul <= 10 ? (ttpopcolor = "#DEDEBC") : "";
            popul <= 3 ? (ttpopcolor = "#E1DFCE") : "";
          }

          var names = [];
          if (desc_title[1].includes("</a>") == true) {
            names = desc_title[1].match(
              /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
            );
            names = [names[0], names[1], names[3], names[2]];
          } else {
            names = desc_title[1].match(/(.+) \((.+|)\)/);
          }
          if (names[2] == "") {
            names[2] = "Nationless";
          }

          var infos = pop.match(
            /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
          );

          pop = `<span style="font-size:130%">${
            infos[3] == "true" ? "★ " + names[1] : names[1]
          }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
            names[3]
              ? "<a href='" +
                names[3] +
                "' target='_blank' title='Wiki link'>📖</a>"
              : ""
          }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
            infos[1]
          }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
            infos[2]
          }<br/><br/><span style="font-size:120%">N</span><span style="font-size:90%">ATION POPULATION</span> : <b><span style="font-size:120%; color:${ttpopcolor}">${
            nation == null ? "None" : nationpop[nation[1]]
          }</span></b>`;

          markerttpop["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] =
            pop;

          markerttpop["sets"]["townyPlugin.markerset"]["areas"][i][
            "fillcolor"
          ] = ttpopcolor;
          markerttpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            ttpopcolor;
        }
      }

      // ========
      // PvP Mode
      // ========

      var markerpvp = JSON.stringify(markerTA);
      markerpvp = JSON.parse(markerpvp);
      var areaspvp = markerpvp["sets"]["townyPlugin.markerset"]["areas"];
      for (let i in areaspvp) {
        var pop = areaspvp[i]["desc"];

        var public = pop.toLowerCase().includes("pvp: false");

        var pvpe = "No";
        if (public) {
          pvpe = "No";
          markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            "#00EE00";
          markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            "#00EE00";
        } else {
          pvpe = "Yes";
          markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            "#EE0000";
          markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            "#EE0000";
        }

        let desc_title = pop.match(
          /<span style=\"font-size:120%\">(.+?)<\/span>/
        );

        var names = [];
        if (desc_title[1].includes("</a>") == true) {
          names = desc_title[1].match(
            /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
          );
          names = [names[0], names[1], names[3], names[2]];
        } else {
          names = desc_title[1].match(/(.+) \((.+|)\)/);
        }
        if (names[2] == "") {
          names[2] = "Nationless";
        }

        var infos = pop.match(
          /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
        );

        pop = `<span style="font-size:130%">${
          infos[3] == "true" ? "★ " + names[1] : names[1]
        }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
          names[3]
            ? "<a href='" +
              names[3] +
              "' target='_blank' title='Wiki link'>📖</a>"
            : ""
        }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
          infos[1]
        }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
          infos[2]
        }<br/><br/><span style="font-size:120%">P</span><span style="font-size:90%">VP</span> : <b><span style="font-size:120%; color:${
          pvpe === "Yes" ? "#EE0000" : "#00EE00"
        }">${pvpe}</span></b>`;

        markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] = pop;
      }

      // ============
      // Density Mode
      // ============
      var markerden = JSON.stringify(markerTA);
      markerden = JSON.parse(markerden);
      var areasden = markerden["sets"]["townyPlugin.markerset"]["areas"];
      for (let i in areasden) {
        var pop = areasden[i]["desc"];
        if (pop.includes("(Shop)") == true) {
          // Ignore all 'Shop' shapes
        } else {
          let desc_title = pop.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );

          let resList = pop.match(
            /Members <span style=\"font-weight:bold\">(.+?)<\/span>/
          );
          var mCount = (resList[1].match(/,/g) || []).length + 1;
          let area = arealist[desc_title];

          var nation = [];
          if (desc_title.includes("</a>") == true) {
            nation = desc_title[1].match(/.+? \(<.+?>(.+?)<\/a>\)$/);
          } else {
            nation = desc_title[1].match(/.+? \((.+?)\)$/);
          }

          var nbonus = 0;
          if (nation === null) {
            nbonus = 0;
          } else {
            let popul = nationpop[nation[1]];
            popul >= 120 ? (nbonus = 80) : "";
            popul <= 119 ? (nbonus = 60) : "";
            popul <= 89 ? (nbonus = 50) : "";
            popul <= 59 ? (nbonus = 30) : "";
            popul <= 39 ? (nbonus = 10) : "";
            popul <= 9 ? (nbonus = 0) : "";
          }

          // We define density as the difference between a town's claim limit and its claimed size.
          // A large town with few residents would be very low under claim limit and thus have low density, for example.
          var claimlimit = mCount * 8 + nbonus;
          let density = claimlimit - area;

          var dencolor = "#000000";
          density >= 512 ? (dencolor = "#007700") : "";
          density <= 511 ? (dencolor = "#008800") : "";
          density <= 384 ? (dencolor = "#00AA00") : "";
          density <= 256 ? (dencolor = "#00CC00") : "";
          density <= 128 ? (dencolor = "#00FF00") : "";
          density <= 64 ? (dencolor = "#66FF00") : "";
          density <= 32 ? (dencolor = "#99FF00") : "";
          density <= 16 ? (dencolor = "#CCFF00") : "";
          density <= 8 ? (dencolor = "#EEEE00") : "";
          density <= 0 ? (dencolor = "#FFCC00") : "";
          density <= -8 ? (dencolor = "#FF9900") : "";
          density <= -16 ? (dencolor = "#FF6600") : "";
          density <= -32 ? (dencolor = "#FF3300") : "";
          density <= -64 ? (dencolor = "#FF0000") : "";
          density <= -128 ? (dencolor = "#CC0000") : "";
          density <= -256 ? (dencolor = "#990000") : "";
          density <= -384 ? (dencolor = "#660000") : "";
          density <= -512 ? (dencolor = "#550000") : "";

          var names = [];
          if (desc_title[1].includes("</a>") == true) {
            names = desc_title[1].match(
              /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
            );
            names = [names[0], names[1], names[3], names[2]];
          } else {
            names = desc_title[1].match(/(.+) \((.+|)\)/);
          }
          if (names[2] == "") {
            names[2] = "Nationless";
          }

          var infos = pop.match(
            /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
          );

          pop = `<span style="font-size:130%">${
            infos[3] == "true" ? "★ " + names[1] : names[1]
          }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
            names[3]
              ? "<a href='" +
                names[3] +
                "' target='_blank' title='Wiki link'>📖</a>"
              : ""
          }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
            infos[1]
          }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
            infos[2]
          }<br/><br/><span style="font-size:120%">D</span><span style="font-size:90%">ENSITY</span> : <b><span style="font-size:120%; color:${dencolor}">${
            density < 0
              ? (density * -1).toString() + " ABOVE CLAIM LIMIT"
              : density.toString() + " BELOW CLAIM LIMIT"
          }</span></b>`;

          markerden["sets"]["townyPlugin.markerset"]["areas"][i]["desc"] = pop;

          markerden["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
            dencolor;
          markerden["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
            dencolor;
        }
      }

      // Convert the dynmap data to vanilla leaflet markers
      // Capital icons

      var capIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/32Vache/emc-mapmodes/main/assets/capital.png",

        iconSize: [15, 15],
        iconAnchor: [7, 7],
      });

      for (let i in markerTA["sets"]["townyPlugin.markerset"]["markers"]) {
        capitals.addLayer(
          L.marker(
            [
              -markerTA["sets"]["townyPlugin.markerset"]["markers"][i]["z"] -
                64,
              markerTA["sets"]["townyPlugin.markerset"]["markers"][i]["x"],
            ],
            { icon: capIcon, interactive: false }
          )
        );
      }

      // Capital names

      for (let i in markerTA["sets"]["townyPlugin.markerset"]["markers"]) {
        capitalNames.addLayer(
          L.marker(
            [
              -markerTA["sets"]["townyPlugin.markerset"]["markers"][i]["z"] -
                64,
              markerTA["sets"]["townyPlugin.markerset"]["markers"][i]["x"],
            ],
            { opacity: 0 }
          ).bindTooltip(
            markerTA["sets"]["townyPlugin.markerset"]["markers"][i]["label"],
            {
              permanent: true,
              className: "cptnames",
              offset: [-16, 29],
              fillOpacity: 0,
              fillColor: "black",
              fill: "false",
            }
          )
        );
      }

      $("#loadingText").html("Preparing map modes<br /><br />");
      $("#barContainer").html(
        '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 75%; height: 100%"></div>'
      );

      leafletConvert(markerpvp, "pvp");
      leafletConvert(markerclf, "clf");
      leafletConvert(markerpop, "popu");
      leafletConvert(markerclaim, "claim");
      leafletConvert(markernb, "nb");
      leafletConvert(markerden, "den");
      leafletConvert(markerttpop, "ttpop");

      // ============
      // Default Mode
      // ============

      var deftareas = markerTA["sets"]["townyPlugin.markerset"]["areas"];
      for (let i in deftareas) {
        var desc = deftareas[i]["desc"];
        let desc_title = desc.match(
          /<span style=\"font-size:120%\">(.+?)<\/span>/
        );
        var names = [];
        if (desc_title[1].includes("</a>") == true) {
          names = desc_title[1].match(
            /(.+?) \(<a href="(.+?)" .+?>(.+|)<\/a>\)/
          );
          names = [names[0], names[1], names[3], names[2]];
        } else {
          names = desc_title[1].match(/(.+) \((.+|)\)/);
        }
        if (names[2] == "") {
          names[2] = "Nationless";
        }

        var infos = desc.match(
          /Mayor <.+?>(.+?)?<\/span>.+Members <.+?>(.+?)?<\/span>.+capital: (.+?)<\/span>/
        );

        desc = `<span style="font-size:130%">${
          infos[3] == "true" ? "★ " + names[1] : names[1]
        }, ${names[2][0]}</span>${names[2].slice(1).toUpperCase()} ${
          names[3]
            ? "<a href='" +
              names[3] +
              "' target='_blank' title='Wiki link'>📖</a>"
            : ""
        }<br/><br/><span style="font-size:120%">M</span><span style="font-size:90%">AYOR</span> : <span style="font-size:120%">${
          infos[1]
        }</span><br/><span style="font-size:120%">R</span><span style="font-size:90%">ESIDENTS</span> : ${
          infos[2]
        }`;

        var coordArray = [];

        for (let j in markerTA["sets"]["townyPlugin.markerset"]["areas"][i][
          "x"
        ]) {
          coordArray.push([
            -markerTA["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
            markerTA["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
          ]);
        }

        if (desc.includes("(Shop)") == true) {
          // Keep shop shapes for default mode
          mapdata["deft"].addLayer(
            L.polygon(coordArray, {
              color:
                markerTA["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
              fillColor:
                markerTA["sets"]["townyPlugin.markerset"]["areas"][i][
                  "fillcolor"
                ],
              fillOpacity: 0.1,
              weight: 2,
              dashArray: "2 4",
            }).bindPopup(desc, {
              maxWidth: 350,
            })
          );
        } else {
          mapdata["deft"].addLayer(
            L.polygon(coordArray, {
              color:
                markerTA["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
              fillColor:
                markerTA["sets"]["townyPlugin.markerset"]["areas"][i][
                  "fillcolor"
                ],
              fillOpacity: 0.3,
              weight: 2,
            }).bindPopup(desc, {
              maxWidth: 350,
            })
          );
        }
      }

      $("#loadingText").html("Ready!<br /><br />");
      $("#barContainer").html(
        '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 100%; height: 100%"></div>'
      );
      // Cool animations when stuff is loaded
      emcmap.flyTo([0, 0], -4, {
        animate: true,
        duration: 2,
      });
      $(".progress").fadeOut(2000);
      $("#loading").fadeOut(2000);

      mapdata["deft"].addTo(emcmap);

      capitals.addTo(emcmap);
      var layerctrl = L.control.layers();
      layerctrl.addOverlay(capitals, "Capitals");
      layerctrl.addOverlay(capitalNames, "Capital names");
      layerctrl.setPosition("topleft");
      layerctrl.addTo(emcmap);
    }
  });

// Control functions
function showInfo() {
  $("#info").fadeIn(500);
  $("#loading").fadeIn(500);
}

function howdense() {
  $("#densityInfo").fadeIn(500);
}

function nodense() {
  $("#densityInfo").fadeOut(500);
}

function hideInfo() {
  $("#info").fadeOut(500);
  $("#loading").fadeOut(500);
  $("#densityInfo").fadeOut(500);
}

function showTownless() {
  $("#townless").fadeIn(500);
}

function hideTownless() {
  $("#townless").fadeOut(500);
}

function showTools() {
  $("#tools").fadeIn(500);
  $("#loading").fadeIn(500);
}

function hideTools() {
  $("#tools").fadeOut(500);
  $("#loading").fadeOut(500);
}

function loadmode(mode) {
  if (locked == false) {
    if (current === "blank") {
    } else {
      mapdata[current].removeFrom(emcmap);
    }

    switch (mode) {
      case "deft":
        mapdata["deft"].addTo(emcmap);
        $("#legend").fadeOut(300);
        break;
      case "clf":
        mapdata["clf"].addTo(emcmap);
        $("#legend").fadeOut(300);
        break;
      case "popu":
        mapdata["popu"].addTo(emcmap);
        $("#legend").html(
          '<span id="left">1</span><span id="left-middle">5</span><span id="middle">20</span><span id="middle-right">45</span><span id="right">100</span><div class="gradBox"><div class="popGrad"></div></div>'
        );
        $("#legend").fadeIn(300);
        break;
      case "claim":
        mapdata["claim"].addTo(emcmap);
        $("#legend").html(
          '<span id="left">1</span><span id="left-middle">64</span><span id="middle">256</span><span id="middle-right">640</span><span id="right">940</span><div class="gradBox"><div class="popGrad"></div></div>'
        );
        $("#legend").fadeIn(300);
        break;
      case "den":
        mapdata["den"].addTo(emcmap);
        $("#legend").html(
          '<span id="left">Low</span><span id="middle">Medium</span><span id="right">High</span><div class="gradBox"><div class="denGrad"></div></div>'
        );
        $("#legend").fadeIn(300);
        break;
      case "pvp":
        mapdata["pvp"].addTo(emcmap);
        $("#legend").html(
          '<span id="left-middle">Enabled</span><span id="middle-right">Disabled</span><div class="gradBox"><div class="grGrad"></div></div>'
        );
        $("#legend").fadeIn(300);
        break;
      case "nb":
        mapdata["nb"].addTo(emcmap);
        $("#legend").html(
          '<span style="left: 4%; position: absolute;">0</span><span style="left: 24%; position: absolute;">10</span><span style="left: 40%; position: absolute;">30</span><span style="left: 56%; position: absolute;">50</span><span style="left: 72%; position: absolute;">60</span><span style="right: 4%; position: absolute;">80</span><div class="gradBox"><div class="nbGrad"></div></div>'
        );
        $("#legend").fadeIn(300);
        break;
      case "ttpop":
        mapdata["ttpop"].addTo(emcmap);
        $("#legend").html(
          '<span id="left">10</span><span id="left-middle">50</span><span id="middle">120</span><span id="middle-right">250</span><span id="right">400</span><div class="gradBox"><div class="natpopGrad"></div></div>'
        );
        $("#legend").fadeIn(300);
        break;
    }

    current = mode;
  }
}

function loadTownless() {
  $(".townlessBtn").css("background-color", "#ff8811");
  fetch(
    "https://sus-9jn4.onrender.com/https://earthmc.net/map/aurora/standalone/MySQL_markers.php?marker=_markers_/marker_earth.json"
  )
    .then((response) => response.json())
    .then((marker) => {
      fetch(
        `https://sus-9jn4.onrender.com/https://earthmc.net/map/aurora/standalone/MySQL_update.php?world=earth&ts=${Date.now()}`
      )
        .then((res) => res.json())
        .then((update) => {
          var townlesses = [];
          for (i in update["players"]) {
            if (
              JSON.stringify(
                marker["sets"]["townyPlugin.markerset"]["areas"]
              ).includes(update["players"][i]["name"]) == false
            ) {
              townlesses.push(update["players"][i]["name"]);
            }
          }
          var tstr = townlesses.toString().replaceAll(",", " ");

          $("#townlessCtn").html(
            `Found ${townlesses.length} townless out of ${
              Object.keys(update["players"]).length
            } players.<br/><br/><div id="townlessList">${tstr}</div><br/><hr/>
            <div id="copyTownless">
              <span>Copy /t invite command:</span>
              <img
                src="https://raw.githubusercontent.com/32Vache/emc-mapmodes/main/assets/clipboard.png"
                height="16px"
                onclick="copyTownless('/t invite ${tstr}')"
              />
              <img
                src="https://raw.githubusercontent.com/32Vache/emc-mapmodes/main/assets/checkmark.png"
                height="16px"
                id="checkmark"
                style="display: none;"
              />
            </div>`
          );

          $("#townlessCtn").fadeIn(100);
          $(".townlessBtn").css("background-color", "#04aa6d");
        });
    });
}

function copyTownless(cmd) {
  navigator.clipboard.writeText(cmd);
  $("#checkmark").show();
  $("#checkmark").fadeOut(3000);
}

function enableDist() {
  hideTools();
  $("#hint").fadeIn(1000);
  $("#legend").fadeOut(1000);
  distEnabled = true;
  mapclicks = 0;
  $("#hint").html("Click on the first position.");
  // Makes towns clickable through
  locked = true;
  mapdata[current].setInteractive(false);
}

function disableDist() {
  $("#hint").fadeOut(500);
  distEnabled = false;
  mapclicks = 0;
  pt1.removeFrom(emcmap);
  pt2.removeFrom(emcmap);
  distLine.removeFrom(emcmap);
  // Restore towns
  locked = false;
  mapdata[current].setInteractive(true);
  $("#hint").html("GEKOLONISEERD");
}

function onMapClick(e) {
  if (distEnabled == true) {
    if (mapclicks == 0) {
      mapclicks += 1;
      pt1
        .setLatLng(e.latlng)
        .setIcon(distIcon)
        .bindTooltip(
          `Position 1: ${Math.round(e.latlng.lat).toString()}; ${Math.round(e.latlng.lng).toString()}`
        )
        .addTo(emcmap);
      $("#hint").html("Click on the second position.");
    } else if (mapclicks == 1) {
      mapclicks += 1;
      pt2
        .setLatLng(e.latlng)
        .setIcon(distIcon)
        .bindTooltip(
          `Position 2: ${Math.round(e.latlng.lat).toString()}; ${Math.round(e.latlng.lng).toString()}`
        )
        .addTo(emcmap);

      var loc1 = pt1.getLatLng();
      var loc2 = pt2.getLatLng();
      var distance = Math.sqrt(
        (loc1.lat - loc2.lat) ** 2 + (loc1.lng - loc2.lng) ** 2
      );
      $("#hint").html(`Distance: ${Math.round(distance)} blocks. <span onclick="disableDist()" style="color: #3344ee">Click here to quit.</span>`);
      distLine
        .setLatLngs([
          [loc1.lat, loc1.lng],
          [loc2.lat, loc2.lng],
        ])
        .bindTooltip(`Distance: ${Math.round(distance)} blocks`)
        .setStyle({ zIndex: 650, weight: 6, color: "#ff2200" })
        .addTo(emcmap);
    }
  }
}

emcmap.on("click", onMapClick);
