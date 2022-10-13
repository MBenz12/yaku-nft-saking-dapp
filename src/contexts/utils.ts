import { PublicKey } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";
import { programs } from "@metaplex/js";
import { NETWORK } from "../config";
const endpoint = "https://solana-api.projectserum.com";

export const solConnection = new web3.Connection(endpoint, {
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
