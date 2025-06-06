"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface AnalysisResult {
  keywords: string[];
  sentiment: string;
  summary: string;
  relatedTopics: string[];
  timeliness: string;
  commentary: string;
}

interface NewsletterAnalysisProps {
  newsletterId: string;
}

export default function NewsletterAnalysis({ newsletterId }: NewsletterAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const analyzeNewsletter = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsletterId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "분석 중 오류가 발생했습니다.");
      }

      setAnalysis(data.analysis);
      setShowAnalysis(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석 중 오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "긍정적":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      case "부정적":
        return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  const getTimelinessColor = (timeliness: string) => {
    switch (timeliness) {
      case "높음":
        return "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400";
      case "낮음":
        return "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400";
      default:
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  return (
    <div className="mt-10">
      <div className="border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-4">콘텐츠 분석</h2>

        {!showAnalysis ? (
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-muted-foreground mb-4">
              AI를 활용하여 이 뉴스레터의 내용을 분석하고 인사이트를 얻어보세요.
            </p>
            <Button onClick={analyzeNewsletter} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>분석 중...</span>
                </span>
              ) : (
                "AI로 분석하기"
              )}
            </Button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-md">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {analysis && (
              <>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-semibold">분석 결과</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(analysis.sentiment)}`}
                    >
                      {analysis.sentiment} 콘텐츠
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">요약</h4>
                      <p className="text-sm">{analysis.summary}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        주요 키워드
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.map((keyword, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">관련 주제</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.relatedTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">시의성</h4>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTimelinessColor(analysis.timeliness)}`}
                      >
                        시의성: {analysis.timeliness}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">종합 의견</h4>
                      <p className="text-sm">{analysis.commentary}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => setShowAnalysis(false)}>
                    분석 닫기
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
