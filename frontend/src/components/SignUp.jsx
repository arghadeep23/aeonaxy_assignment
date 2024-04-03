import React from 'react'
import CreatorSVG from "../assets/creators.svg";
export default function SignUp() {
    return (
        <>
            <div className="flex h-screen">
                <div className="hidden md:block h-screen bg-yellow-500/45 px-14 w-[400px] lg:w-[600px]">
                    <div class="flex flex-col justify-evenly h-full">
                        <div>
                            <h1 className="font-header mb-5 text-lg text-yellow-700/80 tracking-widest">dribbble</h1>
                            <h1 className="text-xl font-extrabold text-yellow-900/80 font-inter">Discover the world's top Designers and Creatives.</h1>
                        </div>
                        <img src={CreatorSVG} alt="creator" />
                        <div>
                            <p className="text-yellow-900/90">Art by <span className="underline"><a href="#" >Peter Tarka</a></span></p>
                        </div>
                    </div>
                </div>
                <div className="h-full pt-3 w-full overflow-auto">
                    <div class="flex flex-row justify-end w-full pr-5">
                        <p className="font-medium">Already a member? <span><a href="#" className="text-[#816391]">Sign In</a></span></p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 w-full">

                        <div className="w-[344px] sm:w-[524px] md:w-[424px] pt-8">
                            <h1 className="font-bold text-2xl">Sign up to Dribbble</h1>
                        </div>

                        {/* form validation sentence */}
                        <div class="flex flex-col items-center pt-12">
                            <form action="" className="flex flex-col gap-10">
                                <div className="flex flex-row justify-center gap-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-bold">Name</label>
                                        <input type="text" id="name" className="bg-slate-200 px-2 py-1 rounded-md text-sm font-medium w-[160px] sm:w-[250px] md:w-[200px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="username" className="text-bold">Username</label>
                                        <input type="text" id="username" className="bg-slate-200 px-2 py-1 text-sm font-medium rounded-md w-[160px] sm:w-[250px] md:w-[200px]" />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <div className="flex flex-col w-[344px] sm:w-[524px] md:w-[424px]">
                                        <label htmlFor="email" className="text-bold ">Email</label>
                                        <input type="text" id="email" className="bg-slate-200 px-2 py-1 text-sm font-medium rounded-md" />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <div className="flex flex-col w-[344px] sm:w-[524px] md:w-[424px]">
                                        <label htmlFor="password" className="text-bold">Password</label>
                                        <input type="password" id="password" className="bg-slate-200 px-2 py-1 text-sm font-medium rounded-md" placeholder="6+ characters" />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <div className="flex flex-row w-[344px] sm:w-[524px] md:w-[424px]" >
                                        <input type="checkbox" id="pp" className="mr-2 w-8 h-8 rounded-none border-none" />
                                        <label htmlFor="pp" className="text-sm">Creating an account means you're okay with our <span className="text-[#b271d4] font-medium"><a href="">Terms of Service</a></span>,<span className="text-[#b271d4] font-medium"><a href="">Privacy Policy</a></span>, and our default <span className="text-[#b271d4] font-medium"><a href="">Notification Settings.</a></span></label>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <button className="bg-[#EA4B8B] px-10 py-1 rounded-md text-white hover:bg-[#ea4b8bc4]">Create Account</button>
                                    </div>
                                    <div className="w-[300px] sm:w-[450px] md:w-[400px] pt-4">
                                        <p className="text-slate-500 text-xs">This site is protected by reCAPTCHA and the Google <span className="text-[#b271d4] font-medium"><a href="">Privacy Policy</a></span> and <span className="text-[#b271d4] font-medium"><a href="">Terms of Service</a></span> apply.</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
