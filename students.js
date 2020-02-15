var fs = require('fs')
var dbPath = './views/db.json'
//获取所有学生
exports.findAll = (callback) => {
    //如果有人想调用findAll,则必须传入一个回调函数
    fs.readFile(dbPath, 'utf8', (err, data) => {
        //这个回调函数要有err,data两个形参
        if (err) {//如果readFile失败了
            callback(err)//则callback会传递err给回调函数
        } else {
            callback(null, JSON.parse(data).students)
            //否则callback会传递data给回调函数
        }
    })
}

//保存学生
exports.save = (student, callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)
        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        var str = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, str, (err) => {
            if (err) return callback(err)
            callback(null)
        })
    })
}

//更新学生
exports.update = (student, callback) => {
    student.id = Number(student.id)
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err)
        var students = JSON.parse(data).students
        students.forEach(element => {
            if (element.id === student.id) {
                students[students.indexOf(element)] = student;
            }
        });
        var str = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, str, (err) => {
            if (err) return callback(err)
            callback(null)
        })
    })
}

//删除学生
exports.delete = (student,callback) => {
    student.id=Number(student.id)
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) return callback(err)
        var students = JSON.parse(data).students
        students.forEach(element => {
            if (element.id === student.id) {
                students.splice(students.indexOf(element),1)
            }
        });
        var str = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, str, (err) => {
            if (err) return callback(err)
            callback(null)
        })
    })
}
