parseMetas();

function parseMetas() {
	var metas = document.getElementsByTagName('meta');
	var mLen=metas.length;

	for(var i=0;i<mLen;i++){
		meta = metas[i];
		if(meta.getAttribute('http-equiv') != null
		&&  meta.getAttribute('http-equiv').toLowerCase() == 'refresh') {
			if (parseInt(meta.getAttribute('content')) > 15) {
				var object = new Object();
				// metas[i].parentNode.removeChild(metas[i]);
				object.url = document.URL;
				object.host = document.location.hostname;
				object.timeout = (new Date().getTime() / 1000) + parseInt(meta.getAttribute('content'));
				chrome.extension.sendMessage(null, object);
			}
		}
	}
}
