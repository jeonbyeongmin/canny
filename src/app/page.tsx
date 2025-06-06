import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    // 인증된 사용자를 위한 대시보드
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div className="relative flex min-h-[320px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded items-center justify-center p-4">
                <div className="relative z-10 flex flex-col gap-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
                    환영합니다, {user.name}님!
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    개인화된 뉴스레터 경험을 시작하세요. 관심 있는 주제를 설정하고, 사이트를
                    리뷰하며, GPT와 통합하여 더욱 풍부한 뉴스 경험을 만들어보세요.
                  </p>
                  <div className="pt-2 flex gap-4 justify-center">
                    <Button asChild>
                      <Link href="/settings">설정 시작하기</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/newsletters">뉴스레터 보기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 빠른 시작 카드들 */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="tracking-light text-[28px] font-bold leading-tight">빠른 시작</h2>
                <p className="text-base font-normal leading-normal max-w-[720px]">
                  Newsify를 최대한 활용하기 위한 첫 단계들입니다.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              <div className="flex flex-col gap-4 rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">계정 설정</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  프로필을 완성하고 관심사를 설정하여 개인화된 뉴스를 받아보세요.
                </p>
                <Button variant="outline" size="sm" asChild className="mt-2">
                  <Link href="/settings">설정하기</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-4 rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">GPT 연동</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  개인 GPT를 연동하여 뉴스 요약, 분석, 맞춤형 인사이트를 받아보세요.
                </p>
                <Button variant="outline" size="sm" asChild className="mt-2">
                  <Link href="/settings?tab=gpt">연동하기</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-4 rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">뉴스레터 구독</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  관심 있는 뉴스 소스를 선택하고 개인화된 뉴스레터를 구독하세요.
                </p>
                <Button variant="outline" size="sm" asChild className="mt-2">
                  <Link href="/settings?tab=newsletter">구독하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 비인증 사용자를 위한 랜딩 페이지
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div className="relative flex min-h-[480px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded items-center justify-center p-4 overflow-hidden">
              {/* Simple AI Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
                {/* Floating orbs */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-glow"></div>
                  <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-glow animation-delay-75"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-glow animation-delay-150"></div>
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
              {/* Content */}
              <div className="relative z-10 flex flex-col gap-6 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-medium leading-tight tracking-tight">
                  Your Personalized Newsletter Experience
                </h1>
                <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  Discover a new way to stay informed with Newsify. Customize your news feed, review
                  sites, and integrate with your personal GPT for a truly unique experience.
                </p>
                <div className="pt-2">
                  <Button
                    className="bg-white text-slate-900 hover:bg-white/90 px-8 py-3 font-medium"
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className=" tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Key Features
              </h1>
              <p className=" text-base font-normal leading-normal max-w-[720px]">
                Explore the powerful features that make Newsify the ultimate newsletter platform.
              </p>
            </div>
            <Button className="w-fit">
              <span className="truncate">Learn More</span>
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
            <div className="flex flex-1 gap-3 rounded border  p-4 flex-col">
              <div className="" data-icon="Gear" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className=" text-base font-bold leading-tight">Customization</h2>
                <p className="text-muted-foreground text-sm font-normal leading-normal">
                  Tailor your news feed to match your interests. Select topics, sources, and
                  keywords to receive the news that matters most to you.
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded border  p-4 flex-col">
              <div className="" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className=" text-base font-bold leading-tight">Site Review</h2>
                <p className="text-muted-foreground text-sm font-normal leading-normal">
                  Easily review and rate news sites to help improve the quality of your feed. Share
                  your feedback with the community.
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded border  p-4 flex-col">
              <div className="" data-icon="Robot" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className=" text-base font-bold leading-tight">GPT Integration</h2>
                <p className="text-muted-foreground text-sm font-normal leading-normal">
                  Integrate your personal GPT to summarize articles, answer questions, and provide
                  deeper insights into the news.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="@container">
          <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                Ready to Dive In?
              </h1>
              <p className="text-base font-normal leading-normal ">
                Sign up today and start exploring the world of personalized news with Newsify.
              </p>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/signup">
                    <span className="truncate">Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
