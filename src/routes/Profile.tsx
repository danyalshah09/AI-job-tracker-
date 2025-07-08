import ProfileForm from "@/components/dashboard/ProfileForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, updateUser } from "@/lib/api";

export default function Profile() {
  const queryClient = useQueryClient();
  const { data: profile = {} } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
  return (
    <ProfileForm
      profile={profile}
      onUpdate={data => updateUserMutation.mutate(data)}
    />
  );
} 