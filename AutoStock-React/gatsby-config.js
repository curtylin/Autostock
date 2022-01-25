module.exports = {
  siteMetadata: {
    title: `AutoStock`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    { 
      resolve: `gatsby-source-firebase-collections`,
      options: {},
      appConfig: {
        apiKey: 'AIzaSyAE4N61Ipw7s7HZEJ_e0t_GVVtlhuWsff0',
        authDomain: 'autostock-fef22.firebaseapp.com',
        databaseURL: 'https://autostock-fef22.firebaseio.com',
        projectId: 'autostock-fef22',
        storageBucket: 'autostock-fef22.appspot.com',
        messagingSenderId: '507308167136',
        appID: '1:507308167136:web:5476d8a59822d82baae585',
      },
        types: [
          {
            type: `algorithm`,
            collection: `algorithms`,
            map: (doc) => ({
              action: doc.action,
              comparator: doc.comparator,
              indicator: doc.indicator,
              name: doc.name,
              period1: doc.period1,
              period2: doc.period2,
              public: doc.public,
              ticker: doc.ticker,
              user___NODE: doc.users.id,
            }),
          },
          {
            type: `User`,
            collection: `users`,
            map: (doc) => ({
              username: doc.username,
              algorithm___NODE: doc.algorithms.map((algorithm) => algorithm.id),
            }),
          },
          {
            type: `Competition`,
            collection: `competitions`,
            map: (doc) => ({
              closeDate: doc.closeDate,
              description: doc.description,
              duration: doc.duration,
              name: doc.name,
              startingBalance: doc.startingBalance,
              ticker: doc.ticker,
              competitor___NODE: doc.competitors.map((competitor) => competitor.id),
            }),
          },
          {
            type: `Competitor`,
            collection: `competitors`,
            map: (doc) => ({
              competition___NODE: doc.competitions.map((competition) => competition.id),
              algorithm___NODE: doc.algorithms.map((algorithm) => algorithm.id),
            }),
          },
        ],
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
