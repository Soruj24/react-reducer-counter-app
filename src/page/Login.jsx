import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios'; // Import Axios

// Zod validation schema
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            // Replace 'https://your-api-endpoint.com/login' with your actual login API endpoint
            const response = await axios.post('ttp://localhost:3000/api/auth/login', data);
            console.log(response)
            toast.success(response.data.message || 'Login Successful!');
            reset(); // Reset form after successful login
        } catch (error) {
            console.log(error)
            toast.error(error || 'Login failed! Please try again.');

        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full p-2 border rounded focus:outline-none focus:border-indigo-500"
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className="w-full p-2 border rounded focus:outline-none focus:border-indigo-500"
                                placeholder="Enter password"
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </div>
    );
};

export default Login;
