

lastUserMessage = ""
botMessage = ""
dialog = ""
//-----The Core Code------


//-------
 function mainroutine() {
 lastUserMessage = document.mainscreen.BasicTextArea4.value;
 dialog = dialog + "User: " + lastUserMessage +  '\r' + "\n";
  chatbotResponse();
 dialog = dialog  +  '\r' + "\n";
  updatescreen()

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

      var replyFromRive = newsCall();
      botMessage  = replyFromRive;

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

        var replyFromRive = riveCall(lastUserMessage);
        botMessage  = replyFromRive;

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
