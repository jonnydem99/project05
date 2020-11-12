import express from 'express';

//import {v4 as uuidv4} from 'uuid';

import Router from 'express-promise-router'; 

import {dbQueryAnswers, dbQueryAnswer, dbInsertAnswer, dbUpdateAnswer, dbDeleteAnswer} from '../model/dbhelper.js'

 

//const router = express.Router();

const router = Router();
 

let answers = [];


const queryAnswers = async (request, response) => {

    answers = await dbQueryAnswers()

    answers.forEach( answer => {

        console.log( answer)

    })
/*
    if (answers.length === 0) addDefaultAnswer();
*/
    console.log('GET: answers='+JSON.stringify(answers));

    //response.send(contacts);

    const context = {"answers": answers, "title": "This is cool" }
    const json_answers = { 'data' : answers}
    console.log('GET: json_answers='+JSON.stringify(json_answers));
    response.json(json_answers)
}

const addAnswer = async (request, response) => {

    console.log('request.body = ' + request.body);

    let answer = request.body;

    console.log('answer = ' + answer);

    /*const newAnswer = { "uid": uuidv4(), ...answer };*/

    console.log('POST: answer='+JSON.stringify(answer));

    answers = [...answers, answer];

    await dbInsertAnswer( answer);

    response.send(`${answer.content}, ${answer.ans}, ${answer.category} added`);

}

const deleteAnswer = async (request, response) => {

    console.log('deleteAnswer called')

    const {id} = request.params; //const id = request.params['id'];

    answers = answers.filter( answer => answer.id !== id);

    await dbDeleteAnswer( id); 

    console.log(`DELETE: id=${id} deleted`);

    response.send(`DELETE: id=${id} deleted`);

}




// all routes are starting with /answers

router.get('/', queryAnswers);
router.post('/', addAnswer);
router.delete('/:id', deleteAnswer);

export default router;