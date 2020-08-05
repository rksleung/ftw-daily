import React from 'react';
//import styled from 'styled-components';
import classNames from 'classnames';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import { NamedLink } from '../../components';

import css from './Breadcrumb.css';

//import { baselineBreakpoint } from '../config';
//import { Ol, Li, Link } from '../components';

// NOTE: custom font size
//const Item = styled(Li)`
//`;

const CrumbLi = props => {
  const { path, label, linkProps } = props;
  return (
    <li>
      {path ? (
        <NamedLink {...linkProps}>
          {label}
        </NamedLink>        
      ) : (
        label
      )}
    </li>
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
  const { className, rootClassName, links, ...rest } = props;
  const classes = classNames(rootClassName || css.root, className);
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
            <ol>
              {links.map(link => (
                <CrumbLi key={link.label} {...link} />
              ))}
            </ol>
            <script type="application/ld+json">{ldJson}</script>
          </nav>
        );
      }}
    />
  );
};

export default Breadcrumb;
