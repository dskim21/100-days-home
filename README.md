# 🐶 100 Days Home

> 유기견 입양 후 100일 동안의 적응 과정을 기록하고, 작은 신뢰 신호를 확인하는 반려견 적응 기록 웹앱

입양 초기 보호자가 매일 마주하는 불안과 관찰 포인트를  
단순 메모가 아니라 **감정·행동 기반 적응 기록**으로 관리하기 위해 만든 프로젝트입니다.

매일의 체크인을 통해 반려견의 상태를 기록하고,  
점수·레벨·업적·타임라인을 통해 적응 과정을 시각적으로 확인할 수 있습니다.

🔗 **Live Demo**  
https://100-days-home.vercel.app/

---

## 📌 프로젝트 개요

### Why?

유기견을 입양한 초기 보호자는 작은 행동 하나에도 많은 걱정을 하게 됩니다.

```txt
잘 적응하고 있는 걸까?
아직 불안한 걸까?
어제보다 나아진 변화가 있는 걸까?
```

기존 반려동물 기록 앱은 사진, 산책, 건강 기록 중심인 경우가 많았고,  
입양 초기의 **심리적 적응 과정**을 보호자가 꾸준히 확인하기에는 부족하다고 느꼈습니다.

### Solution

100 Days Home은 입양 후 100일을 기준으로:

```txt
매일 체크인
→ 감정·행동 태그 기록
→ 적응 점수 계산
→ 레벨 / 업적 / 타임라인 확인
```

으로 이어지는 **반려견 적응 추적 루프**를 설계했습니다.

---

## ✨ 핵심 기능

### 🐾 Dog Profile

- 반려견 이름 / 견종 / 입양일 저장
- 입양일 기준 Day 계산
- 저장된 프로필 카드 미리보기

### 📝 Daily Check-In

- 오늘의 감정 상태 선택
- 행동 태그 다중 선택
- 메모 작성
- 체크인 기록 저장

### 📷 Photo Upload

- 체크인 사진 첨부
- Cloudinary unsigned upload 기반 이미지 저장
- 업로드된 이미지 URL을 Firestore 체크인 데이터에 저장
- jpg / png / webp 형식 및 5MB 이하 파일만 허용

### 📈 Adaptation Level

선택한 행동 태그 점수를 기반으로 현재 적응 레벨 계산

```txt
Lv.1 적응 준비
→ Lv.5 가족 완성
```

### 🏆 Achievements

처음 꼬리 흔들기, 이름 반응, 산책 성공 등  
입양 초기의 의미 있는 순간을 업적으로 기록

### 💬 Rule-based Coach Message

최근 체크인 데이터를 기반으로 오늘의 적응 코치 멘트 제공

> 실제 AI API 비용 없이 MVP 검증을 위해 규칙 기반 로직으로 구현

### 📊 Timeline / Chart

- 체크인 기록 시간순 조회
- 감정 / 행동 / 메모 / 사진 확인
- Recharts 기반 점수 추이 시각화

### 📱 Responsive UI

- 모바일 하단 내비게이션
- 카드 기반 반응형 UI

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### State Management

- Zustand

### Routing

- React Router

### Visualization

- Recharts

### Authentication / Database

- Firebase Anonymous Auth
- Cloud Firestore

### Image Storage

- Cloudinary

### Deployment

- Vercel
- GitHub

### UI

- lucide-react

---

## 🏗 Architecture

```txt
User Action
    ↓
React Page
    ↓
Zustand Store
    ↓
Firebase Anonymous Auth
    ↓
Cloud Firestore

Image Upload
    ↓
Cloudinary
    ↓
Image URL
    ↓
Firestore Check-in Data
```

---

## 🚀 MVP 특징

- 무료 배포 환경 중심으로 설계
- Firebase Anonymous Auth로 로그인 UX 최소화
- Firestore Rules 기반 사용자별 데이터 분리
- Firebase Storage 유료 제약을 피하기 위해 Cloudinary로 이미지 업로드 구현
- 실제 AI API 비용 없이 규칙 기반 코치 메시지 구현
- 추후 AI 코치 / 리포트 / 보호자 가이드로 확장 가능한 구조

---

## 🧠 Technical Decisions

### 왜 Zustand를 사용했는가?

Redux 대비 보일러플레이트가 적고,  
작은 규모의 MVP에서 전역 상태와 액션을 빠르게 구성하기 적합하다고 판단했습니다.

---

### 왜 Firebase Anonymous Auth를 사용했는가?

회원가입 없이도 사용자별 데이터를 분리할 수 있고,  
입양 기록 앱의 초기 사용 허들을 낮출 수 있다고 판단했습니다.

Firestore Rules에서:

```js
request.auth.uid == userId
```

조건을 사용해 본인 문서만 읽고 쓸 수 있도록 설계했습니다.

---

### 왜 Firebase Storage 대신 Cloudinary를 사용했는가?

Firebase Storage는 현재 프로젝트 환경에서 요금제 업그레이드를 요구했습니다.

무료 MVP 조건을 유지하면서도 사진 기록 기능은 서비스 핵심 경험이라고 판단하여,  
이미지 업로드와 CDN 제공에 특화된 Cloudinary 무료 플랜을 사용했습니다.

---

### 왜 실제 AI 대신 규칙 기반 코치 메시지를 구현했는가?

실제 AI API는 비용과 서버리스 API 키 보호 구조가 필요합니다.

MVP 단계에서는 사용자가 선택한 감정과 행동 태그를 기반으로  
일관된 코칭 메시지를 제공하는 규칙 기반 로직을 먼저 구현했습니다.

추후:

```ts
generateCoachMessage()
```

부분을 실제 AI API 호출로 교체할 수 있도록 분리했습니다.

---

## 🔥 Troubleshooting

### 1. `.env` UTF-8 BOM으로 인한 Firebase API Key 누락

#### 문제

브라우저에서 다음 오류 발생

```txt
Firebase: Error (auth/invalid-api-key)
```

#### 원인

`.env` 파일 맨 앞에 UTF-8 BOM이 붙어 있었고,  
Vite가 첫 번째 환경변수인 `VITE_FIREBASE_API_KEY`를 제대로 읽지 못했습니다.

#### 해결

`.env`를 BOM 없는 UTF-8로 다시 저장하고 dev server를 재시작했습니다.

#### 배운 점

Vite 환경변수는 파일 인코딩과 서버 재시작 여부에 영향을 받는다는 점을 확인했습니다.

---

### 2. Firebase 프로젝트 ID / 앱 설정 불일치 문제

#### 문제

Firestore 요청 시 다음 오류 발생

```txt
CONSUMER_INVALID
Permission denied on resource project
```

#### 원인

Firebase Console의 프로젝트 이름과 실제 projectId를 혼동했고,  
일부 환경변수 값이 Firebase 웹앱 config와 일치하지 않았습니다.

#### 해결

Firebase Console의 SDK config 기준으로:

```txt
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

값을 다시 정리했습니다.

#### 배운 점

Firebase에서는 프로젝트 표시 이름이 아니라 SDK config의 projectId를 기준으로 설정해야 합니다.

---

### 3. Firestore Rules 권한 문제

#### 문제

Firestore 읽기/쓰기 시:

```txt
Missing or insufficient permissions
```

오류 발생

#### 원인

앱은 `users/{uid}` 문서에 접근하지만,  
Firestore Rules가 해당 경로와 인증 조건을 정확히 허용하지 않으면 요청이 거부됩니다.

#### 해결

Firestore Rules를 다음 구조로 설정했습니다.

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

#### 배운 점

Firebase Auth와 Firestore Rules는 문서 경로 설계와 함께 맞춰야 합니다.

---

### 4. Firebase Storage 요금제 제약 및 CORS 문제

#### 문제

사진 업로드 시 Firebase Storage 사용에 요금제 업그레이드가 필요했고,  
Storage 요청에서 CORS preflight 오류도 발생했습니다.

#### 원인

무료 요금제 조건에서 Firebase Storage를 바로 사용하기 어려웠고,  
Storage Rules / CORS 설정이 Firestore와 별개로 필요했습니다.

#### 해결

Firebase Storage를 제거하고 Cloudinary unsigned upload로 이미지 업로드 구조를 변경했습니다.

#### 배운 점

무료 MVP에서는 서비스별 무료 범위와 제약을 고려해 저장소를 분리하는 선택이 필요합니다.

---

### 5. Vercel 배포 환경변수 설정

#### 문제

로컬에서는 동작하지만 배포 환경에서는 Firebase / Cloudinary 설정이 누락될 수 있음

#### 원인

Vercel은 로컬 `.env` 파일을 자동으로 배포 환경변수에 등록하지 않습니다.

#### 해결

Vercel Project Settings → Environment Variables에 다음 값을 등록했습니다.

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
```

#### 배운 점

Vite 환경변수는 `VITE_` prefix가 필요하고,  
배포 플랫폼에서도 별도로 등록해야 합니다.

---

## 📦 Project Setup

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## 🌱 Future Improvements

- 실제 AI 코치 메시지 연동
- 주간 적응 리포트
- 사진 압축 / 리사이즈 최적화
- 체크인 수정 / 삭제 기능
- 다중 반려견 프로필
- 보호자용 입양 초기 가이드 콘텐츠
- PWA 지원

---

## 👩‍💻 Author

**Dasom Kim**

GitHub: https://github.com/dskim21

## 배포 링크

https://100-days-home.vercel.app/
