import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import backgroundd from "../../assets/client_dashboard/Group.png";
import Select from "react-select";
// import RichTextEditor from "./text_editor";
import { useAddJob } from "../../../api/client/job";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../button";
import { oicCountries } from "../../../data/oic_contries";
import { contactFormDchema } from "../formSchema/schema";
import { memo } from "react";
import Input from "../input";

const locationOptions = oicCountries.map(item => ({
    value: item.country,
    label: item.country
}));


function ContactForm() {

    const { id } = useParams()
    const navigate = useNavigate();
    const pathName = useLocation().pathname
    const { addjob, isSuccess, isPending, isError, error } = useAddJob()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(contactFormDchema),
        defaultValues: {
            name: "",
            contactNumber: "",
            designation: "",
            address: "",
            country: "",
            city: "",
            organization: "",
            email: "",
            linkedInProfile: "",
            website: "",
        },
    });

    const selectedCountry = useWatch({
        control,
        name: "country",
    });

    const findCity = selectedCountry ?
        oicCountries.find(item => item.country === selectedCountry)
        : []

    const citiesoption = findCity.cities ? findCity.cities.map(item => ({
        value: item,
        label: item
    })) : [];

    const onSubmit = (data) => {
        if (pathName.includes('edit-job')) {
            editJob(data)
        } else {
            addjob(data)

        }
        navigate('/client/jobs')

    };

    return (
        <div className="bg-fixed bg-cover bg-center" >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >
                {/* Section 2 - Job Basics */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold flex items-center space-x-3">
                            <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                1
                            </span>
                            <span>Personal Information</span>
                        </h2>
                        {/* <p className="text-gray-600 mt-4">
                            We share one job title with the employer to introduce you as a candidate.
                        </p> */}
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-semibold mb-1">
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

                        {/* Contact Number */}
                        <div>
                            <label className="block text-sm font-medium font-semibold  text-gray-700 mb-1">
                                Contact Number
                            </label>
                            <Controller
                                name="contactNumber"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.contactNumber}
                                        placeholder="Enter Contact Number"
                                    />
                                )}
                            />
                            {errors.contactNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
                            )}
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                Designation
                            </label>
                            <Controller
                                name="designation"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.designation}
                                        placeholder="Enter Designation"
                                    />
                                )}
                            />
                            {errors.designation && (
                                <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                Address
                            </label>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.address}
                                        placeholder="Enter Address"
                                    />
                                )}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                Country
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={locationOptions}
                                        value={locationOptions.find(opt => opt.value === field.value) || null}
                                        onChange={(selected) => field.onChange(selected?.value)}
                                        placeholder="Select a location"
                                    />
                                )}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                            )}
                        </div>

                        {/* Cities */}
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                City
                            </label>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={citiesoption}
                                        value={citiesoption.find(opt => opt.value === field.value) || null}
                                        onChange={(selected) => field.onChange(selected?.value)}
                                        placeholder={
                                            selectedCountry
                                                ? "Select a city"
                                                : "Please select a country first"
                                        }
                                        isDisabled={!selectedCountry}
                                    />
                                )}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 2 - Job Type */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold  flex items-center space-x-3">
                            <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                2
                            </span>
                            <span>Contact Information</span>
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                Organization Name
                            </label>
                            <Controller
                                name="organization"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.organization}
                                        placeholder="Enter Organization"
                                    />
                                )}
                            />
                            {errors.organization && (
                                <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.email}
                                        placeholder="Enter email"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                LinkedIn Profile
                            </label>
                            <Controller
                                name="linkedInProfile"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.linkedInProfile}
                                        placeholder="Enter linkedIn Profile"
                                    />
                                )}
                            />
                            {errors.linkedInProfile && (
                                <p className="text-red-500 text-sm mt-1">{errors.linkedInProfile.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-semibold text-gray-700 mb-1">
                                Website
                            </label>
                            <Controller
                                name="website"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        field={field}
                                        error={errors.website}
                                        placeholder="Enter website"
                                    />
                                )}
                            />
                            {errors.website && (
                                <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
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
export default memo(ContactForm);
