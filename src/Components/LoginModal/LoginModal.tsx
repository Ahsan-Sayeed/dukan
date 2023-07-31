"use client"
import { AuthContext } from '@/app/Context/store';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {User} from 'firebase/auth';

type Props = {}


const LoginModal = (props: Props) => {
    const { createUser, signInUser } = useContext(AuthContext);
    const [registrar, setRegistrar] = useState<boolean | null | undefined>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const notify = (v: string) => toast.error(v, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const router = useRouter();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = e.target as any;
        // console.log(firstName?.value,lastName?.value,email.value,password.value);
        if (firstName?.value || lastName?.value) {
            // console.log(firstName.value,lastName.value,email.value,password.value);
            createUser?.(email.value, password.value)
                .then(({ user }:{user:User}) => {
                    if (user && user?.uid) {
                        router.push('/spreadsheet');
                        // console.log(user);
                        fetch('https://dukan-server-daiu7oxok-ahsan-sayeed.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email: user.email, uid: user.uid })
                        })
                            .then(e => {
                                if (e.status === 200) {
                                    //refetch
                                    //something went wrong('succesfully seller account created');
                                }
                            })
                            .catch(err => {
                                //something went wrong('Something went wrong, Contact developer')
                            })
                    }
                    else {
                        notify("Something went wrong");
                    }
                })
                .catch((err: { message: string }) => {
                    setIsError(true);
                    notify(err.message.split("(")[1].split(')')[0].split('/')[1]);
                })
        }
        else {
            signInUser?.(email.value, password.value)
                .then(({ user }:{user:User}) => {
                    if (user && user?.uid) {
                        //login success
                        router.push('/spreadsheet');
                        console.log('login success');
                    }
                    else {
                        // something went wrong
                        notify("Something went wrong");
                    }
                })
                .catch((err: { message: string }) => {
                    setIsError(true);
                    notify(err.message.split("(")[1].split(')')[0].split('/')[1]);
                })

        }
    }


    return (
        <div className="mockup-code bg-base-300 outline-primary shadow-lg">
            {/* <pre data-prefix="$"><code>npm i daisyui</code></pre> */}
            <div className="card flex-shrink-0 w-full max-w-sm ">
                <form className="card-body" onSubmit={handleSubmit}>
                    {registrar && <><div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input type="text" placeholder="First Name" className="input input-bordered" name='firstName' required />
                    </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="Last Name" className="input input-bordered" name='lastName' required />
                        </div></>}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered text-black" name='email' required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className={`input input-bordered ${isError && 'input-error'}`} name='password' required />
                        {!registrar && <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>}
                    </div>
                    {
                        registrar ?
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary" type='submit'>Registrar</button>
                            </div>
                            :
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type='submit'>Login</button>
                            </div>
                    }
                    {/* {
                        registrar && <div className="form-control">
                            <button className="btn btn-outline mt-2"><FcGoogle size={22} /> Google</button>
                        </div>
                    } */}
                    {/* <span className="label-text-alt link link-hover" onClick={() => setRegistrar(!registrar)}>
                        {registrar ? "Already have an account? Login." : "Don't have an account? Registrar."}
                    </span> */}
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default LoginModal;