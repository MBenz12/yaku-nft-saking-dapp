import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { each, Promise } from "bluebird";
import { get, set } from "lodash";
import { NFT_CREATOR, TRAIT_TYPE } from "../config";
import {
  calculateAllRewards,
  getGlobalState,
  getUserPoolState
} from "../contexts/transaction";
import { getNftMetaData, solConnection } from "../contexts/utils";

export const getUnstakedNFTs = async (props: {
  wallet: WalletContextState;
}) => {
  const list: Array<any> = [];
  const { wallet } = props;
  if (!wallet || !wallet.publicKey) {
    return list;
  }
  // @ts-ignore
  const { staked } = await getUserPoolData({ wallet });
  console.log(solConnection, wallet.publicKey.toString());
  const nftsList = await getParsedNftAccountsByOwner({
    publicAddress: wallet.publicKey.toBase58(),
    connection: solConnection,
  });
  await Promise.mapSeries(nftsList, async (item) => {
    if (get(item, "data.creators[0].address") === NFT_CREATOR) {
      try {
        console.log(staked)
        if (!staked?.map(stakeItem => stakeItem.nftAddress).includes(get(item, "mint"))) {
          const uri = get(item, "data.uri");
          const resp = await fetch(uri);
          const json: any = await resp.json();
          list.push({
            ...json,
            mintAddress: get(item, "mint"),
            role: get(
              get(json, "attributes", {}).find(
                (o: any) => o.trait_type === TRAIT_TYPE
              ),
              "value"
            ),
          });
        }
      } catch (error) {
        throw error;
      }
    }
  });
  return list;
};

export const getGlobalData = async (props: { fields: Array<any> }) => {
  const { fields } = props;
  const globalPoolData = await getGlobalState();
  if (globalPoolData === null) return;
  const respData = {};
  each(fields, ({ key, base = LAMPORTS_PER_SOL }: any) => {
    set(respData, key, get(globalPoolData, key).toNumber() / base);
  });
  return respData;
};

export const getUserPoolData = async (props: {
  wallet: WalletContextState;
}) => {
  const { wallet } = props;
  if (wallet.publicKey === null) return {};
  const userPoolData = await getUserPoolState(wallet);
  if (userPoolData === null) return {};
  const count: number = userPoolData.itemCount.toNumber();
  const claimReward: number = await calculateAllRewards(wallet);
  const staked = [];
  if (count !== 0) {
    for (let i = 0; i < count; i++) {
      staked.push({
        lockTime: userPoolData.items[i].lockTime.toNumber(),
        model: userPoolData.items[i].model.toNumber(),
        nftAddress: userPoolData.items[i].nftAddr.toBase58(),
        rate: userPoolData.items[i].rate.toNumber(),
        rewardTime: userPoolData.items[i].rewardTime.toNumber(),
        stakedTime: userPoolData.items[i].stakeTime.toNumber(),
      });
    }
  }
  return {
    staked,
    count,
    claimReward,
  };
};

export const getNFTdetail = async (props: any) => {
  try {
    const { mint } = props;
    const uri = await getNftMetaData(new PublicKey(mint));
    const resp = await fetch(uri);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
