// ==UserScript==
// @name         EMC Dynmap Colors
// @namespace    https://github.com/32Vache/emc-map-colors
// @version      0.3
// @description  Userscript for EarthMC's dynmap that colors meganations and enhances the town popups.
// @updateURL    https://raw.githubusercontent.com/32Vache/emc-map-colors/main/userscript/EMC-MapColors.user.js
// @downloadURL  https://raw.githubusercontent.com/32Vache/emc-map-colors/main/userscript/EMC-MapColors.user.js
// @author       32Vache
// @include      *://earthmc.net/map*
// @include      https://emc-color.herokuapp.com*
// @include      https://raw.githubusercontent.com/32Vache/emc-map-colors*
// @grant        GM_webRequest
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/tiles/_markers_/marker_earth.json"},"action":{"redirect":"https://emc-color.herokuapp.com/marker_earth.json"}}]
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}}]

// ==/UserScript==

// Recolors and popups
var currently_active_webrequest_rule = JSON.stringify(GM_info.script.webRequest); // == @webRequst header from above

GM_webRequest([{selector:{include:"*://earthmc.net/map/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth.json"}}, {"selector":{"include":"*://earthmc.net/map/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}}], function(info, message, details) {
    console.log(info, message, details);
});

// Info
var time = 1;
var lastupdate = ""
fetch('https://raw.githubusercontent.com/32Vache/emc-map-colors/main/data.json').then(response => response.json()).then(data => lastupdate = data).catch(() => lastupdate = [])
var interval = setInterval(function() {
   if (time <= 1) {
      var infodiv = `
        <div id="emcmapcolors-info" class="coord-control">
           <span class="coord-control-label">Meganations updated</span>
           <br>
           <span class="coord-control-value">${lastupdate["last-update"]}</span>
        </div>
        `
      document.getElementsByClassName("leaflet-bottom leaflet-left")[0].innerHTML = infodiv;
      time++;
   }
   else {
      clearInterval(interval);
   }
}, 5000);