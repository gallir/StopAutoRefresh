var blockers = new Object();
// var stop_url_helper = "http://stopautorefresh.appspot.com/stop";
var stop_url_helper = "http://www.meneame.net/stoprefresh.php";

var callback = function(details) {
	var now;
	var object;

	if (blockers[details.tabId] != undefined && blockers[details.tabId].length > 0) {
		now = new Date().getTime() / 1000;
		for (var i = 0; i < blockers[details.tabId].length; i++) {
			object = blockers[details.tabId][i];
			if (object.url == details.url
					&& Math.abs(now - object.timeout) < 5 ) {
				console.log("Reload cancelled: " + details.tabId +  " " + object.host + " " + object.url);

				/* Show the icon only for main frame */
				if (details.frameId == 0) {
					chrome.pageAction.show(details.tabId);
				}

				url = stop_url_helper;
				if (object.host != undefined && object.host.length > 0) {
					url += "?h=" + encodeURIComponent(object.host);
				}

				return {redirectUrl: url};
			}
		}
	}

	/* New document, delete old blockers */
	if (details.type == "main_frame" && details.frameId == 0 && details.url != stop_url_helper) {
		delete blockers[details.tabId];
	}

	return {cancel: false};
};

chrome.extension.onMessage.addListener(
	function(request, sender) {
		if (blockers[sender.tab.id] == undefined) {
			blockers[sender.tab.id] = new Array();
		}
		blockers[sender.tab.id].push(request);
		// console.log(request.host + " - " + request.url);
		return false;
	});

chrome.webRequest.onBeforeRequest.addListener(callback, {urls: ["<all_urls>"], types: ["main_frame", "sub_frame"]}, ["blocking"]);

chrome.tabs.onRemoved.addListener(
	function(tabId, removeInfo) {
		delete blockers[tabId];
	});
