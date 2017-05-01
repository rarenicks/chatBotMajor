

lastUserMessage = ""
botMessage = ""
dialog = ""
//-----The Core Code------


  function checkToken(result)
  {
 	 tempResult = result ;
  
   var splitter=result.split(" ");
 	 if(result.includes("Temperature") || result.includes("temperature") || result.includes("Weather") || result.includes("weather"))
 	 {

 		 var city=splitter.splice(-1);
// 		 alert(city)

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
             botMessage = output;
             dialog = dialog + "Narada Muni : " + botMessage +  '\r' + "\n";
             dialog = dialog  +  '\r' + "\n";
             updatescreen()

              return output;
            }
            else{
              return("error");
            }
        })

}

else if(result.includes("News") || result.includes("news"))
{

  console.log('news works!!')
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
                   dialog = dialog  +  '\r' + "\n";
                   updatescreen()

                return output;
              }
              else{
                return("error");
              }
          })


}
  else {
  console.log('rives works!!')
       $.ajax({
          data:{
              From:"Avdhesh",
              Body:tempResult
          }
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
                  dialog = dialog  +  '\r' + "\n";
                  updatescreen()

//                  return output;
              }
              else{
                return("error");
              }
          })
    }


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


//-------
 function mainroutine() {
 lastUserMessage = document.mainscreen.BasicTextArea4.value;
 dialog = dialog + "User: " + lastUserMessage +  '\r' + "\n";
 chatbotResponse();

}

//-------
function chatbotResponse() {
  if (lastUserMessage === 'hi') {
    botMessage = 'Howdy!';
  }
  else{
      checkToken(lastUserMessage);
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
