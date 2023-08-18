import express from "express";
import path from 'path'
import cookieSession from "cookie-session";
import { errorHandler } from "@portail_entreprise/common";
import { NotFoundError } from "@portail_entreprise/common";
import { start } from "./config/config";
import "express-async-errors";
import { authRouter } from "./Routes/auth";
import { profileRouter } from "./Routes/profile";
import { workspaceRouter } from "./Routes/workspace";
import { TaskPropositionRouter } from "./Routes/taskProposition";
import { taskRouter } from "./Routes/task";
import { clientRouter } from "./Routes/client";
import { listRouter } from "./Routes/TrelloBoardLists";
import { categoryRouter } from "./Routes/category";
import { projectRouter } from "./Routes/project";
import { boardRouter } from "./Routes/TrelloBoard";
import { openaiRouter } from "./Routes/openAi";
require('dotenv').config();
//configuration
const app = express();
const server = require('http').createServer(app)

const io = require('socket.io')(server, {
  cors: {origin : '*'}
});

const cors=require("cors");

app.use(
  cookieSession({
    signed: false,
    //secure:true
  })
);

//app.use(cookieParser());
//app.use(csrf({ ignoreMethods: [] }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers
  next(); // Pass control to the next middleware
});
app.use(cors({
  origin: ['http://localhost:4200','http://localhost:41439','http://localhost:40531/', 'http://localhost:35363/','http://localhost:46803/'],
  credentials: true
}));

app.use(express.json());


//Routing  

app.use("/api/users", authRouter);
app.use("/api/users/profile", profileRouter);
app.use("/api/workspace",workspaceRouter)
app.use("/api/workspace/task",taskRouter)
app.use("/api/workspace/taskProposition",TaskPropositionRouter)
app.use("/api/workspace/taskProposition",TaskPropositionRouter)
app.use("/api/workspace/project",projectRouter)

app.use("/api/admin/category",categoryRouter)
app.use("/api/admin/client",clientRouter)
app.use("/api/admin/trelloList",listRouter)

app.use("/api/admin/category",categoryRouter)
app.use("/api/admin/client",clientRouter)
app.use("/api/admin/trelloList",listRouter)
app.use("/api/admin/category",categoryRouter)
app.use("/api/admin/client",clientRouter)
app.use("/api/admin/trelloList",listRouter)
app.use("/api/trello/Board",boardRouter)
app.use('/api/uploads/users', express.static(path.join(__dirname, 'uploads', 'profile_images')));
app.use('/api/uploads/excels', express.static(path.join(__dirname, 'uploads', 'excels')));
app.use('/api/openai', openaiRouter);

app.post('/api/send-notification', (req, res) => {
  console.log(req.body)
  const notify = {data: req.body};
  io.emit('notification', notify); // Updates Live Notification
  res.send(notify);
});



app.all("*", async () => { throw new NotFoundError("URL");});
app.use(errorHandler);
//Database
start();

io.on('connection', (socket:any) => {
  console.log('a user connected');

  socket.on('message', (message:any) => {
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });
  socket.on("send-notification",(data:any, cb:any) => {
    const dataToSend={
      message : `a new proposition ${data.data.title} has been added , you need to validate it `,
      PropositionId:data.data.id
    }
    //io.to(data.reciever).emit('newNotification', dataToSend)
    io.emit('newNotification', dataToSend)
    
    cb()
  })

    socket.on('joinNotifications', (params:any, cb:any) => {
      console.log("params.sender socket:",params.sender)
      socket.join(params.sender)
      cb()
    })



  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

});






//Server
const PORT = 4000;
server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});




function csrf(arg0: { ignoreMethods: never[]; }): any {
  throw new Error("Function not implemented.");
}

