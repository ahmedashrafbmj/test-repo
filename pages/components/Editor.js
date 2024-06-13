/* import CodeMirror from '@uiw/react-codemirror';
import { solidity } from '@replit/codemirror-lang-solidity';
import markdown from '@codemirror/lang-markdown'

export default function Editor({result, onChange, waiting, selValue}) {
    return (
      <div className="editor max-h-[25vh] overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
        <h3 className="font-semibold text-gray-500 mb-2">Audited Report / Code</h3>
        
        <CodeMirror key='code-mirror-01'
          value={result}
          height="100%"
          width="100%"
          style={{border: "1.5px solid #d1d5db", borderRadius: "5px", overflow: "clip"}}
          minHeight="100px"
          extensions={selValue=="Generate Vulnerability Report"? [markdown] : [solidity]}
          onChange={onChange}
          readOnly={waiting}
        />
      </div>
    );
}
 */

/* import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { solidity } from '@replit/codemirror-lang-solidity';
import markdown from '@codemirror/lang-markdown';
import MarkdownIt from 'markdown-it';

export default function Editor({ result, onChange, waiting, selValue }) {
  const [markdownHtml, setMarkdownHtml] = useState('');

  const handleMarkdownConversion = (markdownCode) => {
    const md = new MarkdownIt();
    const html = md.render(markdownCode);
    setMarkdownHtml(html);
  };

  function markdown(markdownCode) {
			return {
				height: '500px',
				tab: 'write',
				content: '',
				showConvertedMarkdown: false,
				convertedContent: '',
				convertedMarkdown() {
					this.showConvertedMarkdown = true;
					this.convertedContent = marked(this.content, { sanitize: true });
				},
				convertHtmlToMarkdown() {
					turndownService = new TurndownService({
						headingStyle: 'atx',
						codeBlockStyle: 'fenced'
					});

					this.content = turndownService.turndown(markdownCode);
				}
			}
		}

  return (
    <div className="editor max-h-[25vh] overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      <h3 className="font-semibold text-gray-500 mb-2">Audited Report / Code</h3>

      {selValue === 'Generate Vulnerability Report' ? (
        <div x-html="convertedContent" class="w-full prose max-w-none prose-indigo leading-6 rounded-b-md shadow-sm border border-gray-300 p-5 bg-white overflow-y-auto"></div>
      ) : (
        <CodeMirror
          key="code-mirror-01"
          value={markdownHtml? markdownHtml: result}
          height="100%"
          width="100%"
          style={{ border: '1.5px solid #d1d5db', borderRadius: '5px', overflow: 'clip' }}
          minHeight="100px"
          extensions={[solidity]}
          onChange={(editor, data, value) => {
            markdown(value); // Convert markdown to HTML when the code changes
          }}
          readOnly={waiting}
        />
      )}
    </div>
  );
} */

import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { solidity } from "@replit/codemirror-lang-solidity";
import MarkdownIt from "markdown-it";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

export default function Editor({ result, onChange, waiting, selValue }) {
  const [markdownCode, setMarkdownCode] = useState("");
  const [markdownHtml, setMarkdownHtml] = useState("");

  useEffect(() => {
    if (selValue === "Generate Vulnerability Report") {
      if (result !== "// Please be patient, this may take a while...") {
        console.log(result );
        setMarkdownCode(result);
        handleMarkdownConversion();
      }
    }
  }, [result]);

  const handleMarkdownConversion = () => {
    const md = new MarkdownIt();
    const html = md.render(markdownCode);
    setMarkdownHtml(html);
    console.log(html);
  };

  return (
    <div className="editor max-h-[25vh] overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      <h3 className="font-semibold text-gray-500 mb-2">
        Audited Report / Code
      </h3>

      {markdownCode ? (
        <ReactMarkdown remarkPlugins={[gfm]}>{markdownCode}</ReactMarkdown>
      ) : (
        <CodeMirror
          key="code-mirror-01"
          value={result}
          height="100%"
          width="100%"
          style={{
            border: "1.5px solid #d1d5db",
            borderRadius: "5px",
            overflow: "clip",
          }}
          minHeight="100px"
          extensions={[solidity]}
          onChange={onChange}
          readOnly={waiting}
        />
      )}
    </div>
  );
}
