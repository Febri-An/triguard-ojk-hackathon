"use client";

import React, { useState, useCallback } from "react";
import {
  Upload,
  File,
  CheckCircle,
  AlertCircle,
  X,
  Shield,
  Code,
  FileText,
  Zap,
  Clock,
  User,
  Mail,
  Building,
} from "lucide-react";

// Note: In a real implementation, you would install and import Supabase:
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const SolidityUploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState("");

  // Form data for project details
  const [projectData, setProjectData] = useState({
    projectName: "",
    contactEmail: "",
    contactName: "",
    company: "",
    projectDescription: "",
    auditType: "basic",
    priority: "normal",
  });

  // Simulated Supabase upload function
  const uploadToSupabase = async (file: any, projectInfo: any) => {
    // In real implementation, this would be:

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `contracts/${fileName}`;

    const { data, error } = await supabase.storage
      .from("solidity-files")
      .upload(filePath, file);

    if (error) throw error;

    // Save project info to database
    const { data: projectData, error: dbError } = await supabase
      .from("audit_requests")
      .insert([
        {
          project_name: projectInfo.projectName,
          contact_email: projectInfo.contactEmail,
          contact_name: projectInfo.contactName,
          company: projectInfo.company,
          description: projectInfo.projectDescription,
          file_path: filePath,
          file_name: file.name,
          audit_type: projectInfo.auditType,
          priority: projectInfo.priority,
          status: "pending",
          created_at: new Date(),
        },
      ]);

    if (dbError) throw dbError;
    return { data, projectData };

    // Simulation for demo
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       data: { path: `contracts/${file.name}` },
    //       projectData: { id: Math.random().toString(36).substr(2, 9) },
    //     });
    //   }, 2000);
    // });
  };

  const validateSolidityFile = (file: any) => {
    const validExtensions = [".sol", ".txt"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const extension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (!validExtensions.includes(extension)) {
      return "Please upload only Solidity (.sol) files or text files (.txt)";
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    return null;
  };

  const handleDrag = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (fileList: any) => {
    const newFiles: any[] = [];
    const errors: any[] = [];

    Array.from(fileList).forEach((file: any) => {
      const validationError = validateSolidityFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        newFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          status: "ready",
        });
      }
    });

    if (errors.length > 0) {
      setError(errors.join("\n"));
    } else {
      setError("");
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: any) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Please select at least one file to upload");
      return;
    }

    if (
      !projectData.projectName ||
      !projectData.contactEmail ||
      !projectData.contactName
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError("");

    try {
      for (let i = 0; i < files.length; i++) {
        const fileData = files[i];
        setUploadProgress(((i + 1) / files.length) * 100);

        // Update file status
        setFiles((prev: any) =>
          prev.map((f: any) =>
            f.id === fileData.id ? { ...f, status: "uploading" } : f
          )
        );

        await uploadToSupabase(fileData.file, projectData);

        // Update file status to completed
        setFiles((prev: any) =>
          prev.map((f: any) =>
            f.id === fileData.id ? { ...f, status: "completed" } : f
          )
        );
      }

      setUploadComplete(true);
      setUploading(false);
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: any) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Upload Successful!
          </h2>
          <p className="text-gray-300 mb-6">
            Your Solidity files have been uploaded successfully. Our security
            experts will begin the audit process within 24 hours.
          </p>

          <div className="bg-black/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Project Details:</p>
            <p className="text-white font-semibold">
              {projectData.projectName}
            </p>
            <p className="text-gray-300">{files.length} file(s) uploaded</p>
            <p className="text-gray-300">Audit Type: {projectData.auditType}</p>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            You will receive an email confirmation at{" "}
            <strong>{projectData.contactEmail}</strong> with your audit request
            ID and next steps.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setUploadComplete(false);
                setFiles([]);
                setProjectData({
                  projectName: "",
                  contactEmail: "",
                  contactName: "",
                  company: "",
                  projectDescription: "",
                  auditType: "basic",
                  priority: "normal",
                });
              }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Upload Another Project
            </button>
            <button className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">SecureAudit</span>
            <span className="text-gray-400">/ Upload</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Upload Your Smart Contract
          </h1>
          <p className="text-xl text-gray-300">
            Submit your Solidity files for comprehensive security audit
          </p>
        </div>

        <div className="space-y-8">
          {/* Project Information */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-2" />
              Project Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={projectData.projectName}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      projectName: e.target.value,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="Enter your project name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={projectData.contactName}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      contactName: e.target.value,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={projectData.contactEmail}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      contactEmail: e.target.value,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={projectData.company}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Audit Type
                </label>
                <select
                  value={projectData.auditType}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      auditType: e.target.value,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="basic">Basic Audit ($2,500)</option>
                  <option value="professional">
                    Professional Audit ($5,000)
                  </option>
                  <option value="enterprise">Enterprise Audit (Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Priority
                </label>
                <select
                  value={projectData.priority}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="normal">Normal (3-5 days)</option>
                  <option value="high">High Priority (1-2 days, +50%)</option>
                  <option value="urgent">Urgent (24 hours, +100%)</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">
                Project Description
              </label>
              <textarea
                value={projectData.projectDescription}
                onChange={(e) =>
                  setProjectData((prev) => ({
                    ...prev,
                    projectDescription: e.target.value,
                  }))
                }
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                placeholder="Describe your project, its functionality, and any specific areas of concern..."
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Code className="w-6 h-6 mr-2" />
              Upload Solidity Files
            </h2>

            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-white/20 hover:border-white/40"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload
                className={`w-16 h-16 mx-auto mb-4 ${
                  dragActive ? "text-cyan-400" : "text-gray-400"
                }`}
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Drop your Solidity files here
              </h3>
              <p className="text-gray-400 mb-6">
                or click to browse files (.sol, .txt files up to 10MB each)
              </p>

              <input
                type="file"
                multiple
                accept=".sol,.txt"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:shadow-lg transition-all"
              >
                <FileText className="w-5 h-5 mr-2" />
                Browse Files
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Selected Files
                </h3>
                <div className="space-y-3">
                  {files.map((fileData: any) => (
                    <div
                      key={fileData.id}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <File className="w-8 h-8 text-cyan-400" />
                        <div>
                          <p className="text-white font-medium">
                            {fileData.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {formatFileSize(fileData.size)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {fileData.status === "uploading" && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-cyan-400 text-sm">
                              Uploading...
                            </span>
                          </div>
                        )}
                        {fileData.status === "completed" && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        {fileData.status === "ready" && (
                          <button
                            type="button"
                            onClick={() => removeFile(fileData.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Uploading files...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">
                    Upload Error
                  </h4>
                  <p className="text-red-300 text-sm whitespace-pre-line">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={uploading || files.length === 0}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading Files...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Submit for Audit
                </>
              )}
            </button>

            <p className="text-gray-400 text-sm mt-4">
              By submitting, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolidityUploadPage;
