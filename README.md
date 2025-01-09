# The Room Quotes Bluesky Bot

This repository contains the code that drives my [The Room Quotes Every Hour Bluesky bot account](https://bsky.app/profile/theroombot.bsky.social).

In production, the `Post to Bluesky.gs` file is attached to a private Google Sheet containing quotes from _The Room_ (2003) that have been cleaned and formatted into `[Speaker]: [Line]` format, with a trigger set to run every minute. At the 28th minute of every hour, the script randomizes the order of the quotes in the spreadsheet and turns the first one in the dataset into a Bluesky post.
