import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { kebabCase } from "../utils/helpers"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 itemProp="headline" style={{ marginBottom: `0.3em` }}>
            {post.frontmatter.title}
          </h2>
          {/* <p>{post.frontmatter.date}</p> */}
        </header>
        {post.frontmatter.tags.map(tag => {
          return (
            <Link
              to={`/categories/${kebabCase(tag)}`}
              className="post-list-item-tag"
              key={Math.random()}
            >
              #{tag}
            </Link>
          )
        })}
        <hr />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer></footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.frontmatter.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $id } }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        description
        slug
      }
      html
    }
    previous: markdownRemark(frontmatter: { slug: { eq: $previousPostId } }) {
      frontmatter {
        slug
        title
      }
    }
    next: markdownRemark(frontmatter: { slug: { eq: $nextPostId } }) {
      frontmatter {
        slug
        title
      }
    }
  }
`
