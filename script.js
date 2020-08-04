//import the necessary packages

/*FUNCTIONS-This section initializes all required functions to use the randomizer. They appear in alphabetical order.*/

//adds a new custom character theme to the rules
function addCustomCharTheme()
{
	currentCharTheme++;
	charModes.splice(charModes.length-1, 1);
	charModes.push(new Theme("Custom Theme "+currentCharTheme, "Lorem ipsum dolor iset.", "name", "=", ["Mario"], -currentCharTheme));
	charModes.push(new Theme("Random", "Even I don't know what's coming...", "name", "!=", [""], charModes.length-1));
	document.getElementById("Random-char").remove();
	targetCharTheme = charModes.find(element => element.index == -(currentCharTheme));
	addElement("option", targetCharTheme.name, "char-theme-select", [["id", "custom-char-theme-"+(currentCharTheme)], ["value", targetCharTheme.name.replace("-", " ")]]);
	addElement("option", "Random...", "char-theme-select", [["id","Random-char"], ["value", "Random"]]);
	addElement("div", "", "custom-char-theme-list", [["id", "custom-char-theme-"+currentCharTheme+"-div"]]);
	addElement("button", "Custom Theme "+currentCharTheme, "custom-char-theme-"+currentCharTheme+"-div", [["class", "edit-custom-btn"],["id", "custom-char-theme-"+currentCharTheme+"-name"],["onclick", "updateSelectedCharTheme(this.id)"]]);
	document.getElementById("custom-char-theme-"+currentCharTheme+"-name").addEventListener("click", function(event){
	    event.preventDefault();
	    openCharThemeEditor();
	});
	selectedCharTheme = currentCharTheme;
	openCharThemeEditor();
}

//adds a new custom stage
function addCustomStage()
{
	currentCustomStage++;
	addElement("div", "", "custom-stage-list", [["id", "custom-stage-"+currentCustomStage], ["class", "custom-stage-div"]]);
	addElement("input", "", "custom-stage-"+currentCustomStage, [["type", "text"],["id", "custom-stage-"+currentCustomStage+"-box"],["value", "Custom Stage "+currentCustomStage],["class", "custom-stage"], ["onchange", "updateCustomStageName(this.id)"]]);
	addElement("button", "X", "custom-stage-"+currentCustomStage, [["id", "custom-stage-"+currentCustomStage+"-delete"], ["class", "delete-stage"], ["onclick", "deleteStage(this.id)"]]);
	document.getElementById("custom-stage-"+currentCustomStage+"-delete").addEventListener("click", function(event){
	    event.preventDefault();
	});
	stages.push(new Stage(document.getElementById("custom-stage-"+currentCustomStage+"-box").value, -currentCustomStage, "Super Smash Bros.", "Ultimate", 5, false, false, false));
	totalCustomStages = totalCustomStages+1;
	if (!includeCustomStages)
	{
		alert("To use this custom stage, enable \"Include Custom Stages\" in the Advanced Options menu.");
	}
}

//adds a new custom stage theme to the rules
function addCustomStageTheme()
{
	currentStageTheme++;
	stageModes.splice(stageModes.length-1, 1);
	stageModes.push(new Theme("Custom Theme "+currentStageTheme, "Lorem ipsum dolor iset.", "name", "=", ["Battlefield"], -currentStageTheme));
	stageModes.push(new Theme("Random", "It's a secret to everyone...", "name", "!=", [""], stageModes.length-1));
	document.getElementById("Random-stage").remove();
	targetStageTheme = stageModes.find(element => element.index == -(currentStageTheme));
	addElement("option", targetStageTheme.name, "stage-theme-select", [["id", "custom-stage-theme-"+(currentStageTheme)], ["value", targetStageTheme.name.replace("-", " ")]]);
	addElement("option", "Random...", "stage-theme-select", [["id","Random-stage"], ["value", "Random"]]);
	addElement("div", "", "custom-stage-theme-list", [["id", "custom-stage-theme-"+currentStageTheme+"-div"]]);
	addElement("button", "Custom Theme "+currentStageTheme, "custom-stage-theme-"+currentStageTheme+"-div", [["class", "edit-custom-btn"],["id", "custom-stage-theme-"+currentStageTheme+"-name"],["onclick", "updateSelectedStageTheme(this.id)"]]);
	document.getElementById("custom-stage-theme-"+currentStageTheme+"-name").addEventListener("click", function(event){
	    event.preventDefault();
	    openStageThemeEditor();
	});
	selectedStageTheme = currentStageTheme;
	openStageThemeEditor();
}

//adds an element into the DOM
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

//adds a new mii fighter and opens the mii editor
function addMii()
{
	miis.push(new Mii("Mii Fighter", 0, "male", false));
	characters.push(new Character("Mii Fighter", 51+((miis.length-1)/1000), "Super Smash Bros.", "male", 2014, "Ultimate", 100, 1.92, false, false, false, false, false, false));
	addElement("div", "", "mii-fighter-list", [["id", "mii-"+(miis.length-1)]]);
	addElement("button", "Mii Fighter", "mii-"+(miis.length-1), [["class", "edit-custom-btn edit-mii-btn"],["id", "mii-"+(miis.length-1)+"-name"],["onclick", "updateSelectedMii(this.id)"]]);
	document.getElementById("mii-"+(miis.length-1)+"-name").addEventListener("click", function(event){
	    event.preventDefault();
	    openMiiEditor();
	});
	selectedMii = miis.length-1;
	openMiiEditor();
}

//adds a player to the randomizer
function addPlayer()
{
	if (numOfPlayers < maxPlayers)
	{
		numOfPlayers++;
		addElement("div", "", "player-list", [["id", "p"+(numOfPlayers)+"-name"]]);
		addElement("input", "", "p"+(numOfPlayers)+"-name", [["type", "text"],["id", "p"+(numOfPlayers)+"-name-box"],["value", "P"+(numOfPlayers)]]);
	}
}

//Constructor that holds character data
function Character(charName, charNum, charSeries, charSex, charOrigin, charSmash, charWeight, charSpeed, charDLC, charHasSword, charIsVillain, charIsThirdParty, charIsMultislot, charIsNonHuman)
{
	this.name = charName;
	this.number = charNum;
	this.series = charSeries;
	this.gender = charSex;
	this.firstAppearanceYear = charOrigin;
	this.firstSmashAppearance = charSmash;
	this.weight = charWeight;
	this.speed = charSpeed;
	this.dlc = charDLC;
	this.hasSword = charHasSword;
	this.isVillain = charIsVillain;
	this.isThirdParty = charIsThirdParty;
	this.isMultislot = charIsMultislot;
	this.isNonHuman = charIsNonHuman;
}

//hides the 'character theme editor' menu
function closeCharThemeEditor() {
 	if (charModes.find(element => element.name == document.getElementById("char-theme-name").value) && charModes.find(element => element.name == document.getElementById("char-theme-name").value).index != -selectedCharTheme)
 	{
 		alert("The name "+document.getElementById("char-theme-name").value+" is already being used.");
 	}
 	else
 	{
 		document.getElementById("char-theme-editor").style.display = "none";
 		targetCharTheme = charModes.find(element => element.index == -selectedCharTheme);
 		targetCharTheme.name = document.getElementById("char-theme-name").value.replace("-", "­‒");
 		targetCharTheme.description = document.getElementById("custom-char-theme-description").value;
 		targetCharTheme.parameter = document.getElementById("char-theme-parameter-select").value;
 		targetCharTheme.comparator = document.getElementById("char-theme-comparator-select").value;
 		targetCharTheme.goal = [];
 		if (targetCharTheme.comparator == "among")
 		{
 			var newCharList = getSelected("char-goal");
 			for (var i = 0; i < newCharList.length; i++)
 			{
 				targetCharTheme.goal.push(newCharList[i].replace("-", " "))
 			}
 		}
 		else if (targetCharTheme.comparator == "<<" || targetCharTheme.comparator == "!<<")
 		{
 			targetCharTheme.goal.push(parseInt(document.getElementById("char-goal-1").value));
 			targetCharTheme.goal.push(parseInt(document.getElementById("char-goal-2").value));
 		}
 		else {
 			if (["number", "weight", "origin", "speed"].includes(targetCharTheme.parameter))
 			{
 				targetCharTheme.goal.push(parseInt(document.getElementById("char-goal").value));
 			}
 			else if (["dlc", "sword", "third-party", "villain", "non-human"].includes(targetCharTheme.parameter))
 			{
 				targetCharTheme.goal.push(document.getElementById("char-goal").value == "true");
 			}
 			else
 			{
 				targetCharTheme.goal.push(document.getElementById("char-goal").value.replace("-", " "));
 			}
 		}
 		document.getElementById("custom-char-theme-"+(selectedCharTheme)+"-name").innerHTML = targetCharTheme.name;
 		document.getElementById("custom-char-theme-"+(selectedCharTheme)).innerHTML = targetCharTheme.name;
 		document.getElementById("custom-char-theme-"+(selectedCharTheme)).setAttribute("value", targetCharTheme.name.replace("-", " "));
 	}
}

//hides the 'advanced options' menu
function closeCode() {
  	document.getElementById("code-popup").style.display = "none";
  	updateCheatCode();
}

//hides the 'advanced options' menu
function closeForm() {
  	document.getElementById("advanced-options").style.display = "none";
}

//hides the 'custom options' menu
function closeFormCustom() {
  	document.getElementById("custom-options").style.display = "none";
}

//hides the 'mii editor' menu
function closeMiiEditor() {
 	document.getElementById("mii-editor").style.display = "none";
 	miis[selectedMii].name = document.getElementById("mii-name").value;
 	miis[selectedMii].class = parseInt(document.getElementById("mii-type-select").value, 10);
 	miis[selectedMii].gender = document.getElementById("mii-gender-select").value;
 	miis[selectedMii].isVillain = document.getElementById("mii-villain-toggle").checked;
 	document.getElementById("mii-"+(selectedMii)+"-name").innerHTML = miis[selectedMii].name;
 	if (miis[selectedMii].class == 0)
 	{
	 	document.getElementById("mii-"+(selectedMii)+"-name").style.backgroundImage = "url(brawler.png)";
	}
	else if (miis[selectedMii].class == 1)
	{
		document.getElementById("mii-"+(selectedMii)+"-name").style.backgroundImage = "url(swordfighter.png)";
	}
	else
	{
		document.getElementById("mii-"+(selectedMii)+"-name").style.backgroundImage = "url(gunner.png)";
	}
 	var updatedMii = characters.find(element => element.number >= 51 && element.number < 54 && (element.number*1000)%1000 == (selectedMii));
 	updatedMii.name = miis[selectedMii].name;
 	updatedMii.number = (updatedMii.number%1)+51+miis[selectedMii].class;
 	updatedMii.gender = miis[selectedMii].gender;
 	updatedMii.isVillain = miis[selectedMii].isVillain;
 	if (miis[selectedMii].class == 0)
 	{
 		updatedMii.weight = 94;
 		updatedMii.speed = 1.92;
 	}
 	else if (miis[selectedMii].class == 1)
 	{
 		updatedMii.weight = 100;
 		updatedMii.speed = 1.58;
 	}
 	else
 	{
 		updatedMii.weight = 104;
 		updatedMii.speed = 1.37;
 	}
}

//hides the 'stage theme editor' menu
function closeStageThemeEditor() {
 	if (stageModes.find(element => element.name == document.getElementById("stage-theme-name").value) && stageModes.find(element => element.name == document.getElementById("stage-theme-name").value).index != -selectedStageTheme)
 	{
 		alert("The name "+document.getElementById("stage-theme-name").value+" is already being used.");
 	}
 	else
 	{
 		document.getElementById("stage-theme-editor").style.display = "none";
 		targetStageTheme = stageModes.find(element => element.index == -selectedStageTheme);
 		targetStageTheme.name = document.getElementById("stage-theme-name").value.replace("-", "­‒");
 		targetStageTheme.description = document.getElementById("custom-stage-theme-description").value;
 		targetStageTheme.parameter = document.getElementById("stage-theme-parameter-select").value;
 		targetStageTheme.comparator = document.getElementById("stage-theme-comparator-select").value;
 		targetStageTheme.goal = [];
 		if (targetStageTheme.comparator == "among")
 		{
 			var newStageList = getSelected("stage-goal");
 			for (var i = 0; i < newStageList.length; i++)
 			{
 				targetStageTheme.goal.push(newStageList[i].replace("-", " "))
 			}
 		}
 		else if (targetStageTheme.comparator == "<<" || targetStageTheme.comparator == "!<<")
 		{
 			targetStageTheme.goal.push(document.getElementById("stage-goal-1").value);
 			targetStageTheme.goal.push(document.getElementById("stage-goal-2").value);
 		}
 		else {
 			if (["number", "legality"].includes(targetStageTheme.parameter))
 			{
 				targetStageTheme.goal.push(parseInt(document.getElementById("stage-goal").value));
 			}
 			else if (["dlc", "large", "third-party"].includes(targetStageTheme.parameter))
 			{
 				targetStageTheme.goal.push(document.getElementById("stage-goal").value == "true");
 			}
 			else
 			{
 				targetStageTheme.goal.push(document.getElementById("stage-goal").value.replace("-", " "));
 			}
 		}
 		document.getElementById("custom-stage-theme-"+(selectedStageTheme)+"-name").innerHTML = targetStageTheme.name;
 		document.getElementById("custom-stage-theme-"+(selectedStageTheme)).innerHTML = targetStageTheme.name;
 		document.getElementById("custom-stage-theme-"+(selectedStageTheme)).setAttribute("value", targetStageTheme.name.replace("-", " "));
 	}
}

//deletes a custom character theme
function deleteCharTheme()
{
	document.getElementById("char-theme-editor").style.display = "none";
	charModes.splice(charModes.findIndex(element => element.index == -selectedCharTheme), 1);
	document.getElementById("custom-char-theme-"+(selectedCharTheme)+"-name").remove();
	document.getElementById("custom-char-theme-"+(selectedCharTheme)).remove();
}

//deletes a mii fighter
function deleteMii()
{
	document.getElementById("mii-editor").style.display = "none";
	miis.splice(selectedMii, 1);
	characters.splice(characters.findIndex(element => element.number >= 51 && element.number < 54 && (element.number*1000)%1000 == (selectedMii+1)), 1);
	document.getElementById("mii-"+(selectedMii)).remove();
	for (var i = selectedMii+1; i < miis.length+1; i++)
	{
		document.getElementById("mii-"+i).setAttribute("id", "mii-"+(i-1));
		document.getElementById("mii-"+i+"-name").setAttribute("id", "mii-"+(i-1)+"-name");
	}
}

//deletes a custom stage
function deleteStage(stageIndex)
{
	currentCustomStage = parseInt(stageIndex.replace(/\D/g,''));
	targetStage = stages.findIndex(element => element.number == -currentCustomStage);
	document.getElementById("custom-stage-"+currentCustomStage).remove();
	stages.splice(targetStage, 1);
	for (var i = currentCustomStage+1; i < totalCustomStages+1; i++)
	{
		document.getElementById("custom-stage-"+i).setAttribute("id", "custom-stage-"+(i-1));
		document.getElementById("custom-stage-"+i+"-box").setAttribute("id", "custom-stage-"+(i-1)+"-box");
		document.getElementById("custom-stage-"+i+"-delete").setAttribute("id", "custom-stage-"+(i-1)+"-delete");
		stages.find(element => element.number == -i).number = -(i-1);
	}
	totalCustomStages--;
}

//deletes a custom stage theme
function deleteStageTheme()
{
	document.getElementById("stage-theme-editor").style.display = "none";
	stageModes.splice(stageModes.findIndex(element => element.index == -selectedStageTheme), 1);
	document.getElementById("custom-stage-theme-"+(selectedStageTheme)+"-name").remove();
	document.getElementById("custom-stage-theme-"+(selectedStageTheme)).remove();
}

//prevent the enter key from prematurely submitting the form
function disableEnterKeyDuringForms(e)
{
	if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13)
	{
		if(e.target.nodeName=='INPUT'&&e.target.type=='text')
		{
			e.preventDefault();
			return false;
		}
	}
}

//randomly generate a list of characters for each player and stages based on all settings
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
		} while (generated.findIndex(element => element == newNum) != NOT_FOUND)
		generated.push(newNum);
	}
	return generated;
}

//returns a specified cookie value
function getCookie(cname) {
  var variableName = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(variableName) == 0) {
      return c.substring(variableName.length, c.length);
    }
  }
  return "";
}

//returns all selected elements from a multiselect dropdown
function getSelected(selectId) {
	var selected = [];
	for (var option of document.getElementById(selectId).options) {
		if (option.selected) {
			selected.push(option.value);
		}
	}
	return selected;
}

//Test if user has a mouse
function handleFirstMouseMove() {
	document.body.classList.remove('user-is-tabbing');
	window.removeEventListener('mousemove', handleFirstMouseMove);
	window.addEventListener('keydown', handleFirstTab);
}

//Test if user is using only a keyboard
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousemove', handleFirstMouseMove);
    }
}

//generates all legal characters based on what mode you want to play
function legalChars(mode)
{
	allowed = [];
	var charTheme = charModes.find(element => element.name == mode);
	for (var i = 0; i < characters.length; i++)
	{
		if (charTheme.satisfiesConstraints(characters[i]) && !removedChars.includes(characters[i].name))
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
	var stageTheme = stageModes.find(element => element.name == mode);
	for (var i = 0; i < stages.length; i++)
	{
		if (stageTheme.satisfiesConstraints(stages[i]) && !removedStages.includes(stages[i].name))
		{
			if (stages[i].number < 0 && !includeCustomStages)
			{
				continue;
			}
			allowed.push(i);
		}
	}
	return allowed;
}

//constructor for the custom Mii object
function Mii(miiName, miiClass, miiGender, miiVillain)
{
	this.name = miiName;
	this.class = miiClass;
	this.gender = miiGender;
	this.isVillain = miiVillain;
}

//reveals the char theme editor
function openCharThemeEditor()
{
	document.getElementById("char-theme-editor").style.display = "block";
	targetCharTheme = charModes.find(element => element.index == -selectedCharTheme);
	document.getElementById("char-theme-name").value = targetCharTheme.name;
	document.getElementById("custom-char-theme-description").value = targetCharTheme.description;
	document.getElementById("char-parameter-"+charParameters.findIndex(element => element == targetCharTheme.parameter)).selected = true;
	updateCharThemeParameter();
	if (document.getElementById("char-goal-1"))
	{
		document.getElementById("char-goal-1").value = targetCharTheme.goal[0];
		document.getElementById("char-goal-2").value = targetCharTheme.goal[1];
	}
	else {
		if (charThemeComparator == "among")
		{
			var targetSelect = Array.from(document.getElementById("char-goal").options);
			for (var i = 0; i < targetSelect.length; i++) {
				if (targetCharTheme.goal.includes(targetSelect[i].value.replace("-", " "))) {
					targetSelect[i].selected = true;
				}
			}
		}
		else if (charThemeComparator == "=" || charThemeComparator == "!=")
		{
			if (["number", "weight", "origin"].includes(charThemeParameter))
			{
				document.getElementById("char-goal").value = targetCharTheme.goal[0];
			}
			else
			{
				document.getElementById("char-"+targetCharTheme.goal[0].replace(" ", "-")).selected = true;
			}
		}
		else
		{
			document.getElementById("char-goal").value = targetCharTheme.goal[0];
		}
	}
}

//reveals the 'code' menu
function openCode()
{
  	document.getElementById("code-popup").style.display = "block";
}

//reveals the 'advanced options' menu
function openForm()
{
  	document.getElementById("advanced-options").style.display = "block";
}

//reveals the 'custom options' menu
function openFormCustom()
{
  	document.getElementById("custom-options").style.display = "block";
}

//reveals the mii editor
function openMiiEditor()
{
  	document.getElementById("mii-editor").style.display = "block";
  	document.getElementById("mii-name").value = miis[selectedMii].name;
  	if (miis[selectedMii].class == 0)
  	{
  		document.getElementById("type-select-brawler").selected = true;
  	}
  	else if (miis[selectedMii].class == 1)
  	{
  		document.getElementById("type-select-swordfighter").selected = true;
  	}
  	else
  	{
  		document.getElementById("type-select-gunner").selected = true;
  	}
  	if (miis[selectedMii].gender == "male")
  	{
  		document.getElementById("gender-select-male").selected = true;
  	}
  	else
  	{
  		document.getElementById("gender-select-female").selected = true;
  	}
  	document.getElementById("mii-villain-toggle").checked = miis[selectedMii].isVillain;
}

//reveals the stage theme editor
function openStageThemeEditor()
{
	document.getElementById("stage-theme-editor").style.display = "block";
	targetStageTheme = stageModes.find(element => element.index == -selectedStageTheme);
	document.getElementById("stage-theme-name").value = targetStageTheme.name;
	document.getElementById("custom-stage-theme-description").value = targetStageTheme.description;
	document.getElementById("stage-parameter-"+stageParameters.findIndex(element => element == targetStageTheme.parameter)).selected = true;
	updateStageThemeParameter();
	if (document.getElementById("stage-goal-1"))
	{
		document.getElementById("stage-goal-1").value = targetStageTheme.goal[0];
		document.getElementById("stage-goal-2").value = targetStageTheme.goal[1];
	}
	else {
		if (stageThemeComparator == "among")
		{
			var targetSelect = Array.from(document.getElementById("stage-goal").options);
			for (var i = 0; i < targetSelect.length; i++) {
				if (targetStageTheme.goal.includes(targetSelect[i].value.replace("-", " "))) {
					targetSelect[i].selected = true;
				}
			}
		}
		else if (stageThemeComparator == "=" || stageThemeComparator == "!=")
		{
			if (["number", "legality"].includes(stageThemeParameter))
			{
				document.getElementById("stage-goal").value = targetStageTheme.goal[0];
			}
			else
			{
				document.getElementById("stage-"+targetStageTheme.goal[0].replace(" ", "-")).selected = true;
			}
		}
		else
		{
			document.getElementById("stage-goal").value = targetStageTheme.goal[0];
		}
	}
}

//returns a list of all players currently in the randomizer
function playerNames()
{
	var players = [];
	for (var playerNum = 0; playerNum < numOfPlayers; playerNum++)
	{
		players.push(document.getElementById("p"+(playerNum+1)+"-name-box").value);
	}
	return(players);
}

//generates a random integer between two values
function randomInt(min, max)
{
	var range = max-min+1;
	return Math.floor(Math.random()*range)+min;
}

function readCookie()
{
	if (document.cookie != "")
	{
		document.getElementById("max-player-setting").value = getCookie("maxPlayers");
		updateMaxPlayers();
		document.getElementById("color-toggle").checked = getCookie("includeColorfulResults") == "true";
		updateColors();
		document.getElementById("alt-stage-toggle").checked = getCookie("includeAltForms") == "true";
		updateAltForms();
		document.getElementById("custom-stage-toggle").checked = getCookie("includeCustomStages") == "true";
		updateCustomStages();
		removedChars = JSON.parse(getCookie("removedChars"));
		var targetSelect = document.getElementById("removed-chars").options;
		for (var i = 0; i < targetSelect.length; i++) {
			if (removedChars.includes(targetSelect[i].value.replace("-", " "))) {
				targetSelect[i].selected = true;
			}
		}
		removedStages = JSON.parse(getCookie("removedStages"));
		targetSelect = document.getElementById("removed-stages").options;
		for (var i = 0; i < targetSelect.length; i++) {
			if (removedStages.includes(targetSelect[i].value.replace("-", " "))) {
				targetSelect[i].selected = true;
			}
		}
		document.getElementById("legality-control").value = getCookie("legalityLevel");
		updateLegality();
	}
	if (hasTouchScreen)
	{
		try
		{
			miis = JSON.parse(getCookie("miis"));
			customStages = JSON.parse(getCookie("customStages"));
			customCharThemes = JSON.parse(getCookie("customCharThemes"));
			customStageThemes = JSON.parse(getCookie("customStageThemes"));
		}
		catch
		{
			miis = ""
			customStages = "";
			customCharThemes = "";
			customStageThemes = "";
		}
	}
	else
	{
		miis = JSON.parse(getCookie("miis"));
		customStages = JSON.parse(getCookie("customStages"));
		customCharThemes = JSON.parse(getCookie("customCharThemes"));
		customStageThemes = JSON.parse(getCookie("customStageThemes"));
	}
	if (miis == "")
	{
		miis = [];
		miis.push(new Mii("Mii Brawler", 0, "male", false));
		miis.push(new Mii("Mii Swordfighter", 1, "male", false));
		miis.push(new Mii("Mii Gunner", 2, "female", false));
	}
	if (customStages == "")
	{
		customStages = [];
	}
	if (customCharThemes == "")
	{
		customCharThemes = [];
	}
	if (customStageThemes == "")
	{
		customStageThemes = [];
	}
	for (var i = 0; i < miis.length; i++)
	{
		addElement("div", "", "mii-fighter-list", [["id", "mii-"+(i)]]);
		addElement("button", miis[i].name, "mii-"+(i), [["class", "edit-custom-btn edit-mii-btn"],["id", "mii-"+(i)+"-name"],["onclick", "updateSelectedMii(this.id)"]]);
		document.getElementById("mii-"+i+"-name").addEventListener("click", function(event){
		    event.preventDefault();
			openMiiEditor();
		});
		if (miis[i].class == 0)
		{
			characters.push(new Character(miis[i].name, 51+(i/1000), "Super Smash Bros.", miis[i].gender, 2014, "Ultimate", 94, 1.92, false, false, miis[i].isVillain, false, false, false));
			document.getElementById("mii-"+i+"-name").style.backgroundImage = "url(brawler.png)";
		}
		else if (miis[i].class === 1)
		{
			characters.push(new Character(miis[i].name, 52+(i/1000), "Super Smash Bros.", miis[i].gender, 2014, "Ultimate", 100, 1.58, false, false, miis[i].isVillain, false, false, false));
			document.getElementById("mii-"+i+"-name").style.backgroundImage = "url(swordfighter.png)";
		}
		else
		{
			characters.push(new Character(miis[i].name, 53+(i/1000), "Super Smash Bros.", miis[i].gender, 2014, "Ultimate", 104, 1.37, false, false, miis[i].isVillain, false, false, false));
			document.getElementById("mii-"+i+"-name").style.backgroundImage = "url(gunner.png)";
		}
	}
	for (var i = 0; i < customStages.length; i++)
	{
		currentCustomStage++;
		addElement("div", "", "custom-stage-list", [["id", "custom-stage-"+currentCustomStage], ["class", "custom-stage-div"]]);
		addElement("input", "", "custom-stage-"+currentCustomStage, [["type", "text"],["id", "custom-stage-"+currentCustomStage+"-box"],["value", customStages[i]],["class", "custom-stage"], ["onchange", "updateCustomStageName(this.id)"]]);
		addElement("button", "X", "custom-stage-"+currentCustomStage, [["id", "custom-stage-"+currentCustomStage+"-delete"], ["class", "delete-stage"], ["onclick", "deleteStage(this.id)"]]);
		document.getElementById("custom-stage-"+currentCustomStage+"-delete").addEventListener("click", function(event){
		    event.preventDefault();
		});
		stages.push(new Stage(document.getElementById("custom-stage-"+currentCustomStage+"-box").value, -currentCustomStage, "Super Smash Bros.", "Ultimate", 5, false, false, false));
		totalCustomStages = totalCustomStages+1;
	}
	for (var i = 0; i < customCharThemes.length; i++)
	{
		currentCharTheme++;
		customCharThemes[i].index = -currentCharTheme;
		customCharThemes[i].satisfiesConstraints = function(obj)
		{
			var val;
			switch (this.parameter)
			{
				case "name":
					val = obj.name;
					break;
				case "number":
					val = obj.number;
					break;
				case "series":
					val = obj.series;
					break;
				case "gender":
					val = obj.gender;
					break;
				case "origin":
					val = obj.firstAppearanceYear;
					break;
				case "smash":
					val = obj.firstSmashAppearance;
					break;
				case "weight":
					val = obj.weight;
					break;
				case "speed":
					val = obj.speed*100;
					break;
				case "dlc":
					val = obj.dlc;
					break;
				case "sword":
					val = obj.hasSword;
					break;
				case "villain":
					val = obj.isVillain;
					break;
				case "third-party":
					val = obj.isThirdParty;
					break;
				case "multislot":
					val = obj.isMultislot;
					break;
				case "legality":
					val = obj.legality;
					break;
				case "large":
					val = obj.isLarge;
					break;
				default:
					val = obj.isNonHuman;
			}
			switch (this.comparator)
			{
				case "!=":
					if (!this.goal.includes(val))
					{
						return true;
					}
					break;
				case ">":
					if (val > this.goal[0])
					{
						return true;
					}
					break;
				case "<":
					if (val < this.goal[0])
					{
						return true;
					}
					break;
				case "<<":
					if (this.goal[1] < this.goal[0])
					{
						if (val >= this.goal[1] && val <= this.goal[0])
						{
							return true;
						}
					}
					else
					{
						if (val >= this.goal[0] && val <= this.goal[1])
						{
							return true;
						}
					}
					break;
				case "!<<":
					if (this.goal[1] < this.goal[0])
					{
						if (val < this.goal[1] || val > this.goal[0])
						{
							return true;
						}
					}
					else
					{
						if (val < this.goal[0] || val > this.goal[1])
						{
							return true;
						}
					}
					break;
				default:
					if (this.goal.includes(val))
					{
						return true;
					}
			}
			return false;
		}
		charModes.splice(charModes.length-1, 1);
		charModes.push(customCharThemes[i]);
		charModes.push(new Theme("Random", "Even I don't know what's coming...", "name", "!=", [""], charModes.length-1));
		document.getElementById("Random-char").remove();
		targetCharTheme = charModes.find(element => element.index == -currentCharTheme);
		addElement("option", targetCharTheme.name, "char-theme-select", [["id", "custom-char-theme-"+(currentCharTheme)], ["value", targetCharTheme.name.replace("-", " ")]]);
		addElement("option", "Random...", "char-theme-select", [["id","Random-char"], ["value", "Random"]]);
		addElement("div", "", "custom-char-theme-list", [["id", "custom-char-theme-"+currentCharTheme+"-div"]]);
		addElement("button", customCharThemes[i].name, "custom-char-theme-"+currentCharTheme+"-div", [["class", "edit-custom-btn"],["id", "custom-char-theme-"+currentCharTheme+"-name"],["onclick", "updateSelectedCharTheme(this.id)"]]);
		document.getElementById("custom-char-theme-"+currentCharTheme+"-name").addEventListener("click", function(event){
		    event.preventDefault();
		    openCharThemeEditor();
		});
	}
	for (var i = 0; i < customStageThemes.length; i++)
	{
		currentStageTheme++;
		customStageThemes[i].index = -currentStageTheme;
		customStageThemes[i].satisfiesConstraints = function(obj)
		{
			var val;
			switch (this.parameter)
			{
				case "name":
					val = obj.name;
					break;
				case "number":
					val = obj.number;
					break;
				case "series":
					val = obj.series;
					break;
				case "gender":
					val = obj.gender;
					break;
				case "origin":
					val = obj.firstAppearanceYear;
					break;
				case "smash":
					val = obj.firstSmashAppearance;
					break;
				case "weight":
					val = obj.weight;
					break;
				case "dlc":
					val = obj.dlc;
					break;
				case "sword":
					val = obj.hasSword;
					break;
				case "villain":
					val = obj.isVillain;
					break;
				case "third-party":
					val = obj.isThirdParty;
					break;
				case "multislot":
					val = obj.isMultislot;
					break;
				case "legality":
					val = obj.legality;
					break;
				case "large":
					val = obj.isLarge;
					break;
				default:
					val = obj.isNonHuman;
			}
			switch (this.comparator)
			{
				case "!=":
					if (!this.goal.includes(val))
					{
						return true;
					}
					break;
				case ">":
					if (val > this.goal[0])
					{
						return true;
					}
					break;
				case "<":
					if (val < this.goal[0])
					{
						return true;
					}
					break;
				case "<<":
					if (this.goal[1] < this.goal[0])
					{
						if (val >= this.goal[1] && val <= this.goal[0])
						{
							return true;
						}
					}
					else
					{
						if (val >= this.goal[0] && val <= this.goal[1])
						{
							return true;
						}
					}
					break;
				case "!<<":
					if (this.goal[1] < this.goal[0])
					{
						if (val < this.goal[1] || val > this.goal[0])
						{
							return true;
						}
					}
					else
					{
						if (val < this.goal[0] || val > this.goal[1])
						{
							return true;
						}
					}
					break;
				default:
					if (this.goal.includes(val))
					{
						return true;
					}
			}
			return false;
		}
		stageModes.splice(stageModes.length-1, 1);
		stageModes.push(customStageThemes[i]);
		stageModes.push(new Theme("Random", "It's a secret to everyone...", "name", "!=", [""], stageModes.length-1));
		document.getElementById("Random-stage").remove();
		targetStageTheme = stageModes.find(element => element.index == -(currentStageTheme));
		addElement("option", targetStageTheme.name, "stage-theme-select", [["id", "custom-stage-theme-"+(currentStageTheme)], ["value", targetStageTheme.name.replace("-", " ")]]);
		addElement("option", "Random...", "stage-theme-select", [["id","Random-stage"], ["value", "Random"]]);
		addElement("div", "", "custom-stage-theme-list", [["id", "custom-stage-theme-"+currentStageTheme+"-div"]]);
		addElement("button", customStageThemes[i].name, "custom-stage-theme-"+currentStageTheme+"-div", [["class", "edit-custom-btn"],["id", "custom-stage-theme-"+currentStageTheme+"-name"],["onclick", "updateSelectedStageTheme(this.id)"]]);
		document.getElementById("custom-stage-theme-"+currentStageTheme+"-name").addEventListener("click", function(event){
		    event.preventDefault();
		    openStageThemeEditor();
		});
	}
}

//removes a player from the randomizer
function removePlayer()
{
	if(numOfPlayers > 1)
	{
		document.getElementById("p"+(numOfPlayers)+"-name").remove();
		numOfPlayers--;
	}
}

//set a specified cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=current-domain";
}

//Constructor that holds stage data
function Stage(stageName, stageIndex, stageSeries, stageOrigin, stageLegal, stageDLC, stageLarge, stageThird)
{
	this.name = stageName;
	this.number = stageIndex;
	this.series = stageSeries;
	this.firstSmashAppearance = stageOrigin;
	this.legality = stageLegal;
	this.dlc = stageDLC;
	this.isLarge = stageLarge;
	this.isThirdParty = stageThird;
}

//Test for touch screen
function testForTouchScreen()
{
    if ("maxTouchPoints" in navigator) { 
        return navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        return navigator.msMaxTouchPoints > 0; 
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            return !!mQ.matches;
        } else if ('orientation' in window) {
            return true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            return (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    return false;
}

function Theme(themeName, themeDesc, themePar, themeComp, themeGoal, themeIndex)
{
	this.name = themeName;
	this.description = themeDesc;
	this.parameter = themePar;
	this.comparator = themeComp;
	this.goal = themeGoal;
	this.index = themeIndex;
	this.satisfiesConstraints = function(obj)
	{
		var val;
		switch (this.parameter)
		{
			case "name":
				val = obj.name;
				break;
			case "number":
				val = obj.number;
				break;
			case "series":
				val = obj.series;
				break;
			case "gender":
				val = obj.gender;
				break;
			case "origin":
				val = obj.firstAppearanceYear;
				break;
			case "smash":
				val = obj.firstSmashAppearance;
				break;
			case "weight":
				val = obj.weight;
				break;
			case "speed":
				val = obj.speed*100;
				break;
			case "dlc":
				val = obj.dlc;
				break;
			case "sword":
				val = obj.hasSword;
				break;
			case "villain":
				val = obj.isVillain;
				break;
			case "third-party":
				val = obj.isThirdParty;
				break;
			case "multislot":
				val = obj.isMultislot;
				break;
			case "legality":
				val = obj.legality;
				break;
			case "large":
				val = obj.isLarge;
				break;
			default:
				val = obj.isNonHuman;
		}
		switch (this.comparator)
		{
			case "!=":
				if (!this.goal.includes(val))
				{
					return true;
				}
				break;
			case ">":
				if (val > this.goal[0])
				{
					return true;
				}
				break;
			case "<":
				if (val < this.goal[0])
				{
					return true;
				}
				break;
			case "<<":
				if (this.goal[1] < this.goal[0])
				{
					if (val >= this.goal[1] && val <= this.goal[0])
					{
						return true;
					}
				}
				else
				{
					if (val >= this.goal[0] && val <= this.goal[1])
					{
						return true;
					}
				}
				break;
			case "!<<":
				if (this.goal[1] < this.goal[0])
				{
					if (val < this.goal[1] || val > this.goal[0])
					{
						return true;
					}
				}
				else
				{
					if (val < this.goal[0] || val > this.goal[1])
					{
						return true;
					}
				}
				break;
			default:
				if (this.goal.includes(val))
				{
					return true;
				}
		}
		return false;
	}
}

//update various menu options based on whether or not the user wants BF and Omega forms of stages
function updateAltForms()
{
	includeAltForms = document.getElementById("alt-stage-toggle").checked;
	if (includeAltForms)
	{
		document.getElementById("Random-stage").remove();
		addElement("option", "Normal", "stage-theme-select", [["id","normal-stages"], ["value", "Normal"]]);
		addElement("option", "Battlefield", "stage-theme-select", [["id","battlefield-stages"], ["value", "Battlefield"]]);
		addElement("option", "Omega", "stage-theme-select", [["id","omega-stages"], ["value", "Omega"]]);
		addElement("option", "Non-Normal", "stage-theme-select", [["id","non-normal"], ["value", "Non-Normal"]]);
		addElement("option", "Non-Battlefield", "stage-theme-select", [["id","non-battlefield"], ["value", "Non-Battlefield"]]);
		addElement("option", "Non-Omega", "stage-theme-select", [["id","non-omega"], ["value", "Non-Omega"]]);
		addElement("option", "Random...", "stage-theme-select", [["id","Random-stage"], ["value", "Random"]]);
		stageModes.push(new Theme("Normal", "Vanilla stages, just like you.", "number", "<", [totalUniqueStages+1], 13));
		stageModes.push(new Theme("Battlefield", "Why bother choosing? They're all the same.", "number", "<<", [totalUniqueStages, totalUniqueStages*2], 14));
		stageModes.push(new Theme("Omega", "FOX NO ITEMS OMEGA FORMS ONLY!", "number", "<<", [totalUniqueStages*2, totalUniqueStages*3], 15));
		stageModes.push(new Theme("Non Normal", "At least you won't have stage hazards.", "number", "<<", [totalUniqueStages, totalUniqueStages*3], 16));
		stageModes.push(new Theme("Non Battlefield", "Who played on Battlefield anyway?", "number", "!<<", [totalUniqueStages, totalUniqueStages*2-2], 17));
		stageModes.push(new Theme("Non Omega", "Half boring, half fun. Sound familiar?", "number", "<", [totalUniqueStages*2-2], 18));
		stageModes.push(new Theme("Random", "It's a secret to everybody...", "name", "!=", [""]));
		for (var i = 0; i<totalUniqueStages; i++)
		{
			stages.push(new Stage("BF "+stages[i].name, stages[i].number+totalUniqueStages, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
		}
		for (var i = 0; i<totalUniqueStages; i++)
		{
			stages.push(new Stage("Ω "+stages[i].name, stages[i].number+totalUniqueStages*2, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
		}
		stages.splice(stages.findIndex(element => element.name == "BF Battlefield"), 1);
		stages.splice(stages.findIndex(element => element.name == "BF Big Battlefield"), 1);
		stages.splice(stages.findIndex(element => element.name == "Ω Final Destination"), 1);
		stages.splice(stages.findIndex(element => element.name == "Ω Big Battlefield"), 1);
	}
	else
	{
		if (document.getElementById("normal-stages"))
		{
			document.getElementById("normal-stages").remove();
			document.getElementById("battlefield-stages").remove();
			document.getElementById("omega-stages").remove();
			document.getElementById("non-normal").remove();
			document.getElementById("non-battlefield").remove();
			document.getElementById("non-omega").remove();
			for (var i = stages.length-1; i > totalUniqueStages-1; i--)
			{
				if ((stages[i].name.charAt(0) == "B" && stages[i].name.charAt(1) == "F") || stages[i].name.charAt(0) == "Ω")
				{
					stages.splice(i, 1);
				}
			}
		}
	}
}

function updateCharMode()
{
	//update the current mode and the description text
	charMode = document.getElementById("char-theme-select").value.replace("-", " ");
	document.getElementById("char-theme-description").innerHTML = charModes.find(element => element.name == charMode).description;
	//reveal the series menu if the user asked for it
	if (charMode == "Series")
	{
		document.getElementById("char-series-select").style.display = "inline";
		if (!testForTouchScreen())
		{
			document.getElementById("multiple-reminder-char").style.display = "inline";
		}
	} else {
		document.getElementById("char-series-select").style.display = "none";
		document.getElementById("multiple-reminder-char").style.display = "none";
	}
	//randomly select the mode if the user wants to.
	if (charMode == "Random")
	{
		charMode = charModes[randomInt(0, charModes.length-2)].name;
		//choose some series if the randomly chosen mode is "Series"
		if (charMode == "Series")
		{
			charModes.find(element => element.name == "Series").goal = [];
			var randomCharSeries = generateUniqueNums(randomInt(2, 6), 0, allCharSeries.length-1);
			for (var i = 0; i < randomCharSeries.length; i++)
			{
				charModes.find(element => element.name == "Series").goal.push(allCharSeries[randomCharSeries[i]]);
			}
			alert("Your theme is characters from the following series: "+charModes.find(element => element.name == "Series").goal+".")
		}
		else {
			//let the user know which mode they got
			alert("Your theme is "+charMode.toLowerCase()+" characters!")
		}
		//update the selection box to their new mode (instead of staying at "Random...")
		if (document.getElementById(charMode.replace(" ", "-")+"-char"))
		{
			document.getElementById(charMode.replace(" ", "-")+"-char").selected = true;
		} else {
			document.getElementById("custom-char-theme-"+(customCharThemes.findIndex(element => element.name == charMode)+1)).selected = true;
		}
		document.getElementById("char-theme-description").innerHTML = charModes.find(element => element.name == charMode).description;
	}
}

//update what series the characters will be selected from
function updateCharSeries()
{
	charModes.find(element => element.name == "Series").goal = getSelected("char-series-select");
}

//update the comparator for the character theme editor
function updateCharThemeComparator()
{
	charThemeComparator = document.getElementById("char-theme-comparator-select").value;
	if (document.getElementById("char-goal-1"))
	{
		document.getElementById("char-goal-1").remove();
		document.getElementById("char-goal-and").remove();
		document.getElementById("char-goal-2").remove();
	}
	else
	{
		document.getElementById("char-goal").remove();
	}
	switch (charThemeParameter)
	{
		case "name":
			if (charThemeComparator == "among")
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"]]);
			}
			for (var i = 0; i < characters.length; i++)
			{
				addElement("option", characters[i].name, "char-goal", [["id","char-"+characters[i].name.replace(" ", "-")],["value",characters[i].name.replace(" ", "-")]]);
			}
			break;
		case "series":
			if (charThemeComparator == "among")
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"]]);
			}
			addElement("optgroup", "", "char-goal", [["disabled",null],["hidden",null]]);
			for (var i = 0; i < allCharSeries.length; i++)
			{
				addElement("option", allCharSeries[i], "char-goal", [["id","char-"+allCharSeries[i].replace(" ","-")],["value",allCharSeries[i].replace(" ", "-")]]);
			}
			break;
		case "gender":
			if (charThemeComparator == "among")
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"]]);
			}
			addElement("optgroup", "", "char-goal", [["disabled",null],["hidden",null]]);
			addElement("option", "Male", "char-goal", [["id","char-male"],["value","male"]]);
			addElement("option", "Female", "char-goal", [["id","char-female"],["value","female"]]);
			addElement("option", "Both", "char-goal", [["id","char-both"],["value","both"]]);
			addElement("option", "Neither", "char-goal", [["id","char-neither"],["value","neither"]]);
			break;
		case "smash":
			if (charThemeComparator == "among")
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "char-goal-div", [["id", "char-goal"]]);
			}
			addElement("optgroup", "", "char-goal", [["disabled",null],["hidden",null]]);
			addElement("option", "Smash 64", "char-goal", [["id","char-Smash-64"],["value","Smash-64"]]);
			addElement("option", "Melee", "char-goal", [["id","char-Melee"],["value","Melee"]]);
			addElement("option", "Brawl", "char-goal", [["id","char-Brawl"],["value","Brawl"]]);
			addElement("option", "Smash 4", "char-goal", [["id","char-Smash-4"],["value","Smash-4"]]);
			addElement("option", "Ultimate", "char-goal", [["id","char-Ultimate"],["value","Ultimate"]]);
			break;
		case "number":
			if (charThemeComparator == "<<" || charThemeComparator == "!<<")
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal-1"], ["type", "number"], ["value", 1]]);
				addElement("h4", "&", "char-goal-div", [["id", "char-goal-and"]]);
				addElement("input", "", "char-goal-div", [["id", "char-goal-2"], ["type", "number"], ["value", 10]]);
			}
			else
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal"], ["type", "number"], ["value", 1]]);
			}
			break;
		case "origin":
			if (charThemeComparator == "<<" || charThemeComparator == "!<<")
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal-1"], ["type", "number"], ["value", 1983]]);
				addElement("h4", "&", "char-goal-div", [["id", "char-goal-and"]]);
				addElement("input", "", "char-goal-div", [["id", "char-goal-2"], ["type", "number"], ["value", 1987]]);
			}
			else
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal"], ["type", "number"], ["value", 1985]]);
			}
			break;
		case "weight":
			if (charThemeComparator == "<<" || charThemeComparator == "!<<")
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal-1"], ["type", "number"], ["value", 90]]);
				addElement("h4", "&", "char-goal-div", [["id", "char-goal-and"]]);
				addElement("input", "", "char-goal-div", [["id", "char-goal-2"], ["type", "number"], ["value", 110]]);
			}
			else
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal"], ["type", "number"], ["value", 100]]);
			}
			break;
		case "speed":
			if (charThemeComparator == "<<" || charThemeComparator == "!<<")
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal-1"], ["type", "number"], ["value", 190]]);
				addElement("h4", "&", "char-goal-div", [["id", "char-goal-and"]]);
				addElement("input", "", "char-goal-div", [["id", "char-goal-2"], ["type", "number"], ["value", 210]]);
			}
			else
			{
				addElement("input", "", "char-goal-div", [["id", "char-goal"], ["type", "number"], ["value", 200]]);
			}
			break;
		default:
			addElement("select", "", "char-goal-div", [["id", "char-goal"]]);
			addElement("option", "True", "char-goal", [["id", "char-true"], ["value", true]]);
			addElement("option", "False", "char-goal", [["id", "char-false"], ["value", false]]);
	}
}

//updates the list of choices for a custom character theme
function updateCharThemeParameter()
{
	charThemeParameter = document.getElementById("char-theme-parameter-select").value;
	if (["name", "series", "gender", "smash"].includes(charThemeParameter))
	{
		if (!document.getElementById("char-comparator-1"))
		{
			addElement("option", "is not", "char-theme-comparator-select", [["id", "char-comparator-1"],["value", "!="]]);
		}
		if (document.getElementById("char-comparator-2"))
		{
			for (var i = 2; i < 6; i++)
			{
				document.getElementById("char-comparator-"+i).remove();
			}
			addElement("option", "is among", "char-theme-comparator-select", [["id", "char-comparator-6"],["value", "among"]]);
		}
	}
	else if (["number", "origin", "weight", "speed"].includes(charThemeParameter))
	{
		if (!document.getElementById("char-comparator-1"))
		{
			addElement("option", "is not", "char-theme-comparator-select", [["id", "char-comparator-1"],["value", "!="]]);
		}
		if (document.getElementById("char-comparator-6"))
		{
			document.getElementById("char-comparator-6").remove();
		}
		if (!document.getElementById("char-comparator-2"))
		{
			addElement("option", "is less than", "char-theme-comparator-select", [["id", "char-comparator-2"],["value", "<"]]);
			addElement("option", "is greater than", "char-theme-comparator-select", [["id", "char-comparator-3"],["value", ">"]]);
			addElement("option", "is between", "char-theme-comparator-select", [["id", "char-comparator-4"],["value", "<<"]]);
			addElement("option", "is not between", "char-theme-comparator-select", [["id", "char-comparator-5"],["value", "!<<"]]);
		}
	}
	else
	{
		for (var i = 1; i < 7; i++)
		{
			if(document.getElementById("char-comparator-"+i))
			{
				document.getElementById("char-comparator-"+i).remove();
			}
		}
	}
	document.getElementById("char-comparator-"+comparators.findIndex(element => element == targetCharTheme.comparator)).selected = true;
	updateCharThemeComparator();
}

//updates the cheat code
function updateCheatCode()
{
	cheatCode = document.getElementById("enter-code").value;
	if (cheatCode.toLowerCase() == "ur2slow")
	{
		document.getElementById("results").style.animationDuration = "5s";
	}
	else {
		document.getElementById("results").style.animationDuration = "120s";
	}
	if (cheatCode.toLowerCase() == "classic")
	{
		document.getElementById("results").style.backgroundImage = "url(smash-classic-mural.jpg)";
		document.getElementById("results").style.backgroundSize = "auto 400px";
		document.getElementById("results").style.animationName = "scrollbg";
		document.getElementById("results").style.animationIterationCount = "infinite";
		document.getElementById("results").style.animationTimingFunction = "linear";
	}
	else if (cheatCode.toLowerCase() == "sans")
	{
		document.getElementById("results").style.backgroundImage = "url(sans.gif)";
		document.getElementById("results").style.animation = "none";
		document.getElementById("results").style.backgroundRepeat = "repeat";
		document.getElementById("results").style.backgroundSize = "auto";
	}
	else {
		document.getElementById("results").style.backgroundImage = "url(smash-ultimate-mural.png)";
		document.getElementById("results").style.animationName = "scrollbg";
		document.getElementById("results").style.animationIterationCount = "infinite";
		document.getElementById("results").style.animationTimingFunction = "linear";
		document.getElementById("results").style.backgroundRepeat = "repeat-y";
		document.getElementById("results").style.backgroundSize = "auto 400px";
	}
	if (cheatCode.toLowerCase() == "69")
	{
		alert("Nice.");
	}
	if (cheatCode.toLowerCase() == "secret")
	{
		document.getElementById("preview-link").style.display = "block";
	}
	else {
		document.getElementById("preview-link").style.display = "none";
	}
	if (cheatCode.toLowerCase() == "gaster")
	{
		for (var i = 0; i < numOfPlayers; i++)
		{
			newName = "";
			for (var letter = 0; letter < 8; letter++)
			{
				newName += nonsenseChars.charAt(randomInt(0, nonsenseChars.length));
			}
			document.getElementById("p"+(i+1)+"-name-box").value = newName;
		}
	}
}

//update the multicolored results
function updateColors()
{
	includeColorfulResults = document.getElementById("color-toggle").checked;
	if (includeColorfulResults)
	{
		for (var i = 0; i < numOfPlayers; i++)
		{
			if (document.getElementById("p"+(i+1)+"-result"))
			{
				document.getElementById("p"+(i+1)+"-result").style.color = playerColors[i%8];
			}
		}
	}
	else
	{
		for (var i = 0; i < numOfPlayers; i++)
		{
			if (document.getElementById("p"+(i+1)+"-result"))
			{
				document.getElementById("p"+(i+1)+"-result").style.color = "#ffffff";
			}
		}
	}
}

//Create or update a cookie package that saves the user's settings or custom creations
function updateCookie()
{
	updateCustomStageList();
	updateCustomCharThemeList();
	updateCustomStageThemeList();
	setCookie("maxPlayers", maxPlayers, 31)
	setCookie("includeColorfulResults", includeColorfulResults, 31);
	setCookie("includeAltForms", includeAltForms, 31);
	setCookie("includeCustomStages", includeCustomStages, 31);
	setCookie("removedChars", JSON.stringify(removedChars), 31);
	setCookie("removedStages", JSON.stringify(removedStages), 31);
	setCookie("legalityLevel", legalityLevel, 31);
	setCookie("miis", JSON.stringify(miis), 31);
	setCookie("customStages", JSON.stringify(customStages), 31);
	setCookie("customCharThemes", JSON.stringify(customCharThemes), 31);
	setCookie("customStageThemes", JSON.stringify(customStageThemes), 31);
}

function updateCustomCharThemeList()
{
	customCharThemes = [];
	for (var i = 0; i < charModes.length; i++)
	{
		if (charModes[i].index < 0)
		{
			customCharThemes.push(charModes[i]);
		}
	}
}

function updateCustomStageList()
{
	customStages = [];
	for (var i = 0; i < stages.length; i++)
	{
		if (stages[i].number < 0)
		{
			customStages.push(stages[i].name);
		}
	}
}

//update the name of the selected custom stages
function updateCustomStageName(stageIndex)
{
	currentCustomStage = parseInt(stageIndex.replace(/\D/g,''));
	targetStage = stages.find(element => element.number == -currentCustomStage);
	targetStage.name = document.getElementById("custom-stage-"+currentCustomStage+"-box").value;
}

//update if custom stages will be included in the randomizer
function updateCustomStages()
{
	includeCustomStages = document.getElementById("custom-stage-toggle").checked;
}

function updateCustomStageThemeList()
{
	customStageThemes = [];
	for (var i = 0; i < stageModes.length; i++)
	{
		if (stageModes[i].index < 0)
		{
			customStageThemes.push(stageModes[i]);
		}
	}
}

//update the strictness of tournament-legal stages
function updateLegality()
{
	legalityLevel = document.getElementById("legality-control").value;
	stageModes.find(element => element.name == "Tournament Legal").goal[0] = parseInt(legalityLevel)+1;
}

//update what the maximum allowed amount of players is
function updateMaxPlayers()
{
	maxPlayers = document.getElementById("max-player-setting").value;
}

//update how many character options will be generated
function updateNumOfChars()
{
	numOfChars = document.getElementById("char-select-num").value;
}

//update how many stage options will be generated
function updateNumOfStages()
{
	numOfStages = document.getElementById("stage-select-num").value;
}

//Update the list of removed characters, which won't be included in the randomizer
function updateRemovedChars()
{
	removedChars = getSelected("removed-chars");
}

//Update the list of removed stages, which won't be included in the randomizer
function updateRemovedStages()
{
	removedStages = getSelected("removed-stages");
}

//updates which char theme is currently being worked on
function updateSelectedCharTheme(themeIndex)
{
	selectedCharTheme = parseInt(themeIndex.replace(/\D/g,''));
}

//updates which mii is currently being worked on
function updateSelectedMii(miiIndex)
{
	selectedMii = parseInt(miiIndex.replace(/\D/g,''));
}

//updates which stage theme is currently being worked on
function updateSelectedStageTheme(themeIndex)
{
	selectedStageTheme = parseInt(themeIndex.replace(/\D/g,''));
}

function updateStageMode()
{
	stageMode = document.getElementById("stage-theme-select").value.replace("-", " ");
	document.getElementById("stage-theme-description").innerHTML = stageModes.find(element => element.name == stageMode).description;
	if (stageMode == "Series")
	{
		document.getElementById("stage-series-select").style.display = "inline";
		if (!testForTouchScreen())
		{
			document.getElementById("multiple-reminder-stage").style.display = "inline";
		}
	} else {
		document.getElementById("stage-series-select").style.display = "none";
		document.getElementById("multiple-reminder-stage").style.display = "none";
	}
	if (stageMode == "Random")
	{
		stageMode = stageModes[randomInt(0, stageModes.length-2)].name;
		if (stageMode == "Series")
		{
			stageModes.find(element => element.name == "Series").goal = [];
			var randomStageSeries = generateUniqueNums(randomInt(2, 6), 0, allStageSeries.length-1);
			for (var i = 0; i < randomStageSeries.length; i++)
			{
				stageModes.find(element => element.name == "Series").goal.push(allStageSeries[randomStageSeries[i]]);
			}
			alert("Your theme is stages from the following series: "+stageModes.find(element => element.name == "Series").goal+".");
		}
		else {
			alert("Your theme is "+stageMode.toLowerCase()+" stages!")
		}
		if (document.getElementById(stageMode.replace(" ", "-")+"-stage"))
		{
			document.getElementById(stageMode.replace(" ", "-")+"-stage").selected = true;
		} else {
			document.getElementById("custom-stage-theme-"+(customStageThemes.findIndex(element => element.name == stageMode)+1)).selected = true;
		}
		document.getElementById("stage-theme-description").innerHTML = stageModes.find(element => element.name == stageMode).description;
	}
}

//update what series the stages will be selected from
function updateStageSeries()
{
	stageModes.find(element => element.name == "Series").goal = getSelected("stage-series-select");
}

//update the comparator for the character stage editor
function updateStageThemeComparator()
{
	stageThemeComparator = document.getElementById("stage-theme-comparator-select").value;
	if (document.getElementById("stage-goal-1"))
	{
		document.getElementById("stage-goal-1").remove();
		document.getElementById("stage-goal-and").remove();
		document.getElementById("stage-goal-2").remove();
	}
	else
	{
		document.getElementById("stage-goal").remove();
	}
	switch (stageThemeParameter)
	{
		case "name":
			if (stageThemeComparator == "among")
			{
				addElement("select", "", "stage-goal-div", [["id", "stage-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "stage-goal-div", [["id", "stage-goal"]]);
			}
			for (var i = 0; i < stages.length; i++)
			{
				addElement("option", stages[i].name, "stage-goal", [["id","stage-"+stages[i].name.replace(" ", "-")],["value",stages[i].name.replace(" ", "-")]]);
			}
			break;
		case "series":
			if (stageThemeComparator == "among")
			{
				addElement("select", "", "stage-goal-div", [["id", "stage-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "stage-goal-div", [["id", "stage-goal"]]);
			}
			addElement("optgroup", "", "stage-goal", [["disabled",null],["hidden",null]]);
			for (var i = 0; i < allStageSeries.length; i++)
			{
				addElement("option", allStageSeries[i], "char-goal", [["id","stage-"+allStageSeries[i].replace(" ","-")],["value",allStageSeries[i].replace(" ", "-")]]);
			}
			break;
		case "smash":
			if (stageThemeComparator == "among")
			{
				addElement("select", "", "stage-goal-div", [["id", "stage-goal"], ["multiple", "multiple"], ["size", 4]]);
			}
			else
			{
				addElement("select", "", "stage-goal-div", [["id", "stage-goal"]]);
			}
			addElement("optgroup", "", "stage-goal", [["disabled",null],["hidden",null]]);
			addElement("option", "Smash 64", "stage-goal", [["id","stage-smash-64"],["value","Smash-64"]]);
			addElement("option", "Melee", "stage-goal", [["id","stage-melee"],["value","Melee"]]);
			addElement("option", "Brawl", "stage-goal", [["id","stage-brawl"],["value","Brawl"]]);
			addElement("option", "3DS", "stage-goal", [["id","stage-3ds"],["value","3ds"]]);
			addElement("option", "Wii U", "stage-goal", [["id","stage-wii-u"],["value","Wii-u"]]);
			addElement("option", "Ultimate", "stage-goal", [["id","stage-ultimate"],["value","Ultimate"]]);
			break;
		case "number":
			if (stageThemeComparator == "<<" || stageThemeComparator == "!<<")
			{
				addElement("input", "", "stage-goal-div", [["id", "stage-goal-1"], ["type", "number"], ["value", 1]]);
				addElement("h4", "&", "stage-goal-div", [["id", "stage-goal-and"]]);
				addElement("input", "", "stage-goal-div", [["id", "stage-goal-2"], ["type", "number"], ["value", 10]]);
			}
			else
			{
				addElement("input", "", "stage-goal-div", [["id", "stage-goal"], ["type", "number"], ["value", 1]]);
			}
			break;
		case "legality":
			if (stageThemeComparator == "<<" || stageThemeComparator == "!<<")
			{
				addElement("input", "", "stage-goal-div", [["id", "stage-goal-1"], ["type", "number"], ["value", 0]]);
				addElement("h4", "&", "stage-goal-div", [["id", "stage-goal-and"]]);
				addElement("input", "", "stage-goal-div", [["id", "stage-goal-2"], ["type", "number"], ["value", 3]]);
			}
			else
			{
				addElement("input", "", "stage-goal-div", [["id", "stage-goal"], ["type", "number"], ["value", 1]]);
			}
			break;
		default:
			addElement("select", "", "stage-goal-div", [["id", "stage-goal"]]);
			addElement("option", "True", "stage-goal", [["id", "stage-true"], ["value", true]]);
			addElement("option", "False", "stage-goal", [["id", "stage-false"], ["value", false]]);
	}
}

//updates the list of choices for a custom character theme
function updateStageThemeParameter()
{
	stageThemeParameter = document.getElementById("stage-theme-parameter-select").value;
	if (["name", "series", "smash"].includes(stageThemeParameter))
	{
		if (!document.getElementById("stage-comparator-1"))
		{
			addElement("option", "is not", "stage-theme-comparator-select", [["id", "stage-comparator-1"],["value", "!="]]);
		}
		if (document.getElementById("stage-comparator-2"))
		{
			for (var i = 2; i < 6; i++)
			{
				document.getElementById("stage-comparator-"+i).remove();
			}
			addElement("option", "is among", "stage-theme-comparator-select", [["id", "stage-comparator-6"],["value", "among"]]);
		}
	}
	else if (["number", "legality"].includes(stageThemeParameter)) 
	{
		if (!document.getElementById("stage-comparator-1"))
		{
			addElement("option", "is not", "stage-theme-comparator-select", [["id", "stage-comparator-1"],["value", "!="]]);
		}
		if (document.getElementById("stage-comparator-6"))
		{
			document.getElementById("stage-comparator-6").remove();
		}
		if (!document.getElementById("stage-comparator-2"))
		{
			addElement("option", "is less than", "stage-theme-comparator-select", [["id", "stage-comparator-2"],["value", "<"]]);
			addElement("option", "is greater than", "stage-theme-comparator-select", [["id", "stage-comparator-3"],["value", ">"]]);
			addElement("option", "is between", "stage-theme-comparator-select", [["id", "stage-comparator-4"],["value", "<<"]]);
			addElement("option", "is not between", "stage-theme-comparator-select", [["id", "stage-comparator-5"],["value", "!<<"]]);
		}
	}
	else
	{
		for (var i = 1; i < 7; i++)
		{
			if(document.getElementById("stage-comparator-"+i))
			{
				document.getElementById("stage-comparator-"+i).remove();
			}
		}
	}
	document.getElementById("stage-comparator-"+comparators.findIndex(element => element == targetStageTheme.comparator)).selected = true;
	updateStageThemeComparator();
}

/*SETUP CODE-Code beneath this point will be run on startup and will prepare the site for user input.*/

// Set the variables based on the contents of the html form
var NOT_FOUND = -1;
var maxPlayers = document.getElementById("max-player-setting").value;
var includeAltForms = document.getElementById("alt-stage-toggle").checked;
var includeColorfulResults = document.getElementById("color-toggle").checked;
var includeCustomStages = document.getElementById("custom-stage-toggle").checked;
var legalityLevel = document.getElementById("legality-control").value;
var lightweightMax = 81;
var heavyweightMin = 107;

var numOfPlayers = 2;
var charMode = document.getElementById("char-theme-select").value;
var numOfChars = document.getElementById("char-select-num").value;
var stageMode = document.getElementById("stage-theme-select").value;
var numOfStages = document.getElementById("stage-select-num").value;

var miis = [];
var selectedMii = 0;

var currentCustomStage = 0;
var totalCustomStages = 0;
var customStages = [];

var charThemeParameter = "";
var charThemeComparator = "";
var charParameters = ["name", "number", "series", "gender", "origin", "smash", "weight", "speed", "dlc", "sword", "villain", "third-party", "multislot", "non-human"];
var comparators = ["=", "!=", "<", ">", "<<", "!<<", "among"];
var selectedCharTheme = 0;
var targetCharTheme;
var currentCharTheme = 0;
var customCharThemes = [];

var stageThemeParameter = "";
var stageThemeComparator = "";
var stageParameters = ["name", "number", "series", "smash", "legality", "dlc", "large", "third-party"];
var selectedStageTheme = 0;
var targetStageTheme;
var currentStageTheme = 0;
var customStageThemes = [];

var savedSettings = "";

var nonsenseChars = "!@#$%^&*()_-+=~`/>,.;:☞☜☟₰"

//Create reference arrays that will be filled later
var charSeries = [];
var stageSeries = [];

var removedChars = [];
var removedStages = [];

var resultLists = [];

var cheatCode = "";

//Colors for if the color-coded option is checked
var playerColors = ["#ff1100", "#2e6dee", "#ffdd00", "#00cc00", "#ff7700", "#00ffff", "#ff00ff", "#9f00ff"];

//Handle the events
window.addEventListener('keydown', handleFirstTab);
window.addEventListener('mousemove', handleFirstMouseMove);

//Disable the enter key during forms
window.addEventListener('keydown', disableEnterKeyDuringForms, true);

//When a user leaves the page, update their cookies
window.addEventListener("beforeunload", updateCookie);

//create the list of character modes
var charModes = []
charModes.push(new Theme("No Theme", "Basic is best.", "name", "!=", [""], 0));
charModes.push(new Theme("Male", "Cause boys rule.", "gender", "=", ["male"], 1));
charModes.push(new Theme("Female", "#GIRLPOWER", "gender", "=", ["female"]));
charModes.push(new Theme("Non Human", "Play whoever you're beast at.", "non-human", "=", [true], 2));
charModes.push(new Theme("Villain", "Everyone needs a little chaos in their life.", "villain", "=", [true], 3));
charModes.push(new Theme("Smash 64", "Back to the classics.", "smash", "=", ["Smash 64"], 4));
charModes.push(new Theme("Melee", "I'm not super competitive, I swear!", "smash", "=", ["Melee"], 5));
charModes.push(new Theme("Brawl", "Have a nice trip.", "smash", "=", ["Brawl"], 6));
charModes.push(new Theme("Smash 4", "I don't remember it either.", "smash", "=", ["Smash 4"], 7));
charModes.push(new Theme("Ultimate", "PLANT GANG. PLANT GANG. PLANT GANG.", "smash", "=", ["Ultimate"], 8));
charModes.push(new Theme("DLC", "Bayonetta was fine, you were just bad.", "dlc", "=", [true], 9));
charModes.push(new Theme("Sword", "Surely just one more anime swordsman couldn't hurt.", "sword", "=", [true], 10));
charModes.push(new Theme("Series", "Wait, Shulk's not from Fire Emblem?", "series", "among", [], 11));
charModes.push(new Theme("1980s", "The golden age of gaming.", "origin", "<<", ["1980", "1989"], 12));
charModes.push(new Theme("1990s", "OH MY GOSH IT'S BANJO!!!", "origin", "<<", ["1990", "1999"], 13));
charModes.push(new Theme("2000s", "Super Mario Galaxy defined this era. Come at me.", "origin", "<<", ["2000", "2009"], 14));
charModes.push(new Theme("2010s", "Why is Byleth in this game anyways?", "origin", "<<", ["2010", "2019"], 15));
charModes.push(new Theme("Third Party", "Finally, some mascots I care about.", "third-party", "=", [true], 16));
charModes.push(new Theme("Light", "I, too, want to die to anything.", "weight", "<", [lightweightMax], 17));
charModes.push(new Theme("Heavy", "The bigger they are, the farther they can punch Yoshi.", "weight", ">", [heavyweightMin], 18));
charModes.push(new Theme("Multislot", "Because smuggling in extra characters is fine.", "multislot", "=", [true], charModes.length-1));
charModes.push(new Theme("Random", "Even I don't know what's coming...", "", "", [], 20));
for (var i = 0; i < charModes.length; i++)
{
	addElement("option", charModes[i].name, "char-theme-select", [["id", charModes[i].name.replace(" ", "-")+"-char"], ["value", charModes[i].name.replace(" ", "-")]]);
}
var charMode = document.getElementById("char-theme-select").value.replace("-", " ");



//Do the same for stage modes
var stageModeElements = document.getElementById("stage-theme-select").getElementsByTagName("option");
var stageModes = []
stageModes.push(new Theme("No Theme", "I'm not picky.", "name", "!=", [""], 0));
stageModes.push(new Theme("Tournament Legal", "Ah, a fellow elitist.", "legality", "<", [parseInt(legalityLevel)+1], 1));
stageModes.push(new Theme("Smash 64", "Good graphics are for nerds.", "smash", "=", ["Smash 64"], 2));
stageModes.push(new Theme("Melee", "Yes, there's more than Final Destination.", "smash", "=", ["Melee"], 3));
stageModes.push(new Theme("Brawl", "But where's Rumble Falls?", "smash", "=", ["Brawl"], 4));
stageModes.push(new Theme("3DS", "Still upset about Rainbow Road and Pac-Maze...", "smash", "=", ["3DS"], 5));
stageModes.push(new Theme("Wii U", "Who even approved The Great Cave Offensive?", "smash", "=", ["Wii U"], 6));
stageModes.push(new Theme("Ultimate", "The latest and greatest.", "smash", "=", ["Ultimate"], 7));
stageModes.push(new Theme("DLC", "Paid stages > normal stages. Change my mind.", "dlc", "=", [true], 8));
stageModes.push(new Theme("Third Party", "I'm no Nintendo nerd.", "third-party", "=", [true], 9));
stageModes.push(new Theme("Series", "Which ones play MEGALOVANIA?", "series", "among", [], 10));
stageModes.push(new Theme("Large", "Actually, I CAN run forever.", "large", "=", [true], 11));
stageModes.push(new Theme("Random", "It's a secret to everybody...", "", "", [], stageModes.length-1));

for (var i = 0; i < stageModes.length; i++)
{
	addElement("option", stageModes[i].name, "stage-theme-select", [["id", stageModes[i].name.replace(" ", "-")+"-stage"], ["value", stageModes[i].name.replace(" ", "-")]]);
}
var stageMode = document.getElementById("stage-theme-select").value.replace("-", " ");

characters = []
//Assemble the character data                                                                      dlc    sword  villain 3rdPty multi n-human
characters.push(new Character("Mario", 1, "Super Mario Bros.", "male", 1981, "Smash 64", 98, 1.76, false, false, false, false, false, false));
characters.push(new Character("Donkey Kong", 2, "Donkey Kong", "male", 1981, "Smash 64", 127, 1.87, false, false, false, false, false, true));
characters.push(new Character("Link", 3, "Legend of Zelda", "male", 1986, "Smash 64", 104, 1.53, false, true, false, false, false, false));
characters.push(new Character("Samus", 4, "Metroid", "female", 1986, "Smash 64", 108, 1.65, false, false, false, false, false, false));
characters.push(new Character("Dark Samus", 4.5, "Metroid", "female", 2005, "Ultimate", 108, 1.65, false, false, true, false, false, true));
characters.push(new Character("Yoshi", 5, "Yoshi's Island", "male", 1990, "Smash 64", 104, 2.05, false, false, false, false, false, true));
characters.push(new Character("Kirby", 6, "Kirby", "male", 1992, "Smash 64", 79, 1.73, false, false, false, false, false, true));
characters.push(new Character("Fox", 7, "Star Fox", "male", 1993, "Smash 64", 77, 2.4, false, false, false, false, false, true));
characters.push(new Character("Pikachu", 8, "Pokemon", "both", 1996, "Smash 64", 79, 2.04, false, false, false, false, false, true));
characters.push(new Character("Luigi", 9, "Super Mario Bros.", "male", 1983, "Smash 64", 97, 1.65, false, false, false, false, false, false));
characters.push(new Character("Ness", 10, "Earthbound", "male", 1994, "Smash 64", 94, 1.61, false, false, false, false, false, false));
characters.push(new Character("Captain Falcon", 11, "F-Zero", "male", 1990, "Smash 64", 104, 2.55, false, false, false, false, false, false));
characters.push(new Character("Jigglypuff", 12, "Pokemon", "female", 1996, "Smash 64", 68, 1.27, false, false, false, false, false, true));
characters.push(new Character("Peach", 13, "Super Mario Bros.", "female", 1985, "Melee", 89, 1.89, false, false, false, false, false, false));
characters.push(new Character("Daisy", 13.5, "Super Mario Bros.", "female", 1989, "Ultimate", 89, 1.89, false, false, false, false, false, false));
characters.push(new Character("Bowser", 14, "Super Mario Bros.", "male", 1985, "Melee", 135, 1.97, false, false, true, false, false, true));
characters.push(new Character("Ice Climbers", 15, "Other", "both", 1985, "Melee", 92, 1.53, false, false, false, false, true, false));
characters.push(new Character("Sheik", 16, "Legend of Zelda", "female", 1998, "Melee", 78, 2.42, false, false, false, false, false, false));
characters.push(new Character("Zelda", 17, "Legend of Zelda", "female", 1985, "Melee", 85, 1.43, false, false, false, false, false, false));
characters.push(new Character("Dr. Mario", 18, "Super Mario Bros.", "male", 1990, "Melee", 98, 1.4, false, false, false, false, false, false));
characters.push(new Character("Pichu", 19, "Pokemon", "male", 1999, "Melee", 62, 1.89, false, false, false, false, false, true));
characters.push(new Character("Falco", 20, "Star Fox", "male", 1993, "Melee", 82, 1.62, false, false, false, false, false, true));
characters.push(new Character("Marth", 21, "Fire Emblem", "male", 1990, "Melee", 90, 1.96, false, true, false, false, false, false));
characters.push(new Character("Lucina", 21.5, "Fire Emblem", "female", 2012, "Smash 4", 90, 1.96, false, true, false, false, false, false));
characters.push(new Character("Young Link", 22, "Legend of Zelda", "male", 1998, "Melee", 88, 1.75, false, true, false, false, false, false));
characters.push(new Character("Ganondorf", 23, "Legend of Zelda", "male", 1998, "Melee", 118, 1.34, false, true, true, false, false, false));
characters.push(new Character("Mewtwo", 24, "Pokemon", "neither", 1996, "Melee", 79, 2.26, true, false, true, false, false, true));
characters.push(new Character("Roy", 25, "Fire Emblem", "male", 2002, "Melee", 95, 2.15, true, true, false, false, false, false));
characters.push(new Character("Chrom", 25.5, "Fire Emblem", "male", 2012, "Melee", 95, 2.15, false, true, false, false, false, false));
characters.push(new Character("Mr. Game & Watch", 26, "Game & Watch", "male", 1980, "Melee", 75, 1.68, false, false, false, false, false, false));
characters.push(new Character("Meta Knight", 27, "Kirby", "male", 1993, "Brawl", 80, 2.09, false, true, true, false, false, true));
characters.push(new Character("Pit", 28, "Kid Icarus", "male", 1986, "Brawl", 96, 1.83, false, true, false, false, false, false));
characters.push(new Character("Dark Pit", 28.5, "Kid Icarus", "male", 2012, "Smash 4", 96, 1.83, false, true, true, false, false, false));
characters.push(new Character("Zero Suit Samus", 29, "Metroid", "female", 2004, "Brawl", 80, 2.31, false, false, false, false, false, false));
characters.push(new Character("Wario", 30, "Warioware", "male", 1992, "Brawl", 107, 1.65, false, false, true, false, false, false));
characters.push(new Character("Snake", 31, "Metal Gear", "male", 1987, "Brawl", 106, 1.6, false, false, false, true, false, false));
characters.push(new Character("Ike", 32, "Fire Emblem", "male", 2005, "Brawl", 107, 1.51, false, true, false, false, false, false));
characters.push(new Character("Pokemon Trainer", 34, "Pokemon", "both", 1996, "Brawl", 98, 1.76, false, false, false, false, true, false));
characters.push(new Character("Diddy Kong", 36, "Donkey Kong", "male", 1994, "Brawl", 90, 2, false, false, false, false, false, true));
characters.push(new Character("Lucas", 37, "Earthbound", "male", 2006, "Brawl", 94, 1.65, true, false, false, false, false, false));
characters.push(new Character("Sonic", 38, "Sonic", "male", 1991, "Brawl", 86, 3.85, false, false, false, true, false, true));
characters.push(new Character("King Dedede", 39, "Kirby", "male", 1992, "Brawl", 127, 1.5, false, false, true, false, false, true));
characters.push(new Character("Olimar", 40, "Pikmin", "male", 2001, "Brawl", 79, 1.62, false, false, false, false, true, false));
characters.push(new Character("Lucario", 41, "Pokemon", "male", 2006, "Brawl", 92, 1.71, false, false, false, false, false, true));
characters.push(new Character("R.O.B.", 42, "Other", "neither", 1985, "Brawl", 106, 1.73, false, false, false, false, false, true));
characters.push(new Character("Toon Link", 43, "Legend of Zelda", "male", 2002, "Brawl", 91, 1.91, false, true, false, false, false, false));
characters.push(new Character("Wolf", 44, "Star Fox", "male", 1997, "Brawl", 92, 1.54, false, false, true, false, false, true));
characters.push(new Character("Villager", 45, "Animal Crossing", "both", 2001, "Smash 4", 92, 1.4, false, false, false, false, true, false));
characters.push(new Character("Mega Man", 46, "Mega Man", "male", 1987, "Smash 4", 102, 1.6, false, false, false, true, false, true));
characters.push(new Character("Wii Fit Trainer", 47, "Wii Fit", "both", 2007, "Smash 4", 96, 1.87, false, false, false, false, true, false));
characters.push(new Character("Rosalina & Luma", 48, "Super Mario Bros.", "female", 2007, "Smash 4", 82, 1.8, false, false, false, false, true, false));
characters.push(new Character("Little Mac", 49, "Punch-Out", "male", 1983, "Smash 4", 87, 2.46, false, false, false, false, false, false));
characters.push(new Character("Greninja", 50, "Pokemon", "male", 2013, "Smash 4", 88, 2.29, false, false, false, false, false, true));
characters.push(new Character("Palutena", 54, "Kid Icarus", "female", 1986, "Smash 4", 91, 2.08, false, false, false, false, false, false));
characters.push(new Character("PAC-MAN", 55, "PAC-MAN", "male", 1980, "Smash 4", 95, 1.67, false, false, false, true, false, true));
characters.push(new Character("Robin", 56, "Fire Emblem", "both", 2012, "Smash 4", 95, 1.27, false, true, false, false, true, false));
characters.push(new Character("Shulk", 57, "Xenoblade Chronicles", "male", 2010, "Smash 4", 97, 1.67, false, true, false, false, false, false));
characters.push(new Character("Bowser Jr.", 58, "Super Mario Bros.", "both", 2002, "Smash 4", 108, 1.57, false, false, true, false, true, true));
characters.push(new Character("Duck Hunt", 59, "Other", "both", 1984, "Smash 4", 86, 1.79, false, false, false, false, true, true));
characters.push(new Character("Ryu", 60, "Street Fighter", "male", 1987, "Smash 4", 103, 1.6, true, false, false, true, false, false));
characters.push(new Character("Ken", 60.5, "Street Fighter", "male", 1987, "Ultimate", 103, 1.76, false, false, false, true, false, false));
characters.push(new Character("Cloud", 61, "Final Fantasy", "male", 1997, "Smash 4", 100, 2.17, true, true, false, true, false, false));
characters.push(new Character("Corrin", 62, "Fire Emblem", "both", 2015, "Smash 4", 98, 1.56, true, true, false, false, true, false));
characters.push(new Character("Bayonetta", 63, "Bayonetta", "female", 2009, "Smash 4", 81, 1.76, true, false, true, true, false, false));
characters.push(new Character("Inkling", 64, "Splatoon", "both", 2015, "Ultimate", 94, 1.93, false, false, false, false, true, false));
characters.push(new Character("Ridley", 65, "Metroid", "male", 1986, "Ultimate", 107, 2.2, false, false, true, false, false, true));
characters.push(new Character("Simon", 66, "Castlevania", "male", 1986, "Ultimate", 107, 1.52, false, false, false, true, false, false));
characters.push(new Character("Richter", 66.5, "Castlevania", "male", 1993, "Ultimate", 107, 1.52, false, false, false, true, false, false));
characters.push(new Character("King K. Rool", 67, "Donkey Kong", "male", 1994, "Ultimate", 133, 1.49, false, false, true, false, false, true));
characters.push(new Character("Isabelle", 68, "Animal Crossing", "female", 2012, "Ultimate", 88, 1.48, false, false, false, false, false, true));
characters.push(new Character("Incineroar", 69, "Pokemon", "male", 2016, "Ultimate", 116, 1.18, false, false, false, false, false, true));
characters.push(new Character("Piranha Plant", 70, "Super Mario Bros.", "neither", 1985, "Ultimate", 112, 1.72, true, false, true, false, false, true));
characters.push(new Character("Joker", 71, "Persona", "male", 2016, "Ultimate", 93, 2.06, true, true, false, true, true, false));
characters.push(new Character("Hero", 72, "Dragon Quest", "male", 2017, "Ultimate", 101, 1.84, true, true, false, true, true, false));
characters.push(new Character("Banjo & Kazooie", 73, "Banjo-Kazooie", "both", 1998, "Ultimate", 106, 2.18, true, false, false, true, true, true));
characters.push(new Character("Terry", 74, "Fatal Fury", "male", 1991, "Ultimate", 108, 1.72, true, false, false, true, false, false));
characters.push(new Character("Byleth", 75, "Fire Emblem", "both", 2019, "Ultimate", 97, 1.43, true, true, false, false, true, false));
characters.push(new Character("Min Min", 76, "ARMS", "female", 2017, "Ultimate", 104, 1.57, true, false, false, false, false, false));

for (var i = 0; i < characters.length; i++)
{
	addElement("option", characters[i].name, "removed-chars", [["id",characters[i].name.toLowerCase()],["value",characters[i].name]])
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
	if (!allCharSeries.find(element => element == characters[i].series))
	{
		allCharSeries.push(characters[i].series)
	}
}

for (var i = 0; i < allCharSeries.length; i++)
{
	addElement("option", allCharSeries[i], "char-series-select", [["id",allCharSeries[i].toLowerCase()],["value",allCharSeries[i]]])
}

stages = []
//Assemble the stage data                                              dlc    large  3rd party
stages.push(new Stage("Battlefield", 0, "Super Smash Bros.", "Ultimate", 0, false, false, false));
stages.push(new Stage("Final Destination", 1, "Super Smash Bros.", "Ultimate", 0, false, false, false));
stages.push(new Stage("Big Battlefield", 2, "Super Smash Bros.", "Ultimate", 5, false, true, false));
stages.push(new Stage("Peach's Castle", 3, "Super Mario Bros.", "Smash 64", 5, true, false, false));
stages.push(new Stage("Kongo Jungle", 4, "Donkey Kong", "Smash 64", 5, true, false, false));
stages.push(new Stage("Hyrule Castle", 5, "Legend of Zelda", "Smash 64", 5, true, true, false));
stages.push(new Stage("Super Happy Tree", 6, "Yoshi's Island", "Smash 64", 5, false, false, false));
stages.push(new Stage("Dream Land", 7, "Kirby", "Smash 64", 5, true, false, false));
stages.push(new Stage("Saffron City", 8, "Pokemon", "Smash 64", 5, false, false, false));
stages.push(new Stage("Mushroom Kingdom", 9, "Super Mario Bros.", "Smash 64", 5, false, false, false));
stages.push(new Stage("Princess Peach's Castle", 10, "Super Mario Bros.", "Melee", 5, false, true, false));
stages.push(new Stage("Rainbow Cruise", 11, "Super Mario Bros.", "Melee", 4, false, false, false));
stages.push(new Stage("Kongo Falls", 12, "Donkey Kong", "Melee", 5, false, false, false));
stages.push(new Stage("Jungle Japes", 13, "Donkey Kong", "Melee", 5, false, false, false));
stages.push(new Stage("Great Bay", 14, "Legend of Zelda", "Melee", 5, false, false, false));
stages.push(new Stage("Temple", 15, "Legend of Zelda", "Melee", 5, false, true, false));
stages.push(new Stage("Brinstar", 16, "Metroid", "Melee", 5, false, false, false));
stages.push(new Stage("Yoshi's Island (Melee)", 17, "Yoshi's Island", "Melee", 5, false, false, false));
stages.push(new Stage("Yoshi's Story", 18, "Yoshi's Island", "Melee", 2, false, false, false));
stages.push(new Stage("Fountain of Dreams", 19, "Kirby", "Melee", 5, false, false, false));
stages.push(new Stage("Green Greens", 20, "Kirby", "Melee", 5, false, false, false));
stages.push(new Stage("Corneria", 21, "Star Fox", "Melee", 5, false, true, false));
stages.push(new Stage("Venom", 22, "Star Fox", "Melee", 5, false, true, false));
stages.push(new Stage("Pokemon Stadium", 23, "Pokemon", "Melee", 3, false, false, false));
stages.push(new Stage("Onett", 24, "Earthbound", "Melee", 5, false, true, false));
stages.push(new Stage("Mushroom Kingdom II", 25, "Super Mario Bros.", "Melee", 5, false, false, false));
stages.push(new Stage("Brinstar Depths", 26, "Metroid", "Melee", 5, false, false, false));
stages.push(new Stage("Big Blue", 27, "F-Zero", "Melee", 5, false, false, false));
stages.push(new Stage("Fourside", 28,  "Earthbound", "Melee", 5, false, true, false));
stages.push(new Stage("Delfino Plaza", 29, "Super Mario Bros.", "Brawl", 5, false, false, false));
stages.push(new Stage("Mushroomy Kingdom", 30, "Super Mario Bros.", "Brawl", 5, false, false, false));
stages.push(new Stage("Figure-8 Circuit", 31, "Super Mario Bros.", "Brawl", 5, false, false, false));
stages.push(new Stage("Warioware, Inc.", 32, "Warioware", "Brawl", 3, false, false, false));
stages.push(new Stage("Bridge of Eldin", 33, "Legend of Zelda", "Brawl", 5, false, true, false));
stages.push(new Stage("Norfair", 34, "Metroid", "Brawl", 5, false, false, false));
stages.push(new Stage("Frigate Orpheon", 35, "Metroid", "Brawl", 4, false, false, false));
stages.push(new Stage("Yoshi's Island", 36, "Yoshi's Island", "Brawl", 3, false, false, false));
stages.push(new Stage("Halberd", 37, "Kirby", "Brawl", 4, false, false, false));
stages.push(new Stage("Lylat Cruise", 38, "Star Fox", "Brawl", 2, false, false, false));
stages.push(new Stage("Pokemon Stadium 2", 39, "Pokemon", "Brawl", 0, false, false, false));
stages.push(new Stage("Port Town Aero Dive", 40, "F-Zero", "Brawl", 5, false, false, false));
stages.push(new Stage("Castle Siege", 41, "Fire Emblem", "Brawl", 4, false, false, false));
stages.push(new Stage("Distant Planet", 42, "Pikmin", "Brawl", 5, false, false, false));
stages.push(new Stage("Smashville", 43, "Animal Crossing", "Brawl", 0, false, false, false));
stages.push(new Stage("New Pork City", 44, "Earthbound", "Brawl", 5, false, true, false));
stages.push(new Stage("Summit", 45, "Other", "Brawl", 5, false, false, false));
stages.push(new Stage("Skyworld", 46, "Kid Icarus", "Brawl", 5, false, false, false));
stages.push(new Stage("Shadow Moses Island", 47, "Metal Gear", "Brawl", 5, false, false, true));
stages.push(new Stage("Luigi's Mansion", 48, "Super Mario Bros.", "Brawl", 5, false, false, false));
stages.push(new Stage("Pirate Ship", 49, "Legend of Zelda", "Brawl", 5, true, false, false));
stages.push(new Stage("Spear Pillar", 50, "Pokemon", "Brawl", 5, false, false, false));
stages.push(new Stage("75m", 51, "Donkey Kong", "Brawl", 5, false, true, false));
stages.push(new Stage("Mario Bros.", 52, "Super Mario Bros.", "Brawl", 5, false, true, false));
stages.push(new Stage("Hanenbow", 53, "Other", "Brawl", 5, false, true, false));
stages.push(new Stage("Green Hill Zone", 54, "Sonic", "Brawl", 5, false, false, true));
stages.push(new Stage("3D Land", 55, "Super Mario Bros.", "3DS", 5, false, false, false));
stages.push(new Stage("Golden Plains", 56, "Super Mario Bros.", "3DS", 5, false, false, false));
stages.push(new Stage("Paper Mario", 57, "Super Mario Bros.", "3DS", 5, false, false, false));
stages.push(new Stage("Gerudo Valley", 58, "Legend of Zelda", "3DS", 5, false, false, false));
stages.push(new Stage("Spirit Train", 59, "Legend of Zelda", "3DS", 5, false, false, false));
stages.push(new Stage("Dream Land GB", 60, "Kirby", "3DS", 5, false, false, false));
stages.push(new Stage("Unova Pokemon League", 61, "Pokemon", "3DS", 3, false, false, false));
stages.push(new Stage("Prism Tower", 62, "Pokemon", "3DS", 5, false, false, false));
stages.push(new Stage("Mute City SNES", 63, "F-Zero", "3DS", 5, false, false, false));
stages.push(new Stage("Magicant", 64, "Earthbound", "3DS", 5, false, false, false));
stages.push(new Stage("Arena Ferox", 65, "Fire Emblem", "3DS", 5, false, false, false));
stages.push(new Stage("Reset Bomb Forest", 66, "Kid Icarus", "3DS", 5, false, false, false));
stages.push(new Stage("Tortimer Island", 67, "Animal Crossing", "3DS", 5, false, true, false));
stages.push(new Stage("Balloon Fight", 68, "Other", "3DS", 5, false, false, false));
stages.push(new Stage("Living Room", 69, "Other", "3DS", 5, false, true, false));
stages.push(new Stage("Find Mii", 70, "Other", "3DS", 5, false, false, false));
stages.push(new Stage("Tomodachi Life", 71, "Other", "3DS", 5, false, false, false));
stages.push(new Stage("PictoChat 2", 72, "Other", "3DS", 5, false, false, false));
stages.push(new Stage("Mushroom Kingdom U", 73, "Super Mario Bros.", "Wii U", 5, false, true, false));
stages.push(new Stage("Mario Galaxy", 74, "Super Mario Bros.", "Wii U", 5, false, true, false));
stages.push(new Stage("Mario Circuit", 75, "Super Mario Bros.", "Wii U", 5, false, false, false));
stages.push(new Stage("Skyloft", 76, "Legend of Zelda", "Wii U", 3, false, true, false));
stages.push(new Stage("The Great Cave Offensive", 77, "Kirby", "Wii U", 5, false, true, false));
stages.push(new Stage("Kalos Pokemon League", 78, "Pokemon", "Wii U", 1, false, false, false));
stages.push(new Stage("Coliseum", 79, "Fire Emblem", "Wii U", 5, false, true, false));
stages.push(new Stage("Flat Zone X", 80, "Game & Watch", "Wii U", 5, false, false, false));
stages.push(new Stage("Palutena's Temple", 81, "Kid Icarus", "Wii U", 5, false, true, false));
stages.push(new Stage("Gamer", 82, "Warioware", "Wii U", 5, false, false, false));
stages.push(new Stage("Garden of Hope", 83, "Pikmin", "Wii U", 5, false, true, false));
stages.push(new Stage("Town and City", 84, "Animal Crossing", "Wii U", 0, false, false, false));
stages.push(new Stage("Wii Fit Studio", 85, "Wii Fit", "Wii U", 5, false, true, false));
stages.push(new Stage("Boxing Ring", 86, "Punch-Out", "Wii U", 5, false, true, false));
stages.push(new Stage("Gaur Plain", 87, "Xenoblade Chronicles", "Wii U", 5, false, true, false));
stages.push(new Stage("Duck Hunt", 88, "Other", "Wii U", 5, false, false, false));
stages.push(new Stage("Wrecking Crew", 89, "Other", "Wii U", 5, false, true, false));
stages.push(new Stage("Pilotwings", 90, "Other", "Wii U", 5, false, false, false));
stages.push(new Stage("Wuhu Island", 91, "Other", "Wii U", 4, false, false, false));
stages.push(new Stage("Windy Hill Zone", 92, "Sonic", "Wii U", 5, false, true, true));
stages.push(new Stage("Wily Castle", 93, "Mega Man", "Wii U", 4, false, false, true));
stages.push(new Stage("PAC-LAND", 94, "PAC-MAN", "Wii U", 5, false, true, true));
stages.push(new Stage("Super Mario Maker", 95, "Super Mario Bros.", "Wii U", 5, true, false, false));
stages.push(new Stage("Suzaku Castle", 96, "Street Fighter", "Wii U", 5, true, true, true));
stages.push(new Stage("Midgar", 97, "Final Fantasy", "Wii U", 5, true, false, true));
stages.push(new Stage("Umbra Clock Tower", 98, "Bayonetta", "Wii U", 5, true, true, true));
stages.push(new Stage("New Donk City Hall", 99, "Super Mario Bros.", "Ultimate", 5, false, true, false));
stages.push(new Stage("Great Plateau Tower", 100, "Legend of Zelda", "Ultimate", 5, false, false, false));
stages.push(new Stage("Moray Towers", 101, "Splatoon", "Ultimate", 5, false, true, false));
stages.push(new Stage("Dracula's Castle", 102, "Castlevania", "Ultimate", 5, false, true, false));
stages.push(new Stage("Mementos", 103, "Persona", "Ultimate", 4, true, true, true));
stages.push(new Stage("Yggdrasil's Altar", 104, "Dragon Quest", "Ultimate", 3, true, true, true));
stages.push(new Stage("Spiral Mountain", 105, "Banjo-Kazooie", "Ultimate", 5, true, false, true));
stages.push(new Stage("King of Fighters Stadium", 106, "Fatal Fury", "Ultimate", 5, true, false, true));
stages.push(new Stage("Garreg Mach Monastery", 107, "Fire Emblem", "Ultimate", 5, true, false, false));
stages.push(new Stage("Spring Stadium", 108, "ARMS", "Ultimate", 4, true, false, false));

for (var i = 0; i < stages.length; i++)
{
	addElement("option", stages[i].name, "removed-stages", [["id",stages[i].name.toLowerCase()],["value",stages[i].name]])
}

for (var i = 0; i < stages.length; i++)
{
	if (removedStages.includes(stages[i].name))
	{
		stages.splice(i, 1);
	}
}

var allStageSeries = []
for (var i = 0; i < stages.length; i++)
{
	if (!allStageSeries.find(element => element == stages[i].series))
	{
		allStageSeries.push(stages[i].series);
	}
}

for (var i = 0; i < allStageSeries.length; i++)
{
	addElement("option", allStageSeries[i], "stage-series-select", [["id",allStageSeries[i].toLowerCase()],["value",allStageSeries[i]]])
}

//make a variable for the number of unique stages
var totalUniqueStages = stages.length;

//add BF and Ω forms if the player wants them added
if (includeAltForms)
{
	for (var i = 0; i<totalUniqueStages; i++)
	{
		stages.push(new Stage("BF "+stages[i].name, stages[i].number+totalUniqueStages, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
	}
	for (var i = 0; i<totalUniqueStages; i++)
	{
		stages.push(new Stage("Ω "+stages[i].name, stages[i].number+totalUniqueStages*2, stages[i].series, stages[i].firstSmashAppearance, stages[i].legality, stages[i].dlc, false, stages[i].isThirdParty));
	}
	stages.splice(stages.findIndex(element => element.name == "BF Battlefield"), 1);
	stages.splice(stages.findIndex(element => element.name == "BF Big Battlefield"), 1);
	stages.splice(stages.findIndex(element => element.name == "Ω Final Destination"), 1);
	stages.splice(stages.findIndex(element => element.name == "Ω Big Battlefield"), 1);
}

var allStageSeries = []
for (var i = 0; i < stages.length; i++)
{
	if (!allStageSeries.find(element => element == stages[i].series))
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

document.getElementById("open-button-custom").addEventListener("click", function(event){
    event.preventDefault();
	openFormCustom();
});

document.getElementById("btn-cancel").addEventListener("click", function(event){
    event.preventDefault();
	closeForm();
});

document.getElementById("btn-cancel-custom").addEventListener("click", function(event){
    event.preventDefault();
	closeFormCustom();
});

document.getElementById("add-mii-btn").addEventListener("click", function(event){
    event.preventDefault();
	addMii();
});

document.getElementById("btn-cancel-mii").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("btn-delete-mii").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("custom-stage-btn").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("custom-char-theme-btn").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("btn-delete-char-theme").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("btn-cancel-char-theme").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("custom-stage-theme-btn").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("btn-delete-stage-theme").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("btn-cancel-stage-theme").addEventListener("click", function(event){
    event.preventDefault();
});

document.getElementById("code-btn").addEventListener("click", function(event){
    event.preventDefault();
    openCode();
});

document.getElementById("code-btn-cancel").addEventListener("click", function(event){
    event.preventDefault();
});