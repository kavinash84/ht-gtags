import { MATTRESSES_API } from "../../helpers/apiUrls";

const GET_MATTRESSES = 'mattresses/GET_MATTRESSES';
const GET_MATTRESSES_SUCCESS = 'mattresses/GET_MATTRESSES_SUCCESS';
const GET_MATTRESSES_FAIL = 'mattresses/GET_MATTRESSES_FAIL';

const initialState = {
    loading: false,
    loaded: false,
    data: {}
}

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case GET_MATTRESSES:
            return {
                ...state,
                loading: true
            };
        case GET_MATTRESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            }
        case GET_MATTRESSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export const getMattressesData = () => ({
    types: [GET_MATTRESSES, GET_MATTRESSES_SUCCESS, GET_MATTRESSES_FAIL],
    promise: ({ client }) => client.get(MATTRESSES_API)
})