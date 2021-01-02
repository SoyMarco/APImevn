import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mysql from 'mysql';
import router from './routes';

//Express
const app = express();

//Morgan
app.use(morgan('dev'));
//Cors
app.use(cors())

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api',router);

// Settings
app.set('port', process.env.PORT || 3000);


//Middleware


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
