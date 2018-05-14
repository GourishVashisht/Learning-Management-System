// Author : Gourish Vashisht
import express from 'express';
import path from 'path';
import indexRoute from './routes/api/index';

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
})
)

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/', indexRoute);

app.listen(8080, () => {
    console.log('Server started at : http://localhost:8080');
})
