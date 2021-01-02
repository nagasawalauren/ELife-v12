//game-lib.js

//GLOBAL VARS and constants
var character_arr = []
var relationship_arr = []
var character_job_arr = []
var town_organization_arr = []
var initialization_stage = false;

var LOG = "";
var TOWN_NAME = "";

var SELF_ID = -1;
var SET_CHARACTER = false;

var CHARACTER_SEED_NUMBER = 100;
var MAX_BABY_AGE = 6;
var MIN_HIGH_SCHOOL_AGE = 13;
var MIN_ADULT_AGE = 18;
var MAX_ADULT_AGE = 65;
var DEATH_AGE = 120;
var MAX_INITIALIZATION_SIBLINGS = 2;
var MAX_INITIALIZATION_FRIENDS = 2;

//GAMEPLAY VARS
var SEASONS_PER_YEAR = 4;
var TURNS_PER_SEASON = 1;
var TURN_COUNT = 0;
var YEAR_LIMIT = -1;
var DEATH_RATE = 75;
var CRITICAL_HEALTH = 10;
//CONSTRUCTORS

function Character(fname, lname, gender){
    this.id = -1;
    this.first_name = fname;
    this.last_name = lname;
    this.gender = gender;
    this.sexuality = "";
    this.age = 0; 
    this.is_alive = true;
    this.attractiveness_rating = 0;
    this.health_rating = 100;
    this.fertility_rating = 0;
    this.intelligence_rating = 0; 
    this.charisma_rating = 0;
    this.net_worth = 0;
    this.traits = new Array();//FK array
    this.friends= new Array(); //index of the person on the other end of the relationship.
    this.siblings= new Array(); //index of the person on the other end of the relationship.
    this.parents= new Array(); //index of the person on the other end of the relationship.
    this.partners = new Array();
    this.children = new Array();
    this.items = new Array();//fk array
    this.job_ids = new Array();
};

function CharacterRelationship(aid,bid,ab_value,ba_value){
    this.aid = aid;
    this.bid = bid;
    this.ab_value = ab_value;
    this.ba_value = ba_value;
    this.get_value = function(id, id2){
        if(id == this.aid && id2 == this.bid){return this.ab_value;}
        else if (id==this.bid && id2 == this.aid){return this.ba_value;}
        else {return -1};}
    
};

function CharacterJob(index, myjobid, myorgid){
    this.character = index;
    this.job_id = myjobid;
    this.organization = myorgid;
    this.income = getRandomInt(job_arr[myjobid].income_level[0],job_arr[myjobid].income_level[1]);
    this.currentjob = true;
}

function Organization(org_index, org_name){
    this.name = org_name;
    this.type = organization_arr[org_index].type;
}

//

function initialize(){
        initialization_stage = true;
    delete character_arr;
    character_arr = new Array();
        delete relationship_arr;
    relationship_arr = new Array();
    delete character_job_arr;
    character_job_arr = new Array();
    delete town_organization_arr;
    town_organization_arr = new Array;
    
for(var i=0; i<CHARACTER_SEED_NUMBER; i++){
   var index=createCharacter("random", "random", "random");
}
    var length = character_arr.length
    
for(var i=0; i<length; i++){
    var numsib = getRandomInt(0,MAX_INITIALIZATION_SIBLINGS)
   createParents(i);
    createSiblings(i, numsib);
}
    //set relations for all
        var length = character_arr.length
for(var i=0; i<length; i++){
    setRelations(i);
    setAge(i);
    setInitialCharacterStats(i);
    
}
   CharacterCreatorDiv();
};





//initialize 

function setRelations(index){
    //create nodes for all characters
         
var rel_arr = [];
   rel_arr = rel_arr.concat(character_arr[index].parents);
   rel_arr = rel_arr.concat(character_arr[index].siblings);
    rel_arr = rel_arr.concat(character_arr[index].partners);
    rel_arr = rel_arr.concat(character_arr[index].children);
    rel_arr = rel_arr.concat(character_arr[index].friends);
      // console.log("relations set",rel_arr);
    for(var i=0; i < rel_arr.length; i++){
            var v1 = getRandomInt(0,100);
        var v2 = getRandomInt(0,100);

        if(RelNodeExists(index,rel_arr[i])<0){//if the node doesn't exist
        relationship_arr.push(new CharacterRelationship(index,rel_arr[i],v1,v2));

}
}
};



function RelNodeExists(index, index2){
    var result = -1;
    
    if(relationship_arr[0]==undefined){return -1;}
    
    for(var i=0; i<relationship_arr.length;i++){
        if(contains_pair(i, index, index2)){return i;}
    }
    return -1;
};

function contains_pair(rel_index, index, index_2){
    if(relationship_arr[rel_index].aid == index && relationship_arr[rel_index].bid == index_2)
    {return true;}
    else if (relationship_arr[rel_index].aid ==index_2 && relationship_arr[rel_index].bid == index){return true;}
    else {return false;}
};

function createSiblings(index, numsib){
    //console.log(numsib,"numsib")
   var lname = character_arr[index].last_name;
    var k =0;
  if(character_arr[index].parents[0] == undefined){return;}
    if(character_arr[index].siblings[0] != undefined){return;}

    if(character_arr[index].parents.length == 2){
        do{
        var p1 = character_arr[index].parents[0];
        var p2 = character_arr[index].parents[1];
        var sib = createCharacter("random",lname,"random");
            character_arr[sib].parents.push(p1);
    character_arr[sib].parents.push(p2);
    character_arr[p1].children.push(sib);
        character_arr[p2].children.push(sib);
            character_arr[index].siblings.push(sib);
            character_arr[sib].siblings.push(index);
            
            //for loop
            for(var q=character_arr[p1].children.length; q>0;q--){
                var q_chr = character_arr[p1].children[q];
                if(q_chr != undefined){if(!character_arr[q_chr].siblings.includes(sib) && q_chr != sib){
                    character_arr[q_chr].siblings.push(sib)
                }
                if(!character_arr[sib].siblings.includes(q_chr) && q_chr != sib){
                    character_arr[sib].siblings.push(q_chr)
                }}
            }
            
            k++;
        }while (k<numsib)  
            
    }
};


function createParents(index){
   var lname = character_arr[index].last_name;
    var p1=createCharacter("random",lname,"random");
    var p2=createCharacter("random",lname,"random");
    
    character_arr[index].parents.push(p1);
    character_arr[index].parents.push(p2);
    character_arr[p1].children.push(index);
        character_arr[p2].children.push(index);
           character_arr[p1].partners.push(p2);
       character_arr[p2].partners.push(p1);
    //console.log(getFullName(p1),getFullName(p2),getFullName(index))
}

function getLastNameArray(index){
    var lname = character_arr[index].last_name;
    var result = new Array();
    for(var i=0; i<character_arr.length; i++){
        if(character_arr[i].last_name ==lname)
            {result.push(i)}
    }
    return result;
};


function createCharacter(fname, lname, gender){
    //push one character to the array. if any of them say RANDOM, randomize the option.
    var f = fname;
    var l = lname;
    var g = gender;
    var f_random = getRandomInt(0,first_names_arr.length-1);
    if(fname=="random"){
        f = first_names_arr[f_random].firstname;
    }
    if (gender=="random")
    {
        g = first_names_arr[f_random].gender;
    }
    if(lname=="random")
        {
            
        l = last_names_arr[getRandomInt(0,last_names_arr.length-1)];
        }
    character_arr.push(new Character(f,l,g));
    return character_arr.length-1;
    
};

//getters

function getFullName(index){
    return character_arr[index].first_name + " " + character_arr[index].last_name;
}

//DISPLAY FUNCTION
//no return values

function displayCharData(index){
    if(TOWN_NAME ==""){alert("Please fill in town name."); return;}
    var myhtml = "";
    document.getElementById("rightinfobox").innerHTML = "";
    //HEADER!
    var deceased = ""
    if(!character_arr[index].is_alive){deceased = "(DECEASED)"}
    myhtml = "<div id=" + '"' + "displaychardataheader" + '"' + ">" + getFullName(index) + deceased + 
        "<br>Age: "+character_arr[index].age + 
        "<br>Gender: "+ character_arr[index].gender
        if(inScope(index)){
        myhtml += "<br>Money: $" + character_arr[index].net_worth }
        myhtml += "<br>" + displayCurrentJobs(index);
    //str = str.replace("baby at family", "baby at " + character_arr[index].last_name + " family" );
    var occupation_str = displayCurrentJobs(index)
    //
    myhtml += "</div><br>";
    
    myhtml += getCharacterStats(index)+"<br>";

    myhtml = replaceCharacterLinks(myhtml, index);
    myhtml += "<div id=\"displaychardatalistitem\">===RELATIONSHIPS===<br></div>"
    //BODY
    
    //console.log("myhtml:"+index+ "====="+ myhtml)
        for(var i=0;i<character_arr[index].partners.length;i++){
        var rel_index = character_arr[index].partners[i];
            
            var rel_value = relationship_arr[RelNodeExists(index,rel_index)].get_value(index,rel_index);
            myhtml += "<div id=" + '"' + "displaychardatalistitem" + '"' + ">- " + getFullName(rel_index) + " (partner)"+ displayProgressbar(rel_value) +"</div><br>";
    myhtml = replaceCharacterLinks(myhtml, rel_index);
    }
        for(var i=0;i<character_arr[index].children.length;i++){
        var rel_index = character_arr[index].children[i];
        var rel_value = relationship_arr[RelNodeExists(index,rel_index)].get_value(index,rel_index);
            myhtml += "<div id=" + '"' + "displaychardatalistitem" + '"' + ">- " + getFullName(rel_index) + " (child)"+displayProgressbar(rel_value)+"</div><br>";
    myhtml = replaceCharacterLinks(myhtml, rel_index);
    }
    
    for(var i=0;i<character_arr[index].parents.length;i++){
        var rel_index = character_arr[index].parents[i];
        var rel_value = relationship_arr[RelNodeExists(index,rel_index)].get_value(index,rel_index);
            myhtml += "<div id=" + '"' + "displaychardatalistitem" + '"' + ">- " + getFullName(rel_index) + " (parent)"+ displayProgressbar(rel_value) +"</div><br>";
    myhtml = replaceCharacterLinks(myhtml, rel_index);
    }
    


        for(var i=0;i<character_arr[index].siblings.length;i++){
        var rel_index = character_arr[index].siblings[i];
        var rel_value = relationship_arr[RelNodeExists(index,rel_index)].get_value(index,rel_index);
            myhtml += "<div id=" + '"' + "displaychardatalistitem" + '"' + ">- " + getFullName(rel_index) + " (sibling)"+displayProgressbar(rel_value)+"</div><br>";
    myhtml = replaceCharacterLinks(myhtml, rel_index);
    }
    myhtml = myhtml.replace(getFullName(SELF_ID),getFullName(SELF_ID).toUpperCase() + "*")
    document.getElementById("rightinfobox").innerHTML = myhtml;
    
};

function displayAllCharacters(){
  if(initialization_stage){alert("You must submit a character!");return;}
    //character_arr.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
    var az_index = new Array();
    
    for(var i=0; i< character_arr.length;i++){
        az_index.push(new Character(character_arr[i].first_name,character_arr[i].last_name,character_arr[i].gender));
        var az_i = az_index.length-1;
        az_index[az_i].id = i;
    }
    
    var lname = "";
    var myhtml = "<div>"
    az_index.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
    
    for(var i=0;i<az_index.length;i++){
        if(az_index[i].last_name != lname){
            lname = az_index[i].last_name;
            myhtml += "</div><br><div class="+'"' +"phonebook-container"+'"' + "><b>==="+ lname.toUpperCase() + "===</b><br>";
        }
        myhtml += "<div id="+ '"'+ "displaychardatalistitem" + '"'+ "> - " + az_index[i].first_name + " " + az_index[i].last_name + " (age " + character_arr[az_index[i].id].age + ")</div><br>";
        myhtml = replaceCharacterLinks(myhtml,az_index[i].id) ;
    }
    
    myhtml = myhtml.replace(getFullName(SELF_ID),getFullName(SELF_ID).toUpperCase() + "*")
    document.getElementById("rightinfobox").innerHTML = myhtml;
    delete az_index;
};


    
function updateTimeCounter(){
    var year = Math.floor(TURN_COUNT/4);
    var str = "YEAR: " + year + "\n";
    str += "SEASON: " + getSeason(TURN_COUNT) + "\n";
       
    
    document.getElementById("timeCounter").innerHTML = str;
    
};

function replaceCharacterLinks(html,index){
    //returns a string given character names replacing character names with a link...
    if(index<0){console.log(html)}
    var fullname = getFullName(index);
    
    var this_html = "<a class="+'"'+ "characterlink" +'"' + "value='"+index + "' onclick=" + '"' + "displayCharData(" + index;
    this_html += ")" + '"' + ">" + fullname + "</a>" ;
    var regex = new RegExp(fullname, "gi");
    var result = html.replace(regex, this_html);
    //console.log("linkreplace:"+result)
    return result;
};
    
function replaceLineBreak(html){
    //returns a string given character names replacing character names with a link...
    
    var regex = new RegExp("<br>", "gi");
    var result = html.replace(regex, "");
    
    //console.log("linkreplace:"+result)
    return result;
};

function displayProgressbar(value){
    // [###########] 
    var positive = "green";
    if(value < 0){positive="red"};
    var alt = value;
    var pb_value = Math.floor(value/10);
    
    var html= "<a alt=" + '"'+ value +'" ' + "style='color: " + positive  + "' class= "+ '"'+ "progressbar" + '"' +">[";
    for(var i=-10; i<10;i++){
        if(i<pb_value){
            html+="#";
        }else if (i==0){html+=" | "}
        else
        {
            html +="-"
        }
    }
    html += "] " + value +"</a>";
    return html;
};

//getters

function getSeason(num){
    var mod = num % SEASONS_PER_YEAR;
    
    switch (mod){
        default:
            return "null";
            break;
        case 0:
            return "spring";
            break;
        case 1:
            return "summer";
            break;
        case 2: 
            return "fall";
            break;
        case 3:
            return "winter";
            break;
    };
};

//RANDOM FUNCTIONS

//get random int
//return int
function getRandomInt(min, max) {
    //get an int between the min and max number.
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
