Debouncing:

For youtube Search bar

Typing slow = 200ms
Typing Fast = 30ms

Performance:

typing "iphone pro max" = 14 letters(including spaces) _ 1000 users = 14000 api calls with each key stroke
but with Debouncing 3 api calls for this _ 1000 users = 3000 api calls

Debouncing with 200 ms means

if difference between 2 key strokes is less than 200 ms - decline Api call
if more than 200ms , accept api call , because user might need results.

You tube actual site gives api call on every key stroke as they are focusing more on a better user experience than performance

# CHALLENGES FOR LIVE YOU TUBE VIDOES

1. DATA LAYER - To get data live
2. UI LAYER - To update the UI

# TWO WAYS OF HANDLING LIVE DATA ( System Design Concept )

1. Web Sockets -- Initial connection between UI and Server takes time , but once connection is established, data transfer to and fro is fast, from any direction and send wherever you want to. Two/both way connection. No interval. It's like a handshake. Instant constant needed. REAL-TIME. Eg - STOCK MARKET APPS, WATSAPP, LIVE CHAT APPS.
2. API Polling -- One way connection from Server to UI. Poll/collect data from Server. Updates after some interval (Eg- after 25s). Eg - GMAIL, CRICBUZZ, YOU TUBE LIVE
