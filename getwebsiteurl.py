import json
from googleplaces import GooglePlaces, types, lang
import geopy

api_key = "AIzaSyDx8rBN_1RpT9GSFgOOCGfWRACS2-tNxd8"
# use google places api
google_places = GooglePlaces(api_key)

# query 3 different locations in entire Evanston area
# query northwestern north campus
nu_query_result = google_places.nearby_search(
        lat_lng = { 'lat': 42.058067, 'lng': -87.676167 }, keyword='Coffee',
        radius=5000, types=[types.TYPE_CAFE])
nu = {}

# query downtown evanston
evanston_center_query_result = google_places.nearby_search(
        lat_lng = { 'lat': 42.049235, 'lng': -87.684388}, keyword='Coffee',
        radius=2000, types=[types.TYPE_CAFE])
evanston_center = {}

# query main station
main_st_query_result = google_places.nearby_search(
        lat_lng = { 'lat':42.033437, 'lng':-87.679975}, keyword='Coffee',
        radius=2000, types=[types.TYPE_CAFE])
main_st = {}

# final cafe dictionary {id: website_url} which combines 3 query results
website_url = {}

for place in nu_query_result.places:
    # The following method has to make a further API call.
    place.get_details()
    nu[place.place_id] = place.website

for place in evanston_center_query_result.places:
    # The following method has to make a further API call.
    place.get_details()
    evanston_center[place.place_id] = place.website

for place in main_st_query_result.places:
    # The following method has to make a further API call.
    place.get_details()
    main_st[place.place_id] = place.website

# merge 3 dictionaries to get total 28 cafes
evanston_center.update(nu)
main_st.update(evanston_center)
website_url = main_st
# print (website_url)
# print (len(website_url)) # total 28 cafes
