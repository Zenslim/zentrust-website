import fs from 'fs'
import path from 'path'

export type BlogPost = {
  title: string
  excerpt: string
  author?: string
  date?: string
  primaryCategory?: string
  categories?: string[]
  tags?: string[]
  category?: string
  heroImage?: string
  slug: string
  body?: string
  _sys?: { filename: string }
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

type FrontMatterParseResult = {
  data: Record<string, any>
  content: string
}

function parseFrontMatter(fileContent: string): FrontMatterParseResult {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/
  const match = fileContent.match(frontMatterRegex)

  if (!match) {
    return { data: {}, content: fileContent }
  }

  const rawFrontMatter = match[1]
  const content = fileContent.slice(match[0].length)

  const data: Record<string, any> = {}
  let currentArrayKey: string | null = null

  rawFrontMatter.split(/\r?\n/).forEach((line) => {
    const arrayItem = line.match(/^\s*-\s*(.*)$/)
    if (arrayItem && currentArrayKey) {
      data[currentArrayKey] = data[currentArrayKey] || []
      data[currentArrayKey].push(arrayItem[1])
      return
    }

    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (keyValue) {
      const [, key, value] = keyValue
      if (value) {
        data[key] = value
        currentArrayKey = null
      } else {
        data[key] = []
        currentArrayKey = key
      }
    }
  })

  return { data, content }
}

function getBlogFiles() {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

function parseBlogFile(file: string): BlogPost {
  const slug = file.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  const { data, content } = parseFrontMatter(raw)

  return {
    title: (data.title as string) ?? slug,
    excerpt: (data.excerpt as string) ?? content.slice(0, 160),
    author: data.author,
    date: data.date,
    primaryCategory: data.primaryCategory,
    categories: data.categories,
    tags: data.tags,
    category: data.category,
    heroImage: data.heroImage,
    slug,
    body: content,
    _sys: { filename: slug },
  } as BlogPost
}

export function getAllBlogPosts(): BlogPost[] {
  const files = getBlogFiles()
  if (!files.length) return []

  return files
    .map(parseBlogFile)
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit)
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return (
    posts.find(
      (post) => post.slug === slug || post._sys?.filename === slug
    ) ?? null
  )
}
