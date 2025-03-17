import{x as c}from"./lit-element-B-NARBzP.js";const e=({disabled:a,type:u="text"})=>c`
    <input type=${u} placeholder="Type here..." ?disabled=${a} />
  `,b={title:"Form/Inputs",tags:["autodocs"],render:a=>e(a),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}},type:{control:"select",options:["text","number","email","password","url","tel","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}}}},t={args:{disabled:!0}};var s,r,o,l,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  disabled,
  type = 'text'
}: SoliasInputProps) => {
  return html\`
    <input type=\${type} placeholder="Type here..." ?disabled=\${disabled} />
  \`;
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source},description:{story:"This is a native input that uses TailwindCSS styles",...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.description}}};var d,i,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(p=(i=t.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const y=["SoliasNativeInput","inputDisabled"];export{e as SoliasNativeInput,y as __namedExportsOrder,b as default,t as inputDisabled};
