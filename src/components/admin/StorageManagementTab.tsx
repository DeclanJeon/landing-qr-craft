
import React, { useState, useEffect } from 'react';
import {
  Database,
  HardDrive,
  File,
  Folder,
  Trash2,
  Upload,
  Download,
  Info
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Progress
} from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// TypeScript declarations for the File System Access API
// Using interfaces without modifiers to avoid declaration conflicts
declare global {
  // Using different names to avoid conflicts with built-in types
  interface FileSystemDirectoryHandlerAPI {
    values(): AsyncIterableIterator<FileSystemHandlerAPI>;
    name: string;
    kind: 'directory';
  }
  
  interface FileSystemFileHandlerAPI {
    name: string;
    kind: 'file';
  }
  
  type FileSystemHandlerAPI = FileSystemDirectoryHandlerAPI | FileSystemFileHandlerAPI;
  
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandlerAPI>;
  }

  interface StorageEstimate {
    quota?: number;
    usage?: number;
  }
}

const StorageManagementTab = () => {
  const [storageInfo, setStorageInfo] = useState<{ quota?: number; usage?: number }>({});
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandlerAPI | null>(null);
  const [fileCount, setFileCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [selectedDirectory, setSelectedDirectory] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    getStorageInfo();
  }, []);

  const getStorageInfo = async () => {
    try {
      if (navigator.storage && navigator.storage.estimate) {
        const estimation = await navigator.storage.estimate();
        setStorageInfo({
          quota: estimation.quota,
          usage: estimation.usage,
        });
      } else {
        console.warn("Storage estimate API not supported.");
      }
    } catch (error) {
      console.error("Error getting storage info:", error);
    }
  };

  const handleDirectorySelection = async () => {
    try {
      if (window.showDirectoryPicker) {
        const handle = await window.showDirectoryPicker();
        setDirectoryHandle(handle);
        setSelectedDirectory(handle.name);
        await countFilesAndFolders(handle);
      } else {
        console.error("File System Access API is not supported in this browser");
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Error selecting directory:", error);
      } else {
        console.log("Directory selection cancelled.");
      }
    }
  };

  const countFilesAndFolders = async (dirHandle: FileSystemDirectoryHandlerAPI) => {
    let fileCount = 0;
    let folderCount = 0;
    setIsCalculating(true);

    try {
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          fileCount++;
        } else if (entry.kind === 'directory') {
          folderCount++;
        }
      }
      setFileCount(fileCount);
      setFolderCount(folderCount);
    } catch (error) {
      console.error("Error counting files and folders:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const clearDirectorySelection = () => {
    setDirectoryHandle(null);
    setSelectedDirectory('');
    setFileCount(0);
    setFolderCount(0);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const calculateUsagePercentage = () => {
    if (!storageInfo.quota || !storageInfo.usage) return 0;
    return (storageInfo.usage / storageInfo.quota) * 100;
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Storage Management</span>
          </CardTitle>
          <CardDescription>Manage and monitor your application's storage usage.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-medium">Storage Usage</h3>
            </div>
            {storageInfo.quota && storageInfo.usage ? (
              <>
                <Progress value={calculateUsagePercentage()} />
                <div className="text-xs text-gray-500">
                  {formatBytes(storageInfo.usage)} / {formatBytes(storageInfo.quota)} ({calculateUsagePercentage().toFixed(2)}%)
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-500">Calculating storage usage...</div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-medium">Directory Access</h3>
            </div>
            {selectedDirectory ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Selected Directory: {selectedDirectory}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={clearDirectorySelection} disabled={isCalculating}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Clear Selection
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <File className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">{fileCount} Files</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">{folderCount} Folders</span>
                  </div>
                  {isCalculating && <span className="text-xs text-gray-500 animate-pulse">Calculating...</span>}
                </div>
              </>
            ) : (
              <Button onClick={handleDirectorySelection} disabled={isCalculating}>
                <Upload className="h-4 w-4 mr-2" />
                Select Directory
              </Button>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-medium">Additional Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button variant="outline" disabled>
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
              <Button variant="outline" disabled>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageManagementTab;
