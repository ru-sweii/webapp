import BCF
import SVR
import LSTM

import pymongo

mongoclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongoclient["web568"]
his_stocks = db["his_stocks"]
pred_stocks = db["pred_stocks"]


def load_his_stocks(symbol):
    with open('share_price.csv', 'w') as csvfile:
        csvfile.write('Date,Open,High,Low,Close,Volume\n')
        for row in his_stocks.find({"symbol": symbol}).sort("timestamp"):
            csvfile.write('%s,%f,%f,%f,%f,%d\n' % (row['timestamp'], row['open'], row['high'], row['low'], row['close'], row['volume']))


def write_predict_stocks(symbol, method, result):
    pred_stocks.insert({
        'symbol': symbol,
        'method': method,
        'result': float(result)
    })


def clean_prediction_data(symbol):
    pred_stocks.delete_many({'symbol': symbol})


def predict_on_symbol(symbol, indicator='close_val'):

    clean_prediction_data(symbol)
    load_his_stocks(symbol)

    write_predict_stocks(symbol, 'BCF', BCF.predict(indicator))
    write_predict_stocks(symbol, 'SVR', SVR.predict(indicator))
    write_predict_stocks(symbol, 'LSTM', LSTM.predict(indicator))


for symbol in his_stocks.find().distinct("symbol"):
    print('Predicting on %s' % symbol)
    predict_on_symbol(symbol)

# share_price.csv

# exit(0)

# indicator = 'OHLC'          # Open High Low Close
# indicator = 'HLC'             # High Low Close


# print ("Outcome:")
# print ("Baysian Curve Fitting with", indicator,":", BCF_prediction)
# print ("Support Vector Regressor with", indicator,":", SVR_prediction)
# print ("LSTM: with", indicator,":", LSTM_prediction)
