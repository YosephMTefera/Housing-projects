export const chartFun = (data,level)=>{
  const cases = {
      title: {
        text: "",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      color:["#0C73B8","#FBB042"],
      legend: {
        orient: "horizontal",
        top: 0,
        left: "left",
        fontSize:500
      },
      
      series: [
        {
          name: level,
          type: "pie",
          radius: "100%",
          top: 100,
  
          data:data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    return cases;
}


export const chartBarFUn = (x,y,color)=>{
  const bar = {
     tooltip: {
       trigger: 'axis',
       axisPointer: {
         type: 'shadow'
       }
     },
     grid: {
       left: '3%',
       right: '4%',
       bottom: '3%',
       containLabel: true
     },
     xAxis: [
       {
         type: 'category',
         data: x,
         axisTick: {
           alignWithLabel: true
         }
       }
     ],
     yAxis: [
       {
         type: 'value',
         axisLabel: {
           formatter: function (value) {
             return Math.round(value);
           }
         },
         interval: 10  
       }
     ],
     series: [
       {
         name: 'Cases',
         type: 'bar',
         barWidth: '50%',
         data: y,
        //  color:'#FBB042',
         color
       }
     ]
   };
 
   return  bar;
 }


 export const chartLetterBarFUn = (x,y,color)=>{
  const bar = {
     tooltip: {
       trigger: 'axis',
       axisPointer: {
         type: 'shadow'
       }
     },
     grid: {
       left: '3%',
       right: '4%',
       bottom: '3%',
       containLabel: true
     },
     xAxis: [
       {
         type: 'category',
         data: x,
         axisTick: {
           alignWithLabel: true
         }
       }
     ],
     yAxis: [
       {
         type: 'value',
         axisLabel: {
           formatter: function (value) {
             return Math.round(value);
           }
         },
         interval: 10  
       }
     ],
     series: [
       {
        
         type: 'bar',
         barWidth: '50%',
         data: y,
        //  color:'#FBB042',
         color
       }
     ]
   };
 
   return  bar;
 }












export const cases = [
  {
    id:"1",
    case_number:"2233344",
    customer: 'Samuel Ayele',
    title: 'Title 1',
    division: 'House Construction',
    officer_user:"Bekele Desta Fanta",
    cateogry: '-',
    case_list: 'Design Document not apporoved',
    submitted_date:"1/22/24",
    responded_date:"1/29/24",
    
  },
  {
    id:"2",
    case_number:"6632756",
    customer: 'Esrom Tesfaye',
    title: 'Title 2',
    division: 'House Transfer and Construction Finance',
    officer_user:"Bekele Desta Fanta",
    cateogry: '-',
    case_list: 'Design Document not apporoved',
    submitted_date:"1/22/24",
    responded_date:"1/29/24",
    
  },
 
 
];

export const letters = [
  {
    id:"1",
    from:"Martha",
    to:"Tariku",
    cateogry:"Category-1",
    subject:"subject-1",
    letter_number:"443322",
    date:"1/24/24",
    time:"4:00"
  }
]




export const archival_users = [
    {
        id:"1",
        full_name:"Kidus Samuel",
        username:"kidus26",
        email:"kidus@gmail.com",
        phone:"+25199885542",
        gender:"Male",
        status:"active",


    }
]

export const categoryList = [
    {
        id:"1",
        name:"House Transfer and Construction Finance",
        cases:"10",
        complaints:"5",
        letters:"2",
        status:"active"
    }

]

export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    padding: "10px 0",
  }),
};