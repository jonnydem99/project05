import mysql from 'mysql';

const getConnection = async() => {
    let conn = mysql.createConnection( {
        "host" : "localhost",
        "port": "3306",
        "user": "root",
        "password": "root",
        "database": "studentdb"
    })
    await conn.connect( err => {
        if (err) {
            console.log('getConnection: connection error: ' + err)
            return;
        }
        console.log('getConnection: connection successful');
    })
    return conn;
}

export const dbQueryQuestions = async () => {
    var questions = [];
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbQueryQuestions: connection error: ' + err)
            return;
        }

        console.log('dbQueryQuestions: connection successful');
        for (let i=0; i< result.length; i++) {
            let row = result[i];
            let question = { "uid" : row["UID"], "content": row["CONTENT"], "category": row["CATEGORY"]}
            //console.log("question="+JSON.stringify(question))
            questions = [...questions, question]
        }

        resolve( questions);   

    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = 'SELECT UID, CONTENT, CATEGORY FROM QUESTIONS';
            console.log( 'dbQueryQuestions: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }

    catch (err) {
        console.log('dbQueryQuestions: caught error: ' + err)
    }
    finally {
        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve([])})

}

export const dbQueryQuestion = async (uid) => {
    var question;
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbQueryQuestion: connection error: ' + err)
            return;
        }
        console.log('dbQueryQuestion: connection successful');
        let row = result[0];
        let question = { "uid" : row["UID"], "content": row["CONTENT"], "category": row["CATEGORY"]}
        console.log("question="+JSON.stringify(question))

        resolve( question);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `SELECT UID, CONTENT, CATEGORY FROM QUESTIONS WHERE ID='${uid}'`;

            console.log( 'dbQueryQuestions: sql='+sql);

            conn.query( sql, (err, result, fields) => {

                resultHandler( err, result, fields, resolve)

            })

        })

    }

    catch (err) {

        console.log('dbQueryQuestion: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve({})})

}

export const dbInsertQuestion = async (question) => {

    var question;

    let conn = await getConnection();

    const resultHandler = (err, result, fields, resolve) => {

        if (err) {

            console.log('dbInsertQuestion: connection error: ' + err)
            return;
        }

        console.log('dbInsertQuestion: connection successful');
        resolve( 1);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `INSERT INTO QUESTIONS (ID, CONTENT, CATEGORY) VALUES ('${question.uid}', '${question.content}', '${question.category}')`;
            console.log( 'dbInsertQuestion: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)

            })
        })
    }

    catch (err) {
        console.log('dbInsertQuestion: caught error: ' + err)

    }
    finally {

        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve(0)})

}

export const dbDeleteQuestion = async (uid) => {
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbDeleteQuestion: connection error: ' + err)
            return;
        }
        console.log('dbDeleteQuestion: connection successful');
        resolve( 1);   

    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = `DELETE FROM QUESTIONS WHERE ID='${uid}'`;
            console.log( 'dbDeleteQuestion: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }

    catch (err) {
        console.log('dbDeleteQuestion: caught error: ' + err)
    }
    finally {
        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve(0)})
}

export const dbUpdateQuestion = async (question) => {
    var question;
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {

        if (err) {
            console.log('dbUpdateQuestion: connection error: ' + err)
            return;
        }

        console.log('dbUpdateQuestion: connection successful');
        resolve( 1);   

    }

    try {
        return new Promise( (resolve, reject) => {
            let sql = `UPDATE QUESTION SET CONTENT='${question.content}',LNAME='${question.category}' WHERE ID='${question.uid}'`;
            console.log( 'dbUpdateQuestion: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }

    catch (err) {
        console.log('dbUpdateQuestion: caught error: ' + err)
    }
    finally {
        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve(0)})

}