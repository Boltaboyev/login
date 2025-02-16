import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const UserInfo = () => {
    const [user, setUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("user")
        navigate("/login")
    }

    const handleChangePassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            toast.error("Min 6 characters!")
            return
        }

        try {
            const updatedUser = {...user, password: newPassword}
            localStorage.setItem("user", JSON.stringify(updatedUser))
            setUser(updatedUser)
            setIsModalOpen(false)
            setNewPassword("")

            await axios.put(`${import.meta.env.VITE_BASE_URL}/${user.id}`, {
                password: newPassword,
            })

            toast.success("Password changed successfully!")
        } catch {
            toast.error("Failed to update password !")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    User Information
                </h2>
                {user ? (
                    <div className="space-y-3">
                        <div className="w-full flex justify-between items-center pb-2 border-b border-[#ffffff1b]">
                            <span className="font-semibold text-teal-600">
                                Name:
                            </span>{" "}
                            {user.name}
                        </div>
                        <div className="w-full flex justify-between items-center pb-2 border-b border-[#ffffff1b]">
                            <span className="font-semibold text-teal-600">
                                Surname:
                            </span>{" "}
                            {user.surname}
                        </div>
                        <div className="w-full flex justify-between items-center pb-2 border-b border-[#ffffff1b]">
                            <span className="font-semibold text-teal-600">
                                Email:
                            </span>{" "}
                            {user.email}
                        </div>
                        <div className="w-full flex justify-between items-center pb-2 border-b border-[#ffffff1b]">
                            <span className="font-semibold text-teal-600">
                                Phone:
                            </span>{" "}
                            {user.phoneNum}
                        </div>
                        <div className="w-full flex justify-between items-center pb-2 border-b border-[#ffffff1b]">
                            <span className="font-semibold text-teal-600">
                                Password:
                            </span>{" "}
                            ••••••••
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full text-center transition duration-[.2s] active:scale-95 border border-blue-500 rounded-lg p-[7px] cursor-pointer hover:bg-[#0000ff32]">
                            Change Password
                        </button>

                        <button
                            onClick={logout}
                            className="w-full text-center transition duration-[.2s] active:scale-95 border border-red-500 rounded-lg p-[7px] mt-3 cursor-pointer hover:bg-[#ff000032]">
                            Log out
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-red-500">
                        No user information found. Please log in.
                    </p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Change Password
                        </h2>
                        <div className="mb-3">
                            <label className="font-semibold text-teal-600">
                                Current Password:
                            </label>
                            <p className="bg-gray-700 text-white p-2 rounded-lg">
                                {user.password}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label className="font-semibold text-teal-600">
                                New Password:
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white p-2 rounded-lg w-full"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg active:scale-95 cursor-pointer">
                                Cancel
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg active:scale-95 cursor-pointer">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default UserInfo
