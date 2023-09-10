import React from "react"
import AuthForm from "../../components/authForm/AuthForm"
import Navbar from "../../components/navbar/Navbar"

const Auth = () => {
    return (
        <>
            <Navbar navBar={[]} choice={false} />
            <AuthForm />
        </>
    )
}

export default Auth
