import "../App.css";
import { socket } from "../methods/Socket";
import { useState, useEffect } from "react";
import sha256 from "sha256";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCountdown } from "react-countdown-circle-timer";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { io } from "socket.io-client";
import { Button } from "@mui/material";

function Main({ notify,data,setdata }) {
  
  const [recentblock, setRecentBlock] = useState(null);
  const [keys, setKeys] = useState(null);
  const [time, setTime] = useState(0);
  const [chain, setChain] = useState([0]);
  const [winner, setWinner] = useState("");
  const [data1, setData1] = useState({});
  const [data3, setData3] = useState({});
  const [isDisabled,setIsDisabled] = useState(true)


  const scrollToEle = (ele) => {
    let elem = document.getElementById(ele);
    if (elem) elem.scrollIntoView();
  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: 150,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  console.log(chain);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    getRecentBlock();
    getGenesisBlock();
  }, []);
  useEffect(() => {
    if (recentblock != null) setKeys(Object.keys(recentblock));
  }, [recentblock]);

  const getRecentBlock = async () => {
    try {
      let res = await axios.get("https://proof-of-elapsed-time.vercel.app/recentblock");
      setRecentBlock(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGenesisBlock = async () => {
    try {
      let res = await axios.get("https://proof-of-elapsed-time.vercel.app/chain");
      setChain(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getName = () => {
    let name = document.getElementById("name").value;
    setdata({ name: name, blocks: 0 });
    socket.emit("register", name);
  };

  socket.on("generateTime", (cb) => {
    cb(6);
  });

  socket.off("getTime").on("getTime", () => {
    let time = Math.ceil(21 * Math.random()+10);
    setTime(time);
    isDisabled(true)
  });

  socket.off("getBlock").on("getBlock", (timestamp, data2, previousHash) => {
    data2.minedBy = data.name;
    data2.timestamp = new Date();

    let t = {};
    t.timestamp = timestamp;
    t.previousHash = previousHash;
    setData3(t);

    console.log(timestamp, data2, previousHash);
    setData1(data2);
  });

  socket.off("successMine").on("successMine", async() => {
    setdata({ ...data, blocksMined: data.blocksMined+1 });
    try {
      
      await axios.post('https://proof-of-elapsed-time.vercel.app/mineblock',{email:data.email})
      
    } catch (error) {
      console.log(error)
    }
  });
  socket.off("getchain").on("getchain", (chain) => {
    getGenesisBlock();
    getRecentBlock();
  });

  socket.off("winner").on("winner", (winner1) => {
    if (socket.id == winner1){
      setWinner(data.name)
      notify("Congrats, you are the winner! Please mine the block", "success");
    }
    else {
      notify("Sorry, Better luck next time", "error");
      setWinner(winner1)
    }
  });

  socket.off("MiningComplete").on("MiningComplete", () => {
      console.log("minig complete")
      isDisabled(true)
  })

  const createBlock = () => {
    if (winner == data.name) {
      socket.emit(
        "receiveBlock",
        data3.timestamp,
        data1,
        data3.previousHash,
        sha256(data3.previousHash + data3.timestamp + JSON.stringify(data1))
      );
      setIsDisabled(true)
      notify("Successfully mined Block","success")
    }
    else
    notify("You are not allowed to mine! as you are not the winner..")
  };

  if(data==null)
  return <h2 style={{marginTop:"80px"}}>Please Login!</h2>

  return (
    <div className="App">
      <div className="big-container">
        <div className="Container">
          <div className="heading">Implementation of POET</div>
          

          <div className="data-timer">
            {data != null ? (
              <div className="card">
                <h4>
                  <b>{data.name}</b>
                </h4>
                <h6>Blocks Mined :{data.blocksMined}</h6>
              </div>
            ) : (
              ""
            )}

            <svg className="svg">
              <defs>
                <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="5%" stopColor="#42cef5" />
                  <stop offset="95%" stopColor="#42f551" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{display:"flex",flexDirection:"column"}}>
              <CountdownCircleTimer
                isPlaying
                key={time}
                colors="url(#your-unique-id)"
                duration={time}
                onComplete={() => {
                  socket.emit("timeComplete");
                  setTime(0);
                  setIsDisabled(false)
                }}
              >
                {({ remainingTime }) => {
                  if (remainingTime == 0) return <b>Timer</b>;
                  return <div className="time">{remainingTime}</div>;
                }}
              </CountdownCircleTimer>
              <Button variant="contained" color="primary" disabled={isDisabled} sx={{marginTop:"25px"}} onClick={createBlock}>
                Create block
              </Button>
            </div>
          </div>
        </div>

        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="heading" style={{width:"100%",textAlign:"initial",marginLeft:"101px"}}>
            Most Recent Block {`(${chain.length - 1})`}
          <Button variant="contained" color="secondary" sx={{float:"right",marginRight:"85px"}} onClick={e=>scrollToEle("chain")}>Show Chain</Button>
          </div>
          <TableContainer
            component={Paper}
            sx={{
              width: "60vw",
              marginLeft: "0px",
              marginBottom: "30px",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {keys?.map((key, index) => {
                  return typeof recentblock[key] != "object" ? (
                    <StyledTableRow>
                      <TableHead>
                        {" "}
                        <StyledTableCell component="th" scope="row">
                          {key}
                        </StyledTableCell>
                      </TableHead>
                      <StyledTableCell align="right">
                        {recentblock[key]}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    <>
                      <StyledTableRow>
                        <TableHead>
                          {" "}
                          <StyledTableCell component="th" scope="row">
                            {"data"}
                          </StyledTableCell>
                        </TableHead>
                        <StyledTableCell align="right">
                          {recentblock[key].data}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <TableHead>
                          {" "}
                          <StyledTableCell component="th" scope="row">
                            {"minedBy"}
                          </StyledTableCell>
                        </TableHead>
                        <StyledTableCell align="right">
                          {recentblock[key].minedBy}
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <TableHead>
                          {" "}
                          <StyledTableCell component="th" scope="row">
                            {"timeStamp"}
                          </StyledTableCell>
                        </TableHead>
                        <StyledTableCell align="right">
                          {recentblock[key].timestamp}
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <div id="chain">
          <div className="heading">Blockchain</div>
          {chain?.map((block, ind) => {
            return (
              <>
                {" "}
                <TableContainer
                  component={Paper}
                  sx={{
                    width: "60vw",
                    marginLeft: "0px",
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                      {keys?.map((key, index) => {
                        return typeof block[key] != "object" ? (
                          <StyledTableRow>
                            <TableHead>
                              {" "}
                              <StyledTableCell component="th" scope="row">
                                {key}
                              </StyledTableCell>
                            </TableHead>
                            <StyledTableCell align="right">
                              {block[key]}
                            </StyledTableCell>
                          </StyledTableRow>
                        ) : (
                          <>
                            <StyledTableRow>
                              <TableHead>
                                {" "}
                                <StyledTableCell component="th" scope="row">
                                  {"data"}
                                </StyledTableCell>
                              </TableHead>
                              <StyledTableCell align="right">
                                {block[key].data}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <TableHead>
                                {" "}
                                <StyledTableCell component="th" scope="row">
                                  {"minedBy"}
                                </StyledTableCell>
                              </TableHead>
                              <StyledTableCell align="right">
                                {block[key].minedBy}
                              </StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                              <TableHead>
                                {" "}
                                <StyledTableCell component="th" scope="row">
                                  {"timeStamp"}
                                </StyledTableCell>
                              </TableHead>
                              <StyledTableCell align="right">
                                {block[key].timestamp}
                              </StyledTableCell>
                            </StyledTableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {ind != chain.length - 1 ? <ArrowCircleDownIcon /> : ""}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
