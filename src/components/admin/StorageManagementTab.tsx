
import React, { useState, useEffect } from 'react';
import { Database, ChartPie, BoxesStacked, Box, TableList, FolderOpen, NetworkWired, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface StorageItem {
  used: number; // in KB
  capacityKB: number | null;
  capacityText: string;
  status: 'ok' | 'warning' | 'error' | 'inactive';
  statusText: string;
  permissionGranted?: boolean;
}

interface StorageState {
  localStorage: StorageItem;
  indexedDB: StorageItem;
  fileSystem: StorageItem & { permissionGranted: boolean };
  ipfs: StorageItem;
}

const StorageManagementTab: React.FC = () => {
  const [storageState, setStorageState] = useState<StorageState>({
    localStorage: {
      used: 150, // KB 단위
      capacityKB: 5 * 1024, // 5MB
      capacityText: "~ 5-10 MB",
      status: "ok",
      statusText: "활성"
    },
    indexedDB: {
      used: 50 * 1024, // 50MB in KB
      capacityKB: null,
      capacityText: "가변적 (수백MB+)",
      status: "ok",
      statusText: "활성"
    },
    fileSystem: {
      used: 0,
      capacityKB: null,
      capacityText: "사용자 디스크 공간",
      status: "warning",
      statusText: "권한 필요",
      permissionGranted: false
    },
    ipfs: {
      used: 0,
      capacityKB: null,
      capacityText: "외부 서비스 의존",
      status: "inactive",
      statusText: "비활성/설정 필요"
    }
  });

  useEffect(() => {
    // 실제 스토리지 상태 동기화를 위한 초기화 함수
    initializeStorageData();
  }, []);

  const initializeStorageData = () => {
    // 실제 구현에서는 여기서 브라우저 스토리지 API로 현재 사용량을 가져와 업데이트
    // 예시: localStorage 사용량 계산
    let localStorageSize = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            localStorageSize += key.length + value.length;
          }
        }
      }
      // 문자열 길이를 바이트로 변환 (대략적 계산, 정확한 계산은 더 복잡함)
      const localStorageKB = Math.ceil(localStorageSize * 2 / 1024); // UTF-16의 각 문자는 약 2바이트
      
      setStorageState(prev => ({
        ...prev,
        localStorage: {
          ...prev.localStorage,
          used: localStorageKB
        }
      }));
    } catch (error) {
      console.error("localStorage 사용량 계산 중 오류:", error);
    }

    // 다른 스토리지 유형도 유사하게 업데이트 가능
    // 예: IndexedDB, File System API 등 (이 예제에서는 구현하지 않음)
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

  const getTotalUsed = (): number => {
    return storageState.localStorage.used + 
           storageState.indexedDB.used + 
           storageState.fileSystem.used;
    // IPFS는 외부 저장소이므로 합계에서 제외
  };

  const getEstimatedCapacity = (): string => {
    const lsCapacity = storageState.localStorage.capacityKB || 5 * 1024;
    return `~ ${formatBytes(lsCapacity)} (주: LS 기준)`;
  };

  const getProgressPercentage = (): number => {
    const totalUsed = getTotalUsed();
    const lsCapacity = storageState.localStorage.capacityKB || 5 * 1024;
    return Math.min((totalUsed / lsCapacity) * 100, 100);
  };

  // LocalStorage 관리 함수
  const manageLocalStorage = () => {
    alert("LocalStorage 데이터 보기 기능은 아직 구현되지 않았습니다.");
  };

  const clearLocalStorage = () => {
    if (confirm("LocalStorage의 모든 피어몰 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 브라우저 캐시/데이터 삭제 시에도 지워질 수 있습니다.")) {
      // 실제 구현에서는 localStorage에서 피어몰 관련 데이터만 선택적으로 삭제
      // 예시 코드로 모든 localStorage 비우기 (실제 앱에서는 좀 더 선택적 접근 필요)
      // localStorage.clear();
      
      // 시뮬레이션: 사용량 0으로 업데이트
      setStorageState(prev => ({
        ...prev,
        localStorage: {
          ...prev.localStorage,
          used: 0
        }
      }));
      
      alert("LocalStorage 비우기가 시뮬레이션되었습니다. (실제 구현 필요)");
    }
  };

  // IndexedDB 관리 함수
  const manageIndexedDB = () => {
    alert("IndexedDB 관리 기능은 아직 구현되지 않았습니다.");
  };

  // 파일 시스템 관리 함수
  const requestFileSystemPermission = async () => {
    if (typeof window.showDirectoryPicker === 'function') {
      try {
        const dirHandle = await window.showDirectoryPicker();
        console.log("폴더 접근 권한 획득:", dirHandle.name);
        alert(`폴더 "${dirHandle.name}"에 대한 접근 권한을 얻었습니다.`);
        
        // 상태 업데이트
        setStorageState(prev => ({
          ...prev,
          fileSystem: {
            ...prev.fileSystem,
            permissionGranted: true,
            status: 'ok',
            statusText: '활성 (권한 있음)',
            used: 200 * 1024 // 시뮬레이션: 200MB 사용
          }
        }));
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log("사용자가 폴더 선택을 취소했습니다.");
        } else {
          console.error("폴더 접근 권한 요청 중 오류 발생:", err);
          alert("폴더 접근 권한을 얻는 중 오류가 발생했습니다.");
        }
      }
    } else {
      alert("현재 브라우저에서는 File System Access API를 지원하지 않습니다.");
      setStorageState(prev => ({
        ...prev,
        fileSystem: {
          ...prev.fileSystem,
          status: 'error',
          statusText: '미지원 브라우저'
        }
      }));
    }
  };

  const manageFileSystem = () => {
    if (!storageState.fileSystem.permissionGranted) {
      alert("먼저 폴더 접근 권한을 요청해야 합니다.");
      return;
    }
    alert("로컬 파일 관리 기능은 아직 구현되지 않았습니다. (폴더 내용 보기, 파일 삭제 등)");
  };

  // IPFS 설정 함수
  const configureIpfs = () => {
    // IPFS 상태 토글
    const newStatus = storageState.ipfs.status === 'inactive' ? 'ok' : 'inactive';
    const newStatusText = newStatus === 'ok' ? '연결됨 (예시)' : '비활성/설정 필요';
    const newUsed = newStatus === 'ok' ? 10 * 1024 : 0; // ok면 10MB, 아니면 0
    
    setStorageState(prev => ({
      ...prev,
      ipfs: {
        ...prev.ipfs,
        status: newStatus as any,
        statusText: newStatusText,
        used: newUsed
      }
    }));

    alert("IPFS 설정 기능은 아직 구현되지 않았습니다. (상태만 업데이트)");
  };

  // 상태별 스타일 클래스
  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'ok': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'inactive': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  // 진행률 바 색상
  const getProgressColor = (percent: number): string => {
    if (percent > 90) return 'bg-red-500';
    if (percent > 70) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="h-full overflow-y-auto pb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center"><Database className="h-5 w-5 mr-2 text-blue-500" /> 피어몰 스토리지 관리</h2>
      <p className="text-gray-600 mb-6">내 피어몰의 데이터는 아래와 같이 로컬 환경에 분산되어 저장됩니다.</p>

      {/* 전체 사용량 요약 */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <ChartPie className="h-5 w-5 mr-2 text-blue-500" /> 전체 사용량 요약
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div 
                  className={`h-full ${getProgressColor(getProgressPercentage())} flex items-center justify-center text-white text-xs font-medium`}
                  style={{ width: `${getProgressPercentage()}%` }}
                >
                  {getProgressPercentage().toFixed(1)}%
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-2">
                <span>총 사용량: <strong>{formatBytes(getTotalUsed())}</strong></span>
                <span className="hidden sm:inline">|</span>
                <span>추정 총 용량: <strong>{getEstimatedCapacity()}</strong></span>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-4 border-l-4 border-blue-500">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-3" />
                <p className="text-sm text-blue-700">
                  브라우저 및 시스템 용량은 환경에 따라 다르며, 일부는 사용자가 직접 관리해야 합니다. 캐시 삭제 시 일부 데이터가 손실될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 스토리지 유형별 상세 정보 */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <BoxesStacked className="h-5 w-5 mr-2 text-blue-500" /> 스토리지 유형별 상세 정보
      </h2>

      <div className="space-y-4">
        {/* LocalStorage */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <CardTitle className="flex items-center text-lg">
                <Box className="h-4 w-4 mr-2 text-blue-500" /> LocalStorage
              </CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full text-white mt-2 sm:mt-0 ${getStatusClass(storageState.localStorage.status)}`}>
                {storageState.localStorage.statusText}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">간단한 설정, 상품 기본 정보 등을 저장합니다. (작은 용량)</p>
            <div className="text-sm text-gray-700 mb-4">
              <span>사용량: <strong>{formatBytes(storageState.localStorage.used)}</strong></span>
              {" / "}
              <span>용량: <strong>{storageState.localStorage.capacityText}</strong></span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={manageLocalStorage}
              >
                데이터 보기
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={clearLocalStorage}
              >
                캐시 주의! 비우기
              </Button>
            </div>
            <div className="mt-3 text-xs p-2 bg-orange-50 border-l-2 border-orange-400 text-gray-600 rounded">
              <AlertTriangle className="h-3.5 w-3.5 inline-block text-orange-500 mr-1" />
              브라우저 캐시 삭제 시 데이터가 유실될 수 있습니다.
            </div>
          </CardContent>
        </Card>

        {/* IndexedDB */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <CardTitle className="flex items-center text-lg">
                <TableList className="h-4 w-4 mr-2 text-blue-500" /> IndexedDB
              </CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full text-white mt-2 sm:mt-0 ${getStatusClass(storageState.indexedDB.status)}`}>
                {storageState.indexedDB.statusText}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">상품 목록, 주문 내역 등 구조화된 대용량 데이터를 저장합니다.</p>
            <div className="text-sm text-gray-700 mb-4">
              <span>사용량: <strong>{formatBytes(storageState.indexedDB.used)}</strong></span>
              {" / "}
              <span>용량: <strong>{storageState.indexedDB.capacityText}</strong></span>
            </div>
            <Button 
              variant="outline" 
              onClick={manageIndexedDB}
            >
              데이터 관리
            </Button>
            <div className="mt-3 text-xs p-2 bg-orange-50 border-l-2 border-orange-400 text-gray-600 rounded">
              <AlertTriangle className="h-3.5 w-3.5 inline-block text-orange-500 mr-1" />
              디바이스 의존적이며, 백업이 없으면 손실될 수 있습니다.
            </div>
          </CardContent>
        </Card>

        {/* 로컬 파일 시스템 */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <CardTitle className="flex items-center text-lg">
                <FolderOpen className="h-4 w-4 mr-2 text-blue-500" /> 로컬 파일 시스템
              </CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full text-white mt-2 sm:mt-0 ${getStatusClass(storageState.fileSystem.status)}`}>
                {storageState.fileSystem.statusText}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">상품 이미지, 동영상 등 초대용량 파일을 저장하기 위해 사용자가 지정한 폴더에 접근합니다. (File System Access API)</p>
            <div className="text-sm text-gray-700 mb-4">
              <span>사용량: <strong>{formatBytes(storageState.fileSystem.used)}</strong></span>
              {" / "}
              <span>용량: <strong>{storageState.fileSystem.capacityText}</strong></span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant={storageState.fileSystem.permissionGranted ? "outline" : "default"}
                className="flex-1"
                onClick={requestFileSystemPermission}
              >
                {storageState.fileSystem.permissionGranted 
                  ? "폴더 권한 재설정" 
                  : "폴더 접근 권한 요청"}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                disabled={!storageState.fileSystem.permissionGranted}
                onClick={manageFileSystem}
              >
                파일 관리
              </Button>
            </div>
            <div className="mt-3 text-xs p-2 bg-orange-50 border-l-2 border-orange-400 text-gray-600 rounded">
              <AlertTriangle className="h-3.5 w-3.5 inline-block text-orange-500 mr-1" />
              사용자의 명시적인 허용이 필요하며, 지정된 폴더 외에는 접근할 수 없습니다.
            </div>
          </CardContent>
        </Card>

        {/* 분산 스토리지 */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <CardTitle className="flex items-center text-lg">
                <NetworkWired className="h-4 w-4 mr-2 text-blue-500" /> 분산 스토리지 (예: IPFS)
              </CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full text-white mt-2 sm:mt-0 ${getStatusClass(storageState.ipfs.status)}`}>
                {storageState.ipfs.statusText}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">데이터 영속성과 공유를 위해 IPFS 같은 외부 분산 저장소와 연동할 수 있습니다.</p>
            <div className="text-sm text-gray-700 mb-4">
              <span>사용량: <strong>{formatBytes(storageState.ipfs.used)}</strong></span>
              {" / "}
              <span>용량: <strong>{storageState.ipfs.capacityText}</strong></span>
            </div>
            <Button 
              variant="outline" 
              onClick={configureIpfs}
            >
              설정/연결
            </Button>
            <div className="mt-3 text-xs p-2 bg-orange-50 border-l-2 border-orange-400 text-gray-600 rounded">
              <AlertTriangle className="h-3.5 w-3.5 inline-block text-orange-500 mr-1" />
              별도 설정 및 외부 네트워크 연결이 필요합니다.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorageManagementTab;
