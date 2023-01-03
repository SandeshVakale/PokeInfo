import {api} from '../index';
import {store} from '../../store';
import {
  SET_ERROR_DETAILS,
  SET_FETCHING_DETAILS,
  SET_DETAILS,
} from '../../store/details';
export const getPokemon = async (name) => {
  let response;
  try {
    store.dispatch({
      type: SET_FETCHING_DETAILS,
      payload: true,
    });
    response = await api.get(`pokemon/${name}`);
    store.dispatch({
      type: SET_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    store.dispatch({
      type: SET_ERROR_DETAILS,
      payload: {
        isError: true,
        message: error?.message,
        code: error?.code,
      },
    });
  }
};