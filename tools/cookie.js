var setCookie = function(name, value, expiresDay){
    if(expireDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + expiresDay);
        oDate.setHours(0, 0, 0, 0);
        documen.cookie = name + '=' + value + '; PATH = /; EXPIRES = ' + oDate.toGMTString();
    }else{
        document.cookie = name + '=' + value + '; PATH = /';
    }
};

var getCookie = function(name){
    var arr1 = document.cookie.split('; ');
    for(var i = 0; i < arr1.length; i += 1){
        var arr2 = arr1[i].split('=');
        if(arr2[0] === name){
            return arr2[1];
        }
    }
}

module.exports = {
    setCookie: setCookie,
    getCookie: getCookie
};
