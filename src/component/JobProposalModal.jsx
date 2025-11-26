import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, Upload, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {  useApplyJob} from '../../api/client/job'; 

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  experience: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Cannot be negative')
    .required('Experience is required'),
  files: yup
    .mixed()
    .test('fileExists', 'Please upload your CV', (value) => value?.length > 0)
    .test('fileType', 'Only PDF or DOCX allowed', (value) => {
      if (!value?.[0]) return false;
      return [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(value[0].type);
    }),
});

const JobProposalModal = ({ onClose, data, freelancerData }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const { firstName, lastName, id: freelancerId, email } = freelancerData || {};
  const clientID = data?.[0]?.clientID;
  const projectID = data?.[0]?.id;

  const { pathname } = useLocation(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      email: email || '',
    },
  });

  const { submitJob } = useApplyJob();

  const files = watch('files');

  useEffect(() => {
    setFileUploaded(files?.length > 0);
  }, [files]);

  const onSubmit = (data) => {
    const updateData = {
      ...data,
      projectId: projectID,
      clientId: clientID,
      freelancerId: freelancerId,
    };

    const formData = new FormData();
    for (const key in updateData) {
      if (key === 'files') {
        formData.append('files', updateData.files[0]);
      } else if (Array.isArray(updateData[key])) {
        formData.append(key, JSON.stringify(updateData[key]));
      } else {
        formData.append(key, updateData[key]);
      }
    }

    if (pathname.includes('manage-jobs')) {
      submitJob(formData);
    } else {
      submitProposals(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-sm p-4 ">
      <div className="bg-white w-full max-w-xl h-[95vh] overflow-y-scroll rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#01AEAD] to-[#05929c] px-6 py-5 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Details</h1>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Full Name</label>
            <input
              type="text"
              {...register('name')}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#01AEAD]/20 ${
                errors.name
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus:border-[#01AEAD] bg-gray-50'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Email Address</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#01AEAD]/20 ${
                errors.email
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus:border-[#01AEAD] bg-gray-50'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>}
          </div>

          {/* Experience Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Years of Experience (In years)</label>
            <input
              type="number"
              {...register('experience')}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#01AEAD]/20 ${
                errors.experience
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus:border-[#01AEAD] bg-gray-50'
              }`}
              placeholder="0"
            />
            {errors.experience && (
              <p className="text-sm text-red-500 font-medium">{errors.experience.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Upload Your CV</label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer hover:border-[#01AEAD] ${
                fileUploaded
                  ? 'border-green-400 bg-green-50'
                  : errors.files
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-[#01AEAD]/5'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                {...register('files')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2">
                {fileUploaded ? (
                  <>
                    <CheckCircle size={32} className="mx-auto text-green-500" />
                    <p className="text-sm font-medium text-green-700">CV uploaded successfully</p>
                  </>
                ) : (
                  <>
                    <Upload
                      size={32}
                      className={`mx-auto ${errors.files ? 'text-red-400' : 'text-gray-400'}`}
                    />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF or DOCX only</p>
                  </>
                )}
              </div>
            </div>
            {errors.files && <p className="text-sm text-red-500 font-medium">{errors.files.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#01AEAD] to-[#05929c] text-white font-semibold rounded-lg hover:shadow-lg hover:from-[#05929c] hover:to-[#047580] transition-all active:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobProposalModal;
