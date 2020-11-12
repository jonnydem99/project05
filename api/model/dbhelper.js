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
            let question = { "id" : row["ID"], "content": row["CONTENT"], "category": row["CATEGORY"]}
            //console.log("question="+JSON.stringify(question))
            questions = [...questions, question]
        }

        resolve( questions);   

    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = 'SELECT ID, CONTENT, CATEGORY FROM QUESTIONS';
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

export const dbQueryQuestion = async (id) => {
    var question;
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbQueryQuestion: connection error: ' + err)
            return;
        }
        console.log('dbQueryQuestion: connection successful');
        let row = result[0];
        let question = { "id" : row["ID"], "content": row["CONTENT"], "category": row["CATEGORY"]}
        console.log("question="+JSON.stringify(question))

        resolve( question);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `SELECT ID, CONTENT, CATEGORY FROM QUESTIONS WHERE ID='${id}'`;

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

            let sql = `INSERT INTO QUESTIONS (CONTENT, CATEGORY) VALUES ('${question.content}', '${question.category}')`;
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

export const dbDeleteQuestion = async (id) => {
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
            let sql = `DELETE FROM QUESTIONS WHERE ID='${id}'`;
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
            let sql = `UPDATE QUESTION SET CONTENT='${question.content}',LNAME='${question.category}' WHERE ID='${question.id}'`;
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

export const dbQueryAnswers = async () => {
    var answers = [];
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbQueryAnswers: connection error: ' + err)
            return;
        }

        console.log('dbQueryAnswers: connection successful');
        for (let i=0; i< result.length; i++) {
            let row = result[i];
            let answer = { "id": row["ID"], "content": row["CONTENT"], "ans": row["ANS"], "category": row["CATEGORY"]}
            //console.log("answer="+JSON.stringify(answer))
            answers = [...answers, answer]
        }

        resolve( answers);   

    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = 'SELECT ID, CONTENT, ANS, CATEGORY FROM ANSWERS';
            console.log( 'dbQueryAnswer: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }

    catch (err) {
        console.log('dbQueryAnswer: caught error: ' + err)
    }
    finally {
        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve([])})

}

export const dbQueryAnswer = async (id) => {
    var answer;
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbQueryAnswer: connection error: ' + err)
            return;
        }
        console.log('dbQueryAnswer: connection successful');
        let row = result[0];
        let answer = {"id": row[ID], "content": row["CONTENT"], "ans": row["ANS"], "category": row["CATEGORY"]}
        console.log("answer="+JSON.stringify(answer))

        resolve( answer);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `SELECT ID, CONTENT, ANS, CATEGORY FROM ANSWERS WHERE ID='${id}'`;

            console.log( 'dbQueryAnswers: sql='+sql);

            conn.query( sql, (err, result, fields) => {

                resultHandler( err, result, fields, resolve)

            })

        })

    }

    catch (err) {

        console.log('dbQueryAnswer: caught error: ' + err)

    }

    finally {

        if (conn) conn.end();

    }

    return new Promise( (resolve, reject) => {resolve({})})

}

export const dbInsertAnswer = async (answer) => {

    var answer;

    let conn = await getConnection();

    const resultHandler = (err, result, fields, resolve) => {

        if (err) {

            console.log('dbInsertAnswer: connection error: ' + err)
            return;
        }

        console.log('dbInsertAnswer: connection successful');
        resolve( 1);   

    }

    try {

        return new Promise( (resolve, reject) => {

            let sql = `INSERT INTO ANSWERS (CONTENT, ANS, CATEGORY) VALUES ('${answer.content}', '${answer.answer}', '${answer.category}')`;
            console.log( 'dbInsertAnswer: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)

            })
        })
    }

    catch (err) {
        console.log('dbInsertAnswer: caught error: ' + err)

    }
    finally {

        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve(0)})

}

export const dbDeleteAnswer = async (id) => {
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {
        if (err) {
            console.log('dbDeleteAnswer: connection error: ' + err)
            return;
        }
        console.log('dbDeleteAnswer: connection successful');
        resolve( 1);   

    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = `DELETE FROM ANSWERS WHERE ID='${id}'`;
            console.log( 'dbDeleteAnswer: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }

    catch (err) {
        console.log('dbDeleteAnswer: caught error: ' + err)
    }
    finally {
        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve(0)})
}

export const dbUpdateAnswer = async (answer) => {
    var answer;
    let conn = await getConnection();
    const resultHandler = (err, result, fields, resolve) => {

        if (err) {
            console.log('dbUpdateAnswer: connection error: ' + err)
            return;
        }

        console.log('dbUpdateAnswer: connection successful');
        resolve( 1);   

    }

    try {
        return new Promise( (resolve, reject) => {
            let sql = `UPDATE ANSWER SET CONTENT='${answer.content}'ANSWER='${answer.answer}',CATEGORY='${answer.category}'`;
            console.log( 'dbUpdateAnswer: sql='+sql);
            conn.query( sql, (err, result, fields) => {
                resultHandler( err, result, fields, resolve)
            })
        })
    }

    catch (err) {
        console.log('dbUpdateAnswer: caught error: ' + err)
    }
    finally {
        if (conn) conn.end();
    }
    return new Promise( (resolve, reject) => {resolve(0)})

}