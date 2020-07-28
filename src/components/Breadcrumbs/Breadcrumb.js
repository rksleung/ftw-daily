import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, withPrefix } from 'gatsby';

import { baselineBreakpoint } from '../config';
import { Ol, Li, Link } from '../components';

// NOTE: custom font size
const Item = styled(Li)`
`;

const CrumbLi = props => {
  const { path, label } = props;
  return (
    <Item>
      {path ? (
        <Link neutral to={path}>
          {label}
        </Link>
      ) : (
        label
      )}
    </Item>
  );
};

const query = graphql`
  query SiteUrlQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

const Breadcrumb = props => {
  const { links, ...rest } = props;
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteUrl } = data.site.siteMetadata;

        // Structured metadata for the breadcrumb
        //
        // See: https://developers.google.com/search/docs/data-types/breadcrumb
        const ldJson = JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: links.map((link, i) => {
            const { path, label } = link;
            return {
              '@type': 'ListItem',
              position: i + 1,
              name: label,
              item: `${siteUrl}${withPrefix(path)}`,
            };
          }),
        });

        return (
          <nav {...rest}>
            <Ol>
              {links.map(link => (
                <CrumbLi key={link.label} {...link} />
              ))}
            </Ol>
            <script type="application/ld+json">{ldJson}</script>
          </nav>
        );
      }}
    />
  );
};

export default Breadcrumb;
