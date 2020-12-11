import axios from "axios";

export const ACTION_TYPES = {
    FETCH_INITIAL_VALUES: "FETCH_INITIAL_VALUES",
    CHANGE_FROM_CURRENCY: "CHANGE_FROM_CURRENCY",
    CHANGE_FROM_AMOUNT: "CHANGE_FROM_AMOUNT",
    CHANGE_TO_CURRENCY: "CHANGE_TO_CURRENCY",
    ADD_TO: "ADD_TO",
    REMOVE_TO: "REMOVE_TO"
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
                    currency: Object.keys(action.payload.data.rates)[13],
                    amount: 1 * action.payload.data.rates[Object.keys(action.payload.data.rates)[13]]
                } : to),
            };

        case ACTION_TYPES.CHANGE_FROM_CURRENCY:
            console.log(action.payload.data);
            return {
                ...state,
                rates: action.payload.data.rates,
                from: {
                    ...state.from,
                    currency: action.payload.data.base
                },
                toes: state.toes.map(to => {
                    return {
                        ...to,
                        amount: state.from.amount * action.payload.data.rates[to.currency]
                    }
                }),
            };

        case ACTION_TYPES.CHANGE_FROM_AMOUNT:
            return {
                ...state,
                from: {
                    ...state.from,
                    amount: action.payload
                },
                toes: state.toes.map(to => {
                    return {
                        ...to,
                        amount: action.payload * state.rates[to.currency]
                    }
                }),
            };

        case ACTION_TYPES.CHANGE_TO_CURRENCY:
            return {
                ...state,
                toes: state.toes.map(to => to.id === action.payload.id ? {
                    ...to,
                    currency: action.payload.currency,
                    amount: state.from.amount * state.rates[action.payload.currency]
                } : to),
            };

        case ACTION_TYPES.ADD_TO:
            return {
                ...state,
                toes: [
                    ...state.toes,
                    {
                        id: state.toes[state.toes.length - 1].id + 1,
                        currency: state.toes[state.toes.length - 1].currency,
                        amount: state.toes[state.toes.length - 1].amount
                    }
                ]
            };

        case ACTION_TYPES.REMOVE_TO:
            return {
                ...state,
                toes: [
                    ...state.toes.filter(toEl => toEl.id !== action.payload),
                ]
            };

        default:
            return state;
    }
};

export const change_from_currency = (base) => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CHANGE_FROM_CURRENCY,
        payload: await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
    });
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
};

export const change_to_currency = (currency, id) => {
    return {
        type: ACTION_TYPES.CHANGE_TO_CURRENCY,
        payload: { currency, id }
    };
};

export const add_to = () => {
    return {
        type: ACTION_TYPES.ADD_TO,
        payload: []
    };
};

export const remove_to = (id) => {
    return {
        type: ACTION_TYPES.REMOVE_TO,
        payload: id
    }
}