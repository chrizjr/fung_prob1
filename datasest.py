import requests 
import base64
import http.client, urllib.request, urllib.parse, urllib.error, base64


base_url = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?language=en&Ocp-Apim-Subscription-Key='
sub_key = 'f7a9e29b-fbca-4adb-a18e-5a169d3906f0'

request_url = base_url+sub_key

image_address = 'Desktop/fung_prob1/Images'

with open(image_address, 'rb') as img:
	imgstr = base64.b64encode(img.read())


headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '{subscription key}',
}

params = urllib.parse.urlencode({
    # Request parameters
    'visualFeatures': 'Categories',
    'details': '{string}',
    'language': 'en',
})

try:
    conn = http.client.HTTPSConnection('westus.api.cognitive.microsoft.com')
    conn.request("POST", "/vision/v1.0/analyze?%s" % params, "{body}", headers)
    response = conn.getresponse()
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))