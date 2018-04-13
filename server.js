var express = require('express');
var path = require('path');

var app = express();
var staticPath = express.static(path.join(__dirname,'/dist'));
app.use(staticPath);
console.log(__dirname)
app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname,'index.html'))
});

app.get("/pageOne",function(req,res){
    res.sendFile(path.join(__dirname,"dist/pageOne.html"))
})

var port = 8025;
app.listen(port,function(error) {
	if(error) {
		console.error(error)
	}else{
		console.info('===>服务器启动成功，端口号 <===',port)
	}
})