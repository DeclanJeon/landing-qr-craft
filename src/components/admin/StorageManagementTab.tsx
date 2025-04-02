
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

interface StorageItem {
  id: string;
  name: string;
  description: string;
  used: number; // in kilobytes
  capacity: number | null; // in kilobytes, null if unknown
  capacityText: string;
  status: 'ok' | 'warning' | 'error' | 'inactive';
  statusText: string;
  permissionGranted?: boolean;
}

const StorageManagementTab: React.FC = () => {
  const [storageData, setStorageData] = useState<{
    localStorage: StorageItem;
    indexedDB: StorageItem;
    fileSystem: StorageItem;
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
      permissionGranted: false
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

  // Calculate local storage usage on component mount
  useEffect(() => {
    calculateLocalStorageUsage();
    estimateIndexedDBUsage();
  }, []);

  // Calculate total storage usage
  const totalUsageKB = Object.values(storageData).reduce((total, item) => total + item.used, 0);
  const totalCapacityKB = storageData.localStorage.capacity || 5 * 1024; // Use localStorage as baseline
  const usagePercentage = Math.min((totalUsageKB / totalCapacityKB) * 100, 100);

  const calculateLocalStorageUsage = () => {
    try {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key) || '';
          // Calculate approximate size in bytes, then convert to KB
          const size = (key.length + value.length) * 2; // Unicode characters are ~2 bytes
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
    }
  };

  const estimateIndexedDBUsage = async () => {
    try {
      // Try to use the navigator.storage API if available
      if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        if (estimate.usage) {
          // Convert bytes to kilobytes
          const usedKB = Math.ceil(estimate.usage / 1024);
          setStorageData(prev => ({
            ...prev,
            indexedDB: {
              ...prev.indexedDB,
              used: usedKB
            }
          }));
        }
      } else {
        // Fallback: Use a rough estimate based on known IndexedDB databases
        // This is a simplified example - in a real app you would check specific database usage
        setStorageData(prev => ({
          ...prev,
          indexedDB: {
            ...prev.indexedDB,
            used: 50 * 1024 // Default to 50MB as an example
          }
        }));
      }
    } catch (error) {
      console.error("Error estimating IndexedDB usage:", error);
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

  const updateFileSystemStatus = (permissionGranted: boolean, usedKB: number = 200 * 1024) => {
    setStorageData(prev => ({
      ...prev,
      fileSystem: {
        ...prev.fileSystem,
        permissionGranted,
        used: permissionGranted ? usedKB : 0,
        status: permissionGranted ? 'ok' : 'warning',
        statusText: permissionGranted ? '활성 (권한 있음)' : '권한 필요'
      }
    }));
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
          used: isActive ? 10 * 1024 : 0
        }
      };
    });
  };

  const clearLocalStorage = () => {
    if (window.confirm("LocalStorage의 모든 피어몰 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 브라우저 캐시/데이터 삭제 시에도 지워질 수 있습니다.")) {
      // Only clear localStorage keys that start with "peermall_"
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('peermall_') || key === 'peermallShopData' || key === 'peermall-products' || key === 'peermall-qrcodes')) {
          localStorage.removeItem(key);
        }
      }
      
      // Update the UI to reflect the changes
      calculateLocalStorageUsage();
      
      // Show success message
      alert("피어몰 관련 LocalStorage 데이터가 삭제되었습니다.");
    }
  };

  const viewLocalStorageData = () => {
    // Collect all localStorage keys related to Peermall
    const peermallData: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('peermall_') || key === 'peermallShopData' || key === 'peermall-products' || key === 'peermall-qrcodes')) {
        try {
          peermallData[key] = JSON.parse(localStorage.getItem(key) || '{}');
        } catch (e) {
          peermallData[key] = localStorage.getItem(key);
        }
      }
    }
    
    // Format and display the data
    const formattedData = JSON.stringify(peermallData, null, 2);
    const dataWindow = window.open('', '_blank');
    if (dataWindow) {
      dataWindow.document.write(`
        <html>
          <head>
            <title>피어몰 LocalStorage 데이터</title>
            <style>
              body { font-family: monospace; padding: 20px; }
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; }
            </style>
          </head>
          <body>
            <h2>피어몰 LocalStorage 데이터</h2>
            <pre>${formattedData}</pre>
          </body>
        </html>
      `);
      dataWindow.document.close();
    } else {
      alert("팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.");
    }
  };

  const requestFileSystemPermission = async () => {
    // Check if File System Access API is available
    if ('showDirectoryPicker' in window) {
      try {
        // @ts-ignore - TypeScript doesn't recognize showDirectoryPicker yet
        const dirHandle = await window.showDirectoryPicker();
        console.log("폴더 접근 권한 획득:", dirHandle.name);
        alert(`폴더 "${dirHandle.name}"에 대한 접근 권한을 얻었습니다.`);
        updateFileSystemStatus(true);
      } catch (err) {
        console.error("폴더 접근 권한 요청 중 오류 발생:", err);
        updateFileSystemStatus(false);
      }
    } else {
      alert("현재 브라우저에서는 File System Access API를 지원하지 않습니다.");
      setStorageData(prev => ({
        ...prev,
        fileSystem: {
          ...prev.fileSystem,
          status: 'error',
          statusText: '미지원 브라우저',
          permissionGranted: false
        }
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2"><Database className="inline mr-2 h-6 w-6" /> 피어몰 스토리지 관리</h2>
        <p className="text-gray-600 mb-6">내 피어몰의 데이터는 아래와 같이 로컬 환경에 분산되어 저장됩니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-500" /> 전체 사용량 요약
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden border">
              <div 
                className={`h-full ${
                  usagePercentage > 90 ? 'bg-red-500' : 
                  usagePercentage > 70 ? 'bg-yellow-500' : 
                  'bg-blue-500'
                } text-xs font-medium text-white flex items-center justify-center`}
                style={{ width: `${usagePercentage}%` }}
              >
                {usagePercentage.toFixed(1)}%
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>총 사용량: <strong>{formatBytes(totalUsageKB)}</strong></span>
              <span className="mx-2">|</span>
              <span>추정 총 용량: <strong>{formatBytes(totalCapacityKB)}</strong></span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 border-l-4 border-blue-500">
            <Info className="inline mr-2 h-4 w-4" /> 
            브라우저 및 시스템 용량은 환경에 따라 다르며, 일부는 사용자가 직접 관리해야 합니다. 캐시 삭제 시 일부 데이터가 손실될 수 있습니다.
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-6 mb-4 flex items-center">
        <Boxes className="mr-2 h-5 w-5" /> 스토리지 유형별 상세 정보
      </h3>

      {/* LocalStorage Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Box className="mr-2 h-5 w-5 text-blue-500" /> {storageData.localStorage.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.localStorage.status)}`}>
              {storageData.localStorage.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{storageData.localStorage.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.localStorage.used)}</strong></span> / 
            <span> 용량: <strong>{storageData.localStorage.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={viewLocalStorageData}>데이터 보기</Button>
            <Button variant="destructive" size="sm" onClick={clearLocalStorage}>캐시 주의! 비우기</Button>
          </div>
          <div className="bg-yellow-50 p-2 text-xs text-yellow-700 rounded border-l-3 border-yellow-400">
            <FileWarning className="inline mr-1 h-3 w-3" /> 브라우저 캐시 삭제 시 데이터가 유실될 수 있습니다.
          </div>
        </CardContent>
      </Card>

      {/* IndexedDB Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Table className="mr-2 h-5 w-5 text-blue-500" /> {storageData.indexedDB.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.indexedDB.status)}`}>
              {storageData.indexedDB.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{storageData.indexedDB.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.indexedDB.used)}</strong></span> / 
            <span> 용량: <strong>{storageData.indexedDB.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => alert("IndexedDB 관리 기능은 추후 업데이트 예정입니다.")}
            >
              데이터 관리
            </Button>
          </div>
          <div className="bg-yellow-50 p-2 text-xs text-yellow-700 rounded border-l-3 border-yellow-400">
            <FileWarning className="inline mr-1 h-3 w-3" /> 디바이스 의존적이며, 백업이 없으면 손실될 수 있습니다.
          </div>
        </CardContent>
      </Card>

      {/* File System Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <FolderOpen className="mr-2 h-5 w-5 text-blue-500" /> {storageData.fileSystem.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.fileSystem.status)}`}>
              {storageData.fileSystem.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{storageData.fileSystem.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.fileSystem.used)}</strong></span> / 
            <span> 용량: <strong>{storageData.fileSystem.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={storageData.fileSystem.permissionGranted ? "outline" : "default"} 
              size="sm"
              onClick={requestFileSystemPermission}
            >
              {storageData.fileSystem.permissionGranted ? "폴더 권한 재설정" : "폴더 접근 권한 요청"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!storageData.fileSystem.permissionGranted}
              onClick={() => alert("파일 관리 기능은 추후 업데이트 예정입니다.")}
            >
              파일 관리
            </Button>
          </div>
          <div className="bg-yellow-50 p-2 text-xs text-yellow-700 rounded border-l-3 border-yellow-400">
            <UserCheck className="inline mr-1 h-3 w-3" /> 사용자의 명시적인 허용이 필요하며, 지정된 폴더 외에는 접근할 수 없습니다.
          </div>
        </CardContent>
      </Card>

      {/* IPFS Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Network className="mr-2 h-5 w-5 text-blue-500" /> {storageData.ipfs.name}
            </CardTitle>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusClass(storageData.ipfs.status)}`}>
              {storageData.ipfs.statusText}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{storageData.ipfs.description}</p>
          <div className="text-sm">
            <span>사용량: <strong>{formatBytes(storageData.ipfs.used)}</strong></span> / 
            <span> 용량: <strong>{storageData.ipfs.capacityText}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={updateIpfsStatus}>
              {storageData.ipfs.status === 'inactive' ? '설정/연결' : '연결 해제'}
            </Button>
          </div>
          <div className="bg-yellow-50 p-2 text-xs text-yellow-700 rounded border-l-3 border-yellow-400">
            <LinkIcon className="inline mr-1 h-3 w-3" /> 별도 설정 및 외부 네트워크 연결이 필요합니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageManagementTab;

// Type definition for window object with File System Access API
declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<any>;
  }
}
