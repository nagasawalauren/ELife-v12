//data_arrays.js

var gender_arr = ["male","female"]

var sexuality_arr = ["heterosexual","gay","lesbian","bisexual","pansexual"];

var relationship_arr = ["parent","sibling","friend","partner","coworker","acquaintance","spouse","step parent","step sibling","adopted parent","adopted sibling"];

//town name generator

var town_suffix = ["burg","ville","ton","town","ford","worth","wick","shire","k","ck"]
var town_consonants = ["","ch","g","m","n","r","w","th","ph","d","sch","wr","k","ch","se","l","gh"]
var town_vowels = ["i","oo","a","u","y","e","ee","ai","ou","ea"]

//OCCUPATIONS
var job_arr = [
  {
  id: 0,
  title: "Baby",
  description: "a baby must learn and develop for childhood.",
  career_type: "family",
  stress_level: 0,
  income_level: [0,0],
  hourly_rate: [0,0],
  type: "full-time",
},  
      {
  id: 1,
  title: "Elementary School Student",
  description: "",
  career_type: "academic",
  stress_level: 0,
  income_level: [0,0],
  hourly_rate: [0,0],
  type: "full-time",
},
    
          {
  id: 2,
  title: "Grocery Store Cashier",
  description: "",
  career_type: "retail-grocery",
  stress_level: 70,
  income_level: [10000,30000],
  hourly_rate: [0,0],
  type: "full-time",
},
          {
  id: 3,
  title: "High School Student",
  description: "",
  career_type: "academic",
  stress_level: 0,
  income_level: [0,0],
  hourly_rate: [0,0],
  type: "full-time",
},
  
];

var career_arr = [
  {
      name: "child",   
      job_titles:["Baby"],
  },  
  {
      name: "academic",   
      job_titles:["Primary School Student","High School Student","Undergraduate Student","Graduate Student","PhD Student","Associate Professor","Professor"],
  }, 
    
      {
      name: "retail-grocery",   
      job_titles:["Grocery Worker", "Assistant Manager","Store Manager"],
  }, 
];

var organization_arr = [
  {
      id:0,
      name: "TOWN_NAME University",
      type: "university",

  }, 
    {
     id: 1,
    name: "TOWN_NAME Elementary School",
    type: "elementary school",
    },
    {
        id:2,
        name: "TOWN_NAME High School",
        type: "high school",
    },
    {
        id:3,
        name: "TOWN_NAME Hospital",
        type: "hospital",
    },
        {
        id:4,
        name: "TOWN_NAME Mart",
        type: "retail-grocery",
    },
            {
        id:5,
        name: "Family",
        type: "family",
    },
                {
        id:6,
        name: "TOWN_NAME Academy",
        type: "high school",
    },

];