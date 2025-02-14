import json
import requests

post_request = {
    "name": "Vasya Pupkin",
    "number": "123-45678",
}

#r = requests.post('http://localhost:3001/api/persons', json=post_request, headers={'Accept': "application/json"})
r = requests.get('http://localhost:3001/api/persons')

print(r)
#print(r.json())
