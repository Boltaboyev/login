import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    })

    const SubmitData = async (data) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}`)

            if (response.status === 200) {
                const user = response.data.find(
                    (user) =>
                        user.email === data.email &&
                        user.password === data.password
                )

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user))
                    toast.success("Login successful !")
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                    reset()
                } else {
                    toast.error("Invalid email or password!")
                }
            }
        } catch {
            toast.error("Something went wrong !")
        }
    }

    return (
        <>
            <section className="bg-gray-900 h-screen flex items-center justify-center">
                <div className="rounded-lg shadow dark:border w-[600px] dark:bg-gray-800 dark:border-gray-700 p-5">
                    <h1 className="text-xl font-bold text-white mb-5">
                        Login
                    </h1>
                    <form
                        onSubmit={handleSubmit(SubmitData)}
                        className="space-y-7">
                        {[
                            {
                                name: "email",
                                placeholder: "Email",
                                type: "email",
                            },
                            {
                                name: "password",
                                placeholder: "Password",
                                type: "password",
                            },
                        ].map(({name, placeholder, type}) => (
                            <div key={name} className="w-full">
                                <input
                                    type={type}
                                    {...register(name)}
                                    placeholder={placeholder}
                                    className={`bg-gray-50 border ${
                                        errors[name]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } text-gray-900 text-sm rounded-lg focus:ring-teal-800 focus:border-teal-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                                />
                                {errors[name] && (
                                    <small className="text-red-500">
                                        {errors[name].message}
                                    </small>
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full text-white bg-teal-800 p-2 rounded-lg cursor-pointer active:scale-95">
                            Login
                        </button>
                    </form>
                    <p className=" mt-2 text-white text-[14px]">You don't have an account yet? <Link className=" text-blue-500" to="/register">Register</Link></p>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Login
