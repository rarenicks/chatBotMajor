

lastUserMessage = ""
botMessage = ""
dialog = ""
//-----The Core Code------

function checkToken(result)
 {
	 tempResult = result;
	 
	 if(result.includes("?"))
	 {
	  $.ajax({
        data:{
            question:result
        },
        type:'POST',
        url:'/v1'
	  })
        .done(function(response){
            if (response){
              //  alert(JSON.stringify(response))
              //  var final_output=JSON.stringify(response)
          //      var output = "Your answer is:"+ response.data
		 botMessage = response
          	 console.log(botMessage)
		 var out = "" + botMessage.data 
	    	 console.log(out)
		     
	 	  document.mainscreen.BasicTextArea4.value = ""
		  dialog = dialog + "Narada Muni : " + out +  '\r' + "\n";
		  dialog = dialog  +  '\r' + "\n";
		 document.mainscreen.BasicTextArea4.value = ""
		updatescreen() 
            }
            else{
              return("error");
            }
        })
	
}
	 
	 else if(result.includes("Temperature") || result.includes("temperature") || result.includes("Weather") || result.includes("weather"))
	 {
		 var splitter=result.split(" ")

		 var cityArr =splitter.splice(-1);
		 var city = cityArr[0];
		 //hit temperature api

		 console.log('in temp!!')
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
                var output = "Temperature of given city is " + response.data/10 + "° celsius"
             //   var output2 = "Tempature of your city is " + JSON.stringify(response.data/10);
		
                botMessage = output;
		    
	 	document.mainscreen.BasicTextArea4.value = ""
                dialog = dialog + "Narada Muni : " + botMessage +  '\r' + "\n";
		     dialog = dialog  +  '\r' + "\n";
		 document.mainscreen.BasicTextArea4.value = ""
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
		 //hit news api
		 console.log('it works!!')
		$.ajax({

        type:'GET',
        url:'/articles',
    })
        .done(function(response){
            if (response){
		    console.log(response)
		    console.log(response.data)
		    var out = "" + response.data 	    
		    console.log(out)
		    
                botMessage = out ;
		    
	 	document.mainscreen.BasicTextArea4.value = ""
                dialog = dialog + "Narada Muni : " + botMessage +  '\r' + "\n";
		     dialog = dialog  +  '\r' + "\n";
	 	document.mainscreen.BasicTextArea4.value = ""
     		updatescreen()
		    //              return out;
            }
            else{
              return("error");
            }
        })

	 }
	 else{

	 //hit rive script

		 riveCall(tempResult);
		 

	 }
 }

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
                 dialog = dialog  +  '\r' + "\n";
		  document.mainscreen.BasicTextArea4.value = ""
                 updatescreen()

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
                  dialog = dialog  +  '\r' + "\n";
                  updatescreen()

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
 clearScreen()
 chatbotResponse();

}

//-------
function chatbotResponse() {
  checkToken(lastUserMessage)
  }
  

function clearScreen() {
	document.mainscreen.BasicTextArea4.value = ""
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
