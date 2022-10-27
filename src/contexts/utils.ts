import { programs } from "@metaplex/js";
import { web3 } from "@project-serum/anchor";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { NETWORK } from "../config";
const endpoint = "https://solana-api.projectserum.com";

export const solConnection = new web3.Connection(NETWORK === 'mainnet-beta' ? endpoint : clusterApiUrl(NETWORK), {
  commitment: "confirmed",
});

export const getNftMetaData = async (nftMintPk: PublicKey) => {
  let {
    metadata: { Metadata },
  } = programs;
  let metadataAccount = await Metadata.getPDA(nftMintPk);
  const metadata = await Metadata.load(solConnection, metadataAccount);
  return metadata.data.data.uri;
};
