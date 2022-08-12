
/* Global Variables */
const key = "&appid=05e68af31fb04d9c82067738225847eb&units=metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let retrivedData;
// setting the generate button to a variable to listen to later
const generate = document.getElementById("generate");
// Create a new date instance dynamically with JS


let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();




// Functions

// This async function sends a GET request to the API
const getDataApi = async (baseUrl,key,zip)=>{
    let res = await fetch(baseUrl+zip+key);
    try{
    let givenData = await res.json();
    return givenData;
    }
    catch(error){
        console.log("error in getDataApi",error);
    }
   
}

// this async function sends a GET request to recieve the data stored in the projectData object
const getDataServer = async ()=>{
    let response = await fetch("http://localhost:5555/data");
    
    try{
    retrivedData = await response.json();
    // function updateUi called to update the UI with the new info recieved from both user and API
    updateUi(retrivedData);
    return retrivedData;

    }catch(error){
        console.log("error in getDataServer", error);
    }

}
// This async function sends a POST request to the server.js file to send it the data from the user and API
const postData = async ( url = "", data = {})=>{
    await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  
  });
}


    
// This is the update UI function to update the UI, it used the Id values previously set to the DOM elements

const updateUi = async (retrivedData)=>{
    document.getElementById("date").innerHTML = `Today is ${retrivedData.date}`;
    document.getElementById("temp").innerHTML = `The temperature is ${retrivedData.temp} Celsius`;
    document.getElementById("content").innerHTML= `And I feel: ${retrivedData.content}`;
};
// Event Listener to listen for Generate button

// This evenet listener listens for click event on the generate button, then it gets the value of the Zip code
// which is given bu user and feelings value to be used later in other functions

generate.addEventListener("click", ()=>{
    let zip = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;
    getDataApi(baseUrl,key,zip)
    .then((givenData)=>{
    postData("http://localhost:5555/dataSave", {temp: givenData.main.temp ,date: newDate, content: feelings});

    }).then(()=>{getDataServer();

    })
});

// It may seem wierd that i have the URL static like that, but i couldnt make it dynamic because i got the
// following error "GET https://api.openweathermap.org/data/2.5/weather?zip=&appid=05e68af31fb04d9c82067738225847eb 400 (Bad Request)"
// I think it has something to do with the Live server extension i use, because instead of fetching (http://localhost:5555/dataSave)
// When i set the url to ".dataSave" it fetchs this (http://127.0.0.1:5500/dataSave)




  