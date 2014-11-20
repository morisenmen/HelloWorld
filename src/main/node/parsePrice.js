var http = require("http");
var fs = require("fs");
var iconv = require("iconv-lite");

var regExp = /<div class="list-cont-main"><div.*?><a.*?>(.*?)<\/a><\/div>.*?<div class="main-lever-right"><div.*?<span.*?<span.*?>(.+?)<\/span><\/span><\/div>.*?(<ul class="interval01-list">.*?<\/ul>).+?<\/div><\/div>/gim
var exp = /<p class="infor-title"><a.*?>(.*?)<\/a><\/p>.*?<span class="guidance-price">(.*?)<\/span>/gim

exports.saveFile = function(url, destDir) {
	var data = "";
	var req = http.request(url, function(res){
		res.on('data', function(chunk){
			data += iconv.decode(chunk, "gb2312");
		}).on('end', function(){
			var result = "";
			while(rs = regExp.exec(data)) {
				result += rs[1] + ":" + rs[2] + "\n";
				while(ps = exp.exec(rs[3])) {
					result += "\t" + ps[1] + ":" + ps[2] + "\n";
				}
			}
			var origin = destDir + "/dest.html";
			var dest = destDir + "/origin.html";
			fs.writeFile(origin, result, function(err) {
				if (err) throw err;
	    		console.log(origin + ' saved!');
			});
			fs.writeFile(dest, data, function (err) {
				if (err) throw err;
				console.log(dest + ' saved!');
			});
		});
	});

	req.end();
}