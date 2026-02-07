import { useApi } from "@/lib/axios";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAuthCallback = () => {
    const { apiWithAuth } = useApi(); // destructure to get the api instance

    return useMutation({
        mutationFn: async () => {
            const {data} = await apiWithAuth<User>({method: "POST", url: "/auth/callback"});
            return data;
        }
    })
}