//debug.js

function get_family_report(){
    //ensures that the families relationships are all right.
    for(var i=0; i<character_arr.length; i++){
        var str = getIndividualReport(i);
    }
    
    //SEXUALITY
    console.log("===SEXUALITY COUNT===")
    
    for(var i=0; i<sexuality_arr.length; i++){
        var count = 0;
    for(var j=0;j<character_arr.length;j++){
        if(character_arr[j].sexuality == sexuality_arr[i]){
            count++;
        }
    }    
     console.log(sexuality_arr[i],": ", count + "\n");   
    }
    //AGE TYPE COUNT
    console.log("===AGE RANGE===")
    var age_range_arr = Array(6).fill(0);
    
 var arr = ["baby","child","adult","elder","null","else"]
    
    for(var i=0;i< character_arr.length; i++){
        if(getAgeRange(i)==arr[0]){age_range_arr[0]++;}
        else if(getAgeRange(i)==arr[1]){age_range_arr[1]++;}
        else if(getAgeRange(i)==arr[2]){age_range_arr[2]++;}
        else if(getAgeRange(i)==arr[3]){age_range_arr[3]++;}
        else if(getAgeRange(i)==arr[4]){age_range_arr[4]++;}
        else {
            console.log(i+": "+ getAgeRange(i))
            age_range_arr[5]++;}
    }
     for(var i=0;i< age_range_arr.length; i++){
         console.log(arr[i]+": "+age_range_arr[i]);
     }
    //MARRIAGE DATA
    console.log("===MARRIAGE COUNT===")
    var married_count =[0,0];
    
    for(var i=0;i< character_arr.length;i++){
        if(hasPartner(i)){married_count[0]++;}
        else{married_count[1]++;}
    }
    console.log("Married: "+married_count[0]);
    console.log("Single: "+ married_count[1]);
}

function hasPartner(index){
  for(var i=0;i<character_arr[index].relationships.length;i++){
      rel_index = getRelNodeIndex(index,character_arr[index].relationships[i]);
      if(relationship_arr[rel_index].relationship_type=="partner"){
          return true;
      }
  }
    return false;
};

function get_full_name(index){
    //given character index, retrieve name
    var str = character_arr[index].first_name + " " +  character_arr[index].last_name + " (" + character_arr[index].gender;
    str+= ", age:" + character_arr[index].age ;
    //str += " index:" + index;
    str += ")";
    return str;
}

function getIndividualReport(i){
            var result = "FULL NAME: " +  get_full_name(i) + "\n";
    //add sexuality if character is adult
    if(getAgeRange(i) != "baby" && getAgeRange(i) != "child"){
        result += "Sexuality: " + character_arr[i].sexuality + "\n";
    }
   // document.getElementById("backButton").addEventListener("click", displayCharData(i))
        for(var j=0; j<character_arr[i].relationships.length; j++){
            var node_index = getRelNodeIndex(i,character_arr[i].relationships[j]);
            if(node_index<0){
              getRelNodeIndex(character_arr[i].relationships[j],i)
          }
            console.log("NODE_INDEX:",node_index);
            result += relationship_arr[node_index].relationship_type + " of " + get_full_name(relationship_arr[node_index].to_character_id) + "\n Affection: " + displayProgressbar(relationship_arr[node_index].value) + "\n\n";
        }
        console.log(result);
    return result;
};