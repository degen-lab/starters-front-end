import { useEffect, useState } from 'react';
import { readOnlyExchangeToggle } from '../../../consts/readOnly';
import { ContractSetAutoExchange } from '../../../consts/smartContractFunctions';
import { selectUserSessionState } from '../../../redux/reducers/user-state';
import { useAppSelector } from '../../../redux/store';

interface IMinerMoreInfoAboutContainer {
  currentBalance: number;
  totalWithdrawals: number | null;
}

const MoreInfoAboutContainerMiner = ({ currentBalance, totalWithdrawals }: IMinerMoreInfoAboutContainer) => {
  const [exchange, setExchange] = useState<boolean | null>(false);

  const userSession = useAppSelector(selectUserSessionState);
  const userAddress = userSession.loadUserData().profile.stxAddress.testnet;

  const setAutoExchange = () => {
    if (userAddress !== null) {
      ContractSetAutoExchange(!exchange);
    }
  };

  useEffect(() => {
    const getExchangeState = async () => {
      if (userAddress !== null) {
        const newExchange = await readOnlyExchangeToggle(userAddress);
        setExchange(newExchange);
      }
    };

    getExchangeState();
  }, [userAddress]);
  return (
    <>
      <div className="content-sections-title-info-container bottom-margins">
        <span className="bold-font">Balance SC: </span>
        <span>{currentBalance / 1000000 + ' STX'}</span>
      </div>
      <div className="content-sections-title-info-container bottom-margins">
        <span className="bold-font">Total withdrawl of SC: </span>
        <span> {totalWithdrawals !== null ? totalWithdrawals / 1000000 + ' STX' : '0 STX'}</span>
      </div>
      <div className="content-sections-title-info-container">
        <span className="bold-font">Autoexchange stx to btc: </span>
        <span>{exchange === null || exchange === false ? 'No' : 'Yes'}</span>
      </div>
      <div>
        <button className="customButton" onClick={setAutoExchange}>
          {exchange === null || exchange === false ? 'Change to yes' : 'Change to no'}
        </button>
      </div>
    </>
  );
};

export default MoreInfoAboutContainerMiner;