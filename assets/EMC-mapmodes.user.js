// ==UserScript==
// @name         EMC Mapmodes
// @namespace    https://github.com/32Vache/emc-mapmodes
// @version      1.1.0
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

if (mapmode === "pvp") {
  GM_webRequest(
    [
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/tiles/_markers_/marker_earth.json`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/marker_earth_${world[0]}_pvp.json`,
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

if (mapmode === "eu4") {
  GM_webRequest(
    [
      {
        selector: {
          include: `*://earthmc.net/map/${world[1]}/tiles/_markers_/marker_earth.json`,
        },
        action: {
          redirect: `https://emc-color.herokuapp.com/marker_earth_${world[0]}_eu4.json`,
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

// define icons
var popIcon =
  "data:image/png;base64,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";
var claimIcon =
  "data:image/png;base64,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";
var openIcon =
  "data:image/png;base64,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";
var pvpIcon =
  "data:image/png;base64,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";
var eu4Icon =
  "data:image/png;base64,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";
var defaultIcon =
  "data:image/png;base64,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";

var time = 1;

var interval = setInterval(function () {
  if (time <= 1) {
    var naam = "";
    mapmode === "pop" ? (naam = "Population") : "";
    mapmode === "area" ? (naam = "Claim size") : "";
    mapmode === "open" ? (naam = "Open/Closed status") : "";
    mapmode === "pvp" ? (naam = "PvP Enabled/Disabled") : "";
    mapmode === "eu4" ? (naam = "EU4 Colors") : "";
    mapmode === "default" ? (naam = "Default map") : "";
    var infodiv = `
        <div id="emcmapmodes-info" class="coord-control">
           <span class="coord-control-label">Current mapmode: ${naam}</span>
           <br/>
           Change mode:
           <br/>
           <span class="coord-control-value" onclick="changeMode('pop')"><img src="${popIcon}" width="32px" title="Population" alt="Population"></img></span><span class="coord-control-value" onclick="changeMode('area')"><img src="${claimIcon}" width="32px" title="Claim size" alt="Claim size"></img/></span><span class="coord-control-value" onclick="changeMode('open')"><img src="${openIcon}" width="32px" title="Open status" alt="Open status"></img/></span><span class="coord-control-value" onclick="changeMode('pvp')"><img src="${pvpIcon}" width="33px" title="PvP Status" alt="PvP status"></img/></span><span class="coord-control-value" onclick="changeMode('eu4')"><img src="${eu4Icon}" width="32px" title="EU4" alt="EU4"></img/></span><span class="coord-control-value" onclick="changeMode('default')"><img src="${defaultIcon}" width="31px" title="Default" alt="Default"></img/></span>
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
