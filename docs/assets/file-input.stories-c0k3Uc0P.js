import{x as n}from"./lit-element-B-NARBzP.js";const e=({disabled:r})=>n`
<input type="file" ?disabled=${r} />
  `,c={title:"Form/File Upload",tags:["autodocs"],render:r=>e(r),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}}}},a={args:{disabled:!0}};var s,o,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  disabled
}: SoliasFileUploadProps) => {
  return html\`
<input type="file" ?disabled=\${disabled} />
  \`;
}`,...(l=(o=e.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var t,d,i;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(i=(d=a.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};const u=["SoliasNativeFileUpload","fileUploadDisabled"];export{e as SoliasNativeFileUpload,u as __namedExportsOrder,c as default,a as fileUploadDisabled};
