import { Link } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import login_banner from '../../assets/login_banner_img.png'
import logo from '../../assets/ICCD-01.png'
import { useLogin } from "../../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import profile_pic1 from '../../assets/profile_pic1.png'
import profile_pic2 from '../../assets/profile_pic2.png'

function ChooseProfile({ modalData, setModalData }) {

    const { userLogin, isSuccess, isPending, isError, reset, error, data } = useLogin()
    const schema = yup.object({
        userName: yup.string()
            .required('Username is required.')
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            userName: '',
        }
    });

    const onSubmit = (data) => {
        // console.log("data: ", data)
        userLogin(data)
    };

    const [profile, setProfile] = useState('')
    console.log("profile: ", profile)

    return (

        <div className="px-4 sm:px-10 w-full mt-5 flex  justify-center h-full flex-col gap-4 lg:mt-2">
            <h2 className="text-center font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">
                Talha1122, your account has been created! <br className="hidden sm:block" />
                What brings you to ICCD Freelance?
            </h2>

            <p className="text-center text-[#656565] text-sm sm:text-base">
                We'll tailor your experience to fit your needs.
            </p>

            <div className="w-full mt-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
                {/* Client Button */}
                <button
                    onClick={() => setProfile('client')}
                    className={`w-full sm:w-1/2 relative border-2 p-5 rounded-2xl transition-all ${profile === 'client' ? 'border-black' : 'border-gray-300'
                        }`}
                >
                    <div className="absolute right-2 top-2">
                        {profile === 'client' ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                    </div>
                    <div className="flex flex-col items-start sm:items-center sm:justify-center gap-3">
                        <img className="w-20 h-20 object-contain hidden sm:flex" src={profile_pic1} alt="Client" />
                        <h1 className="text-base sm:text-lg font-medium text-left sm:text-center">I am a Client</h1>
                    </div>
                </button>

                {/* Freelancer Button */}
                <button
                    onClick={() => setProfile('freelancer')}
                    className={`w-full sm:w-1/2 relative border-2 p-5 rounded-2xl transition-all ${profile === 'freelancer' ? 'border-black' : 'border-gray-300'
                        }`}
                >
                    <div className="absolute right-2 top-2">
                        {profile === 'freelancer' ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                    </div>
                    <div className="flex flex-col items-start sm:items-center sm:justify-center gap-3">
                        <img className="w-20 h-20 object-contain hidden sm:flex" src={profile_pic2} alt="Freelancer" />
                        <h1 className="text-base sm:text-lg font-medium text-left sm:text-center">I am a Freelancer</h1>
                    </div>
                </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end">
                <button
                    type="submit"
                    onClick={() => setModalData({
                        ...modalData,
                        ModalName: profile === 'freelancer' ? 'freelancer type' : 'services',
                        isShowLeftPic: false,
                        isShowPolicy: false
                    })}
                    className={`mt-4 inline-flex gap-2 items-center justify-center px-5 py-2 font-semibold text-white bg-[#043A53] rounded-full hover:bg-[#05929c] transition`}
                    disabled={profile ? false : true}
                >
                    <p>Submit</p>
                    <div className="rounded-full px-1 bg-[#60cfd6]">
                        <EastIcon style={{ fontSize: 20 }} />
                    </div>
                </button>
            </div>
        </div>


        // <div className="px-10 w-full mt-5 flex flex-col gap-2">
        //     <h2 className="text-center  font-bold text-gray-800 md:text-2xl md:font-semibold text-lg sm:text-2xl">Talha1122, your account has been created!
        //         What brings you to ICCD Freelance?</h2>
        //     <p className="text-center text-[#656565] text-sm">We'll tailor your experience to fit your needs.</p>
        //     <div className="w-full mt-2 flex flex-col gap-5 sm:flex-row">
        //         <button onClick={() => setProfile('client')} className={`w-full relative border-2 p-7 rounded-2xl sm:p-10 ${profile === 'client' ? 'border-black' : 'border-gray-300'}`}>
        //             <div className=" absolute right-2 top-2">
        //                 {(profile === 'client') ? (<CheckBoxOutlinedIcon />) : <CheckBoxOutlineBlankOutlinedIcon />}
        //             </div>
        //             <div className=" flex flex-col items-start gap-3">
        //                 <img className="w-[40%] h-[40%]" src={profile_pic1} />
        //                 <h1>I am a client</h1>
        //             </div>
        //         </button>
        //         <button onClick={() => setProfile('freelancer')} className={`w-full relative border-2  p-7 rounded-2xl sm:p-10 ${profile === 'freelancer' ? 'border-black' : 'border-gray-300'}`}>
        //             <div className="absolute right-2 top-2">{(profile === 'freelancer') ? (<CheckBoxOutlinedIcon />) : <CheckBoxOutlineBlankOutlinedIcon />}</div>
        //             <div className=" flex flex-col items-start gap-3">
        //                 <img className="w-[40%] h-[40%]" src={profile_pic2} />
        //                 <h1>I am a Freelancer</h1>
        //             </div>
        //         </button>
        //     </div>
        //     <div className="flex sm:justify-end ">
        //         <button
        //             type="submit"
        //             className={`inline-flex mt-3  gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#043A53] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
        //             onClick={() => setModalData({ ...modalData, ModalName: 'services' })}
        //             disabled={isPending ? true : false}
        //         >
        //             <p>Submit</p>
        //             <div className=' rounded-full px-1 py- bg-[#043A53]'>
        //                 <EastIcon style={{ fontSize: 20 }} />
        //             </div>
        //         </button>
        //     </div>
        // </div>
    )
}

export default ChooseProfile