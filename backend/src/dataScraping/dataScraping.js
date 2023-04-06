var request = require("request");
const { response } = require("express");
var convert = require("xml-js"); // package documentation: https://www.npmjs.com/package/xml-js
const fs = require("fs");

/**
 * Config
 * targetXML.url: url of the xml api
 * targetXML.fileName: file name of the scraped data
 * jsonOption: setting of conversting xml to json data
 */
const jsonOption = {
  compact: true,
  // spaces: 4,
  ignoreDeclaration: true,
  ignoreInstruction: true,
};
const targetXML = [
  {
    url: "https://www.lcsd.gov.hk/datagovhk/event/events.xml",
    fileName: "eventData",
  },
  {
    url: "https://www.lcsd.gov.hk/datagovhk/event/venues.xml",
    fileName: "venuesData",
  },
];

/**
 * Helper function:
 */
// 1. Scrape the XML and save the json result into ./Output folder
function downloadXML2JSON(url, fileName, jsonOption = jsonOption) {
  var path = `./src/dataScraping/output/${String(fileName)}.json`;

  request(url, (err, response, body) => {
    var jsonResult = convert.xml2json(body, jsonOption); // convert xml to json string
    var jsonObject = JSON.parse(jsonResult); // turn json string to json object
    save(jsonObject, path);
  });
}

// 2. Save the json variable into ./Output folder
function save(jsonResult, path) {
  var stringResult = JSON.stringify(jsonResult);

  fs.writeFile(path, stringResult, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      console.log(err);
    } else console.log(`Write Json object successful at ${path}`);
  });
}

// 3. update the data file as well as meta data file at "./output"
function runUpdate(dataXML, dataSourceNum, jsonOption, metaDataFileLocation) {
  // var currentDate = new Date().toJSON().slice(0, 10);
  var currentDate = new Date().toJSON();
  // console.log(new Date().toJSON());
  var jsonMetaData = { LastUpdate: currentDate };

  // Record XML scraper's meta data e.g. last update date
  save(jsonMetaData, metaDataFileLocation);

  // DownloadXML at JSON format
  console.log("Start Scraping...");
  for (var idx = 0; idx < dataSourceNum; idx++) {
    downloadXML2JSON(dataXML[idx].url, dataXML[idx].fileName, jsonOption);
  }
}

/**
 * Main class:
 * Constructor: scrape the XML and store it in local
 * checkNUpdate(currentDate) Method:
 * 		Compare the last scraping data with current date
 * 		scrape the XML data again if outdated
 */
class XMLScraper {
  constructor(targetXML, jsonOption = jsonOption) {
    this.dataXML = targetXML;
    this.dataSourceNum = targetXML.length;
    this.jsonOption = jsonOption;
    this.metaDataFileLocation =
      "./src/dataScraping/output/scraperMetaData.json";

    runUpdate(
      this.dataXML,
      this.dataSourceNum,
      this.jsonOption,
      this.metaDataFileLocation
    );
  }

  checkNUpdate(currentDate) {
    var dataXML = this.dataXML;
    var dataSourceNum = this.dataSourceNum;
    var jsonOption = this.jsonOption;
    var metaDataFileLocation = this.metaDataFileLocation;

    fs.readFile(this.metaDataFileLocation, function (err, data) {
      var result = JSON.parse(data);
      var lastUpdate = result.LastUpdate;
      // if (err) {
      //   console.log("An error occured while reading JSON File.");
      //   console.log(err);
      // } else if (lastUpdate <= currentDate) {
      //   console.log("Outdated! Run Update");
      //   runUpdate(dataXML, dataSourceNum, jsonOption, metaDataFileLocation);
      // } else console.log(`Last update is : ${lastUpdate}, not need to update`);
      if (err) {
        console.log("An error occured while reading JSON File.");
        console.log(err);
      } else {
        // console.log("Outdated! Run Update");
        runUpdate(dataXML, dataSourceNum, jsonOption, metaDataFileLocation);
      }
    });
  }
}

// Demo: Check the last update, scrape the XML, and save local
let scraper = new XMLScraper(targetXML, jsonOption);
// Keep update
// scraper.checkNUpdate(new Date().toJSON().slice(0, 10));
// scraper.checkNUpdate("2022-12-12") // or Use tested date

module.exports = { XMLScraper };
