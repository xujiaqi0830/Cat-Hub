'use strict'
function json2url(json){
	json.t = Math.random().toFixed(3);
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return arr.join('&');
}
function ajax(json){
	json = json||{};
	if(!json.url)return;
	json.data = json.data || {};
	json.type = json.type || 'get';
	json.timeout = json.timeout || 5000;
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	var timer = setTimeout(function(){
		oAjax.onreadystatechange=null;
		json.error&&json.error('亲，网络不给力');
	},json.timeout);
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				clearTimeout(timer);
				json.success&&json.success(oAjax.responseText);
			}else{
				clearTimeout(timer);
				json.error&&json.error(oAjax.status);
			}
		}
	};
}
