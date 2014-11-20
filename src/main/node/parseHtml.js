var http = require("http");
var fs = require("fs");
var parser = require("./parsePrice");

var url = "http://car.autohome.com.cn/";
var iconv = require("iconv-lite");
var data;
var regExp = /<span class="open-name"><a href="(.+?)">(.+?)<\/a><\/span>/gim
var dest="car";
var getUrl = function(baseUrl, url) {
	return url.indexOf(baseUrl) >= 0 ? url : baseUrl + url;
}
var mkdir = function(dir, callback) {
	if (!fs.existsSync(dir)) {
		fs.mkdir(dir, callback);
	} else {
		callback();
	}
}
var req = http.request(url, function(res){
	res.on('data', function(chunk){
		data += iconv.decode(chunk, "gb2312");
	}).on('end', function(){
		mkdir(dest, function(err) {
			if (err) throw err;
			var result = "";
			while(rs = regExp.exec(data)) {
				var destUrl = getUrl(url, rs[1]);
				var dir = dest+"/"+rs[2];
				result += rs[2] + "::" + destUrl + "\n";
				mkdir(dir, function(err) {
					if (err) throw err;
					parser.saveFile(destUrl, dir);
					// var rq = http.request(destUrl, function(resp) {
					// 	var dt = "";
					// 	resp.on("data", function(ck) {
					// 		dt += iconv.decode(ck, "gb2312");
					// 	}).on("end", function(){
					// 		fs.writeFile(dir + "/origin.html", dt, function (err) {
					// 			if (err) throw err;
					// 			console.log(rs[2] + "Origin saved!");
					// 		});
					// 	});
					// });

					// rq.end();
				});
			}
			fs.writeFile(dest + "/dest.html", result, function(err) {
				if (err) throw err;
	    		console.log('It\'s saved!');
			});
		});
		fs.writeFile(dest + "/origin.html", data, function (err) {
			if (err) throw err;
			console.log("Origin saved!");
		});
	});
});

req.end();