import React, { useState } from 'react';
import ProgressBar from './signup-process/ProgressBar';
import AccountStep from './signup-process/CreateAccount';
import ConnectorStep from './signup-process/Connectors';
import CasesStep from './signup-process/Cases';
import InviteStep from './signup-process/Invite';
import logo from '../media/logo.png';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { createAccountSchema } from '../Utils/validations';
import { createAccount, getUserDetails } from '../api/authCrud';

const SignupProcess = () => {
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialValues = {
        fullName: '',
        title: '',
        department: '',
        companyName: '',
        companyEmail: '',
        phoneNumber: '',
        companySize: '',
        industry: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: createAccountSchema,
        onSubmit: async (values, { setSubmitting }) => {
            console.log("values ??", values)
            const { fullName, title, department, companyName, companyEmail, phoneNumber, companySize, industry } = values;
            const data = {
                full_name: fullName,
                title: title,
                department: department,
                org_name: companyName,
                email: companyEmail,
                phone_number: phoneNumber,
                company_size: companySize,
                industry: industry
            };

            setIsSubmitting(true);
            try {
                const res = await createAccount(data);
                const userDetails = await getUserDetails(res.data.user.id);
                localStorage.setItem("userDetails", JSON.stringify(userDetails.data));
                setIsSubmitting(false);
                goToNextStep(); // Move to the next step after successful submission
            } catch (err) {
                console.log(err);
                setIsSubmitting(false);
            }
        },
    });

    const steps = [
        { title: 'Account', component: <AccountStep formik={formik} /> },
        { title: 'Connectors', component: <ConnectorStep activeStep={activeStep} setActiveStep={setActiveStep} /> },
        { title: 'Cases', component: <CasesStep activeStep={activeStep} setActiveStep={setActiveStep} /> },
        { title: 'Invite', component: <InviteStep /> }
    ];

    const goToNextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleNextButtonClick = (e) => {
        if (activeStep === 0) {
            formik.handleSubmit(e);
        } else {
            goToNextStep();
        }
    };

    return (
        <div className="flex">
            <div className="w-2/5 bg-gray-200 h-screen flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-28" />
            </div>
            <div className="w-3/5 bg-gray-100 h-screen">
                {/* Right Section */}
                <div className="bg-white px-8 py-6 h-full">
                    {/* Common Horizontal Progress Bar */}
                    <ProgressBar steps={steps} activeStep={activeStep} />
                    {/* Display the content of the current step */}
                    {steps[activeStep].component}
                    {/* Button container */}
                    <div className="mt-4 flex justify-center space-x-4">
                        {/* Button to move to the previous step */}
                        {activeStep > 0 && (
                            <button
                                className="bg-gray-100 hover:bg-gray-200 border-2 text-black text-xs font-normal py-1 px-4 rounded"
                                onClick={goToPreviousStep}
                            >
                                <IoIosArrowRoundBack className='mt-[1px]' />
                            </button>
                        )}
                        {/* Button to move to the next step */}
                        {activeStep < steps.length - 1 && (
                            <button
                                type='button'
                                className="flex bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-normal py-1 px-4 rounded"
                                onClick={handleNextButtonClick}
                            >
                                Next<IoIosArrowRoundForward className='mt-[3px]' />
                            </button>
                        )}
                        {/* Invite Button */}
                        {activeStep === steps.length - 1 && (
                            <button
                                className="flex bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-normal py-1 px-4 rounded"
                                onClick={() => {
                                    history.push('/dashboard')
                                }}
                            >
                                Invite<IoIosArrowRoundForward className='mt-[3px]' />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupProcess;
