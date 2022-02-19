const https = require("https");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

var app = (module.exports = express());
app.use(cors());

// Recolors for the script
let colors = [
	{"name": "Lechian Empire", "nations": ["poland", "galicia", "tasmania", "croatia", "bulgaria", "lithuania", "kalmar_union", "prussia"], "color": "#9F0807"},
	{"name": "Angevin Empire", "nations": ["britain", "scotland", "norway", "sweden"], "color": "#DC281E"},
	{"name": "Greater Roman Empire", "nations": ["spqr", "italia", "romania", "greater_romania"], "color": "#B200FF"},
	{"name": "Spanish Empire", "nations": ["iberian_angola", "spain", "spanish_antilles", "guinea", "canarias", "uruguay", "argentina", "peru", "chile", "paraguay", "portugal", "bolivia", "colombia", "patagonia", "acre"], "color": "#FFD800"},
	{"name": "Kingdom of France", "nations": ["francia", "yavanarajya", "center_africa", "nepal", "india", "liverpool", "swedish_empire", "maurya_dynasty", "france", "monaco"], "color": "#0F1D6E"},
	{"name": "German Confederation", "nations": ["mexican-empire", "san_luis_potosi", "chihuahua", "austria", "belgium", "saxony", "barinas", "germany", "h.r.e.", "olmec", "south-pole", "eum", "preußen"], "color": "#E7FF47"},
	{"name": "Caucasus Empire", "nations": ["greater-armenia", "sakartvelo"], "color": "#A5FF7F"},
	{"name": "Second Finnish Empire", "nations": ["lapland", "suomi", "tavastia"], "color": "#FFFFFF"},
	{"name": "Estonian Empire", "nations": ["estonia", "finnmark"], "color": "#00FFFF"},
	
	{"name": "True Russia", "nations": ["cccp", "yakutia", "sovietunion", "far_east", "ussr", "republic_of_komi", "russian_dominion", "sibirya", "yamalia", "contact_a_staff", "tomsk", "karelia", "verkhoyansk", "siberian_empire", "asia"], "color": "#D18915"},
	{"name": "Russia", "nations": ["east_russia", "tzarist_ukraine", "russia", "russian_empire", "south_russia", "taymyria", "northern_russia", "republic_of_rus", "wrangel", "sibir", "far", "hungary", "yuzhny", "west_russia", "greater_russia", "rule4.1", "khabarovsk", "pakistan", "kievan_rus", "perm_krai", "nenets"], "color": "#FFD894"},
	{"name": "Israel", "nations": ["israel", "himyar", "qatar", "europe", "egypt"], "color": "#0038B8"},
	{"name": "Japanese Empire", "nations": ["japan", "japan_north", "korea", "shimazu", "toban", "prince_george", "yamato", "ooka", "koyuk", "xiongnu", "tugur", "yokuso", "chumikan", "ayano_mainsky", "bokkai", "dai", "xixia", "yan"], "color": "#BC002D"},
	{"name": "Joseon", "nations": ["joseon", "manchukuo"], "color": "#FFCB0A"},
	{"name": "People's Republic of China", "nations": ["prc", "northeast_china", "prc_xinjiang", "prc_fujian", "prc_jilin", "northprc", "west_prc", "shu"], "color": "#FF4C00"},
	{"name": "Han Dynasty", "nations": ["han", "hong_kong", "chu", "south_sea", "iceland", "bei_qi", "cape_dorset"], "color": "#282828"},
	{"name": "Liao", "nations": ["liao", "great_liao"], "color": "#01315A"},
	{"name": "Federation of the East", "nations": ["philippines", "mcmurdo", "mindanao", "mozambique"], "color": "#0038A8"},
	{"name": "Indochina", "nations": ["indochina", "sumatra", "vietnam"], "color": "#FFFFFF"},
	{"name": "Majapahit Empire", "nations": ["majapahit", "dutch_indies", "sulawesi", "sarawak", "maluku"], "color": "#FFDF3F"},
	{"name": "Taiwan", "nations": ["taiwan", "takasago"], "color": "#7FFFFF"},
	
	{"name": "Oniyama Shogunate", "nations": ["grasberg", "pulau_japen", "lützow-holm_bay", "amazonas", "kepulauan_aru"], "color": "#41F226"},
	{"name": "Third Victorian Empire", "nations": ["long_bay", "ulimaroa", "oceania", "huron", "northaustralia", "cape_york", "southaustralia", "nicaragua"], "color": "#003FA3"},
	{"name": "Fourth Australian Empire", "nations": ["australia", "southtasmania", "terraaustralis", "straya", "kimberley", "westernaustralia", "neale", "papua", "west_papua"], "color": "#FF8800"},
	
	{"name": "Second Nubian Empire", "nations": ["nubia", "kasai", "nejd", "namibia", "molodezhnaya", "bura", "songhai", "cote_divoire", "algeria", "cameroon", "south_sudan", "fezzan", "tripolitania", "ghana", "comoros", "libya", "senegal", "ifriqiya", "dzata", "mauritania", "rhodesia", "sadr", "gabon", "cape", "zanzibar", "katanga", "cape_verde", "zimbabwe", "riodeoro", "angola", "numidia"], "color": "#7F3300"},
	{"name": "Federation of the Indian Ocean", "nations": ["ancient_egypt", "somalia", "congo_freestate", "egypte_federe", "north_sudan", "oman", "kemet", "cyrene"], "color": "#45818E"},
	{"name": "Tanzanian Empire", "nations": ["tanzania", "azande", "lake_nyasa", "uae", "uganda", "sudan", "syria", "new_angola", "djibouti", "ethiopia", "madeira", "agadez", "new_caledonia", "south_tanzania", "drc"], "color": "#1EB53A"},
	
	{"name": "Republic of Brazil", "nations": ["brazil", "peru-bolivia", "manabi"], "color": "#FFC0CB"},
	
	{"name": "Theocratic Confederacy of Antarctica", "nations": ["ssrbv", "amery", "antarctic_empire", "antarctic", "seljuk_empire", "victoria_land"], "color": "#7FFFFF"},
	{"name": "Egalitarist People's Republic of Antarctica", "nations": ["casey", "sandwich_islands", "marie_byrd_land", "antarctica"], "color": "#FED700"},
	
	{"name": "Cuban Empire", "nations": ["cuba", "haiti", "new_granada", "cordoba", "yucatan", "dominican", "miami", "costa_rica", "panama", "nicaragua"], "color": "#CC0001"},
	{"name": "Republic of Rio Grande", "nations": ["rio_grande", "lone_star", "new_mexico"], "color": "#FFFFFF"},
	{"name": "Texico Empire", "nations": ["texas_republic", "pueblo", "zapotec", "vanuatu", "south_island"], "color": "#002868"},
	{"name": "State of Jefferson", "nations": ["jefferson", "roughandready", "utah", "oregon", "deseret", "california", "baja", "nevada", "navajo"], "color": "#009900"},
	{"name": "Illinois Empire", "nations": ["illinois", "indiana", "united_states", "missouri", "west_jersey", "south_carolina", "west_virginia", "kingsport", "iowa"], "color": "#00F6FF"},
	{"name": "United States of America", "nations": ["new_jersey", "new_york", "ohio", "america", "pennsylvania", "hawaii", "empire_state", "tibet", "yemen", "csa", "alabama", "georgia", "usa", "guam", "minnesota", "wisconsin"], "color": "#0052FF"},
	{"name": "Third Canadian Empire", "nations": ["quebec", "baffin", "hall", "canada", "ellesmere", "avannaa", "saskatchewan", "hbc", "hollis", "contactstaff4.1", "disko_bay", "arctic_islands", "cumberland", "klondike", "iroquois", "nouvelle-france", "maine"], "color": "#CC3F4F"},
	{"name": "The Federal Republic of Evergreen", "nations": ["british_columbia", "bhutan", "canadian_rockies", "cascadia", "colorado", "columbia", "columbia_river", "greenland", "keewatin", "maldives", "october_island", "queen_charlotte", "slave_lake", "sahtu", "tlingit", "victoria_island", "wyoming"], "color": "#002200"}, 
	{"name": "Alaskan Tsardom", "nations": ["kodiak", "anchorage", "bering_strait", "yukon"], "color": "#011DC1"},
	{"name": "Grand Maritime Federation", "nations": ["woodland_cree", "bermuda", "north_america", "labrador", "acadia", "avalon", "western_sahara", "keewatin", "north_ontario", "cumania", "arctic_alaska", "buckland", "manitoba"], "color": "#D46D00"}
]


// Area calculator
/**
 * Calculate area of polygon.
 * @function calcArea
 * @param {Array} x Array of X coordinates
 * @param {Array} y Array of Y coordinates
 * @param {number} ptsNum Number of coordinate points
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

                        // Show chunk amount. Filter Shop polygons to avoid incorretc chunk amount calculation
                        if (town[1].endsWith("(Shop)")) {
                          let popup = `${start[1]}<br /><span style="font-size:80%">Part of </span><span style="font-size:90%">${e["name"]}</span>${end[1]}`;
                          Response["sets"]["townyPlugin.markerset"]["areas"][i][
                            "desc"
                          ] = popup;
                        } else {
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
                        }

                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "fillcolor"
                        ] = e["color"];
                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "color"
                        ] = e["color"];
                      } else {
                        // No recolor, but add town chunk amount anyways
                      }
                    }
                  }
                }
              }
            }
          }
        }

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

// ...and every ten minutes.
setInterval(function () {
  builder();
}, 600000);
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
