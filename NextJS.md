### NextJS

- **ECMAScript Module**

  - JavaScript 표준 모듈 시스템으로, ES6이후로 도입

  - 특징

    - 파일 단위 모듈

    - import와 export 사용

    - 정적 분석 가능

      - import와 export는 파일 로드 시점에 정적으로 분석
      - 따라서 트리 쉐이킹(사용되지 않는 코드 제거 최적화)

    - 엄격 모드(Strict Mode)

    - 비동기 로딩 지원

      - 브라우저에서는 ESM 모듈이 다음과 같이 선언되면 비동기로 로드

      - ```nextjs
        <Script type="module">
        ```

- **next.config.[ js | mjs ]**

  - 차이는 모듈 시스템인 CJS(CommonJS)와 ESM(ECMAScript Module)

- **동적 라우트**

  - NextJS에서 페이지 라우터의 경우엔 pages내에 있는 파일명대로 라우터가 생기기에
    동적 라우터를 적용하면 간단하게 됨.

  - 종류

    - 폴더 관례
    - 파일 관례

  - 타입

    - 동적 라우트 세그먼트

      - 설명: URL의 특정 부분이 동적 값을 가질 수 있도록 정의하는 기본 동적 경로입니다.

        파일 이름: `[file].js`

        URL 매칭: `/something` → `file`은 `something` 값으로 매칭됩니다.

        예시:

        - 파일: `pages/[file].js`
        - URL: `/about` → `file = "about"`

    - 모든 것을 포함하는 라우트 세그먼트

      - 설명: 여러 경로를 한 번에 잡아낼 수 있는 동적 라우트입니다.

        파일 이름: `[...file].js`

        URL 매칭: `/something/else` → `file`은 배열 형태로 `["something", "else"]`로 매칭됩니다.

        예시:

        - 파일: `pages/blog/[...file].js`
        - URL: `/blog/post/2025/january` → `file = ["post", "2025", "january"]`

    - 선택적 모든 것을 포함하는 라우트

      - 설명: 동적 라우트를 잡아내되, 경로가 비어 있는 경우에도 작동할 수 있는 라우트입니다.

        파일 이름: `[[...file]].js`

        URL 매칭:

        - `/` → `file = undefined` (경로가 비어 있을 때도 처리)
        - `/something` → `file = ["something"]`
        - `/something/else` → `file = ["something", "else"]`

        예시:

        - 파일: `pages/docs/[[...file]].js`
        - URL:
          - `/docs` → `file = undefined` (비어 있는 경로도 허용)
          - `/docs/intro` → `file = ["intro"]`
          - `/docs/guides/advanced` → `file = ["guides", "advanced"]`

- **Dynamic Routes**
  - 파일
  
    1. [slug].jsx 
  
    2. [...slug].jsx
  
    3. [[...slug].jsx]
       - 1번과 2번의 차이는 경로에 아무것도 넣지 않을 경우에 어떻게 할 것인지가 요점
       - 1번은 Error 페이지
         - isReady도 안먹힘
       - 2번은 default 페이지

- **SPA 전환 효과 (Link, useRouter.push)**

  - Link (정적 링크 처리)
    - NextJS에서 사용될 때, 뷰포트에 Link 구성 요소가 나타날 때마다 
      자동으로 백그라운드에서 링크된 경로의 코드를 미리 가져온 뒤, 클릭할 때 로드된 페이지를 보여줌. 

  - useRouter.push (동적 링크 처리)

- **redirects in next.config.js**

  - 사용 이유

    - URL 변경이 필요할 때
      - 기존 URL이 더 이상 사용되지 않거나, 새로운 URL 구조로 변경된 경우.
    - 사용자 편의 제공
      - 사용자 실수로 잘못된 URL로 접근했을 때, 올바른 URL로 안내.
    - SEO 유지
      - 기존 URL의 검색 엔진 점수를 새로운 URL로 전달하기 위해
        - permanent: true;

  - 코드

    - ```javascript
      /** @type {import('next').NextConfig} */
      const nextConfig = {
        reactStrictMode: true,
        async redirects() {
          return [
            {
              source: '/check/:slug*', // <- multi가 아니면 * 빼기
              destination: '/',
              permanent: true // <- 검색 엔진에 "이 URL은 영구적으로 이동되었습니다"라는 신호를 보냄
            }
          ]
        }
      };
      
      export default nextConfig;
      
      ```

- **Middleware**

  - redirects 이후에 실행 됨.

  - 경로: src 폴더 내부

  - 코드

    ```javascript
    import { NextResponse } from 'next/server'
    
    export function middleware(request) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    
    export const config = {
        matcher: "/admin/:slug*",
    }
    ```

    

- **NextResponse.redirect VS NextResponse.rewrite**
  - 차이
    - redirect: 클라이언트를 완전히 다른 URL로 리디렉션
    - rewriter: 서버 측에서 URL을 변경 후, 원래 요청 URL을 유지하되 변경된 URL에서 응답을 가져옴.



- **글꼴, 이미지 최적화**
  - 글꼴: next/font
    - 브라우저가 처음 폴백 또는 시스템 글꼴로 텍스트를 렌더링한 다음 로드된후 사용자 지정 글꼴로 
      변경될 때 레이아웃 전환이 발생.
    - 이로 인해 텍스트 크기, 간격 또는 레이아웃이 변경되어 주변의 요소가 이동할 수 있음.
  - 이미지: next/image
    - public에 이미지를 보관 후 사용하게 되면 다음과 같은 동작을 수동으로 수행해야 함.
      - 다양한 화면 크기에서 이미지가 반응하는지 확인해야 함.
      - 다양한 장치에 맞게 이미지 크기를 지정해야 함.
      - 이미지가 로드될 때 레이아웃이 전환되는 것을 방지해야 함.
      - 사용자 뷰포트 밖에 있는 이미지를 지연 로드 해야 함.
    - 그래서 이를 자동으로 최적화 해주는 next/image를 사용하면 편리하다.
      - 이미지가 로딩될 때 레이아웃이 자동으로 전환되는 것을 방지.
      - 작은 뷰포트를 갖춘 기기에 큰 이미지가 전송되는 것을 방지하기 위해 이미지 크기를 조절.
      - 기본적으로 이미지가 지연 로딩됨(이미지가 뷰포트에 들어오면 로드됨)
      - WebP와 같은 최신 형식으로 이미지 제공
- **usePathname**
  - usePathname 훅을 담은 변수를 출력하면, 현재 경로를 확인 할 수 있다.
  - 이를 활용하여 각 링크별 href를 받아서 버튼 효과 줄 수 있다.
- **라우터 핸들러 사용하는 이유**
  - 이유
    - 주로 안정성, 보안, 확장성, 그리고 클라이언트-서버 아키텍처의 분리와 관련됨.

  - 사용이 적합한 경우
    - 단순한 CRUD 작업이나 클라이언트 요청을 처리하는 API 작성.
    - 서버리스 환경(Vercel, AWS Lambda 등)에 배포하는 프로젝트.
    - 프론트엔드와 백엔드가 하나의 Next.js 프로젝트로 통합된 경우
  - 즉 **백엔드의 복잡성을 줄이고 빠르게 API를 작성**하는 데 적합한 도구.
- **동기 vs 비동기**
  - 문제
    - 항상 async, await을 동기처리를 하기 위해서 활용했는데,
    - 찾아볼 때마다 비동기 처리를 위해 사용되는 것으로 나오기에
    - 이번 기회에 확실히 하고자 심도 깊이 찾아봄

  - 결론
    - 아주 단순히 말하자면 async & await과 promise 모두
      비동기 처리를 더 간단하고 가독성 좋게 만들기 위해 만든 문법
    - 그리고 이러한 비동기 처리를 동기식 표현으로 작성함으로써
      개발자가 "순차적인 흐름"을 유지하며 작성할 수 있게 도와줌

  - 또 다른 생각
    - 동기식, 비동기식 예시 코드를 확인하며 고민하게 된 것으로
    - setTimeout과 while문을 활용해서 비동기와 동기식 코드 예시를 보여줬는데
    - 생각으로는 분명히 javaScript는 비동기식 언어이기에 어떻게 하더라도
      비동기식으로 처리가 되어야 하는 것이 아닐까? 라고 생각이 듦.
    - 그래서 찾아본 결과
      - javaScript는 싱글 스레드이기에 while문 처럼 메인 스레이(CPU)를 점유하는 코드의 경우엔
        동기식으로 처리되어 진다는 것을 알게 됨.
      - 이러한 코드들을 블로킹 작업(Blocking Operation)으로 간주됨.
        - 종류
          - for, while loop
          - 재귀 
          - 동기적인 I/O 작업
          - alert, prompt, confirm
          - JSON 파싱 및 문자열 처리

  - **use client**
    - NextJS 13 이상에서는 기본적으로 컴포넌트는 서버 컴포너트로 작동.
      - 그러나 서버 컴포넌트의 경우엔 브라우저 전용 기능인 다음과 같은 기능을 사용할 수 없음
        - useState, useEffect, usePathname, DOM 이벤트 처리
      - 이 경우, 컴포넌트를 클라이언트 컴포넌트로 명시하기 위해 use client를 작성.
    - 필요 이유
      - 작성 중인 nextjs-dashboard 프로젝트의 /app/ui/dashboard/nav-links.tsx에서 사용 중.
      - 해당 코드에서는 React 훅(usePathname)과 DOM 이벤트(onClick)을 사용 중.
      - 이에 따라 브라우저 전용 기능을 사용하기 위해선 서버 컴포넌트가 아닌 
        -> 클라이언트 컴포넌트로 사용할 수 있도록 use client를 작성하여 명시해야 함.
    - 사용하지 않는다면?
      - usePathname을 호출할 때: usePathname is a client-only-hook이라는 에러가 발생.
      - onClick 핸들러 또한 동작 X
    - use client 도입 이유
      - NextJS 13의 새로운 아키텍처에서는 서버 렌더링 성능 최적화를 위해 서버 컴포넌트가 기본.
      - 다만 일부 컴포넌트는 브라우저와의 상호작용이 필요하기에 클라이언트에서 실행되어야 함.
      - 그래서 use client를 사용하여 명시적으로 구분한다면?
        - 서버 컴포넌트의 성능 최적화를 유지
        - 클라이언트 컴포넌트의 브라우저 종속성을 명확히 분리
  

