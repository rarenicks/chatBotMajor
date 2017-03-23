from flask import Flask, jsonify
from flask import render_template,request
from os import environ
import requests
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

