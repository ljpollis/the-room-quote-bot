const HANDLE = "[accountname.bsky.social]"; // Set this to your Bluesky account handle and remove brackets from string
const APP_PASSWORD = "[password]"; // Set this to your Bluesky password and remove brackets from string

const COLUMN_NO = 3; // Set this to the column number in the Google Sheet where the text to post is
const POST_MINUTE = 28; // Set this to the minute of each hour when you want the account to post

const DID_URL = "https://bsky.social/xrpc/com.atproto.identity.resolveHandle";
const API_KEY_URL= "https://bsky.social/xrpc/com.atproto.server.createSession";
const FEED_URL = "https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed";
const POST_FEED_URL = "https://bsky.social/xrpc/com.atproto.repo.createRecord";

function PosttoBluesky() {

  const date = new Date();
  const minutes = date.getMinutes();
  if(minutes === POST_MINUTE){

    // shuffle spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var range = sheet.getDataRange();
    range.setValues(shuffleArray(range.getValues())); 

    // get text from first post-header row
    var sheet = SpreadsheetApp.getActiveSheet();
    var startRow = 2; // First row of data to process
    var numRows = 1; // Number of rows to process
    var dataRange = sheet.getRange(startRow, 1, numRows, 3);
    var data = dataRange.getValues();
    for (i in data) {
      var row = data[i];
      var message = row[COLUMN_NO - 1];
      }

    // resolve Bluesky handle
    let handleOpt = {
      "method" : "GET",
      };
    let handleUrl = encodeURI(DID_URL + "?handle=" + HANDLE)
    const handleRep = UrlFetchApp.fetch(handleUrl, handleOpt);
    const DID = JSON.parse(handleRep.getContentText()).did
    console.log(DID)

    // get Token
    let tokenOpt = {
      "method" : "POST",
      "contentType": "application/json",
      "payload" : JSON.stringify({"identifier" : DID, "password" : APP_PASSWORD})
      };
    const tokenRep = UrlFetchApp.fetch(API_KEY_URL, tokenOpt);
    const TOKEN = JSON.parse(tokenRep.getContentText()).accessJwt
    console.log(TOKEN)

    // publish text as post on Bluesky
    let postOpt = {
      "method" : "POST",
      "headers"     : {"Authorization" : "Bearer " + TOKEN},
      "contentType": "application/json",
      "payload" : JSON.stringify({"collection" : "app.bsky.feed.post",
        "repo" : DID,
        "record": {
            "text" : message,
            "createdAt" : new Date().toISOString(),
            "$type": "app.bsky.feed.post"
            } 
        })
      };

  const postRep = UrlFetchApp.fetch(POST_FEED_URL, postOpt);
  console.log(postRep.getContentText())
  }
}
