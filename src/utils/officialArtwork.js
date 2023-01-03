import { officialArtworkUrl } from "../config";

export const OfficialArtwork = (PokeID) => {
  if (!PokeID) {
    return null;
  }
  return `${officialArtworkUrl}/${PokeID}.png`;
};