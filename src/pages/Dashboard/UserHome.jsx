import useAuth from "../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth()
    return (
        <div>
            <h2 className="text-3xl">Hi, Welcome </h2>
            {
                user?.displayName ? user.displayName : 'back'
            }

        </div>

    );
};

export default UserHome;