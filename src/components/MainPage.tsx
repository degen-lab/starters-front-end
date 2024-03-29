import '../App.css';
import HeaderBar from './HeaderBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import MiningPool from './appMenuSections/miningPool/MiningPool';
import Voting from './appMenuSections/voting/Voting';
import Home from '../components/appMenuSections/home/Home';
import Dashboard from './appMenuSections/dashboard/Dashboard';
import Profile from './appMenuSections/profile/Profile';
import MiningPoolStatus from './appMenuSections/miningPool/MiningPoolStatus';
import VotingJoiners from './appMenuSections/voting/VotingJoiners';
import VotingRemovals from './appMenuSections/voting/VotingRemovals';
import VotingNotifier from './appMenuSections/voting/VotingNotifier';
import MinerProfileDetails from './appMenuSections/profile/MinerProfileDetails';
import DashboardStacking from './stacking/dashboard/DashboardStacking';
import ProfileStacking from './stacking/profile/ProfileStacking';

const MainPage = () => {
  return (
    <div
      style={{
        backgroundColor: 'inherit',
      }}
    >
      <div>
        <HeaderBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mining/dashboard" index element={<Dashboard />} />
        <Route path="/mining/pool/miners" element={<MiningPool />} />
        <Route path="/mining/voting" element={<Voting />} />
        <Route path="mining/myProfile" element={<Profile />} />
        <Route path="/mining/pool/status" element={<MiningPoolStatus />} />
        <Route path="/mining/voting/joiners" element={<VotingJoiners />} />
        <Route path="/mining/voting/removals" element={<VotingRemovals />} />
        <Route path="/mining/voting/notifier" element={<VotingNotifier />} />
        <Route path="/profile/:address" element={<MinerProfileDetails />} />
        <Route path="/stacking/dashboard" element={<DashboardStacking />} />
        <Route path="/stacking/myProfile" element={<ProfileStacking />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default MainPage;
