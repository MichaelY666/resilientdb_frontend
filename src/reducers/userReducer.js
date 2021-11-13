import { useAccordionToggle } from 'react-bootstrap';
import * as actions from '../actions/actionTypes';



let lastId = 0;

//demo of user state structure
// initialState = {
//     {
//         id: 0,
//         name: '',
//         password: ''
//         hash: []
// }

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ADD_USER:
                return {
                    ...state,
                    id: ++lastId,
                    name: action.payload.name,
                    password: action.payload.password,
                    hash: []
                    };
        case actions.SUBS_TO_DOC:
            return {
                ...state,
                hash: [...state.hash, action.payload.hash]
            }
        case actions.DROP_USER:
            return {};
        default:
            return state;
    }
};

export default userReducer;