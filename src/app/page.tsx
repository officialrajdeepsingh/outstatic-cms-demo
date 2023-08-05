import { load } from 'outstatic/server'

export default async function Index() {
  // const { allPosts } = await getData()
// console.log("all posts", allPosts)
   const posts = await getData()
  return posts.map((post) => <h1>{post.title}</h1>)

}

async function getData() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'about-us' }, ['content'])
    .first()

  // const content = await markdownToHtml(page.content)

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  return {
    allPosts,
  }
}
