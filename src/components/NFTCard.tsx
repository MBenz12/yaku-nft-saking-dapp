import {
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Image from "mui-image";
import { useEffect, useState } from "react";
import { TFunction } from "react-i18next";
import { DEFAULT_LOCKDAY, DEFAULT_MODEL } from "../config";
import { nftCard } from "../configs/nftCard";
import { stakeNft } from "../contexts/transaction";
import { getNFTdetail } from "../services/fetchData";
import { errorAlert } from "../services/toastGroup";
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
  const { startLoading, closeLoading, updatePage, t } = props;
  const theme = useTheme();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<any>([{}]);
  const [dialog, setDialog] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateCard = async () => {
    try {
      const json: any = await getNFTdetail(props);
      setImage(json.image);
      setName(json.name);
      const template = nftCard;
      setItems([
        template(
          { ...props, ...json },
          { setDialog }
        ),
      ]);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    updateCard();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {items && items.length && (
        <TemplateItem
          key="nftCard"
          items={items}
          pipe={{ t: props.t, theme, expanded, handleExpandClick }}
        ></TemplateItem>
      )}
      <StakeDialog
        opened={dialog}
        onClose={() => setDialog(false)}
        image={image}
        name={name}
        mint={props.mint}
        role={props.role}
        pipe={{
          startLoading, closeLoading, updatePage, t
        }}
      />
    </>
  );
}
