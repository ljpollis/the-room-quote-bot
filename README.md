# The Room Quotes Bluesky Bot

This repository contains the code that drives my [The Room Quotes Every Hour Bluesky bot account](https://bsky.app/profile/theroombot.bsky.social).

In production, the `Post to Bluesky.gs` file is attached to a private Google Sheet containing quotes from _The Room_ (2003) that have been cleaned and formatted into `[Speaker]: [Line]` format, with a trigger set to run every minute. At the 28th minute of every hour, the script randomizes the order of the quotes in the spreadsheet and turns the first one in the dataset into a Bluesky post.

## How to Adapt This Code

Want to make your own account to post some randomized text on Bluesky at hourly intervals? Here's how to adapt this code:

  1. Create a Google Sheet containing your base corpus, such that each row contains one individual post-sized text snippet.
  2. Click `Extensions` > `Apps Script`, then on the next page click `+` > `Script` next to `Files`.
  3. Change the file name from `Untitled` to `Post to Bluesky.gs` and copy and paste the code from the same-named file in this repository.
  4. Replace the input labeled `HANDLE` with the handle of the account you wish to post from. Delete the included brackets but keep the quotation marks.
  5. Replace the input labeled `APP_PASSWORD` with the password of the account you wish to post from. Delete the included brackets but keep the quotation marks. **NOTE: This is not a secure way to store a password. Anyone who has access to your Google Sheet, or anyone who gains access to an account that can access your Google Sheet, will be able to find it. I hope to return to this in the future, but in the meantime, be cautious with who has access to the Google Sheet and any personal communications from the associated Bluesky account, and do _not_ use this script with a password that you use for anything besides the bot account in question.**
  6. Change the `COLUMN_NO` input to the column number corresponding to the text you want to post within your Google Sheet.
  7. Change the `POST_MINUTE` input to the minute of each hour when you want to post within your Google Sheet.
  8. Click the save icon to ensure the code syncs properly.
  9. Click `Triggers` (the alarm clock icon on the left), then `Add Trigger`.
  10. Under `Choose which function to run`, select `Post to Bluesky`.
  11. Under `Select event source`, select `Time-driven`.
  12. Under `Select type of time based trigger`, select `Minutes timer`.
  13. Under `Select minute interval`, select `Every minute`.
  14. Press `Save`.

## Acknowledgments

Thank you to St3ph-fr for [the initial code snippets that I adapted for this project](https://github.com/St3ph-fr/apps-script-for-bluesky-social), and David Klion for [transcribing _The Room_](https://medium.com/@DavidKlion/full-transcript-of-the-room-341e4286db8e).
