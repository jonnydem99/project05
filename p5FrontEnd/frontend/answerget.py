from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
import json
import requests
from ast import literal_eval
from django.http import JsonResponse

def answergett(request):
    api_request = requests.get("http://localhost:3000/answers/")
    print('api_request='+str(api_request))
    q = literal_eval(api_request.content.decode('utf8'))
    print('q=', q, type(q))
    print(q['data'])
    json_obj = json.dumps(q['data'])
    print('json_obj=', json_obj, type(json_obj))
    api_i = json.loads(json_obj)
    print('API_I = ' + str(api_i))
    return {'api_i': api_i}

    '''def answergett(request):
    api_request = requests.get("http://localhost:3000/answers/")
    if api_request.status_code == 200:
        answ = json.dumps((api_request.json()))
        print('answer answ= ' + answ)
        return {'answ': answ}
        #return render(request, 'frontend/test.html', {'data': data})'''

'''
def answergett(request):
    if request.method == 'GET':
        api_requestt = requests.get("http://localhost:3000/answers/")
        try:
            print('api_requestt='+str(api_requestt))
            z = literal_eval(api_requestt.content.decode('utf8'))
            print('z=', z, type(z))
            print(z['data'])
            json_objj = json.dumps(z['data'])
            print('json_objj=', json_objj, type(json_objj))

            apii = json.loads(json_objj)
        except Exception as w:
            print('Exception w='+str(w))
            apii = "Error..."
        return {'apii': apii}
'''



'''
def answergett(request):
    api_request = requests.get("http://localhost:3000/answers/")
    if api_request.status_code == 200:
        answ = json.dumps((api_request.json()))
        print('answer answ= ' + answ)
        return {'answ': answ}
        #return render(request, 'frontend/test.html', {'data': data})

        '''