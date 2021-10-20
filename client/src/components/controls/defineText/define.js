import React from 'react';
import reactStringReplace from 'react-string-replace';
import glossary from '../../../data/glossary.json';
import './define.scss';

// This component
export default function Define({ children }) {
  console.log(children);

  // replaces terms within html with <attr> elements, which contain the definition
  // as a part of their title attribute
  function defineTerms(component) {
    // determine if children are an array of components or string (inner HTML value)
    if (typeof component.props.children == 'object') {
      const newChildren = component.props.children.map((child) => {
        if (typeof child == 'string') {
          // if child is a string then parse for definition
          return glossary
            .sort((a, b) => b.term.length - a.term.length)
            .map((record) => {
              // join all regular expressions if needed
              const match =
                '\\b(' + (record.regexp || [record.term]).join('|') + ')\\b';

              // ensure we don't define terms within tags
              const regexp = new RegExp(
                match + '(?![^<]*>|[^<abbr>]*</)',
                'ig'
              );

              // show term and definition in title
              const title = [record.term, record.definition].join(': ');

              const newHTML = reactStringReplace(child, regexp, (value) => (
                <abbr title={title}>{value}</abbr>
              ));
              if (newHTML != child) return newHTML;
            });
        } else {
          // if child is a component then recurseively call it
          return defineTerms(child);
        }
      });
      console.log('multi new', newChildren);
      return {
        ...component,
        props: { ...component.props, children: newChildren },
      };
    } else {
      if (component.props['define-terms']) {
        const newChild = glossary
          .sort((a, b) => b.term.length - a.term.length)
          .map((record) => {
            // join all regular expressions if needed
            const match =
              '\\b(' + (record.regexp || [record.term]).join('|') + ')\\b';

            // ensure we don't define terms within tags
            const regexp = new RegExp(match + '(?![^<]*>|[^<>]*</)', 'ig');

            // show term and definition in title
            const title = [record.term, record.definition].join(': ');

            const newHTML = reactStringReplace(
              component.props.children,
              regexp,
              (value) => <abbr title={title}>{value}</abbr>
            );
            if (newHTML != component.props.children) return newHTML;
          });
        const newComp = {
          ...component,
          props: {
            ...component.props,
            children: newChild,
          },
        };
        console.log('new single', newComp);
        return newComp;
      } else {
        console.log('old single', component);
        return component;
      }
    }
  }

  return (
    <>
      {children.map((child) =>
        child.props['define-terms'] ? defineTerms(child) : child
      )}
    </>
  );
}
