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




if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
