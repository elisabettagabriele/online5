"use strict";
(function() {
    
    window.onload = function() {
        var person = $("picture");
        var username = $("name");
        var textField = $("comment");
        
       // setInterval(refreshMessages, 5000);  
        refreshMessages();
        person.onclick = sendMessage;
        
        var info = $("info1");
        info.onmouseover = (function(){
            info.innerHTML = "Silent: Teacher reads q/com aloud. Aloud: Student reads q/com aloud.";
           
            
          
            
        })
        info.onmouseout = (function(){
            
          
          
         $("info").style.backgroundImage = "url('imagesf/info.svg')";
            
          
            
        })
        
      
        checkReady();
        
        //everytime you edit namefield call checkReady
        username.oninput = checkReady;
        
        person.onclick = function() {
            if (!checkReady()) {
                console.log("username empty");
                //Do not allow post if username is empty
            } else {
                addToQueue();
                textField.value = "";
            }
        }
       
    }
    
     function checkStatus(response) {  
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
    
    
         
    function refreshMessages(){
        let url = "http://localhost/Final-WebProgramming-Project-LycheeJuice-patch-1/finalServer.php";
        fetch(url, {method: "GET", mode: 'no-cors'})   
        
        .then(checkStatus)
        .then(function(responseText){
              document.getElementById("queue").innerHTML = responseText;
              })
        
        .catch(function(error){
            alert(error);
        })  
        //use dom to get input
        
            
    }
    
    function sendMessage(){
        let url = "http://localhost/Final-WebProgramming-Project-LycheeJuice-patch-1/finalServer.php";
        let string = $("queue").innerHTML;
        let myJSON = JSON.stringify({string});
        let data =  new FormData();
        data.append("data",myJSON);
        var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
        xhr.open( 'post', url, true );
        xhr.send(data);
  	}
        
        
    
    //check if conditions are met to post into queue
    //TODO: turn this into a php form validation that returns either true or false
    function checkReady() {
        if ($("name").value == "") {
            $("picture").style.borderColor = "red";
            return false;
        } else {
             $("picture").style.borderColor = "green";
            return true;
        }
    }
   
    //add image 
    function addToQueue() {
        //get stuff
        let container = $("queue");
        let choice = document.querySelector(".switch input").checked;
        let newEntry = document.createElement("div");
        let newEntryText = document.createElement("p")
        let question = $("comment").value;
        
        //set class
        newEntry.className = "personInQueue";
        //fill with name of user
        newEntryText.classList.add("text");
        newEntryText.appendChild(document.createTextNode($("name").value));
        newEntry.appendChild(newEntryText);
        
        //create image, set image source (can be changed to whatever). Set class too
        let newImg = document.createElement("img");
        newImg.src = "person.png";
        newImg.alt = "student picture";
        newImg.className = "image";
    
        //add image to it;
        newEntry.appendChild(newImg);
        
        //add text from textfield to questionfield
        document.querySelector("#question p").innerHTML = question;
        
        //add new entry based on option selected
        if (choice == true) {
            console.log("aloud set");
            container.appendChild(newEntry);
            sendMessage();
            
        
        } else {
            console.log("silent set");
            newEntry.classList.add("silent");
            container.appendChild(newEntry);
            sendMessage();
        }
        
    }
    
    /*TODO
        take the text from textfield and push the contents into an array in PHP.
        Everytime the teacher client clicks on the image of someone in the queue, load next content of array into question container.
        
        Take contents of container and push all to php
        
        update container constantly based on php data.
    
    */
    
    
    
    //jquery hack
    function $(elementID) {
        return document.getElementById(elementID);
    }

})();