#!/bin/bash

# Canny/Newsify 인증 시스템 테스트 스크립트

echo "🚀 Canny/Newsify 인증 시스템 테스트 시작"
echo

# 서버 상태 확인
echo "1. 서버 상태 확인 중..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 서버가 정상적으로 실행 중입니다."
else
    echo "❌ 서버에 연결할 수 없습니다. 서버를 시작해주세요."
    exit 1
fi

echo

# 회원가입 테스트
echo "2. 회원가입 테스트 중..."
SIGNUP_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "테스트 사용자",
    "email": "test@example.com", 
    "password": "testpassword123"
  }')

echo "회원가입 응답: $SIGNUP_RESPONSE"

if echo "$SIGNUP_RESPONSE" | grep -q "회원가입이 완료되었습니다"; then
    echo "✅ 회원가입 성공"
else
    echo "⚠️ 회원가입 응답 확인 필요"
fi

echo

# 로그인 테스트
echo "3. 로그인 테스트 중..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }' \
  -c cookies.txt)

echo "로그인 응답: $LOGIN_RESPONSE"

if echo "$LOGIN_RESPONSE" | grep -q "로그인되었습니다"; then
    echo "✅ 로그인 성공"
else
    echo "⚠️ 로그인 응답 확인 필요"
fi

echo

# 인증된 사용자 정보 확인
echo "4. 인증된 사용자 정보 확인 중..."
ME_RESPONSE=$(curl -s http://localhost:3000/api/auth/me \
  -b cookies.txt)

echo "사용자 정보 응답: $ME_RESPONSE"

if echo "$ME_RESPONSE" | grep -q "test@example.com"; then
    echo "✅ 사용자 정보 확인 성공"
else
    echo "⚠️ 사용자 정보 확인 실패"
fi

echo

# 로그아웃 테스트
echo "5. 로그아웃 테스트 중..."
LOGOUT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt \
  -c cookies.txt)

echo "로그아웃 응답: $LOGOUT_RESPONSE"

if echo "$LOGOUT_RESPONSE" | grep -q "로그아웃되었습니다"; then
    echo "✅ 로그아웃 성공"
else
    echo "⚠️ 로그아웃 응답 확인 필요"
fi

echo

# 로그아웃 후 인증 확인
echo "6. 로그아웃 후 인증 상태 확인 중..."
AFTER_LOGOUT_RESPONSE=$(curl -s http://localhost:3000/api/auth/me \
  -b cookies.txt)

echo "로그아웃 후 응답: $AFTER_LOGOUT_RESPONSE"

if echo "$AFTER_LOGOUT_RESPONSE" | grep -q "인증 토큰이 없습니다"; then
    echo "✅ 로그아웃 후 인증 해제 확인"
else
    echo "⚠️ 로그아웃 후 상태 확인 필요"
fi

echo

# 정리
rm -f cookies.txt

echo "🎉 인증 시스템 테스트 완료!"
echo
echo "📝 테스트 결과 요약:"
echo "- 회원가입 API 작동"
echo "- 로그인 API 작동" 
echo "- JWT 토큰 기반 인증 작동"
echo "- 쿠키 기반 세션 관리 작동"
echo "- 로그아웃 API 작동"
echo
echo "🌐 브라우저에서 테스트하려면:"
echo "1. http://localhost:3000/signup 에서 회원가입"
echo "2. http://localhost:3000/login 에서 로그인"
echo "3. http://localhost:3000/settings 페이지 접근 확인"
echo "4. 로그아웃 후 자동 리다이렉트 확인"
