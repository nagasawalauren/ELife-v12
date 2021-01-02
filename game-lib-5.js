//game-lib-5.js

function giveInitialJobs(index){
    if(character_arr[index].age >= MIN_ADULT_AGE){
        
        var rand_job = getRandomInt(0, jobs_arr.length-1); 
        do{rand_job=getRandomInt(0, jobs_arr.length-1);}while(job_arr[rand_job].title.includes("Student") || job_arr[rand_job].title.includes("Baby"));
        
        var rand_org = getRandomInt(0, town_organization_arr.length-1);
        
        do{
            rand_org = getRandomInt(0,town_organization_arr.length-1);
        }while(job_arr[rand_job].career_type != town_organization_arr[rand_org].type)
        
        character_job_arr.push(index,rand_job, )
    }
};

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