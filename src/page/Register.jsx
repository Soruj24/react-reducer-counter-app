import   { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

// Zod validation schema
const registerSchema = z
    .object({
        username: z.string().min(3, 'Username must be at least 3 characters long'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string().min(6, 'Confirm Password is required'),
        image: z.any().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

const Register = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [fileInputRef, setFileInputRef] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {


            // Send the data to the backend using axios
            const response = await axios.post('http://localhost:3000/api/users/register', data, {
                withCredentials: true
            });
            // Show success toast notification
            toast.success('Registration Successful!');
            navigate('/login')

            // Reset the form
            reset();
            setImagePreview(null); // Reset image preview on successful registration

            // Optionally, handle the response here
            console.log('Server Response:', response.data);
        } catch (error) {
            // Show error toast notification
            toast.error(error.response?.data?.message || 'Registration failed!');
            console.error('Error registering user:', error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef) {
            fileInputRef.click();
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Username</label>
                        <input
                            type="text"
                            {...register('username')}
                            className="w-full p-2 border rounded focus:outline-none focus:border-indigo-500"
                            placeholder="Enter username"
                        />
                        {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                    </div>

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

                    {/* Password field with eye icon toggle */}
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
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password field with eye icon toggle */}
                    <div>
                        <label className="block font-semibold">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className="w-full p-2 border rounded focus:outline-none focus:border-indigo-500"
                                placeholder="Confirm password"
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                            </span>
                        </div>
                        {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
                    </div>



                    {/* Profile Image upload with default image */}
                    <div>
                        <label className="block font-semibold">Profile Image</label>
                        <div className="cursor-pointer w-20 h-20 mt-2" onClick={triggerFileInput}>
                            <img
                                src={
                                    imagePreview || 'https://via.placeholder.com/150' // Default image URL
                                }
                                alt="Preview"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            onChange={handleImageUpload}
                            ref={(input) => setFileInputRef(input)}
                            className="hidden" // Hide the file input
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                        Register
                    </button>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </div>
    );
};

export default Register;
