import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Documentation",
  description: "Documentation for AndroidIDE.",
};

export default function Docs() {
  return (
    <>
      <main className="bg-base-200 p-8 md:p-16 flex flex-col items-stretch">
        <h1 className="text-2xl">Documentation for AndroidIDE</h1>
        <p className="mt-2 mb-4 opacity-60">
          AndroidIDE is a IDE for Android. Build Android Apps on your phone.
        </p>
        <div className="max-w-lg">
          <DocumentationCollapsible />
        </div>
      </main>
      <Footer />
    </>
  );
}

async function DocumentationCollapsible({ drawerManualToggle }) {
  let documentations;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/documentations`,
      { next: { revalidate: 0 } }
    );
    documentations = await response.json();
  } catch {
    documentations = [];
  }

  return (
    <div className="w-full rounded-md flex flex-col items-stretch gap-[1px] overflow-hidden">
      {documentations &&
        documentations.length > 0 &&
        documentations.map(({ title, directPage, to, subItems }, pos) => (
          <DocumentationCollapsibleItem
            key={pos}
            id={pos}
            title={title}
            directPage={directPage}
            to={to}
            subItems={subItems}
            drawerManualToggle={drawerManualToggle}
          />
        ))}
    </div>
  );
}

function DocumentationCollapsibleItem({
  id,
  title,
  directPage,
  to,
  subItems,
  drawerManualToggle,
}) {
  return (
    <div
      className="collapse bg-base-100 md:hover:bg-base-300 transition duration-300"
      tabIndex={id}
    >
      {directPage ? (
        <Link
          href={`/documentation${to}`}
          className="collapse-title"
          onClick={drawerManualToggle}
        >
          {title}
        </Link>
      ) : (
        <>
          <input type="checkbox" />
          <div className="collapse-title">{title}</div>
          <ul className="collapse-content">
            {subItems.map((item, pos) => (
              <DocumentationCollapsibleSubItem
                key={pos}
                parent={title}
                title={item.title}
                to={item.to}
                drawerManualToggle={drawerManualToggle}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function DocumentationCollapsibleSubItem({
  parent,
  title,
  to,
  drawerManualToggle,
}) {
  return (
    <li className="w-full pl-2">
      <Link
        href={`/documentation/${parent
          .toLowerCase()
          .replaceAll(" ", "-")}${to}`}
        className="btn btn-sm btn-ghost no-animation w-full text-xs font-normal normal-case items-center justify-start"
        onClick={drawerManualToggle}
      >
        {title}
      </Link>
    </li>
  );
}
