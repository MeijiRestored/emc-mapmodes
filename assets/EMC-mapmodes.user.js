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

// Recolors and popups
var currently_active_webrequest_rule = JSON.stringify(GM_info.script.webRequest);

GM_webRequest([{selector:{include:"*://earthmc.net/map/nova/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth.json"}}, {"selector":{"include":"*://earthmc.net/map/nova/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}},{selector:{include:"*://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth_aurora.json"}}, {"selector":{"include":"*://earthmc.net/map/aurora/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update-aurora.json"}}], function(info, message, details) {
    console.log(info, message, details);
});