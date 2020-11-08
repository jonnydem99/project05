from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
import json
import requests
from ast import literal_eval
from django.shortcuts import redirect
from rest_framework.views import APIView
#from rest_framework.response import Response


def home(request):
    if request.method == 'GET':
        print('home')
    api_request = requests.get("http://localhost:3000/questions/")#.json()
    try:
        print( 'api_request='+str(api_request))
        q = literal_eval(api_request.content.decode('utf8'))
        print('q=', q, type(q))
        print( q['data'])
        json_obj = json.dumps(q['data'])
        print('json_obj=', json_obj, type(json_obj))
       
        #api = json.loads(api_request.content)
        api = json.loads(json_obj)
    except Exception as e:
        print( 'Exception e='+str(e))
        api = "Error..."
    else: 
        if request.method == 'POST':
            post_request = requests.post("http://localhost:3000/questions/")
            print(post_request)
    return render(request, 'frontend/home.html', {'api': api})

def submitquestion(request):
    return render(request, 'frontend/submitquestion.html')


def add_question(request):
    if request.method == 'POST':
        url = 'http://localhost:3000/questions/'
        data = request.POST['content']
        print('data=', data)
        #data = json.dumps(request.POST)
        print("inside add_question data=", data)
        res = requests.post(url, data)
        print("res= ", res)
        return HttpResponse(res)

        #payload_json = json.dumps(payload)
        #question_data = literal_eval(payload_json.decode("utf-8"))
        #res = requests.post(url, data = (question_data))
        #print(res)
    #return Response(res.json())

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
