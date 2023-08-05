import { load } from "outstatic/server";

// interface Posts{
//   title: string;
//   publishedAt: string
//   slug : string;
//   coverImage: string;
//   description: string;
//   tags: string[]
// }

export const metadata = {
  title: "outstatic cms ",
  description: "outstatic",
};

export default async function Index() {
  // const { allPosts } = await getData()
  // console.log("all posts", allPosts)
  const posts = await getData();
  console.log("all posts", posts);
  if (posts.allPosts !== undefined) {
    return posts?.map((_post, i) => (
      <h1 key={i} className="text-4xl">Hello</h1>
    ));
  }
}

async function getData() {
  const db = await load();

  // const page = await db
  //   .find({ collection: 'pages', slug: 'about-us' }, ['content'])
  //   .first()
  //
  // const content = await markdownToHtml(page.content)

  const allPosts = await db
    .find({ collection: "posts" }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
      "tags",
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    allPosts,
  };
}
