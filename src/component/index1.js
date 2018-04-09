/**
 * @Author:      haojianling
 * @DateTime:   2018/3/29 16:11
 * @Description: xxxx
 * @Last Modified By:   haojianling
 * @Last Modified Time:  2018/3/29 16:11
 *
 **/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getData() {
        // 写成相对位置
        fetch("./json/message.json")
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log("存在一个问题，状态码为：" + response.status);
                        return;
                    }
                    //检查响应文本
                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            )
            .catch(function (err) {
                console.log("Fetch错误:" + err);
            });
    }
}

export default Point