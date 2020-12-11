import axios from "axios";
import { ACTION_TYPES } from "./actionTypes";

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
            console.log(action.payload);
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload.converterId ? {
                    ...converter,
                    rates: action.payload.res.data.rates,
                    from: {
                        ...converter.from,
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
            console.log(action.payload);
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
            console.log(action.payload);
            return {
                ...state,
                converters: state.converters.map(converter => converter.id === action.payload ? {
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

        case ACTION_TYPES.ADD_CONVERTER:
            return {
                ...state,
                converters: [
                    ...state.converters,
                    {
                        id: state.converters[state.converters.length - 1].id + 1,
                        currencies: [...Object.getOwnPropertyNames(action.payload.data.rates)],
                        rates: action.payload.data.rates,
                        from: {
                            currency: action.payload.data.base,
                            amount: 1
                        },
                        toes: [
                            {
                                id: 1,
                                currency: Object.keys(action.payload.data.rates)[13],
                                amount: 1 * action.payload.data.rates[Object.keys(action.payload.data.rates)[13]]
                            }
                        ]
                    }
                ]
            };

        default:
            return state;
    };
};