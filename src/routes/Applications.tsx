import ApplicationsList from "@/components/dashboard/ApplicationsList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApplications, updateApplication, deleteApplication } from "@/lib/api";

export default function Applications() {
  const queryClient = useQueryClient();
  const { data: applications = [] } = useQuery({ queryKey: ["applications"], queryFn: fetchApplications });
  const updateAppMutation = useMutation({
    mutationFn: ({ id, data }) => updateApplication(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
  const deleteAppMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
  return (
    <ApplicationsList
      applications={applications}
      onUpdate={(id, updates) => updateAppMutation.mutate({ id: Number(id), data: updates })}
      onDelete={id => deleteAppMutation.mutate(Number(id))}
    />
  );
} 