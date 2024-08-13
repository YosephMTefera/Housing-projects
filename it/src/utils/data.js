// const innerWidth =window.innerWidth;
export const adminChartFun = (data)=>{
    const admins = {
        title: {
          text: "",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          top: 0,
          left: "left",
          fontSize:500
        },
        
    
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "80%",
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

      return admins;
}

export const archivalChartFun = (data)=>{
    const archival = {
        title: {
          text: "",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          top: 30,
          left: "center",
        },
        
    
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "80%",
            top: 70,
    
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

      return archival;
}


export const windowChartFun = (data)=>{
  const windowUser = {
      title: {
        text: "",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        top: 30,
        left: "center",
      },
      
  
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "80%",
          top: 70,
  
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

    return windowUser;
}


export const ethicsChartFun = (data)=>{
  const ethicsUser = {
      title: {
        text: "",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        top: 30,
        left: "center",
      },
      
  
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "80%",
          top: 70,
  
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

    return ethicsUser;
}


export const customerChartFun = (data)=>{
  const customerUser = {
      title: {
        text: "",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        top: 30,
        left: "center",
      },
      
  
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "80%",
          top: 70,
  
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

    return customerUser;
}


export const divisions = [
    {
        id:"1",
        name:"Land Design and Infrastructure Development",
        manager:"Solomon Ayele",
        Directorates:"3",
        status:"active"
    },
    {
        id:"2",
        name:"House Construction",
        manager:"Tariku Aschalew",
        Directorates:"4",
        status:"active"
    },
    {
        id:"3",
        name:"House Transfer and Construction Finance",
        manager:"Martha Teshome",
        Directorates:"2",
        status:"active"
    },
    {
        id:"4",
        name:"Corporate Services",
        manager:"Gizachew Taye",
        Directorates:"3",
        status:"active"
    }
]


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
      level:"Archival",
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
      level:"Archival",
      case_list: 'Design Document not apporoved',
      submitted_date:"1/22/24",
      responded_date:"1/29/24",
      
    },
   
   
  ];

  export const internalMemo = [
    {
      id:"1",
      createdby:"Tariku Aschalew",
      title:"Title-1",
      memo_letter:"",
      remark:"remark-1",
      status:"created"
    },
    {
      id:"2",
      createdby:"Martha Teshome",
      title:"Title-2",
      memo_letter:"",
      remark:"remark-2",
      status:"forwarded"
    },

  ]
  
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
  
  
  export const paraphs = [
    {
      id:"1",
      title:"For your information",
    },
    {
      id:"2",
      title:"Urgently",
    }
  ]

  export const toWhomUsers = [
    {
      id:"1",
      name:"Abebe Kebede",
      role:"Division Manager"
    },
    {
      id:"2",
      name:"Meron Asefa",
      role:"Director"
    },
    {
      id:"3",
      name:"Kiros Alemayhu",
      role:"Team Leader"
    },
    {
      id:"4",
      name:"Habtamu Aschalew",
      role:"Professional"
    }
  ]

  export const forwardCases = [
    {
      id:"1",
      from:"Samuel Ayele",
      to:"Meron Teshome",
      paraph:"For your information",
      date:"1/22/24"
    },
    {
      id:"2",
      from:"Meron Teshome",
      to:"Kiros Alemayhu",
      paraph:"For your information",
      date:"3/22/24"
    },
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
  
 export const options = [
    { value: "dflkl4544rffg552a", label: "Meron Teshome" },
    { value: "dflkl4544r77nmjk", label: "Kiros Alemauhu" },
  ];


  export const archivalUsers = [
    {
      id:"1",
      name:"Aron Kebede Kassa",
      username:"aron12",
      email:"aron@gmail.com",
      phone:"+251955443321",
      gender:"Male",
      picture:"-"
    },
    {
      id:"2",
      name:"Kalkidan Taye",
      username:"kal12",
      email:"kal@gmail.com",
      phone:"+251922443344",
      gender:"Female",
      picture:"-"
    }
  ]



  export const generatePassword = () => {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (var i = 0; i < 8; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    return password;
  }
  





  






