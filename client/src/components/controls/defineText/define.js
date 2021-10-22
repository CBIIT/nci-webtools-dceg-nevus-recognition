import React from 'react';
import reactStringReplace from 'react-string-replace';
import glossary from '../../../data/glossary.json';
import './define.scss';

// This component
export default function Define({ children, force = false }) {
  // replaces terms within html with <attr> elements, which contain the definition
  // as a part of their title attribute
  function defineTerms(html) {
    let newHTML = html;

    glossary
      .sort((a, b) => b.term.length - a.term.length)
      .forEach((record) => {
        // join all regular expressions if needed
        const match =
          '\\b(' + (record.regexp || [record.term]).join('|') + ')\\b';

        // ensure we don't define terms within tags
        const regexp = new RegExp(match + '(?![^<]*>|[^<abbr>]*</)', 'ig');

        // show term and definition in title
        const title = [record.term, record.definition].join(': ');

        newHTML = reactStringReplace(newHTML, regexp, (value) => (
          <abbr title={title}>{value}</abbr>
        ));
      });

    return newHTML;
  }

  function parseComponents(component) {
    if (component.props && component.props.children) {
      // determine if children are an array of components or string (inner HTML value)
      if (typeof component.props.children == 'object') {
        const newChildren = component.props.children.map((child) => {
          if (typeof child == 'string') {
            // if child is a string then parse for definition
            return defineTerms(child);
          } else {
            // if child is a component then recurseively call
            return parseComponents(child);
          }
        });

        return {
          ...component,
          props: { ...component.props, children: newChildren },
        };
      } else {
        if (component.props['define-terms'] || force) {
          return {
            ...component,
            props: {
              ...component.props,
              children: defineTerms(component.props.children),
            },
          };
        } else {
          return component;
        }
      }
    } else {
      return component;
    }
  }

  return (
    <>
      {Array.isArray(children)
        ? children.map(parseComponents)
        : parseComponents(children)}
    </>
  );
}
