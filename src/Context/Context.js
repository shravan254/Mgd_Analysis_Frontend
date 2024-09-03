import Axios from "axios";
import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import { baseURL } from "../api/baseUrl";

const AppContext = React.createContext();

const SnackbarContext = React.createContext({
  isDisplayed: false,
  displayMsg: (msg) => {},
  onClose: () => {},
});

const AuthProvider = ({ children }) => {
  //Machine Setup
  const [post, setPost] = React.useState([]);

  //Schedulelist Profile
  const [schedulelistdata,setSchedulelistdata]=useState([])
  const [schedulelistdatas,setSchedulelistdatas]=useState([])

  //Schedulelist Service
  const [schedulelistservicedata,setSchedulelistservicedata]=useState([])
  const [schedulelistservicedatas,setSchedulelistservicedatas]=useState([])

  // Schedulelist fabrication
  const [schedulelistfabricationdata,setSchedulelistfabricationdata]=useState([])
  const [schedulelistfabricationdatas,setSchedulelistfabricationdatas]=useState([])

  //Profile
  const getSchedulistdata=()=>{
    axios.get(baseURL + "/scheduleListProfile/schedulesList").then((response) => {
          setSchedulelistdata(response.data); 
          setSchedulelistdatas(response.data);
          // console.log(response.data)
        });
  }

  //fabrication
  const getSchedulistfabricationdata=()=>{
    axios.get(baseURL + "/scheduleListFabrication/schedulesList").then((response) => {
      setSchedulelistfabricationdata(response.data); 
      setSchedulelistfabricationdatas(response.data);
            // console.log(response.data)
        });
  }

  //service
  const getSchedulistservicedata=()=>{
    axios.get(baseURL + "/scheduleListService/schedulesList").then((response) => {
          setSchedulelistservicedata(response.data);
          setSchedulelistservicedatas(response.data); 
          // console.log(response.data)
        });
  }

//Machine Setup
  const MachineTabledata=()=>{
    axios.get(baseURL + "/productionSetup/getallmachines").then((response) => {
      setPost(response.data);
      // console.log(response.data)
    });
  }

  return (
    <AppContext.Provider
      value={{
        post,setPost,MachineTabledata,schedulelistdata,setSchedulelistdata,
        getSchedulistdata,schedulelistdatas,setSchedulelistdatas,
        schedulelistservicedata,setSchedulelistservicedata,getSchedulistservicedata,
        schedulelistfabricationdata,setSchedulelistfabricationdata,getSchedulistfabricationdata,
        schedulelistfabricationdatas,setSchedulelistfabricationdatas,schedulelistservicedatas,setSchedulelistservicedatas
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AuthProvider, SnackbarContext };
