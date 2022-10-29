import { useTheme } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { TFunction } from "react-i18next";
import { stakedNftCard } from "../configs/nftCard";
import { claimReward, withdrawNft } from "../contexts/transaction";
import useToasts from "../hooks/useToasts";
import { getNFTdetail } from "../services/fetchData";
import { TemplateItem } from "./TemplateItem";

export default function StakedNFTCard(props: {
  mint: string;
  lockTime: number;
  model: number;
  rate: number;
  rewardTime: number;
  stakedTime: number;
  startLoading: Function;
  closeLoading: Function;
  updatePage: Function;
  t: TFunction;
}) {
  const { startLoading, closeLoading, updatePage } = props;
  const theme = useTheme();
  const [items, setItems] = useState<any>([{}]);
  const [expanded, setExpanded] = useState(false);
  const wallet = useWallet();
  const { showInfoToast, showErrorToast } = useToasts();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUnstake = async () => {
    try {
      startLoading();
      showInfoToast(
        "Transaction may delay due to Solana congestion. Please wait for a moment."
      );
      await withdrawNft(wallet, new PublicKey(props.mint));
      updatePage();
      showInfoToast("You have successfully unstaked your NFT.");
    } catch (error) {
      console.error(error);
      showInfoToast(
        "Transaction may delay due to Solana congestion. Please try refresh and check your wallet."
      );
      showErrorToast(
        "An error has occured while staking your nft, please check your wallet and may be try again later."
      );
    } finally {
      closeLoading();
    }
  };

  const handleClaim = async () => {
    if (wallet.publicKey === null) return;
    try {
      startLoading();
      await claimReward(wallet, new PublicKey(props.mint));
      updatePage();
      showInfoToast("You have successfully claimed your NFTs reward.");
    } catch (error) {
      console.log(error);
    } finally {
      closeLoading();
    }
  };

  const updateCard = async () => {
    try {
      const json: any = await getNFTdetail(props);
      const template = stakedNftCard;
      setItems([
        template({ ...props, ...json }, { handleUnstake, handleClaim }),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateCard();
    // eslint-disable-next-line
  }, []);
  return (
    <TemplateItem
      key="staked_nft_card"
      items={items}
      pipe={{ t: props.t, theme, expanded, handleExpandClick }}
    ></TemplateItem>
  );
}
