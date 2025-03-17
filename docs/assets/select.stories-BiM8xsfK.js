import{x as p}from"./lit-element-B-NARBzP.js";const o=({disabled:a})=>p`
<select ?disabled=${a}>
    <option selected disabled>Choose a city</option>
    <option value="cmb">Colombo</option>
    <option value="kgl">Kurunegala</option>
    <option value="knd">Kandy</option>
    <option value="jfn">Jaffna</option>
    <option value="amp">Ampara</option>
    <option value="gll">Galle</option>
</select>
  `,c={title:"Form/Select",tags:["autodocs"],render:a=>o(a),argTypes:{disabled:{control:"boolean",table:{defaultValue:{summary:"false"}}}}},e={args:{disabled:!0}};var t,n,l;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`({
  disabled
}: SoliasSelectProps) => {
  return html\`
<select ?disabled=\${disabled}>
    <option selected disabled>Choose a city</option>
    <option value="cmb">Colombo</option>
    <option value="kgl">Kurunegala</option>
    <option value="knd">Kandy</option>
    <option value="jfn">Jaffna</option>
    <option value="amp">Ampara</option>
    <option value="gll">Galle</option>
</select>
  \`;
}`,...(l=(n=o.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var s,i,r;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};const u=["SoliasNativeSelect","selectDisabled"];export{o as SoliasNativeSelect,u as __namedExportsOrder,c as default,e as selectDisabled};
