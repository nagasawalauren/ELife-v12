//game-lib-4.js

function setTownName(){
var str ="<div id=\"towninfobox\"><b>Create the town your family will live in.</b><br>My Town Name: <input type=\"text\" id =\"townname\"><button id=\"submitTownName\" onclick=\"makeTownName()\">Submit</button ><button id=\"randomTownName\" onclick=\"townNameGenerator()\">Randomize</button ></div>";
    document.getElementById("rightinfobox").innerHTML = str;
};

function makeTownName(){
    if(document.getElementById("townname").value ==""){
        TOWN_NAME = townNameGenerator();
        var err_message = "You have not submitted values for some of the form.\n The missing values have been randomized for you.";
        alert(err_message);
    }
 TOWN_NAME = document.getElementById("townname").value;
 console.log("TOWN NAME: ",TOWN_NAME)
    var str = "The Town of " + TOWN_NAME + "..."
   document.getElementById("title").innerHTML = str + "(ELIFE v.11)";
   document.getElementById("h1").innerHTML = str + "(ELIFE v.11)";
    //set organizations. 
    
    LOG = LOG.replace("TOWN_NAME", TOWN_NAME);
    //
    for(var i=0; i<organization_arr.length; i++){
        var orgname = organization_arr[i].name.replace("TOWN_NAME",TOWN_NAME)
        town_organization_arr.push(new Organization(i, orgname));
    }
    clear_rightinfobox();
};


function townNameGenerator(){
    var name = "";
    var syll = getRandomInt(1,2);
    for(var i=0; i<syll; i++){
        var con = getRandomInt(0,town_consonants.length-1);
        var vow = getRandomInt(0, town_vowels.length-1);
                var con2 = getRandomInt(0,town_consonants.length-1);
        name += town_consonants[con];
        name += town_vowels[vow];
            name += town_consonants[con2];
    }
    var suff = getRandomInt(0, town_suffix.length-1);
    name += town_suffix[suff];
    document.getElementById("townname").value = toTitleCase(name);
    return name;
}

function setSchool(index,title,type){
    
    var arr = getAllOrgsType(type);
    
    var org = arr[getRandomInt(0, arr.length-1)];

    var org2 = org.replace("TOWN_NAME",TOWN_NAME);
    var cj_index = character_job_arr.length-1;
    
    character_job_arr.push(new CharacterJob(index, getJobId(title),getOrgId(org2)));
    
var j = character_job_arr.length-1;
    character_arr[index].job_ids.push(j);
    //remove duplicates
    removeJobDups(index,getJobId(title),getOrgId(org2));
    
    if(type =="family"){return replaceCharacterLinks(getFullName(index),index) + " is currently a baby."}
    return replaceCharacterLinks(getFullName(index),index) + " started attending " + org2 +".";
};
    

function removeJobDups(index,jobid,orgid){
    //for each item, get array object in character jobs. if it matches the given parameters, remove that index.
    var match =0;
    for (var i=0; i<character_arr[index].job_ids.length; i++){
        var rel_index = character_arr[index].job_ids[i];
        if(match ==0 && character_job_arr[rel_index].character == index && character_job_arr[rel_index].job_id ==jobid && character_job_arr[rel_index].organization == orgid){
            match++
        }else if (match == 1 && character_job_arr[rel_index].character == index && character_job_arr[rel_index].job_id ==jobid && character_job_arr[rel_index].organization == orgid){
            //get rid of dup in character object
            var mindex = character_arr[index].job_ids.indexOf(rel_index);
            character_arr[index].job_ids.splice(mindex,1);
            //get rid of it in character job arr
            character_job_arr.splice(rel_index,1);
        }
    }
};

function getAllOrgsType(type){
    //gives names of all orgs as string array
    var arr = new Array();
    for(var i=0; i<town_organization_arr.length;i++){
        if(town_organization_arr[i].type ==type){
            arr.push(organization_arr[i].name);
        }
    }
    return arr;
};

function getOrgId(name){
    //gives id# ofthe org with this name.
    var result = -1;
    
    for(var i=0; i<town_organization_arr.length;i++){
        if(name == town_organization_arr[i].name){result = i;}
    }
    
    return result;
};

function getJobId(title){
    var result = -1;
    
    for(var i=0; i<job_arr.length;i++){
        if(title == job_arr[i].title){result = i;}
    }
    
    return result;
};

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  )
};

function submitCharacter(type){

    var f = "";
    f = document.getElementById("firstname").value;
        var l = "";
        l = document.getElementById("lastname").value;
    
    var gender = document.getElementsByName("gender");
    var g = "";
    for(var i=0; i< gender.length;i++){
        if(gender[i].checked){g = gender[i].value};
    }
    var err_message = "You have not submitted values for some of the form.\n The missing values have been randomized for you.";
    var err = false;
    if(f==""){f = "random";err = true;}
    if(l==""){l="random";err = true;}
    if(g==""){g= "random";err = true;}
    
    if(err){alert(err_message);}
    
   var index = createCharacter(f,l,g);
    SELF_ID = index;
    console.log("SELFID:", index)
    var numsib = getRandomInt(0,MAX_INITIALIZATION_SIBLINGS)
   createParents(index);
    createSiblings(index, numsib);
var length = character_arr.length
for(var i=0; i<length; i++){
    setRelations(i);
    setAge(i);
    setInitialCharacterStats(i)
}
    var str = "<b>Playing as: " + getFullName(index).toUpperCase() +" (age: "+ character_arr[index].age + ")</b>";
    var town = TOWN_NAME;
    console.log("town in submit character:",town)
    str = replaceCharacterLinks(str,index);
    document.getElementById("displaylogheader").innerHTML = str;
   LOG += "<b>=== The BEGINNING of a new DYNASTY ===</b><br> The House of " + character_arr[SELF_ID].last_name.toUpperCase() + " ... begins with " + getFullName(SELF_ID).toUpperCase() + " in the town of TOWN_NAME, population " + character_arr.length + "...<br><br><b>YEAR 0</b><br>";
        initialization_stage =false;
clear_rightinfobox();
    setTownName();
};
function getCharacterStats(index){
    var health = character_arr[index].health_rating;
    var charisma = character_arr[index].charisma_rating;
    var attractiveness = character_arr[index].attractiveness_rating;
    var intelligence = character_arr[index].intelligence_rating;
    var str = "<div id=\"displaychardatalistitem\" ><div id=\"displaychardatalistitem\" >Health:" + displayProgressbar(health)
    + "</div><div id=\"displaychardatalistitem\" >Charisma:" + displayProgressbar(charisma) + "</div><div id=\"displaychardatalistitem\" >Attractiveness:" + displayProgressbar(attractiveness) + "</div><div id=\"displaychardatalistitem\" >Intelligence:"
    + displayProgressbar(intelligence) + "</div></div>";
    return str;
};

function setInitialCharacterStats(index){
    character_arr[index].charisma_rating = getRandomInt(-100,100);
    character_arr[index].attractiveness_rating = getRandomInt(-100,100);
    character_arr[index].intelligence_rating = getRandomInt(-100,100);
    if(character_arr[index].age > MIN_ADULT_AGE){
        
    }
};