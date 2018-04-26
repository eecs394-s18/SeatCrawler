import populartimes
import json


api_key = "AIzaSyDx8rBN_1RpT9GSFgOOCGfWRACS2-tNxd8"
id_lst = ["ChIJ9diwEA3QD4gRlyi4-oKlQDA",
"ChIJnQKmGw3QD4gRVNfVkkdpV-A",
"ChIJrcmSDQzQD4gRoorfo4JTTQ4",
"ChIJyYdA_A3QD4gRsjiJmiZVoHc",
"ChIJObXXsAvQD4gRl6JqDvqoTV4",
"ChIJL1kzC3bQD4gRTXS8gvmVUD4",
"ChIJxZa_tgnQD4gR9eR99jW-A5A",
"ChIJ3_aXCgzQD4gRLjHdrIN3zl8"]

def writeToJSONFile(fileName, id_lst):
    filePathNameWExt = './' + fileName + '.json'
    item_dict = {"cafe_list" : []}
    count = 0
    for loc_id in id_lst:
        loc_info = populartimes.get_id(api_key, loc_id)
        loc_info["distance"] = "0.5"
        loc_info["status"] = "gray"
        loc_info["number"] = count
        item_dict["cafe_list"].append(loc_info)
        count+=1
    with open(filePathNameWExt, 'w') as fp:
        json.dump(item_dict, fp, indent=2)


if __name__ == '__main__':
    writeToJSONFile("location", id_lst)



