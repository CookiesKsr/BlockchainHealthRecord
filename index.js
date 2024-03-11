// require('dotenv').config();
// const express = require('express');
// const app = express();
// const fileUpload = require('express-fileupload');
// app.use(
//     fileUpload({
//         extended:true
//     })
// )
// app.use(express.static(__dirname));
// app.use(express.json());
// const path = require("path");
// const ethers = require('ethers');

// var port = 3000;

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// })

// app.get("/index.html", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// })


// const API_URL = process.env.API_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// const {abi} = require('./artifacts/contracts/TaskToDo.sol/TaskToDo.json');
// const provider = new ethers.providers.JsonRpcProvider(API_URL);

// const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);


// app.post("/addTask", async (req, res) => {
//     var task = req.body.task;
//     console.log(task)
//     async function storeDataInBlockchain(task) {
//         console.log("Adding the task in the blockchain network...");
//         const tx = await contractInstance.addTask(task);
//         await tx.wait();
//     }

//     await storeDataInBlockchain(task);
//     res.send("The task has been registered in the smart contract");
// });


// app.post("/changeStatus", async (req, res) => {
//     var id = req.body.id;

//     async function storeDataInBlockchain(id) {
//         console.log("Changing the task status...");
//         const tx = await contractInstance.markAsFinished(id);
//         await tx.wait();
//     }

//     await storeDataInBlockchain(id);
//     res.send("The task status has been changed in the smart contract");
// });


// app.listen(port, function () {
//     console.log("App is listening on port 3000")
// });


require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require("path");
const ethers = require('ethers');

app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.use(
    fileUpload({
        createParentPath: true,
        limits: { fileSize: 5 * 1024 * 1024 }, // Example limit: 5MB
    })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tasklist.html", (req, res) => {
    res.sendFile(path.join(__dirname, "tasklist.html"));
});

app.get("/markTask.html", (req, res) => {
    res.sendFile(path.join(__dirname, "markTask.html"));
});

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { abi } = require('./artifacts/contracts/TaskToDo.sol/TaskToDo.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

// app.get('/', (req, res) => {
//     const name = req.query.name;
//     const email = req.query.email;
    
//     // Do something with the received data (e.g., log it)
//     console.log(`Received data: Name - ${name}, Email - ${email}`);

//     // Respond with a confirmation message
//     res.send(`Data received successfully! Name: ${name}, Email: ${email}`);
// });

// app.get('/submit', (req, res) => {
//     const name = req.query.name;
//     const email = req.query.email;
    
//     // Do something with the received data (e.g., log it)
//     console.log(`Received data: Name - ${name}, Email - ${email}`);

//     // Respond with a confirmation message
//     res.send(`Data received successfully! Name: ${name}, Email: ${email}`);
// });

// app.post("/addTask", async (req, res) => {
//     const { task } = req.body;
//     console.log(task);
//     try {
//         console.log("Adding the task in the blockchain network...");
//         const tx = await contractInstance.addTask(task);
//         await tx.wait();
//         res.send("The task has been registered in the smart contract");
//     } catch (error) {
//         console.error("Error adding task to the blockchain:", error);
//         res.status(500).send("Error adding task to the blockchain");
//     }
// });

app.post("/addTask", async (req, res) => {
    var task = req.body.task;
    console.log(task)
    async function storeDataInBlockchain(task) {
        console.log("Adding the task in the blockchain network...");
        const tx = await contractInstance.addTask(task);
        await tx.wait();
    }

    await storeDataInBlockchain(task);
    res.send("The task has been registered in the smart contract");
});

app.post("/changeStatus", async (req, res) => {
    const { id } = req.body;
    try {
        console.log("Changing the task status...");
        const tx = await contractInstance.markAsFinished(id);
        await tx.wait();
        res.send("The task status has been changed in the smart contract");
    } catch (error) {
        console.error("Error changing task status:", error);
        res.status(500).send("Error changing task status");
    }
});

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});
