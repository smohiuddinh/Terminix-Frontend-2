import { Link } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import login_banner from '../../assets/login_banner_img.png'
import start_exploring_pic from '../../assets/start_exploring_img.png'
import { useLogin } from "../../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

function Start_Journey() {

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

    return (
        <div className="h-full px-10 w-full mt-5 flex items-center justify-center flex-col gap-2">
            <div className="w-full flex items-center justify-center overflow-hidden">
                <img
                    src={start_exploring_pic}
                    className="w-[70%] h-[70%] max-w-full object-contain"
                    alt="Start Exploring"
                />
            </div>
            <h2 className="text-center  font-bold text-gray-800 md:text-2xl md:font-semibold text-lg sm:text-2xl"> Talha1122, this is the beginning of your ICCD journey! </h2>
            <p className="text-center text-[#656565] text-sm">Now's a great time to start exploring the many services our freelancers have to offer.</p>
            <div className="flex justify-center mt-3">
                <button
                    type="submit"
                    className="inline-flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition"
                    disabled={isPending ? true : false}
                >
                    <p>Start Exploring</p>
                    <div className="rounded-full px-1 bg-[#60cfd6]">
                        <EastIcon style={{ fontSize: 20 }} />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Start_Journey