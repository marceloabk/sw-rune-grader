# RuneGrader

User [u/LedgeEndDairy](https://www.reddit.com/user/LedgeEndDairy/) from reddit posted a really nice [guide](https://www.reddit.com/r/summonerswar/comments/mv6c50/guide_hitchhikers_guide_to_summoners_war_rune/) about rune quality for Summoner Wars. Along with the guide also posted a "grading system" that I adapted for this script.

The whole idea is to create a .xlsx file with all your runes and a column with a score for each rune. That will potentially help you to find your best and worse runes, and let you filter them all as you want.

## How to use

Get your json file using the [sw-exporter](https://github.com/Xzandro/sw-exporter) and put it in the current folder renamed as `sw.json`.

`npm start` and it will generate the `runes.xlsx`

Also made a little script at `npm run build` and it will generate an executable for the current system.

## Grade system

I made some changes with the Accuracy and Resistance. Also there are no rounding until the second decimal place.

To see the original system, check again the original [post](https://www.reddit.com/r/summonerswar/comments/mv6c50/guide_hitchhikers_guide_to_summoners_war_rune/).

___
- Each point of SPD is worth 2 points. Therefore 6 SPD = 12 points.

- Each % of Crit Rate is worth 1.5 points. Therefore 6% CR = 9 points.

- ATK%, DEF%, HP%, and CD% are all worth 1 point. 7% of any of these stats = 7 points.

- Flat stats are converted to what it would be as a % of base. For quick reference: 10,000 HP, 750 ATK, and 600 DEF are slightly under average for base stats. Under average is best because few if any monsters will have all three of these stats this high.
  \
  250 HP = 2.5% HP, 15 ATK = 2% ATK, 12 DEF = 2% DEF.

- Each % of Accuracy is 0.75 points.

- Each % of RES is either worth 0 or 1 points. Depends if it is higher than 15. High RES% runes are desired, but the monsters they go on are niche, so a rune that has RES% is generally considered a dead stat.