require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    // edit below
    title: `Nvi Mai Portfolio`,
    author: `Nvi Mai`,
    bio: `My name is Nvi, which is Nhat Vietnam ^.^`,
    description: `My personal portfolio website build on Gatsby ReactJS and Netlify.`,
    siteUrl: `https://nvimai.com`,
    social: {
      twitter: `nvimai`,
      github: `nvimai`,
      linkedin: `nhatmai`,
      instagram: `nvimai`,
      email: `contact@nvimai.com`
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-feed-mdx`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blogs`,
        name: `blogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/organizations`,
        name: `organizations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["GOOGLE_ANALYTICS_ID"]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // edit below
        trackingId: process.env.GOOGLE_ANALYTICS_ID || ``,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nvi Mai Portfolio`,
        short_name: `NviMaiPortfolio`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2E2E2E`,
        display: `minimal-ui`,
        // edit below
        icon: `static/images/nvi-emoji.png`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://nvimai.com`,
        stripQueryString: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
  ],
}
