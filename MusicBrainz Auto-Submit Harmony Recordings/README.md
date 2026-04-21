When using the digital music seed tool Harmony (https://harmony.pulsewidth.org.uk/) you get the option to submit streaming links to each recording.

This can range from loading 1 edit form to 100's depending on the size of the release you've entered, this is great but takes a long time and eventually you'll end up with RSI and severe boredom going to each tab and clicking Enter Edit.

This script solves that by clicking the Enter Edit button for you! :)

The general process for this script is:

- Form is seeded from the Harmony tool, with lovely streaming links for Spotify, Deezer, Apple Music etc.
- Script waits for the form to load (this is ESSENTIAL because without this step, the script will often try to fire before the page is ready and then it tries to submit no data)
- Script clicks the Enter Edit button for you and returns you to the new recording entity page

Caveats:
- Will only ever fire if the Submission Note is the standard Harmony message content that starts "Matched recording while importing", you can try this by typing that exact phrase and like magic the form will auto-submit (although it does give up attempting after 10 seconds to stop wasting resources)
- Expects Harmony to have provided something to submit, without that there's no point in performing this exercise
- If you want to use it on Beta then you'll need to adjust the match value

Other Notes:
Made and revised by Claude Code because I'm a pleb and my homemade userscripts are so horrendously ugly even their own mothers disown them.

NO WARRANTY, NO GUARANTEE, IF THIS DOESN'T WORK THEN DISABLE IT :)