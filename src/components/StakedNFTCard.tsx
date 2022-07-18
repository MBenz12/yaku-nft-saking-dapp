import { useTheme } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { TFunction } from 'react-i18next';
import { claimReward, withdrawNft } from '../contexts/transaction';
import { getNFTdetail } from '../services/fetchData';
import { TemplateItem } from './TemplateItem';

export default function StakedNFTCard(props: {
  mint: string,
  lockTime: number,
  model: number,
  rate: number,
  rewardTime: number,
  stakedTime: number,
  startLoading: Function,
  closeLoading: Function,
  updatePage: Function,
  t: TFunction,
}) {
  const theme = useTheme();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [items, setItems] = useState<any>([{}]);
  const wallet = useWallet();

  const handleUnstake = async () => {
    try {
      await withdrawNft(
        wallet,
        new PublicKey(props.mint),
        () => props.startLoading(),
        () => props.closeLoading(),
        () => props.updatePage()
      )
    } catch (error) {

    }
  }

  const handleClaim = async () => {
    if (wallet.publicKey === null) return;
    try {
      await claimReward(
        wallet,
        new PublicKey(props.mint),
        () => props.startLoading(),
        () => props.closeLoading(),
        () => props.updatePage()
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNFTdetail(props, { setImage, setName, setItems, handleUnstake, handleClaim });
    // eslint-disable-next-line
  }, [])
  return (
    <TemplateItem key='stakedNftCard' items={items} pipe={{ t: props.t, theme }}></TemplateItem>
  )
}
