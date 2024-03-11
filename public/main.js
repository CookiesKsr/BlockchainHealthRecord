//this file is used for connecting frontend with meta mask

let WALLET_CONNECTED = "0x8d25c6bee394ab4fec7e120ce93cfcfad3a40529";
let contractAddress = "0x13Ea3a4C84A233c84E4792AD368fD63a33b144a2";
let contractAbi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_desc",
              "type": "string"
            }
          ],
          "name": "addTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllTasks",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "desc",
                  "type": "string"
                },
                {
                  "internalType": "enum TaskToDo.TaskStatus",
                  "name": "status",
                  "type": "uint8"
                }
              ],
              "internalType": "struct TaskToDo.Task[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "getTask",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "enum TaskToDo.TaskStatus",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTaskCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "markAsFinished",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "tasks",
          "outputs": [
            {
              "internalType": "string",
              "name": "desc",
              "type": "string"
            },
            {
              "internalType": "enum TaskToDo.TaskStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
         
          "stateMutability": "view", // or "pure" if it's a pure function
  "type": "function" // or "view" if it's a view function

        }
    ];

const connectMetamask = async() => {
  console.log("Click ho gya bhai mai!!")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();  //array of several parameters
    WALLET_CONNECTED = await signer.getAddress();
    var element = document.getElementById("metamasknotification");
    element.innerHTML = "Metamask is connected " + WALLET_CONNECTED;
};

const getAllTasks = async () => {
  if (WALLET_CONNECTED !== 0) {
    var p3 = document.getElementById("p3");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      p3.innerHTML = "Please wait, getting all the tasks from the smart contract";
      var tasks = await contractInstance.getAllTasks();
      // console.log(tasks);

      var table = document.getElementById("myTable");

      for(let i =0; i<tasks.length ; i++)
      {
          var row = table.insertRow();
          var idCell = row.insertCell();
          var descCell = row.insertCell();
          var  statusCell = row.insertCell();

          const status = tasks[i].status == 0 ? "Pending" : "Finished";

          idCell.innerHTML = i;
          descCell.innerHTML = tasks[i].desc;
          statusCell.innerHTML = status;

      }
    
      p3.innerHTML = "the tasks are updated";

      // Handle tasks data
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      // Handle error
    }
  } else {
    var p3 = document.getElementById("p3");
    p3.innerHTML = "Please connect metamask first";
  }
}

