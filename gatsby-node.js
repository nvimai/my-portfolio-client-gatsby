const axios = require('axios');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// create a function to get the data from 'endpoint'
const get = endpoint => axios.get(`${process.env.API_ENDPOINT}/${endpoint}`);

const getProfiles = (profiles) => {
  Promise.all(
    profiles.map(async name => {
      const { data: pokemon } = await get(`/pokemon/${name}`);
      const abilities = await Promise.all(
        pokemon.abilities.map(async ({ ability: { name: abilityName } }) => {
          const { data: ability } = await get(`/ability/${abilityName}`);

          return ability;
        })
      );

      return { ...pokemon, abilities };
    })
  );
  axios.get(`${process.env.API_ENDPOINT}/profiles`)
    .then((res) => {
      console.log(res);
      if (res.data) {
        let profile = res.data.profiles[0];
        this.setState({
          firstName: profile.firstName,
          lastName: profile.lastName,
          aliasName: profile.aliasName,
          streetAddress: profile.streetAddress,
          shortBio: profile.shortBio,
          socials: profile.socials,
          profilePictures: profile.profilePictures,
          highlights: profile.highlights,
          emails: profile.emails,
          objectives: profile.objectives,
        })
      } else {
        console.log(res);
      }
    });
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
  const projectPost = path.resolve(`./src/templates/project-post.jsx`)
  const organizationPost = path.resolve(`./src/templates/organization-post.jsx`)
  
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                categories
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      // const previous = index === posts.length - 1 ? null : posts[index + 1].node
      // const next = index === 0 ? null : posts[index - 1].node
      if (post.node.frontmatter.categories && post.node.frontmatter.categories.includes('projects')) {
        createPage({
          path: `projects${post.node.fields.slug}`,
          component: projectPost,
          context: {
            slug: post.node.fields.slug,
            // previous,
            // next,
          },
        })
      } else {
        if (post.node.frontmatter.categories && post.node.frontmatter.categories.includes('organizations')) {
          createPage({
            path: `organizations${post.node.fields.slug}`,
            component: organizationPost,
            context: {
              slug: post.node.fields.slug,
              // previous,
              // next,
            },
          })
        } else {
          createPage({
            path: `blogs${post.node.fields.slug}`,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              // previous,
              // next,
            },
          })
        }
      }
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
