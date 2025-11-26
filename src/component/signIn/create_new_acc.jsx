import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import logo from '../../assets/ICCD-01.png'
import { useLocation } from 'react-router-dom';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function CreateNewAccount({ modalData, setModalData }) {
    const location = useLocation()
    const { pathname } = location
    return (
        <div className='w-full h-full '>
            {/* <div className={`mt-5 w-full pr-5 flex items-center  ${pathname === '/login' ? 'justify-end' : 'justify-between flex'}`}>
                <button
                    onClick={() => setWithEmail(false)}
                    className={`flex items-center gap-2 cursor-pointer ${pathname === '/login' && 'hidden'} `}>
                    <WestOutlinedIcon />
                    <p className="text-black font-semibold">Back</p>
                </button>
                <button
                    onClick={() => setWithEmail(false)}
                    className="self-end bg-gray-200 flex p-2 rounded-full items-center gap-2 cursor-pointer">
                    <CloseOutlinedIcon />
                </button>
            </div> */}
            <div className="px-10 w-full flex flex-col h-full items-center justify-center lg:mt-2">
                <div className="w-full flex items-center flex-col lg:items-start ">
                    <div className='w-full flex justify-center lg:justify-start'>
                        <img
                            src={logo}
                            alt="Banner"
                            className="lg:w-28 lg:h-28 object-fit "
                        />
                    </div>
                    <h2 className=" text-2xl font-bold text-gray-800 md:text-3xl md:font-semibold lg:mt-3">Create a New Account</h2>
                    <p className="mt-2">Already have an account? <span className="text-[#15A9B2] underline">Sign in</span></p>
                    <div className="w-full space-y-4 ">
                        <div className="relative w-full mt-5 text-black hover:text-white">
                            <EmailOutlinedIcon className="absolute top-2 left-2 " />
                            <button
                                type="submit"
                                className={`border-[1px] border-gray-300 w-full px-4 py-2 font-semibold  bg-white rounded-md  hover:bg-[#01AEAD] transition`}
                            // onClick={()=> setModalData({...modalData, ModalName: 'continue with email'})}
                            // disabled={isPending ? true : false}
                            >
                                Continue with Google
                            </button>
                        </div>

                        <div className="relative w-full mt-5 text-black hover:text-white">
                            <EmailOutlinedIcon className="absolute top-2 left-2 " />
                            <button
                                type="submit"
                                className={`border-[1px] border-gray-300 w-full px-4 py-2 font-semibold  bg-white rounded-md hover:bg-[#01AEAD] transition`}
                                onClick={() => setModalData({ ...modalData, ModalName: 'continue with email' })}
                            // disabled={isPending ? true : false}
                            >
                                Continue with email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewAccount