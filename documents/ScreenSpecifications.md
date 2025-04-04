# Peermall 화면 명세서 및 스토리보드

**Version 1.0**

## 1. 사이트맵 (Sitemap)

다음은 현재 Peermall 프론트엔드 프로토타입의 라우팅 구조 기반 사이트맵입니다.

-   **Main Layout Routes (공통 네비게이션/푸터 적용):**
    -   `/` (메인 페이지)
    -   `/login` (로그인 페이지)
    -   `/qr-generator` (QR 코드 생성기 페이지)
    -   `/peermall-list` (피어몰 목록 페이지)
    -   `/customer-service` (고객센터 페이지)
    -   `/community` (커뮤니티 페이지 - 포럼 기본)
        -   `/community/post/:postId` (커뮤니티 게시글 상세 페이지)
    -   `/site-integration` (사이트 통합 안내 페이지)
-   **Shop Routes (개별 상점 레이아웃 적용):**
    -   `/shop/:shopUrl/home` (상점 홈)
    -   `/shop/:shopUrl/products` (상점 상품 목록)
    -   `/shop/:shopUrl/qrcodes` (상점 QR 코드 목록)
    -   `/shop/:shopUrl/community` (상점 커뮤니티)
        -   `/shop/:shopUrl/community/post/:postId` (상점 커뮤니티 게시글 상세)
    -   `/shop/:shopUrl/support` (상점 고객지원)
    -   `/shop/:shopUrl/about` (상점 소개)
    -   `/shop/:shopUrl/service` (상점 서비스 안내)
    -   `/shop/:shopUrl/product/:productId` (상점 상품 상세)
    -   `/shop/:shopUrl/admin` (상점 관리자 페이지)
    -   *(기타 약관, FAQ 등 정적 페이지 라우팅 존재)*
-   **Other Routes:**
    -   `*` (404 Not Found 페이지)
    -   *(라우팅 미정의 페이지: Personal Lounge, Lounge Admin, QR Code List 등)*

## 2. 화면 명세 (Screen Specifications)

각 주요 화면의 목적과 포함될 내용을 기술합니다.

### 2.1 Main Layout Pages

#### 2.1.1 `/` (메인 페이지 - `Index.tsx`)

-   **목적**: 서비스 소개, 핵심 기능 안내, 사용자 유입 유도.
-   **주요 내용**:
    -   히어로 섹션: 서비스 슬로건, 설명, 주요 기능 바로가기 버튼.
    -   간단 QR 코드 생성기 (URL 입력).
    -   주요 기능 소개 섹션 (피어몰 생성, QR 코드, 인증, 커뮤니티 등).
    -   피어몰 스토리, 비전/미션, 가치 소개 섹션.
    -   문의하기 섹션.
    -   공통 네비게이션 및 푸터.

#### 2.1.2 `/login` (로그인 페이지 - `Login.tsx`)

-   **목적**: 사용자 인증 처리.
-   **주요 내용**:
    -   로그인 폼 (현재 이메일 입력 및 가상 인증 방식).
    -   이메일 입력 필드, 인증 요청 버튼.
    -   (향후) 소셜 로그인 버튼 등 추가 가능.
    -   공통 네비게이션 및 푸터.

#### 2.1.3 `/qr-generator` (QR 코드 생성기 - `QRCodeGenerator.tsx` + `QRCodeGeneratorForm.tsx`)

-   **목적**: 다양한 타입의 정적/동적 QR 코드 생성 및 관리.
-   **주요 내용**:
    -   QR 코드 타입 선택 버튼 목록 (URL, 텍스트, 이메일, 연락처 등).
    -   선택된 타입에 따른 동적 입력 폼.
    -   정적/동적 QR 코드 선택 스위치.
    -   QR 코드 이름 입력 필드.
    -   생성된 QR 코드 미리보기 영역.
    -   QR 코드 저장 버튼 (로컬 스토리지 연동).
    -   QR 코드 이미지 다운로드 버튼.
    -   저장된 QR 코드 목록 표시 영역.
    -   공통 네비게이션 및 푸터.

#### 2.1.4 `/community` (커뮤니티 페이지 - `Community.tsx`)

-   **목적**: 사용자 간 소통 및 정보 공유 허브.
-   **주요 내용**:
    -   페이지 제목 및 설명.
    -   탭 네비게이션 (포럼, 그룹 채팅, 음성 채팅, 화상 채팅).
    -   선택된 탭에 따른 콘텐츠 영역 표시:
        -   **포럼 탭 (`ForumPage.tsx`)**:
            -   게시글 목록 테이블 (제목, 작성자, 작성일, 답변/조회수, 관리 버튼).
            -   게시글 제목 클릭 시 상세 페이지 이동 링크.
            -   새 글 작성 버튼 (모달 트리거).
            -   카테고리 필터 버튼.
            -   페이지네이션 컨트롤.
            -   게시글 작성/수정 모달 (`PostFormModal.tsx`) - 리치 텍스트 에디터 포함.
            -   게시글 삭제 확인 다이얼로그.
            -   인기 토픽 / 활발한 사용자 섹션 (현재 샘플 데이터 기반).
        -   **채팅 탭 (`GroupChatPage.tsx`)**:
            -   채팅방 목록 사이드바.
            -   메인 채팅/통화 영역 (텍스트 메시지 또는 참여자 그리드).
            -   메시지 입력 영역 (텍스트 채팅 시).
            -   채팅 헤더 (참여자 수, 통화 컨트롤 등).
            -   *(실시간 기능은 미구현)*
    -   공통 네비게이션 및 푸터.

#### 2.1.5 `/community/post/:postId` (커뮤니티 게시글 상세 - `ForumPostDetail.tsx`)

-   **목적**: 개별 커뮤니티 게시글의 전체 내용 조회 및 관리.
-   **주요 내용**:
    -   '뒤로 가기' 버튼 (커뮤니티 목록 페이지로 이동).
    -   게시글 제목, 작성자, 작성일 표시 헤더.
    -   수정 / 삭제 버튼 (모달 및 확인 다이얼로그 트리거).
    -   게시글 본문 내용 표시 (HTML 렌더링 - `prose` 스타일 적용).
    -   수정 모달 (`PostFormModal.tsx`) 연동.
    -   삭제 확인 다이얼로그 연동.
    -   공통 네비게이션 및 푸터.

#### 2.1.6 (기타 페이지 - `/peermall-list`, `/customer-service`, `/site-integration`)

-   **목적**: 각 기능에 대한 정보 제공 또는 UI 표시.
-   **주요 내용**: 현재 대부분 placeholder 또는 기본 UI만 구현됨. SRS의 기능 요구사항에 따라 구체화 필요.
    -   `/peermall-list`: 피어몰 목록 표시, 검색/필터 기능 예상.
    -   `/customer-service`: FAQ, 문의하기 폼, 1:1 상담 연결 기능 예상.
    -   `/site-integration`: Peermall 기능 외부 사이트 연동 가이드 또는 도구 제공 예상.
    -   공통 네비게이션 및 푸터.

### 2.2 Shop Pages

#### 2.2.1 `/shop/:shopUrl/...` (상점 페이지 - `ShopTemplate.tsx` 기반)

-   **목적**: 개별 피어몰(상점)의 정보, 상품, 커뮤니티 등 표시 및 관리.
-   **주요 내용**:
    -   상점별 헤더 (`ShopHeader.tsx`) 및 푸터 (`ShopFooter.tsx`).
    -   상점 히어로 섹션 (`ShopHero.tsx`).
    -   탭 기반 콘텐츠 영역 (`renderContent` 함수):
        -   **상품 및 링크 탭**: 상품 목록 (`ProductItem`), 카테고리 필터, 상품 등록 버튼 (모달 트리거).
        -   **QR 코드 탭**: 상품별 QR 코드 목록 (`QRCodeDisplay`).
        -   **커뮤니티 탭**: 상점별 커뮤니티 (`ForumPage`, `GroupChatPage` - `shopUrl` 전달됨).
        -   **고객지원 탭**: FAQ, 문의 정보 등.
    -   상품 상세 페이지 (`ProductDetailPage.tsx` - productId 존재 시 렌더링).
    -   소개 페이지 (`AboutPage.tsx` - `page='about'` 시 렌더링).
    -   서비스 페이지 (`ServicePage.tsx` - `page='service'` 시 렌더링).
    -   사이드 광고 (`SideAdvertisement.tsx`).
    -   상품 등록 모달 (`ProductRegistrationModal.tsx`).
    -   *(데이터는 현재 로컬 스토리지 기반)*

#### 2.2.2 `/shop/:shopUrl/admin` (상점 관리자 페이지 - `ShopAdmin.tsx`)

-   **목적**: 상점 주인이 자신의 피어몰 설정을 관리.
-   **주요 내용**:
    -   관리자용 헤더 (`AdminHeader.tsx`).
    -   사이드바 네비게이션 (`AdminSidebar.tsx`).
    -   탭 기반 설정 콘텐츠 영역 (`AdminTabContent.tsx`):
        -   기본 정보 (`BasicInfoSettingsTab.tsx`)
        -   로고/파비콘 (`LogoSettingsTab.tsx`, `FaviconSettingsTab.tsx`)
        -   히어로 섹션 (`HeroSettingsTab.tsx`)
        -   광고 관리 (`AdManagementTab.tsx`)
        -   레이아웃 (`LayoutManagementTab.tsx`)
        -   테마 (`ThemeSettingsTab.tsx`)
        -   푸터 (`FooterSettingsTab.tsx`)
        -   스토리지 (`StorageManagementTab.tsx`)
    -   *(설정 저장 로직은 현재 로컬 스토리지 기반)*

### 2.3 Other Pages

#### 2.3.1 `*` (Not Found 페이지 - `NotFound.tsx`)

-   **목적**: 유효하지 않은 URL 접근 시 사용자 안내.
-   **주요 내용**: "페이지를 찾을 수 없습니다" 메시지, 홈으로 돌아가기 링크.

#### 2.3.2 (라우팅 미정의 페이지)

-   `/personal-lounge`, `/lounge-admin`, `/qr-code-list` 등은 현재 `App.tsx`에 라우팅이 정의되지 않았거나 다른 방식으로 접근될 수 있음. 명세 및 구현 필요.

## 3. 스토리보드 (Storyboard - 주요 흐름 예시)

*(이 섹션은 각 화면 간의 사용자 이동 흐름을 시각적으로 또는 텍스트로 설명합니다. 필요에 따라 다이어그램 도구 사용 가능)*

**예시 1: 신규 사용자의 포럼 글 작성**

1.  사용자가 메인 페이지(`/`) 접속.
2.  네비게이션 바에서 '커뮤니티' 클릭 → `/community` 이동.
3.  `ForumPage` 컴포넌트 렌더링 (포럼 탭 기본 활성화).
4.  '새 글 작성하기' 버튼 클릭.
5.  `PostFormModal` 열림.
6.  사용자가 제목과 내용을 리치 텍스트 에디터로 입력.
7.  '저장하기' 버튼 클릭.
8.  `handleSavePost` 함수 실행 → 새 글 데이터 생성 및 `posts` 상태 업데이트 → 로컬 스토리지 저장.
9.  모달 닫힘.
10. `ForumPage` 리렌더링되어 새 글이 목록 상단에 표시됨.

**예시 2: 상점 주인의 커뮤니티 글 수정**

1.  상점 주인이 자신의 상점 페이지 접속 (`/shop/my-shop/home`).
2.  상점 내 '커뮤니티' 탭 클릭.
3.  `ShopTemplate` 내에서 `ForumPage` 렌더링 (`shopUrl='my-shop'` 전달됨).
4.  수정할 게시글의 '수정' 버튼 클릭.
5.  `PostFormModal` 열림 (기존 데이터 로드됨).
6.  사용자가 내용 수정.
7.  '수정하기' 버튼 클릭.
8.  `handleSavePost` 함수 실행 → 해당 글 데이터 업데이트 및 `posts` 상태 업데이트 → 로컬 스토리지 저장.
9.  모달 닫힘.
10. `ForumPage` 리렌더링되어 수정된 내용 확인 가능.
11. 사용자가 수정된 글 제목 클릭 → `/shop/my-shop/community/post/postId` 로 이동.
12. `ForumPostDetail` 페이지 렌더링, 수정된 내용 표시.

*(추가적인 주요 흐름에 대한 스토리보드를 필요에 따라 작성)*
