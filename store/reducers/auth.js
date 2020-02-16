const initialState = {
    user: {
        emailAddress: 'dumb@email.address'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export default reducer;