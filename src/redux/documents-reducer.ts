import {Dispatch} from "redux";

export type InitialStateType = typeof initialState
const initialState = {
    documents: [],
}

export const documentsReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case 'SET_DOCUMENTS':
            return {
                ...state,
                documents: action.payload
            }
        case 'SET_IS_LOADING':
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}


const setDocumentsAC = (documents: any) => ({
    type: 'SET_DOCUMENTS',
    payload: documents
})

export const setDocumentsTC = () => async (dispatch: Dispatch) => {
    try {
        const reqDocFirst = await fetch('http://localhost:3000/documents1')
        const reqDocSecond = await fetch(`http://localhost:3000/documents2`)
        let dataDocFirst = await reqDocFirst.json()
        const dataDocSecond = await reqDocSecond.json()
        const concatData = [...dataDocFirst, ...dataDocSecond]

        dispatch(setDocumentsAC(concatData))
    } catch (e) {

    }
}

export const cancelProductTC = (idProducts: any) => async (dispatch: Dispatch) => {
    try {
        const req = await fetch('http://localhost:3000/cancel', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                ids: idProducts,
            })
        });
        if (req.status === 200) {
            const reqDocFirst = await fetch('http://localhost:3000/documents1')
            const reqDocSecond = await fetch(`http://localhost:3000/documents2`)
            let dataDocFirst = await reqDocFirst.json()
            const dataDocSecond = await reqDocSecond.json()
            const concatData = [...dataDocFirst, ...dataDocSecond]
            dispatch(setDocumentsAC(concatData))
        }

    } catch (e) {
    }
}
