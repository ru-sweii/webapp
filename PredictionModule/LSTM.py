import pandas as pd
import numpy as np
import math
import tensorflow as tf
import preprocessing
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.layers import LSTM
import warnings

def LongShortTermMemory(indicator):
    warnings.filterwarnings('ignore')
    # calculate OHLC average
    indicator = np.reshape(indicator.values, (len(indicator), 1))
    scaler = MinMaxScaler(feature_range=(0, 1))
    indicator = scaler.fit_transform(indicator)

    # generate train set and test set
    train_size = int(len(indicator) * 0.75)
    test_size = len(indicator) - train_size
    train, test = indicator[0:train_size, :], indicator[train_size:len(indicator), :]

    # input: value of time T
    # target: value of time T+1
    trainX, trainY = preprocessing.new_dataset(train, 1)
    testX, testY = preprocessing.new_dataset(test, 1)
    trainX = np.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
    testX = np.reshape(testX, (testX.shape[0], 1, testX.shape[1]))
    step_size = 1

    # initialize LSTM Model
    model = Sequential()
    model.add(LSTM(32, input_shape=(1, step_size), return_sequences=True))
    model.add(LSTM(16))
    model.add(Dense(1))
    model.add(Activation('linear'))

    # train the model
    model.compile(loss='mean_squared_error', optimizer='adagrad')  # Try SGD, adam, adagrad and compare!!!
    model.fit(trainX, trainY, epochs=10, batch_size=1, verbose=2)

    # predict
    trainPredict = model.predict(trainX)
    testPredict = model.predict(testX)

    # De-normalizing
    trainPredict = scaler.inverse_transform(trainPredict)
    trainY = scaler.inverse_transform([trainY])
    testPredict = scaler.inverse_transform(testPredict)
    testY = scaler.inverse_transform([testY])

    # predict future values
    last_val = testPredict[-1]
    last_val_scaled = last_val / last_val
    next_val = model.predict(np.reshape(last_val_scaled, (1, 1, 1)))
    res = last_val * next_val
    return res[0][0]

def predict(indicator):
    warnings.filterwarnings('ignore')
    input = preprocessing.generate_train_test_data(indicator)
    prediction = LongShortTermMemory(input)
    return prediction