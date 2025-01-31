## Front End - NextJS

## NextJS 프론트 개발

- NextJS 프로젝트 설치

  - 현재 사내 프로젝트 개발은 이전 개발 스타일을 따르기에 , App Router 대신 Page Router를 사용.

  ```
  npx create-next-app@latest
  
  √ What is your project named? my-app
  -> 프로젝트 명 설정
  √ Would you like to use TypeScript with this project? ... No / Yes
  -> 타입스크립트 사용할건지?
  √ Would you like to use ESLint with this project? ... No / Yes
  -> eslint 사용할건지?
  √ Would you like to use Tailwind CSS with this project? ... No / Yes
  -> 테일윈드 사용할건지?
  √ Would you like to use src/ directory with this project? ... No / Yes
  -> src 디렉토리 사용할건지?
  √ Use App Router (recommended)? » No / Yes
  -> App Router (추천) 사용할건지?
  √ Would you like to customize the default import alias? ... No / Yes
  -> import 구문 커스터마이징할건지?
  ```

- **Prettier** 

  - 사용 이유

    - 코드 스타일을 자동으로 정리해주는, 코드 포매터
    - 들여쓰기, 줄바꿈, 따옴표 사용, 세미콜론 사용 여부 등과 같은 코드의 형식적인 부분을 일관되게 만듦.

  - 설치 순서(VS Code 기준)

    - Extension 설치

    - Setting 설정

      - ctrl + , -> 설정에 들어가기
      - Editor: Default Formatter -> Prettier로 변경
      - Editor: Format on save -> 체크

    - .prettierrc(개별 옵션 설정)

      - prettier 설치

        ```
        npm i --save-dev prettier
        ```

      - .prettierrc 파일 생성 후 작성

        ```
        # 예시
        
        {
          "singleQuote": flase, // 문자열을 작은따옴표로 설정
          "arrowParens": "always", // 화살표 함수의 매개변수가 하나일 때 괄호를 사용할지 여부
          "bracketSpacing": true, // 객체 리터럴에서 중괄호 내부에 공백 삽입할지 여부 
          "endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름 
          "htmlWhitespaceSensitivity": "css", // HTML 공백 감도 설정
          "jsxBracketSameLine": false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부 
          "jsxSingleQuote": false, // JSX에 singe 쿼테이션 사용 여부
          "printWidth": 80, //  한 줄에 출력되는 코드의 최대 길이
          "proseWrap": "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
          "quoteProps": "as-needed" // 객체 속성에 쿼테이션 적용 방식
          "semi": true, // 세미콜론 사용 여부
          "singleQuote": true, // single 쿼테이션 사용 여부
          "tabWidth": 2, // 탭 간격
          "trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
          "useTabs": false, // 탭 사용 여부
          "vueIndentScriptAndStyle": true, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
          "parser": '', // 사용할 parser를 지정, 자동으로 지정됨
          "filepath": '', // parser를 유추할 수 있는 파일을 지정
          "rangeStart": 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
          "rangeEnd": Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
          "requirePragma": false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정
          "insertPragma": false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
          "overrides": [ 
            {
              "files": "*.json",
              "options": {
                "printWidth": 200
              }
            }
          ], // 특정 파일별로 옵션을 다르게 지정함, ESLint 방식 사용
        }
        ```

- **ESLint**

  - 사용 이유

    - 코드의 품질과 문법을 검사해주는 도구
    - 코드에서 발생할 수 있는 잠재적인 오류, 비효율적인 코드, 잘못된 변수 사용 등 문법적인 문제를 찾아줌.
    - 주요 기능
      - 변수 선언 없이 사용한 오류 감지
      - 사용하지 않는 변수나 import 정리
      - 비효율적인 코드 경고

  - 설치 순서

    - eslint 설치
      - npm i --save-dev eslint
    - Eslint & Prettier 충돌방지를 위한 확장 패키지
      - npm i -D eslint-config-prettier
      - npm i -D eslint-plugin-prettier

  - 코드

    ```javascript
    module.exports = {
      env: {
        browser: true,        // 브라우저 환경에서 실행되는 코드 검사
        es6: true,            // ES6(ECMAScript 2015+) 문법 허용
        node: true,           // Node.js 환경 지원
        jest: true,           // Jest(테스트 프레임워크) 관련 전역 변수를 허용
      },
      parserOptions: {
        ecmaVersion: 2022,    // 최신 ECMAScript 2022 문법을 사용할 수 있도록 설정
      },
      extends: [
        "airbnb-base",        // Airbnb의 JavaScript 스타일 가이드 확장 적용
        "plugin:prettier/recommended", // Prettier와의 통합을 활성화하여 코드 스타일 문제를 잡음
        "prettier",           // Prettier 규칙 적용 (Airbnb 스타일과 충돌하는 포맷팅 규칙 비활성화)
      ],
      rules: {
        "max-depth": ["error", 2], // 중첩된 블록의 깊이가 2를 초과하면 에러
        "max-lines-per-function": ["error", 16], // 함수당 최대 16줄을 초과하면 에러
        "operator-linebreak": ["error", "before"], // 연산자가 줄바꿈 시 앞에 위치해야 함
        "no-unused-expressions": ["error", { allowTernary: true }], // 사용되지 않는 표현식 금지, 단 삼항 연산자는 허용
      },
    };
    
    
    ```

    

- 하이드레이션
  - 정의
    - 서버에서 렌더링된 HTML을 클라이언트에서 React앱으로 활성화시키는 과정.
    - 이 과정을 통해 브라우저에서 정적 HTML로 표시된 페이지가, 실제로 동작하는 React 컴포넌트로 변환.
    - 즉, 서버에서 렌더링된 정적 HTML에 React의 상태 관리와 이벤트 처리 기능을 추가하는 과정.
  - 비유
    - SSR: 해당 과정에서의 HTML은 구조는 있지만, 동적인 기능은 활성 X
    - 하이드레이션: 이 과정에서 페이지를 동적으로 만들어줌.



- Layout

  - App Router

    - layout.js 파일로 레이아웃을 작성

  - Page Router 

    - _app.js (글로벌 레이아웃)

      - 모든 페이지에 적용되는 공통 레이아웃을 설정할 때 사용.

        ```javascript
        // pages/_app.js
        import Layout from "../components/Layout";
        import "../styles/globals.css"; // 전역 스타일
        
        function MyApp({ Component, pageProps }) {
          return (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          );
        }
        
        export default MyApp;
        ```

        ```javascript
        // components/Layout.js
        import Link from "next/link";
        
        export default function Layout({ children }) {
          return (
            <div>
              <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </nav>
              <main>{children}</main>
            </div>
          );
        }
        ```

        

    - _document.js(HTML 구조 변경)

      ```javascript
      // pages/_document.js
      import { Html, Head, Main, NextScript } from "next/document";
      
      export default function Document() {
        return (
          <Html lang="en">
            <Head>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
      ```



- usePathname() vs useRouter().pathname
  - app Router -> usePathname()
    - 이유
      - Next.js가 서버 중심의 라우팅을 관리
      - useRouter()는 Page Router 전용이기에, 사용 불가
      - usePathname()은 next/navigation에서 제공하는 App Router 전용 훅이기에, 현재 경로만 반환하는 역할.
  - page Router -> useRouter().pathname
    - 이유
      - next/router를 통해 CSR을 관리
      - 기본적으로 라우터 상태를 가지고 있기에 동적 라우팅이 가능
      - 페이지 전환 시 pathname이 자동으로 업데이트됨



- Page Router vs App Router

  - Page Router

    - 기본적으로 CSR

    - 'use client', 'use server' 사용 불가

      - 기본적으로 모든 코드가 클라이언트에서 실행되기에 사용 불가

      - 서버 관련 작업하는 방법

        - API Route를 사용하여 서버에서 데이터를 처리해야 함.

        - 즉, 서버 액션을 직접 사용할 수 없고, API 라우트를 통해 서버 로직을 분리해야 함.

          ```javascript
          // pages/api/data.js
          
          export default async function handler(req, res) {
            if (req.method === "GET") {
              // DB 쿼리 실행 (예시)
              const data = { message: "서버에서 가져온 데이터" };
              res.status(200).json(data);
            } else {
              res.status(405).json({ error: "Method Not Allowed" });
            }
          }
          ```

          ```javascript
          // pages/index.js (클라이언트에서 실행)
          
          import { useEffect, useState } from "react";
          
          export default function HomePage() {
            const [data, setData] = useState(null);
          
            useEffect(() => {
              fetch("/api/data")
                .then((res) => res.json())
                .then((result) => setData(result.message));
            }, []);
          
            return <div>서버 데이터: {data || "로딩 중..."}</div>;
          }
          ```

          

  - App Router

    - 기본적으로 SSR
    - 'use client', 'use server' 사용 가능
      - App Router에서만 지원하는 기능
      - use server
        - 서버 액션을 정의할 때 사용하는 지시어
          - API 라우트 없이도 서버에서 직접 DB 쿼리, API 호출 등을 실행 가능





---

## NodeJS 백엔드 개발 

- 이유
  - 기존에는 프론트엔드에서 사용하는 자바스크립트 언어와, 백엔드에서 사용하는 자바, C 등 
    다른 언어를 추가로 다뤄야만 풀스택 개발이 가능했지만
    NodeJS로 백엔드 개발을 진행하게 되면 하나의 언어로 개발이 가능하며, 
    npm 을 통해 개발 과정을 빠르고 효율적으로 처리할 수 있기에 많이 사용.
  - 