import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminPending } = useQuery({
        queryKey: ['isUserAdmin', user?.email], // Ensure query re-runs when user changes
        queryFn: async () => {
            if (!user) return false; // Explicitly return false if user is not defined
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin ?? false; // Ensure a boolean value is always returned
            } catch (error) {
                console.error("Error fetching admin status:", error);
                return false; // Return a fallback value to prevent errors
            }
        },
        enabled: !!user, // Prevents execution if user is undefined
    });

    return [isAdmin, isAdminPending]
};

export default useAdmin;