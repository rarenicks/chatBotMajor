

lastUserMessage = ""
botMessage = ""
dialog = ""
//-----The Core Code------


function newsCall()
{
console.log('it works!!')
  $.ajax({

        type:'GET',
        url:'/articles',
    })
        .done(function(response){
            if (response){
              //  alert(JSON.stringify(response))
              //  var final_output=JSON.stringify(response)
                var output = "Todays Hot News Are " + response.data
             //   var output2 = "Tempature of your city is " + JSON.stringify(response.data/10);
               
                botMessage = output;
                dialog = dialog + "Narada Muni : " + botMessage +  '\r' + "\n";
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
                var output = "Your answer is:"+ response.data
             //   var output2 = "Tempature of your city is " + JSON.stringify(r
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
       $.ajax({
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
                  botMessage = output;
                  dialog = dialog + "Narada Muni : " + botMessage +  '\r' + "\n";
                  return output;
              }
              else{
                return("error");
              }
          })
    }



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
