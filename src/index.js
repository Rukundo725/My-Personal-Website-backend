import express from 'express';
import bodyParser from 'body-parser';
// import routes from './Routers/index'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 7000;

app.listen(port, ()=>{
    console.log('listening on port '+port);
})

// app.use('/', routes);


export default app;