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
import service_pic1 from '../../assets/service_pic1.png'
import service_pic2 from '../../assets/service_pic2.png'
import service_pic3 from '../../assets/service_pic3.png'


function Services({ modalData, setModalData }) {

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
    const services_detail = [
        { name: 'Primary job or business', image: service_pic1 },
        { name: 'Secondary Business', image: service_pic2 },
        { name: 'Non-business needs', image: service_pic3 }
    ]

    return (
        <div className="px-10 w-full mt-5 flex justify-center items-center h-full flex-col gap-4">
            <h2 className="text-center  font-bold text-gray-800 md:text-2xl md:font-semibold text-lg sm:text-2xl">What do you plan to order services for? </h2>
            <p className="text-center text-[#656565] text-sm">There’s something for everyone.</p>
            <div className="w-full mt-2 grid grid-cols-1 gap-5 sm:gap-5 sm:grid-cols-3 ">
                {
                    services_detail.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setProfile(item.name)}
                            className={`flex relative border-2 p-7 rounded-2xl sm:p-10 items-center gap-5 ${profile === item.name ? 'border-black' : 'border-gray-300'
                                }`}
                        >
                            {/* Checkbox in top right corner */}
                            <div className="absolute right-2 top-2">
                                {profile === item.name ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                            </div>

                            {/* Row: Image + Text */}
                            <div className="flex flex-row items-center gap-5 sm:flex-col">
                                <img
                                    src={item.image}
                                    alt="Primary"
                                    className="w-16 h-16 object-contain hidden sm:w-20 sm:h-20 md:w-24 md:h-24 md:flex"
                                />
                                <h1 className="text-base sm:text-lg font-medium">{item.name}</h1>
                            </div>
                        </button>
                    ))
                }

            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className={`inline-flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                    onClick={() => setModalData({ ...modalData, ModalName: 'total employee' })}
                    disabled={isPending ? true : false}
                >
                    <p>Submit</p>
                    <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
                        <EastIcon style={{ fontSize: 20 }} />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Services