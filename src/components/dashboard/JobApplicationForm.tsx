import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, X } from "lucide-react";

interface JobApplicationFormProps {
  onSubmit: (application: any) => void;
  userProfile: any;
}

const JobApplicationForm = ({ onSubmit, userProfile }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "applied" as const,
    dateApplied: new Date().toISOString().split('T')[0],
    salary: "",
    jobUrl: "",
    notes: "",
  });

  const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the application data with PDF
    const applicationData = {
      ...formData,
      pdfFile: uploadedPdf ? {
        name: uploadedPdf.name,
        size: uploadedPdf.size,
        type: uploadedPdf.type,
        url: URL.createObjectURL(uploadedPdf) // Create a temporary URL for display
      } : null
    };

    onSubmit(applicationData);
    toast({
      title: "Application Added!",
      description: `Successfully tracked your application to ${formData.company}`,
    });
    
    // Reset form
    setFormData({
      company: "",
      position: "",
      status: "applied",
      dateApplied: new Date().toISOString().split('T')[0],
      salary: "",
      jobUrl: "",
      notes: "",
    });
    setUploadedPdf(null);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPdf(file);
      toast({
        title: "PDF Uploaded",
        description: `${file.name} has been attached to your application`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file only",
        variant: "destructive",
      });
    }
  };

  const removePdf = () => {
    setUploadedPdf(null);
    // Reset the file input
    const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Job Application</CardTitle>
          <CardDescription>
            Track a new job application and save all the details including your submitted documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="e.g., Google, Microsoft, Apple"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Job Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  placeholder="e.g., Software Engineer, Product Manager"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Application Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview Scheduled</SelectItem>
                    <SelectItem value="offer">Offer Received</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateApplied">Date Applied</Label>
                <Input
                  id="dateApplied"
                  type="date"
                  value={formData.dateApplied}
                  onChange={(e) => handleChange("dateApplied", e.target.value)}
                />
              </div>
            </div>

            {/* PDF Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Resume/CV Submitted (PDF)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {!uploadedPdf ? (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="pdf-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                          Click to upload your resume/CV
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </Label>
                      <p className="text-xs text-gray-500">PDF files only, up to 10MB</p>
                    </div>
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div className="text-left">
                        <p className="font-medium text-green-900">{uploadedPdf.name}</p>
                        <p className="text-sm text-green-700">
                          {(uploadedPdf.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removePdf}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  placeholder="e.g., $80k - $120k"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobUrl">Job Posting URL</Label>
                <Input
                  id="jobUrl"
                  type="url"
                  value={formData.jobUrl}
                  onChange={(e) => handleChange("jobUrl", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes & Details</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Add any notes about the application, interview details, contacts, etc."
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Your Saved Profile Info:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Skills:</strong> {userProfile.skills.join(", ")}</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Add Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
