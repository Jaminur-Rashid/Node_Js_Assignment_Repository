/*
  Import all the required packages
*/
const express = require("express");
const explayouts = require("express-ejs-layouts");
const http = require("https");
const request = require("request");
var cors = require("cors");
const { response } = require("express");
const rateLimit = require("express-rate-limit");
//var popup = require('popups');
var fs = require("fs");
const app = express();
const port = 3000;
/*
  Implement rate limit middleware
*/
const rateLimiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 30 seconds 
  max: 1,                   //no of request
  message:
    "403 Forbidden, Yoy can,t request more than once in every 30 seconds",
});
app.use(cors());
app.use(explayouts);
app.use("/assets", express.static("assets"));
// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
/*
    Weather forcast based on the location
    here apiLimiter is a rate limite middleware
*/

app.get("/all/:city", rateLimiter, function (req, res) {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    // It works qs: { q: "London", days: "2" },
    qs: { q: req.params.city, days: "3" },
    headers: {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      "x-rapidapi-key": "2f22bdf9f9msh9e03f4106e9a66cp1c99b4jsn095daf465ab8",
      useQueryString: true,
    },
  };
  console.log("Url city is : " + req.params.city);
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data = JSON.parse(body);
    var arr = [];
    arr.push(data);
    for (let i = 0; i < arr.length; i++) {}

    var dataa = {
      f: data.forecast,
    };
    /*
    Read and write file 
  
    fs.readFile("StoreData.json", dataa, function (err, data) {
      console.log("write " + dataa);
      return res.end();
    });
    */
    /*
       Slice the forecast date
       and calculate required output data
   */
    var maxTempCelAvg = 0;
    var maxTempFarAvg = 0;
    var minTempCelAvg = 0;
    var minTempFarAvg = 0;
    var avgTempCelAvg = 0;
    var avgTempFarAvg = 0;
    var totalDay = dataa.f.forecastday.length;
    for (let i = 0; i < dataa.f.forecastday.length; i++) {
      console.log("Forcastday works");
      maxTempCelAvg = maxTempCelAvg + dataa.f.forecastday[i].day.maxtemp_c;
      maxTempFarAvg = maxTempFarAvg + dataa.f.forecastday[i].day.maxtemp_f;
      minTempCelAvg = minTempCelAvg + dataa.f.forecastday[i].day.mintemp_c;
      minTempFarAvg = minTempFarAvg + dataa.f.forecastday[i].day.mintemp_f;
      avgTempCelAvg = avgTempCelAvg + dataa.f.forecastday[i].day.avgtemp_c;
      avgTempFarAvg = avgTempFarAvg + dataa.f.forecastday[i].day.avgtemp_f;
    }
    maxTempCelAvg = maxTempCelAvg / (totalDay * 1.0);
    maxTempFarAvg = maxTempFarAvg / (totalDay * 1.0);
    minTempFarAvg = minTempFarAvg / (totalDay * 1.0);
    minTempCelAvg = minTempCelAvg / (totalDay * 1.0);
    avgTempCelAvg = avgTempCelAvg / (totalDay * 1.0);
    avgTempFarAvg = avgTempFarAvg / (totalDay * 1.0);
    /*
    Slice the starting day and
    ending day of the query
    and send back it to the front-end
    */
    let startsDate = dataa.f.forecastday[0].date;
    let endingDate = dataa.f.forecastday[2].date;
    let startsMonth = startsDate.substring(5, 7);
    let startsDay = startsDate.substring(8, 10) + " ";
    let endingMonth = endingDate.substring(5, 7);
    let endingDay = endingDate.substring(8, 10) + " ";
    //console.log("Starts day is : "+startsDate+" Ending date is : "+endingDate+" startsMonth : "+startsMonth+" starts day "+startsDay+" ending month "+endingMonth+" ending day"+endingDay);
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthIndex = parseInt(startsMonth);
    let monthIndexOne = parseInt(endingMonth);
    //console.log("month One : "+monthList[monthIndex-1]+" Month two "+monthList[monthIndexOne-1]);
    let strtsFrom = "";
    strtsFrom += startsDay;
    strtsFrom += monthList[monthIndex - 1];
    let endsAt = "";
    endsAt += endingDay;
    endsAt += monthList[monthIndexOne - 1];
    // console.log(" starts from "+strtsFrom+" ends at "+endsAt)

    /*
      Store Output data into an object
      and sends it to the front end
    */
    var finalData = {
      city: data.location.name,
      countryName: data.location.country,
      starts: strtsFrom,
      ends: endsAt,
      lowCelAvg: minTempCelAvg.toPrecision(2),
      lowFarAvg: minTempFarAvg.toPrecision(2),
      highCelAvg: maxTempCelAvg.toPrecision(2),
      highFarAvg: maxTempFarAvg.toPrecision(2),
      avgTempCelAvg: avgTempCelAvg.toPrecision(2),
      avgTempFarAvg: avgTempFarAvg.toPrecision(2),
    };
    console.log("Final Data is : " + finalData.lowCelAvg);
    console.log(
      "Average of maxTempCel is : " +
        maxTempCelAvg +
        " maxTempFarAvg :" +
        maxTempFarAvg +
        " avgTempCelAvg : " +
        avgTempCelAvg +
        " avgTempFarAvg : " +
        avgTempFarAvg
    );
    //console.log("maxTemCel"+maxTempCel+" minTempCel : "+minTempCel+" maxTempFar : "+maxTempFar)
    console.log(body);
    console.log(dataa);
    console.log(data.location.name);
    //res.send(JSON.parse(body));
    res.render("HomePage", { finalData: finalData });
  });
});

/*
  If no other routes matches the requested url
  display an ivalid url message
*/
app.get("*", function (req, res) {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`);
});

/*
Query with country and City name
not implemented fully
*/
/*
app.get("/all/:country/:city", rateLimiter, function (req, res) {
  var country = req.params.country;
  var city = req.params.city;
  var queryStr = city ? city : country;
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    qs: { q: req.params.city, days: "3" },
    headers: {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      "x-rapidapi-key": "2f22bdf9f9msh9e03f4106e9a66cp1c99b4jsn095daf465ab8",
      useQueryString: true,
    },
  };
  console.log(
    "Url city is : " +
      req.params.city +
      " country name is : " +
      req.params.country
  );
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data = JSON.parse(body);
    var arr = [];
    arr.push(data);
    for (let i = 0; i < arr.length; i++) {}

    var dataa = {
      f: data.forecast,
    };
    var obj = {
      table: []
   };
   obj.table.push({id: 1, square:2});
   var json = JSON.stringify(obj);
    let tempData=JSON.stringify(dataa);
    var maxTempCelAvg = 0;
    var maxTempFarAvg = 0;
    var minTempCelAvg = 0;
    var minTempFarAvg = 0;
    var avgTempCelAvg = 0;
    var avgTempFarAvg = 0;
    var totalDay = dataa.f.forecastday.length;
    for (let i = 0; i < dataa.f.forecastday.length; i++) {
      console.log("Forcastday works");
      maxTempCelAvg = maxTempCelAvg + dataa.f.forecastday[i].day.maxtemp_c;
      maxTempFarAvg = maxTempFarAvg + dataa.f.forecastday[i].day.maxtemp_f;
      minTempCelAvg = minTempCelAvg + dataa.f.forecastday[i].day.mintemp_c;
      minTempFarAvg = minTempFarAvg + dataa.f.forecastday[i].day.mintemp_f;
      avgTempCelAvg = avgTempCelAvg + dataa.f.forecastday[i].day.avgtemp_c;
      avgTempFarAvg = avgTempFarAvg + dataa.f.forecastday[i].day.avgtemp_f;
    }
    maxTempCelAvg = maxTempCelAvg / (totalDay * 1.0);
    maxTempFarAvg = maxTempFarAvg / (totalDay * 1.0);
    minTempFarAvg = minTempFarAvg / (totalDay * 1.0);
    minTempCelAvg = minTempCelAvg / (totalDay * 1.0);
    avgTempCelAvg = avgTempCelAvg / (totalDay * 1.0);
    avgTempFarAvg = avgTempFarAvg / (totalDay * 1.0);
    let startsDate = dataa.f.forecastday[0].date;
    let endingDate = dataa.f.forecastday[2].date;
    let startsMonth = startsDate.substring(5, 7);
    let startsDay = startsDate.substring(8, 10) + " ";
    let endingMonth = endingDate.substring(5, 7);
    let endingDay = endingDate.substring(8, 10) + " ";
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthIndex = parseInt(startsMonth);
    let monthIndexOne = parseInt(endingMonth);
    //console.log("month One : "+monthList[monthIndex-1]+" Month two "+monthList[monthIndexOne-1]);
    let strtsFrom = "";
    strtsFrom += startsDay;
    strtsFrom += monthList[monthIndex - 1];
    let endsAt = "";
    endsAt += endingDay;
    endsAt += monthList[monthIndexOne - 1];

    var finalData = {
      city: data.location.city,
      countryName: data.location.country,
      starts: strtsFrom,
      ends: endsAt,
      lowCelAvg: minTempCelAvg.toPrecision(2),
      lowFarAvg: minTempFarAvg.toPrecision(2),
      highCelAvg: maxTempCelAvg.toPrecision(2),
      highFarAvg: maxTempFarAvg.toPrecision(2),
      avgTempCelAvg: avgTempCelAvg.toPrecision(2),
      avgTempFarAvg: avgTempFarAvg.toPrecision(2),
    };
    console.log("Final Data is : " + finalData.lowCelAvg);
    console.log(
      "Average of maxTempCel is : " +
        maxTempCelAvg +
        " maxTempFarAvg :" +
        maxTempFarAvg +
        " avgTempCelAvg : " +
        avgTempCelAvg +
        " avgTempFarAvg : " +
        avgTempFarAvg
    );
    console.log(body);
    console.log(dataa);
    console.log(data.location.name);
    res.render("HomePage", { finalData: finalData });
  });
});
*/
