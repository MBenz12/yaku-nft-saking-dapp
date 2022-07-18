import { MetadataKey } from "@nfteyez/sol-rayz/dist/config/metaplex";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import StakedNFTCard from "../components/StakedNFTCard";
import { claimRewardAll } from "../contexts/transaction";
import { getGlobalData, getUnstakedNFTs, getUserPoolData } from "../services/fetchData";
import { get, map } from "lodash";
import { TFunction } from "react-i18next";

export default function HomePage(props: { startLoading: Function, closeLoading: Function, t: TFunction }) {
  const { startLoading, closeLoading, t } = props;
  const wallet = useWallet()
  const [hide, setHide] = useState(false);
  const [nftList, setNftList] = useState<any>();

  // global Data values
  const [dataModel, setDataModel] = useState<any>({});

  const [stakedNfts, setStakedNfts] = useState<any>();
  const [userStakedCount, setUserStakedCount] = useState(0);

  const [rewardAmount, setRewardAmount] = useState(0);

  const fields = [{
    label: 'RATES.ADVENTURE',
    key: 'adventureRate',
  }, {
    label: 'RATES.COMMANDER',
    key: 'commanderRate',
  }, {
    label: 'RATES.DOCTOR',
    key: 'doctorRate',
  }, {
    label: 'RATES.NORMAL',
    key: 'normalRate',
  }, {
    label: 'RATES.SCIENTIST',
    key: 'scientistRate',
  }, {
    label: 'RATES.SPECIALIST',
    key: 'specialistRate',
  }, {
    label: 'RATES.TOTAL_AMOUNT',
    key: 'totalAmount',
    base: 1,
  }]

  const handleClaimAll = async () => {
    try {
      await claimRewardAll(
        wallet,
        () => startLoading(),
        () => closeLoading(),
        () => updatePage()
      )
    } catch (error) {
      console.log(error)
    }
  }

  const updatePage = () => {
    getUnstakedNFTs({
      startLoading, closeLoading, wallet, setNftList, setHide, hide
    });
    getGlobalData({
      fields,
      setDataModel
    });
    getUserPoolData({
      startLoading, closeLoading, wallet, setUserStakedCount, setRewardAmount, setStakedNfts
    });
  }

  useEffect(() => {
    updatePage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);
  return (
    <main>
      <div className="container">
        <div className="p-100">
          <div className="global-info">
            {
              fields && map(fields, ({
                label, key
              }) => 
              <div key={key} className="info-item">
                <label>{t(label)}</label>
                <p>{get(dataModel, key, 0)}</p>
              </div>)
            }
            <div className="info-item">
              <label>{t('DASHBOARD.STAKED_NFT_COUNT')}</label>
              <p>{userStakedCount}</p>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn-claim" onClick={() => handleClaimAll()}>
              Claim All ({(rewardAmount).toLocaleString()} {t('TOKEN.NAME')})
            </button>
          </div>
          <div className="create-list">
            {nftList && nftList.length !== 0 &&
              nftList.map((item: any, key: number) => (
                <NFTCard
                  mint={item.mintAddress}
                  role={item.role}
                  key={key}
                  startLoading={() => startLoading()}
                  closeLoading={() => closeLoading()}
                  updatePage={() => updatePage()}
                />
              ))
            }
            {stakedNfts && stakedNfts.length !== 0 && stakedNfts.map((item: StakedNFT, key: number) => (
              <StakedNFTCard
                key={key}
                lockTime={item.lockTime}
                model={item.model}
                mint={item.nftAddress}
                rate={item.rate}
                rewardTime={item.rewardTime}
                stakedTime={item.stakedTime}
                startLoading={() => startLoading()}
                closeLoading={() => closeLoading()}
                updatePage={() => updatePage()}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

interface StakedNFT {
  lockTime: number;
  model: number;
  nftAddress: string;
  rate: number;
  rewardTime: number;
  stakedTime: number;
}