

lastUserMessage = ""
botMessage = ""
dialog = ""
//-----The Core Code------


//-------
 function mainroutine() {
 lastUserMessage = document.mainscreen.BasicTextArea4.value;
 dialog = dialog + "User: " + lastUserMessage +  '\r' + "\n";
  chatbotResponse();
  setTimeout(function () {
  dialog = dialog  +  '\r' + "\n";
  updatescreen()
},1000);

}

//-------
function chatbotResponse() {
  if (lastUserMessage === 'hi') {
    botMessage = 'Howdy!';
  }
  else if (lastUserMessage === 'name') {
      botMessage = 'My name is ' + botName;
  }
  else if (lastUserMessage === 'news') {

      setTimeout(function () {
      var replyFromRive = newsCall();
      botMessage  = replyFromRive;
    }, 1000);

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
    setTimeout(function () {
    var replyFromRive = riveCall(lastUserMessage);
    botMessage  = replyFromRive;
    }, 1000);


  }
      dialog = dialog + "Narada Muni : " + botMessage +  '\r' + "\n";
      break;
}

function initScreen() {
 updatescreen()
}

//-------
function updatescreen() {
 document.mainscreen.BasicTextArea1.value = dialog
 document.mainscreen.BasicTextArea2.value = botMessage
 document.mainscreen.BasicTextArea3.value = lastUserMessage
 document.mainscreen.BasicTextArea4.value = ""
}
