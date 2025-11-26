import login_banner from '../../assets/login_banner_img.png'
import CreateNewAccount from "../signIn/create_new_acc";
import ContinueWithEmail from '../signIn/ChangePassword';
import GetProfile from '../signIn/ForgotPassword'
import ConfirmEmail from '../signIn/verifyOtp'
import ChooseProfile from '../signIn/choose_profile'
import Services from '../signIn/services'
import Total_Emp from '../signIn/total_emp';
import Start_Journey from '../signIn/start_journey';
import { useState } from 'react';
import Freelancer_Type from '../signIn/freelancer_type';
import Freelancing_Experience from '../signIn/freelancing_experience';
import SignUp from '../signIn/signup';

function SignIn_modal1({ children }) {
    const [modalData, setModalData] = useState({
        isShowLeftPic: true,
        picPath: login_banner,
        isShowPolicy: true,
        ModalType: 'login process',
        ModalName: 'login'
    })
    return (
        <div className="w-full flex fixed z-20 inset-0 sm:p-5 sm:items-center sm:justify-center lg:p-10 ">
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className={`z-10 flex w-full h-full flex-col bg-white sm:rounded-4xl sm:w-xl md:w-xl lg:flex-row lg:min-w-5xl shadow-lg `}>
                {modalData.isShowLeftPic && (<img src={login_banner} alt="Banner" className="hidden w-full h-full object-fit lg:flex" />)}
                <div className='w-full flex flex-col h-full'>
                    <div className="pb-10 rounded-tr-xl rounded-br-xl w-full h-full flex flex-col sm:items-center sm:justify-center">
                        {children}
                        {/* <ContinueWithEmail modalData={modalData} setModalData={setModalData} /> */}
                        {/* {modalData.ModalName === 'login' && (<CreateNewAccount modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'signup' && (<SignUp modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'continue with email' && (<ContinueWithEmail modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'get profile' && (<GetProfile modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'confirm email' && (<ConfirmEmail modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'choose profile' && (<ChooseProfile modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'freelancer type' && (<Freelancer_Type modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'freelancer experience' && (<Freelancing_Experience modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'services' && (<Services modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'total employee' && (<Total_Emp modalData={modalData} setModalData={setModalData} />)}
                        {modalData.ModalName === 'start journey' && (<Start_Journey modalData={modalData} setModalData={setModalData} />)} */}
                    </div>
                    {modalData.isShowPolicy && (<p className="px-10 pb-6 text-xs text-center">
                        By joining, you agree to the ICCD Freelance Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
                    </p>
                    )
                    }
                </div>
            </div>
        </div>

    )
}

export default SignIn_modal1