import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder 

data = pd.read_excel("Metadata.xlsx")
photo = data['photoId'].values

tags = data['tagName']

photo_tag = {}

for i in np.unique(photo):
	photo_match = data[data['photoId']==i]
	temp_tag = photo_match['tagName'].values
	photo_tag[i] = temp_tag

print(photo_tag)



unique_tags = np.unique(tags, return_counts=True)
tags_token = LabelEncoder()
tokenized = tags_token.fit_transform(tags)

top_10 = [ unique_tags[0][i] for i in range(len(unique_tags[0])) if unique_tags[1][i]>=5]

print (top_10)


# sns.barplot(unique_tags[0], unique_tags[1])
# plt.show()