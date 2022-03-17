# Wikimson

공부 내용을 기록하는 wiki 페이지 입니다.

> 아래 내용은 이전 버전입니다. 현재 정리해서 수정 계획 중 입니다.

## Clone

해당 위키는 공부한 내용을 기록하기 위해 구현되었습니다. 혹시 현재 쓰는 테마를 사용하시려면 포크 하셔서 아래의 사용법을 참고하시고 사용하시기 바랍니다.

## 추가 wikiFilter 함수

toRef: 외부 페이지 혹은 위키 내 다른 페이지 참조할 때 사용
img: 이미지를 figure에 wrap하여 사용할 때 (focus 지원)
sup: 현재 읽고 있는 페이지 내에서 문단, 이미지, 문장 등을 참조 할 때

## Usage

위키의 구성이 대폭 변경되었습니다. `markdown`을 지원하고 간단한 이모지들을 내장했으며, wiki에 사용된 `hash router`는 [router 저장소](https://github.com/kkn1125/router)를 참고하시기 바랍니다.

`router`의 사용법을 따로 정리해 두었고 내장 이모지나 tabs, 기호 등의 표현은 아래의 정리를 참고하시면 됩니다.

### tabs

사용법은 `$tab_name: content :$`입니다.

```js
// ...
content : [`
# title 1

## title 2

$first:
    내용내용
:$

$second: 내용2내용2 :$
`]
// ...
```

![image](https://user-images.githubusercontent.com/71887242/158804503-b60debfd-9c2d-4039-a34f-dbc52c78a2cc.png)

### 이모지

1. \\\<\=\=\> or \\&lt;\=\=&gt; 👉 &DoubleLeftRightArrow;
2. \<\=\=\> or &lt;\=\=&gt; 👉 <span&gt;&DoubleLeftRightArrow;</span&gt;
3. \\\<\-\> or \\&lt;\-&gt; 👉 &LeftArrowRightArrow;
4. \<\-\> or &lt;\-&gt; 👉 <span&gt;&LeftArrowRightArrow;</span&gt;
5. \\\-\> or \\\-&gt; 👉 &#8594;
6. \-\> or \-&gt; 👉 <span&gt;&#8594;</span&gt;
7. \\\<\- or \\&lt;\- 👉 &#8592;
8. \<\- or &lt;\- 👉 <span&gt;&#8592;</span&gt;
9. \\\=\=\> or \\\=\=&gt; 👉 &Rightarrow;
10. \=\=\> or \=\=&gt; 👉 <span&gt;&Rightarrow;</span&gt;
11. \\\<\=\= or \\&lt;\=\= 👉 &Leftarrow;
12. \<\=\= or &lt;\=\= 👉 <span&gt;&Leftarrow;</span&gt;
13. \\\?\=\= or \\\?\=\= 👉 ≒
14. \?\=\= or \?\=\= 👉 <span&gt;≒</span&gt;
15. \\\=\=\= or \\\=\=\= 👉 ⩶
16. \=\=\= or \=\=\= 👉 <span&gt;⩶</span&gt;
17. \\\=\= or \\\=\= 👉 ⩵
18. \=\= or \=\= 👉 <span&gt;⩵</span&gt;
19. \\\>\= or \\&gt;\= 👉 ⪴
20. \>\= or &gt;\= 👉 <span&gt;⪴</span&gt;
21. \\\<\= or \\&lt;\= 👉 ⪳
22. \<\= or &lt;\= 👉 <span&gt;⪳</span&gt;
23. \\\!\= 👉 ≠
24. \!\= 👉 <span&gt;≠</span&gt;
25. \\\.\.\. 👉 …
26. \.\.\. 👉 <span&gt;…</span&gt;
27. (:prj) 👉 📋
28. (:1) 👉 🥇
29. (:2) 👉 🥈
30. (:3) 👉 🥉
31. (:(x or X)) 👉 ❌
32. (:(v or V)) 👉 ✅
33. (: )) or (웃음) 👉 😀
34. (ㅠㅠ) or (슬픔) 👉 😥
35. (화남) 👉 😤
36. (꾸벅) or (인사) 👉 🙇‍♂️
37. (:!!) 👉 💡
38. (:!) 👉 ❗
39. (:?) 👉 ❓
40. Text!@text@ 👉 Text! <sub&gt;text</sub&gt;

### 검색기능

검색 기능은 위키라우터에 등록된 내용을 기반으로 검색합니다. `wikiRouter`의 속성명과 제목, 태그, 카테고리를 전체 검색해서 결과를 도출합니다. 결과 내용을 클릭하면 해당 위키로 이동합니다.