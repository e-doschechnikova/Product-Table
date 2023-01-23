import {Dispatch} from "redux";

export type InitialStateType = typeof initialState
const initialState = {
    documents: [],
}

export const documentsReducer = (state: InitialStateType = initialState, action: SetDocumentType) => {
    switch (action.type) {
        case 'SET_DOCUMENTS':
            return {
                ...state,
                documents: action.payload
            }
        default:
            return state
    }
}

type SetDocumentType = ReturnType<typeof setDocumentsAC>

const setDocumentsAC = (documents: any) => ({
    type: 'SET_DOCUMENTS',
    payload: documents
})

const getData = async () => {
    const reqDocFirst = await fetch('http://localhost:3010/documents1')
    const reqDocSecond = await fetch(`http://localhost:3010/documents2`)

    const dataDocFirst = await reqDocFirst.json()
    const dataDocSecond = await reqDocSecond.json()

    return [...dataDocFirst, ...dataDocSecond]
}

export const setDocumentsTC = () => async (dispatch: Dispatch) => {
    try {
        const concatData = await getData()
        dispatch(setDocumentsAC(concatData))
    } catch (e) {
    }
}

export const cancelProductTC = (idProducts: string) => async (dispatch: Dispatch) => {
    try {
        const req = await fetch('http://localhost:3010/cancel', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                ids: idProducts,
            })
        });
        if (req.status === 200) {

            const concatData = await getData()
            dispatch(setDocumentsAC(concatData))
        }
    } catch (e) {
    }
}
