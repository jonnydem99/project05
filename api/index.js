import express from 'express';
import bodyParser from 'body-parser';
import questionsRoutes from './routes/questions.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors())

app.set('view engine','ejs')

app.use( bodyParser.urlencoded({ extended: true}));
app.use( bodyParser.json());

const home = (request, response) => {
    response.send('hi there')
}
app.get('/', home);
app.use('/questions', questionsRoutes);
app.listen( port, () => console.log( 'listening on port ' + port));
