import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {documentsReducer} from "./documents-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    documents: documentsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootActionsType = {}
type AppDispatchType = ThunkDispatch<AppRootStateType, void, AnyAction>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>
