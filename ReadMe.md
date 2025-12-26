# <div align=center><자급자족 프로젝트 2> <br> gesture; 제스처</div> 

<div align=center>타 브라우저 내장 제스처 기능을 크롬에서 사용하고자 하는 목적으로 제작</div>

<br>

---

<br>

## 주의!

본 확장프로그램은 미완성 상태이고, 코드가 난잡할 수 있습니다.<br><br>
본 확장프로그램 혹은 이와 관련된 기능으로 인해 생긴 문제는 책임질 수 없습니다.<br><br>
또한 미완성인만큼 변경 및 개선될 부분은 얼마든지 있음을 알려드립니다.

<br>

---

<br>

## 수동 설치/실행법

- git clone
```bash
git clone https://github.com/grandkiwi219/gestrue.git
```

<br>

- 빌드
```bash
npm run build
```
> 폴더 위치 → output/chrome

본 스크립트는 크롬 확장프로그램만 빌드할 시 입니다.
파이어폭스 애드온을 빌드할 시 `npm run build-ff` 를 입력하셔야 합니다.

<br>

- 압축
```bash
npm run zip
```
> 폴더 위치 → dist/\<version>

반드시 먼저 build를 실행 후 zip을 실행하셔야 합니다.<br>
본 스크립트는 크롬 확장프로그램만 빌드할 시 입니다.
파이어폭스 애드온을 빌드할 시 `npm run zip-ff` 를 입력하셔야 합니다.

<br>

- 한 번에 실행
```bash
npm run process
```

<br>


---

> ### 문제 보고서
>   - 공통
>       - context menu 가 뜨는 문제<br>→ 조건: '성능 저하 상태' or '초기 로딩에서 사용시 간헐적'
>       - 펜이 초기에 버벅이는 문제<br>→ 조건: '성능 저하 상태'<br>→ 방안: 계속 대기시킬 수 있게 설정할 수 있는 옵션

---
