export default function parseMention(
  str,
  formatAsAnchor = true,
  mentionPrefix = ["@", "{@}", "#", "{#}"],
  href = { "@": "/home/detail/", "#": "/home?hashtag=" },
) {
  if (!str) return str;
  const reg = new RegExp(
    `(${mentionPrefix.join("|")})\\[([^\\]]+)\\]\\(key:([^)]+)\\)`,
    "g",
  );
  return str.replace(reg, (match, prefix, display, id) => {
    const formatPrefix = prefix.replace("{", "").replace("}", "");
    const tId = formatPrefix === "@" ? id.split("|")[1] : id;
    const hrefWithKey = `${href[formatPrefix]}${tId}`;

    if (!formatAsAnchor) return `${formatPrefix}${display}`;
    return `<a href="${hrefWithKey}" style="color:#016DB2">${formatPrefix}${display}</a>`;
  });
}
