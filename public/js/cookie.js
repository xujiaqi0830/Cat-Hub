function setCookie(name, value, iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		oDate.setHours(0, 0, 0, 0);
		document.cookie = name + '=' + value + '; PATH = /; EXPIRES = ' + oDate.toGMTString();
	}else{
		document.cookie = name + '=' + value + '; PATH = /';
	}
}
function getCookie(name){
	var arr = document.cookie.split('; ');
	for(var i = 0; i < arr.length; i += 1){
		var arr2 = arr[i].split('=');
		if(arr2[0] == name){
			return arr2[1];
		}
	}
}

function removeCookie(name){
	setCookie(name, 1 , -1);
}
