import{x as i}from"./lit-element-B-NARBzP.js";const e=({disabled:r})=>i`
<input type="range" ?disabled=${r} value="60" />
  `,c={title:"Form/Range",tags:["autodocs"],render:r=>e(r),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}}}},a={args:{disabled:!0}};var s,t,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  disabled
}: SoliasRangeProps) => {
  return html\`
<input type="range" ?disabled=\${disabled} value="60" />
  \`;
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var n,d,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const p=["SoliasNativeRange","rangeDisabled"];export{e as SoliasNativeRange,p as __namedExportsOrder,c as default,a as rangeDisabled};
