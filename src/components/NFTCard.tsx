
import {
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import Image from 'mui-image';
import { useEffect, useState } from 'react';
import { TFunction } from 'react-i18next';
import { stakeNft } from '../contexts/transaction';
import { getNFTdetail } from '../services/fetchData';
import { TemplateItem } from './TemplateItem';

export default function NFTCard(props: {
  mint: string;
  role: string;
  startLoading: Function;
  closeLoading: Function;
  updatePage: Function;
  t: TFunction
}) {
  const theme = useTheme();
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<any>([{}]);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    getNFTdetail(props, { setImage, setName, setItems, setDialog });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {items && items.length && <TemplateItem key='nftCard' items={items} pipe={{ t: props.t, theme }}></TemplateItem>}
      <StakeDialog
        opened={dialog}
        onClose={() => setDialog(false)}
        image={image}
        mint={props.mint}
        role={props.role}
        startLoading={() => props.startLoading()}
        closeLoading={() => props.closeLoading()}
        updatePage={() => props.updatePage()}
      />
    </>
  );
}

function StakeDialog(props: {
  opened: boolean;
  onClose: Function;
  image: string;
  mint: string;
  role: string;
  startLoading: Function;
  closeLoading: Function;
  updatePage: Function;
}) {
  const {
    opened,
    onClose,
    image,
    mint,
    role,
    startLoading,
    closeLoading,
    updatePage,
  } = props;

  const wallet = useWallet();

  const [model, setModel] = useState('1');
  const [lockDay, setLockDay] = useState('7');

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
    if (model === '1') {
      period = 15;
    } else if (model === '2') {
      period = 0;
    } else if (model === '3') {
      period = parseInt(lockDay);
    }
    console.log(period, role, model, 'period, role, model, ');
    onClose();
    try {
      await stakeNft(
        wallet,
        new PublicKey(mint),
        period,
        role,
        parseInt(model),
        () => startLoading(),
        () => closeLoading(),
        () => updatePage()
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={opened} >
      <div className='dialog-content'>
        <button
          style={{ position: 'absolute', right: 10, top: 10, width: 20 }}
          onClick={() => onClose()}
        >
          x
        </button>
        <div className='nft-detail'>
          <Image src={image} alt='' showLoading width={120} height={120} />
          <h4>
            Role: <br />
            <span>{role}</span>
          </h4>
        </div>
        <FormControl>
          <RadioGroup value={model} onChange={handleChangeModel}>
            <FormControlLabel value={'1'} control={<Radio />} label='Model 1' />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <FormControlLabel value={'2'} control={<Radio />} label='Model 2' />
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <FormControlLabel value={'3'} control={<Radio />} label='Model 3' />
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </RadioGroup>
        </FormControl>
        {model === '3' && (
          <FormControl sx={{ marginLeft: 2 }}>
            <RadioGroup value={lockDay} row onChange={handleChangeDay}>
              <FormControlLabel
                value={'7'}
                control={<Radio size='small' />}
                label='7 days'
              />
              <FormControlLabel
                value={'14'}
                control={<Radio size='small' />}
                label='14 days'
              />
              <FormControlLabel
                value={'30'}
                control={<Radio size='small' />}
                label='30 days'
              />
            </RadioGroup>
          </FormControl>
        )}
        <button
          className='btn-primary'
          style={{ marginTop: 20 }}
          onClick={() => onStake()}
        >
          Stake this nft
        </button>
      </div>
    </Dialog>
  );
}
