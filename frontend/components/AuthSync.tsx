import { useAuthCallback } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Sentry from "@sentry/react-native";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;

      syncUser(undefined, {
        onSuccess: (data) => {
          console.log("User Synced with backend", data.name);
          Sentry.logger.info(Sentry.logger.fmt`User synced with backend: ${data._id}`, {
            userId:user.id,
            userName: data.name
          })
        },
        onError: (error) => {
          console.log("Syncing user with backend failed", error);
          Sentry.logger.error("Failed to sync user with backend", {
            userId:user.id,
            error: error instanceof Error ? error.message: String(error)
          })
        },
      });
    }
    if (!isSignedIn) {
        hasSynced.current = false; // reset sync status when user signs out
    }
  }, [isSignedIn, user, syncUser]);
  return null;
};

export default AuthSync;
