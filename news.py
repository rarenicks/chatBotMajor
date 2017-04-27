
import requests
response=requests.get("https://newsapi.org/v1/articles?source=techcrunch&apiKey=90b5a2960a63444da339b3cd7a1327d9")
ans=response.json()
print(ans['articles'])


