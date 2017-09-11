var klass = require('./klass');

exports.add = function(items){
 	items.forEach((item,index)=>{
 		var _items = item;
 		var teacherName = _items.teacherName;
 		var studentName = _items.studentName;

 		klass.add(teacherName,studentName);
 	})
	
}