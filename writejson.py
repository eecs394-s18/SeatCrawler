import populartimes
import json
from googleplaces import GooglePlaces, types, lang
import geopy
import getwebsiteurl

# google place api key
api_key = "AIzaSyDx8rBN_1RpT9GSFgOOCGfWRACS2-tNxd8"

# id_lst = ["ChIJ9diwEA3QD4gRlyi4-oKlQDA",
# "ChIJnQKmGw3QD4gRVNfVkkdpV-A",
# "ChIJrcmSDQzQD4gRoorfo4JTTQ4",
# "ChIJyYdA_A3QD4gRsjiJmiZVoHc",
# "ChIJObXXsAvQD4gRl6JqDvqoTV4",
# "ChIJL1kzC3bQD4gRTXS8gvmVUD4",
# "ChIJxZa_tgnQD4gR9eR99jW-A5A",
# "ChIJ3_aXCgzQD4gRLjHdrIN3zl8"]

url_dict = getwebsiteurl.website_url # key: cafe id, value: website url
id_lst = list(url_dict.keys()) # list of cafe ids to use google place api

# write JSON of cafe and save as location.json file
def writeToJSONFile(fileName, url_dict, id_lst):
    filePathNameWExt = './' + fileName + '.json'
    item_dict = {"cafe_list" : []}
    count = 0
    for cafe_id in id_lst:
        cafe_info = populartimes.get_id(api_key, cafe_id)
        cafe_info["website"] = url_dict[cafe_id]
        cafe_info["distance"] = "0.5"
        cafe_info["status"] = "gray"
        cafe_info["number"] = count
        item_dict["cafe_list"].append(cafe_info)
        count+=1
    with open(filePathNameWExt, 'w') as fp:
        json.dump(item_dict, fp, indent=2)

if __name__ == '__main__':
    writeToJSONFile("location", url_dict, id_lst)
