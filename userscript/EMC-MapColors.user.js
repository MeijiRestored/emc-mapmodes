// ==UserScript==
// @name         EMC Dynmap Colors
// @namespace    https://github.com/32Vache/emc-map-colors
// @version      0.2.1
// @description  Userscript for EarthMC's dynmap that colors meganations and enhances the town popups.
// @updateURL    https://raw.githubusercontent.com/32Vache/emc-map-colors/main/userscript/EMC-MapColors.user.js
// @downloadURL  https://raw.githubusercontent.com/32Vache/emc-map-colors/main/userscript/EMC-MapColors.user.js
// @author       32Vache
// @include      *://earthmc.net/map*
// @include      https://emc-color.herokuapp.com*
// @grant        GM_webRequest
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/tiles/_markers_/marker_earth.json"},"action":{"redirect":"https://emc-color.herokuapp.com/marker_earth.json"}}]
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}}]

// ==/UserScript==

var currently_active_webrequest_rule = JSON.stringify(GM_info.script.webRequest); // == @webRequst header from above

GM_webRequest([{selector:{include:"*://earthmc.net/map/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth.json"}}, {"selector":{"include":"*://earthmc.net/map/up/world/earth*"},"action":{"redirect":"https://emc-color.herokuapp.com/update.json"}}], function(info, message, details) {
    console.log(info, message, details);
});
