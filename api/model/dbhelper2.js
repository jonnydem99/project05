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
            let answer = { "content": row["CONTENT"], "ans": row["ANS"], "category": row["CATEGORY"]}
            //console.log("answer="+JSON.stringify(answer))
            answers = [...answers, answer]
        }

        resolve( answers);   

    }
    try {
        return new Promise( (resolve, reject) => {
            let sql = 'CONTENT, ANS, CATEGORY FROM ANSWERS';
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
        let answer = {"content": row["CONTENT"], "answer": row["ANSWER"], "category": row["CATEGORY"]}
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

            let sql = `INSERT INTO ANSWERS (CONTENT, ANS, CATEGORY) VALUES ('${answer.content}', '${answer.ans}', '${answer.category}')`;
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
            let sql = `UPDATE ANS SET CONTENT='${answer.content}'ANS='${answer.ans}',CATEGORY='${answer.category}'`;
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