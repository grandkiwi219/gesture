# gesture; 제스쳐   <자급자족 프로젝트 2>

타 브라우저 내장 제스쳐 기능을 크롬에서 사용하고자 하는 목적으로 제작

<br>

## 주의!

<p>본 확장프로그램은 미완성 상태이며, 코드가 난잡할 수 있습니다.</p>
<p>본 확장프로그램 혹은 이와 관련된 기능으로 인해 생긴 문제는 책임지지 않습니다.</p>
<p>또한 미완성인만큼 변경될 구석은 얼마든지 있음을 알립니다.</p>

<br>

---

<br>

## 수동 설치법

- git clone
```bash
$ git clone https://github.com/grandkiwi219/gestrue.git
```

<br>

- build
```bash
$ npm run build
# 폴더 위치 → output/chrome
```
본 스크립트는 크롬 확장프로그램만 빌드할 시 입니다.
파이어폭스 애드온을 빌드할 시 `npm run build-ff` 를 입력하셔야 합니다.

<br>

- zip
```bash
$ npm run zip
```
먼저 build를 실행 후 zip을 실행하셔야 합니다.

<br>


---

> ### 문제 보고서
>   - 파이어폭스
>       - contextmenu 무시가 기능하지 않음