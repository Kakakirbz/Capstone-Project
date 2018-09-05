var insertFile = function insertFile(filename) {
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

var insertActivity = function insertActivity(title, content) {
	var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        var insert = "INSERT INTO suggested_activity (suggested_activity_id, post_id, title, content) VALUES (NULL, "+result[0].post_id+", '"+title+"', '"+content+"')";
        connection.query(insert, (err,result) => {
            //console.log('Yehey');
        })
    })
}

var insertReference = function insertReference(reference) {
	var sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        var insert = "INSERT INTO reference (reference_id, post_id, reference) VALUES (NULL, "+result[0].post_id+", '"+reference+"')";
        connection.query(insert, (err, result) => {
            //console.log('Successful');
        })
    })
}

module.exports = insertFile;
module.exports = insertActivity;
module.exports = insertReference;