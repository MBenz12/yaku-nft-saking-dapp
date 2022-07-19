import { MetadataKey } from "@nfteyez/sol-rayz/dist/config/metaplex";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import StakedNFTCard from "../components/StakedNFTCard";
import { claimRewardAll } from "../contexts/transaction";
import {
  getGlobalData,
  getUnstakedNFTs,
  getUserPoolData,
} from "../services/fetchData";
import { TFunction } from "react-i18next";
import { Box, Breakpoint, Container, Grid, Paper } from "@mui/material";
import { ColorButton } from "../components/ColorButton";
import { TemplateItem } from "../components/TemplateItem";
import { fields } from "../configs/dashboard";
import { map } from "lodash";

export default function HomePage(props: {
  startLoading: Function;
  closeLoading: Function;
  t: TFunction;
  theme: any;
  maxWidth: Breakpoint;
  className: string;
  sx: any;
  items: Array<any>;
}) {
  const {
    startLoading,
    closeLoading,
    t,
    theme,
    maxWidth,
    className,
    sx,
    items,
  } = props;
  const wallet = useWallet();
  const [nftList, setNftList] = useState<any>();

  // global Data values
  const [dataModel, setDataModel] = useState<any>({});

  const [stakedNfts, setStakedNfts] = useState<any>();
  const [userStakedCount, setUserStakedCount] = useState(0);

  const [rewardAmount, setRewardAmount] = useState(0);

  const handleClaimAll = async () => {
    try {
      startLoading();
      await claimRewardAll(
        wallet,
      );
      updatePage();
    } catch (error) {
      console.log(error);
    } finally {
      closeLoading();
    }
  };

  const updatePage = async () => {
    try {
      startLoading();
      const list = await getUnstakedNFTs({ wallet });
      setNftList(list);
      const respData = await getGlobalData({ fields });
      setDataModel(respData);
      const {
        count = 0,
        claimReward = 0,
        staked,
      } = await getUserPoolData({ wallet });
      setUserStakedCount(count);
      setRewardAmount(claimReward);
      setStakedNfts(staked);
    } catch (error) {
      console.error(error);
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    updatePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);
  return (
    <Box className={className} sx={sx}>
      <Container maxWidth={maxWidth}>
        <TemplateItem
          key='dashboard_item'
          items={items}
          pipe={{
            startLoading,
            closeLoading,
            t,
            theme,
            dataModel,
            userStakedCount,
            rewardAmount,
            handleClaimAll,
          }}
        ></TemplateItem>
        {nftList && nftList.length > 0 && (
          <Grid container spacing={2}>
            {map(nftList, (item: any, key: number) => (
              <Grid key={`nft_grid_${key}`} item xs={12} md={6} lg={3}>
                <NFTCard
                  mint={item.mintAddress}
                  role={item.role}
                  key={`nft_card#${key}`}
                  startLoading={() => startLoading()}
                  closeLoading={() => closeLoading()}
                  updatePage={() => updatePage()}
                  t={t}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {stakedNfts && stakedNfts.length > 0 && (
          <Grid container spacing={2} sx={{ my: 2 }}>
            {map(stakedNfts, (item: StakedNFT, key: number) => (
              <Grid key={`staked_nft_grid_${key}`} item xs={12} md={6} lg={3}>
                <StakedNFTCard
                  key={`staked_nft_card#${key}`}
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
        )}
      </Container>
    </Box>
  );
}

interface StakedNFT {
  lockTime: number;
  model: number;
  nftAddress: string;
  rate: number;
  rewardTime: number;
  stakedTime: number;
}
