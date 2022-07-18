import { MetadataKey } from '@nfteyez/sol-rayz/dist/config/metaplex';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import NFTCard from '../components/NFTCard';
import StakedNFTCard from '../components/StakedNFTCard';
import { claimRewardAll } from '../contexts/transaction';
import { getGlobalData, getUnstakedNFTs, getUserPoolData } from '../services/fetchData';
import { TFunction } from 'react-i18next';
import { Breakpoint, Container, Grid, Paper, Typography } from '@mui/material';
import { ColorButton } from '../components/ColorButton';
import { TemplateItem } from '../components/TemplateItem';
import { fields } from '../configs/dashboard'

export default function HomePage(props: {
  startLoading: Function, closeLoading: Function, t: TFunction, theme: any, maxWidth: Breakpoint, className: string, sx: any, items: Array<any>
}) {
  const { startLoading, closeLoading, t, theme, maxWidth, className, sx, items } = props;
  const wallet = useWallet()
  const [hide, setHide] = useState(false);
  const [nftList, setNftList] = useState<any>();

  // global Data values
  const [dataModel, setDataModel] = useState<any>({});

  const [stakedNfts, setStakedNfts] = useState<any>();
  const [userStakedCount, setUserStakedCount] = useState(0);

  const [rewardAmount, setRewardAmount] = useState(0);

  const handleClaimAll = async () => {
    try {
      await claimRewardAll(
        wallet,
        () => startLoading(),
        () => closeLoading(),
        () => updatePage()
      )
    } catch (error) {
      console.log(error)
    }
  }

  const updatePage = () => {
    getUnstakedNFTs({
      startLoading, closeLoading, wallet, setNftList, setHide, hide
    });
    getGlobalData({
      fields,
      setDataModel
    });
    getUserPoolData({
      startLoading, closeLoading, wallet, setUserStakedCount, setRewardAmount, setStakedNfts
    });
  }

  useEffect(() => {
    updatePage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);
  return (
    <Container maxWidth={maxWidth} className={className} sx={sx}>
      <TemplateItem items={items} pipe={{ startLoading, closeLoading, t, theme, dataModel, userStakedCount, rewardAmount }}></TemplateItem>
      <Paper elevation={0}>
        <Grid container sx={{ justifyContent: 'center', p: 2 }}>
          <Grid item>
            <ColorButton colorname='yellow' variant='contained' onClick={() => handleClaimAll()} sx={{
              borderRadius: 5000,
              textTransform: 'none'
            }}>
              {t('ACTIONS.CLAIM_ALL')} ({(rewardAmount).toLocaleString()} {t('TOKEN.NAME')})
            </ColorButton>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {nftList && nftList.length &&
          nftList.map((item: any, key: number) => (
            <Grid key={`nft_grid_${key}`} item xs={3}>
              <NFTCard
                mint={item.mintAddress}
                role={item.role}
                key={key}
                startLoading={() => startLoading()}
                closeLoading={() => closeLoading()}
                updatePage={() => updatePage()}
                t={t}
              />
            </Grid>
          ))
        }
      </Grid>
      <Grid container spacing={2}>
        {stakedNfts && stakedNfts.length !== 0 && stakedNfts.map((item: StakedNFT, key: number) => (
          <Grid key={`staked_nft_grid_${key}`} item xs={3}>
            <StakedNFTCard
              key={key}
              lockTime={item.lockTime}
              model={item.model}
              mint={item.nftAddress}
              rate={item.rate}
              rewardTime={item.rewardTime}
              stakedTime={item.stakedTime}
              startLoading={() => startLoading()}
              closeLoading={() => closeLoading()}
              updatePage={() => updatePage()}
              t={t}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

interface StakedNFT {
  lockTime: number;
  model: number;
  nftAddress: string;
  rate: number;
  rewardTime: number;
  stakedTime: number;
}