import Link from "next/link";

interface GPArticle {
  slug: string;
  title: string;
  source: string;
  date: string;
  thumbnail: string;
}

interface Props {
  flag: string;
  gp: string;
  fullDate: string;
  articles: GPArticle[];
}

export function NextGPArticles({ flag, gp, fullDate, articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-card rounded-[16px] max-md:rounded-[14px] p-5 max-md:p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-[24px]">{flag}</span>
        <div>
          <h2 className="text-[16px] max-md:text-[15px] font-extrabold text-t1">
            {gp} 기사 모음
          </h2>
          <p className="text-[12px] text-t4">{fullDate}</p>
        </div>
      </div>
      {articles.map((article, i) => (
        <Link key={article.slug} href={`/news/${article.slug}`}>
          <div
            className={`flex gap-3 py-3 ${i < articles.length - 1 ? "border-b border-bdr" : ""}`}
          >
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-[72px] h-[54px] shrink-0 rounded-[8px] object-cover"
              />
            ) : (
              <div className="w-[72px] h-[54px] shrink-0 rounded-[8px] bg-gradient-to-br from-[#333] to-[#555]" />
            )}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <p className="text-[13px] max-md:text-[12px] font-semibold text-t1 leading-[1.3] line-clamp-2">
                {article.title}
              </p>
              <p className="text-[11px] text-t4 mt-0.5">
                {article.source} · {article.date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
