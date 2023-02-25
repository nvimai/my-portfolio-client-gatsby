/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const projectPost = path.resolve(`./src/templates/project-post.jsx`)
const organizationPost = path.resolve(`./src/templates/organization-post.jsx`)
const blogPost = path.resolve(`./src/templates/blog-post.jsx`)

const categoryVariables = ['blog', 'organizations', 'projects'];
const components = (type) => {
  switch(type) {
    case categoryVariables[0]: return blogPost
    case categoryVariables[1]: return organizationPost
    case categoryVariables[2]: return projectPost
    default: return blogPost
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const results = {};

  await Promise.all(
    categoryVariables.map(async (type) => {
      // Get all markdown blog posts sorted by date
      const result = await graphql(`
        query ($type: String) {
          allMarkdownRemark(
            sort: { frontmatter: { date: DESC } },
            limit: 1000,
            filter: { frontmatter: { categories: { eq: $type } } }
          ) {
            nodes {
              id
              fields {
                slug
              }
              frontmatter {
                title
                categories
                date
              }
            }
          }
        }
      `, { type });

      if (result.errors) {
        reporter.panicOnBuild(
          `There was an error loading your blog posts`,
          result.errors
        )
        return
      }
      results[type] = result;
    })
  );

  categoryVariables.forEach((type) => {
    const posts = results[type].data.allMarkdownRemark.nodes;
      
    posts.forEach((post, index) => {
      const previousId = index === 0 ? null : posts[index - 1].id
      const nextId = index === posts.length - 1 ? null : posts[index + 1].id
      createPage({
        path: `/${type}${post.fields.slug}`,
        component: components(type),
        context: {
          id: post.id,
          slug: post.fields.slug,
          previousId,
          nextId,
        },
      })
      return;
    });
  });
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      firstName: String
      lastName: String
      aliasName: String
      streetAddress: String
      summary: String
      shortBio: String
      profilePictures: [String],
      highlights: [String],
      emails: [String],
      objectives: [String],
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
