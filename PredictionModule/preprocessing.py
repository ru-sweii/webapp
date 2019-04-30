import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


# turn 1d data set into time series data set
def new_dataset(dataset, step_size):
    data_X, data_Y = [], []
    for i in range(len(dataset) - step_size - 1):
        a = dataset[i:(i + step_size), 0]
        data_X.append(a)
        data_Y.append(dataset[i + step_size, 0])
    return np.array(data_X), np.array(data_Y)


def generate_train_test_data(indicator):

    # import dataSet
    dataset = pd.read_csv('share_price.csv', usecols=[1, 2, 3, 4])
    dataset = dataset.reindex(index=dataset.index[::-1])

    # assign own index
    obs = np.arange(1, len(dataset) + 1, 1)

    # generate different indicators:
    OHLC_avg = dataset.mean(axis=1)  # Open High Low Close
    HLC_avg = dataset[['High', 'Low', 'Close']].mean(axis=1)  # High Low Close
    close_val = dataset[['Close']].mean(axis=1)  # Close

    if indicator == 'OHLC':
        return OHLC_avg
    elif indicator == 'HLC':
        return HLC_avg
    else:
        return close_val