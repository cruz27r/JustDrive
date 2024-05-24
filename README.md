# JustDrive
CS-410 Project Just Drive
members:
Sergio Barro-Ojeda
Rafael Cruz
Adi Edelhaus
Darian
Chanin Sungla
Nathan Ros
Peng-Lin Chen


### Test 1: Verification of Initial Project Setup and Landing Page Display
 
#### Clone the Repository
1. Open a terminal and run the following commands:
  a. `git clone https://github.com/cruz27r/JustDrive.git`
  b. `cd JustDrive/JustDrive-Web`
2. Verify the repository is cloned into a directory named `JustDrive`.
3. Run `pwd` and confirm the output shows you are in the `JustDrive/JustDrive-Web` directory.
4. Inside the `JustDrive/JustDrive-Web` directory, run:
  a. `npm run build`
5. Confirm the terminal displays “Compiled successfully.”
 
#### Serve the Project
6. In the same directory, run:
  a. `serve -s build`
 
#### Verify the Landing Page
7. If the browser does not open automatically, open a web browser manually and navigate to `http://localhost:3000`.
8. On the landing page, verify you see:
  a. A map centered around the UMass Boston area.
  b. A search bar with fields for "From" and "To".
  c. A blue "Search Route" button.
  d. The JustDrive logo displayed at the bottom-right corner.

Guideline for how to branch and develop our parts

  1) Developer will be the Main branch we use as our editing branch
  2) If making a new feature make a branch off of the developer branch named specifically the feature working on
  3) Once fully complete commit to the developer
  4) Once we all commit our changes and are working in developer we push the developer branch to the main to save our new working version

JustDrive's map uses a Leaflet WebView through react-native-leaflet-view [https://github.com/pavel-corsaghin/react-native-leaflet]. However, as of writing the react-native-leaflet API seems to be no longer maintained and has limited documented functionality. NOTE: JustDrive previously used Leaflet but has now moved on to Google Maps API.

We have now pivoted from using a Maps API to using a predefined area with simplified routing through a look-up table.