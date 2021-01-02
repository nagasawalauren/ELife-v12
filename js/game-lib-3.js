//game-lib-3.js

function updateAgeGroup(index){
    //console.log(getFullName(index),character_arr[index].age)
    var str = "";
    var myage = character_arr[index].age;
    //
    if(myage<MAX_BABY_AGE && TURN_COUNT ==4){
        //set all babies to baby career in the first year cycle of the game.
        str += setSchool(index, "Baby","family")
    }
    if(myage == MAX_BABY_AGE){
        str = getRelPrefix(index)+ getFullName(index) + " has become a child! "
        str += setSchool(index,"Elementary School Student", "elementary school")
    }else if(myage == MIN_HIGH_SCHOOL_AGE){
         str += setSchool(index,"High School Student", "high school")     
    }else if(myage == MIN_ADULT_AGE)
    {
        str = getRelPrefix(index)+ getFullName(index) + " has become an adult! "
    }else if(myage == MAX_ADULT_AGE)
        {
            str =getRelPrefix(index)+ getFullName(index) + " has become an elder! "
        }
    return str+"<br>";
};

function getRelPrefix(index){
    if(SELF_ID == index){return "";}
    var gender = character_arr[index].gender;
    var age = character_arr[index].age;
    var prefix = "My ";
    if(character_arr[SELF_ID].siblings.includes(index)){
        if(character_arr[SELF_ID].age < age){ prefix += "older " }
        else if (character_arr[SELF_ID].age > age){ prefix += "younger "}
        else {prefix += "twin " };
        
        if(gender == "m"){prefix += "brother, "}
        else if(gender == "f"){prefix += "sister, "}
        else {prefix += "sibling, "};

    }
    else if (character_arr[SELF_ID].parents.includes(index)){
        if(gender == "m"){prefix += "father, "}
        else if(gender == "f"){prefix += "mother, "}
        else {prefix += "parent, "}
    }
    else if(character_arr[SELF_ID].friends.includes(index)){
        prefix += "friend, "
    }
    else if(character_arr[SELF_ID].partners.includes(index)){
        if(gender == "m"){prefix += "husband, "}
        else if(gender == "f"){prefix += "wife, "}
        else {prefix += "spouse, "}
    }
    //console.log(prefix,getFullName(index))
    return prefix;
};

function checkMortality(){
    //a culling function.
    var str = "";
    for(var i=0; i<character_arr.length; i++){
        var kill = getRandomInt(0,100);
        if(kill > DEATH_RATE){
            str = killCharacter(index) + " of unexplained circumstances.";
        }else if(character_arr[i].age >= DEATH_AGE)
        {
            str = killCharacter(index) + " of old age.";
        }else if(character_arr[i].health_rating < CRITICAL_HEALTH)
        {
            str = killCharacter(index) + " of poor health.";
        }

        str = inScope(i, str);
    }
    return str + "<br>";
};

function inScope(index){
  var rel_arr = [];
   rel_arr = rel_arr.concat(character_arr[SELF_ID].parents);
   rel_arr = rel_arr.concat(character_arr[SELF_ID].siblings);
    rel_arr = rel_arr.concat(character_arr[SELF_ID].partners);
    rel_arr = rel_arr.concat(character_arr[SELF_ID].children);
    rel_arr = rel_arr.concat(character_arr[SELF_ID].friends);
    
    if(index == SELF_ID){
      return true;
    }else if(rel_arr.includes(index)){
        //console.log("inscope",getFullName(index),index, rel_arr)
        return true;
    }else{
        return false;
    }
};

function killCharacter(index){
        character_arr[index].is_alive = false;
        str = getFullName(index) + " has died."
    if(inScope(index)){alertHeader(str)};
    
};
