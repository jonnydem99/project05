import express from 'express';

//import {v4 as uuidv4} from 'uuid';

import Router from 'express-promise-router'; 

import {dbQueryQuestions, dbQueryQuestion, dbInsertQuestion, dbUpdateQuestion, dbDeleteQuestion} from '../model/dbhelper.js'

 

//const router = express.Router();

const router = Router();
 

let questions = [];

/*const addDefaultQuestions = () => {

    contacts = [

        { "id": uuidv4(), "fname": "Bruce", "lname": "Banner"},

        { "id": uuidv4(), "fname": "Clark", "lname": "Kent"},

        { "id": uuidv4(), "fname": "Diana", "lname": "Prince"},

        { "id": uuidv4(), "fname": "Tony", "lname": "Stark"}

    ];

}
*/
const queryQuestions = async (request, response) => {

    questions = await dbQueryQuestions()

    questions.forEach( question => {

        console.log( question)

    })
/*
    if (questions.length === 0) addDefaultQuestion();
*/
    console.log('GET: questions='+JSON.stringify(questions));

    //response.send(contacts);

    const context = {"questions": questions, "title": "This is cool" }
    const json_questions = { 'data' : questions}
    console.log('GET: json_questions='+JSON.stringify(json_questions));
    response.json(json_questions)
}

const addQuestion = async (request, response) => {

    console.log('request.body = ' + request.body);

    let question = request.body;

    console.log('quest= ' + question);

    /*const newQuestion = { "uid": uuidv4(), ...question };*/

    console.log('POST: question='+JSON.stringify(question));

    questions = [...questions, question];

    await dbInsertQuestion( question);

    response.send(`${question.content}, ${question.category} added`);

}

const deleteQuestion = async (request, response) => {

    console.log('deleteQuestion called')

    const {id} = request.params; //const id = request.params['id'];

    questions = questions.filter( question => question.id !== id);

    await dbDeleteQuestion( id); 

    console.log(`DELETE: id=${id} deleted`);

    response.send(`DELETE: id=${id} deleted`);

}

const queryQuestion = async (request, response) => {

    const {id} = request.params; //const id = request.params['id'];

    let question = await dbQueryQuestion( id);

    console.log(`GET: ${question.id} found`);

    const context = {"question": question }

    response.render('question', context)

}

const updateQuestion = async (request, response) => {

    console.log(JSON.stringify(request.params))

    const {id} = request.params; //const id = request.params['id'];

    const {ques, category} = request.body

    console.log(`content=${content} category=${category}`);

    let question = questions.find( question => question.id === id);

    if (!question) {

        response.send(`UPDATE: ${question} not found`)

        return;

    }

    if (content) question.content = content;

    if (category) question.category = category;

    await dbUpdateQuestion( question);

    console.log(`${question.id}: ${question.content}, ${question.category} updated`);

    response.send(`${question.id}: ${question.content}, ${question.category} updated`);

}

// all routes are starting with /questions

router.get('/', queryQuestions);
router.post('/', addQuestion);
router.delete('/:id', deleteQuestion);
router.get('/:id', queryQuestion);
router.patch('/:id', updateQuestion);

 

export default router;