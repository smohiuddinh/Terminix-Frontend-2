import { memo } from "react";
import Input from "../input";
import Button from "../button";
import Select from "react-select";
import { useAddJob } from "../../../api/client/job";
import { yupResolver } from "@hookform/resolvers/yup";
import { userFormDchema } from "../formSchema/schema";
import { useForm, Controller } from "react-hook-form";
import { roleOption } from "../../../data/optionData";
import { useAddUser } from "../../../api/client/admin";

function UserForm() {

    const { addUser, isSuccess, isPending, isError, error } = useAddUser()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userFormDchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        // console.log("data: ", data)  
        addUser(data)
    };

    return (
        <div className="bg-fixed bg-cover bg-center" >
            <style>{`
                /* Custom scrollbar styles */
                ::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #0d9488;
                    border-radius: 10px;
                    border: 2px solid #f1f1f1;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #0f766e;
                }

                /* Firefox scrollbar */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #0d9488 #f1f1f1;
                }
            `}</style>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 "
            >
                {/* Section 2 - Job Basics */}
                <div className="bg-white  rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 space-y-4">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm text-gray-700 font-semibold mb-1">
                                Name
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.name}
                                        placeholder="Enter Name"
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm  font-semibold  text-gray-700 mb-1">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.email}
                                        placeholder="Enter Email"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm  font-semibold  text-gray-700 mb-1">
                                Role
                            </label>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={roleOption}
                                        placeholder="Select Role"
                                        value={roleOption.find(
                                            (option) => option.value === field.value
                                        )}
                                        onChange={(selectedOption) =>
                                            field.onChange(selectedOption?.value)
                                        }
                                    />
                                )}
                            />
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm  font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.password}
                                        placeholder="Enter Password"
                                    />
                                )}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button
                        text="Submit"
                        type="submit"
                        className="w-full px-5 py-3"
                        isLoading={isPending}
                    />

                </div>
            </form>
        </div>
    );
}
export default memo(UserForm);
