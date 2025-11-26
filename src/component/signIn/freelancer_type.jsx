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
import just_me from '../../assets/just_me.png'
import two_ten from '../../assets/2_10.png'
import eleven_sixty from '../../assets/11_60.png'
import fifty_one_five_hundred from '../../assets/51_500.png'
import five_hundred_plus from '../../assets/500_plus.png'



function Freelancer_Type({ modalData, setModalData }) {

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

    const emp_data = [
        { amount: 'A side hustle', image: just_me },
        { amount: 'Solo Freelancer', image: two_ten },
        { amount: 'Agency employee', image: eleven_sixty },
        { amount: 'Agency owner', image: fifty_one_five_hundred }]
    return (
        <div className="h-full px-10 w-full mt-5 flex items-center justify-center flex-col gap-3">
            <h2 className="text-center font-bold text-gray-800 md:text-2xl md:font-semibold text-lg sm:text-2xl">
                What type of freelancer are you?
            </h2>
            <p className="text-center text-[#656565] text-sm">Whatever your style, we’ll make it work.</p>

            <div className="w-full mt-2 flex flex-col gap-5 justify-center sm:flex-row sm:flex-wrap md:flex-wrap">
                {emp_data.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setProfile(item.amount)}
                        className={`flex flex-col items-center gap-4 relative border-2 p-5 rounded-2xl cursor-pointer transition sm:p-10 md:p-5  lg:p-6 ${profile === item.amount ? 'border-black' : 'border-gray-300'}`}
                    >
                        <div className="absolute right-2 top-2">
                            {profile === item.amount ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                        </div>
                        <div className="flex sm:flex-col">
                            <img
                                className="w-16 h-16 object-contain hidden sm:w-20 sm:h-20 md:w-24 md:h-24 md:flex"
                                src={item.image}
                            />
                            <h1 className="text-base sm:text-lg font-medium">{item.amount}</h1>

                        </div>
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="mt-3 self-center sm:self-auto inline-flex gap-2 items-center justify-center px-6 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition"
                    disabled={isPending}
                    onClick={() => setModalData({ ...modalData, ModalName: 'freelancer experience' })}
                >
                    <p>Submit</p>
                    <div className="rounded-full px-1 bg-[#60cfd6]">
                        <EastIcon style={{ fontSize: 20 }} />
                    </div>
                </button>
            </div>
        </div>

    )
}

export default Freelancer_Type