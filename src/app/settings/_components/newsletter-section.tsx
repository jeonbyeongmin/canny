"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 각 템플릿의 props 타입 정의

export default function NewsletterSection() {
  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground mb-1">뉴스레터 설정</h1>
        <p className="text-muted-foreground text-xs">
          이메일 템플릿을 선택하고 뉴스레터 설정을 관리하세요
        </p>
      </div>

      {/* 템플릿 선택 섹션 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">
              ✉
            </span>
            템플릿 선택
          </h2>
          <p className="text-muted-foreground text-xs mb-4">
            용도에 맞는 이메일 템플릿을 선택하고 미리보기를 확인하세요
          </p>
        </div>

        {/* 설정 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tone 설정 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-orange-100 dark:bg-orange-900/30 rounded text-orange-600 dark:text-orange-400 text-xs flex items-center justify-center">
                🎭
              </span>
              톤
            </h3>
            <RadioGroup className="flex flex-wrap gap-2" defaultValue="Neutral">
              {["Casual", "Neutral", "Formal"].map((tone) => (
                <div key={tone} className="flex items-center space-x-2">
                  <RadioGroupItem value={tone} id={`tone-${tone}`} className="sr-only peer" />
                  <Label
                    htmlFor={`tone-${tone}`}
                    className="flex items-center justify-center px-3 py-2 border border-border rounded-sm cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground text-xs font-medium"
                  >
                    {tone}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Personality 설정 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-600 dark:text-purple-400 text-xs flex items-center justify-center">
                😊
              </span>
              성격
            </h3>
            <RadioGroup className="flex flex-wrap gap-2" defaultValue="Informative">
              {["Informative", "Humorous", "Thoughtful"].map((personality) => (
                <div key={personality} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={personality}
                    id={`personality-${personality}`}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={`personality-${personality}`}
                    className="flex items-center justify-center px-3 py-2 border border-border rounded-sm cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground text-xs font-medium"
                  >
                    {personality}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* 토픽 선택 */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded text-green-600 dark:text-green-400 text-xs flex items-center justify-center">
              📝
            </span>
            주제
          </Label>
          <div className="max-w-md">
            <Select>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="주제를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">기술</SelectItem>
                <SelectItem value="business">비즈니스</SelectItem>
                <SelectItem value="lifestyle">라이프스타일</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button className="text-xs" size="sm">
            설정 저장
          </Button>
        </div>
      </div>
    </div>
  );
}
