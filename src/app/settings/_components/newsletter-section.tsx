import React from "react";

export default function NewsletterSection() {
  return (
    <div className="flex flex-col  py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Customize your newsletter
          </p>
        </div>

        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Tone
        </h3>
        <div className="flex flex-wrap gap-3 p-4">
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Casual
            <input type="radio" className="invisible absolute" name="tone" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Neutral
            <input type="radio" className="invisible absolute" name="tone" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Formal
            <input type="radio" className="invisible absolute" name="tone" />
          </label>
        </div>

        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Personality
        </h3>
        <div className="flex flex-wrap gap-3 p-4">
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Informative
            <input type="radio" className="invisible absolute" name="personality" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Humorous
            <input type="radio" className="invisible absolute" name="personality" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Thoughtful
            <input type="radio" className="invisible absolute" name="personality" />
          </label>
        </div>

        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Topics
        </h3>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal">
              <option value="one">Select a topic</option>
              <option value="two">two</option>
              <option value="three">three</option>
            </select>
          </label>
        </div>

        <div className="flex px-4 py-3 justify-end">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
