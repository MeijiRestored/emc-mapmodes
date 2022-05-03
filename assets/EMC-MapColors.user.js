// ==UserScript==
// @name         EMC Dynmap Colors
// @namespace    https://github.com/32Vache/emc-map-colors
// @version      0.4.0
// @description  Userscript for EarthMC's dynmap that colors meganations and enhances the town popups.
// @updateURL    https://raw.githubusercontent.com/32Vache/emc-map-colors/main/assets/EMC-MapColors.user.js
// @downloadURL  https://raw.githubusercontent.com/32Vache/emc-map-colors/main/assets/EMC-MapColors.user.js
// @author       32Vache
// @include      *://earthmc.net/map*
// @include      https://emc-color.herokuapp.com*
// @include      https://raw.githubusercontent.com/32Vache/emc-map-colors*
// @grant        GM_webRequest
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/nova/tiles/_markers_/marker_earth.json"},"action":{"redirect":"https://emc-color.herokuapp.com/marker_earth.json"}}]
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/nova/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}}]
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json"},"action":{"redirect":"https://emc-color.herokuapp.com/marker_earth_aurora.json"}}]
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/aurora/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update-aurora.json"}}]

// ==/UserScript==

// Recolors and popups
var currently_active_webrequest_rule = JSON.stringify(GM_info.script.webRequest);

GM_webRequest([{selector:{include:"*://earthmc.net/map/nova/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth.json"}}, {"selector":{"include":"*://earthmc.net/map/nova/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}},{selector:{include:"*://earthmc.net/map/aurora/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth_aurora.json"}}, {"selector":{"include":"*://earthmc.net/map/aurora/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update-aurora.json"}}], function(info, message, details) {
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
          <img src="https://raw.githubusercontent.com/32Vache/emc-map-colors/main/assets/ua.svg" alt="🇺🇦" draggable="false" style="margin-right: 4px;width: 14px;height: 14px" data-type="emoji" data-name="🇺🇦">
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
}, 6000);
