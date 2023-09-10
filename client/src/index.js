import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { SearchContextProvider } from "./context/SearchContext"
import { StyledEngineProvider } from "@mui/material/styles"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <StyledEngineProvider injectFirst>
        <AuthContextProvider>
            <SearchContextProvider>
                <App />
            </SearchContextProvider>
        </AuthContextProvider>
    </StyledEngineProvider>
)
