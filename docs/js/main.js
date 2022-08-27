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

// Pre-load data
var eu4colors = [
  {
    name: "france",
    color: "#1432D2",
  },
  {
    name: "spain",
    color: "#E7B50C",
  },
  {
    name: "portugal",
    color: "#39A065",
  },
  {
    name: "england",
    color: "#C11A0E",
  },
  {
    name: "britain",
    color: "#A10A0E",
  },
  {
    name: "aquitaine",
    color: "#BBCEF7",
  },
  {
    name: "netherlands",
    color: "#FF850F",
  },
  {
    name: "scotland",
    color: "#C7AF0C",
  },
  {
    name: "ireland",
    color: "#709669",
  },
  {
    name: "papal_states",
    color: "#D3DCB2",
  },
  {
    name: "venice",
    color: "#36A79C",
  },
  {
    name: "byzantium",
    color: "#952D66",
  },
  {
    name: "turkey",
    color: "#7ECB78",
  },
  {
    name: "poland",
    color: "#C55C6A",
  },
  {
    name: "lubusz",
    color: "#C3959B",
  },
  {
    name: "livonia",
    color: "#7D1E64",
  },
  {
    name: "switzerland",
    color: "#997A6C",
  },
  {
    name: "denmark",
    color: "#BE4646",
  },
  {
    name: "norway",
    color: "#75A5BC",
  },
  {
    name: "sweden",
    color: "#0852A5",
  },
  {
    name: "germany",
    color: "#4B8287",
  },
  {
    name: "prussia",
    color: "#8F8D80",
  },
  {
    name: "hungary",
    color: "#98555C",
  },
  {
    name: "austria",
    color: "#DCDCDC",
  },
  {
    name: "austria-hungary",
    color: "#DCDCDC",
  },
  {
    name: "epirus",
    color: "#E6E4D6",
  },
  {
    name: "greece",
    color: "#090967",
  },
  {
    name: "romania",
    color: "#889D17",
  },
  {
    name: "ukraine",
    color: "#7CB797",
  },
  {
    name: "georgia",
    color: "#BE2325",
  },
  {
    name: "khazar",
    color: "#616687",
  },
  {
    name: "kazakhkhanate",
    color: "#5986A6",
  },
  {
    name: "russian_empire",
    color: "#5D7E4D",
  },
  {
    name: "morocco",
    color: "#BF6E3E",
  },
  {
    name: "mali",
    color: "#FFFFB9",
  },
  {
    name: "newfoundland",
    color: "#AC3030",
  },
  {
    name: "brazil",
    color: "#82B17D",
  },
  {
    name: "gran_colombia",
    color: "#E9BC26",
  },
  {
    name: "tierra_del_fuego",
    color: "#E09850",
  },
  {
    name: "india",
    color: "#5880C5",
  },
  {
    name: "h.r.e",
    color: "#96B1A1",
  },
  {
    name: "israel",
    color: "#1489FD",
  },
  {
    name: "italy",
    color: "#7DAB54",
  },
  {
    name: "spqr",
    color: "#A70A64",
  },
  {
    name: "finland",
    color: "#B68664",
  },
  {
    name: "alba",
    color: "#006968",
  },
  {
    name: "genoa",
    color: "#DAD738",
  },
  {
    name: "al_andalus",
    color: "#D2DCAF",
  },
  {
    name: "mesopotamia",
    color: "#D40027",
  },
  {
    name: "emirates",
    color: "#EAE97C",
  },
  {
    name: "ethiopia",
    color: "#3878BF",
  },
  {
    name: "orange",
    color: "#DC8A39",
  },
  {
    name: "obeyrule4.1",
    color: "#DC8A39",
  },
  {
    name: "mongolia",
    color: "#CCB8B1",
  },
  {
    name: "mexico",
    color: "#EBC237",
  },
  {
    name: "california",
    color: "#E9BD28",
  },
  {
    name: "united_states",
    color: "#128BE4",
  },
  {
    name: "quebec",
    color: "#4960DC",
  },
  {
    name: "iceland",
    color: "#2B3C75",
  },
  {
    name: "arctic",
    color: "#1D1E9E",
  },
  {
    name: "yugoslavia",
    color: "#A64839",
  },
  {
    name: "bulgaria",
    color: "#64616F",
  },
  {
    name: "iberia",
    color: "#A64448",
  },
  {
    name: "deutsches_reich",
    color: "#745C27",
  },
  {
    name: "belgium",
    color: "#2B8DAC",
  },
  {
    name: "aland",
    color: "#084285",
  },
  {
    name: "babylon",
    color: "#367588",
  },
  {
    name: "egypt",
    color: "#BCA65D",
  },
  {
    name: "sassanid_dynasty",
    color: "#82A8E0",
  },
  {
    name: "kushan",
    color: "#007891",
  },
  {
    name: "lithuania",
    color: "#9A4574",
  },
  {
    name: "wales",
    color: "#757179",
  },
  {
    name: "normandie",
    color: "#615D66",
  },
  {
    name: "italia",
    color: "#7DAB54",
  },
  {
    name: "croatia",
    color: "#685EF7",
  },
  {
    name: "crimea",
    color: "#3B9E7D",
  },
  {
    name: "latvia",
    color: "#6D0E54",
  },
  {
    name: "russia",
    color: "#5D7E4D",
  },
  {
    name: "estonia",
    color: "#CA7467",
  },
  {
    name: "pomerania",
    color: "#547349",
  },
  {
    name: "duchy_of_finland",
    color: "#B68664",
  },
  {
    name: "preußen",
    color: "#8F8D80",
  },
  {
    name: "crusader_states",
    color: "#6A7FB7",
  },
  {
    name: "silesia",
    color: "#758C24",
  },
  {
    name: "francia",
    color: "#008CA5",
  },
  {
    name: "poitou-charentes",
    color: "#D8798B",
  },
];

var pvp = L.layerGroup();
var EU4 = L.layerGroup();
var claim = L.layerGroup();
var popu = L.layerGroup();
var deft = L.layerGroup();
var den = L.layerGroup();
var nb = L.layerGroup();

var current = "blank";
// Async loading and processing of data

$("#loadingText").html("Fetching map data<br /><br />");
$("#barContainer").html(
  '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 25%; height: 100%"></div>'
);

fetch(
  "https://sus-9jn4.onrender.com/https://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json"
)
  .then((response) => response.json())
  .then((markerTA) => {
    // Build recolors
    // ========
    // EU4 Mode
    // ========

    $("#loadingText").html("Processing data<br /><br />");
    $("#barContainer").html(
      '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 50%; height: 100%"></div>'
    );

    var markerEU4 = JSON.stringify(markerTA);
    markerEU4 = JSON.parse(markerEU4);
    var areasEU4 = markerEU4["sets"]["townyPlugin.markerset"]["areas"];

    for (let i in areasEU4) {
      markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
        "#4AA9E1";
      markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
        "#4AA9E1";
    }

    for (let i in areasEU4) {
      var desc = areasEU4[i]["desc"];
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
              for (let e of eu4colors) {
                if (e["name"].toLowerCase() === nation.toLowerCase()) {
                  markerEU4["sets"]["townyPlugin.markerset"]["areas"][i][
                    "fillcolor"
                  ] = e["color"];
                  markerEU4["sets"]["townyPlugin.markerset"]["areas"][i][
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
    for (let i in areaspop) {
      var pop = areaspop[i]["desc"];
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
      mCount == 2 ? (popcolor = "#EE0000") : "";
      mCount == 1 ? (popcolor = "#CC0000") : "";

      markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
        popcolor;
      markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
        popcolor;
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
            markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["x"].length
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

        markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
          areacolor;
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
        let resList = pop.match(
          /Members <span style=\"font-weight:bold\">(.+?)<\/span>/
        );
        var mCount = (resList[1].match(/,/g) || []).length + 1;
        let nation = desc_title[1].match(/.+? \((.+?)\)$/);

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
        let nation = desc_title[1].match(/.+? \((.+?)\)$/);

        var nbcolor = "#000000";
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
        }

        markernb["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
          nbcolor;
        markernb["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
          nbcolor;
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

      if (public) {
        markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
          "#00EE00";
        markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
          "#00EE00";
      } else {
        markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
          "#EE0000";
        markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
          "#EE0000";
      }
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

        let nation = desc_title[1].match(/.+? \((.+?)\)$/);

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

        markerden["sets"]["townyPlugin.markerset"]["areas"][i]["fillcolor"] =
          dencolor;
        markerden["sets"]["townyPlugin.markerset"]["areas"][i]["color"] =
          dencolor;
      }
    }

    // Convert the dynmap data to vanilla leaflet markers
    // ========
    // EU4 Mode
    // ========

    $("#loadingText").html("Preparing map modes<br /><br />");
    $("#barContainer").html(
      '<div class="w3-light-grey" style="width: 200px; height: 18px"><div class="w3-container w3-indigo"style="width: 75%; height: 100%"></div>'
    );

    var EU4areas = markerEU4["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in EU4areas) {
      var desc = EU4areas[i]["desc"];
      var coordArray = [];

      for (let j in markerEU4["sets"]["townyPlugin.markerset"]["areas"][i][
        "x"
      ]) {
        coordArray.push([
          -markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
          markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
        ]);
      }

      if (desc.includes("(Shop)") == true) {
        // Style shop shapes in a clean way instead of obliterating them
        EU4.addLayer(
          L.polygon(coordArray, {
            color:
              markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "2 4",
          }).bindPopup(desc)
        );
      } else {
        EU4.addLayer(
          L.polygon(coordArray, {
            color:
              markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerEU4["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
        );
      }
    }
    // ===============
    // Population Mode
    // ===============

    var popareas = markerpop["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in popareas) {
      var desc = popareas[i]["desc"];
      var coordArray = [];

      for (let j in markerpop["sets"]["townyPlugin.markerset"]["areas"][i][
        "x"
      ]) {
        coordArray.push([
          -markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
          markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
        ]);
      }

      if (desc.includes("(Shop)") == true) {
        // Style shop shapes in a clean way instead of obliterating them
        popu.addLayer(
          L.polygon(coordArray, {
            color:
              markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "2 4",
          }).bindPopup(desc)
        );
      } else {
        popu.addLayer(
          L.polygon(coordArray, {
            color:
              markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerpop["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
        );
      }
    }

    // ===========
    // Claims Mode
    // ===========

    var claimareas = markerclaim["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in claimareas) {
      var desc = claimareas[i]["desc"];
      var coordArray = [];

      for (let j in markerclaim["sets"]["townyPlugin.markerset"]["areas"][i][
        "x"
      ]) {
        coordArray.push([
          -markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] -
            64,
          markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
        ]);
      }

      if (desc.includes("(Shop)") == true) {
        // Destroy shops because we ignored finding their size
      } else {
        claim.addLayer(
          L.polygon(coordArray, {
            color:
              markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerclaim["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
        );
      }
    }

    // =================
    // Nation Bonus Mode
    // =================

    var nbareas = markernb["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in nbareas) {
      var desc = nbareas[i]["desc"];
      var coordArray = [];

      for (let j in markernb["sets"]["townyPlugin.markerset"]["areas"][i][
        "x"
      ]) {
        coordArray.push([
          -markernb["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
          markernb["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
        ]);
      }

      if (desc.includes("(Shop)") == true) {
        // Destroy shops because we ignored finding their size
      } else {
        nb.addLayer(
          L.polygon(coordArray, {
            color:
              markernb["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markernb["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
        );
      }
    }

    // ========
    // PvP Mode
    // ========

    var pvpareas = markerpvp["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in pvpareas) {
      var desc = pvpareas[i]["desc"];
      var coordArray = [];

      for (let j in markerpvp["sets"]["townyPlugin.markerset"]["areas"][i][
        "x"
      ]) {
        coordArray.push([
          -markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
          markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
        ]);
      }

      if (desc.includes("(Shop)") == true) {
        // Style shop shapes in a clean way instead of obliterating them
        pvp.addLayer(
          L.polygon(coordArray, {
            color:
              markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "2 4",
          }).bindPopup(desc)
        );
      } else {
        pvp.addLayer(
          L.polygon(coordArray, {
            color:
              markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerpvp["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
        );
      }
    }

    // ============
    // Default Mode
    // ============

    var deftareas = markerTA["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in deftareas) {
      var desc = deftareas[i]["desc"];
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
        // Style shop shapes in a clean way instead of obliterating them
        deft.addLayer(
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
          }).bindPopup(desc)
        );
      } else {
        deft.addLayer(
          L.polygon(coordArray, {
            color:
              markerTA["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerTA["sets"]["townyPlugin.markerset"]["areas"][i][
                "fillcolor"
              ],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
        );
      }
    }

    // ============
    // Density Mode
    // ============

    var denareas = markerden["sets"]["townyPlugin.markerset"]["areas"];
    for (let i in denareas) {
      var desc = denareas[i]["desc"];
      var coordArray = [];

      for (let j in markerden["sets"]["townyPlugin.markerset"]["areas"][i][
        "x"
      ]) {
        coordArray.push([
          -markerden["sets"]["townyPlugin.markerset"]["areas"][i]["z"][j] - 64,
          markerden["sets"]["townyPlugin.markerset"]["areas"][i]["x"][j],
        ]);
      }

      if (desc.includes("(Shop)") == true) {
        // Destroy shops because we ignored finding their density
      } else {
        den.addLayer(
          L.polygon(coordArray, {
            color:
              markerden["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillColor:
              markerden["sets"]["townyPlugin.markerset"]["areas"][i]["color"],
            fillOpacity: 0.3,
            weight: 2,
          }).bindPopup(desc)
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
  });

// Control functions
function showInfo() {
  $("#info").fadeIn(500);
  $("#loading").fadeIn(500);
}

function hideInfo() {
  $("#info").fadeOut(500);
  $("#loading").fadeOut(500);
}

function loadmode(mode) {
  if (current === "blank") {
  } else {
    current === "deft" ? deft.removeFrom(emcmap) : "";
    current === "EU4" ? EU4.removeFrom(emcmap) : "";
    current === "popu" ? popu.removeFrom(emcmap) : "";
    current === "claim" ? claim.removeFrom(emcmap) : "";
    current === "den" ? den.removeFrom(emcmap) : "";
    current === "pvp" ? pvp.removeFrom(emcmap) : "";
    current === "nb" ? nb.removeFrom(emcmap) : "";
  }
  if (mode === "deft") {
    deft.addTo(emcmap);
    $("#legend").fadeOut(300);
  }
  if (mode === "EU4") {
    EU4.addTo(emcmap);
    $("#legend").fadeOut(300);
  }
  if (mode === "popu") {
    popu.addTo(emcmap);
    $("#legend").html(
      '<span id="left">1</span><span id="left-middle">5</span><span id="middle">20</span><span id="middle-right">45</span><span id="right">100</span><div class="gradBox"><div class="popGrad"></div></div>'
    );
    $("#legend").fadeIn(300);
  }
  if (mode === "claim") {
    claim.addTo(emcmap);
    $("#legend").html(
      '<span id="left">1</span><span id="left-middle">64</span><span id="middle">256</span><span id="middle-right">640</span><span id="right">940</span><div class="gradBox"><div class="popGrad"></div></div>'
    );
    $("#legend").fadeIn(300);
  }
  if (mode === "den") {
    den.addTo(emcmap);
    $("#legend").html(
      '<span id="left">Low</span><span id="middle">Medium</span><span id="right">High</span><div class="gradBox"><div class="denGrad"></div></div>'
    );
    $("#legend").fadeIn(300);
  }
  if (mode === "pvp") {
    pvp.addTo(emcmap);
    $("#legend").html(
      '<span id="left-middle">Enabled</span><span id="middle-right">Disabled</span><div class="gradBox"><div class="grGrad"></div></div>'
    );
    $("#legend").fadeIn(300);
  }
  if (mode === "nb") {
    nb.addTo(emcmap);
    $("#legend").html(
      '<span style="left: 4%; position: absolute;">0</span><span style="left: 24%; position: absolute;">10</span><span style="left: 40%; position: absolute;">30</span><span style="left: 56%; position: absolute;">50</span><span style="left: 72%; position: absolute;">60</span><span style="right: 4%; position: absolute;">80</span><div class="gradBox"><div class="nbGrad"></div></div>'
    );
    $("#legend").fadeIn(300);
  }

  current = mode;
}
