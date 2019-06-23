module.exports = {
    healthCheck: async (req,res) => {
        try{
            let status = await SeqConn.authenticate();
            res.sendStatus(200);
            console.log("Connection has been established successfully");
        }catch(e){
            res.sendStatus(500);
            console.log("Could not connect to the DB: "+e);
        }
    },

    getCommandLists: async (req,res) => {
        try{
            let result = await Models.commandLists.findAll();
            res.send(result);
        }catch(e){
            res.sendStatus(500);
            console.log("Error with getCommandLists: "+e);
        }
    },

    addCommandList: async (req,res) => {
        try{
            let name = req.body.name;
            let commands = req.body.commands;
            if(name && commands && commands.length > 0){
                let response = await Models.commandLists.create({
                    name: name,
                    commands: commands
                });
                res.sendStatus(200);
            }else{
                res.sendStatus(500);
                console.log("Expected parameters not recieved.");
            }
        }catch(e){
            res.sendStatus(500);
            console.log("Error with addCommandList: "+e);
        }
    }
}