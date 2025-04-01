const display = document.querySelector("#display");
const btns = document.querySelectorAll(".btn");
let firstOperand = null; // 첫 번째 피연산자 저장
let operator = null; // 연산자 기호 저장
let secondOperand = null; // 두 번째 피연산자 저장

// 두 숫자와 연산자 입력 받아 계산결과를 반환
function calculate(firstOperand, operator, secondOperand) {
    let first = parseFloat(firstOperand)
    let second = parseFloat(secondOperand)
    let result = 0;

    if (operator === "+") {
        result = first + second;
    } else if (operator === "-") {
        result = first - second;
    } else if (operator === "*") {
        result = first * second;
    } else if (operator === "/") {
        result = first / second;
    }
    console.log(typeof result)
    if (!isFinite(result)) {
        result = "ERROR";
    }
    return result;
}

btns.forEach(item => {
    item.addEventListener("click", function (e) {
        // console.log(e.target.textContent);
        // console.log(e.target.classList[1]);
        let value = e.target.textContent;
        let type = e.target.classList[1];

        // 숫자
        if (type === "number") {
            // 연산자 값 없을 경우
            if (operator === null) {
                if (display.textContent === "0") {
                    display.textContent = value;
                } else {
                    display.textContent += value;
                }
            } else { // 연산자 값 있을 경우 디스플레이에 새로운 숫자가 출력
                if (secondOperand === null) {
                    display.textContent = value;
                } else {
                    display.textContent += value;
                }
                secondOperand = display.textContent;
                console.log(`두번째 피연산자: ${secondOperand}`);
            }
        }

        // 연산기호 클릭 시 
        if (type === "operator") {
            //  연산자 값 있을 경우 계산
            if (operator !== null) {
                display.textContent = calculate(firstOperand, operator, secondOperand);
                secondOperand = null;
            }
            firstOperand = display.textContent
            operator = value;
            console.log(`첫번째 피연산자: ${firstOperand}`);
            console.log(`연산기호: ${operator}`);
        }

        // 소수점
        if (value === "." && !display.textContent.includes(".")) {
            display.textContent += value;
        }

        // C 초기화
        if (value === "C") {
            display.textContent = "0";
            firstOperand = null;
            secondOperand = null;
            operator = null;
        }

        // = 버튼 클릭 시 계산함수 수행
        if (value === "=") {
            // 계산 결과 디스플레이에 출력
            display.textContent = calculate(firstOperand, operator, secondOperand);
            console.log(`계산 결과: ${display.textContent}`);
            // 계산 종료 시 초기화
            operator = null;
            secondOperand = null;
        }
    });
});

