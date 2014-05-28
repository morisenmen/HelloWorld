var fs = require('fs'); 
fs.rename('write.txt', 'write.js', function (err) { 
  if (err) throw err; 
  fs.stat('write.js', function (err, stats) { 
    if (err) throw err; 
    console.log('stats: ' + JSON.stringify(stats)); 
  }); 
}); 