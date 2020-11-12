from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
import json
import requests
import ast
from ast import literal_eval
from django.shortcuts import redirect
from rest_framework.views import APIView
from django.http import JsonResponse
from . answerget import answergett
#from rest_framework.response import Response


def home(request):
    apii = answergett(request)

    if request.method == 'GET':
        api_request = requests.get("http://localhost:3000/questions/")
    try:
        print('api_request='+str(api_request))
        q = literal_eval(api_request.content.decode('utf8'))
        print('q=', q, type(q))
        print(q['data'])
        json_obj = json.dumps(q['data'])
        print('json_obj=', json_obj, type(json_obj))
        api = json.loads(json_obj)
        print('API = ' + str(api))
        print('apii = ', apii)
        #apii = json.loads(ap)
        
        #print('apii = ' + apii)
    except Exception as e:
        print('Exception e='+str(e))
        api = "Error..."

    return render(request, 'frontend/home.html', {'apii': apii, 'api': api})

''' ap = json.dumps(apiii['answ'])
    print('ap = ' + ap)
    apii = json.loads(ap)
    print('apii = ' + apii)'''


def submitquestion(request):
        return render(request, 'frontend/submitquestion.html')

def add_question(request):
        if request.method == 'POST':
            url = 'http://localhost:3000/questions/'
            data = {
                "content": request.POST['content'],
                "category": request.POST['category']
            }
            print('data=', data,)
            print("inside add_question data=" + str(data))
            api_post = requests.post(url, data)
            return redirect('/')


def add_answer(request, content, category):
    if request.method == 'POST':
        url = 'http://localhost:3000/answers/'
        print('prejson = ' + content + category)
        data = {
            "content": [content],
            "answer": request.POST['answer'],
            "category": [category],
        }
        print('data=', data,)
        print("inside add_answer data=" + str(data))
        api_post = requests.post(url, data)
        return redirect('/')




def test(request):
    apiii = answergett(request) 
    ap = json.dumps(apiii['answ'])
    print('ap = ' + ap)
    apii = json.loads(ap)
    print('apii = ' + apii)
    if request.method == 'GET':
        api_request = requests.get("http://localhost:3000/questions/")
    try:
        print('api_request='+str(api_request))
        q = literal_eval(api_request.content.decode('utf8'))
        print('q=', q, type(q))
        print(q['data'])
        json_obj = json.dumps(q['data'])
        print('json_obj=', json_obj, type(json_obj))
        api = json.loads(json_obj)
        print('API = ' + str(api))

        apii = json.loads(ap)
        
        
        print('apii = ' + apii)
        #apii_json_obj = ast.literal_eval(apii)
        #print('apii_json_obj = ', apii_json_obj)
    except Exception as e:
        print('Exception e='+str(e))
        api = "Error..."

    return render(request, 'frontend/test.html', {'apii': apii, 'api': api})




'''
def answergett(request):
    if request.method == "GET":
            api_request = requests.get("http://localhost:3000/answers/")
            if api_request.status_code == 200:
                data = api_request.json()
                print('data = ' + str(data))
                return render(request, 'frontend/test.html', {'data': data})
'''
'''
def answergett(request):
    if request.method == 'GET':
        api_request = requests.get("http://localhost:3000/answers/")
        try:
            print('api_request='+str(api_requestt))
            z = literal_eval(api_request.content.decode('utf8'))
            print('z=', z, type(z))
            print(z['data'])
            json_obj = json.dumps(z['data'])
            print('json_obj=', json_obj, type(json_obj))

            apii = json.loads(json_obj)
        except Exception as w:
            print('Exception w='+str(w))
            apii = "Error..."
        return {'apii': apii}
'''
'''
def add_question(request):
    if request.method == 'POST':
        url = 'http://localhost:3000/questions/'
        payload = {
        "content":request.POST.get("content"),
        "category":request.POST.get("category")
        }
        payload_json = json.dumps(payload)
        question_data = literal_eval(payload_json.decode("utf-8"))
        res = requests.post(url, data = (question_data))
        print(res)
    return Response(res.json())
'''


'''
def add_stock(request):
    import requests
    import json

    bala = Bal.objects.get(pk=2)

    if request.method == 'POST':
        form = StockForm(request.POST or None)

        if form.is_valid():
            form.save()
            messages.success(request, ("Stock has been addedd"))
            return redirect('/add_stock')
ticker = Stock.objects.all()
            output = []

        for ticker_item in ticker:
            api_request = requests.get("https://cloud.iexapis.com/stable/stock/" + str(ticker_item) + "/quote?token=pk_f7c3d0d74a06499fbf6aa2d949922047")
            get_data(ticker, request)

            if ticker_item.stock_owned == None:
                ticker_item.stock_owned = 0

            try:
                api = json.loads(api_request.content)
                output.append(api)
            except Exception as e:
                api = "Error..."

        return render(request, 'stocktrader/add_stock.html', {'ticker': ticker, 'output': output, 'bala': bala})
'''
('''
def home(request):
    import requests
    import json
    if request.method == 'POST':
        tickers = request.POST['ticker']
        api_request = requests.get("https://cloud.iexapis.com/stable/stock/" + tickers + "/quote?token=pk_f7c3d0d74a06499fbf6aa2d949922047")
        get_data(tickers, request)

        try:
            api = json.loads(api_request.content)
        except Exception as e:
            api = "Error..."
        return render(request, 'stocktrader/home.html', {'api': api})

    else:
        return render(request, 'stocktrader/home.html', {'ticker': "Enter a ticker symbol above."})
''')
