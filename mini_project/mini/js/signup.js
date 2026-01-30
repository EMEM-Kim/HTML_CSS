console.log("signup.js loaded");

// 다크모드 유지
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.add("light-mode");
}

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = userId.value.trim();
  const pw = password.value;
  const pwCheck = passwordCheck.value;
  const name = userName.value.trim();
  const phone = document.getElementById("phone"); // 먼저 선언
  const userPhone = phone.value; // 그 다음에 사용
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;

  // 유효성 검사
  if (!id || !pw || !pwCheck || !name || !phone || !gender || !email) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (pw.length < 6) {
    alert("비밀번호는 6자 이상이어야 합니다.");
    return;
  }

  if (pw !== pwCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 회원가입 완료 알림
  alert(`
회원가입 완료!

아이디: ${id}
이름: ${name}
전화번호: ${phone}
성별: ${gender}
이메일: ${email}
  `);

  // 페이지 이동
  window.location.href = "signup_success.html";
});
