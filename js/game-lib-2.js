//game-lib-2.js
//setage
function setAge(index){
    var my_age =-1;
    if(SELF_ID==index && initialization_stage ==true){
        character_arr[SELF_ID].age = 0;
        //console.log(index)
        return;
    }
    if(character_arr[index].children[0] ==undefined){
        my_age = getRandomInt(0,MIN_ADULT_AGE);
        character_arr[index].age = my_age;
    }
    else{//has kids. needs to get older
        my_age = getRandomInt(MIN_ADULT_AGE,MAX_ADULT_AGE);
        if(getOldestChildAge(index) + MIN_ADULT_AGE > my_age){
            my_age = getOldestChildAge(index) + MIN_ADULT_AGE;
        }
        character_arr[index].age = my_age;
    }
};

function getOldestChildAge(index){
    var max_age = -1

    for(var i=0; i<character_arr[index].children.length; i++){
        var rel_index = character_arr[index].children[i];
        if(character_arr[i].age > max_age){max_age = character_arr[i].age}
    }
    return max_age;
};

function clear_rightinfobox(){
    //update log
if(initialization_stage){alert("You must submit a character!");return;}
    LOG = LOG.replace("<br><br><br>","<br>")
        LOG = LOG.replace("<br><br>","<br>")
  document.getElementById("rightinfobox").innerHTML = LOG;  
};


function showMyStats(){
    //show health, fertility, etc
}

function alertHeader(str){
    var alert = "Alert: ";
    str = replaceLineBreak(str);
    alert += str;
    document.getElementById("rightmsgbox").innerHTML = alert;
};


function addTime(num){
   clear_rightinfobox();
    if(initialization_stage){alert("You must submit a character!");return;}
    
    if(TOWN_NAME ==""){alert("You must submit a name for your town!");return;}
    TURN_COUNT+=num;
    var year_start = TURN_COUNT % SEASONS_PER_YEAR;
        var year_num = TURN_COUNT/SEASONS_PER_YEAR;
    var str ="";
    var alert =""
            str = "<br><b>YEAR " + Math.floor(year_num) +"</b>";
      document.getElementById("time_counter").innerHTML = str+" SEASON: "+getSeason(year_start); 
    if(year_start==0){

        LOG +=str+"<br>";
        

  document.getElementById("rightinfobox").innerHTML = LOG; 
        
        for(var i=0; i<character_arr.length; i++){
            if(character_arr[i].is_alive){
        character_arr[i].age++;
                killIfOld(i);
            }
            if(inScope(i)){
                //console.log(getFullName(i),character_arr[i].age)
                LOG += replaceCharacterLinks(updateAgeGroup(i),i);
              alert+= replaceCharacterLinks(updateAgeGroup(i),i);
            }else
                {
                    var ex =updateAgeGroup(i);
                }
    }
        
        LOG += recordBirthday(SELF_ID);
        alert += recordBirthday(SELF_ID);
   
        
        
        console.log("alert:",alert);
             alertHeader(alert);
    var str_2= "<b>Playing as: "+getFullName(SELF_ID).toUpperCase() + " (age: "+character_arr[SELF_ID].age+")</b>"
    
    str_2 = replaceCharacterLinks(str_2,SELF_ID);
     document.getElementById("displaylogheader").innerHTML =  str_2; 
        
    }
}

function recordBirthday(index){
    var str = "";
    if(index == SELF_ID && character_arr[index].age == 1){ 
    str += getFullName(index) + " was born!<br>";
    }else if(index == SELF_ID){
        str += getFullName(index) + " turned " + character_arr[index].age + " years old.<br>"
        
        //kill people.
       // str += checkMortality();
        
    }
    str = replaceCharacterLinks(str,index);
    return str;
};

function CharacterCreatorDiv(){
    
    var str ="<div id=\"characterinfobox\"><b>Create a character. Blank values will be filled with random values.</b><br>First Name: <input type=\"text\" id =\"firstname\"> Last Name: <input type=\"text\" id=\"lastname\"><br><input type=\"radio\" id=\"male\" name=\"gender\" value=\"male\"><label for=\"male\">Male</label><br><input type=\"radio\" id=\"female\" name=\"gender\" value=\"female\"><label for=\"female\">Female</label><br><button id=\"submitCharacter\" onclick=\"submitCharacter()\">Submit</button ><button id=\"randomCharacter\" onclick=\"submitCharacter()\">Randomize</button ></div>";
    document.getElementById("rightinfobox").innerHTML = str;
    
};
