var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	var courseData = [];

	chapters.each((item)=>{
		var chapter = $(this);
		var chapterStrongInner = chapter.find('strong');
		chapterStrongInner.find('i').remove();
		chapterStrongInner.find('div').remove();
		var chapterTitle = chapterStrongInner.text();

		console.log(chapterTitle);

		var chapterlistdata={
			title:chapterTitle,
			video:[]
		};

		chapter.find('li').each(function(){
			var videos=$(this).find('a');
			videos.find('i').remove();
			videos.find('button').remove();
			var videoContent=videos.text().replace(/\s/g,'');		//去除空白符
			var videoId=videos.attr('href').split('video/')[1];
			var video={
				id:videoId,
				content:videoContent
			}
			chapterlistdata.video.push(video);

		})
		courseData.push(chapterlistdata);
	})

	return courseData;
}

function printInfo (course){
	course.forEach((item)=>{
		console.log(item);
	})
}

http.get(url, (res)=>{
	var html = '';

	res.on('data',(data)=>{
		html += data;
	})

	res.on('end', ()=>{
		var courseData = filterChapters(html);
		printInfo(courseData);

	})
}).on('error',()=>{
	console.log('获取课程数据出错了')
})

// http.createServer((req,res)=>{
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type','text/palin');
// 	res.end('Hello world111');
// }).listen(2016,'127.0.0.1',()=>{
// 	console.log('server is running at port d%',2016);
// });