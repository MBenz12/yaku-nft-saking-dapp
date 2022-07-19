import { useTheme } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { DEFAULT_LOCKDAY, DEFAULT_MODEL, DEFAULT_PERIOD, MODEL_CAN_SELECT_LOCKDAYS, MODEL_PERIOD_MAPPING } from "../config";
import { stakeDialog } from "../configs/stakeDialog";
import { stakeNft } from "../contexts/transaction";
import { TemplateItem } from "./TemplateItem";

export function StakeDialog(props: {
  opened: boolean;
  onClose: Function;
  dataModel: any,
  pipe: any;
}) {
  const {
    opened,
    onClose,
    dataModel,
    pipe,
  } = props;
  const {
    startLoading,
    closeLoading,
    updatePage,
    setDataModel,
    t,
  } = pipe;
  const theme = useTheme();
  const wallet = useWallet();
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [lockDay, setLockDay] = useState(DEFAULT_LOCKDAY);

  const handleChange = (key: string, event: any) => {
    switch (key) {
      case 'model': setModel(event.target.value);
      break;
      case 'lockDay': setLockDay(event.target.value);
    }
  };

  const onStake = async () => {
    const { role, mint } = dataModel;
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
      await stakeNft(
        wallet,
        new PublicKey(mint),
        period,
        role,
        parseInt(model)
      );
      updatePage();
    } catch (error) {
      console.log(error);
    } finally {
      closeLoading();
    }
  };
  return <TemplateItem key='stakeDialogItem' items={[stakeDialog]} pipe={{
    startLoading, closeLoading,
    t, theme, opened, onClose, dataModel, model, lockDay, handleChange, onStake
  }}></TemplateItem>
}