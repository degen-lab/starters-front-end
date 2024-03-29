import './styles.css';
import '../../../css/buttons/styles.css';
import '../../../css/common-page-alignments/styles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import colors from '../../../consts/colorPallete';
import { ContractAskToJoinMining } from '../../../consts/smartContractFunctions';
import { selectCurrentTheme, UserRoleMining } from '../../../redux/reducers/user-state';
import { useAppSelector } from '../../../redux/store';

interface DashboardInfoContainerProps {
  notifier: string | null;
  minersList: Array<string>;
  blocksWon: number | null;
  stacksRewards: number | null;
  userAddress: string | null;
  currentRole: UserRoleMining;
}
const DashboardInfoContainer = ({
  notifier,
  minersList,
  blocksWon,
  stacksRewards,
  userAddress,
  currentRole,
}: DashboardInfoContainerProps) => {
  const appCurrentTheme = useAppSelector(selectCurrentTheme);

  return (
    <div
      style={{ backgroundColor: colors[appCurrentTheme].infoContainers, color: colors[appCurrentTheme].colorWriting }}
      className="info-container-dashboard-page"
    >
      <div
        style={{
          backgroundColor: colors[appCurrentTheme].infoContainers,
          color: colors[appCurrentTheme].colorWriting,
          borderBottom: `1px solid ${colors[appCurrentTheme].colorWriting}`,
        }}
        className="heading-info-container"
      >
        <div className="heading-title-info-container">
          <div style={{ color: colors[appCurrentTheme].defaultYellow }} className="heading-icon-info-container">
            <AccountCircleIcon className="icon-info-container yellow-icon" />
          </div>
          <div className="title-info-container">INFO</div>
        </div>
      </div>
      <div
        style={{ backgroundColor: colors[appCurrentTheme].infoContainers, color: colors[appCurrentTheme].colorWriting }}
        className="content-info-container-normal-user"
      >
        <div className="content-sections-title-info-container">
          <span className="bold-font">Current Notifier: </span>
          <div className="result-of-content-section">{notifier !== null ? notifier : ''}</div>
        </div>
        <div className="content-sections-title-info-container">
          <span className="bold-font">Miners List: </span>
          {minersList.length !== 0 &&
            minersList.map((data: string, index: number) => (
              <div className="result-of-content-section" key={index}>
                {data}
              </div>
            ))}
        </div>
        <div className="content-sections-title-info-container">
          <span className="bold-font">Number of Blocks Won: </span>
          <span className="result-of-content-section">{blocksWon !== null ? blocksWon : ''}</span>
        </div>
        <div className="content-sections-title-info-container">
          <span className="bold-font">Stacks Rewards: </span>
          <span className="result-of-content-section">
            {stacksRewards !== null ? stacksRewards / 1000000 + ' STX' : ''}
          </span>
        </div>
      </div>
      {currentRole === 'NormalUser' && (
        <div className="footer-join-button-container">
          <button
            className={appCurrentTheme === 'light' ? 'customButton' : 'customDarkButton'}
            onClick={() => {
              if (userAddress !== null) {
                ContractAskToJoinMining(`${userAddress}`);
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
export default DashboardInfoContainer;
