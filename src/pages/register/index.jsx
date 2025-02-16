import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Link, useNavigate} from "react-router-dom"

const schema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        surname: z.string().min(2, "Surname must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phoneNum: z
            .string()
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    })

const Register = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            const {confirmPassword, ...userData} = data

            const response = await axios.post(
                import.meta.env.VITE_BASE_URL,
                userData
            )

            if (response.status === 201) {
                toast.success("Registration successful !")
                reset()
                navigate("/login")
            }
        } catch {
            toast.error("Something went wrong!")
        }
    }

    return (
        <>
            <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center mx-auto h-screen">
                    <div className="rounded-lg shadow dark:border w-[600px] dark:bg-gray-800 dark:border-gray-700">
                        <div className="space-y-5 p-5">
                            <h1 className="text-xl font-bold text-white mb-5">
                                Register
                            </h1>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4 md:space-y-6 grid grid-cols-2 gap-[15px] w-full">
                                {[
                                    {name: "name", placeholder: "Name"},
                                    {name: "surname", placeholder: "Surname"},
                                    {
                                        name: "email",
                                        placeholder: "Email",
                                        type: "email",
                                    },
                                    {
                                        name: "phoneNum",
                                        placeholder: "Phone Number",
                                        type: "tel",
                                    },
                                    {
                                        name: "password",
                                        placeholder: "Password",
                                        type: "password",
                                    },
                                    {
                                        name: "confirmPassword",
                                        placeholder: "Confirm Password",
                                        type: "password",
                                    },
                                ].map(({name, placeholder, type = "text"}) => (
                                    <div key={name} className="w-full">
                                        <input
                                            type={type}
                                            {...register(name)}
                                            placeholder={placeholder}
                                            className={`bg-gray-50 border ${
                                                errors[name]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-800 dark:focus:border-teal-800`}
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
                                    className="w-full text-white bg-teal-800 p-[10px] rounded-lg cursor-pointer active:scale-95 col-span-2">
                                    Register
                                </button>
                            </form>
                            <p className=" mt-2 text-white text-[14px]">
                                Do you already have an account?{" "}
                                <Link className=" text-blue-500" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Register
