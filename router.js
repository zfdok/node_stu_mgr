var express = require('express')
var students = require("./students")
//1.创建一个路由容器
var router = express.Router()
//2.把请求都挂在router中
router.get('/', (req, res) => {
    res.redirect('/students')
})
router.get('/students', (req, res) => {
    students.findAll((err, students) => {
        if (err) return res.status.send("读取文件错误" + err)
        res.render("index.html", {
            food: ['apple', 'orange'],
            students: students
        })
    })
})
router.get('/students/new', (req, res) => {
    res.render('new.html')
})
router.post('/students/new', (req, res) => {
    students.save(req.body, (err) => {
        if (err) return res.status(500).send("err");
        res.redirect('/students')
    })
})
router.get('/students/edit', (req, res) => {
    console.log(req.url);
    res.render('edit.html',req.query)
 })
router.post('/students/edit', (req, res) => {
    students.update(req.body,(err)=>{
        if(err) return res.status(500).send(err)
        res.redirect('/students')
    })
 })
router.get('/students/delete', (req, res) => {
    students.delete(req.query,(err)=>{
        if(err) return res.status(500).send("删除有误:"+err)
        res.redirect('/students')
    })
 })
//3.把router导出
module.exports = router