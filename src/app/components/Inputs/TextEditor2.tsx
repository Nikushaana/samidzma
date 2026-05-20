"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { axiosAdmin } from "../../../../dataFetchs/AxiosToken";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";

export default function TextEditor2({
  firstValue,
  name,
  setAllValues,
  title,
  error,
}: any) {
  const editorRef = useRef<any>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    if (!isMediaOpen) return;

    axiosAdmin
      .get("admin/gallery")
      .then((res) => {
        setImages(res.data.data || []);
      })
      .catch((err) => {});
  }, [isMediaOpen]);

  const insertImage = (url: string) => {
    editorRef.current?.insertContent(`
    <div class="img-wrapper" data-align="left">
      
      <div class="img-inner">
        <img src="${url}" />
      </div>

    </div>
  `);

    setIsMediaOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}

      <Editor
        apiKey="06sl44lhsk6j5qdwizjqaz36wu1wgdp0lfu30nzcilx1p59h"
        initialValue={firstValue || ""}
        onInit={(_evt: any, editor: any) => (editorRef.current = editor)}
        onEditorChange={(content: string) => {
          setAllValues((prev: any) => ({
            ...prev,
            [name]: content,
          }));
        }}
        init={{
          height: 600,
          menubar: false,
          branding: false,

          plugins: ["image", "media", "link", "table", "lists"],

          toolbar:
            "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | mediaWidget | codeWidget",

          block_formats:
            "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6",

          valid_elements: "*[*]",
          extended_valid_elements:
            "iframe[src|frameborder|style|scrolling|class|width|height|name|align],div[*]",

          // ✅ styles for widget states
          content_style: `
            .code-widget.empty {
              padding: 16px;
              border: 2px dashed #ccc;
              border-radius: 12px;
              text-align: center;
              cursor: pointer;
            }

            .code-widget:not(.empty) {
              border: none;
              padding: 0;
            }

            .code-widget {
              margin: 10px 0;
              position: relative;
            }

.code-widget::after {
  content: "Edit";
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 12px;
  opacity: 0.6;
  pointer-events: none;
}

            .img-wrapper {
  position: relative;
  display: flex;
  margin: 10px 0;
}

.img-wrapper img {
  max-width: 100%;
  height: auto;
  display: block;
}

.img-wrapper[data-align="left"] {
  justify-content: flex-start;
}

.img-wrapper[data-align="center"] {
  justify-content: center;
}

.img-wrapper[data-align="right"] {
  justify-content: flex-end;
}

.img-toolbar {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  gap: 4px;
  background: rgba(0,0,0,0.75);
  padding: 4px;
  border-radius: 6px;
}

.img-toolbar button {
  font-size: 10px;
  padding: 2px 6px;
  border: none;
  cursor: pointer;
  background: #333;
  color: white;
  border-radius: 4px;
}
          `,
          setup: (editor: any) => {
            // ✅ helper (scoped to editor)
            const removeAllToolbars = () => {
              editor
                .getBody()
                .querySelectorAll(".img-toolbar")
                .forEach((t: any) => t.remove());
            };

            // ✅ CODE WIDGET BUTTON
            editor.ui.registry.addButton("codeWidget", {
              text: "Code Block",
              onAction: () => {
                editor.insertContent(`
                  <div class="code-widget empty" contenteditable="false" data-code="">
                    👉 Click to add code
                  </div>
                `);
              },
            });

            // ✅ CLICK HANDLER
            editor.on("click", (e: any) => {
              const widget = e.target.closest(".code-widget");
              if (!widget) return;

              const currentCode = widget.getAttribute("data-code") || "";

              editor.windowManager.open({
                title: "Code Embed Editor",
                size: "large",
                body: {
                  type: "panel",
                  items: [
                    {
                      type: "textarea",
                      name: "code",
                      label: "Paste custom code to embed on your site.",
                    },
                  ],
                },
                initialData: {
                  code: currentCode,
                },
                buttons: [
                  { type: "cancel", text: "Cancel" },
                  { type: "submit", text: "Save", primary: true },
                ],
                onSubmit: (api: any) => {
                  const data = api.getData();

                  widget.setAttribute("data-code", data.code);

                  if (data.code) {
                    widget.classList.remove("empty");

                    widget.innerHTML = `
  <div class="code-widget-inner">
    ${data.code}
  </div>
`;
                  } else {
                    widget.classList.add("empty");
                    widget.innerHTML = "👉 Click to add code";
                  }

                  api.close();
                },
              });
            });

            editor.ui.registry.addButton("mediaWidget", {
              text: "Media",
              onAction: () => {
                setIsMediaOpen(true);
              },
            });

            editor.on("click", (e: any) => {
              const imgWrapper = e.target.closest(".img-wrapper");

              removeAllToolbars();

              if (!imgWrapper) return;

              // ❗ NEW: ensure real image exists
              const realImg = imgWrapper.querySelector("img");
              if (!realImg) return;

              e.preventDefault();

              const toolbar = document.createElement("div");
              toolbar.className = "img-toolbar";

              const makeBtn = (align: string) => {
                const btn = document.createElement("button");
                btn.innerText = align;

                btn.onclick = (ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();

                  imgWrapper.setAttribute("data-align", align.toLowerCase());
                  removeAllToolbars();
                };

                return btn;
              };

              toolbar.appendChild(makeBtn("Left"));
              toolbar.appendChild(makeBtn("Center"));
              toolbar.appendChild(makeBtn("Right"));

              imgWrapper.appendChild(toolbar);
            });

            editor.on("NodeChange", () => {
              setTimeout(() => {
                const body = editor.getBody();

                body
                  .querySelectorAll(".img-wrapper")
                  .forEach((wrapper: any) => {
                    const img = wrapper.querySelector("img");

                    // ❗ if wrapper has no image → remove toolbar
                    if (!img) {
                      wrapper
                        .querySelectorAll(".img-toolbar")
                        .forEach((t: any) => t.remove());
                    }
                  });
              }, 0);
            });
          },
        }}
      />

      <div
        className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-md:px-[25px] ${
          isMediaOpen
            ? "z-[18] opacity-1 duration-100"
            : "z-[-20] opacity-0 duration-150"
        }`}
      >
        <div
          onClick={() => {
            setIsMediaOpen(false);
          }}
          className={`bg-[#0000003b] w-full h-full absolute z-[-1] duration-100 ${
            isMediaOpen ? "backdrop-blur-[5px] " : "backdrop-blur-none"
          }`}
        ></div>
        <div
          className={`max-w-[1920px] min-h-[555px] max-h-[90vh] w-full bg-[#EAEDEE] p-[16px] flex flex-col gap-[16px] rounded-[12px] relative`}
        >
          <div
            onClick={() => {
              setIsMediaOpen(false);
            }}
            className="self-end cursor-pointer bg-gray-100 hover:bg-gray-200 duration-100 w-[30px] h-[30px] flex items-center justify-center rounded-[10px] absolute top-[8px] right-[8px] z-1"
          >
            <BsXLg />
          </div>
          <div className="overflow-y-scroll notshowScrollVert grid grid-cols-4 gap-3 max-sm:grid-cols-2">
            {images.map((img: any, i: number) => (
              <div
                key={img.id}
                onClick={() =>
                  insertImage(
                    `${process.env.NEXT_PUBLIC_API_URL}/${img?.image}`,
                  )
                }
                className="relative w-full aspect-video overflow-hidden cursor-pointer"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${img?.image}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
