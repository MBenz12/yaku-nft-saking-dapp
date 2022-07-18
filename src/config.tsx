import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export const NETWORK = "mainnet-beta";

export const USER_POOL_SIZE = 3664;
export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const EPOCH = 7200;
export const REWARD_TOKEN_DECIMAL = 1000000000;

export const ADMIN_PUBKEY = new PublicKey("Fs8R7R6dP3B7mAJ6QmWZbomBRuTbiJyiR4QYjoxhLdPu"); //ignore this fucking shit
//export const REWARD_TOKEN_MINT = new PublicKey("EfHDFK75q329Ee9xBA7xEe1XQGAWBnsrbPqjzmhDvSvQ");
export const REWARD_TOKEN_MINT = new PublicKey("326vsKSXsf1EsPU1eKstzHwHmHyxsbavY4nTJGEm3ugV");
//export const PROGRAM_ID = "5vzxCsX1Bhqnv1Y1Gdy7gqL3LztePQ1etzBDPwf4BV5e";
export const PROGRAM_ID = "8g3PG15GWGFsBLtfaVXZ8ntpUTNvwDMsrW2dRFr7pR4V";

export const NFT_CREATOR = "AV1xJmDHEBSigGA99A8SXqdcSMDR3gNywjCeFwTrtMni"
export const METAPLEX = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
