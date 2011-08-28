soundManager.url = 'resources/'; // directory where SM2 .SWFs live
var sound = new Array(8);
var error;
var loopy;

soundManager.onload = function() {
 
  // SM2 is ready to go!
  sound[0] = soundManager.createSound({
    id: 'oneSound',
    url: 'sound/1.mp3',
    volume: 40
  });
   sound[1] = soundManager.createSound({
    id: 'twoSound',
    url: 'sound/2.mp3',
    volume: 40
  });
   sound[2] = soundManager.createSound({
    id: 'threeSound',
    url: 'sound/3.mp3',
    volume: 40
  });
   sound[3] = soundManager.createSound({
    id: 'fourSound',
    url: 'sound/4.mp3',
    volume: 40
  });
   sound[4] = soundManager.createSound({
    id: 'fiveSound',
    url: 'sound/5.mp3',
    volume: 40
  });
   sound[5] = soundManager.createSound({
    id: 'sixSound',
    url: 'sound/6.mp3',
    volume: 40
  });
   sound[6] = soundManager.createSound({
    id: 'sevenSound',
    url: 'sound/7.mp3',
    volume: 40
  });
   sound[7] = soundManager.createSound({
    id: 'eightSound',
    url: 'sound/8.mp3',
    volume: 40
  }); 
  
    error = soundManager.createSound({
    id: 'error',
    url: 'sound/error.mp3',
    volume: 60,
	pan: 100
  });
  
   	loopy = soundManager.createSound({
    id: 'loopy',
    url: 'sound/loopy.mp3',
    volume: 40
  });
  loopSound('loopy');
  
}

window.onload= startGame;
document.onkeydown = checkkey;
var score=0;
var typed="";
var wordTotal=0; //keeps track of the total amount of words being used
var x=80;
var y=0;
var word="";
var charLocation;
var startFontSize=24;
var size=25;//stores the array word size
var fourLetters;
var wordPostion;
var gameStart;
var numberColor;
var isPalindrome;
var flashing;
var missedWords;
var gameOver;
/*HTML ID VALUES
 * Where the score is displayed="score"
 * Where the Gameboard is(where letters fall)="gameboard"
 * Where the text the user types shows up="typed"
 * the falling text= "gametest"
 */

function loopSound(soundID) {
window.setTimeout(function() {soundManager.play(soundID,{onjustbeforefinish:function(){loopSound(soundID);}});},500);
}

function getBrowserWidth(){
    //gets the users browser with
    var width=(document.documentElement.clientWidth);
    return width;
}
function setWordDropLocations(){
    //creates an array of 10 different pixel locations that the word can drop
    var width=getBrowserWidth();
    var dropLocations= new Array(10);
    var center=width/2;
    dropLocations[0]=center;
    dropLocations[1]=center-50;
    dropLocations[2]=center-100;
    dropLocations[3]=center-150;
    dropLocations[4]=center-200;
    dropLocations[5]=center+25;
    dropLocations[6]=center+50;
    dropLocations[7]=center+10;
    dropLocations[8]=center+5;
    dropLocations[9]=center+75;
    return dropLocations;
}
function getDropLocationsArray(num){
    //takes a number and returns the given array value
    var dropLoc=setWordDropLocations();
    return dropLoc[num];
}
function randomDropLocation(){
    //uses createRandomVar to call a random pixel location from the wordDropLocations Array
    var randomNum=createRandomVar(10);
    //get the drop location
    var whereToDrop= getDropLocationsArray(randomNum);
    //set it to the gametext pixel location
    document.getElementById("gametext").style.left =whereToDrop+"px";
    //alert(whereToDrop);
}
function setCityArray(){
    //returns the cityArray
    var location="city/";
    var cityArray=new Array(10);
    cityArray[0]=location+"one.png";
    cityArray[1]=location+"two.png";
    cityArray[2]=location+"three.png";
    cityArray[3]=location+"four.png";
    cityArray[4]=location+"five.png";
    cityArray[5]=location+"six.png";
    return cityArray;
}
function getCityArray(){
    //takes the cityArray and randomy variable to get the array location
    var cityArray=setCityArray();
    var randomNum=createRandomVar(6);
    //alert(cityArray[randomNum]);
    var image=cityArray[randomNum];
    setBoardBackground("typed",image);
}
function createRandomVar(num){
    //creates a random var between 0 and num -1
    var randomNum= Math.floor(Math.random()*num);
    //returns the var
    return randomNum;
}
function startGame(){
    gameOver=false;
    gameStart=false;
    missedWords=0;
    //sets the title screen
     document.getElementById("gameboard").style.backgroundImage="url(titlescreen.gif)";
}
function doOnLoad()
//calls all functions that need to be done as soon as the system loads
{
   //var c=fourLetterWords();
   //alert(c);
  // wordPosition=0;
   // alert(wordPosition);
   // document.getElementById("gametext").style.top = "0px";
   //alert(gameStart);
   numberColor=0;
   randomDropLocation();
   setBoardBackground("gameboard","grain.gif");
   fourLetterWords();
   //alert("fourLetterWords");
   setString();//tests the getString method
   //alert("setString");
   //setLeftAlignment();
   adjustScore(0);//tests the adjustScore method
   //alert("adjustScore");
   SlideText();
   //alert("slideText");
   setFont("gametext");
   
   //window.setInterval("timer()", 1000)
   //setInterval(timer(), 1000);//sets a timer that calls the timer function
}
function setLeftAlignment(){
     document.getElementById("gametext").style.left ="400px";
    /*alert("in SetAlignment");
    document.getElementById("gametext").style.textAlign = "center";*/
}
function fourLetterWords(){
    //sets the fourLetterWord array for level 1
    //currently creates an Array that is 25 words large
    fourLetters=new Array("MONK","FISH","DOOR","ROOM","FACE","TOOL","WANE","HAND",
    "HEAD","TEST","QUIZ","SODA","LAMP","MICE","EAST","WEST","LEFT","DOWN",
    "DEER","FEAR","TEAR","JUNK","ZINC","MINK","YARN");
    //alert(fourLetters[0]);
    //alert(fourLetters[24]);
}
function setString(){
    //gets the String that is about to fall, and sets it to be the new gameText
    //currently only one string is supported at a time
    //use math.random and math.floor to create a random num between 0 and size-1
    if (gameOver==false){
        charLocation=0;
        //creates a random value between the size of the Letters Array and 10
        var randomNum= createRandomVar(size+10);
        //the number is greater than or equal to five call a palindrome as the String
        //alert(randomNum);
        if(randomNum>=size){
            flashing=0;
            //then call a palindrome value and setit to the string
            isPalindrome=true;
            var s=getPalindromeArray();
            word=s;
            //start flashing the text to show that its a palindrome
            flashingPalindrome();
            //alert(s);
        }
        else{
            isPalindrome=false;
           var r=fourLetters[randomNum];
           word=r;
        }
       // alert(word);
        wordTotal++;//increase the word total by one
        //place the word in the game board
        document.getElementById("gametext").innerHTML = word;
    }
    //return s;
}
function flashingPalindrome(){
    if(isPalindrome==true){
        //if the word dropping is a palindrome set an interval to make it flash
        //change the color to var s
        //alert(flashing);
        var color=flashingArray(flashing);
        document.getElementById("gametext").style.color =color;
        //change the var s value
        flashing++;
        if(flashing>1){
            flashing=0;
        }
        setTimeout("flashingPalindrome()",200);
    }
}
function flashingArray(num){
    //set the flashing colors
    var flash=new Array(2)
    flash[0]="#fffc00";//Yellow
    flash[1]="#00ccff";//Blue
    //returns the given num array value
    return flash[num];
}
function checkkey(evt) {
    //Gets the Key input from the player and uses a switch statement for each key
    var thisKey = (evt) ? evt.which : window.event.keyCode;
    var charStr = String.fromCharCode(thisKey);
    //alert(gameStart);
      testInput(charStr);
  /*else if((thisKey<=122 &&thisKey>=90)||(thisKey<=97&&thisKey>=65))
    {
       //switch statement for each letter (to be used for sound?)
      switch(charStr)
        {
            case 'A':
                //alert("A");
                break;
             case'B':
                 //alert("B");
                 break;
             case 'C':
                // alert("C");
                 break;
             case 'D':
                //alert("D");
                break;
             case'E':
                 //alert("E");
                 break;
             case 'F':
                 //alert("F");
                 break;
             case 'G':
                //alert("G");
                break;
             case'H':
                 //alert("H");
                 break;
             case 'I':
                 //alert("I");
                 break;
             case 'J':
                //alert("J");
                break;
             case'K':
                 //alert("K");
                 break;
             case 'L':
                 //alert("L");
                 break;
              case 'M':
                //alert("M");
                break;
             case'N':
                 //alert("N");
                 break;
             case 'O':
                 //alert("O");
                 break;
             case 'P':
                //alert("P");
                break;
             case'Q':
                 //alert("Q");
                 break;
             case 'R':
                // alert("R");
                 break;
             case 'S':
                //alert("S");
                break;
             case'T':
                // alert("T");
                 break;
             case 'U':
                // alert("U");
                 break;
             case 'V':
                //alert("V");
                break;
             case'W':
                 //alert("W");
                 break;
             case 'X':
                 //alert("X");
                 break;
             case'Y':
                 //alert("Y");
                 break;
             case 'Z':
                // alert("Z");
                 break;
        }*/  
    //typed=typed+charStr;
    //document.getElementById("typed").innerHTML = typed;
    /*puts the typed letter @ "typed" in the html code which is located just underneath the
     *current game "table" or box where the "gametext" falls
     */
    //}
}
function adjustScore(length)
//changes the score value and returns it to its position at "score" in the bottom table
{
    var scoreUpdate=(length*100);
    score+=scoreUpdate;
    document.getElementById("score").innerHTML = score;
}
function SlideText(){
    /* Takes the text located within the table (w/ the id "gametext") and moves it 1 pixel a second
     * down the table until it reaches the bottom (400)*/
    if(gameOver==false){
     document.getElementById("gametext").style. top = currPos("gametext") + 1 + "px";
     //the above gets the current possion (calling the currPos funtion) and adds one pixel
     if (currPos("gametext") < "400") {
        setTimeout("SlideText()",200);//creates the time interval
     }
     else{
         //if the text falls below show image or effect to show the user they have failed to type the word
        // setBottomColor();
         //remove value from score
         soundManager.play('error');
		 adjustScore(-(word.length));
          missedWords++;
          if(missedWords==5){//game is over if 5 words have been wrong
             // alert("gameOver")
              //show the gameOver gif
              gameOver=true;
			  
             document.getElementById("gameboard").style.backgroundImage="url(gameover.gif)";
              //setBoardBackground("texture","gameover.gif");
              //create code to stop all other methods
          }
         //reset the word
            wordReset();
         //recursion to start the sliding all over again
            SlideText();

         }
    }
}
function currPos(elem) {
    //the currPos function that is used by the SlideText function
    //returns the elements current Bottom position
    //alert(document.getElementById(elem).top);
        return document.getElementById(elem).offsetTop;
     }
function muteIt(){
	soundManager.mute();
}	 

function unmuteIt(){
	soundManager.unmute();
}	 
	 
	 
function testInput(character)
//takes the user's inputted character and test to see if its the first character in the string
{
   if((charStr=" ")&&(gameStart==false)) {
       getCityArray();
       gameStart=true;
       doOnLoad();
   }
    if (character==word.charAt(charLocation)){
		
		var i = Math.round((8 - 1)*Math.random());
	while(sound[i].playState == 1){
			i = Math.round((8 - 1)*Math.random());
		}
		 sound[i].play();
		 
		
		
        if (charLocation==0)
        {//if its the first letter change the text color to red
            document.getElementById("gametext").style.color = "#00ff00";
        }
        //if the charLocation is the word length the user has finished typing the word
        if(charLocation==(word.length-1)){//they have typed the entire word
                //output the word in the section
                //update the score
                adjustScore(word.length);
                if(isPalindrome==true){
                    //if the word is a palindrome set it to a regular word
                    isPalindrome=false;
                    charLocation=0;
                    //set the color back to black
                    document.getElementById("gametext").style.color = "#ffffff";
                    //reset typed area
                    typed="";
                    //print the typed character it in "typed" element under the table
                    document.getElementById("typed").innerHTML = typed;
                    return;
                }
                else{
                //the user has typed the word correctly now reset (get a new word and put it back to the top)
                //make the word smaller until it disappears
                changeFontSize("gameText");
               }
        }

            //increase the char location by one (to find the next char)
        charLocation++;
        //set the typed string to the chararacter + what is currently in typed
        typed=typed+character;
        //print the typed character it in "typed" element under the table
        document.getElementById("typed").innerHTML = typed;
    }
	else{
		soundManager.play('error');
	}
}
function changeFontSize(){
    var element="gametext";
    //alert("In Change FontSize");
    if (currFontSize("gametext") > "0") {
        //alert(currFontSize("gametext"));
        var changeTo=currFontSize("gametext")-1;
        //alert(changeTo);
        document.getElementById(element).style.fontSize = changeTo+"px";
        setTimeout("changeFontSize()",25);//creates the time interval
    }
    else{
        //reset the word back to its original location
        wordReset();
        //Start the sliding all over again
        //SlideText();
        }
    
    //var curFon=parseInt(document.getElementById(element).style.fontSize);
   // alert(curFon);
}
function currFontSize(element){
    return parseInt(document.getElementById(element).style.fontSize);
}
function setFont(element){
    //sets the original game text font size
    document.getElementById(element).style.fontSize = startFontSize+"px";
    //var curFont=parseInt(document.getElementById(element).style.fontSize);
    //alert(curFont);
}
function wordReset(){
//resets a word back to orignally gamePlay type
    //create a new string
    if (gameOver==true){
    document.getElementById("gametext").innerHTML = "";
    //reset the typed bar to empty
     typed="";
    //place the empty type into the table in the index.html
    document.getElementById("typed").innerHTML = typed;
    //reset the char count
    charLocation=0;
    }
    else{
    setString();
   //reset the game text's fontSize back to original fontSize
    setFont("gametext");
     //resets the word location either when the user types the word or when the word has reached the bottom
    document.getElementById("gametext").style.top ="0px";
    //call the drop location of the next text
    randomDropLocation();
    //changes the color back to black
    document.getElementById("gametext").style.color ="#ffffff";
    //reset the typed bar to empty
     typed="";
    //place the empty type into the table in the index.html
    document.getElementById("typed").innerHTML = typed;
    //reset the char count
    charLocation=0;
    }
}
function setBoardBackground(element, image){
   /*creates a background for the given element with a given image name*/
     document.getElementById(element).style.backgroundImage="url("+image+")";
}
function setColorArray(num){
    var colors=new Array(4);
    colors[0]="#ffffff";//white
    colors[1]="#fff002";//yellow
    colors[2]="#ff9000";//orange
    colors[3]="#ff0000";//red
    return colors[num];
}
function setBottomColor(){//calls the array portion
    var colorToChange=setColorArray(numberColor);
   // alert(colorToChange);
    if(numberColor==5){
        numberColor=0;
        return;
    }
    else{
         //change the text color
        document.getElementById("gametext").style.color =colorToChange;
        numberColor++;
        //creates the time interval
        setTimeout("setBottomColor()",10);
    }
}
function setPalindromeArray(){
    //sets all the words to the palindromeArray
    ////returns the array
    //palindrome Array current consists of 25 words
    var palindromeArray=new Array("NOON","PEEP","SEES","ROTOR","POP","DAD","MOM",
    "SOLOS","NUN","EYE","DEED","PIP","TOOT","RADAR","LEVEL","WOW","DID","EVE","GAG",
    "PEP","TOT","KAYAK","MUM");
    return palindromeArray;
}
function getPalindromeArray(){
    //returns a word from the palindromeArray from math.random
    var palindromeArray=setPalindromeArray();
    var randomNum=createRandomVar(23);
    //alert(palindromeArray[randomNum]);
    return palindromeArray[randomNum];
}





