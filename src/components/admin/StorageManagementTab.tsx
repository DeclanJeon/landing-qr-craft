import React, { useState, useEffect } from 'react';
import {
  Database,
  Box,
  Table,
  Network,
  Info,
  FolderOpen,
  Boxes,
  BarChart3,
  FileWarning,
  Link as LinkIcon,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast"; // Assuming use-toast is correctly set up
import { StorageItem } from '@/types/shop'; // Assuming StorageItem type path

// Type definition for window object with File System Access API
// This might be included in modern DOM typings already
declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
  }
  // Ensure FileSystemDirectoryHandle is recognized if not built-in
  interface FileSystemDirectoryHandle {
    values(): AsyncIterableIterator<FileSystemHandle>;
    name: string;
    kind: 'directory';
    // Add other methods if needed, like removeEntry, getDirectoryHandle, etc.
  }
  interface FileSystemFileHandle {
      kind: 'file';
      name: string;
      // Add other methods if needed
  }
  type FileSystemHandle = FileSystemDirectoryHandle | FileSystemFileHandle;
}


const StorageManagementTab: React.FC = () => {
  const [storageData, setStorageData] = useState<{
    localStorage: StorageItem;
    indexedDB: StorageItem;
    fileSystem: StorageItem & { dirHandle?: FileSystemDirectoryHandle | null }; // Added dirHandle
    ipfs: StorageItem;
  }>({
    localStorage: {
      id: 'localstorage',
      name: 'LocalStorage',
      description: '간단한 설정, 상품 기본 정보 등을 저장합니다. (작은 용량)',
      used: 0, // Initialize to 0, will be calculated in useEffect
      capacity: 5 * 1024, // 5MB
      capacityText: '~ 5-10 MB',
      status: 'ok',
      statusText: '활성'
    },
    indexedDB: {
      id: 'indexeddb',
      name: 'IndexedDB',
      description: '상품 목록, 주문 내역 등 구조화된 대용량 데이터를 저장합니다.',
      used: 0, // Initialize to 0, will be calculated in useEffect
      capacity: null,
      capacityText: '가변적 (수백MB+)',
      status: 'ok',
      statusText: '활성'
    },
    fileSystem: {
      id: 'filesystem',
      name: '로컬 파일 시스템',
      description: '상품 이미지, 동영상 등 초대용량 파일을 저장하기 위해 사용자가 지정한 폴더에 접근합니다.',
      used: 0,
      capacity: null,
      capacityText: '사용자 디스크 공간',
      status: 'warning',
      statusText: '권한 필요',
      permissionGranted: false,
      dirHandle: null // Initialize dirHandle
    },
    ipfs: {
      id: 'ipfs',
      name: '분산 스토리지 (예: IPFS)',
      description: '데이터 영속성과 공유를 위해 IPFS 같은 외부 분산 저장소와 연동할 수 있습니다.',
      used: 0,
      capacity: null,
      capacityText: '외부 서비스 의존',
      status: 'inactive',
      statusText: '비활성/설정 필요'
    }
  });

  // Calculate local storage usage and estimate IndexedDB on mount
  useEffect(() => {
    calculateLocalStorageUsage();
    estimateIndexedDBUsage();
  }, []);

  // Calculate total storage usage
  const totalUsageKB = Object.values(storageData).reduce((total, item) => {
      // Exclude IPFS from local total, or adjust logic as needed
      if (item.id === 'ipfs') return total;
      return total + (item.used || 0); // Ensure used is a number
  }, 0);
  const totalCapacityKB = storageData.localStorage.capacity || 5 * 1024; // Use localStorage as baseline
  const usagePercentage = totalCapacityKB > 0 ? Math.min((totalUsageKB / totalCapacityKB) * 100, 100) : 0;

  const calculateLocalStorageUsage = () => {
    try {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key) || '';
          // Calculate approximate size in bytes, then convert to KB
          // Using TextEncoder is more accurate for byte length
          const size = new TextEncoder().encode(key).length + new TextEncoder().encode(value).length;
          total += size;
        }
      }

      // Convert bytes to kilobytes
      const usedKB = Math.ceil(total / 1024);

      setStorageData(prev => ({
        ...prev,
        localStorage: {
          ...prev.localStorage,
          used: usedKB
        }
      }));
    } catch (error) {
      console.error("Error calculating localStorage usage:", error);
      // Optionally update status to 'error'
    }
  };

  const estimateIndexedDBUsage = async () => {
    try {
      // Try to use the navigator.storage API if available
      if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        // estimate.usage contains total usage (incl. Cache API, Service Workers etc.)
        // estimate.usageDetails contains usage per storage type
        const indexedDBUsageBytes = estimate.usageDetails?.indexedDB || 0;

        // Convert bytes to kilobytes
        const usedKB = Math.ceil(indexedDBUsageBytes / 1024);
        setStorageData(prev => ({
          ...prev,
          indexedDB: {
            ...prev.indexedDB,
            used: usedKB
          }
        }));

      } else {
        // Fallback: No direct way to estimate only IndexedDB without Storage API
        // Set a placeholder or indicate estimation is unavailable
        console.warn("navigator.storage.estimate() not available. Cannot estimate IndexedDB usage accurately.");
        setStorageData(prev => ({
           ...prev,
           indexedDB: {
             ...prev.indexedDB,
             used: 0, // Or null, or keep previous estimate if any
             statusText: '사용량 추정 불가',
             status: 'warning'
           }
         }));
      }
    } catch (error) {
      console.error("Error estimating IndexedDB usage:", error);
       setStorageData(prev => ({
         ...prev,
         indexedDB: {
           ...prev.indexedDB,
           used: 0, // Or null
           statusText: '오류 발생',
           status: 'error'
         }
       }));
    }
  };

  const formatBytes = (kiloBytes: number | null): string => {
    if (kiloBytes === null || kiloBytes === undefined) return "N/A";
    if (kiloBytes === 0) return "0 KB";
    if (kiloBytes < 1) return `${(kiloBytes * 1024).toFixed(1)} Bytes`;
    if (kiloBytes < 1024) return `${kiloBytes.toFixed(1)} KB`;
    const megaBytes = kiloBytes / 1024;
    if (megaBytes < 1024) return `${megaBytes.toFixed(1)} MB`;
    const gigaBytes = megaBytes / 1024;
    return `${gigaBytes.toFixed(1)} GB`;
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'ok': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const updateIpfsStatus = () => {
    setStorageData(prev => {
      const isActive = prev.ipfs.status === 'inactive';
      return {
        ...prev,
        ipfs: {
          ...prev.ipfs,
          status: isActive ? 'ok' : 'inactive',
          statusText: isActive ? '연결됨 (예시)' : '비활성/설정 필요',
          used: isActive ? 10 * 1024 : 0 // Example usage update
        }
      };
    });
  };

  const clearLocalStorage = () => {
    if (window.confirm("LocalStorage의 모든 피어몰 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 브라우저 캐시/데이터 삭제 시에도 지워질 수 있습니다.")) {
      // Clear only specific Peermall keys to avoid deleting unrelated data
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Add more specific keys or prefixes as needed
        if (key && (key.startsWith('peermall_') || key === 'peermallShopData' || key === 'peermall-products' || key === 'peermall-qrcodes')) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));

      // Update the UI to reflect the changes
      calculateLocalStorageUsage();

      toast({
        title: "데이터 삭제 완료",
        description: "피어몰 관련 LocalStorage 데이터가 삭제되었습니다.",
        variant: "default", // Use appropriate variant from your setup
      });
    }
  };

  const viewLocalStorageData = () => {
    const peermallData: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // Use the same key identification logic as clearLocalStorage
      if (key && (key.startsWith('peermall_') || key === 'peermallShopData' || key === 'peermall-products' || key === 'peermall-qrcodes')) {
        try {
          // Attempt to parse JSON, otherwise store as string
          peermallData[key] = JSON.parse(localStorage.getItem(key) || 'null');
        } catch (e) {
          peermallData[key] = localStorage.getItem(key);
        }
      }
    }

    const formattedData = JSON.stringify(peermallData, null, 2);
    const dataWindow = window.open('', '_blank');
    if (dataWindow) {
      dataWindow.document.write(`
        <html>
          <head>
            <title>피어몰 LocalStorage 데이터</title>
            <style>
              body { font-family: monospace; padding: 20px; background-color: #f8f9fa; color: #212529; }
              pre { background: #fff; padding: 15px; border-radius: 5px; border: 1px solid #dee2e6; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
              h2 { color: #0d6efd; }
            </style>
          </head>
          <body>
            <h2>피어몰 LocalStorage 데이터</h2>
            <pre>${formattedData.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre> 
          </body>
        </html>
      `);
      dataWindow.document.close();
    } else {
      toast({
        title: "팝업 차단됨",
        description: "팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const requestFileSystemPermission = async () => {
    if ('showDirectoryPicker' in window) {
      try {
        const dirHandle: FileSystemDirectoryHandle = await window.showDirectoryPicker();
        console.log("폴더 접근 권한 획득:", dirHandle.name);

        toast({
          title: "폴더 접근 권한 획득",
          description: `폴더 "${dirHandle.name}"에 대한 접근 권한을 얻었습니다.`,
          variant: "default",
        });

        // Estimate usage after getting permission (placeholder logic)
        // In a real app, you'd iterate and sum file sizes here
        const estimatedUsageKB = 200 * 1024; // Replace with actual calculation if needed

        setStorageData(prev => ({
          ...prev,
          fileSystem: {
            ...prev.fileSystem,
            permissionGranted: true,
            used: estimatedUsageKB, // Update usage based on folder content
            status: 'ok',
            statusText: '활성 (권한 있음)',
            dirHandle: dirHandle // Store the handle
          }
        }));

      } catch (err: any) {
        console.error("폴더 접근 권한 요청 중 오류 발생:", err);
        const isAbortError = err.name === 'AbortError';

        toast({
          title: isAbortError ? "권한 요청 취소됨" : "접근 권한 획득 실패",
          description: isAbortError ? "사용자가 폴더 선택을 취소했습니다." : "폴더 접근 권한을 얻지 못했습니다.",
          variant: isAbortError ? "default" : "destructive",
        });

        setStorageData(prev => ({
          ...prev,
          fileSystem: {
            ...prev.fileSystem,
            permissionGranted: false,
            used: 0,
            status: 'warning',
            statusText: '권한 필요',
            dirHandle: null // Reset the handle
          }
        }));
      }
    } else {
      toast({
        title: "미지원 브라우저",
        description: "현재 브라우저에서는 File System Access API를 지원하지 않습니다.",
        variant: "destructive",
      });
      setStorageData(prev => ({
        ...prev,
        fileSystem: {
          ...prev.fileSystem,
          status: 'error',
          statusText: '미지원 브라우저',
          permissionGranted: false,
          dirHandle: null
        }
      }));
    }
  };

  const manageFileSystemFiles = async () => {
    const dirHandle = storageData.fileSystem.dirHandle;

    if (!dirHandle) {
      toast({
        title: "오류",
        description: "폴더 핸들을 찾을 수 없습니다. 권한을 다시 요청해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      let fileListHtml = `<h2 style="color: #0d6efd;">폴더 내용: ${dirHandle.name}</h2><ul>`;
      let count = 0;

      // @ts-ignore - values() might still need ignore depending on exact TS/lib setup
      for await (const entry of dirHandle.values()) {
        const icon = entry.kind === 'directory' ? '📁' : '📄';
        fileListHtml += `<li style="margin-bottom: 5px;">${icon} ${entry.name}</li>`;
        count++;
      }

      fileListHtml += `</ul><p style="margin-top: 15px; color: #6c757d;">${count}개의 항목을 찾았습니다.</p>`;

      const dataWindow = window.open('', '_blank');
      if (dataWindow) {
        dataWindow.document.write(`
          <html>
            <head>
              <title>피어몰 파일 관리 (${dirHandle.name})</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; padding: 20px; background-color: #f8f9fa; color: #212529; }
                ul { list-style: none; padding-left: 0; }
                li { background: #fff; padding: 8px 12px; border-radius: 4px; margin-bottom: 6px; border: 1px solid #dee2e6; }
              </style>
            </head>
            <body>
              ${fileListHtml}
            </body>
          </html>
        `);
        dataWindow.document.close();
      } else {
        toast({
          title: "팝업 차단됨",
          description: "팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error("Error listing file system entries:", error);
      toast({
        title: "파일 목록 조회 실패",
        description: `폴더 내용을 읽는 중 오류가 발생했습니다: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6"> {/* Added padding */}
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center"><Database className="mr-2 h-6 w-6" /> 피어몰 스토리지 관리</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">내 피어몰의 데이터는 아래와 같이 로컬 환경에 분산되어 저장됩니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg"> {/* Adjusted size */}
            <BarChart3 className="mr-2 h-5 w-5 text-blue-500" /> 전체 사용량 요약
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            {/* Progress component usage might depend on the specific library (e.g., Shadcn UI) */}
            <Progress value={usagePercentage} className="h-4" /> {/* Adjusted height */}
            {/* Optional: Add text inside progress bar if library supports it */}
             <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
               <span>{usagePercentage.toFixed(1)}% 사용 중</span>
             </div>
             <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>총 사용량: <strong>{formatBytes(totalUsageKB)}</strong></span>
              <span className="mx-2">|</span>
              {/* Displaying localStorage capacity as the reference total here */}
              <span>참조 용량 (LocalStorage): <strong>{formatBytes(totalCapacityKB)}</strong></span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300 border-l-4 border-blue-500">
            <Info className="inline mr-2 h-4 w-4" />
            브라우저 및 시스템 용량은 환경에 따라 다르며, 일부는 사용자가 직접 관리해야 합니다. 캐시 삭제 시 일부 데이터가 손실될 수 있습니다.
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center"> {/* Increased top margin */}
        <Boxes className="mr-2 h-5 w-5" /> 스토리지 유형별 상세 정보
      </h3>

      {/* LocalStorage Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap justify-between items-center gap-2"> {/* Added gap and wrap */}
            <CardTitle className="text-lg flex items-center">
              <Box className="mr-2 h-5 w-5 text-blue-500" /> {storageData.localStorage.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.localStorage.status)}`}>
              {storageData.localStorage.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2"> {/* Added pt-2 */}
          <p className="text-sm text-gray-600 dark:text-gray-400">{storageData.localStorage.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.localStorage.used)}</strong></span> /
            <span> 용량: <strong>{storageData.localStorage.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={viewLocalStorageData}>데이터 보기</Button>
            <Button variant="destructive" size="sm" onClick={clearLocalStorage}>캐시 주의! 비우기</Button>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 text-xs text-yellow-700 dark:text-yellow-300 rounded border-l-4 border-yellow-400"> {/* Adjusted border */}
            <FileWarning className="inline mr-1 h-3 w-3" /> 브라우저 캐시 삭제 시 데이터가 유실될 수 있습니다.
          </div>
        </CardContent>
      </Card>

      {/* IndexedDB Card */}
      <Card>
         <CardHeader className="pb-2">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <CardTitle className="text-lg flex items-center">
              <Table className="mr-2 h-5 w-5 text-blue-500" /> {storageData.indexedDB.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.indexedDB.status)}`}>
              {storageData.indexedDB.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">{storageData.indexedDB.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.indexedDB.used)}</strong></span> /
            <span> 용량: <strong>{storageData.indexedDB.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast({
                  title: "기능 준비 중",
                  description: "IndexedDB 관리 기능은 추후 업데이트 예정입니다.",
                  variant: "default",
                });
              }}
            >
              데이터 관리
            </Button>
          </div>
           <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 text-xs text-yellow-700 dark:text-yellow-300 rounded border-l-4 border-yellow-400">
            <FileWarning className="inline mr-1 h-3 w-3" /> 디바이스 의존적이며, 백업이 없으면 손실될 수 있습니다.
          </div>
        </CardContent>
      </Card>

      {/* File System Card */}
      <Card>
         <CardHeader className="pb-2">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <CardTitle className="text-lg flex items-center">
              <FolderOpen className="mr-2 h-5 w-5 text-blue-500" /> {storageData.fileSystem.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.fileSystem.status)}`}>
              {storageData.fileSystem.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">{storageData.fileSystem.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.fileSystem.used)}</strong></span> /
            <span> 용량: <strong>{storageData.fileSystem.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={storageData.fileSystem.permissionGranted ? "outline" : "default"}
              size="sm"
              onClick={requestFileSystemPermission}
              disabled={storageData.fileSystem.status === 'error'} // Disable if browser not supported
            >
              {storageData.fileSystem.permissionGranted ? "폴더 권한 재설정" : "폴더 접근 권한 요청"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!storageData.fileSystem.permissionGranted || !storageData.fileSystem.dirHandle}
              onClick={manageFileSystemFiles} // Updated onClick
            >
              파일 목록 보기 {/* Changed text slightly */}
            </Button>
          </div>
           <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 text-xs text-yellow-700 dark:text-yellow-300 rounded border-l-4 border-yellow-400">
            <UserCheck className="inline mr-1 h-3 w-3" /> 사용자의 명시적인 허용이 필요하며, 지정된 폴더 외에는 접근할 수 없습니다.
          </div>
        </CardContent>
      </Card>

      {/* IPFS Card */}
      <Card>
         <CardHeader className="pb-2">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <CardTitle className="text-lg flex items-center">
              <Network className="mr-2 h-5 w-5 text-blue-500" /> {storageData.ipfs.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.ipfs.status)}`}>
              {storageData.ipfs.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">{storageData.ipfs.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.ipfs.used)}</strong></span> /
            <span> 용량: <strong>{storageData.ipfs.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={updateIpfsStatus}>
              {storageData.ipfs.status === 'inactive' ? '설정/연결 (예시)' : '연결 해제 (예시)'}
            </Button>
          </div>
           <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 text-xs text-yellow-700 dark:text-yellow-300 rounded border-l-4 border-yellow-400">
            <LinkIcon className="inline mr-1 h-3 w-3" /> 별도 설정 및 외부 네트워크 연결이 필요합니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageManagementTab;