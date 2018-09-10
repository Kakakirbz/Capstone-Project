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
    var sql = "SELECT * FROM post JOIN faculty ON faculty.faculty_id = post.faculty_id";

    connection.query(sql, (err, result) => {
        res.render('pages/LearningMaterials', {
            items:result,
            id:1
        });
    })
});

// Navigation Info
app.get('/LearningMaterial/:id/info', (req,res)  => {

    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.render('pages/LearningMaterialInfo', {
            items: result
        });
        console.log(result);
    })
});

// Navigation Video
app.get('/LearningMaterial/:id/video', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM post JOIN file ON post.post_id = file.post_id WHERE post.post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            res.render('pages/LearningMaterialVideo', {
                items: results,
                join: result
            });
            console.log(result);
        })
        console.log(results);
    })
});

// Navigation Files
app.get('/LearningMaterial/:id/files', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM post JOIN file ON post.post_id = file.post_id WHERE post.post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            res.render('pages/LearningMaterialFiles', {
                items: results,
                join: result
            });  
        })
        console.log(results);
    })
});

// Navigation Activity
app.get('/LearningMaterial/:id/activity', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM post JOIN suggested_activity ON post.post_id = suggested_activity.post_id WHERE post.post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            res.render('pages/LearningMaterialActivities', {
                items: results,
                join: result
            });  
            console.log(result);
        })
        console.log(results);
    })
});

// Navigation Reference
app.get('/LearningMaterial/:id/reference', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.render('pages/LearningMaterialReference', {
            items: result
        });
        console.log(result);
    })
});

// Renders form to post learning Material
app.get('/PostLearningMaterial', (req,res) => {
    res.render('pages/index');
})

// Post request
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
        console.log(req.files);
        var length = req.files.filename.length;
        var filename = null;
        var filetype = null;
        if(length > 1) {
            for(var i=0; i < length; i++) {
                console.log(req.files.filename[i].name);
                var file = req.files.filename[i];
                filename = file.name;
                filetype = file.mimetype;
                console.log(filetype);

                file.mv('./uploads/'+filename, (err) => {
                    if(err) {
                        console.log(err);
                    }
                })

                insertFile(filename, filetype);
            }
        } else {
            var file = req.files.filename;
            filename = file.name;
            filetype = file.mimetype;

            file.mv('./uploads/'+filename, (err) => {
                if(err){
                    console.log(err);
                }
            })

            insertFile(filename, filetype);
        }
    }

    res.redirect('PostLearningMaterial');
})

app.get('/editmaterial', (req,res) => {
    
});

// Delete material
app.get('/deletematerial/:id', (req,res) => {
    console.log(req.params.id);

    var sql = `DELETE FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.redirect('/LearningMaterials');
    })
});

app.listen(3000, function(){
    console.log('Listening to port 3000');
})

function insertFile(filename, filetype) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result[0].post_id);
        var insert = "INSERT INTO file (file_id, post_id, filename, filetype) VALUES (NULL, "+result[0].post_id+", '"+filename+"', '"+filetype+"')";
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
        var insert = "INSERT INTO suggested_activity (suggested_activity_id, post_id, activity_title, content) VALUES (NULL, "+result[0].post_id+", '"+title+"', '"+content+"')";
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