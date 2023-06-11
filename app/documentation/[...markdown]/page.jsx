import Footer from "@/components/Footer";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./page.module.css";

export const metadata = {
  title: "Documentation",
  description: "Guide for using AndroidIDE.",
};

export default async function DocMarkdown({ params: { markdown } }) {
  let markdownString;
  try {
    const markdownPath = `${process.env.NEXT_PUBLIC_DOCS_URL}/${markdown.join(
      "/"
    )}.md`;
    const res = await fetch(markdownPath, { next: { revalidate: 0 } });
    markdownString = await res.text();
  } catch {
    markdownString = "";
  }
  return (
    <>
      <main className="bg-base-200 min-h-[60%] flex flex-col md:flex-row items-stretch">
        <div
          className={`w-full max-w-[100%] md:max-w-2xl p-8 overflow-x-scroll ${styles.markdown}`}
        >
          <ReactMarkdown
            children={markdownString}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-semibold" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold" {...props} />
              ),
              a: ({ node, ...props }) => <a className="link" {...props} />,
              sup: ({ node, ...props }) => (
                <sup className="text-xs -top-[0.75rem] hidden" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-base-300 p-1 text-sm rounded" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <div className="mockup-code w-full min-w-0 pr-4 before:hidden">
                  <pre className="pb-0 px-4 before:hidden">
                    <code {...props} />
                  </pre>
                </div>
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} style={{ all: "revert" }} />
              ),
              li: ({ node, ...props }) => (
                <li {...props} style={{ all: "revert" }} />
              ),
              table: ({ node, ...props }) => (
                <table className="!table !table-compact !w-full" {...props} />
              ),
              tr: ({ node, ...props }) => <tr className="!hover" {...props} />,
              th: ({ node, ...props }) => (
                <th className="table-head" {...props} />
              ),
            }}
          />
        </div>
        <div>ads</div>
      </main>
      <Footer />
    </>
  );
}
