
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, ExternalLink, Calendar, DollarSign, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interview" | "rejected" | "offer" | "accepted";
  dateApplied: string;
  salary?: string;
  notes?: string;
  jobUrl?: string;
  pdfFile?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

interface ApplicationsListProps {
  applications: JobApplication[];
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
  onDelete: (id: string) => void;
}

const ApplicationsList = ({ applications, onUpdate, onDelete }: ApplicationsListProps) => {
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const filteredApplications = applications.filter(app => 
    filter === "all" || app.status === filter
  );

  const handleStatusUpdate = (id: string, newStatus: string) => {
    onUpdate(id, { status: newStatus as JobApplication["status"] });
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const handleDelete = (id: string, company: string) => {
    if (confirm(`Are you sure you want to delete the application to ${company}?`)) {
      onDelete(id);
      toast({
        title: "Application Deleted",
        description: `Removed application to ${company}`,
      });
    }
  };

  const handlePdfDownload = (pdfFile: JobApplication['pdfFile'], company: string) => {
    if (pdfFile) {
      const link = document.createElement('a');
      link.href = pdfFile.url;
      link.download = `${company}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading resume for ${company}`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "interview": return "bg-yellow-100 text-yellow-800";
      case "offer": return "bg-green-100 text-green-800";
      case "accepted": return "bg-green-200 text-green-900";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Applications</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No applications found.</p>
            <p className="text-sm text-gray-400">
              {filter === "all" ? "Start by adding your first job application!" : `No applications with status: ${filter}`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{app.position}</h3>
                    <p className="text-lg text-gray-600">{app.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={app.status} onValueChange={(value) => handleStatusUpdate(app.id, value)}>
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(app.id, app.company)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: {new Date(app.dateApplied).toLocaleDateString()}</span>
                  </div>
                  {app.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{app.salary}</span>
                    </div>
                  )}
                  {app.jobUrl && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <a 
                        href={app.jobUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Job Posting
                      </a>
                    </div>
                  )}
                  {app.pdfFile && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <button
                        onClick={() => handlePdfDownload(app.pdfFile, app.company)}
                        className="text-green-600 hover:underline flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        {app.pdfFile.name}
                      </button>
                    </div>
                  )}
                </div>

                {app.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{app.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;
