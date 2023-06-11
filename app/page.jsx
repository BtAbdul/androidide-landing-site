import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-base-200 min-h-screen flex flex-col items-stretch">
      <Header />
      <Features />
      <Stats />
      <Review />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <div className="py-8 flex flex-col md:flex-row items-center justify-center gap-4">
      <Mockup />
      <HeaderHero />
    </div>
  );
}

function Mockup() {
  return (
    <div className="flex-1 flex">
      <div className="mockup-phone md:mx-0 md:ml-auto rounded-2xl">
        <div className="camera !w-[25%] opacity-0"></div>
        <div className="display mt-0 !rounded-md">
          <div className="artboard artboard-demo phone-1 !h-auto min-h-[661px]">
            <ScreenshotCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenshotCarousel() {
  const screenshots = [
    {
      id: 1,
      uri: "https://images2.imgbox.com/c8/56/n23t5mup_o.png",
      next: 2,
      prev: 6,
    },
    {
      id: 2,
      uri: "https://images2.imgbox.com/7b/d5/DBKstmnQ_o.png",
      next: 3,
      prev: 1,
    },
    {
      id: 3,
      uri: "https://images2.imgbox.com/20/d6/a3jO40E8_o.png",
      next: 4,
      prev: 2,
    },
    {
      id: 4,
      uri: "https://images2.imgbox.com/9e/ba/GBZHrBfR_o.png",
      next: 5,
      prev: 3,
    },
    {
      id: 5,
      uri: "https://images2.imgbox.com/65/06/ZlLbg1ad_o.png",
      next: 6,
      prev: 4,
    },
    {
      id: 6,
      uri: "https://images2.imgbox.com/89/f9/J33LUzzr_o.png",
      next: 1,
      prev: 5,
    },
  ];

  return (
    <div className="w-fit carousel rounded-box">
      {screenshots.map(({ id, uri, next, prev }) => (
        <ScreenshotCarouselItem
          key={id}
          id={id}
          imgUri={uri}
          next={next}
          prev={prev}
        />
      ))}
    </div>
  );
}

function ScreenshotCarouselItem({ id, imgUri, next, prev }) {
  return (
    <div id={`screenshot${id}`} className="carousel-item relative w-fit">
      <img
        src={imgUri}
        className="w-full object-contain object-center"
        alt={`screenshot-preview-${id}`}
        loading={id === 1 ? "eager" : "lazy"}
      />
      <div className="hidden md:flex justify-between absolute transform -translate-y-1/2 left-2 right-2 top-1/2">
        <a href={`#screenshot${prev}`} className="btn btn-ghost btn-circle">
          ❮
        </a>
        <a href={`#screenshot${next}`} className="btn btn-ghost btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}

function HeaderHero() {
  return (
    <div className="flex-1 px-5 py-8 md:p-4 text-center md:text-left">
      <div className="flex flex-col justify-center items-center md:items-start gap-4 max-w-[400px]">
        <h2 className="text-wider | text-4xl font-bold tracking-wide">
          AndroidIDE
        </h2>
        <p className="text-lg mb-2">
          Build real, Gradle-based Android applications on Android devices
        </p>
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/documentation/getting-started`}
          className="btn btn-primary"
        >
          getting started
        </Link>
      </div>
    </div>
  );
}

async function Features() {
  // test
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/features`,
    { next: { revalidate: 0 } }
  );
  const features = await response.json();
  return (
    <section className="bg-base-100 p-8">
      <h2 className="text-wider | text-4xl text-center font-bold tracking-wide py-8">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features &&
          features.map(({ id, img, title, desc }) => (
            <FeatureItems key={id} imgUri={img} title={title} desc={desc} />
          ))}
      </div>
    </section>
  );
}

function FeatureItems({ imgUri, title, desc }) {
  return (
    <div className="card bg-base-200 shadow">
      <figure className="px-10 pt-10">
        <img
          src={imgUri}
          alt="feature-screenshot"
          className="rounded-xl w-full max-h-[200px] object-cover object-top"
          loading="lazy"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    {
      id: 1,
      title: "Downloads",
      value: "26.4k",
    },
    {
      id: 2,
      title: "Stars",
      value: "900+",
    },
    {
      id: 3,
      title: "Latest Version",
      value: "2.4.1-beta",
    },
  ];
  return (
    <section className="bg-base-200 p-16 flex flex-col items-center gap-8">
      <div className="stats stats-vertical lg:stats-horizontal bg-transparent">
        {stats.map(({ id, icon, title, value }) => (
          <StatItem key={id} icon={icon} title={title} value={value} />
        ))}
      </div>
      <p className="text-center text-lg px-2 md:max-w-[500px]">
        Join the vibrant AndroidIDE community on Telegram today and connect with
        like-minded developers from around the world!
      </p>
      <a
        className="btn btn-secondary"
        href="https://t.me/androidide_discussions"
        target="_blank"
      >
        join community
      </a>
    </section>
  );
}

function StatItem({ icon, title, value }) {
  return (
    <div className="stat place-items-center gap-0 cursor-pointer hover:text-secondary">
      <div className="material-symbols-rounded notranslate text-normal | stat-figure text-secondary">
        {icon}
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

async function Review() {
  // test
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`,
    { next: { revalidate: 0 } }
  );
  const reviews = await response.json();
  return (
    <section className="py-24">
      <div className="flex items-start space-x-4 items-start w-full w-full p-4 mx-auto overflow-x-scroll">
        {reviews.map(({ id, quotes, photo, name, professions }) => (
          <div key={id} className="carousel-item w-fit relative">
            <ReviewCard
              quotes={quotes}
              photo={photo}
              name={name}
              professions={professions}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ quotes, photo, name, professions }) {
  return (
    <div className="w-full max-w-[400px] h-full card bg-base-300">
      <div className="card-body">
        <blockquote>"{quotes}"</blockquote>
      </div>
      <div className="card-action | px-6 pb-4 flex flex-row gap-4 items-center">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={photo} alt={`${name}.png`} loading="lazy" />
          </div>
        </div>
        <div>
          <h4 className="text-lg md:text-xl tracking-wide">{name}</h4>
          <p className="italic text-slate-400 text-xs">
            {professions.join(", ")}.
          </p>
        </div>
      </div>
    </div>
  );
}
