﻿//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
//nlp = window.nlp_compromise;
var city;
var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Narada Muni', //name of the chatbot
  userName = 'Me',
  talking = true; //when false the speach function doesn't work
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************




function newsCall()
{
console.log('it works!!')
  var reqNews = $.ajax({

        type:'GET',
        url:'/articles',
    })
        .done(function(response){
            if (response){
              //  alert(JSON.stringify(response))
              //  var final_output=JSON.stringify(response)
                var output = "Todays Hot News Are " + response.data
             //   var output2 = "Tempature of your city is " + JSON.stringify(response.data/10);
              return output;
            }
            else{
              return("error");
            }
        })
 }


function tempCall(city)
{
console.log('it works!!')
    $.ajax({
        data:{
            cityName:city
        },
        async: false,
        type:'POST',
        url:'/temperature',
    })
        .done(function(response){
            if (response){
              //  alert(JSON.stringify(response))
              //  var final_output=JSON.stringify(response)
                var output = "Tempature of "+  city +" is " + response.data/10 + "° celsius"
             //   var output2 = "Tempature of your city is " + JSON.stringify(response.data/10);
              return output;
            }
            else{
              return("error");
            }
        })
  }


  function shortAnswers(ques)
{
console.log('it works!!')
    $.ajax({
        data:{
            question:ques
        },
        async: false,
        type:'POST',
        url:'/v1',
    })
        .done(function(response){
            if (response){
              //  alert(JSON.stringify(response))
              //  var final_output=JSON.stringify(response)
                var output = "Your answer is:"+ response.data"
             //   var output2 = "Tempature of your city is " + JSON.stringify(response.data/10);
              return output;
            }
            else{
              return("error");
            }
        })
  }

  function riveCall(input)
  {
  console.log('rives works!!')
      var reqRive = $.ajax({
          data:{
              From:"Avdhesh",
              Body:input
          },
          type:'POST',
          url:'/rive',
      })
          .done(function(response){
              if (response){
                //  alert(JSON.stringify(response))
                //  var final_output=JSON.stringify(response)
                  var output =  response
               //   var output2 = "Tempature of your city is " + JSON.stringify(response.data/10);
                return output;
              }
              else{
                return("error");
              }
          })
    }


//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  botMessage = "I'm confused"; //the default message

  if (lastUserMessage === 'hi') {
    botMessage = 'Howdy!';
  }
  else if (lastUserMessage === 'name') {
      botMessage = 'My name is ' + botName;
  }
  else if (lastUserMessage === 'news') {
    reqNews.then(success);
    var success = function(){

      var replyFromRive = newsCall();
      botMessage  = replyFromRive;
      console.log("from success "+ botMessage );
    }
    console.log("outside success "+ botMessage );

  }
  // else {
  //    city = lastUserMessage;
  //
  //       var replyFromWeatherAPI = tempCall(city);
  //       $( document ).ajaxStop(function() {
  //       botMessage  = replyFromWeatherAPI;
  //       });
  //
  //   }
  else {

      reqRive.then(function(){
        var replyFromRive = riveCall(lastUserMessage);
        botMessage  = replyFromRive;
        console.log("from then "+ botMessage );
      });


      console.log(replyFromRive);
  }

  }

//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push("<b>" + userName + "</b>" + lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
  //  Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech

//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
// function Speech(say) {
//   if ('speechSynthesis' in window && talking) {
//     var utterance = new SpeechSynthesisUtterance(say);
//     //msg.voice = voices[10]; // Note: some voices don't support altering params
//     //msg.voiceURI = 'native';
//     //utterance.volume = 1; // 0 to 1
//     //utterance.rate = 0.1; // 0.1 to 10
//     //utterance.pitch = 1; //0 to 2
//     //utterance.text = 'Hello World';
//     //utterance.lang = 'en-US';
//     speechSynthesis.speak(utterance);
//   }
// }

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it

// ###################################################################################
// ######################  WHETHER API HIT JS CODE START #############################
// ###################################################################################
