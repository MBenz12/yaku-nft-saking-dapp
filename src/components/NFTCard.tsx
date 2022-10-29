import {
  useTheme,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { TFunction } from "react-i18next";
import { ALLOWED_MODELS, DEFAULT_LOCKDAY, DEFAULT_MODEL, DEFAULT_PERIOD, MODEL_CAN_SELECT_LOCKDAYS, MODEL_PERIOD_MAPPING } from "../config";
import { nftCard } from "../configs/nftCard";
import { stakeNft } from "../contexts/transaction";
import useToasts from "../hooks/useToasts";
import { getNFTdetail } from "../services/fetchData";
import { StakeDialog } from "./StakeDialog";
import { TemplateItem } from "./TemplateItem";

export default function NFTCard(props: {
  mint: string;
  role: string;
  startLoading: Function;
  closeLoading: Function;
  updatePage: Function;
  t: TFunction;
}) {
  const wallet = useWallet();
  const { showInfoToast, showErrorToast } = useToasts();
  const { startLoading, closeLoading, updatePage, t, mint, role } = props;
  const theme = useTheme();
  const [dataModel, setDataModel] = useState<any>({
    name: '',
    image: '',
  });
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<any>([{}]);
  const [dialog, setDialog] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleStake = (showDialog: boolean) => {
    if (ALLOWED_MODELS.length > 1) {
      setDialog(showDialog);
    } else {
      onStake(DEFAULT_MODEL, DEFAULT_LOCKDAY, { mint, role });
    }
  }

  const onClose = () => setDialog(false)

  const onStake = async (model = DEFAULT_MODEL, lockDay = DEFAULT_LOCKDAY, params = dataModel) => {
    const { role, mint } = params;
    if (wallet.publicKey === null) return;
    let period = DEFAULT_PERIOD;
    if (Object.keys(MODEL_PERIOD_MAPPING).includes(model)) {
      period = MODEL_PERIOD_MAPPING[model];
    } else if (model === MODEL_CAN_SELECT_LOCKDAYS) {
      period = parseInt(lockDay);
    }
    console.log(period, role, model, "period, role, model, ");
    onClose();
    try {
      startLoading();
      showInfoToast(
        "Transaction may delay due to Solana congestion. Please wait for a moment."
      );
      await stakeNft(
        wallet,
        new PublicKey(mint),
        period,
        role,
        parseInt(model)
      );
      updatePage();
      showInfoToast("You have successfully staked your NFT.");
    } catch (error) {
      showInfoToast(
        "Transaction may delay due to Solana congestion. Please try refresh and check your wallet."
      );
      showErrorToast(
        "An error has occured while staking your nft, please check your wallet and may be try again later."
      );
      console.log(error);
    } finally {
      closeLoading();
    }
  };
  const updateCard = async () => {
    try {
      const json: any = await getNFTdetail(props);
      setDataModel({ ...json, mint, role });
      const template = nftCard;
      setItems([template({ ...props, ...json }, { handleStake })]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateCard();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {items && items.length > 0 && (
        <TemplateItem
          key="nft_card"
          items={items}
          pipe={{ t, theme, expanded, handleExpandClick }}
        ></TemplateItem>
      )}
      <StakeDialog
        opened={dialog}
        onClose={onClose}
        dataModel={dataModel}
        pipe={{
          startLoading, closeLoading, updatePage, t, onStake
        }}
      />
    </>
  );
}
