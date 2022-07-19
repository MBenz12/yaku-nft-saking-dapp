import { useTheme } from "@mui/material";
import { stakeDialog } from "../configs/stakeDialog";
import { TemplateItem } from "./TemplateItem";

export function StakeDialog(props: {
  opened: boolean;
  onClose: Function;
  dataModel: any,
  model: string,
  lockDay: string,
  pipe: any;
}) {
  const {
    opened,
    onClose,
    dataModel,
    model,
    lockDay,
    pipe,
  } = props;
  const {
    startLoading,
    closeLoading,
    onStake,
    setModel,
    setLockDay,
    t,
  } = pipe;
  const theme = useTheme();

  const handleChange = (key: string, event: any) => {
    switch (key) {
      case 'model': setModel(event.target.value);
      break;
      case 'lockDay': setLockDay(event.target.value);
    }
  };

  return <TemplateItem key='stakeDialogItem' items={[stakeDialog]} pipe={{
    startLoading, closeLoading,
    t, theme, opened, onClose, dataModel, model, lockDay, handleChange, onStake
  }}></TemplateItem>
}