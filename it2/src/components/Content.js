import React from 'react'
import { Routes, Route } from "react-router-dom";
import DashboardNavbar from './DashboardNavbar';
import Adminstrator from './Office_Users/Adminstrator';
import EditAdminstrator from './Office_Users/EditAdminstrator';
import CreateAdminstrators from './Office_Users/CreateAdminstrators';
import Division from './Division/Division';
import CreateDivision from './Division/CreateDivision';
import EditDivision from './Division/EditDivision';
import Directorate from './Directorate/Directorate';
import CreateDirectorate from './Directorate/CreateDirectorate';
import EditDirectorate from './Directorate/EditDirectorate';
import AddMemberDirectorate from './Directorate/AddMemberDirectorate';
import ChangeDirectorateMember from './Directorate/ChangeDirectorateMember';
import DirectorateDetail from './Directorate/DirectorateDetail';
import Team from './Team/Team';
import CreateTeam from './Team/CreateTeam';
import EditTeam from './Team/EditTeam';
import AddMemberTeam from './Team/AddMemberTeam';
import TeamDetail from './Team/TeamDetail';
import ArchvialUsers from './Archival/ArchvialUsers';
import EditArchival from './Archival/EditArchival';
import AddArchival from './Archival/AddArchival';
import Customers from './Customers/Customers';
import AdministratorDetail from './Office_Users/AdministratorDetail';
import WindowUsers from './WindowService/WindowUsers';
import CreateWindowUsers from './WindowService/CreateWindowUsers';
import EditWindowUsers from './WindowService/EditWindowUsers';
import EthicsUsers from './EthicsMangement/EthicsUsers';
import CreateEthicsUsers from './EthicsMangement/CreateEthicsUsers';
import EditEthicsUsers from './EthicsMangement/EditEthicsUsers';
import Questions from './Questions/Questions';
import CreateQuestion from './Questions/CreateQuestion';
import EditQuestion from './Questions/EditQuestion';
import CaseList from './CaseList/CaseList';
import CreateCaseList from './CaseList/CreateCaseList';
import EditCaseList from './CaseList/EditCaseList';
import QuestionDetail from './Questions/QuestionDetail';
import CaseListDetail from './CaseList/CaseListDetail';
import NotFound from './NotFound';
import ArchivalDetail from './Archival/ArchivalDetail';
import CustomerDetail from './Customers/CustomerDetail';
import EthicsUserDetail from './EthicsMangement/EthicsUserDetail';
import WindowUserDetail from './WindowService/WindowUserDetail';
import DashboardLatest from './DashbaordSections/DashboardLatest';
import EditCustomer from './Customers/EditCustomer';


function Content() {
  return (
    <div className='w-[85%] absolute right-0 z-[-1] bg-white flex flex-col'>
    <DashboardNavbar />
        <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path='/' element={<DashboardLatest />}/>
        <Route path="/adminstrators" element={<Adminstrator />} />
        <Route path='/administrators/:id' element={<AdministratorDetail />} />
        <Route path="/editadminstrator/:id" element={<EditAdminstrator />} />
        <Route path="/createadminstrator" element={<CreateAdminstrators />} />
        <Route path='/archivalusers' element={<ArchvialUsers />} />
        <Route path='/archivalUsers/:id' element={<ArchivalDetail />} />
        <Route path='/createarchivaluser' element={<AddArchival />}/>
        <Route path='/editarchivaluser/:id' element={<EditArchival />}/>
        <Route path='/windowusers' element={<WindowUsers />}/>
        <Route path='/windowusers/:id' element={<WindowUserDetail />}/>
        <Route path='/createwindowserviceuser' element={<CreateWindowUsers />}/>
        <Route path='/editwindowuser/:id' element={<EditWindowUsers />} />
        <Route path='/ethicsusers' element={<EthicsUsers />}/>
        <Route path='/ethicsusers/:id' element={<EthicsUserDetail />}/>
        <Route path='/createethicsuser' element={<CreateEthicsUsers />}/>
        <Route path='/editethicsuser/:id' element={<EditEthicsUsers />}/>
        <Route path="/division" element={<Division />} />
        <Route path="/createdivision" element={<CreateDivision />} />
        <Route path="/editdivision/:id" element={<EditDivision />} />
        <Route path="/directorate" element={<Directorate />} />
        <Route path="/createdirectorate" element={<CreateDirectorate />} />
        <Route path="/editdirectorate/:id" element={<EditDirectorate />} />
        <Route
          path="/add_directorate_member/:id"
          element={<AddMemberDirectorate />}
        />
        <Route path="/change_directorate_member/:id" element={<ChangeDirectorateMember />}/>
        <Route path="/directorate/:id" element={<DirectorateDetail />} />
        <Route path="/teamleader" element={<Team />} />
        <Route path="/createteamleader" element={<CreateTeam />} />
        <Route path="/editteamleader/:id" element={<EditTeam />} />
        <Route path="/add_team_leader_member/:id" element={<AddMemberTeam />} />
        <Route path="/team_detail/:id" element={<TeamDetail />} />
        <Route path='/customers' element={<Customers />}/>
        <Route path='/customers/:id' element={<CustomerDetail />}/>
        <Route path='/customer/edit/:id' element={<EditCustomer />}/>
        <Route path='/caselist' element={<CaseList />}/>
        <Route path='/caselist/:id' element={<CaseListDetail />}/>
        <Route path='/createcaselist' element={<CreateCaseList />}/>
        <Route path='/editcaselist/:id' element={<EditCaseList />}/>
        <Route path='/questions' element={<Questions />}/> 
        <Route path='/questions/:id' element={<QuestionDetail />}/>
        <Route path='/createquestions' element={<CreateQuestion />}/>
        <Route path='/editquestions/:id' element={<EditQuestion />}/>

        <Route path="*" element={<NotFound />}/>

            
        </Routes>
    </div>
  )
}

export default Content