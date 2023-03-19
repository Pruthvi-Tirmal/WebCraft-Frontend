import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserFillSteps from './UserFillSteps'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getTracker } from '../api/userAPI';
import { useDispatch } from 'react-redux';
import { userNavigateActions } from '../redux/reducers/userNavigate';
const UserFillData = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const url = '/dashboard/create/fill';
    const dispatch = useDispatch();
    useEffect(() => {
        const getStatus = async () => {
            try {
                if (user) {
                    // get the tracker status
                    const status = await getTracker({ loggedUser: user.email });
                    // console.log(status.data);
                    if (!status) navigate(`${url}/userhome`);
                    else {
                        const { home, about, products, gallery, payment, paymentToUs, domain } = status.data;
                        const track = [home, about, products, gallery, payment, paymentToUs, domain];
                        const redirect = ["/userhome", "/userabout", "/userproducts", "/usergallery", "/userpayment", "../../payment", "../../domain-selection"];

                        // track.map((status, index) => {
                        // if (!status) {
                        // navigate(`${url}${redirect[index]}`);
                        //         return status;
                        //     }
                        //     else {
                        //         dispatch(userNavigateActions.setMark({ id: (index + 1) }));
                        //         console.log(redirect[index]);
                        //     }
                        // });

                        for (let i = 0; i < track.length; i++) {
                            if ((i === 5 && !track[i]) || (i === 6 && !track[i])) {
                                navigate(`${redirect[i]}`);
                                return;
                            }
                            if (!track[i]) {
                                navigate(`${url}${redirect[i]}`);
                                return;
                            } else {
                                // console.log(redirect[i] + (i + 1));
                                dispatch(userNavigateActions.setMark({ id: (i + 1) }));
                            }
                        }
                        // redirect
                        // to home
                        navigate("../home");

                        // const arr = ;
                        // console.log(arr);
                        // const redirect = status.data;
                        // if (redirect.home === true) {
                        //     dispatch(userNavigateActions.setMark({ id: (1) }));
                        // } if (redirect.about === true) {
                        //     dispatch(userNavigateActions.setMark({ id: (2) }));
                        // } if (redirect.products === true) {
                        //     dispatch(userNavigateActions.setMark({ id: (3) }));
                        // }
                        // if (redirect.about === false) {
                        //     navigate(`${url}/userabout`);
                        // } else if (redirect.products === false) {
                        //     navigate(`${url}/userproducts`);
                        // } else if (redirect.gallery === false) {
                        //     navigate(`${url}/usergallery`);
                        // } else if (redirect.payment === false) {
                        //     navigate(`${url}/userpayment`);
                        // }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getStatus()
    }, [user, navigate, dispatch])

    return (
        <div className='pt-2 pb-4  sm:max-w-[85%]  md:max-w-[75%] lg:max-w-[80%] max-w-[90%] flex flex-col  mx-auto mt-10 min-h-[80vh] md:mb-0 mb-20'>
            <UserFillSteps />
            <div className='mt-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserFillData