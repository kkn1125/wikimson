# Wikimson

공부 내용을 기록하는 wiki 페이지 입니다.

## Clone

해당 위키는 공부한 내용을 기록하기 위해 구현되었습니다. 혹시 현재 쓰는 테마를 사용하시려면 포크 하셔서 아래의 사용법을 참고하시고 사용하시기 바랍니다.

## Usage

위키의 구성은 아래와 같습니다.

1. `pages` 폴더
2. `main.js`의 `wikiRouter`
3. `index.html`의 `preload`

위키는 페이지 구성이 home, about, interview, wiki 입니다. 

### 페이지 생성

페이지 생성은 간단합니다. 우선 만들고자하는 페이지를 `js`파일로 `pages`폴더 내에 생성합니다. 가장 좋은 예는 있던 파일의 내용을 복사하면 됩니다.

```javascript
// test.js
const test = {
    modified: '',
    done: true,
    published: true,
    title: 'test',
    tags: ['test','test content'],
    categories: ['CS'],
    authors: ['author name'],
    wrote: '2021-11-30 21:15:57',
    toc: true,
    content: [
        `
        your contents
        `,
    ],
    ref: [
        {
            name:'name',
            link:'#library'
        },
    ],
}
```

위처럼 내용을 작성하고 `pages`폴더 내에 `test.js`파일을 위치시킵니다. 그리고 `index.html`에서 `preload`하여 내용을 불러옵니다.

```html
<!-- index.html -->
<link rel="preload" href="pages/test.js" as="script">
<script src="pages/test.js" async></script>
```

그 다음 `wikiRouter.js`를 열어 `test.js`의 `const` 변수를 연결해줍니다.

```javascript
const wikiRouter = {
    // 페이지들
    test, // test.js에서 지정한 변수명
};
```

위 속성 중 제외되는 것이 있다면 오류가 발생 할 수 있습니다.

#### 페이지 속성 설정

|구분|내용|값|
|---|---|---|
|modified|문서 수정 시각입니다.|wrote의 시간 형식과 동일해야합니다. \{time\}|
|done|문서작성이 완료되었는지 아직 작성 중인지 상태를 결정합니다.|Boolean|
|published|문서를 공개할지 여부를 결정합니다. 네비게이션에도 영향이 있습니다.|Boolean|
|title|문서 제목을 설정합니다. 변수명과 같을 필요는 없습니다.|String|
|tags|문서에 관련된 태그를 정합니다.|Array\{string\}|
|categories|문서에 관련된 카테고리를 정합니다.|Array\{string\}|
|authors|문서를 작성에 참여한 유저 명을 적습니다.|Array\{string\}|
|wrote|문서 작성 시각을 적습니다.|\{time\}|
|toc|문서 목차를 생성합니다.|Boolean|
|content|문서내용을 입력합니다. 배열임을 확인하시고 작성해야합니다.|Array\{string\}|
|ref|문서를 작성하는데 참고한 사이트 등을 입력합니다.|Array\{object\}|

#### TOC 참고사항

`TOC`는 `class`가 `h3` 또는 `h6`을 기준으로 탐색해서 생성합니다. `h3`이 최상위 단락, `h6`이 그 다음 하위 단락이며, 이외의 단락은 지정된 기준이 없으니 `h3`과 `h6`을 적절히 쓰시기 바랍니다.

#### 문서 내 링크

문서와 문서를 연결하는 파서가 있습니다. 사용법은 간단합니다.

```javascript
// test.js
const test = {
    // ...
    content : [
        // 1번
        `텍스트들 ... #프로세스[process&thread|정의]:end 텍스트들...`,
        // 2번
        `텍스트들 ...
        #프로세스[process&thread|정의]
        :end
        텍스트들...`
    ]
}
```

1번과 2번은 동일하게 작동하며 #보여질 텍스트\[문서제목(wikiRouter의 속성명)\|`h6`타이틀명] :end

1. \#보여질 텍스트
2. 문서제목(wikiRouter에서 문서의 속성명)
3. \|스크롤될 `h6`클래스를 가진 타이틀의 텍스트
4. :end 로 끝내기

#### 문서 내 테이블 생성

```javascript
// test.js
const test = {
    // ...
    content : [
        `
            th: 구분|설명@
            tb: !HTTP|TCP -> HTTP\\
                !HTTPS|TCP -> SSL -> HTTP
            @:end
        `,
    ]
}
```

`th:`로 시작하며 `th:`는 `thead`를 뜻합니다. `tb:`는 `tbody`이며 `tr`추가는 \\\\로 줄바꿈하여 작성합니다.

1. th: 테이블 헤드
2. tb: 테이블 바디
3. \| td 추가
4. \\\\ tr 추가 (줄바꿈)
5. @:end 끝내기
6. ! 가 포함되어있으면 볼드로 강조표시됩니다.

### 검색기능

검색 기능은 위키라우터에 등록된 내용을 기반으로 검색합니다. `wikiRouter`의 속성명과 제목, 태그, 카테고리를 전체 검색해서 결과를 도출합니다. 결과 내용을 클릭하면 해당 위키로 이동합니다.