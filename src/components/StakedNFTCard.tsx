import { useTheme } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { TFunction } from "react-i18next";
import { stakedNftCard } from "../configs/nftCard";
import { claimReward, withdrawNft } from "../contexts/transaction";
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUnstake = async () => {
    try {
      startLoading();
      await withdrawNft(
        wallet,
        new PublicKey(props.mint)
      );
      updatePage();
    } catch (error) {
      console.error(error);
    } finally {
      closeLoading();
    }
  };

  const handleClaim = async () => {
    if (wallet.publicKey === null) return;
    try {
      startLoading();
      await claimReward(
        wallet,
        new PublicKey(props.mint),
      );
      updatePage();
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
        template(
          { ...props, ...json },
          { handleUnstake, handleClaim }
        ),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    updateCard();
    // eslint-disable-next-line
  }, []);
  return (
    <TemplateItem
      key="stakedNftCard"
      items={items}
      pipe={{ t: props.t, theme, expanded, handleExpandClick }}
    ></TemplateItem>
  );
}
