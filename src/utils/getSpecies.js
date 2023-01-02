import {api} from '../services';

export const GetSpeciesDetails = (name) => {
  let response;
  try {
    response = api.get(`pokemon-species/${name}`);
  } catch (error) {
    console.log(error);
  }
  return response;
};