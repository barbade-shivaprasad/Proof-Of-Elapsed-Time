const {v4:uuid} = require('uuid')

class Services{
    static temp = (req,res)=>{

        res.send("Working!!");
    }

    static runProcess = () => {
        if (wait != 0) generateRandomTime();
      };

    static generateRandomTime = () => {

        serialNumber++;
        leaderRecieved = false;
        io.emit('getTime')
        startTime = new Date().getSeconds();
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
}


module.exports = Services;