import React, { useEffect, useState, useContext } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import useHTTP from "../../hook/useHTTP"
import { AuthContext } from "../../context/AuthContext"
import styled from "./AuthForm.module.scss"

const AuthForm = () => {
    const navigate = useNavigate()
    let [searchParams] = useSearchParams()
    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const { sendRequest, isError } = useHTTP()
    const [data, setData] = useState(null)

    const { dispatch } = useContext(AuthContext)

    let type = searchParams.get("model"),
        title,
        buttonName

    const submittedHandler = (event) => {
        event.preventDefault()
        sendRequest(
            {
                url: `http://localhost:5000/api/auth/${type}`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: {
                    email: enteredEmail,
                    password: enteredPassword,
                },
            },
            setData
        )
        setEnteredEmail("")
        setEnteredPassword("")
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data?.message && type === "signup")
            return navigate("/auth?model=login")
        if (data?.email && type === "login") {
            dispatch({ type: "LOGIN_SUCCESS", payload: data })
            return navigate("/")
        }
    }, [data, dispatch, navigate, type])

    switch (type) {
        case "login":
            title = "Login"
            buttonName = "Login"
            break
        case "signup":
            title = "Sign Up"
            buttonName = "Create Account"
            break
        default:
            break
    }

    return (
        <div className={styled.showcase}>
            <form onSubmit={submittedHandler}>
                <div>{title}</div>
                <input
                    type="email"
                    placeholder="Email"
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                />
                {data?.message}
                <button
                    type="submit"
                    className="reserve"
                    disabled={!enteredEmail && !enteredPassword}>
                    {enteredEmail && enteredPassword ? buttonName : "Disable"}
                </button>
            </form>
        </div>
    )
}

export default AuthForm
