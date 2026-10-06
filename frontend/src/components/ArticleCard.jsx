export default function ArticleCard({ article, onClick }) {
  return (
    <div className="info-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div style={{ fontSize: "1.4rem" }}>{article.icon || "\uD83D\uDCC4"}</div>
      <p style={{ fontWeight: 600 }}>{article.title}</p>
      <p className="subtitle">{article.meta} · {article.region}</p>
    </div>
  );
}
