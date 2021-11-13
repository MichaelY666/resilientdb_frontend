import * as actions from '../actions/actionTypes';


//demo of doc state structure
// initialState = {
//    docs: [
//     {
//             owner_id: -1,
//             signer_id: [],
//             hash: ''
//      },//individual doc
//     {...},
//     {...}
//         ]
// }

const docReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ADD_DOC:
                return {
                    ...state,
                    docs: [
                        action.payload,
                         ...state.docs
                        ]
                }
        case actions.ADD_SIGNER:
            return {
                ...state,
                docs: state.docs.map(doc => {
                    if (doc.hash === action.payload.hash){
                        return {
                            ...doc,
                            signer_id: [
                                action.payload.signer_id,
                                ...doc.signer_id
                            ]
                        };
                    }
                    else {
                        return doc;
                    }
                })
            };
        case actions.DROP_DOC:
            return {
                ...state,
                docs: state.docs.filter(doc => doc.hash !== action.payload.hash)
            };
        default:
            return state;
    }
};

export default docReducer;