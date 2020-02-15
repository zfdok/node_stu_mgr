var express = require('express')
var router=require('./router')  //4.app引用router
var bodyParser=require('body-parser')

var app = express()
var port = 3000

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('html', require('express-art-template'))

app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))
app.use(router)  //5. app使用router
app.listen(port, () => console.log(`app listening on port` + port))
module.exports=app
