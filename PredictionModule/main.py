import BCF
import SVR
import LSTM

# indicator = 'OHLC'          # Open High Low Close
# indicator = 'HLC'             # High Low Close
indicator = 'close_val'     # Close
BCF_prediction = BCF.predict(indicator)
SVR_prediction = SVR.predict(indicator)
LSTM_prediction = LSTM.predict(indicator)

print ("Outcome:")
print ("Baysian Curve Fitting with", indicator,":", BCF_prediction)
print ("Support Vector Regressor with", indicator,":", SVR_prediction)
print ("LSTM: with", indicator,":", LSTM_prediction)
