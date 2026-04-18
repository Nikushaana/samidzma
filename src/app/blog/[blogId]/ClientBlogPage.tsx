"use client";

import React, { useMemo } from "react";
import BlogsBackgroundDesigns from "@/app/components/decorationColumns/BlogsBackgroundDesigns";
import EverySlider from "@/app/components/sliders/EverySlider";
import useBlog from "../../../../dataFetchs/blogContext";

export default function ClientBlogPage({ oneBlogData }: any) {
  const { blogData, blogLoader } = useBlog();

  const { html, headings } = useMemo(() => {
    if (!oneBlogData?.description2) {
      return { html: "", headings: [] as any };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(oneBlogData.description2, "text/html");

    const extracted: any = [];

    doc.querySelectorAll("h2").forEach((el, index) => {
      const id = `h2-${index}`;
      el.setAttribute("id", id);

      extracted.push({
        id,
        text: el.textContent || "",
      });
    });

    return {
      html: doc.body.innerHTML,
      headings: extracted,
    };
  }, [oneBlogData]);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!oneBlogData) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[70px] relative">
        <div className="flex flex-col gap-y-[40px]">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <h1 className="text-[14px]">თეგი: </h1>
            <h1
              style={{ background: oneBlogData?.blogs_category?.color }}
              className="text-[12px] px-[10px] h-[26px] flex items-center rounded-full"
            >
              {oneBlogData?.blogs_category.name}
            </h1>
          </div>

          <div className="flex gap-[50px]">
            <div className="shrink-0 max-sm:hidden">
              <div className="flex flex-col gap-y-[10px] sticky top-[20px]">
                <h2 className="text-[16px] font-semibold mb-[10px]">
                  ქვესათაური
                </h2>

                {headings.map((h: any) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    className="text-left text-[14px] text-gray-600 hover:text-black transition"
                  >
                    {h.text}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>

        <div className="rounded-[12px] bg-[#EAEDEE] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0 relative">
          <BlogsBackgroundDesigns />

          <EverySlider
            data={blogData}
            loader={blogLoader}
            title={<h1 className="text-[28px] max-sm:text-[22px]">ბლოგები</h1>}
            card="BlogCard"
            slidesPerView={4}
            spaceBetween={20}
            showButtons={true}
          />
        </div>
      </div>
    </div>
  );
}
