### NextJS

- ECMAScript Module

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

- next.config.[ js | mjs ]

  - 차이는 모듈 시스템인 CJS(CommonJS)와 ESM(ECMAScript Module)

- 동적 라우트

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

---



- Dynamic Routes

  - 파일

    1. [slug].jsx 

    2. [...slug].jsx

    3. [[...slug].jsx]
       - 1번과 2번의 차이는 경로에 아무것도 넣지 않을 경우에 어떻게 할 것인지가 요점
       - 1번은 Error 페이지
         - isReady도 안먹힘
       - 2번은 default 페이지





