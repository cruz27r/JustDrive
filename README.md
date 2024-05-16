# JustDrive
CS-410 Project Just Drive
members:
Sergio Barro-Ojeda
Rafael Cruz
Adi Edelhaus

Guideline for how to branch and develop our parts

  1) Developer will be the Main branch we use as our editing branch
  2) If making a new feature make a branch off of the developer branch named specifically the feature working on
  3) Once fully complete commit to the developer
  4) Once we all commit our changes and are working in developer we push the developer branch to the main to save our new working version

JustDrive's map uses a Leaflet WebView through react-native-leaflet-view [https://github.com/pavel-corsaghin/react-native-leaflet]. However, as of writing the react-native-leaflet API seems to be no longer maintained and has limited documented functionality. NOTE: JustDrive previously used Leaflet but has now moved on to Google Maps API.

We have now pivoted from using a Maps API to using a predefined area with simplified routing through a look-up table.