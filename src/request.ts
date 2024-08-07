export async function getClassFile(url: string) {
  const completionUrl = url.startsWith('//') ? `https:${url}` : url
  return fetch(completionUrl).then(res => res.text())
}
