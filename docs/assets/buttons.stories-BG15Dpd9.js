import{x as L}from"./lit-element-B-NARBzP.js";const e=({disabled:n,variant:x,size:D,outlined:j})=>L`
    <button
      class=${["solias-btn",`solias-btn--${x||"primary"}${j?"--outlined":""}`,`solias-btn--${D||"md"}`].join(" ")}
      ?disabled=${n}
    >
      Button
    </button>
  `,_={title:"Buttons/Button",tags:["autodocs"],render:n=>e(n),argTypes:{disabled:{control:"boolean",name:"Disabled",table:{defaultValue:{summary:"false"}}},variant:{control:"select",name:"Button Variant",options:["primary","secondary","success","error"],table:{defaultValue:{summary:"primary"}}},size:{control:"select",name:"Button Size",options:["sm","md","lg"],table:{defaultValue:{summary:"md"}}},outlined:{control:"boolean",name:"Outlined Button",table:{defaultValue:{summary:"false"}}}}},a={args:{variant:"secondary"}},t={args:{size:"sm"}},s={args:{size:"lg"}},r={args:{disabled:!0}},o={args:{outlined:!0}};var u,l,i;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`({
  disabled,
  variant,
  size,
  outlined
}: SoliasButtonProps) => {
  return html\`
    <button
      class=\${["solias-btn", \`solias-btn--\${variant || "primary"}\${outlined ? "--outlined" : ""}\`, \`solias-btn--\${size || "md"}\`].join(" ")}
      ?disabled=\${disabled}
    >
      Button
    </button>
  \`;
}`,...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,c,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: "secondary"
  }
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var b,p,g;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    size: "sm"
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var y,S,B;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    size: "lg"
  }
}`,...(B=(S=s.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var $,f,z;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(z=(f=r.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var v,V,O;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    outlined: true
  }
}`,...(O=(V=o.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};const h=["SoliasNativeButton","buttonSecondary","buttonSmall","buttonLarge","buttonDisabled","buttonOutlined"];export{e as SoliasNativeButton,h as __namedExportsOrder,r as buttonDisabled,s as buttonLarge,o as buttonOutlined,a as buttonSecondary,t as buttonSmall,_ as default};
