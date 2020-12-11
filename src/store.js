import axios from "axios";
import { act } from "react-dom/test-utils";

export const ACTION_TYPES = {
    FETCH_INITIAL_VALUES: "FETCH_INITIAL_VALUES",
    CHANGE_FROM_CURRENCY: "CHANGE_FROM_CURRENCY",
    CHANGE_FROM_AMOUNT: "CHANGE_FROM_AMOUNT",
    CHANGE_TO_CURRENCY: "CHANGE_TO_CURRENCY",
    ADD_TO: "ADD_TO",
    REMOVE_TO: "REMOVE_TO"
};

export const initialState = {
    converters: [
        {
            id: 1,
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
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPES.FETCH_INITIAL_VALUES:
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === 1 ? {
                    ...converter,
                    currencies: [...Object.getOwnPropertyNames(action.payload.data.rates)],
                    rates: action.payload.data.rates,
                    from: {
                        ...converter.from,
                        currency: action.payload.data.base,
                    },
                    toes: converter.toes.map(to => to.id === 1 ? {
                        ...to,
                        currency: Object.keys(action.payload.data.rates)[13],
                        amount: 1 * action.payload.data.rates[Object.keys(action.payload.data.rates)[13]]
                    } : to),
                } : converter),
            };

        case ACTION_TYPES.CHANGE_FROM_CURRENCY:
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload.converterId ? {
                    ...converter,
                    rates: action.payload.res.data.rates,
                    from: {
                        ...state.from,
                        currency: action.payload.res.data.base
                    },
                    toes: converter.toes.map(to => {
                        return {
                            ...to,
                            amount: converter.from.amount * action.payload.res.data.rates[to.currency]
                        }
                    }),
                } : converter),
            };

        case ACTION_TYPES.CHANGE_FROM_AMOUNT:
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload.converterId ? {
                    ...converter,
                    from: {
                        ...state.from,
                        amount: action.payload.amount
                    },
                    toes: converter.toes.map(to => {
                        return {
                            ...to,
                            amount: action.payload.amount * converter.rates[to.currency]
                        }
                    }),
                } : converter)
            };

        case ACTION_TYPES.CHANGE_TO_CURRENCY:
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload.converterId ? {
                    ...converter,
                    toes: converter.toes.map(to => to.id === action.payload.id ? {
                        ...to,
                        currency: action.payload.currency,
                        amount: converter.from.amount * converter.rates[action.payload.currency]
                    } : to),
                } : converter)
            };

        case ACTION_TYPES.ADD_TO:
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload.converterId ? {
                    ...converter,
                    toes: [
                        ...converter.toes,
                        {
                            id: converter.toes[converter.toes.length - 1].id + 1,
                            currency: converter.toes[converter.toes.length - 1].currency,
                            amount: converter.toes[converter.toes.length - 1].amount
                        }
                    ]
                } : converter)
            };

        case ACTION_TYPES.REMOVE_TO:
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload.converterId ? {
                    ...converter,
                    toes: [
                        ...converter.toes.filter(toEl => toEl.id !== action.payload.id),
                    ]
                } : converter)
            };

        default:
            return state;
    }
};

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
    }
}