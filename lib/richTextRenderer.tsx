import type { ReactNode } from "react";

type RichTextNode = {
  type?: string;
  text?: string;
  value?: string;
  url?: string;
  href?: string;
  alt?: string;
  caption?: string;
  src?: string;
  children?: RichTextNode[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  [key: string]: unknown;
};

export type RichTextClassNames = Partial<
  Record<
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "ul"
    | "ol"
    | "li"
    | "blockquote"
    | "code"
    | "code_block"
    | "link"
    | "img",
    string
  >
>;

function renderInlineText(node: RichTextNode, key: string, classes: RichTextClassNames) {
  let content: ReactNode = node.text ?? node.value ?? "";

  if (node.code) {
    content = (
      <code key={`${key}-code`} className={classes.code}>
        {content}
      </code>
    );
  }

  if (node.bold) {
    content = <strong key={`${key}-bold`}>{content}</strong>;
  }

  if (node.italic) {
    content = <em key={`${key}-italic`}>{content}</em>;
  }

  if (node.underline) {
    content = <u key={`${key}-underline`}>{content}</u>;
  }

  return <span key={key}>{content}</span>;
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return <span key={index}>{part}</span>;
  });
}

export function renderStaticMarkdown(content: string, classes: RichTextClassNames = {}) {
  const elements: ReactNode[] = [];
  const lines = content.split("\n");

  let listItems: string[] = [];
  let paragraphLines: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;
    elements.push(
      <ul key={`list-${elements.length}`} className={classes.ul ?? "list-disc pl-6"}>
        {listItems.map((item, index) => (
          <li key={index} className={classes.li}>
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    elements.push(
      <p key={`p-${elements.length}`} className={classes.p}>
        {renderInlineMarkdown(paragraphLines.join(" "))}
      </p>,
    );
    paragraphLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2).trim());
      continue;
    }

    flushList();
    flushParagraph();

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${elements.length}`} className={classes.h3}>
          {renderInlineMarkdown(trimmed.slice(4))}
        </h3>,
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${elements.length}`} className={classes.h2}>
          {renderInlineMarkdown(trimmed.slice(3))}
        </h2>,
      );
      continue;
    }

    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${elements.length}`} className={classes.h1}>
          {renderInlineMarkdown(trimmed.slice(2))}
        </h1>,
      );
      continue;
    }

    paragraphLines.push(trimmed);
  }

  flushList();
  flushParagraph();

  return elements;
}

export function renderRichText(content: unknown, classes: RichTextClassNames = {}): ReactNode {
  if (typeof content === "string") {
    return renderStaticMarkdown(content, classes);
  }

  if (!content || typeof content !== "object") return null;

  const asNode = content as RichTextNode & { children?: RichTextNode[] };

  const nodes = Array.isArray(asNode.children)
    ? asNode.children
    : Array.isArray(content)
      ? (content as RichTextNode[])
      : asNode.type
        ? [asNode]
        : [];

  const renderNode = (node: RichTextNode, key: string): ReactNode => {
    if (!node) return null;

    if (typeof node.text === "string" || typeof node.value === "string") {
      return renderInlineText(node, key, classes);
    }

    const children = Array.isArray(node.children)
      ? node.children.map((child, index) => renderNode(child, `${key}-${index}`))
      : null;

    switch (node.type) {
      case "root":
        return <>{children}</>;
      case "p":
      case "paragraph":
        return (
          <p key={key} className={classes.p}>
            {children}
          </p>
        );
      case "h1":
        return (
          <h1 key={key} className={classes.h1}>
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 key={key} className={classes.h2}>
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 key={key} className={classes.h3}>
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 key={key} className={classes.h4}>
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5 key={key} className={classes.h5}>
            {children}
          </h5>
        );
      case "h6":
        return (
          <h6 key={key} className={classes.h6}>
            {children}
          </h6>
        );
      case "ul":
        return (
          <ul key={key} className={classes.ul}>
            {children}
          </ul>
        );
      case "ol":
        return (
          <ol key={key} className={classes.ol}>
            {children}
          </ol>
        );
      case "li":
        return (
          <li key={key} className={classes.li}>
            {children}
          </li>
        );
      case "blockquote":
        return (
          <blockquote key={key} className={classes.blockquote}>
            {children}
          </blockquote>
        );
      case "code_block":
      case "codeblock":
        return (
          <pre key={key} className={classes.code_block}>
            <code>{children}</code>
          </pre>
        );
      case "link":
        return (
          <a key={key} href={node.url ?? node.href ?? "#"} className={classes.link}>
            {children}
          </a>
        );
      case "img":
      case "image": {
        const src = node.url ?? node.src ?? "";
        if (!src) return null;
        return (
          <img key={key} src={src} alt={node.alt ?? ""} className={classes.img} />
        );
      }
      default:
        return children;
    }
  };

  return (
    <>
      {nodes.map((node, index) => renderNode(node, `${index}`))}
    </>
  );
}
