import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSubmitOtp } from "../../../api/client/user";
import logo from '../../assets/ICCD-01.png';
import { useEffect, useRef } from "react";

function VerifyOtp({ handleSwitch, email }) {
  const { handleOtp, isPending } = useSubmitOtp({
    onSuccess: () => handleSwitch("change-password")
  });

  const schema = yup.object({
    otp1: yup.string().required(),
    otp2: yup.string().required(),
    otp3: yup.string().required(),
    otp4: yup.string().required()
  });

  const {
    control,
    handleSubmit,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
  });

  const inputRefs = useRef([]);

  const onSubmit = (data) => {
    const fullOtp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
    handleOtp({ otp: fullOtp, email });
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="px-10 w-full mt-5 flex flex-col gap-2">
      <div className='w-full flex justify-center lg:justify-start'>
        <img src={logo} alt="Logo" className="lg:w-24 lg:h-24 object-fit" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Verification Code</h2>
      <p className="text-[#656565] text-sm">Enter the verification code we emailed to:</p>
      <p className="text-[#656565] text-sm font-bold">{email}</p>

      <div className="w-full mt-2 flex  gap-4 ">
        {[...Array(4)].map((_, index) => (
          <Controller
            key={index}
            name={`otp${index + 1}`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleInput(e, index);
                }}
                className="w-12 text-center text-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        ))}
      </div>

      <div className='flex gap-4 mt-4'>
        <button
          type="button"
          className="w-full px-4 py-2 text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] transition"
          onClick={() => handleSwitch('forgotPassword')}
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] transition"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;
