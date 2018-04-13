/**
 * @Author:      haojianling
 * @DateTime:   2018/4/2 18:14
 * @Description: xxxx
 * @Last Modified By:   haojianling
 * @Last Modified Time:  2018/4/2 18:14
 *
 **/

import "../../css/common.css";
import "./pageone.css";

class Name {
    constructor(){
        this.name="123";
    }

    getId(){
        var a=document.getElementById("app");
        console.log(a)
    }

}

var button=document.getElementsByClassName("home")[0];
button.onclick=function(){
    console.log();
    var old=window.location.origin;
    console.log(window.location,old)
    var newhref=old+"/";
    window.location.href=newhref
};


export default Name



