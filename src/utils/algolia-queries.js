const escapeStringRegexp = require("escape-string-regexp");

const pagePath = `content`;
const indexName = `Excel`;

const pageQuery = `{
  pages: allGhostPost(
    filter: {
        tags: { elemMatch: { name: { eq: "Statistik" } } }
    }
) {
    edges {
      node {
        id
        title
        slug
        excerpt
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, title, slug, ...rest } }) {
    return {
        objectID: id,
        title: title,
        slug: slug,
        ...rest,
    };
}

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
];

module.exports = queries;
