const student = require('./student');
const teacher = require('./teacher');

function add(teacherName, studentName) {
	teacher.add(teacherName);

	studentName.forEach((item,index)=>{
		student.add(item);
	})
}

exports.add = add;