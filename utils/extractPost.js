  // export function extractPostData(htmlString) {
  //   // Parse the HTML string into a DOM tree
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   // Extract the first h1 as title
  //   const title = doc.querySelector("h1")?.textContent || "Untitled";

  //   // Remove h1 from article content (optional)
  //   const h1 = doc.querySelector("h1");
  //   if (h1) h1.remove();

  //   // Get the rest of the HTML as the article body
  //   const article = doc.body.innerHTML.trim();

  //   return { title, article};
  // } 
  export function extractPostData(htmlString) {
  // Parse the HTML string into a DOM tree
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find the first heading tag (h1-h6)
  const firstHeading = doc.querySelector("h1, h2, h3, h4, h5, h6");

  // Use it as the title if found
  const title = firstHeading?.textContent?.trim() || "Untitled";

  // Remove the heading from the content
  if (firstHeading) firstHeading.remove();

  // Get the rest of the HTML as the article body
  const article = doc.body.innerHTML.trim();

  return { title, article };
}