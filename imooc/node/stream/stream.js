var fs = require('fs');

var readStream = fs.createReadStream('../Buffer/decodeImage.png');
var writeStream = fs.createWriteStream('newImage.png');

readStream.on('data',(chunk)=>{
	if(writeStream.write(chunk) === false){
		console.log('still cached');
		readStream.pause();
	}
})

readStream.on('end',()=>{
	writeStream.end();
})

writeStream.on('drain',()=>{
	console.log('data drains');
	readStream.resume();
});