import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                <h1 className='font-bold text-2xl md:text-3xl mb-4 text-gray-800 dark:text-white'>
                    Applicants ({applicants?.applications?.length || 0})
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;