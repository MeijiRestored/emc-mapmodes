// ==UserScript==
// @name         EMC Mapmodes
// @namespace    https://github.com/32Vache/emc-mapmodes
// @version      1.0.0
// @description  Userscript for EarthMC's dynmap that colors towns based on different statistics
// @updateURL    https://raw.githubusercontent.com/32Vache/emc-map-colors/main/assets/EMC-mapmodes.user.js
// @downloadURL  https://raw.githubusercontent.com/32Vache/emc-map-colors/main/assets/EMC-mapmodes.user.js
// @author       32Vache
// @include      *://earthmc.net/map*
// @include      https://emc-color.herokuapp.com*
// @include      https://raw.githubusercontent.com/32Vache/emc-mapmodes*
// @grant        GM_webRequest

// ==/UserScript==

let mapmode = localStorage.getItem("mapmode");

if (mapmode == null) {
  mapmode = "pop";
}

var world = ["", ""];
if (window.location.href.includes("aurora")) {
  world = ["ta", "aurora"];
} else {
  world = ["tn", "nova"];
}

var currently_active_webrequest_rule = JSON.stringify(
  GM_info.script.webRequest
);

if (mapmode === "pop") {
  GM_webRequest(
    [
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/tiles/_markers_/marker_earth.json`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/marker_earth_${world[0]}_pop.json`,
        },
      },
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/up/world/earth*`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/update_${world[0]}.json`,
        },
      },
    ],
    function (info, message, details) {
      console.log(info, message, details);
    }
  );
}

if (mapmode === "area") {
  GM_webRequest(
    [
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/tiles/_markers_/marker_earth.json`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/marker_earth_${world[0]}_area.json`,
        },
      },
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/up/world/earth*`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/update_${world[0]}.json`,
        },
      },
    ],
    function (info, message, details) {
      console.log(info, message, details);
    }
  );
}

if (mapmode === "open") {
  GM_webRequest(
    [
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/tiles/_markers_/marker_earth.json`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/marker_earth_${world[0]}_open.json`,
        },
      },
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/up/world/earth*`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/update_${world[0]}.json`,
        },
      },
    ],
    function (info, message, details) {
      console.log(info, message, details);
    }
  );
}

var time = 1;

var interval = setInterval(function () {
  if (time <= 1) {
    var naam = "";
    mapmode === "pop" ? (naam = "Population") : "";
    mapmode === "area" ? (naam = "Claim size") : "";
    mapmode === "open" ? (naam = "Open/Closed status") : "";
    mapmode === "default" ? (naam = "Default map") : "";
    var infodiv = `
        <div id="emcmapmodes-info" class="coord-control">
           <span class="coord-control-label">Current mapmode: ${naam}</span>
           <br>
           Change mode: <span class="coord-control-value" onclick="changeMode('pop')">Pop.</span> / <span class="coord-control-value" onclick="changeMode('area')">Claim.</span> / <span class="coord-control-value" onclick="changeMode('open')">Open.</span> / <span class="coord-control-value" onclick="changeMode('default')">Default</span>
        </div>
        `;
    const div = document.createElement("div");
    div.className = "coord-control leaflet-control";
    document
      .getElementsByClassName("leaflet-top leaflet-left")[0]
      .appendChild(div);
    div.innerHTML = infodiv;
    time++;
  } else {
    clearInterval(interval);
  }
}, 6000);

var scriptElem = document.createElement("script");
scriptElem.innerHTML =
  'function changeMode(mode) { localStorage.setItem("mapmode", mode); window.location.reload(); }';
document.body.appendChild(scriptElem);
