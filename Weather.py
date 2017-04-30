from flask import Flask, jsonify
from flask import render_template,request
import os
import requests
from rivescript import RiveScript



bot = RiveScript()
bot.load_directory(
    os.path.join(os.path.dirname(__file__), "brain")
)
bot.sort_replies()

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/codepen')
def codepen():
    return render_template('codepen.html')


@app.route('/temperature',methods=['POST'])
def temperature():


    cityName=request.form['cityName']
    getRequests=requests.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName+',uk&appid=59026d61966be7eab971e0e48eb22bbc')
    print(getRequests.text)
    #print(cityName)
    jsonObject=getRequests.text
    #return jsonObject
    json_Parser=getRequests.json()
    temperature_only=json_Parser['main']['temp']
    #temp_data={"inputValue":request.args.get('temperature')}
    #print(json_Parser)
    return jsonify({'data':temperature_only})

@app.route('/v1',methods=['POST'])
def shortAnswers():


    question=request.form['question']
    WOLF_URL = "http://api.wolframalpha.com/v1/"
    SHORT_ANS_URL = WOLF_URL + "result?i=question%3F&appid={}".format(wolfram_api_key)

    response = requests.get(SHORT_ANS_URL)
    answer=response.text
    return jsonify({'data':answer})



@app.route("/rive", methods=["GET", "POST"])
def hello_rivescript():
    """Receive an inbound SMS and send a reply from RiveScript."""

    from_number = request.values.get("From", "unknown")
    message     = request.values.get("Body")
    reply       = "(Internal error)"

    # Get a reply from RiveScript.
    if message:
        reply = bot.reply(from_number, message)

    # Send the response.
#    resp = twilio.twiml.Response()
#    resp.message(reply)
    return str(reply)

@app.route('/articles',methods=['POST'])
def news():
    cityName=request.form['articlesName']
    getRequests = requests.get("https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=latest&apiKey=90b5a2960a63444da339b3cd7a1327d9")
    print(getRequests.text)
    #print(cityName)
    jsonObject=getRequests.text
    #return jsonObject
    ans = getRequests.json()
    result = ans['articles']
    for i in range(5):
        msg = msg + (result[i]['description'])
        msg = msg + '\n'
    #print(json_Parser)
    return jsonify({'data':msg})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
