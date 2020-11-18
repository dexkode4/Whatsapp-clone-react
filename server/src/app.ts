import createError, {HttpError} from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
import { pusher } from './pusher';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/index';
import messageRouter from './routes/message';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

let app = express();


const db = mongoose.connection;


db.once('open', () => {
  console.log("DB connected");
  
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    if(change.operationType === 'insert'){
      const messageDetails = change.fullDocument;
      pusher.trigger('messages','inserted',{
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved
      });
    }
    else { 
      console.log('Error triggering Pusher');
      
    }
  })
  
})


// connect to database
mongoose.connect(process.env.CONNECTION_URL!, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("connected to mongodb"))
  .catch(error => console.log(error));

// middlewares
app.use(cors())
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request,res : Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
