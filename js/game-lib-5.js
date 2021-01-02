//game-lib-5.js


function displayCurrentJobs(index){
//get array of jobs the character has and return text in the format "[job] at [org], " etc.
var str = ""

for(var i=0; i< character_arr[index].job_ids.length; i++){
    var rel_index = character_arr[index].job_ids[i];
    if(character_job_arr[rel_index].currentjob){
        var title = getTitleWithId(character_job_arr[rel_index].job_id);
        var org = getOrgnameWithId(character_job_arr[rel_index].organization);
        str += title + " at " + org + ", "; 

    }
}
    return str;
};


function getOrgnameWithId(index){
    var result = "";
    for(var i=0; i<town_organization_arr.length; i++){
        if(i== index){
            result = town_organization_arr[i].name;
        }
    }
    return result;
};

function getTitleWithId(index){
    var result = "";
    for(var i=0; i<job_arr.length; i++){
        if(i== index){
            result = job_arr[i].title;
        }
    }
    return result;
};

function displayPreviousJobs(index){
//get array of jobs the character has and return text in the format "[job] at [org], " etc.

};

function killIfOld(index){
    
  if(character_arr[index].age >= DEATH_AGE){
      killCharacter(index);
  }else if(character_arr[index].age > MAX_ADULT_AGE && getRandomInt(0,100) < DEATH_RATE){
      killCharacter(index)
  }  
};