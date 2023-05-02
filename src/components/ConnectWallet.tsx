import { AppConfig } from '@stacks/connect';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import colors from '../consts/colorPallete';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { connectAction, disconnectAction, updateUserRoleAction } from '../redux/actions';
import { selectCurrentUserRole, selectUserSessionState } from '../redux/reducers/user-state';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readOnlyAddressStatus } from '../consts/readOnly';

const appConfig = new AppConfig(['store_write', 'publish_data']);

interface ConnectWalletProps {
  currentTheme: string;
}

const ConnectWallet = ({ currentTheme }: ConnectWalletProps) => {
  const [finalStatus, setFinalStatus] = useState<string>('Viewer');
  const userSession = useAppSelector(selectUserSessionState);
  const dispatch = useAppDispatch();

  const currentRole = useAppSelector(selectCurrentUserRole);
  const location = useLocation();

  const controlAccessRoutes = () => {
    if (location.pathname !== '/') {
      if (location.pathname.substring(1)?.toLowerCase() !== currentRole.toLowerCase()) {
        console.log('Seems like you got lost, click here to go back to the main page');
      }
    }
  };
  useEffect(() => {
    const fetchStatus = async () => {
      const args = userSession.loadUserData().profile.stxAddress.testnet;
      const status = await readOnlyAddressStatus(args);
      console.log('args', args);
      setFinalStatus(status);

      updateUserRoleAction(finalStatus);
      console.log('status', finalStatus);
    };

    fetchStatus();
  }, [finalStatus]);

  useEffect(() => {
    controlAccessRoutes();
  }, [location]);

  const disconnect = () => {
    dispatch(disconnectAction());
  };

  const authenticate = () => {
    dispatch(connectAction());
  };

  if (userSession.isUserSignedIn()) {
    if (currentRole === 'Viewer') {
      dispatch(updateUserRoleAction(finalStatus));
      // dispatch(updateUserRoleAction());
      return <div>Loading role...</div>;
    }
    return (
      <div>
        <button className="Connect" style={{ backgroundColor: colors[currentTheme].primary }} onClick={disconnect}>
          <LogoutIcon style={{ color: colors[currentTheme].buttons }} fontSize="medium" />
        </button>
      </div>
    );
  }

  return (
    <button className="Connect" style={{ backgroundColor: colors[currentTheme].primary }} onClick={authenticate}>
      <LoginIcon style={{ color: colors[currentTheme].buttons }} fontSize="medium" />
    </button>
  );
};

export default ConnectWallet;
