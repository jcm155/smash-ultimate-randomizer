// Set the variables based on the contents of the html form
var NOT_FOUND = -1;
var maxPlayers = document.getElementById("max-player-setting").value;
var includeAltForms = document.getElementById("alt-stage-toggle").checked;
var includeColorfulResults = document.getElementById("color-toggle").checked;
var legalityLevel = document.getElementById("legality-control").value;
var lightweightMax = 81;
var heavyWeightMin = 107;

var numOfPlayers = 2;
var charMode = document.getElementById("char-theme-select").value;
var numOfChars = document.getElementById("char-select-num").value;
var stageMode = document.getElementById("stage-theme-select").value;
var numOfStages = document.getElementById("stage-select-num").value;

//Create reference arrays that will be filled later
var charSeries = [];
var stageSeries = [];

var removedChars = [];
var removedStages = [];

var resultLists = [];

//Colors for if the color-coded option is checked
var playerColors = ["#d50000", "#2e6dee", "#daa50c", "#09972b", "#d0571e", "#1ba4d1", "#d62f7f", "#5130a7"];

//Test for touch screen
var hasTouchScreen = false;
if ("maxTouchPoints" in navigator) { 
    hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0; 
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

//Test if user is using only a keyboard
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousemove', handleFirstMouseMove);
    }
}

//Test if user has a mouse
function handleFirstMouseMove() {
	document.body.classList.remove('user-is-tabbing');
	window.removeEventListener('mousemove', handleFirstMouseMove);
	window.addEventListener('keydown', handleFirstTab);
}

//Handle the events
window.addEventListener('keydown', handleFirstTab);
window.addEventListener('mousemove', handleFirstMouseMove);

//Create the array of possible modes for characters
var charModeElements = document.getElementById("char-theme-select").getElementsByTagName("option");
var charModes = []
for (var mode = 0; mode < charModeElements.length; mode++)
{
	charModes.push(charModeElements[mode].value);
}

//Do the same for stage modes
var stageModeElements = document.getElementById("stage-theme-select").getElementsByTagName("option");
var stageModes = []
for (var mode = 0; mode < stageModeElements.length-1; mode++)
{
	stageModes.push(stageModeElements[mode].value);
}
stageModes.push("normal");
stageModes.push("battlefield");
stageModes.push("omega");
stageModes.push("non-normal");
stageModes.push("non-battlefield");
stageModes.push("non-omega");
stageModes.push("random");

//Create the descriptions for all the different modes
var charModeDescriptions = ["Basic is best.", "Cause boys rule.", "#GIRLPOWER", "Play whoever you're beast at.", "Everyone needs a little chaos in their life.", "Back to the classics.", "I'm not super competitive, I swear!", "Have a nice trip.", "I don't remember it either.", "PLANT GANG. PLANT GANG. PLANT GANG.", "Bayonetta was fine, you were just bad.", "Surely just one more anime swordsman couldn't hurt.", "Wait, Shulk's not from Fire Emblem?", "The golden age of gaming.", "OH MY GOSH IT'S BANJO!!!", "Super Mario Galaxy defined this era. Come at me.", "Why is Byleth in this game anyways?", "Finally, some mascots I care about.", "I, too, want to die to anything.", "The bigger they are, the farther they can punch Yoshi.", "Because smuggling in extra characters is fine.", "Even I don't know what's coming..."];

var stageModeDescriptions = ["I'm not picky.", "Ah, a fellow elitist.", "Good graphics are for nerds.", "Yes, there's more than Final Destination.", "But where's Rumble Falls?", "Still upset about Rainbow Road and Pac-Maze...", "Who even approved The Great Cave Offensive?", "The latest and greatest.", "Paid stages > normal stages. Change my mind.", "I'm no Nintendo nerd.", "Which ones play MEGALOVANIA?", "Actually, I CAN run forever.", "Vanilla stages, just like you.", "Why bother choosing? They're all the same.", "FOX NO ITEMS OMEGA FORMS ONLY!", "At least you won't have stage hazards.", "Who played on Battlefield anyway?", "Half boring, half fun. Sound familiar?", "It's a secret to everybody..."];

//Constructor that holds character data
function Character(charName, charNum, charSeries, charSex, charOrigin, charSmash, charWeight, charDLC, charHasSword, charIsVillain, charIsThirdParty, charIsMultislot, charIsNonHuman)
{
	this.name = charName;
	this.number = charNum;
	this.series = charSeries;
	this.gender = charSex;
	this.firstAppearanceYear = charOrigin;
	this.firstSmashAppearance = charSmash;
	this.weight = charWeight;
	this.dlc = charDLC;
	this.hasSword = charHasSword;
	this.isVillain = charIsVillain;
	this.isThirdParty = charIsThirdParty;
	this.isMultislot = charIsMultislot;
	this.isNonHuman = charIsNonHuman;
}

//Constructor that holds stage data
function Stage(stageName, stageIndex, stageSeries, stageOrigin, stageLegal, stageDLC, stageLarge, stageThird)
{
	this.name = stageName;
	this.index = stageIndex;
	this.series = stageSeries;
	this.firstSmashAppearance = stageOrigin;
	this.legality = stageLegal;
	this.dlc = stageDLC;
	this.isLarge = stageLarge;
	this.isThirdParty = stageThird;
}

characters = []
//Assemble the character data                                                               dlc    sword  villain 3rdPty multi n-human
characters.push(new Character("Mario", 1, "Super Mario Bros.", "male", 1981, "Smash 64", 98, false, false, false, false, false, false));
characters.push(new Character("Donkey Kong", 2, "Donkey Kong", "male", 1981, "Smash 64", 127, false, false, false, false, false, true));
characters.push(new Character("Link", 3, "Legend of Zelda", "male", 1986, "Smash 64", 104, false, true, false, false, false, false));
characters.push(new Character("Samus", 4, "Metroid", "female", 1986, "Smash 64", 108, false, false, false, false, false, false));
characters.push(new Character("Dark Samus", 4.5, "Metroid", "female", 2005, "Ultimate", 108, false, false, true, false, false, true));
characters.push(new Character("Yoshi", 5, "Yoshi's Island", "male", 1990, "Smash 64", 104, false, false, false, false, false, true));
characters.push(new Character("Kirby", 6, "Kirby", "male", 1992, "Smash 64", 79, false, false, false, false, false, true));
characters.push(new Character("Fox", 7, "Star Fox", "male", 1993, "Smash 64", 77, false, false, false, false, false, true));
characters.push(new Character("Pikachu", 8, "Pokemon", "both", 1996, "Smash 64", 79, false, false, false, false, false, true));
characters.push(new Character("Luigi", 9, "Super Mario Bros.", "male", 1983, "Smash 64", 97, false, false, false, false, false, false));
characters.push(new Character("Ness", 10, "Earthbound", "male", 1994, "Smash 64", 94, false, false, false, false, false, false));
characters.push(new Character("Captain Falcon", 11, "F-Zero", "male", 1990, "Smash 64", 104, false, false, false, false, false, false));
characters.push(new Character("Jigglypuff", 12, "Pokemon", "female", 1996, "Smash 64", 68, false, false, false, false, false, true));
characters.push(new Character("Peach", 13, "Super Mario Bros.", "female", 1985, "Melee", 89, false, false, false, false, false, false));
characters.push(new Character("Daisy", 13.5, "Super Mario Bros.", "female", 1989, "Ultimate", 89, false, false, false, false, false, false));
characters.push(new Character("Bowser", 14, "Super Mario Bros.", "male", 1985, "Melee", 135, false, false, true, false, false, true));
characters.push(new Character("Ice Climbers", 15, "Other", "both", 1985, "Melee", 92, false, false, false, false, true, false));
characters.push(new Character("Sheik", 16, "Legend of Zelda", "female", 1998, "Melee", 78, false, false, false, false, false, false));
characters.push(new Character("Zelda", 17, "Legend of Zelda", "female", 1985, "Melee", 85, false, false, false, false, false, false));
characters.push(new Character("Dr. Mario", 18, "Super Mario Bros.", "male", 1990, "Melee", 98, false, false, false, false, false, false));
characters.push(new Character("Pichu", 19, "Pokemon", "male", 1999, "Melee", 62, false, false, false, false, false, true));
characters.push(new Character("Falco", 20, "Star Fox", "male", 1993, "Melee", 82, false, false, false, false, false, true));
characters.push(new Character("Marth", 21, "Fire Emblem", "male", 1990, "Melee", 90, false, true, false, false, false, false));
characters.push(new Character("Lucina", 21.5, "Fire Emblem", "female", 2012, "Smash 4", 90, false, true, false, false, false, false));
characters.push(new Character("Young Link", 22, "Legend of Zelda", "male", 1998, "Melee", 88, false, true, false, false, false, false));
characters.push(new Character("Ganondorf", 23, "Legend of Zelda", "male", 1998, "Melee", 118, false, true, true, false, false, false));
characters.push(new Character("Mewtwo", 24, "Pokemon", "neither", 1996, "Melee", 79, true, false, true, false, false, true));
characters.push(new Character("Roy", 25, "Fire Emblem", "male", 2002, "Melee", 95, true, true, false, false, false, false));
characters.push(new Character("Chrom", 25.5, "Fire Emblem", "male", 2012, "Melee", 95, false, true, false, false, false, false));
characters.push(new Character("Mr. Game & Watch", 26, "Game & Watch", "male", 1980, "Melee", 75, false, false, false, false, false, false));
characters.push(new Character("Meta Knight", 27, "Kirby", "male", 1993, "Brawl", 80, false, true, true, false, false, true));
characters.push(new Character("Pit", 28, "Kid Icarus", "male", 1986, "Brawl", 96, false, true, false, false, false, false));
characters.push(new Character("Dark Pit", 28.5, "Kid Icarus", "male", 2012, "Smash 4", 96, false, true, true, false, false, false));
characters.push(new Character("Zero Suit Samus", 29, "Metroid", "female", 2004, "Brawl", 80, false, false, false, false, false, false));
characters.push(new Character("Wario", 30, "Warioware", "male", 1992, "Brawl", 107, false, false, true, false, false, false));
characters.push(new Character("Snake", 31, "Metal Gear", "male", 1987, "Brawl", 106, false, false, false, true, false, false));
characters.push(new Character("Ike", 32, "Fire Emblem", "male", 2005, "Brawl", 107, false, true, false, false, false, false));
characters.push(new Character("Pokemon Trainer", 34, "Pokemon", "both", 1996, "Brawl", 98, false, false, false, false, true, false));
characters.push(new Character("Diddy Kong", 36, "Donkey Kong", "male", 1994, "Brawl", 90, false, false, false, false, false, true));
characters.push(new Character("Lucas", 37, "Earthbound", "male", 2006, "Brawl", 94, true, false, false, false, false, false));
characters.push(new Character("Sonic", 38, "Sonic", "male", 1991, "Brawl", 86, false, false, false, true, false, true));
characters.push(new Character("King Dedede", 39, "Kirby", "male", 1992, "Brawl", 127, false, false, true, false, false, true));
characters.push(new Character("Olimar", 40, "Pikmin", "male", 2001, "Brawl", 79, false, false, false, false, true, false));
characters.push(new Character("Lucario", 41, "Pokemon", "male", 2006, "Brawl", 92, false, false, false, false, false, true));
characters.push(new Character("R.O.B.", 42, "Other", "neither", 1985, "Brawl", 106, false, false, false, false, false, true));
characters.push(new Character("Toon Link", 43, "Legend of Zelda", "male", 2002, "Brawl", 91, false, true, false, false, false, false));
characters.push(new Character("Wolf", 44, "Star Fox", "male", 1997, "Brawl", 92, false, false, true, false, false, true));
characters.push(new Character("Villager", 45, "Animal Crossing", "both", 2001, "Smash 4", 92, false, false, false, false, true, false));
characters.push(new Character("Mega Man", 46, "Mega Man", "male", 1987, "Smash 4", 102, false, false, false, true, false, true));
characters.push(new Character("Wii Fit Trainer", 47, "Wii Fit", "both", 2007, "Smash 4", 96, false, false, false, false, true, false));
characters.push(new Character("Rosalina & Luma", 48, "Super Mario Bros.", "female", 2007, "Smash 4", 82, false, false, false, false, true, false));
characters.push(new Character("Little Mac", 49, "Punch-Out", "male", 1983, "Smash 4", 87, false, false, false, false, false, false));
characters.push(new Character("Greninja", 50, "Pokemon", "male", 2013, "Smash 4", 88, false, false, false, false, false, true));
characters.push(new Character("Mii Brawler", 51, "Other", "both", 2014, "Smash 4", 94, false, false, false, false, true, false));
characters.push(new Character("Mii Swordfighter", 52, "Other", "both", 2014, "Smash 4", 100, false, true, false, false, true, false));
characters.push(new Character("Mii Gunner", 53, "Other", "both", 2014, "Smash 4", 104, false, false, false, false, true, false));
characters.push(new Character("Palutena", 54, "Kid Icarus", "female", 1986, "Smash 4", 91, false, false, false, false, false, false));
characters.push(new Character("PAC-MAN", 55, "PAC-MAN", "male", 1980, "Smash 4", 95, false, false, false, true, false, true));
characters.push(new Character("Robin", 56, "Fire Emblem", "both", 2012, "Smash 4", 95, false, true, false, false, true, false));
characters.push(new Character("Shulk", 57, "Xenoblade Chronicles", "male", 2010, "Smash 4", 97, false, true, false, false, false, false));
characters.push(new Character("Bowser Jr.", 58, "Super Mario Bros.", "both", 2002, "Smash 4", 108, false, false, true, false, true, true));
characters.push(new Character("Duck Hunt", 59, "Other", "both", 1984, "Smash 4", 86, false, false, false, false, true, true));
characters.push(new Character("Ryu", 60, "Street Fighter", "male", 1987, "Smash 4", 103, true, false, false, true, false, false));
characters.push(new Character("Ken", 60.5, "Street Fighter", "male", 1987, "Ultimate", 103, false, false, false, true, false, false));
characters.push(new Character("Cloud", 61, "Final Fantasy", "male", 1997, "Smash 4", 100, true, true, false, true, false, false));
characters.push(new Character("Corrin", 62, "Fire Emblem", "both", 2015, "Smash 4", 98, true, true, false, false, true, false));
characters.push(new Character("Bayonetta", 63, "Bayonetta", "female", 2009, "Smash 4", 81, true, false, true, true, true, false));
characters.push(new Character("Inkling", 64, "Splatoon", "both", 2015, "Ultimate", 94, false, false, false, false, true, false));
characters.push(new Character("Ridley", 65, "Metroid", "male", 1986, "Ultimate", 107, false, false, true, false, false, true));
characters.push(new Character("Simon", 66, "Castlevania", "male", 1986, "Ultimate", 107, false, false, false, true, false, false));
characters.push(new Character("Richter", 66.5, "Castlevania", "male", 1993, "Ultimate", 107, false, false, false, true, false, false));
characters.push(new Character("King K. Rool", 67, "Donkey Kong", "male", 1994, "Ultimate", 133, false, false, true, false, false, true));
characters.push(new Character("Isabelle", 68, "Animal Crossing", "female", 2012, "Ultimate", 88, false, false, false, false, false, true));
characters.push(new Character("Incineroar", 69, "Pokemon", "male", 2016, "Ultimate", 116, false, false, false, false, false, true));
characters.push(new Character("Piranha Plant", 70, "Super Mario Bros.", "neither", 1985, "Ultimate", 112, true, false, true, false, false, true));
characters.push(new Character("Joker", 71, "Persona", "male", 2016, "Ultimate", 93, true, true, false, true, true, false));
characters.push(new Character("Hero", 72, "Dragon Quest", "male", 2017, "Ultimate", 101, true, true, false, true, true, false));
characters.push(new Character("Banjo & Kazooie", 73, "Banjo-Kazooie", "both", 1998, "Ultimate", 106, true, false, false, true, true, true));
characters.push(new Character("Terry", 74, "Fatal Fury", "male", 1991, "Ultimate", 108, true, false, false, true, false, false));
characters.push(new Character("Byleth", 75, "Fire Emblem", "both", 2019, "Ultimate", 97, true, true, false, false, true, false));

for (var i = 0; i < characters.length; i++)
{
	addElement("option", characters[i].name, "removed-chars", [["id",characters[i].name.toLowerCase()],["value",characters[i].name]])
}

allCharReference = []
for (var i = 0; i < characters.length; i++)
{
	allCharReference.push(characters[i]);
}

for (var i = 0; i < characters.length; i++)
{
	if (removedChars.includes(characters[i].name))
	{
		characters.splice(i, 1);
	}
}

var allCharSeries = []
for (var i = 0; i < characters.length; i++)
{
	if (findInArray(allCharSeries, characters[i].series) == NOT_FOUND)
	{
		allCharSeries.push(characters[i].series)
	}
}

stages = []
//Assemble the stage data                                              dlc    large  3rd party
stages.push(new Stage("Battlefield", 0, "Super Smash Bros.", "Ultimate", 0, false, false, false))
stages.push(new Stage("Final Destination", 1, "Super Smash Bros.", "Ultimate", 0, false, false, false))
stages.push(new Stage("Big Battlefield", 2, "Super Smash Bros.", "Ultimate", 5, false, true, false))
stages.push(new Stage("Peach's Castle", 3, "Super Mario Bros.", "Smash 64", 5, true, false, false))
stages.push(new Stage("Kongo Jungle", 4, "Donkey Kong", "Smash 64", 5, true, false, false))
stages.push(new Stage("Hyrule Castle", 5, "Legend of Zelda", "Smash 64", 5, true, true, false))
stages.push(new Stage("Super Happy Tree", 6, "Yoshi's Island", "Smash 64", 5, false, false, false))
stages.push(new Stage("Dream Land", 7, "Kirby", "Smash 64", 5, true, false, false))
stages.push(new Stage("Saffron City", 8, "Pokemon", "Smash 64", 5, false, false, false))
stages.push(new Stage("Mushroom Kingdom", 9, "Super Mario Bros.", "Smash 64", 5, false, false, false))
stages.push(new Stage("Princess Peach's Castle", 10, "Super Mario Bros.", "Melee", 5, false, true, false))
stages.push(new Stage("Rainbow Cruise", 11, "Super Mario Bros.", "Melee", 4, false, false, false))
stages.push(new Stage("Kongo Falls", 12, "Donkey Kong", "Melee", 5, false, false, false))
stages.push(new Stage("Jungle Japes", 13, "Donkey Kong", "Melee", 5, false, false, false))
stages.push(new Stage("Great Bay", 14, "Legend of Zelda", "Melee", 5, false, false, false))
stages.push(new Stage("Temple", 15, "Legend of Zelda", "Melee", 5, false, true, false))
stages.push(new Stage("Brinstar", 16, "Metroid", "Melee", 5, false, false, false))
stages.push(new Stage("Yoshi's Island (Melee)", 17, "Yoshi's Island", "Melee", 5, false, false, false))
stages.push(new Stage("Yoshi's Story", 18, "Yoshi's Island", "Melee", 2, false, false, false))
stages.push(new Stage("Fountain of Dreams", 19, "Kirby", "Melee", 5, false, false, false))
stages.push(new Stage("Green Greens", 20, "Kirby", "Melee", 5, false, false, false))
stages.push(new Stage("Corneria", 21, "Star Fox", "Melee", 5, false, true, false))
stages.push(new Stage("Venom", 22, "Star Fox", "Melee", 5, false, true, false))
stages.push(new Stage("Pokemon Stadium", 23, "Pokemon", "Melee", 3, false, false, false))
stages.push(new Stage("Onett", 24, "Earthbound", "Melee", 5, false, true, false))
stages.push(new Stage("Mushroom Kingdom II", 25, "Super Mario Bros.", "Melee", 5, false, false, false))
stages.push(new Stage("Brinstar Depths", 26, "Metroid", "Melee", 5, false, false, false))
stages.push(new Stage("Big Blue", 27, "F-Zero", "Melee", 5, false, false, false))
stages.push(new Stage("Fourside", 28,  "Earthbound", "Melee", 5, false, true, false))
stages.push(new Stage("Delfino Plaza", 29, "Super Mario Bros.", "Brawl", 5, false, false, false))
stages.push(new Stage("Mushroomy Kingdom", 30, "Super Mario Bros.", "Brawl", 5, false, false, false))
stages.push(new Stage("Figure-8 Circuit", 31, "Super Mario Bros.", "Brawl", 5, false, false, false))
stages.push(new Stage("Warioware, Inc.", 32, "Warioware", "Brawl", 3, false, false, false))
stages.push(new Stage("Bridge of Eldin", 33, "Legend of Zelda", "Brawl", 5, false, true, false))
stages.push(new Stage("Norfair", 34, "Metroid", "Brawl", 5, false, false, false))
stages.push(new Stage("Frigate Orpheon", 35, "Metroid", "Brawl", 4, false, false, false))
stages.push(new Stage("Yoshi's Island", 36, "Yoshi's Island", "Brawl", 3, false, false, false))
stages.push(new Stage("Halberd", 37, "Kirby", "Brawl", 4, false, false, false))
stages.push(new Stage("Lylat Cruise", 38, "Star Fox", "Brawl", 2, false, false, false))
stages.push(new Stage("Pokemon Stadium 2", 39, "Pokemon", "Brawl", 0, false, false, false))
stages.push(new Stage("Port Town Aero Dive", 40, "F-Zero", "Brawl", 5, false, false, false))
stages.push(new Stage("Castle Siege", 41, "Fire Emblem", "Brawl", 4, false, false, false))
stages.push(new Stage("Distant Planet", 42, "Pikmin", "Brawl", 5, false, false, false))
stages.push(new Stage("Smashville", 43, "Animal Crossing", "Brawl", 0, false, false, false))
stages.push(new Stage("New Pork City", 44, "Earthbound", "Brawl", 5, false, true, false))
stages.push(new Stage("Summit", 45, "Other", "Brawl", 5, false, false, false))
stages.push(new Stage("Skyworld", 46, "Kid Icarus", "Brawl", 5, false, false, false))
stages.push(new Stage("Shadow Moses Island", 47, "Metal Gear", "Brawl", 5, false, false, true))
stages.push(new Stage("Luigi's Mansion", 48, "Super Mario Bros.", "Brawl", 5, false, false, false))
stages.push(new Stage("Pirate Ship", 49, "Legend of Zelda", "Brawl", 5, true, false, false))
stages.push(new Stage("Spear Pillar", 50, "Pokemon", "Brawl", 5, false, false, false))
stages.push(new Stage("75m", 51, "Donkey Kong", "Brawl", 5, false, true, false))
stages.push(new Stage("Mario Bros.", 52, "Super Mario Bros.", "Brawl", 5, false, true, false))
stages.push(new Stage("Hanenbow", 53, "Other", "Brawl", 5, false, true, false))
stages.push(new Stage("Green Hill Zone", 54, "Sonic", "Brawl", 5, false, false, true))
stages.push(new Stage("3D Land", 55, "Super Mario Bros.", "3DS", 5, false, false, false))
stages.push(new Stage("Golden Plains", 56, "Super Mario Bros.", "3DS", 5, false, false, false))
stages.push(new Stage("Paper Mario", 57, "Super Mario Bros.", "3DS", 5, false, false, false))
stages.push(new Stage("Gerudo Valley", 58, "Legend of Zelda", "3DS", 5, false, false, false))
stages.push(new Stage("Spirit Train", 59, "Legend of Zelda", "3DS", 5, false, false, false))
stages.push(new Stage("Dream Land GB", 60, "Kirby", "3DS", 5, false, false, false))
stages.push(new Stage("Unova Pokemon League", 61, "Pokemon", "3DS", 3, false, false, false))
stages.push(new Stage("Prism Tower", 62, "Pokemon", "3DS", 5, false, false, false))
stages.push(new Stage("Mute City SNES", 63, "F-Zero", "3DS", 5, false, false, false))
stages.push(new Stage("Magicant", 64, "Earthbound", "3DS", 5, false, false, false))
stages.push(new Stage("Arena Ferox", 65, "Fire Emblem", "3DS", 5, false, false, false))
stages.push(new Stage("Reset Bomb Forest", 66, "Kid Icarus", "3DS", 5, false, false, false))
stages.push(new Stage("Tortimer Island", 67, "Animal Crossing", "3DS", 5, false, true, false))
stages.push(new Stage("Balloon Fight", 68, "Other", "3DS", 5, false, false, false))
stages.push(new Stage("Living Room", 69, "Other", "3DS", 5, false, true, false))
stages.push(new Stage("Find Mii", 70, "Other", "3DS", 5, false, false, false))
stages.push(new Stage("Tomodachi Life", 71, "Other", "3DS", 5, false, false, false))
stages.push(new Stage("PictoChat 2", 72, "Other", "3DS", 5, false, false, false))
stages.push(new Stage("Mushroom Kingdom U", 73, "Super Mario Bros.", "Wii U", 5, false, true, false))
stages.push(new Stage("Mario Galaxy", 74, "Super Mario Bros.", "Wii U", 5, false, true, false))
stages.push(new Stage("Mario Circuit", 75, "Super Mario Bros.", "Wii U", 5, false, false, false))
stages.push(new Stage("Skyloft", 76, "Legend of Zelda", "Wii U", 3, false, true, false))
stages.push(new Stage("The Great Cave Offensive", 77, "Kirby", "Wii U", 5, false, true, false))
stages.push(new Stage("Kalos Pokemon League", 78, "Pokemon", "Wii U", 1, false, false, false))
stages.push(new Stage("Coliseum", 79, "Fire Emblem", "Wii U", 5, false, true, false))
stages.push(new Stage("Flat Zone X", 80, "Game & Watch", "Wii U", 5, false, false, false))
stages.push(new Stage("Palutena's Temple", 81, "Kid Icarus", "Wii U", 5, false, true, false))
stages.push(new Stage("Gamer", 82, "Warioware", "Wii U", 5, false, false, false))
stages.push(new Stage("Garden of Hope", 83, "Pikmin", "Wii U", 5, false, true, false))
stages.push(new Stage("Town and City", 84, "Animal Crossing", "Wii U", 0, false, false, false))
stages.push(new Stage("Wii Fit Studio", 85, "Wii Fit", "Wii U", 5, false, true, false))
stages.push(new Stage("Boxing Ring", 86, "Punch-Out", "Wii U", 5, false, true, false))
stages.push(new Stage("Gaur Plain", 87, "Xenoblade Chronicles", "Wii U", 5, false, true, false))
stages.push(new Stage("Duck Hunt", 88, "Other", "Wii U", 5, false, false, false))
stages.push(new Stage("Wrecking Crew", 89, "Other", "Wii U", 5, false, true, false))
stages.push(new Stage("Pilotwings", 90, "Other", "Wii U", 5, false, false, false))
stages.push(new Stage("Wuhu Island", 91, "Other", "Wii U", 4, false, false, false))
stages.push(new Stage("Windy Hill Zone", 92, "Sonic", "Wii U", 5, false, true, true))
stages.push(new Stage("Wily Castle", 93, "Mega Man", "Wii U", 4, false, false, true))
stages.push(new Stage("PAC-LAND", 94, "PAC-MAN", "Wii U", 5, false, true, true))
stages.push(new Stage("Super Mario Maker", 95, "Super Mario Bros.", "Wii U", 5, true, false, false))
stages.push(new Stage("Suzaku Castle", 96, "Street Fighter", "Wii U", 5, true, true, true))
stages.push(new Stage("Midgar", 97, "Final Fantasy", "Wii U", 5, true, false, true))
stages.push(new Stage("Umbra Clock Tower", 98, "Bayonetta", "Wii U", 5, true, true, true))
stages.push(new Stage("New Donk City Hall", 99, "Super Mario Bros.", "Ultimate", 5, false, true, false))
stages.push(new Stage("Great Plateau Tower", 100, "Legend of Zelda", "Ultimate", 5, false, false, false))
stages.push(new Stage("Moray Towers", 101, "Splatoon", "Ultimate", 5, false, true, false))
stages.push(new Stage("Dracula's Castle", 102, "Castlevania", "Ultimate", 5, false, true, false))
stages.push(new Stage("Mementos", 103, "Persona", "Ultimate", 4, true, true, true))
stages.push(new Stage("Yggdrasil's Altar", 104, "Dragon Quest", "Ultimate", 3, true, true, true))
stages.push(new Stage("Spiral Mountain", 105, "Banjo-Kazooie", "Ultimate", 5, true, false, true))
stages.push(new Stage("King of Fighters Stadium", 106, "Fatal Fury", "Ultimate", 5, true, false, true))
stages.push(new Stage("Garreg Mach Monastery", 107, "Fire Emblem", "Ultimate", 5, true, false, false))

for (var i = 0; i < stages.length; i++)
{
	addElement("option", stages[i].name, "removed-stages", [["id",stages[i].name.toLowerCase()],["value",stages[i].name]])
}

allStageReference = []
for (var i = 0; i < stages.length; i++)
{
	allStageReference.push(stages[i]);
}

for (var i = 0; i < stages.length; i++)
{
	if (removedStages.includes(stages[i].name))
	{
		stages.splice(i, 1);
	}
}

//make a variable for the number of unique stages
var totalUniqueStages = stages.length;

//add BF and Ω forms if the player wants them added
if (includeAltForms)
{
	for (var i = 0; i<totalUniqueStages; i++)
	{
		stages.push(new Stage("BF "+stages[i].name, stages[i].index+totalUniqueStages, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
	}
	for (var i = 0; i<totalUniqueStages; i++)
	{
		stages.push(new Stage("Ω "+stages[i].name, stages[i].index+totalUniqueStages*2, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
	}
	stages.splice(stages[findNameInArray(stages, "BF Battlefield"), 1]);
	stages.splice(stages[findNameInArray(stages, "BF Big Battlefield"), 1]);
	stages.splice(stages[findNameInArray(stages, "Ω Final Destination"), 1]);
	stages.splice(stages[findNameInArray(stages, "Ω Big Battlefield"), 1]);
}

var allStageSeries = []
for (var i = 0; i < stages.length; i++)
{
	if (findInArray(allStageSeries, stages[i].series) == NOT_FOUND)
	{
		allStageSeries.push(stages[i].series)
	}
}

//Make it so that buttons don't refresh the page
document.getElementById("add-player-btn").addEventListener("click", function(event){
    event.preventDefault();
	addPlayer();
});

document.getElementById("remove-player-btn").addEventListener("click", function(event){
    event.preventDefault();
	removePlayer();
});

document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
	generateResults();
});

document.getElementById("open-button").addEventListener("click", function(event){
    event.preventDefault();
	openForm();
});

document.getElementById("btn-cancel").addEventListener("click", function(event){
    event.preventDefault();
	closeForm();
});

function addElement(tag, content, parent, attributes) {
	// create a new element 
	var newElement = document.createElement(tag);
	for (var attr = 0; attr < attributes.length; attr++)
	{
		newElement.setAttribute(attributes[attr][0], attributes[attr][1])
	}
	newElement.innerHTML = content;
	// add the newly created element and its content into the DOM 
	var parentElement = document.getElementById(parent);
	parentElement.appendChild(newElement);
}

function getSelected(selectId) {
	var selected = [];
	for (var option of document.getElementById(selectId).options) {
		if (option.selected) {
			selected.push(option.value);
		}
	}
	return selected;
}

function openForm() {
  document.getElementById("advanced-options").style.display = "block";
}

function closeForm() {
  document.getElementById("advanced-options").style.display = "none";
}

function playerNames()
{
	var players = [];
	for (var playerNum = 0; playerNum < numOfPlayers; playerNum++)
	{
		players.push(document.getElementById("p"+(playerNum+1)+"-name-box").value);
	}
	return(players);
}

function randomInt(min, max)
{
	var range = max-min+1;
	return Math.floor(Math.random()*range)+min;
}

function addPlayer()
{
	if (numOfPlayers < maxPlayers)
	{
		numOfPlayers++;
		addElement("div", "", "player-list", [["id", "p"+(numOfPlayers)+"-name"]]);
		addElement("input", "", "p"+(numOfPlayers)+"-name", [["type", "text"],["id", "p"+(numOfPlayers)+"-name-box"],["value", "P"+(numOfPlayers)]]);
	}
}

function removePlayer()
{
	if(numOfPlayers > 1)
	{
		document.getElementById("p"+(numOfPlayers)+"-name").remove();
		numOfPlayers--;
	}
}

function updateCharMode()
{
	charMode = document.getElementById("char-theme-select").value;
	document.getElementById("char-theme-description").innerHTML = charModeDescriptions[findInArray(charModes, charMode)];
	if (charMode == "series")
	{
		addElement("select", "Select Series", "character-theme", [["id", "char-series-select"], ["multiple", "multiple"], ["onchange", "updateCharSeries()"]]);
		addElement("optgroup", "", "char-series-select", [["disabled",null],["hidden",null]])
		addElement("option", "--Select Series--", "char-series-select", [["value",null]])
		for (var i = 0; i < allCharSeries.length; i++)
		{
			addElement("option", allCharSeries[i], "char-series-select", [["id",allCharSeries[i].toLowerCase()],["value",allCharSeries[i]]])
		}
		if (!hasTouchScreen)
		{
			addElement("p", "(CTRl+Click to select multiple.)", "character-theme", [["id", "multiple-reminder-char"]]);
		}
	} else {
		if (document.getElementById("char-series-select"))
		{
			document.getElementById("char-series-select").remove();
			document.getElementById("multiple-reminder-char").remove();
		}
	}
	if (charMode == "random")
	{
		charMode = charModes[randomInt(0, charModes.length-2)];
		if (charMode == "series")
		{
			var randomCharSeries = generateUniqueNums(randomInt(2, 6), 0, allCharSeries.length-1);
			for (var i = 0; i < randomCharSeries.length; i++)
			{
				charSeries.push(allCharSeries[randomCharSeries[i]]);
			}
			alert("Your theme is characters from the following series: "+charSeries+".")
		}
		else {
			alert("Your theme is "+charMode.toLowerCase()+" characters!")
		}
	}
}

function updateNumOfChars()
{
	numOfChars = document.getElementById("char-select-num").value;
}

function updateStageMode()
{
	stageMode = document.getElementById("stage-theme-select").value;
	document.getElementById("stage-theme-description").innerHTML = stageModeDescriptions[findInArray(stageModes, stageMode)];
	if (stageMode == "series")
	{
		addElement("select", "Select Series", "stage-theme", [["id", "stage-series-select"], ["multiple", "multiple"], ["onchange", "updateStageSeries()"]]);
		addElement("optgroup", "", "stage-series-select", [["disabled",null],["hidden",null]])
		addElement("option", "--Select Series--", "stage-series-select", [["value",null]])
		for (var i = 0; i < allStageSeries.length; i++)
		{
			addElement("option", allStageSeries[i], "stage-series-select", [["id",allStageSeries[i].toLowerCase()],["value",allStageSeries[i]]])
		}
		if (!hasTouchScreen)
		{
			addElement("p", "(CTRl+Click to select multiple.)", "stage-theme", [["id", "multiple-reminder-stage"]])
		}
	} else {
		if (document.getElementById("stage-series-select"))
		{
			document.getElementById("stage-series-select").remove();
			document.getElementById("multiple-reminder-stage").remove();
		}
	}
	if (stageMode == "random")
	{
		if (includeAltForms)
		{
			stageMode = stageModes[randomInt(0, stageModes.length-2)];
		}
		else
		{
			stageMode = stageModes[randomInt(0, stageModes.length-8)];
		}
		if (stageMode == "series")
		{
			var randomStageSeries = generateUniqueNums(randomInt(2, 6), 0, allStageSeries.length-1);
			for (var i = 0; i < randomStageSeries.length; i++)
			{
				stageSeries.push(allStageSeries[randomStageSeries[i]]);
			}
			alert("Your theme is stages from the following series: "+stageSeries+".")
		}
		else {
			alert("Your theme is "+stageMode.toLowerCase()+" stages!")
		}
	}
}

//update how many stage options will be generated
function updateNumOfStages()
{
	numOfStages = document.getElementById("stage-select-num").value;
}

//update what series the stages will be selected from
function updateCharSeries()
{
	charSeries = getSelected("char-series-select");
}

//update what series the stages will be selected from
function updateStageSeries()
{
	stageSeries = getSelected("stage-series-select");
}

//update what the maximum allowed amount of players is
function updateMaxPlayers()
{
	maxPlayers = document.getElementById("max-player-setting").value;
}

//update the multicolored results
function updateColors()
{
	includeColorfulResults = document.getElementById("color-toggle").checked;
	if (includeColorfulResults)
	{
		for (var i = 0; i < numOfPlayers; i++)
		{
			document.getElementById("p"+(i+1)+"-result").style.color = playerColors[i%8];
		}
	}
	else
	{
		for (var i = 0; i < numOfPlayers; i++)
		{
			document.getElementById("p"+(i+1)+"-result").style.color = "#ffffff";
		}
	}
}

//update various menu options based on whether or not the user wants BF and Omega forms of stages
function updateAltForms()
{
	includeAltForms = document.getElementById("alt-stage-toggle").checked;
	if (includeAltForms)
	{
		document.getElementById("random-stage").remove();
		addElement("option", "Normal", "stage-theme-select", [["id","normal-stages"], ["value", "normal"]]);
		addElement("option", "Battlefield", "stage-theme-select", [["id","battlefield-stages"], ["value", "battlefield"]]);
		addElement("option", "Omega", "stage-theme-select", [["id","omega-stages"], ["value", "omega"]]);
		addElement("option", "Non-normal", "stage-theme-select", [["id","non-normal"], ["value", "non-normal"]]);
		addElement("option", "Non-Battlefield", "stage-theme-select", [["id","non-battlefield"], ["value", "non-battlefield"]]);
		addElement("option", "Non-Omega", "stage-theme-select", [["id","non-omega"], ["value", "non-omega"]]);
		addElement("option", "Random...", "stage-theme-select", [["id","random-stage"], ["value", "random"]]);
		for (var i = 0; i<totalUniqueStages; i++)
		{
			stages.push(new Stage("BF "+stages[i].name, stages[i].index+totalUniqueStages, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
		}
		for (var i = 0; i<totalUniqueStages; i++)
		{
			stages.push(new Stage("Ω "+stages[i].name, stages[i].index+totalUniqueStages*2, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
		}
		stages.splice(findNameInArray(stages, "BF Battlefield"), 1);
		stages.splice(findNameInArray(stages, "BF Big Battlefield"), 1);
		stages.splice(findNameInArray(stages, "Ω Final Destination"), 1);
		stages.splice(findNameInArray(stages, "Ω Big Battlefield"), 1);
	}
	else
	{
		document.getElementById("normal-stages").remove();
		document.getElementById("battlefield-stages").remove();
		document.getElementById("omega-stages").remove();
		document.getElementById("non-normal").remove();
		document.getElementById("non-battlefield").remove();
		document.getElementById("non-omega").remove();
		for (var i = 0; i < totalUniqueStages*2; i++)
		{
			stages.pop();
		}
	}
}

//Update the list of removed characters
function updateRemovedChars()
{
	removedChars = getSelected("removed-chars");
	for (var i = 0; i < characters.length; i++)
	{
		if (removedChars.includes(characters[i].name))
		{
			characters.splice(i, 1);
		}
	}
	for (var i = 0; i < allCharReference.length; i++)
	{
		if(!removedChars.includes(allCharReference[i].name) && findNameInArray(characters, allCharReference[i].name) == NOT_FOUND)
		{
			characters.push(allCharReference[i]);
		}
	}
}

//Update the list of removed stages
function updateRemovedStages()
{
	removedStages = getSelected("removed-stages");
	for (var i = 0; i < stages.length; i++)
	{
		if (removedStages.includes(stages[i].name))
		{
			stages.splice(i, 1);
		}
	}
	//Add in previously removed stages
	for (var i = 0; i < allStageReference.length; i++)
	{
		if(!removedStages.includes(allStageReference[i].name) && findNameInArray(stages, allStageReference[i].name) == NOT_FOUND)
		{
			var stageLocation = stages.length-1;
			if (allStageReference[i].index < stages[0].index)
			{
				stages.unshift(allStageReference[i]);
			}
			else if (allStageReference[i].index > stages[stages.length-1].index)
			{
				stages.push(allStageReference[i]);
			}
			else {
				while (stages[stageLocation-1].index > allStageReference[i].index)
				{
					stageLocation--;
				}
				stages.splice(stageLocation, 0, allStageReference[i]);
			}
		}
	}
}

//update the strictness of tournament-legal stages
function updateLegality()
{
	legalityLevel = document.getElementById("legality-control").value;
}

//returns where a value is in an array
function findInArray(arr, val)
{
	for (var i = 0; i < arr.length; i++)
	{
		if (val == arr[i])
		{
			return i;
		}
	}
	return NOT_FOUND;
}

function findNameInArray(arr, val)
{
	for (var i = 0; i < arr.length; i++)
	{
		if (val == arr[i].name)
		{
			return i;
		}
	}
	return NOT_FOUND;
}


//generates a list of unique randomly generated numbers
function generateUniqueNums(n,lo,hi)
{
	generated = [];
	for (var i = 0; i < n; i++)
	{
		var newNum;
		do
		{
			newNum = randomInt(lo, hi);
		} while (findInArray(generated, newNum) != NOT_FOUND)
		generated.push(newNum);
	}	
	return generated;
}

//generates all legal characters based on what mode you want to play
function legalChars(mode)
{
	allowed = [];
	for (var i = 0; i < characters.length; i++)
	{
		if (mode == "no-theme")
		{
			allowed.push(i);
		}
		if (mode == "male" && characters[i].gender == "male")
		{
			allowed.push(i);
		}
		if (mode == "female" && characters[i].gender == "female")
		{
			allowed.push(i);
		}
		if (mode == "non-human" && characters[i].isNonHuman)
		{
			allowed.push(i);
		}
		if (mode == "villain" && characters[i].isVillain)
		{
			allowed.push(i);
		}
		if (mode == "smash-64" && characters[i].firstSmashAppearance == "Smash 64")
		{
			allowed.push(i);
		}
		if (mode == "melee" && characters[i].firstSmashAppearance == "Melee")
		{
			allowed.push(i);
		}
		if (mode == "brawl" && characters[i].firstSmashAppearance == "Brawl")
		{
			allowed.push(i);
		}
		if (mode == "smash-4"  && characters[i].firstSmashAppearance == "Smash 4")
		{
			allowed.push(i);
		}
		if (mode == "ultimate" && characters[i].firstSmashAppearance == "Ultimate")
		{
			allowed.push(i);
		}
		if (mode == "dlc" && characters[i].dlc)
		{
			allowed.push(i);
		}
		if (mode == "sword" && characters[i].hasSword)
		{
			allowed.push(i);
		}
		if (mode == "series" && charSeries.includes(characters[i].series))
		{
			allowed.push(i);
		}
		if (mode == "third-party" && characters[i].isThirdParty)
		{
			allowed.push(i);
		}
		if (mode == "light" && characters[i].weight <= lightweightMax)
		{
			allowed.push(i);
		}
		if (mode == "heavy" && characters[i].weight >= heavyWeightMin)
		{
			allowed.push(i);
		}
		if (mode == "1980s" && Math.floor(characters[i].firstAppearanceYear/10)%10 == 8)
		{
			allowed.push(i);
		}
		if (mode == "1990s" && Math.floor(characters[i].firstAppearanceYear/10)%10 == 9)
		{
			allowed.push(i);
		}
		if (mode == "2000s" && Math.floor(characters[i].firstAppearanceYear/10)%10 == 0)
		{
			allowed.push(i);
		}
		if (mode == "2010s" && Math.floor(characters[i].firstAppearanceYear/10)%10 == 1)
		{
			allowed.push(i);
		}
		if (mode == "multislot" && characters[i].isMultislot)
		{
			allowed.push(i);
		}
	}
	return allowed;
}
//generates all legal stages based on what mode you want to play
function legalStages(mode)
{
	allowed = [];
	for (var i = 0; i < stages.length; i++)
	{
		if (mode == "no-theme")
		{
			allowed.push(i);
		}
		if (mode == "normal" && i < totalUniqueStages)
		{
			allowed.push(i);
		}
		if (mode == "battlefield" && i < totalUniqueStages)
		{
			allowed.push(i+totalUniqueStages);
		}
		if (mode == "omega" && i < totalUniqueStages)
		{
			allowed.push(i+totalUniqueStages*2);
		}
		if (mode == "non-normal" && i < totalUniqueStages)
		{
			allowed.push(i+totalUniqueStages);
			allowed.push(i+totalUniqueStages*2);
		}
		if (mode == "non-battlefield" && i < totalUniqueStages)
		{
			allowed.push(i);
			allowed.push(i+totalUniqueStages*2);
		}
		if (mode == "non-omega" && i < totalUniqueStages)
		{
			allowed.push(i);
			allowed.push(i+totalUniqueStages);
		}
		if (mode == "smash-64" && stages[i].firstSmashAppearance == "Smash 64")
		{
			allowed.push(i);
		}
		if (mode == "melee" && stages[i].firstSmashAppearance == "Melee")
		{
			allowed.push(i);
		}
		if (mode == "brawl" && stages[i].firstSmashAppearance == "Brawl")
		{
			allowed.push(i);
		}
		if (mode == "3ds" && stages[i].firstSmashAppearance == "3DS")
		{
			allowed.push(i);
		}
		if (mode == "wii-u" && stages[i].firstSmashAppearance == "Wii U")
		{
			allowed.push(i);
		}
		if (mode == "ultimate" && stages[i].firstSmashAppearance == "Ultimate")
		{
			allowed.push(i);
		}
		if (mode == "series" && stageSeries.includes(stages[i].series))
		{
			allowed.push(i);
		}
		if (mode == "dlc" && stages[i].dlc)
		{
			allowed.push(i);
		}
		if (mode == "tournament-legal" && stages[i].legality <= legalityLevel)
		{
			allowed.push(i);
		}
		if (mode == "large" && stages[i].isLarge)
		{
			allowed.push(i);
		}
		if (mode == "third-party" && stages[i].isThirdParty)
		{
			allowed.push(i);
		}
	}
	return allowed;
}

function generateResults()
{
	updateNumOfChars();
	updateNumOfStages();
	var playerList = playerNames();
	var charsInMode = legalChars(charMode);
	var stagesInMode = legalStages(stageMode);
	resultLists = []
	if (numOfChars > charsInMode.length)
	{
		numOfChars = charsInMode.length;
	}
	if (numOfStages > stagesInMode.length)
	{
		numOfStages = stagesInMode.length;
	}
	for (var i = 0; i < numOfPlayers; i++)
	{
		resultLists.push(generateUniqueNums(numOfChars,0,charsInMode.length-1));
	}
	resultLists.push(generateUniqueNums(numOfStages,0,stagesInMode.length-1));
	document.getElementById("results-text").innerHTML = "Results:";
	for (var player = 0; player < numOfPlayers; player++)
	{
		if (numOfChars == 1)
		{
			addElement("p", playerList[player]+", your character is:", "results-text", [["id", "p"+(player+1)+"-result"], ["class", "result-line"]]);
		}
		else
		{
			addElement("p", playerList[player]+", your choices are:", "results-text", [["id", "p"+(player+1)+"-result"], ["class", "result-line"]]);
		}
		for (var char = 0; char < numOfChars; char++)
		{
			if (char == 0)
			{
				document.getElementById("p"+(player+1)+"-result").innerHTML += " "+characters[charsInMode[resultLists[player][char]]].name;
			}
			else
			{
				document.getElementById("p"+(player+1)+"-result").innerHTML += ", "+characters[charsInMode[resultLists[player][char]]].name;
			}
		}
	}
	if (includeColorfulResults)
	{
		for (var i = 0; i < numOfPlayers; i++)
		{
			document.getElementById("p"+(i+1)+"-result").style.color = playerColors[i%8];
		}
	}
	if (numOfStages == 1) {
		addElement("p", "Your stage is:", "results-text", [["id", "stage-result"], ["class", "result-line"]]);
	}
	else
	{
		addElement("p", "Your stage choices are:", "results-text", [["id", "stage-result"], ["class", "result-line"]]);
	}
	for (var stage = 0; stage < numOfStages; stage++)
	{
		if (stage == 0)
		{
			document.getElementById("stage-result").innerHTML += " "+stages[stagesInMode[resultLists[resultLists.length-1][stage]]].name;
		}
		else
		{
			document.getElementById("stage-result").innerHTML += ", "+stages[stagesInMode[resultLists[resultLists.length-1][stage]]].name;
		}
	}
}