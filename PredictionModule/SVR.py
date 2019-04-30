import numpy as np
import preprocessing
from sklearn.svm import SVR

def SupportVectorRegressor(indicator):
    index = np.arange(1, len(indicator) + 1, 1)

    X, y, i = [], [], 0

    for idc in indicator:
        X.append([i])
        y.append([idc])
        i = i+1

    # Fit regression model
    svr_rbf = SVR(kernel='rbf', C=100, gamma=0.1, epsilon=.1)
    # y_rbf: validate output using the model trained with X and y
    y_rbf = svr_rbf.fit(X, y).predict(X)
    return y_rbf[-1]

def predict(indicator):
    input = preprocessing.generate_train_test_data(indicator)
    prediction = SupportVectorRegressor(input)
    return prediction