import JobApplicationForm from "@/components/dashboard/JobApplicationForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, addApplication } from "@/lib/api";

export default function AddJob() {
  const queryClient = useQueryClient();
  const { data: profile = {} } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  const addAppMutation = useMutation({
    mutationFn: addApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
  return (
    <JobApplicationForm
      onSubmit={app => addAppMutation.mutate(app)}
      userProfile={profile}
    />
  );
} 