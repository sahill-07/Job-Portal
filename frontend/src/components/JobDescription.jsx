// import React, { useEffect, useState } from 'react';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const JobDescription = () => {
//     const { singleJob } = useSelector(store => store.job);
//     const { user } = useSelector(store => store.auth);
//     const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

//             if (res.data.success) {
//                 setIsApplied(true); // Update the local state
//                 const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
//                 dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     };

//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchSingleJob();
//     }, [jobId, dispatch, user?._id]);

//     return (
//         <div className='max-w-7xl mx-auto my-10 px-4'>
//             <div className='flex flex-col sm:flex-row items-center justify-between bg-teal-50 shadow-md rounded-lg p-6'>
//                 <div className='flex-1'>
//                     <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title}</h1>
//                     <div className='flex flex-wrap items-center gap-2 mt-4'>
//                         <Badge className='text-blue-700 text-lg font-semibold bg-blue-200 rounded-full px-3 py-1'>{singleJob?.position} Positions</Badge>
//                         <Badge className='text-[#F83002] text-lg bg-red-200 rounded-full px-3 py-1 font-semibold'>{singleJob?.jobType}</Badge>
//                         <Badge className='text-[#7209b7] bg-purple-200 text-lg font-semibold rounded-full px-3 py-1'>{singleJob?.salary} LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                     onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg px-4 py-2 mt-4 sm:mt-0 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] transition duration-200'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 mb-3 border-b-gray-300 py-4 text-3xl font-bold mt-6'>Job Description</h1>
//             <div className='hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 px-1 py-[0.1rem] shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]'>
//                 <div className='my-1 shadow-md rounded-lg bg-white p-4 sm:p-6 text-xl font-medium'>
//                     <h1 className='font-bold my-2'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                     <h1 className='font-bold my-2'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                     <h1 className='font-bold my-2'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                     <h1 className='font-bold my-2'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
//                     <h1 className='font-bold my-2'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
//                     <h1 className='font-bold my-2'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                     <h1 className='font-bold my-2'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default JobDescription;


import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <Button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className='mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'
            >
                Back
            </Button>
            <div className='flex flex-col sm:flex-row items-center justify-between bg-teal-50 shadow-md rounded-lg p-6'>
                <div className='flex-1'>
                    <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 text-lg font-semibold bg-blue-200 rounded-full px-3 py-1'>{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] text-lg bg-red-200 rounded-full px-3 py-1 font-semibold'>{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] bg-purple-200 text-lg font-semibold rounded-full px-3 py-1'>{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-4 py-2 mt-4 sm:mt-0 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] transition duration-200'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 mb-3 border-b-gray-300 py-4 text-3xl font-bold mt-6'>Job Description</h1>
            <div className='hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 px-1 py-[0.1rem] shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]'>
                <div className='my-1 shadow-md rounded-lg bg-white p-4 sm:p-6 text-xl font-medium'>
                    <h1 className='font-bold my-2'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-2'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-2'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-2'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                    <h1 className='font-bold my-2'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-2'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-2'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    );
}

export default JobDescription;
