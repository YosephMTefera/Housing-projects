import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardNavbar from "./sub-components/DashboardNavbar";
import Cases from "./Cases/Cases";
import CaseDetail from "./Cases/CaseDetail";
import Forward from "./Forward";
import UserProfile from "./UserProfile";
import ForwardedPath from "./Forward/ForwardedPath";
import ForwardedPathDetail from "./Forward/ForwardedPathDetail";
import PageNotFound from "./NotFound/PageNotFound";
import IncomingLetters from "./ExternalLetters/IncomingLetters";
import OutgoingLetters from "./ExternalLetters/OutgoingLetters";
import CreateLetter from "./ExternalLetters/CreateLetter";
import Dashboard from "./Dashboard";
import InternalLetter from "./InternalLetters/InternalLetter";
import IncomingLetterDetail from "./ExternalLetters/IncomingLetterDetail";
import Print from "./Print";
import OutgoingLetterDetail from "./ExternalLetters/OutgoingLetterDetail";
import LetterDetail from "./InternalLetters/LetterDetail";
import PresystemLetters from "./Presystem Letters/PresystemLetters";
import CreatepresystemLetter from "./Presystem Letters/CreatepresystemLetter";
import PresystemletterDetail from "./Presystem Letters/PresystemletterDetail";
import Category from "./Category/Category";
import CategoryDetail from "./Category/CategoryDetail";
import CreateCategory from "./Category/CreateCategory";
import EditCategory from "./Category/EditCategory";
import ArchiveLetter from "./Category/ArchiveLetter";
import EditIncomingLetter from "./ExternalLetters/EditIncomingLetter";
import EditPresystemLetter from "./Presystem Letters/EditPresystemLetter";

function Content() {
  return (
    <div className="w-[85%]  absolute  right-0 z-[-1]   bg-white  flex flex-col max-lg1:w-[80%]">
      <DashboardNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/letters/incoming/create" element={<CreateLetter />}/>
        <Route path="/letters/incoming/edit/:id" element={<EditIncomingLetter />}/>
        <Route path="/incoming" element={<IncomingLetters />}/>
        <Route path="/incoming/:id" element={<IncomingLetterDetail />} />
        <Route path="/outgoing/:id" element={<OutgoingLetterDetail />}/>
        <Route path="/outgoing" element={<OutgoingLetters />}/>
        <Route path="/internal" element={<InternalLetter />}/>
        <Route path="/internal/:id" element={<LetterDetail/>}/>
        <Route path="/presystem-letters" element={<PresystemLetters />}/>
        <Route path="/create-presystem-letter" element={<CreatepresystemLetter />}/>
        <Route path="/letters/presystem/edit/:id" element={<EditPresystemLetter />}/>
        <Route path="/presystem-letters/:id" element={<PresystemletterDetail/>}/>
        <Route path="/forward/:type/:id" element={<Forward />} />
        <Route path="/forwarded_path/:type/:id" element={<ForwardedPath />} />
        <Route
          path="/forwarded_path/detail/:id/:type/:forwardId"
          element={<ForwardedPathDetail />}
        />
        <Route path="/print/:type/:id/:forward_id" element={<Print/>} />
        <Route path="/letters/archive" element={<Category />}/>
        <Route path="/letters/archive/:id" element={<CategoryDetail />} />
        <Route path="/letters/archive/create"  element={<CreateCategory/>}/>
        <Route path="/letters/archive/:id/edit" element={<EditCategory />} />
        <Route path="/letters/archive/:type/:id" element={<ArchiveLetter/>}/>
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Content;
