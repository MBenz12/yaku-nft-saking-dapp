import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export const NETWORK = "devnet";

export const USER_POOL_SIZE = 3664;
export const GLOBAL_VAULT_NAME = "vault2";
export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const EPOCH = 7200;
export const REWARD_TOKEN_DECIMAL = 100;

export const ADMIN_PUBKEY = new PublicKey(
  "3qWq2ehELrVJrTg2JKKERm67cN6vYjm1EyhCEzfQ6jMd"
); //ignore this fucking shit
//export const REWARD_TOKEN_MINT = new PublicKey("EfHDFK75q329Ee9xBA7xEe1XQGAWBnsrbPqjzmhDvSvQ");
export const REWARD_TOKEN_MINT = new PublicKey(
  "6ufHziFb4eogt51BczXurjakWx6mfWygC3DxcvdLgLGM"
);
//export const PROGRAM_ID = "5vzxCsX1Bhqnv1Y1Gdy7gqL3LztePQ1etzBDPwf4BV5e";
export const PROGRAM_ID = "HakYS4S2zDAH54hH9L1dAbfXLhiAS8gEJcdpJcmJ6Uqv";

export const NFT_CREATOR = "HSrpxmzQQ6n8qPS7sBNpeX3WY59XYVUUpCZ1DzBPEGcF";
export const METAPLEX = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const TWITTER = "https://twitter.com/****";
export const DISCORD = "https://discord.com/****";

// 3 Models support
export const ALLOWED_MODELS: Array<any> = [
  {
    value: "1",
    label: "MODELS.1.LABEL",
    description: "MODELS.1.DESC",
  },
  {
    value: "2",
    label: "MODELS.2.LABEL",
    description: "MODELS.2.DESC",
  },
  {
    value: "3",
    label: "MODELS.3.LABEL",
    description: "MODELS.3.DESC",
  },
];

// 1 Model support
// export const ALLOWED_MODELS: Array<any> = [{
//   value: '1',
//   label: 'MODELS.1.LABEL',
//   description: 'MODELS.1.DESC'
// }];
export const MODEL_CAN_SELECT_LOCKDAYS = "3";
export const ALLOWED_LOCKDAYS: Array<any> = [
  {
    value: "7",
    label: "LOCKDAYS.7DAYS",
  },
  {
    value: "14",
    label: "LOCKDAYS.14DAYS",
  },
  {
    value: "30",
    label: "LOCKDAYS.30DAYS",
  },
];
export const DEFAULT_MODEL = "1";
export const DEFAULT_LOCKDAY = "7";
export const DEFAULT_PERIOD = 1;
export const MODEL_PERIOD_MAPPING: any = {
  "1": 15,
  "2": 0,
};
