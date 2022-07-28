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
// @grant        GM_setValue
// @grant        GM_getValue

// ==/UserScript==

await GM.getValue("mapmode", "pop");

var world = ["", ""];
if (window.location.href.includes("aurora")) {
  world = ["ta", "aurora"];
} else {
  world = ["tn", "nova"];
}

var currently_active_webrequest_rule = JSON.stringify(
  GM_info.script.webRequest
);

if ((mapmode = "pop")) {
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
