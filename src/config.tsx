import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
const { 
  CONFIG_NETWORK, 
  CONFIG_PROGRAM_ID ,
  CONFIG_VAULT_NAME,
  CONFIG_ADMIN_KEY,
  CONFIG_REWARD_TOKEN_MINT,
  CONFIG_REWARD_TOKEN_SYMBOL,
  CONFIG_REWARD_TOKEN_DECIMAL,
  CONFIG_NFT_CREATOR,
  CONFIG_TRAIT_TYPE,
  CONFIG_DISCORD_LINK,
  CONFIG_TWITTER_LINK,
} = require("../config.json");
export const NETWORK = CONFIG_NETWORK;

export const USER_POOL_SIZE = 3664;
export const GLOBAL_VAULT_NAME = CONFIG_VAULT_NAME;
export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const EPOCH = 7200;
export const REWARD_TOKEN_DECIMAL = CONFIG_REWARD_TOKEN_DECIMAL;

export const ADMIN_PUBKEY = new PublicKey(
  CONFIG_ADMIN_KEY
); //ignore this fucking shit

export const REWARD_TOKEN_MINT = new PublicKey(
  CONFIG_REWARD_TOKEN_MINT
);

export const REWARD_TOKEN_SYMBOL = CONFIG_REWARD_TOKEN_SYMBOL;
export const PROGRAM_ID = CONFIG_PROGRAM_ID;
export const TRAIT_TYPE = CONFIG_TRAIT_TYPE;
export const NFT_CREATOR = CONFIG_NFT_CREATOR;
export const METAPLEX = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const TWITTER = CONFIG_DISCORD_LINK;
export const DISCORD = CONFIG_TWITTER_LINK;

// Model 2 support
export const ALLOWED_MODELS: Array<any> = [
  {
    value: "2",
    label: "MODELS.2.LABEL",
    description: "MODELS.2.DESC",
  },
];

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
