import { ACTION_TYPES } from "./actionTypes"
import axios from "axios";

export const change_from_currency = (base, converterId) => async (dispatch) => {
    const res = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
    dispatch({
        type: ACTION_TYPES.CHANGE_FROM_CURRENCY,
        payload: { res, converterId }
    });
};

export const change_from_amount = (amount, converterId) => {
    return {
        type: ACTION_TYPES.CHANGE_FROM_AMOUNT,
        payload: { amount, converterId }
    };
};

export const get_initial_values = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.FETCH_INITIAL_VALUES,
        payload: await axios.get("https://api.exchangeratesapi.io/latest")
    });
};

export const change_to_currency = (currency, id, converterId) => {
    return {
        type: ACTION_TYPES.CHANGE_TO_CURRENCY,
        payload: { currency, id, converterId }
    };
};

export const add_to = (converterId) => {
    return {
        type: ACTION_TYPES.ADD_TO,
        payload: converterId
    };
};

export const remove_to = (id, converterId) => {
    return {
        type: ACTION_TYPES.REMOVE_TO,
        payload: { id, converterId }
    };
};

export const add_converter = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.ADD_CONVERTER,
        payload: await axios.get("https://api.exchangeratesapi.io/latest")
    });
};