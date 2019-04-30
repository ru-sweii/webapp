import math
import numpy as np
import preprocessing

def Bayesian_Curve_Fitting(data):
    x_10 = []
    t_data = []
    for i in range(len(data) - 10, len(data)):
        t_data.append(data[i])
    for i in range(1, 11):
        x_10.append(i)
    t = []
    t.append(t_data)
    t_data = t
    N = 10
    M = 6
    x = x_10[len(x_10) - 1] + 1
    for k in range(1):
        t = np.zeros((N, 1), float)
        phi = np.zeros((M, 1), float)
        phi_sum = np.zeros((M, 1), float)
        phi_sum_t = np.zeros((M, 1), float)
        for i in range(M):
            phi[i][0] = math.pow(x,i)
        for i in range(N):
            t[i][0] = t_data[k][i]
        for j in range(N):
            for i in range(M):
                phi_sum[i][0] = phi_sum[i][0] + math.pow(x_10[j],i)
                phi_sum_t[i][0] = phi_sum_t[i][0] + t[j][0] * math.pow(x_10[j],i)

    # Calculation of variance / standard deviation
        S = np.linalg.inv(0.005 * np.identity(M) + 11.1 * np.dot(phi_sum, phi.T))
        var = np.dot((phi.T), np.dot(S,phi))
        var = var + 1 / 11.1
    # Calculating the mean
        mean = 11.1 * np.dot(phi.T, np.dot(S,phi_sum_t))
        mean = mean[0][0]
    res = []
    res.append(mean)
    return res[0]

def predict(indicator):
    input = list(reversed(preprocessing.generate_train_test_data(indicator)))
    prediction = Bayesian_Curve_Fitting(input)
    return prediction