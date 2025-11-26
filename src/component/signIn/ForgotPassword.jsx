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
import { useSendOtp } from "../../../api/client/user";
import SignIn_modal1 from "../modal/signIn_Modal1";

function ForgotPassword({ handleSwitch, setEmail }) {

    const { handleEmail, isSuccess, isPending, isError, error, data } = useSendOtp({
        onSuccess: (response, data) => {
            handleSwitch('verify-otp')
            setEmail(data?.email)
        },
        onError: (err) => {
            console.error("Signup error:", err);
        },
    })

    const schema = yup.object({
        email: yup.string()
            .email('Please enter a valid email address').required('Email is required')
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = (data) => {
        handleEmail(data)
    };

    return (
        <div className="px-10 w-full mt-5 flex flex-col gap-2">
            <div className='w-full flex justify-center lg:justify-start'>
                <img
                    src={logo}
                    alt="Banner"
                    className="lg:w-24 lg:h-24 object-fit "
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Forgot Email</h2>
            {/* <p className="text-[#656565] text-sm">Add a username that's unique to you, this is how you'll appear to others.</p> */}
            {/* <p className="text-[#656565] text-sm font-bold">You can't change your username, so choose wisely.</p> */}
            <div className="w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">Enter email</label>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <input
                            name="userName"
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="abc@gmail.com"
                        />
                    )}
                />
                {errors?.email && (<p className="mt-1 text-red-600">{errors?.email?.message}</p>)}
            </div>

            {(!errors?.userName) && (
                <p className="text-red-600">{error}</p>
            )}

            <div className='flex gap-4'>
                <button
                    type="submit"
                    className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                    onClick={() => handleSwitch('login')}
                    disabled={isPending ? true : false}
                >
                    {/* <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
            <ArrowLeft style={{ fontSize: 20 }} />
          </div> */}
                    <p>Back</p>
                </button>
                <button
                    type="submit"
                    className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isPending ? true : false}
                >
                    <p>Submit</p>
                    {/* <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
                    <EastIcon style={{ fontSize: 20 }} />
                </div> */}
                </button>
            </div>
        </div>
    )
}

export default ForgotPassword