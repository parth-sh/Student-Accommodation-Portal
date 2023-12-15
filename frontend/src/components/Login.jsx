import { useState } from "react";

const Login = () => {

    const [loginMethod, setLoginMethod] = useState("email");

    return (
        <div className="rounded-lg shadow-md w-full">

            <div className="text-md font-semibold text-center py-3 border-b text-gray-400">
                Log in or sign up
            </div>

            <div className="text-center m-6">
                <h1 className="text-2xl font-semibold">Welcome to Uninest</h1>
            </div>

            <div className="p-8 pt-0">
                {loginMethod === "phone" ? (
                    <form>
                        <div className="mb-4">
                            <select
                                className="form-select block w-full mt-1 rounded-md border-gray-300 p-1"
                                name="country"
                                defaultValue=""
                            >
                                <option value="" disabled>Country/Region</option>
                                <option value="91">India (+91)</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <input type="text" placeholder="Phone number" className="form-input block w-full mt-1 rounded-md border-gray-300 p-2" name="phone" />
                            <p className="text-xs text-gray-600 mt-2">
                                We'll call or text you to confirm your number. Standard message and data rates apply. <a href="/privacy-policy" className="text-red-500">Privacy Policy</a>
                            </p>
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn w-full py-2 rounded-md airbnb-pink-gradient text-white font-bold">Continue</button>
                        </div>
                    </form>
                ) : loginMethod === "email" ? (
                    <form>
                        <div className="mb-4">
                            <input type="email" placeholder="Email" className="form-input block w-full mt-1 rounded-md border-gray-300 p-2" name="email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" placeholder="Password" className="form-input block w-full mt-1 rounded-md border-gray-300 p-2" name="password" />
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn w-full py-2 rounded-md airbnb-pink-gradient text-white font-bold">Continue</button>
                        </div>
                    </form>
                ) : (<></>)}

                <div className="flex items-center justify-between mb-4">
                    <hr className="w-full" /> <span className="p-2 text-gray-400">or</span>
                    <hr className="w-full" />
                </div>

                {
                    loginMethod !== "email" && (
                        <button
                            className="btn w-full py-2 rounded-md border-2 border-black flex items-center justify-center gap-2"
                            onClick={() => setLoginMethod("email")}
                        >
                            <i className="fas fa-envelope"></i> Continue with Email
                        </button>
                    )
                }
                {
                    loginMethod !== "phone" && (
                        <button
                            className="btn w-full py-2 rounded-md border-2 border-black flex items-center justify-center gap-2"
                            onClick={() => setLoginMethod("phone")}
                        >
                            <i className="fas fa-phone"></i> Continue with Phone
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default Login;