// components/forms/FileUploadInput.tsx
"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface FileUploadInputProps {
  onFileUpload: (file: File) => Promise<string>;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  maxSizeMB?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

interface UploadState {
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  fileName?: string;
  fileSize?: number;
  error?: string;
  url?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  onFileUpload,
  onUploadComplete,
  onUploadError,
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 10,
  placeholder = "Upload file",
  className = "",
  disabled = false,
}) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    progress: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    // Check file type if accept is specified
    if (accept && accept !== "*") {
      const allowedExtensions = accept
        .split(",")
        .map((ext) => ext.trim().toLowerCase());
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      const isAllowed = allowedExtensions.some((ext) => {
        if (ext.startsWith(".")) {
          return ext === fileExtension;
        }
        // Handle MIME types
        return file.type.toLowerCase().includes(ext.toLowerCase());
      });

      if (!isAllowed) {
        return `File type not allowed. Accepted formats: ${accept}`;
      }
    }

    return null;
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState({
        status: "error",
        progress: 0,
        error: validationError,
      });
      onUploadError?.(validationError);
      return;
    }

    // Start upload
    setUploadState({
      status: "uploading",
      progress: 0,
      fileName: file.name,
      fileSize: file.size,
    });

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 20, 90),
        }));
      }, 500);

      const url = await onFileUpload(file);

      clearInterval(progressInterval);

      setUploadState({
        status: "success",
        progress: 100,
        fileName: file.name,
        fileSize: file.size,
        url,
      });

      onUploadComplete?.(url);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";

      setUploadState({
        status: "error",
        progress: 0,
        fileName: file.name,
        fileSize: file.size,
        error: errorMessage,
      });

      onUploadError?.(errorMessage);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setUploadState({
      status: "idle",
      progress: 0,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = () => {
    switch (uploadState.status) {
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Upload className="h-4 w-4" />;
    }
  };

  const getStatusColor = (): string => {
    switch (uploadState.status) {
      case "success":
        return "border-green-300 bg-green-50";
      case "error":
        return "border-red-300 bg-red-50";
      case "uploading":
        return "border-blue-300 bg-blue-50";
      default:
        return "border-gray-300 hover:border-gray-400";
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {uploadState.status === "idle" ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={disabled}
          className={`w-full h-24 border-2 border-dashed ${getStatusColor()} flex flex-col items-center justify-center gap-2 transition-colors`}
        >
          {getStatusIcon()}
          <span className="text-sm font-medium">{placeholder}</span>
          <span className="text-xs text-muted-foreground">
            Max {maxSizeMB}MB • {accept.replace(/\./g, "").toUpperCase()}
          </span>
        </Button>
      ) : (
        <div className={`w-full border-2 rounded-lg p-4 ${getStatusColor()}`}>
          {/* File Info */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <File className="h-8 w-8 text-gray-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadState.fileName}
                </p>
                {uploadState.fileSize && (
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadState.fileSize)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {uploadState.status === "success" && (
                <Badge
                  variant="secondary"
                  className="text-green-700 bg-green-100"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Uploaded
                </Badge>
              )}

              {uploadState.status === "error" && (
                <Badge variant="destructive">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Failed
                </Badge>
              )}

              {uploadState.status !== "uploading" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {uploadState.status === "uploading" && (
            <div className="space-y-2">
              <Progress value={uploadState.progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{Math.round(uploadState.progress)}%</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {uploadState.status === "error" && uploadState.error && (
            <Alert variant="destructive" className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {uploadState.error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Actions */}
          {uploadState.status === "success" && (
            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleButtonClick}
                disabled={disabled}
                className="flex-1"
              >
                <Upload className="h-3 w-3 mr-2" />
                Replace File
              </Button>

              {uploadState.url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(uploadState.url, "_blank")}
                  className="flex-1"
                >
                  <File className="h-3 w-3 mr-2" />
                  View File
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="mt-2 text-xs text-muted-foreground">
        Supported formats:{" "}
        {accept
          .split(",")
          .map((ext) => ext.trim().replace(".", "").toUpperCase())
          .join(", ")}
        {maxSizeMB && ` • Maximum size: ${maxSizeMB}MB`}
      </div>
    </div>
  );
};

export default FileUploadInput;
