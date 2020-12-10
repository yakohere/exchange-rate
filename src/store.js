import axios from "axios";

export const ACTION_TYPES = {
    GET_CURRENCIES: "GET_CURRENCIES",
};

export const initialState = {
    currencies: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_CURRENCIES:
            return {
                ...state,
                currencies: [...Object.getOwnPropertyNames(action.payload.data.rates)],
            };

        default:
            return state;
    }
};

export const getCurrencies = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.GET_CURRENCIES,
        payload: await axios.get("https://api.exchangeratesapi.io/latest")
    });
};
