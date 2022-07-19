import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import moment from "moment";

export const nftCard = (json: any, { setDialog }: any) => ({
  type: "card",
  alt: "",
  showLoading: true,
  image: json.image,
  src: json.image,
  title: json.name,
  sx: {
    borderRadius: 4,
  },
  buttons: [
    {
      type: "button",
      label: "ACTIONS.STAKE",
      color: "success",
      variant: "outlined",
      sx: {
        marginLeft: "auto",
        borderRadius: 5000,
        fontWeight: 700,
        textTransform: "none",
      },
      onClick: () => setDialog(true),
    },
  ],
});

export const stakedNftCard = (
  { name, image, model, rate, stakedTime }: any,
  { handleUnstake, handleClaim }: any
) => ({
  type: "card",
  alt: "",
  showLoading: true,
  image: image,
  src: image,
  title: name,
  description: [
    {
      type: "chip",
      color: "primary",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) => `${t("DESCRIPTION.MODEL")}: ${model}`,
    },
    {
      type: "chip",
      color: "secondary",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) =>
        `${t("DESCRIPTION.RATE")}: ${rate / LAMPORTS_PER_SOL}`,
    },
    {
      type: "chip",
      color: "success",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) =>
        `${t("DESCRIPTION.STAKED_TIME")}: ${moment(stakedTime * 1000).format(
          "YYYY-MM-DD HH:mm:SS"
        )}`,
    },
  ],
  sx: {
    borderRadius: 4,
  },
  buttons: [
    {
      type: "button",
      label: "ACTIONS.UNSTAKE",
      color: "error",
      variant: "outlined",
      sx: {
        marginLeft: "auto",
        borderRadius: 5000,
        fontWeight: 700,
        textTransform: "none",
      },
      onClick: () => handleUnstake(),
    },
    {
      type: "button",
      label: "ACTIONS.CLAIM",
      color: "warning",
      variant: "outlined",
      sx: {
        borderRadius: 5000,
        fontWeight: 700,
        textTransform: "none",
      },
      onClick: () => handleClaim(),
    },
  ],
});
