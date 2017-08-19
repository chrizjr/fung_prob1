import datetime
import numpy as np
import pandas as pd
import os
from calendar import monthrange



for filename in os.listdir('./Images'):
	os.rename('./Images/'+filename,'./Images/'+ filename.split('_')[-1])
def seasonal_split():

	seasons = ['Spring','Summer','Fall','Winter']

	split = {}

	for i,season in enumerate(seasons):

		split[season] = np.arange(i*3+1, (i+1)*3+1)

	return split

def random_date(year, month):

	days_in_month = monthrange(year, month)[1]

	return datetime.date(year, month, np.random.randint(1,days_in_month+1))

# all_seasons = lol['season'].values
# unique_seasons = lol['season'].unique()
# season_split = seasonal_split()

# upload_date = []

# print(season_split, unique_seasons[:3])


# for i in all_seasons:
		
# 	if i in unique_seasons[:3]:
# 		this_date = random_date(np.random.choice([2016,2017]), np.random.choice(season_split[i])).isoformat()
# 		upload_date.append(this_date)
# 	elif i=='Winter':
# 		this_date = random_date(2016, np.random.choice(season_split[i])).isoformat()
# 		upload_date.append(this_date)
# 	elif i=='Spring/Summer':
# 		this_date = random_date(np.random.choice([2016,2017]), np.random.choice([4,7])).isoformat()
# 		upload_date.append(this_date)
# 	elif i=='Fall/Winter':
# 		this_date = random_date(np.random.choice([2016]), np.random.choice([9,11])).isoformat()
# 		upload_date.append(this_date)
# 	else:
# 		this_date = random_date(np.random.choice([2016]), np.random.randint(1,12)).isoformat()
# 		upload_date.append(this_date)

# ran_id = []
# prelim='0000'
# for i in range(lol.shape[0]):
# 	temp = prelim[:5-len(str(i))]+str(i)
# 	ran_id.append(temp)

# print(ran_id)
# lol['upload_date'] = upload_date
# lol['photoId'] = ran_id
# lol.to_csv('product_upload.csv')



