import { WalletContextState } from "@solana/wallet-adapter-react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { NFT_CREATOR } from "../config";
import { getNftMetaData, solConnection } from "../contexts/utils";
import { Dispatch, SetStateAction } from "react";
import { each, Promise } from 'bluebird';
import { get, set, isFunction, cloneDeep } from "lodash";
import { calculateAllRewards, getGlobalState, getUserPoolState } from "../contexts/transaction";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { nftCard, stakedNftCard } from "../configs/nftCard";

export const getUnstakedNFTs = async (props: {
  wallet: WalletContextState,
  startLoading: Function,
  closeLoading: Function,
  setNftList: Dispatch<any>,
  setHide: Dispatch<SetStateAction<boolean>>,
  hide: boolean,
}) => {
  const { wallet, startLoading, closeLoading, setNftList, setHide, hide } = props;
  startLoading();
  if (wallet.publicKey !== null) {
    const nftsList = await getParsedNftAccountsByOwner({ publicAddress: wallet.publicKey.toBase58(), connection: solConnection });
    const list: Array<any> = [];
    await Promise.mapSeries(nftsList, async item => {
      if (get(item, 'data.creators[0].address') === NFT_CREATOR) {
        try {
          const uri = get(item, 'data.uri');
          const resp = await fetch(uri);
          const json: any = await resp.json();
          list.push({
            mintAddress: get(item, 'mint'),
            role: get(get(json, 'attributes', {}).find((o: any) => o.trait_type === "Role"), 'value')
          })
        } catch (error) {
          console.log(error)
        }
      }
    })
    setNftList(list);
    setHide(!hide);
  }
  closeLoading();
}

export const getGlobalData = async (props: {
  fields: Array<any>,
  setDataModel: Dispatch<any>
}) => {
  const { fields, setDataModel } = props;
  const globalPoolData = await getGlobalState();
  if (globalPoolData === null) return;
  const respData = {};
  each(fields, ({ key, base = LAMPORTS_PER_SOL }: any) => {
    set(respData, key, (get(globalPoolData, key).toNumber() / base));
  });
  setDataModel(respData);
}

export const getUserPoolData = async (props: {
  wallet: WalletContextState,
  startLoading: Function,
  closeLoading: Function,
  setUserStakedCount: Dispatch<any>,
  setRewardAmount: Dispatch<SetStateAction<number>>,
  setStakedNfts:  Dispatch<any>,
}) => {
  const { wallet, startLoading, closeLoading, setUserStakedCount, setRewardAmount, setStakedNfts } = props;
  if (wallet.publicKey === null) return;
  startLoading();
  const userPoolData = await getUserPoolState(wallet);
  if (userPoolData === null) return;
  const count = userPoolData.itemCount.toNumber();
  setUserStakedCount(count);
  const claimReward = await calculateAllRewards(wallet);
  setRewardAmount(claimReward)
  const staked = [];
  if (count !== 0) {
    for (let i = 0; i < count; i++) {
      staked.push({
        lockTime: userPoolData.items[i].lockTime.toNumber(),
        model: userPoolData.items[i].model.toNumber(),
        nftAddress: userPoolData.items[i].nftAddr.toBase58(),
        rate: userPoolData.items[i].rate.toNumber(),
        rewardTime: userPoolData.items[i].rewardTime.toNumber(),
        stakedTime: userPoolData.items[i].stakeTime.toNumber()
      })
    }
    setStakedNfts(staked)
  }
  closeLoading();
}

export const getNFTdetail = async (props: any, { setImage, setName, setItems, setDialog, handleUnstake, handleClaim }: any) => {
  try {
    const { mint, stakedTime } = props;
    const uri = await getNftMetaData(new PublicKey(mint));
    const resp = await fetch(uri);
    const json = await resp.json();
    setImage(json.image);
    setName(json.name);
    const template = stakedTime ? stakedNftCard : nftCard;
    setItems([template({ ...props, ...json }, { setDialog, handleUnstake, handleClaim })])
  } catch (error) {
    console.log(error);
  }
};
