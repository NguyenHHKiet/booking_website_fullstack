import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    destination: undefined,
    dates: [],
    options: {
        adult: 1,
        children: 0,
        room: 1,
    },
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "SEARCH":
            return action.payload
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    return (
        <SearchContext.Provider
            value={{
                destination: state.destination,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}>
            {children}
        </SearchContext.Provider>
    )
}
