## nodejs-backend-practice
#### 2024.12.21 ~

----
### 백엔드 연습 clone-coding project 😊
- 참고서적 : https://product.kyobobook.co.kr/detail/S000201457949

----
1. chapter 5 
   - promise, async/await, callback
```javascript
// promise example
then(onFulfilled)
then(onFulfilled, onRejected)

then(
        (value) => { /* success handler */},
        (reason) => { /* reject handler */ }
)

```
```
callback : 콜백 함수내에서 처리
promise : catch() 메서드로 처리
async/await : try-catch 블록으로 처리
```
2. 