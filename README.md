# Node_Js_Assignment_Repository
This repository contains the code of the node js assignment. It is extended version of the Javascript assignment.
## How the run the project
To install all the required dependencies run the following command in root directory of the project
```sh
npm install
```
To run the server run
```sh
nodemon app.js
```
# Project Limitation
* Write file from server in case of duplicate api call is not implemented yet
* Can search wheather only by using city name and country name.For example -
```
http://127.0.0.1:3000/all/New York
```
* If we search by using country name it works also ,but fetch data of a default city.
```
http://127.0.0.1:3000/all/Bangladesh
```
The above url returns the data of Dhaka, Bangladesh by default
* Can,t handle request as follows-
```
http://127.0.0.1:3000/all/Bangladesh/Dhaka
```

# Used Technologies
* Node js
* Express js
* Ejs
* Vanilla js
* Rapid Wheather API


# Project Features
* Forecast 3 days wheather of any city in the world.
* Shows a Invalid Page in case of invalid Url.
* Prevented user to hit the forecast api call more than once in every 30 seconds.
* Toggle to display data in celcious and farenheit

