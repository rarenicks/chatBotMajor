from secrets import wolfram_api_key
from dbHelper impoer DBHelper

db = DBHelper() 

WOLF_URL = "http://api.wolframalpha.com/v2/"

SHORT_ANS_URL = WOLF_URL + "result?appid={}".format(wolfram_api_key)
SIMPLE_ANS_URL = WOLF_URL + "simple?appid={}".format(wolfram_api_key)




def main():
    db.setup()  
   
      

if __name__ == '__main__':
    main()
