const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, (Date.now() + ' - ' + file.originalname).toLowerCase());
    }
})

// Init upload
const uploadAny = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileTypeInfo(file, cb);
    }
}).any();

const uploadVideo = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileTypeVideo(file, cb);
    }
}).single('video');

// Check File Type
function checkFileTypeVideo(file, cb) {
    // Allowed ext
    const filetypes = /mp4|mov|wmv|flv|avi/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos only');
    }
}

function checkFileTypeInfo(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|doc|docx|xls|xlsx|ppt|pptx|pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos are not allowed');
    }
}

// Init app
const app = express();               

// MySql Connection
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'steamclouddb'
})

// Body Parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// EJS
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(__dirname + '/public'));

app.get('/LearningMaterials', (req,res) => {
    var sql = "SELECT * FROM post JOIN faculty ON faculty.facultyId = post.faculty_id";

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
    })
});

// Navigation Video
app.get('/LearningMaterial/:id/video', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM post JOIN video ON post.post_id = video.post_id WHERE post.post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            res.render('pages/LearningMaterialVideo', {
                items: results,
                join: result
            });
        })
    })
});

// Navigation Files
app.get('/LearningMaterial/:id/files', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM file WHERE post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            console.log(result);
            res.render('pages/LearningMaterialFiles', {
                items: results,
                join: result
            });  
        })
    })
});

// Navigation Activity
app.get('/LearningMaterial/:id/activity', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM post JOIN activity ON post.post_id = activity.post_id WHERE post.post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            res.render('pages/LearningMaterialActivities', {
                items: results,
                join: result
            });
        })
    })
});

// Navigation Reference
app.get('/LearningMaterial/:id/reference', (req,res) => {
    var sql = `SELECT * FROM post WHERE post_id = ${req.params.id}`;

    connection.query(sql, (err, results) => {
        var joinStatement = `SELECT * FROM post JOIN reference ON post.post_id = reference.post_id WHERE post.post_id = ${req.params.id}`;
        connection.query(joinStatement, (err, result) => {
            res.render('pages/LearningMaterialReference', {
                items: results,
                join: result
            });
        })
    })
});

// Renders form to post learning Material
app.get('/PostLearningMaterial', (req,res) => {
    res.render('pages/index', {
        files: false,
        input: false,
        wrongfile: false
    });
})

// Post request
app.post('/PostLearningMaterial', (req,res) => {
    uploadAny(req, res, (err) => {
        var generalTitle = req.body.generalTitle;
        var generalDescription = req.body.generalDescription;
        var checkbox = req.body.checkbox;
        var activityTitle = req.body.activityTitle;
        var activityDescription = req.body.activityDescription;
        var reference = req.body.reference;

        console.log(generalTitle);
        console.log(generalDescription);
        console.log(activityTitle);
        console.log(activityDescription);
        console.log(reference);

        if (err) {
            console.log('ni sulod ko sa err');
            res.render('pages/index', {
                files: false,
                input: false,
                wrongfile: true
            })
        } else {
           if(generalTitle == '' || generalDescription == '' || activityTitle == '' || activityDescription == '' || reference == '') {
                res.render('pages/index', {
                    files: false,
                    input: true,
                    wrongfile: false
                })
            }

            if (req.files.length == 0 || req.files === undefined) {
                res.render('pages/index', {
                    files: true,
                    input: false,
                    wrongfile: false
                })
            } else {
                var num = 0;

                var object = {
                    checkbox : checkbox ? num = 1 : false
                }

                var sql = "INSERT INTO post (post_id, faculty_id, title, description, share) VALUES (NULL, "+1+", '"+generalTitle+"', '"+generalDescription+"', "+num+")";
                connection.query(sql, (err, result) => {});

                var length = req.files.length;

                if (length > 1) {
                    for (i = 0; i < length; i++) {
                        insertFile(req.files[i].filename, req.files[i].mimetype);
                    }
                } else {
                    insertFile(req.files[0].filename, req.files[0].mimetype);
                }

                insertActivity(activityTitle, activityDescription);
                insertReference(reference);   
                
                res.redirect('UploadVideo'); 
            }
        }       
    })
})

// Renders Upload Video Page
app.get('/UploadVideo', (req,res) => {
    res.render('pages/UploadVideo', {
        wrongfile: false,
        nofile: false,
        input: false
    });
})

// Post Request for Upload Video Page
app.post('/UploadVideo', (req,res,next) => {
    uploadVideo(req, res, (err) => {
        var videoTitle = req.body.videoTitle;

        if (err) {
            console.log('ni sulod ko sa error');
            res.render('pages/UploadVideo', {
                wrongfile: true,
                nofile: false,
                input: false
            })
        } else {
            if (req.file == undefined) {
                console.log('naa ko sa if ni sulod');
                res.render('pages/UploadVideo', {
                    wrongfile: false,
                    nofile: true,
                    input: false
                })
            } 

            if (videoTitle == '') {
                res.render('pages/UploadVideo', {
                    wrongfile: false,
                    nofile: false,
                    input: true
                })
            } else {
                insertVideo(videoTitle, req.file.filename, req.file.mimetype);
                res.redirect('back'); // redirect to another page but for now kay same page
            }
        }
    })
});

// Update
app.get('/updatereference/:id', (req, res) => {

    var sql = `SELECT reference, reference_id FROM reference WHERE reference_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.render('pages/updatereference', {
            result: result,
            err: false
        });    
    })
})

app.post('/updatereference/:id', urlencodedParser, (req, res) => {

    var updatetitle = req.body.title;

    if (updatetitle == '') {
        var sql = `SELECT reference, reference_id FROM reference WHERE reference_id = ${req.params.id}`;

        connection.query(sql, (err, result) => {
            res.render('pages/updatereference', {
                result: result, 
                err: true
            })
        })
    } else {
        var updatereference = `UPDATE reference SET reference = '`+ updatetitle +`' WHERE reference_id = ${req.params.id}`;

        connection.query(updatereference, (err, result) => {
            console.log(result);
            res.send('mana');
        })    
    }
})

// Update single activity with UI pero not sure sa UI
app.get('/updateactivity/:id', (req, res) => {

    var sql = `SELECT activity_id, activity_title, content FROM activity WHERE activity_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.render('pages/updateactivity', {
            result: result,
            err: false
        })
    })
})

app.post('/updateactivity/:id', urlencodedParser, (req, res) => {

    var updateTitle = req.body.activityTitle;
    var updateDescription = req.body.activityDescription;

    console.log(updateTitle);
    console.log(updateDescription);

    if (updateTitle == '' || updateDescription == '') {
        var sql = `SELECT suggested_activity_id, activity_title, content FROM suggested_activity WHERE suggested_activity_id = ${req.params.id}`;

        connection.query(sql, (err, result) => {
            res.render('pages/updateactivity', {
                result: result,
                err: true
            })
        })
    } else {
        var updateactivity = `UPDATE suggested_activity SET activity_title = '`+ updateTitle +`', content = '`+ updateDescription +`' WHERE suggested_activity_id = ${req.params.id}`;

        connection.query(updateactivity, (err, result) => {
            console.log('mana');
        })
    }

})

// No UI
app.get('/updatevideo/:id', (req, res) => {
    var updatevideo = `UPDATE video SET video_title = "dilenaundefined" WHERE video_id = ${req.params.id}`;

    connection.query(updatevideo, (req, res) => {
        console.log('mana');
    })
})

// Delete single file
app.get('/deletefile/:id', (req, res) => {
    var file = `SELECT filename FROM file WHERE file_id = ${req.params.id}`;

    connection.query(file, (err, result) => {
        deleteFromFolder(result[0]['filename']);
    })

    var deletefile = `DELETE FROM file WHERE file_id = ${req.params.id}`;

    connection.query(deletefile, (err, result) => {})
})

// Delete single video
app.get('/deletevideo/:id', (req, res) => {
    var video = `SELECT filename FROM video WHERE video_id = ${req.params.id}`;

    connection.query(video, (err, result) => {
        deleteFromFolder(result[0]['filename']);
    })

    var deletevideo = `DELETE FROM video WHERE video_id = ${req.params.id}`;

    connection.query(deletevideo, (err, result) => {})
})

// Delete single reference
app.get('/deletereference/:id', (req, res) => {
    var reference = `DELETE FROM reference WHERE reference_id = ${req.params.id}`;

    connection.query(reference, (err, result) => {});
})

// Delete single activity
app.get('/deleteactivity/:id', (req, res) => {
    var activity = `DELETE FROM activity WHERE activity_id = ${req.params.id}`;

    connection.query(activity, (err, result) => {});
})

// Delete all material
app.get('/LearningMaterial/:id/delete', (req,res) => {
    var file = `SELECT * FROM post JOIN file ON post.post_id = file.post_id WHERE post.post_id = ${req.params.id}`;
    var video = `SELECT * FROM post JOIN video ON post.post_id = video.post_id WHERE post.post_id = ${req.params.id}`;

    connection.query(file, (err, file) => {
        console.log(file.length);
        if(file.length == 0) {
            console.log('padayon lang');
        } else {
            if(file.length > 1) {
                for (var i = 0; i < file.length; i++) {
                    deleteFromFolder(file[i]['filename']); 
                }
            } else {
                deleteFromFolder(file[0]['filename']);
            }
        }
    })

    connection.query(video, (err, video) => {
        console.log(video.length);
        if(video.length == 0) {
            console.log('padayon lang');
        } else {
            if(video.length > 1) {
                for (var i = 0; i < video.length; i++) {
                    deleteFromFolder(video[i]['filename']); 
                }
            } else {
                deleteFromFolder(video[0]['filename']);
            }
        }
    })

    var fileDelete = `DELETE FROM post WHERE post_id = ${req.params.id}`;

    connection.query(fileDelete, (err, result) => {
        res.redirect('/LearningMaterials');
    });

    
});

app.get('/download/:id', (req, res) => {
    var sql = `SELECT filename FROM file WHERE file_id = ${req.params.id}`;

    connection.query(sql, (err, result) => {
        res.download('./public/uploads/' + result[0]['filename']);
    })
})

app.listen(3000, () => { console.log('Listening to port 3000'); })

function insertVideo(title, filename, filetype) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result[0].post_id);
        var insert = "INSERT INTO video (video_id, post_id, video_title, filename, filetype) VALUES (NULL, "+result[0].post_id+", '"+title+"', '"+filename+"', '"+filetype+"')";
        connection.query(insert, (err, result) => {})
    })
}

function insertFile(filename, filetype) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result[0].post_id);
        var insert = "INSERT INTO file (file_id, post_id, filename, filetype) VALUES (NULL, "+result[0].post_id+", '"+filename+"', '"+filetype+"')";
        connection.query(insert, (err, result) => {})
    })
}

function insertActivity(title, content) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        var insert = "INSERT INTO activity (activity_id, post_id, activity_title, activity_content) VALUES (NULL, "+result[0].post_id+", '"+title+"', '"+content+"')";
        connection.query(insert, (err,result) => {})
    })
}

function insertReference(reference) {
    var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        var insert = "INSERT INTO reference (reference_id, post_id, reference) VALUES (NULL, "+result[0].post_id+", '"+reference+"')";
        connection.query(insert, (err, result) => {})
    })
}

function deleteFromFolder(filename) {
    console.log(filename);
    fs.unlink('./public/uploads/'+filename, (err) => {
        if (err) throw err;
    });
}