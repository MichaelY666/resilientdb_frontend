
import * as actions from './actionTypes';


export const add_user = (name, password) => ({
    type: actions.ADD_USER,
    payload: {
        name: name,
        password: password
    }
});

export default subs_to_doc = hash => ({
    type: actions.SUBS_TO_DOC,
    payload: {
        hash: hash
    }
});

export default drop_user = () => ({
    type: actions.DROP_USER
});

export default add_doc = (id, hash) => ({
    type: actions.ADD_DOC,
    payload: {
        owner_id: id,
        signer_id: [],
        hash: hash
    }
});

export default drop_doc = (hash) => ({
    type: actions.DROP_DOC,
    payload: {
        hash: hash
    }
});

export default add_signer = (id, hash) => ({
    type: actions.ADD_SIGNER,
    payload: {
        hash: hash,
        signer_id: id
    }
});