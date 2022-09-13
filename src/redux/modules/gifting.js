import { GET_GIFTING as GET_GIFTING_API } from 'helpers/apiUrls';

const GET_GIFTING = 'gifting/GET_GIFTING';
const GET_GIFTING_SUCCESS = 'gifting/GET_GIFTING_SUCCESS';
const GET_GIFTING_FAIL = 'gifting/GET_GIFTING_FAIL';

const initialState = {
    loaded: false,
    data: []
};

export default function reducer(state = initialState, action = {} ) {
    switch(action.type) {
        case GET_GIFTING:
            return {
                ...state,
                loading: true,
            };
        case GET_GIFTING_SUCCESS:
            return {
                ...state,
                loading: false,
                Loaded: true,
                data: action.result
            };
        case GET_GIFTING_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export const loadGifting = () => ({
    types: [GET_GIFTING, GET_GIFTING_SUCCESS, GET_GIFTING_FAIL],
    promise: ({ client }) => client.get(GET_GIFTING_API)
});