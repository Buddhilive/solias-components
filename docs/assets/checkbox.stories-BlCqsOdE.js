import{x as g}from"./lit-element-B-NARBzP.js";const e=({disabled:s,checked:x})=>g`
<input type="checkbox" ?disabled=${s} ?checked=${x} />
  `,S={title:"Form/Checkbox",tags:["autodocs"],render:s=>e(s),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}},checked:{control:"boolean",table:{defaultValue:{summary:"false"}}}}},r={args:{disabled:!0}},a={args:{checked:!0}},c={args:{disabled:!0,checked:!0}};var o,d,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  disabled,
  checked
}: SoliasCheckboxProps) => {
  return html\`
<input type="checkbox" ?disabled=\${disabled} ?checked=\${checked} />
  \`;
}`,...(t=(d=e.parameters)==null?void 0:d.docs)==null?void 0:t.source}}};var n,l,u;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var i,b,h;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    checked: true
  }
}`,...(h=(b=a.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var m,k,p;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    disabled: true,
    checked: true
  }
}`,...(p=(k=c.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};const f=["SoliasNativeCheckbox","checkboxDisabled","checkboxChecked","checkboxCheckedDisabled"];export{e as SoliasNativeCheckbox,f as __namedExportsOrder,a as checkboxChecked,c as checkboxCheckedDisabled,r as checkboxDisabled,S as default};
