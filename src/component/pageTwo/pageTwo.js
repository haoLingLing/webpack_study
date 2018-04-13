/**
 * @Author:      haojianling
 * @DateTime:   2018/3/29 16:11
 * @Description: xxxx
 * @Last Modified By:   haojianling
 * @Last Modified Time:  2018/3/29 16:11
 *
 **/
import "./pageTwo.css"
import Point  from "../home/home";


class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color; // 正确
    }

    getId(){
        var a=document.getElementById("app");
        console.log(a)
    }
}

let cp = new ColorPoint(25, 8, 'green');

console.log(cp instanceof ColorPoint); // true
console.log(cp instanceof Point);    // true
cp.getData();
cp.getId();
export  default ColorPoint;
