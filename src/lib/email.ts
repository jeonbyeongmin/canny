import nodemailer from "nodemailer";

// 이메일 트랜스포터 설정
const transporter = nodemailer.createTransport({
  // Gmail을 사용하는 경우
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // App Password 사용 권장
  },
  // 또는 SMTP 서버 설정
  // host: process.env.SMTP_HOST,
  // port: parseInt(process.env.SMTP_PORT || '587'),
  // secure: false,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASSWORD,
  // },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@canny.com",
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`이메일 발송 성공: ${options.to}`);
  } catch (error) {
    console.error("이메일 발송 실패:", error);
    throw new Error("이메일 발송에 실패했습니다.");
  }
}

export function generatePasswordResetEmail(
  name: string,
  resetToken: string,
): { html: string; text: string } {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>비밀번호 재설정 - Canny</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Canny</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">뉴스레터 관리 플랫폼</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">안녕하세요, ${name}님!</h2>
          
          <p style="margin-bottom: 20px;">
            비밀번호 재설정을 요청하셨습니다. 아래 버튼을 클릭하여 새로운 비밀번호를 설정해주세요.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              display: inline-block;
            ">비밀번호 재설정</a>
          </div>
          
          <p style="margin-bottom: 10px; font-size: 14px; color: #666;">
            버튼이 작동하지 않는 경우, 아래 링크를 복사하여 브라우저에 붙여넣으세요:
          </p>
          <p style="word-break: break-all; font-size: 14px; color: #666; background: #e9ecef; padding: 10px; border-radius: 5px;">
            ${resetUrl}
          </p>
          
          <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
            이 링크는 1시간 후에 만료됩니다. 만약 비밀번호 재설정을 요청하지 않으셨다면, 이 이메일을 무시하셔도 됩니다.
          </p>
          
          <p style="font-size: 14px; color: #666;">
            감사합니다,<br>
            Canny 팀
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
안녕하세요, ${name}님!

비밀번호 재설정을 요청하셨습니다. 아래 링크를 클릭하여 새로운 비밀번호를 설정해주세요.

${resetUrl}

이 링크는 1시간 후에 만료됩니다. 만약 비밀번호 재설정을 요청하지 않으셨다면, 이 이메일을 무시하셔도 됩니다.

감사합니다,
Canny 팀
  `;

  return { html, text };
}

export function generateWelcomeEmail(name: string): { html: string; text: string } {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>환영합니다 - Canny</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Canny에 오신 것을 환영합니다!</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">뉴스레터 관리의 새로운 경험</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">안녕하세요, ${name}님!</h2>
          
          <p style="margin-bottom: 20px;">
            Canny 회원가입을 완료해주셔서 감사합니다. 이제 강력한 뉴스레터 관리 도구를 사용하실 수 있습니다.
          </p>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">시작하기</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>뉴스레터 템플릿 설정</li>
              <li>구독자 목록 관리</li>
              <li>발송 스케줄 설정</li>
              <li>성과 분석 확인</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/settings" style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              display: inline-block;
            ">설정 시작하기</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #666;">
            궁금한 점이 있으시면 언제든지 문의해주세요.<br>
            감사합니다,<br>
            Canny 팀
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
안녕하세요, ${name}님!

Canny 회원가입을 완료해주셔서 감사합니다. 이제 강력한 뉴스레터 관리 도구를 사용하실 수 있습니다.

시작하기:
- 뉴스레터 템플릿 설정
- 구독자 목록 관리
- 발송 스케줄 설정
- 성과 분석 확인

설정을 시작하려면 다음 링크를 방문해주세요:
${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/settings

궁금한 점이 있으시면 언제든지 문의해주세요.

감사합니다,
Canny 팀
  `;

  return { html, text };
}

export function generateEmailVerificationEmail(
  name: string,
  verificationToken: string,
): { html: string; text: string } {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>이메일 인증 - Canny</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .content {
          padding: 40px 30px;
        }
        .welcome-text {
          font-size: 18px;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .verification-box {
          background-color: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 30px 0;
          border-radius: 8px;
        }
        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px 0;
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer p {
          margin: 5px 0;
          color: #6c757d;
          font-size: 14px;
        }
        .security-note {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .security-note p {
          margin: 0;
          color: #856404;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 이메일 인증</h1>
        </div>
        <div class="content">
          <p class="welcome-text">안녕하세요, <strong>${name}</strong>님!</p>
          
          <p>Canny에 가입해 주셔서 감사합니다. 계정을 활성화하기 위해 이메일 주소를 인증해 주세요.</p>
          
          <div class="verification-box">
            <p><strong>📧 이메일 인증이 필요합니다</strong></p>
            <p>아래 버튼을 클릭하여 이메일 주소를 인증하고 모든 기능을 이용해 보세요.</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${verifyUrl}" class="btn">이메일 인증하기</a>
          </div>
          
          <p>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣어 주세요:</p>
          <p style="word-break: break-all; color: #667eea; font-size: 14px;">${verifyUrl}</p>
          
          <div class="security-note">
            <p><strong>⚠️ 보안 알림:</strong> 이 링크는 24시간 동안만 유효합니다. 만약 본인이 요청하지 않았다면 이 이메일을 무시해 주세요.</p>
          </div>
          
          <p>궁금한 사항이 있으시면 언제든 문의해 주세요!</p>
          
          <p>감사합니다.<br>
          <strong>Canny 팀</strong></p>
        </div>
        <div class="footer">
          <p>이 이메일은 Canny에서 자동으로 발송된 메일입니다.</p>
          <p>© 2024 Canny. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
안녕하세요, ${name}님!

Canny에 가입해 주셔서 감사합니다. 계정을 활성화하기 위해 이메일 주소를 인증해 주세요.

이메일 인증 링크: ${verifyUrl}

이 링크는 24시간 동안만 유효합니다. 만약 본인이 요청하지 않았다면 이 이메일을 무시해 주세요.

감사합니다.
Canny 팀
  `;

  return { html, text };
}
