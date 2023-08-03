import './styles.css';
import '../../../css/buttons/styles.css';
import '../../../css/helpers/styles.css';
import '../../../css/inputs/styles.css';
import '../../../css/links/styles.css';
import '../../../css/common-page-alignments/styles.css';
import {
  selectCurrentTheme,
  selectCurrentUserRoleMining,
  selectUserSessionState,
  UserRoleMining,
} from '../../../redux/reducers/user-state';
import { useAppSelector } from '../../../redux/store';
import MinerProfile from './MinerProfile';
import colors from '../../../consts/colorPallete';
import { useEffect, useState } from 'react';
import { network, getExplorerUrl } from '../../../consts/network';
import {
  readOnlyGetAllTotalWithdrawalsMining,
  readOnlyGetBalanceMining,
  readOnlyGetNotifier,
} from '../../../consts/readOnly';

const Profile = () => {
  const currentRole: UserRoleMining = useAppSelector(selectCurrentUserRoleMining);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [explorerLink, setExplorerLink] = useState<string | undefined>(undefined);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState<number | null>(null);
  const [currentNotifier, setCurrentNotifier] = useState<string | null>(null);
  const userSession = useAppSelector(selectUserSessionState);
  const appCurrentTheme = useAppSelector(selectCurrentTheme);
  const localNetwork = network === 'devnet' ? 'testnet' : network;

  const profileMapping: Record<UserRoleMining, React.ReactElement> = {
    Viewer: <div></div>,
    NormalUser: (
      <MinerProfile
        connectedWallet={connectedWallet}
        explorerLink={explorerLink}
        currentBalance={currentBalance}
        currentNotifier={currentNotifier}
        userAddress={userAddress}
      />
    ),
    Waiting: (
      <MinerProfile
        connectedWallet={connectedWallet}
        explorerLink={explorerLink}
        currentBalance={currentBalance}
        currentNotifier={currentNotifier}
        userAddress={userAddress}
      />
    ),
    Pending: (
      <MinerProfile
        connectedWallet={connectedWallet}
        explorerLink={explorerLink}
        currentBalance={currentBalance}
        currentNotifier={currentNotifier}
        userAddress={userAddress}
      />
    ),
    Miner: (
      <MinerProfile
        connectedWallet={connectedWallet}
        explorerLink={explorerLink}
        currentBalance={currentBalance}
        currentNotifier={currentNotifier}
        userAddress={userAddress}
      />
    ),
  };

  useEffect(() => {
    const getCurrentNotifier = async () => {
      const notifier = await readOnlyGetNotifier();
      setCurrentNotifier(notifier);
    };

    getCurrentNotifier();
  }, [currentNotifier]);

  useEffect(() => {
    const wallet = userSession.loadUserData().profile.stxAddress[localNetwork];
    setConnectedWallet(wallet);
  }, [connectedWallet]);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const args = userSession.loadUserData().profile.stxAddress[localNetwork];
      setUserAddress(args);
    }
  }, [userAddress]);

  useEffect(() => {
    if (userAddress !== null) {
      setExplorerLink(getExplorerUrl[network](userAddress).explorerUrl);
    }
  }, [explorerLink, userAddress]);

  useEffect(() => {
    const getUserBalance = async () => {
      const principalAddress = userSession.loadUserData().profile.stxAddress[localNetwork];
      const getTotalWithdrawals = await readOnlyGetAllTotalWithdrawalsMining(principalAddress);
      const balance = await readOnlyGetBalanceMining(principalAddress);
      setTotalWithdrawals(getTotalWithdrawals);
      setCurrentBalance(balance);
    };

    getUserBalance();
  }, [currentBalance, totalWithdrawals]);

  return (
    <div
      className="profile-page-main-container"
      style={{
        backgroundColor: colors[appCurrentTheme].accent2,
        color: colors[appCurrentTheme].colorWriting,
      }}
    >
      <div style={{ color: colors[appCurrentTheme].colorWriting }} className="page-heading-title">
        <h2>Decentralized Mining Pool</h2>
        <h2>Profile</h2>
      </div>
      {profileMapping[currentRole]}
    </div>
  );
};

export default Profile;
