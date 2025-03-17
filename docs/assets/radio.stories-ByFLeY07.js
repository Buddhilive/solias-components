import{x as S}from"./lit-element-B-NARBzP.js";const e=({disabled:d,checked:g})=>S`
    <input type="radio" ?disabled=${d} ?checked=${g} />
  `,y={title:"Form/Radio",tags:["autodocs"],render:d=>e(d),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}},checked:{control:"boolean",table:{defaultValue:{summary:"false"}}}}},a={args:{disabled:!0}},r={args:{checked:!0}},s={args:{disabled:!0,checked:!0}};var o,c,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  disabled,
  checked
}: SoliasRadioProps) => {
  return html\`
    <input type="radio" ?disabled=\${disabled} ?checked=\${checked} />
  \`;
}`,...(t=(c=e.parameters)==null?void 0:c.docs)==null?void 0:t.source}}};var i,n,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(l=(n=a.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var u,m,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    checked: true
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var b,h,k;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    disabled: true,
    checked: true
  }
}`,...(k=(h=s.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};const C=["SoliasNativeRadio","radioDisabled","radioChecked","radioCheckedDisabled"];export{e as SoliasNativeRadio,C as __namedExportsOrder,y as default,r as radioChecked,s as radioCheckedDisabled,a as radioDisabled};
