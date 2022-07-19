import { Box, Button, Chip, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { map } from "lodash";
import Image from "mui-image";
import { useState } from "react";
import { ALLOWED_LOCKDAYS, ALLOWED_MODELS, DEFAULT_LOCKDAY, DEFAULT_MODEL, MODEL_CAN_SELECT_LOCKDAYS, MODEL_PERIOD_MAPPING } from "../config";
import { stakeNft } from "../contexts/transaction";
import { CloseIcon } from "./svgIcons";


export function StakeDialog(props: {
  opened: boolean;
  onClose: Function;
  image: string;
  name: string,
  mint: string;
  role: string;
  pipe: any;
}) {
  const {
    opened,
    onClose,
    image,
    name,
    mint,
    role,
    pipe,
  } = props;
  const {
    startLoading,
    closeLoading,
    updatePage,
    t
  } = pipe;
  const wallet = useWallet();

  const [model, setModel] = useState(DEFAULT_MODEL);
  const [lockDay, setLockDay] = useState(DEFAULT_LOCKDAY);

  const handleChangeModel = (event: any) => {
    setModel(event.target.value);
  };

  const handleChangeDay = (event: any) => {
    setLockDay(event.target.value);
  };

  const onStake = async () => {
    console.log(role);
    if (wallet.publicKey === null) return;
    let period = 1;
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
  return (
    <Dialog open={opened}>
      <DialogContent>
        <IconButton onClick={() => onClose()} sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon/>
        </IconButton>
        <Box sx={{
          display: 'flex',
        }}>
          <Image src={image} alt="" showLoading width={120} height={120} />
          <Box sx={{ px: 2 }}>
            <Typography >{name}</Typography>
            <Chip variant='outlined' sx={{ mt: 1 }} label={`${t('DESCRIPTION.ROLE')}: ${role}`}></Chip>
          </Box>
        </Box>
      </DialogContent>

      <DialogContent dividers>
        <Box>
          <FormControl>
            <RadioGroup value={model} onChange={handleChangeModel}>
              {
                map(ALLOWED_MODELS, ({ value, label, description }) => <>
                  <FormControlLabel value={value} control={<Radio />} label={t(label)} />
                  { description && <Typography component='p' sx={{ marginLeft: 4 }}> {t(description)} </Typography> }
                  </>)
              }
            </RadioGroup>
          </FormControl>
        </Box>
        {model === MODEL_CAN_SELECT_LOCKDAYS && (
          <Box sx={{ ml: 2 }}>
            <FormControl sx={{ marginLeft: 2 }}>
              <RadioGroup value={lockDay} row onChange={handleChangeDay}>
                {map(ALLOWED_LOCKDAYS, ({ value, label }) => <FormControlLabel
                  value={value}
                  control={<Radio size="small" />}
                  label={t(label)}
                />)}
              </RadioGroup>
            </FormControl>
          </Box>
        )}
        <DialogActions>
          <Button color="success" variant="outlined" sx={{
              mt: 2,
              borderRadius: 5000
            }} 
            onClick={() => onStake()}>
            {t('ACTIONS.STAKE_NOW')}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}