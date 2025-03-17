import{x as c}from"./lit-element-B-NARBzP.js";const e=({disabled:r})=>c`
<textarea rows="4" placeholder="Write a comment here..." ?disabled=${r}></textarea>
  `,m={title:"Form/Textarea",tags:["autodocs"],render:r=>e(r),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}}}},a={args:{disabled:!0}};var t,s,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`({
  disabled
}: SoliasTextareaProps) => {
  return html\`
<textarea rows="4" placeholder="Write a comment here..." ?disabled=\${disabled}></textarea>
  \`;
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var d,l,n;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(n=(l=a.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const p=["SoliasNativeTextarea","textareaDisabled"];export{e as SoliasNativeTextarea,p as __namedExportsOrder,m as default,a as textareaDisabled};
