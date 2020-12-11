import axios from "axios";

export const ACTION_TYPES = {
    CHANGE_FROM_CURRENCY: "CHANGE_FROM_CURRENCY",
    CHANGE_FROM_AMOUNT: "CHANGE_FROM_AMOUNT",
    FETCH_INITIAL_VALUES: "FETCH_INITIAL_VALUES",

    CHANGE_TO: "CHANGE_TO",
    ADD_TO: "ADD_TO",
    GET_CURRENCIES: "GET_CURRENCIES",
    GET_RATES: "GET_RATES",
};

export const initialState = {
    from: {
        currency: "",
        amount: 1
    },
    toes: [{
        id: 1,
        currency: "",
        amount: 0
    }],
    currencies: [],
    rates: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPES.FETCH_INITIAL_VALUES:
            return {
                ...state,
                currencies: [...Object.getOwnPropertyNames(action.payload.data.rates)],
                rates: action.payload.data.rates,
                from: {
                    ...state.from,
                    currency: action.payload.data.base,
                },
                toes: state.toes.map(to => to.id === 1 ? {
                    ...to,
                    currency: Object.keys(action.payload.data.rates)[0],
                    amount: 1 * action.payload.data.rates[Object.keys(action.payload.data.rates)[0]]
                } : to),
            };

        case ACTION_TYPES.CHANGE_FROM_CURRENCY:
            return {
                ...state,
                from: {
                    ...state.from,
                    currency: action.payload
                }
            };

        case ACTION_TYPES.CHANGE_FROM_AMOUNT:
            return {
                ...state,
                from: {
                    ...state.from,
                    amount: action.payload
                }
            };

        case ACTION_TYPES.GET_CURRENCIES:
            return {
                ...state,
                currencies: [...Object.getOwnPropertyNames(action.payload.data.rates)],
            };

        default:
            return state;
    }
};

export const change_from_currency = (currency) => {
    return {
        type: ACTION_TYPES.CHANGE_FROM_CURRENCY,
        payload: currency
    };
};

export const change_from_amount = (amount) => {
    return {
        type: ACTION_TYPES.CHANGE_FROM_AMOUNT,
        payload: amount
    };
};

export const get_initial_values = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.FETCH_INITIAL_VALUES,
        payload: await axios.get("https://api.exchangeratesapi.io/latest")
    });
}