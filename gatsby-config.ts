import { GatsbyConfig } from 'gatsby';

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
require("dotenv").config({
  path: `.env`,
})

const siteUrl = process.env.URL || `https://nvimai.com`;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nvi Mai Portfolio`,
    author: {
      name: `Nvi Mai`,
      firstName: 'Nvi',
      lastName: 'Mai',
      aliasName: '',
      streetAddress: 'Canada',
      summary: `who is Nhat Vietnam ^.^, lives and works in Canada building useful things.`,
      shortBio: 'CURIOUS DEVELOPER, PASSIONATE WEB DESIGNER',
      socials: {
        github: 'https://github.com/nvimai',
        linkedin: 'https://www.linkedin.com/in/nhatmai/'
      },
      profilePictures: ['/images/nvi-emoji.png', '/images/nhat-profile.jpg'],
      highlights: ['Curious Developer', 'Passionate Web Designer'],
      emails: ['contact@nvimai.com'],
      objectives: ['Working on Front-end, Back-end, Full-stack developer those which are programming languages and frameworks: C#, ASP.net, PHP, JavaScript, SQL, WordPress, MongoDB, Express.js, React, React Native, VueJS, AngularJS, Node.JS and beyond.'],
    },
    description: `My personal portfolio website build on Gatsby ReactJS and Netlify.`,
    siteUrl: siteUrl,
    social: {
      twitter: `nvimai`,
      github: `nvimai`,
      linkedin: `nhatmai`,
      instagram: `nvimai`,
      email: `contact@nvimai.com`
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [`${__dirname}/styles`],
        }
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
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
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: {
              query: {
                site: {
                  siteMetadata: {
                    siteUrl: string
                  }
                },
                allMarkdownRemark: {
                  nodes: {
                    excerpt: string;
                    html: string;
                    fields: {
                      slug: string;
                    };
                    frontmatter: {
                      date: Date;
                    };
                  }[]
                }
              }
            }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + '/blog' + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + '/blog' + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(
                filter: { frontmatter: { categories: { eq: "blog" }}},
                sort: {frontmatter: {date: DESC}}
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Nvis Portfolio RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
  				allMarkdownRemark(
            filter: { frontmatter: { categories: { in: ["blog", "projects", "organizations"] }}},
          ) {
            nodes {
              fields {
                slug
              }
              frontmatter {
                categories
                date
                startdate
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allNodes },
        }: {
          allSitePage: {
            nodes: {
              path: string;
            }[];
          }
          allMarkdownRemark: {
            nodes: {
              html: string;
              fields: {
                slug: string;
              };
              frontmatter: {
                date: Date;
                startdate: Date;
                categories: string[];
              };
            }[]
          }
        }) => {
          const nodeMap = allNodes.reduce((acc: {
            [key: string]: {}
          }, node) => {
            const { fields: { slug }, frontmatter: { categories } } = node;
            acc[`/${categories[0]}${slug}`] = node.frontmatter;

            return acc;
          }, {})

          return allPages.map(page => {
            return { ...page, ...nodeMap[page.path] }
          })
        },
        serialize: ({ path, date, startdate }: {
          path: string;
          date: Date;
          startdate: Date;
        }) => {
          console.log(date, startdate)
          return {
            url: path,
            lastmod: date || new Date(),
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          "GOOGLE_ANALYTICS_ID",
          "GOOGLE_RECAPTCHA_SITEKEY",
          "API_ENDPOINT",
        ]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // edit below
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Defers execution of google analytics script after page load
        defer: false,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "nvimai.com",
        // defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nvi Mai Portfolio`,
        short_name: `Nvis Portfolio`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2E2E2E`,
        display: `minimal-ui`,
        // edit below
        icon: `static/images/nvi-emoji.png`,
      },
    },
  ],
}

export default config;