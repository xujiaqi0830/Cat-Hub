var words = '大江东去波浪接天中华历史岁月五千炎黄共称民族祖先导平水涨违命坐监商代金属文记骨片武王政绩除害分田战国征杀形态纷繁你抢我夺角逐其间也曾退让昨却一箭杰士变法能者富川老子无为道德名典依存互根错或福善仲尼博爱且把学办因材施教贵以精专百家争论各持己见认识深奥影响久远石申守夜修室鲁班指切损益端午追原作品总括钟音十全首脑规定确立集权度量器具字体币钱刑责疑犯乡里受连阿房秀丽长城防线陈胜起义众所企盼打透锅底项带师团四面是歌刘觉志满休养生息提议节减推恩令下调控铁盐兴读易理正统则显新的改制举步维艰增兵卡压绿林好汉奖罚并用消租裁捐两层势力内外藏患轻将头束克了村县派使张某西出阳关网络永留欧亚同欢超遇困境化解危难英走区域行程早晚造纸购料价低简便地动晨晓奇特应验按例讲析九章题算证系组方疗效求散司马虽死重于巨山写赋优美佳话流传球队比赛舞似飞燕随着攻略负在米燃几条计策投降这般亮语左右三足实现谁心尽知气数甚短务必保住它处斯馆风声不停庆功谢安南北朝际登场轮换希望融合期待双眼圆周率值要术汇编花源余香从军木兰湖光入图帮助补点容纳神像范与批判科考择才始自杨坚由广临座绝色独占输送财宝运河承担包围预示星移斗转太宗只闻那些直言强续就职她很果断继瑞景象社会向前街市销售牌号找店松赞干布公主婚联取经之旅越障涉险访日客居古今纪念但听喜讯招致背叛群镇割据朋党竞坛失败阵亡后想稳健车辆刚过赵州路段校对小注倒刻整板夫已目测尚需查看毒性温病医护救援李白格律吸引俄韩伯乐朗笑驴跑腿弹高级技艺当空吴展油彩映画女孩托篮更序频报缺衣少员该府给予巴结胡男龙服加身杯酒得愿青贷均税济世局限激烈警告支付盟款素质较差交手即完突禁唱曲黑发冲冠何须有罪位列最冤买卖微利常靠票券领土扩幅成吉思汗森沙圳津每置巡检式样仍然密织被单另装食类近海航船紧急信件快速进站普货至都份额亿万毕升研究排印活版准备离港配块罗盘火药爆破开采基建介绍授时积极笔谈苦著农书营构庭院针索模型资治通鉴苏门放任清照委婉陆游习否辛又操练问案戏迷幕终伤感明初创业省和相免许诺厂卫抓拿口宣八股答试做父母官哪个惊叫孙儿遭赶培育良种二季丰产机户供费劳工银赚七回别友到非洲边没吃跟顺席末血染设套射击真够威严怎么决意尔等脚软再次亲讨部落谋反上获哈达拉萨执签迎候他们故园来还协约划界收复台湾审核标本环顾察鲜什物悉附春牛荣选状元及第京剧表演红楼伊人云雨雷电热汽播露康宁多年往事录此评述参半诉说情况仅如视管适可而止请您细观';
var letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

function geneOneSentence(str, strLen, isSpace){
    var arr = [];
    for(var i = 0; i < strLen; i += 1){
        arr.push(str.charAt(Math.round(Math.random() * (str.length - 1))));
    }
    if(isSpace){
        arr.splice(Math.floor(strLen / 2), 0, ' ');
    }
    return arr.join('');
}
function geneOneUrl(letters, urlLen){
    var str = 'www.sina.com/';
    for(var i = 0; i < urlLen; i += 1){
        str += letters.charAt(Math.round(Math.random() * (letters.length - 1)));
    }
    return str;
}

function geneJsonp(arr){
    var tempArr = [];
    for(var i = 0; i < arr.length; i += 1){
        tempArr.push('{"title": "' + geneOneSentence(words, arr[i].len, arr[i].sp) + '", "href": "' + geneOneUrl(letters, 6) + '"}');
    }
    return '(' + tempArr.join(', ') + ')';
}

function geneAjax(json){
    var output = {};
    for(var name in json){
        var tempArr = [];
        for(var i = 0; i < json[name].length; i += 1){
            for(var j = 0; j < json[name][i].rows; j += 1){
                var tempJson = {};
                tempJson.title = geneOneSentence(words, json[name][i].words, json[name][i].space);
                tempJson.href = geneOneUrl(letters, 6);
                tempArr.push(tempJson);
            }
        }
        output[name] = tempArr;
    }
    return output;
}

module.exports = {
    geneJsonp: geneJsonp,
    geneAjax: geneAjax
};
// console.log(geneOneSentence(words, 20, 1));
// console.log(geneOneUrl(letters, 7));

// var testArr = [
//     {
//         len: 3,
//         sp: false
//     },
//     {
//         len: 10,
//         sp: true
//     }
// ];
//
// console.log(geneJsonp(testArr));
