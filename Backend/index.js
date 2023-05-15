const http = require("http");
const express = require("express");
const { urlencoded } = require("express");
const { Server } = require("socket.io");
const Blockchain = require("./BlockChain");
const Block = require("./Block");
const cors = require('cors')
const {blockmodel} = require('./models/blockModel')
const chainModel = require('./models/ChainModel')
const minerModel = require('./models/minerModel')
const mongoose = require('mongoose');
const ChainModel = require("./models/ChainModel");


const app = express();
app.use(urlencoded());
app.use(express.json());
app.use(cors())

const secretKey = "asjbksdasjdajdnkalj"

let chain = new Blockchain();


try {
    
  mongoose.connect('mongodb+srv://Shiva:Rgukt123@cluster0.juncu.mongodb.net/DPcontest?retryWrites=true&w=majority',{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      family:4
  },()=>{
      console.log("connected to db")
  })
} catch (error) {
  console.log(error)
}

let wait = 0;

app.get("/", (req, res) => {
  if (wait == 0) {
    wait++;
    runProcess();
  } else wait++;

  res.send("Refresh to generate a Random Block");
});


app.get('/recentblock',async(req,res)=>{
  try {
    let result = await blockmodel.find({}).sort({_id:-1}).limit(1);
    res.send(result[0])
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/chain',async(req,res)=>{
  try {
    let result = await chainModel.find({});
    res.send(result[0].chain)
  } catch (error) {
    res.send(error.message)
  }
})

app.post('/getMiners',async(req,res)=>{

    console.log(req.body)
    if(req.body.passKey==secretKey){
      try {
        let result = await minerModel.find({status:"none"});
        res.send(result)
      } catch (error) {
        res.send(error.message)
      }
    }
    else
    res.status(202).send("Please enter correct PassKey")
})

app.post('/approveminer',async(req,res)=>{
  try {
    let result = await minerModel.updateOne({email:req.body.email},{$set:{status:"approved"}})
    if(result.modifiedCount!=0)
    res.send("Successful")
    else
    throw new Error("Not modified")
  } catch (error) {
    res.status(202).send(error.message)
  }
})
app.post('/rejectminer',async(req,res)=>{
  try {
    await minerModel.updateOne({email:req.body.email},{$set:{status:"rejected"}})
    if(result.modifiedCount!=0)
    res.send("Successful")
    else
    throw new Error("Not modified")
  } catch (error) {
    res.status(202).send(error.message)
  }
})

app.post('/mineBlock',async(req,res)=>{
    try {
      await minerModel.updateOne({email:req.body.email},{$inc:{blocksMined:1}})
      if(result.modifiedCount!=0)
      res.send("Successful")
      else
      throw new Error("Not modified")
    } catch (error) {
      res.status(202).send(error.message)
    }
})
app.post('/registerMiner',async(req,res)=>{
    try {
      req.body.status="none"
      req.body.blocksMined=0
      let miner =await new minerModel(req.body)
      await miner.save()
      res.send("Registration successful")
    } catch (error) {
      res.status(202).send("Something went wrong")
    }
})

app.get('/creategenesisblock',async(req,res)=>{
  try{
    let newChain = ChainModel({chain:[new blockmodel({previousHash:"0",
      epoch_timeStamp : "123",
      data : "Genesis block",
      hash: "--",
      index: 1})]})

      await newChain.save();

      res.send("success")

  }
  catch(err){
    res.status(202).send("Something went wrong")
  }
})

app.post('/loginMiner',async(req,res)=>{
    try {
      console.log(req.body)
      let result1 = await minerModel.exists({email:req.body.email,password:req.body.password,status:"approved"})
      
      if(result1==null)
      throw new Error("Please Enter correct password/Get approved by admin")
      let result = await minerModel.findOne({email:req.body.email})
      console.log(result)
      res.send(result)
    } catch (error) {
      res.status(202).send(error.message)
    }
})

let miners = {};


const getIndex = async()=>{
  try {
    let result = await blockmodel.find({}).sort({_id:-1}).limit(1);
    return(result[0].index)
  } catch (error) {
    return 0
  }
}

const runProcess = () => {
  if (wait != 0) generateRandomTime();
  
};

const getRandomData = () => {
  return { data: 1000 * Math.random(), minedBy: "", timestamp: "" };
};


let leaderRecieved = false;

const server = http.createServer(app);

let io = new Server(server, {
  cors: {
    origin: "*",
  },
});


let serialNumber = 0
const generateRandomTime = () => {

  serialNumber++;
  leaderRecieved = false;
  io.emit('getTime')
  let sNo = serialNumber
  setTimeout(() => {


    if(serialNumber==sNo)
    {
      if(wait!=0){

        wait--
        runProcess()
      }
    }
  }, 35000);
};


io.on("connection", (socket) => {

  // will fire on Register event of client
  socket.on("register", (name) => {
    miners[socket.id] = name;
    console.log(miners);
  });

  socket.on("timeComplete", () => {


      if (!leaderRecieved) {

        io.emit('winner',socket.id)
        io.to(socket.id).emit(
          "getBlock",
          new Date().getTime(),
          getRandomData(),
          chain.getPreviousBlockHash()
        );
        leaderRecieved = true;
      }
  
  });



  socket.on("receiveBlock", async(timestamp, data, previousHash, hash) => {
    console.log("Block received")
    flag = 0;
    if (new Block(timestamp, data, previousHash,chain.chain.length).hash == hash) {
      // chain.chain.push(new Block(timestamp, data, previousHash,chain.chain.length, hash));

      try {

        let i = await getIndex()
        let newBlock = new blockmodel({previousHash:previousHash,timeStamp:timestamp,data:data,hash:hash,index:i+1})
        await newBlock.save()
        await chainModel.updateOne({_v:0},{$push:{chain:newBlock}}
        )
      } catch (error) {
        console.log(error)
      }


      // console.log(JSON.stringify(chain, null, 2));


      io.emit('getchain');
      socket.emit("successMine");
      if (wait != 0) {
        wait--;
      }
      runProcess();
    } else console.log("HASH REJECTED");
    io.emit("MiningComplete")
  });
});

server.listen(5000, () => {
  console.log("Server has started at port 5000");
});
