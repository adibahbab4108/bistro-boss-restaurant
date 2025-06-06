import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic =useAxiosPublic();
    const navigate =useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn().then(res => {
            const userInfo={
                name:res.user?.displayName,
                email:res.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                navigate('/')
            })
        })
    }
    return (
        <div className="p-8">
            <div className="divider"> OR</div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle />
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;