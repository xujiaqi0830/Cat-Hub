// 格式化时间
var toFormattedTime = function(time){
	var arr1 = [];
	var arr2 = [];
	arr1.push(time.getFullYear());
	arr1.push(toDouble(time.getMonth() + 1));
	arr1.push(toDouble(time.getDate()));
	arr2.push(toDouble(time.getHours()));
	arr2.push(toDouble(time.getMinutes()));
	arr2.push(toDouble(time.getSeconds()));
	return arr1.join('-') + ' ' + arr2.join(':');
}
function toDouble(num){
    if(num < 10){
        return '0' + num
    }else{
        return num
    }
}
// test
// var t = new Date();
// console.log(toFormattedTime(t));

//格式化头衔等级
var toTitle = function(level){
	var num = null;
	switch(parseInt(level)){
		case 1:
			num = '一';
			break;
		case 2:
			num = '二';
			break;
		case 3:
			num = '三';
			break;
		case 4:
			num = '四';
			break;
		case 5:
			num = '五';
			break;
		case 6:
			num = '六';
			break;
		case 7:
			num = '七';
			break;
		case 8:
			num = '八';
			break;
		case 9:
			num = '九';
			break;
		default:
			num = '没';
			break;
	}
	return num + '袋长老'
}

module.exports = {
	toTitle: toTitle,
	toFormattedTime: toFormattedTime
}
