import './styles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import colors from '../../../consts/colorPallete';
import useCurrentTheme from '../../../consts/theme';
import { ContractAskToJoin } from '../../../consts/smartContractFunctions';
import { UserRole } from '../../../redux/reducers/user-state';

interface DashboardInfoContainerProps {
  notifier: string | null;
  minersList: Array<string>;
  blocksWon: number | null;
  stacksRewards: number | null;
  userAddress: string | null;
  currentRole: UserRole;
}
const AboutContainer = ({
  notifier,
  minersList,
  blocksWon,
  stacksRewards,
  userAddress,
  currentRole,
}: DashboardInfoContainerProps) => {
  const { currentTheme } = useCurrentTheme();

  return (
    <div style={{ backgroundColor: colors[currentTheme].defaultYellow }} className="info-container-dashboard-page">
      <div className="heading-info-container">
        <div className="heading-title-info-container">
          <div className="heading-icon-info-container">
            <AccountCircleIcon className="icon-info-container" />
          </div>
          <div className="title-info-container">INFO</div>
        </div>
      </div>
      <div className="content-info-container-normal-user">
        <div className="content-sections-title-info-container">
          <span className="bold-font">Current Notifier: </span>
          <div>{notifier !== null ? notifier : ''}</div>
        </div>
        <div className="content-sections-title-info-container">
          <span className="bold-font">Miners List: </span>
          {minersList.length !== 0 && minersList.map((data: string, index: number) => <div key={index}>{data}</div>)}
        </div>
        <div className="content-sections-title-info-container">
          <span className="bold-font">Number of Blocks Won: </span>
          <span>{blocksWon !== null ? blocksWon : ''}</span>
        </div>
        <div className="content-sections-title-info-container">
          <span className="bold-font">Stacks Rewards: </span>
          <span>{stacksRewards !== null ? stacksRewards : ''}</span>
        </div>
      </div>
      {currentRole === 'NormalUser' && (
        <div className="footer-join-button-container">
          <button
            className="customButton"
            onClick={() => {
              if (userAddress !== null) {
                ContractAskToJoin(`${userAddress}`);
              }
            }}
          >
            Join Pool
          </button>
        </div>
      )}
    </div>
  );
};
export default AboutContainer;