const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'temp'
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(upload());

app.get('/LearningMaterials', (req,res) => {
    var sql = "SELECT * FROM post";

    connection.query(sql, (err, result) => {
        res.render('pages/LearningMaterials', {
            items:result,
            id:1
        });
    })
});

app.get('/LearningMaterial/:id', (req,res)  => {

    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.render('pages/LearningMaterial', {
            items: result
        });
        console.log(result);
    })
});

app.get('/PostLearningMaterial', (req,res) => {
    res.render('pages/index');
})

app.post('/PostLearningMaterial', urlencodedParser, (req,res) => {

    var generalTitle = req.body.generalTitle;
    var generalDescription = req.body.generalDescription;
    var checkbox = req.body.checkbox;
    var activityTitle = req.body.activityTitle;
    var activityDescription = req.body.activityDescription;
    var reference = req.body.reference;

    var num = 0;

    var object = {
        checkbox : checkbox ? num = 1 : false
    }

    var sql = "INSERT INTO post (post_id, faculty_id, title, description, share) VALUES (NULL, "+1+", '"+generalTitle+"', '"+generalDescription+"', "+num+")";
    connection.query(sql, (err, result) => {

    })

    insertActivity(activityTitle, activityDescription);
    insertReference(reference);

    if(req.files) {
        var length = req.files.filename.length;
        if(length > 1) {
            for(var i=0; i < length; i++) {
                console.log(req.files.filename[i].name);
                var file = req.files.filename[i];
                var filename = file.name;

                file.mv('./uploads/'+filename, (err) => {
                    if(err) {
                        console.log(err);
                    }
                })

                insertFile(filename);
            }
        } else {
            var file = req.files.filename;
            var filename = file.name;

            file.mv('./uploads/'+filename, (err) => {
                if(err){
                    console.log(err);
                }
            })

            insertFile(filename);
        }
    }

    res.redirect('PostLearningMaterial');
})

app.get('/editmaterial',function(req,res) {
    
});

app.get('/deletematerial/:id',function(req,res) {
    console.log(req.params.id);

    var sql = `DELETE FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.redirect('/LearningMaterials');
    })
});

app.listen(3000, function(){
    console.log('Listening to port 3000');
})

function insertFile(filename) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result[0].post_id);
        var insert = "INSERT INTO file (file_id, post_id, filename) VALUES (NULL, "+result[0].post_id+", '"+filename+"')";
        connection.query(insert, (err, result) => {
            if(err) throw err;
            //console.log('Inserted');
        })
    })
}

function insertActivity(title, content) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        var insert = "INSERT INTO suggested_activity (suggested_activity_id, post_id, title, content) VALUES (NULL, "+result[0].post_id+", '"+title+"', '"+content+"')";
        connection.query(insert, (err,result) => {
            //console.log('Yehey');
        })
    })
}

function insertReference(reference) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        var insert = "INSERT INTO reference (reference_id, post_id, reference) VALUES (NULL, "+result[0].post_id+", '"+reference+"')";
        connection.query(insert, (err, result) => {
            //console.log('Successful');
        })
    })
}