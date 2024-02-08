import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

export default function useAuth() {
    const { data: user } = useLoadUserQuery({})
    if (user) {
        return true;
    } else {
        return false;
    }
}

