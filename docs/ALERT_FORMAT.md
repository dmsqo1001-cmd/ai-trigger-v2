# Alert Format

## Trigger Card Example

SSS) NEW TRIGGER

티커: ABDC
가격: $1.20
유동주식수: 6.2M
감시 사유: 저가주 / 저유동주

최신뉴스:
FDA 관련 긍정 이벤트 [S]

SEC 리스크:
F-4 확인 [B]

숏스퀴즈 가능성:
[A]

TRIGGER AI 한줄 평:
강한 호재와 수급 민감도가 확인됩니다. 다만 SEC 리스크가 일부 존재하므로 리스크 확인이 필요합니다.

## Required Fields

- id
- ticker
- price
- floatShares
- watchlistReasons
- latestNewsTitle
- newsType
- newsGrade
- secRiskForm
- secRiskGrade
- shortSqueezeGrade
- aiOneLine
- createdAt
- channel

## Grade System

실제 저장 가능한 등급 값은 아래 5개만 사용한다.

- S
- A
- B
- C
- F

## Trigger Label Rule

카드 상단의 NEW TRIGGER 표시 문구는 newsGrade를 3번 반복해서 만든다.

예시:

- newsGrade = S → SSS) NEW TRIGGER
- newsGrade = A → AAA) NEW TRIGGER
- newsGrade = B → BBB) NEW TRIGGER
- newsGrade = C → CCC) NEW TRIGGER
- newsGrade = F → FFF) NEW TRIGGER

SSS, AAA, BBB, CCC, FFF는 실제 등급 저장값이 아니라 화면 표시용 라벨이다.