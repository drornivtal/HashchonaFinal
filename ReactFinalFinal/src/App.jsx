
import './App.css';
import { createTheme } from '@mui/material/styles';

import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

import CommunityContextProvider from './contexts/CommunityContextProvider';
import CategoriesContextProvider from './contexts/CategoriesContextProvider';

import Login from './screens/Login';
import CommunitiesMap from './screens/CommunitiesMap';
import Register from './screens/Register';
import NewCommunity from './screens/NewCommunity';
import Profile from './screens/tabs/Profile';
import NewRequest from './screens/tabs/NewRequest';
import Home from './screens/tabs/Home';
import AllChats from './screens/AllChats';

import RequestDisplay from './components/RequestDisplay';
import NavigationBar from './components/NavigationBar';
import OffersToReq from './screens/OffersToReq';
import ChatPage from './screens/ChatPage';
import RatingModal from './screens/RatingModal';
import ManagementPage from './screens/ManagementPage';


import UserPendingCard from './components/UserPendingCard';
import UsersPending from './screens/UsersPending';
import UsersInCommunity from './screens/UsersInCommunity';
import CommunityDetails from './screens/CommunityDetails';
import CategoriesModal from './screens/CategoriesModal';
import LoadingLogo from './components/LoadingLogo';


function App() {

  const location = useLocation();
  const { state } = useLocation();
  const userId = state;
  
  const showNavigationBar = () => {
    if (location.pathname === '/Profile') {
      return !userId ; // Show bar if no userId in state (own profile)
    }
    return ['/Home', '/NewRequest'].includes(location.pathname);
  };
  
  return (
    <CommunityContextProvider>
    <CategoriesContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CommunitiesMap" element={<CommunitiesMap />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/NewCommunity" element={<NewCommunity />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/NewRequest" element={<NewRequest />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/RequestDisplay" element={<RequestDisplay />} />
        <Route path="/OffersToReq" element={<OffersToReq />} />
        <Route path="/RatingModal" element={<RatingModal />} />
        <Route path="/ManagementPage" element={<ManagementPage />} />

        <Route path="/UserPendingCard" element={<UserPendingCard />} />
        <Route path="/UsersPending" element={<UsersPending />} />
        <Route path="/UsersInCommunity" element={<UsersInCommunity />} />
        <Route path="/CommunityDetails" element={<CommunityDetails />} />
        <Route path="/CategoriesModal" element={<CategoriesModal />} />
        <Route path="/LoadingLogo" element={<LoadingLogo />} />

        <Route path="/ChatPage" element={<ChatPage />} />
        <Route path="/AllChats" element={<AllChats />} />

      </Routes>

      {showNavigationBar() && (
        <Container sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <NavigationBar />
        </Container>
      )}

    </CategoriesContextProvider>
    </CommunityContextProvider>
  )
}

export default App
