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
  - **page & layout**
    - page 명으로 작성한 파일은 해당 경로의 default 페이지가 됨.

    - layout 명으로 작성한 파일은 해당 경로로 default 레이아웃으로 
      - children을 파라미터 값으로 children을 받아 원하는 곳에 위치하도록 한다면

      - 해당 위치에 관련 페이지가 렌더링 됨.
  - **요청 워터폴 vs 병렬 데이터 페칭**
    - 요청 워터폴: 순서대로 요청

    - 병렬 데이터 페칭: 병렬로 데이터 요청 -> Promise.all([])

  - **스트리밍**
    - 경로를 더 작은 조각으로 나누고 데이터가 준비되면 
      서버에서 클라이언트로 점진적으로 스트리밍할 수 있는 데이터 전송 기술.
    - 이를 통해 느린 데이터 요청이 전체 페이지를 차단하는 것을 방지할 수 있음.
      - 따라서 UI를 사용자에게 표시하기 전에 모든 데이터가 로드될 때까지 기다리지 않고도
        페이지의 일부를 보고 상호 작용할 수 있음.
    - 구현 방법
      - 페이지 수준에서 loading.tsx 파일을 사용.
        - 특정 경로로 사용할 폴더 내부에 loading 파일 만들어 사용.
        - 해당 파일 자체가 Suspense를 기반으로 구축된 특수한 Next.js 파일.
        - 정적이기에 <SideNav>는 즉시 표시되며, 로딩되는 동안 상호 작용 가능.
        - 다만 loading 파일은 같은 경로의 폴더의 요소에도 적용되기 때문에
          - 특정 페이지에만 적용하고자 한다면 Route Groups를 사용하여 변경할 수 있다.
          - dashboard/(overview)
            - loading.tsx
            - page.tsx
          - 위에서 () 소괄호로 폴더명을 작성하는 이유는
            - URL 경로에 포함되지 않기 때문.
      - 특정 구성요소의 경우 Suspense 태그 사용.
        - suspense를 사용할 경우 보다 세부적으로 특정 구성 요소를 스트리밍 할 수 있음.
        - 또한 일부 조건이 충족될 때까지 애플리케이션의 렌더링 부분을 연기할 수 있음.
- 부분 사전 렌더링(PPR, NextJS 14 이후만 가능)
  - 오늘날 구축된 대부분의 웹 앱의 경우 특정 경로에 대해 정적 및 동적 렌더링 중에서 선택함.
  - 그러나 대부분의 경우 완전히 정적이거나 동적이 아님.
    - ex) 전자상거래 사이트의 경우
      - 제품 정보 페이지의 경우엔 정적으로 렌더링할 수 있지만,
      - 사용자의 장바구니와 추천 제품을 동적으로 가져오고 싶을 수 있음.
  - 사용법
    - 기본적으로 React의 Suspense를 사용.
- **URL 검색 매개변수**
  - 사용 이유
    - 북마크 및 공유가 가능한 URL
      - 검색 매개변수가 URL에 있으므로 사용자는 검색 쿼리와 필터를 포함하여 애플리케이션의
        현재 상태를 북마크하여 향후 참조 또는 공유할 수 있음.
    - 서버 측 렌더링
      - URL 매개변수를 서버에서 직접 사용하여 초기 상태를 렌더링할 수 있기에
        서버 렌더링을 처리하기가 더 쉬워짐.
    - 분석 및 추적
      - URL에 검색어와 필터를 직접 추가하면 추가적인 클라이언트 측 로직이 필요 없이
        사용자 행동을 쉽게 추적할 수 있다.
  - 검색 기능 추가 Hook (강의 예시)
    - useSearchParams: 현재 URL의 매개변수에 액세스할 수 있음.
      - ex) /dashboard/invoices?page=1&query=pending 의 경우
      - 해당 URL의 검색 매개변수는 {page: '1', query: 'pending'} 와 같다.
      - 즉, URL 쿼리 매개변수를 조작하기 위한 유틸리티 메서드를 제공하는 웹 API
    - usePathname: 현재 URL의 경로 이름을 읽을 수 있음.
      - ex) /dashboard/invoices 의 경우
      - '/dashboard/invoices' 를 반환
    - useRouter: 클라이언트 구성 요소 내에서 경로 간 탐색을 프로그래밍 방식으로 활성화 함.

- useState
  - 기본적으로 sueState로 지정한 변수는 컴포넌트가 랜더링 되기 전에 초기화가 됨.
  - 그렇기에 순서상 useEffect 보다 먼저 초기값이 할당됨.



- **서버 액션(React Server Actions)**

  - 사용 이유

    - 비동기 코드를 서버에서 직접 실행할 수 있음.
    - 데이터 변경을 위해 API 엔드포인트를 만들 필요가 없음.
    - 대신 서버에서 실행되고 클라이언트 또는 서버 구성 요소에서 호출할 수 있는 비동기 함수를 작성해야 함.
    - 다양한 보안 위협으로 인해 다음과 같은 기능이 포함되어 있음.
      - 암호화된 클로저
      - 엄격한 입력 검사
      - 오류 메시지 해싱
      - 호스트 제한

  - 사용 방법

    - 서버 작업 생성
      - 'use server' 를 파일 상단에 추가
      - 추가 시 파일 내의 모든 내보낸 함수를 서버 작업으로 표시.
      - 이후 서버 함수를 가져와 클라이언트 및 서버 구성 요소에서 사용할 수 있다.
      - 해당 파일에 포함된 함수 중 사용되지 않는 함수는 최종 애플리케이션 번들에서 자동 제거.
      - 또한 액션 내부에 추가하여 Serveer Components 내부에 Server Actions를 직접 작성할 수 도 있음.

  - 순서

    1. 서버 파일 생성

    2. 서버 파일에 비동기 함수 작성

    3. 이후 서버 파일에 작성한 함수를 적용할 Form 태그에 action으로 전달

    4. Form 태그로부터 전달 받은 데이터 추출

       - 아래에서 key값은 특정 태그의 name 속성에 해당함.

       ```javascript
       'use server';
        
       export async function createInvoice(formData: FormData) {
         const rawFormData = {
           customerId: formData.get('customerId'),
           amount: formData.get('amount'),
           status: formData.get('status'),
         };
         // Test it out:
         console.log(rawFormData);
       }
       ```

    5. 데이터 검증 및 준비

       - DB의 데이터 타입과 동일해야 하기에 예상 유형과 일치하는지 확인해야 함.

       - ex) 현재 amount는 input type으로 number로 설정했지만, 전달 받은 데이터 타입은 string으로 확인.

         - 이에 따라 실제로 숫자가 아닌 문자열을 반환받게 되어 문제가 발생할 수 있음.

       - 이를 위해 예를 들어 TypeScript 우선 검증 라이브러리인 Zod를 사용

         - amount 필드와 같이 문자열을 숫자로 강제 변환하고, 해당 유형의 유효성을 검사
           - 원인은 자바스크립트의 기본 동작이 사용자 입력을 문자열로 취급.

         ```javascript
         'use server'
         
         import { z } from 'zod';
         
         const FormSchema = z.object({
           id: z.string(),
           customerId: z.string(),
           amount: z.coerce.number(),
           status: z.enum(['pending', 'padin']),
           data: z.string(),
         })
         
         const CreateInvoice = FormSchema.omit({ id: true, data: true});
         
         export async function createInvoice(formData: FormData) {
           const rawFormData = {
             customerId: formData.get('customerId'),
             amount: formData.get('amount'),
             status: formData.get('status')
           };
         }
         ```

    6. 재검증 및 리디렉션

       - NextJs에는 경로 세그먼트를 일정 시간 동안 사용자 브라우저에 저장하는
         클라이언트 측 라우터 캐시가 있음.

         - 해당 캐시는 사전 페칭과 함께 사용자가 서버에 대한 요청 수를 줄이는 동시에
           경로 간을 빠르게 탐색할 수 있도록 함.

       - 송장 경로에 표시된 데이터를 업데이트하고 있기에, 해당 캐시를 지우고 서버에 대한
          새로운 요청을 트리거하기 위해 revalidatePath 메서드를 사용하여 수행.

       - **쉽게 이해하자면**

         - NextJS는 성능 최적화를 위해 페이지를 정적으로 생성하여 캐시함.
           - 하지만 정적으로 생성된 페이지는 데이터가 변경되었을 때, 즉시 업데이트 되지 않음.
           - 따라서 새로운 데이터가 추가되거나 수정된 경우, 해당 페이지의 정적 파일을 재생성해야 함.
         - 이를 위해 revalidatePath를 사용.
           - 지정된 경로의 캐시를 무효화하고, 백그라운드에서 해당 페이지를 다시 생성하도록 트리거.
           - 즉, 사용자가 새로 고침하거나 다시 방문하면 최신 데이터를 볼 수 있음
         - 필요한 시점
           - 페이지가 SSG(Static Site Generation) 또는 ISR(Incremental Static Regeneration) 
             방식으로 생성된 경우.
           - 데이터가 변경될 때마다 해당 데이터가 반영된 페이지가 필요할 경우.
           - 실시간 데이터 업데이트가 중요하지만, 모든 요청에서 SSR을 사용해 
             성능을 희생하고 싶지 않을 경우.

       - 위의 경우에 대한 나의 생각

         ```markdown
         # GPT가 맞다고 함.
         해당 파일에서 use server을 명시하며 revalidatePath 메서드를 함께 사용하는 이유가 
         SSR을 전반적으로 유지하되 특정 요청에 대해서만 데이터 업데이트를 적용하고 싶어서
         ```

    7. Redirect 하기

       - next/navigation 을 import 하여 다음과 같이 적용

         ```javascript
         'use server'
         
         import { z } from 'zod';
         import { sql } from '@vercel/postgres';
         import { revalidatePath } from 'next/cache';
         import { redirect } from 'next/navigation';
         
         const FormSchema = z.object({
           id: z.string(),
           customerId: z.string(),
           amount: z.coerce.number(),
           status: z.enum(['pending', 'padin']),
           data: z.string(),
         })
         
         const CreateInvoice = FormSchema.omit({ id: true, data: true});
         
         export async function createInvoice(formData: FormData) {
           const {customerId, amount, status} =  CreateInvoice .parse( {
             customerId: formData.get('customerId'),
             amount: formData.get('amount'),
             status: formData.get('status')
           });
           const amountInCents = amount * 100; // 센트화
           const data = new Date().toISOString().split('T')[0]; // 날짜 YYYY-MM-DD 형식 변경
         
           await sql`
             INSERT INTO invoices (customer_id, amount, status, data)
             VALUES (${customerId}, ${amountInCents}, ${status}, ${data})
           `
         
           revalidatePath('/dashboard/invoices')
           redirect('/dashboard/invoices')
         }
         ```

         

  - **송장 업데이트**

    - 순서
      - 송장을 사용하여 새로운 동적 경로 세그먼트 생성.
      - `id`페이지 매개변수에서 송장 읽기.
      - 데이터베이스에서 특정 송장 가져오기.
      - 송장 데이터로 양식 미리 채우기.
      - 데이터베이스의 송장 데이터를 업데이트.

    1. 동적 경로 세그먼트 생성
       - 정확한 세그먼트 이름을 모르고 데이터를 기반으로 경로를 만들고 싶을 때 
         동적 경로 세그먼트를 만들어 사용.

  - **bind 메서드**

    - 특정 메서드에 고정된 값을 넣고자 한다면 bind를 사용하여

    - 파라미터의 첫 값은 this 값을 넣고, 없다면 null 

    - 이후 부터는 파라미터 순서대로 고정 값을 추가하면 됨.

    - 예시와 궁금증

      - 아래와 같이 form 태그의 action으로 invoice의 id값을 추가하여 
        form에 작성된 데이터를 서버로 전달하고자 할 경우
      - 단순히 updateInvoice(invoice.id) 를 action으로 전달하게 되면
        그냥 실행 결과만 전달하게 됨.
      - 따라서 form data도 전달하면서 invoice의 id값을 함께 전달하고자 한다면
      - javascript의 bind 메서드를 사용할 수 있음.

      ```javascript
      // 간단 예시 코드
      function edit-forms() {
          // 인코딩된 id가 고정된 새로운 함수  
        const updateInvoiceWithId = updateInvoice.bind(null, invoice.id) 
        return (
          <form action={updateInvoiceWithId}>
      }
      ```

- **redirect**

  - redirect는 내부적으로 에러를 던지는 방식으로 작동.
  - 따라서 trt-catch 블록 내부에 사용하게 된다면 에러를 던지기에 redirect가 의도한 대로 동작 X

- **useRef**

  - 기존에는 1개의 태그엔 1개의 useRef를 생성하여 각 태그에 접근하도록 만들어 사용했음.

    - 이유는 그 당시 기본적으로 단일 요소를 참조하는 데 사용된다고 하여 그렇게 사용했음.

  - 새롭게 알아본 결과

    - 기본적으론 이전 지식과 동일하지만, 배열이나 객체를 사용하여 여러 요소를 관리할 수 있음.
    - 이를 통해 여러 radio 버튼이나, 다른 여러 DOM 요소를 하나의 useRef로 관리 가능.

    ```javascript
    // 예시
    const radioRefs = useRef<HTMLInputElement[]>([]); // 여러 요소를 저장할 배열
    
    // 이후 input 태그에 ref 속성 부여
    <input 
    	ref={(el) => el && radioRefs.current.pupsh(el)}
        type="radio"
    />
    ```

- **Form 데이터 제출 전 검증**
  - 클라이언트 측 검증
    - 우선 특정 입력 태그(ex. input, select ...) 등에 required 속성 추가하여 입력을 하도록 함.
    - 만약 다양한 radio 타입의 input 중 하나라도 체크를 하도록 하고자 한다면
      - 같은 name 속성으로 두고 모두 required 속성을 부여한다면 됨.
  - 서버 측 검증
    - useActonState 훅 사용
      - 두 가지 파라미터를 받음(action, initailState)
      - 두 가지 값을 반환[state, formAction] - 양식 상태 및 양식이 제출될 때 호출될 함수









- **UUID** 
  - 사용 이유
    - id 값 자체와 유사하지만, UUID를 사용하게 되면
    - URL이 길어지지만 ID 충돌 위험을 제거하고, 전역적으로 고유하며 열거형 공격 위험을 줄여줌.

- 하이드레이션
