//验证用户名
function regUsername(name) {
    var re = /^\S+[\s\w\u4E00-\u9FA5\uF900-\uFA2D]*\S+$/img;
    return re.test(name);
}
//验证文本
function regContent(text) {
    var re = /^\s{0,2}\S+[\s\w\u4E00-\u9FA5\uF900-\uFA2D]*\S+$/img;
    return re.test(text);
}
 module.exports = {
    regUsername: regUsername,
    regContent: regContent
};
// console.log(regContent('  xujiaqi'));
// console.log(regContent('    '));
// console.log(regContent('xujiaqi '));
// console.log(regContent(' xu jia qi '));
// console.log(regContent('xu jia qi'));
// console.log(regContent('x u j i a q i'));
// console.log(regContent('xujiaqi'));
// console.log(regContent('徐家麒'));
// console.log(regContent('徐 家 麒'));
// console.log(regContent('徐 家 麒'));

//
// console.log(regUsername('   xujiaqi'));
// console.log(regUsername('    '));
// console.log(regUsername('xujiaqi '));
// console.log(regUsername(' xu jia qi '));
// console.log(regUsername('xu jia qi'));
// console.log(regUsername('x u j i a q i'));
// console.log(regUsername('xujiaqi'));
// console.log(regUsername('徐家麒'));
// console.log(regUsername('徐 家 麒'));
