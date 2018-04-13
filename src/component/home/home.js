/**
 * @Author:      haojianling
 * @DateTime:   2018/3/29 16:11
 * @Description: xxxx
 * @Last Modified By:   haojianling
 * @Last Modified Time:  2018/3/29 16:11
 *
 **/
// import "";
/*var stuJson = require('../json/message.json');
console.log(stuJson);*/
console.log(__dirname);
import "./home.scss";
// import "../../json/message.json";
// require('jquery');
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getData() {
        // 写成相对位置
        fetch("./json/message.json")
            .then((response) => {

                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                    console.log(data)
                })
            .catch(function (err) {
                console.log("Fetch错误:" + err);
            });
    }
}

var button = document.getElementsByClassName("button")[0];
button.onclick = function () {
    console.log();
    var old = window.location.href;
    var newhref = old + "pageOne.html";
    window.location.href = newhref
};

// var imgurl=require("../../img/timg.jpg");
var imgBox=document.getElementsByClassName("header")[0];
imgBox.innerHTML=`<img src="../../img/timg.jpg" height="200"/>`;
// imgBox.innerHTML=`<img src=`+imgurl+` height="200"/>`;

export default Point