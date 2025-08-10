"use strict";(self.webpackChunkasia_payment=self.webpackChunkasia_payment||[]).push([[6192],{6192:(e,t,i)=>{i.r(t),i.d(t,{AppKitModal:()=>ye,W3mModal:()=>ge,W3mModalBase:()=>ve});var o=i(7022),a=i(8117),r=i(6440),n=i(3264),s=i(2661),c=i(6132),l=i(7321),w=i(5015),d=i(6496),u=i(1139),p=i(7994);const m={isUnsupportedChainView:()=>"UnsupportedChain"===u.I.state.view||"SwitchNetwork"===u.I.state.view&&u.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView())return void c.W.shake();await p.U.isSIWXCloseDisabled()?c.W.shake():c.W.close()}};var h=i(6141),v=i(7258),g=i(4657),y=i(282),f=i(9446),b=i(7845);const k=o.AH`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`;var x=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let C=class extends o.WF{render(){return o.qy`<slot></slot>`}};C.styles=[f.W5,k],C=x([(0,b.E)("wui-card")],C);i(4107);var S=i(3542);i(1446),i(7836),i(2574);const W=o.AH`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;var q=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let I=class extends o.WF{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`\n      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});\n   `,o.qy`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){S.h.close()}};I.styles=[f.W5,W],q([(0,a.MZ)()],I.prototype,"message",void 0),q([(0,a.MZ)()],I.prototype,"backgroundColor",void 0),q([(0,a.MZ)()],I.prototype,"iconColor",void 0),q([(0,a.MZ)()],I.prototype,"icon",void 0),I=q([(0,b.E)("wui-alertbar")],I);const N=o.AH`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;var R=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};const A={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}};let E=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.open=S.h.state.open,this.onOpen(!0),this.unsubscribe.push(S.h.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t}=S.h.state,i=A[t];return o.qy`
      <wui-alertbar
        message=${e}
        backgroundColor=${null===i||void 0===i?void 0:i.backgroundColor}
        iconColor=${null===i||void 0===i?void 0:i.iconColor}
        icon=${null===i||void 0===i?void 0:i.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};E.styles=N,R([(0,a.wk)()],E.prototype,"open",void 0),E=R([(0,y.EM)("w3m-alertbar")],E);var O=i(595),T=i(1348),$=i(6596),P=i(9323);const D=o.AH`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;var H=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let j=class extends o.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){const e="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",t="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`\n    --local-border-radius: var(${e});\n    --local-padding: var(${t});\n`,o.qy`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};j.styles=[f.W5,f.fD,f.ck,D],H([(0,a.MZ)()],j.prototype,"size",void 0),H([(0,a.MZ)({type:Boolean})],j.prototype,"disabled",void 0),H([(0,a.MZ)()],j.prototype,"icon",void 0),H([(0,a.MZ)()],j.prototype,"iconColor",void 0),j=H([(0,b.E)("wui-icon-link")],j);i(1056),i(702);const M=o.AH`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var B=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let L=class extends o.WF{constructor(){super(...arguments),this.imageSrc=""}render(){return o.qy`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?o.qy`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:o.qy`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};L.styles=[f.W5,f.fD,f.ck,M],B([(0,a.MZ)()],L.prototype,"imageSrc",void 0),L=B([(0,b.E)("wui-select")],L);i(9319),i(4875);var z=i(1391);const U=o.AH`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var K=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};const X=["SmartSessionList"];function F(){var e,t,i,o;const a=null===(e=u.I.state.data)||void 0===e||null===(e=e.connector)||void 0===e?void 0:e.name,r=null===(t=u.I.state.data)||void 0===t||null===(t=t.wallet)||void 0===t?void 0:t.name,n=null===(i=u.I.state.data)||void 0===i||null===(i=i.network)||void 0===i?void 0:i.name,s=null!==r&&void 0!==r?r:a,c=w.a.getConnectors();return{Connect:`Connect ${1===c.length&&"w3m-email"===(null===(o=c[0])||void 0===o?void 0:o.id)?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:null!==s&&void 0!==s?s:"Connect Wallet",ConnectingWalletConnect:null!==s&&void 0!==s?s:"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:s?`Get ${s}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",Profile:void 0,SwitchNetwork:null!==n&&void 0!==n?n:"Switch Network",SwitchAddress:"Switch Address",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:O.U.state.socialProvider?O.U.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in progress"}}let Z=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.heading=F()[u.I.state.view],this.network=l.W.state.activeCaipNetwork,this.networkImage=T.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=u.I.state.view,this.viewDirection="",this.headerText=F()[u.I.state.view],this.unsubscribe.push($.j.subscribeNetworkImages(()=>{this.networkImage=T.$.getNetworkImage(this.network)}),u.I.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.headerText=F()[e]},z.o.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),l.W.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=T.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.qy`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){P.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),u.I.push("WhatIsAWallet")}async onClose(){await m.safeClose()}rightHeaderTemplate(){var e;const t=null===s.H||void 0===s.H||null===(e=s.H.state)||void 0===e||null===(e=e.features)||void 0===e?void 0:e.smartSessions;return"Account"===u.I.state.view&&t?o.qy`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>u.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return o.qy`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){const e=X.includes(this.view);return o.qy`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e?o.qy`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){const{view:e}=u.I.state,t="Connect"===e,i=s.H.state.enableEmbedded,a="ApproveTransaction"===e,n="ConnectingSiwe"===e,c="Account"===e,l=s.H.state.enableNetworkSwitch,w=a||n||t&&i;var d;return c&&l?o.qy`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,r.J)(null===(d=this.network)||void 0===d?void 0:d.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,r.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!w?o.qy`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:o.qy`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(P.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),u.I.push("Networks"))}isAllowedNetworkSwitch(){const e=l.W.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=null===e||void 0===e?void 0:e.find(e=>{var t;let{id:i}=e;return i===(null===(t=this.network)||void 0===t?void 0:t.id)});return t||!i}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){const{history:e}=u.I.state;let t=z.o.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=z.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){var e;const{history:t}=u.I.state,i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#dynamic");t.length>1&&!this.showBack&&i?(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):t.length<=1&&this.showBack&&i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){u.I.goBack()}};Z.styles=U,K([(0,a.wk)()],Z.prototype,"heading",void 0),K([(0,a.wk)()],Z.prototype,"network",void 0),K([(0,a.wk)()],Z.prototype,"networkImage",void 0),K([(0,a.wk)()],Z.prototype,"showBack",void 0),K([(0,a.wk)()],Z.prototype,"prevHistoryLength",void 0),K([(0,a.wk)()],Z.prototype,"view",void 0),K([(0,a.wk)()],Z.prototype,"viewDirection",void 0),K([(0,a.wk)()],Z.prototype,"headerText",void 0),Z=K([(0,y.EM)("w3m-header")],Z);i(3723);const V=o.AH`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;var Y=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let _=class extends o.WF{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return o.qy`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?o.qy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?o.qy`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:o.qy`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};_.styles=[f.W5,V],Y([(0,a.MZ)()],_.prototype,"backgroundColor",void 0),Y([(0,a.MZ)()],_.prototype,"iconColor",void 0),Y([(0,a.MZ)()],_.prototype,"icon",void 0),Y([(0,a.MZ)()],_.prototype,"message",void 0),Y([(0,a.MZ)()],_.prototype,"loading",void 0),Y([(0,a.MZ)()],_.prototype,"iconType",void 0),_=Y([(0,b.E)("wui-snackbar")],_);const G=o.AH`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var J=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};const Q={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}};let ee=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=v.P.state.open,this.unsubscribe.push(v.P.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){var e;const{message:t,variant:i,svg:a}=v.P.state,r=Q[i],{icon:n,iconColor:s}=null!==(e=null!==a&&void 0!==a?a:r)&&void 0!==e?e:{};return o.qy`
      <wui-snackbar
        message=${t}
        backgroundColor=${null===r||void 0===r?void 0:r.backgroundColor}
        iconColor=${s}
        icon=${n}
        .loading=${"loading"===i}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),v.P.state.autoClose&&(this.timeout=setTimeout(()=>v.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};ee.styles=G,J([(0,a.wk)()],ee.prototype,"open",void 0),ee=J([(0,y.EM)("w3m-snackbar")],ee);var te=i(8993),ie=i(4463),oe=i(8882);const ae=(0,te.BX)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),re={state:ae,subscribe:e=>(0,te.B1)(ae,()=>e(ae)),subscribeKey:(e,t)=>(0,ie.u$)(ae,e,t),showTooltip(e){let{message:t,triggerRect:i,variant:o}=e;ae.open=!0,ae.message=t,ae.triggerRect=i,ae.variant=o},hide(){ae.open=!1,ae.message="",ae.triggerRect={width:0,height:0,top:0,left:0}}},ne=(0,oe.X)(re);i(477);const se=o.AH`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var ce=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let le=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.open=ne.state.open,this.message=ne.state.message,this.triggerRect=ne.state.triggerRect,this.variant=ne.state.variant,this.unsubscribe.push(ne.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;const e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${e}px;\n    --w3m-tooltip-left: ${t}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?"flex":"none"};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,o.qy`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};le.styles=[se],ce([(0,a.wk)()],le.prototype,"open",void 0),ce([(0,a.wk)()],le.prototype,"message",void 0),ce([(0,a.wk)()],le.prototype,"triggerRect",void 0),ce([(0,a.wk)()],le.prototype,"variant",void 0),le=ce([(0,y.EM)("w3m-tooltip"),(0,y.EM)("w3m-tooltip")],le);const we=o.AH`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;var de=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ue=class extends o.WF{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=u.I.state.view,this.viewDirection="",this.unsubscribe.push(u.I.subscribeKey("view",e=>this.onViewChange(e)))}firstUpdated(){var e;this.resizeObserver=new ResizeObserver(e=>{let[t]=e;const i=`${null===t||void 0===t?void 0:t.contentRect.height}px`;"0px"!==this.prevHeight&&(this.style.setProperty("--prev-height",this.prevHeight),this.style.setProperty("--new-height",i),this.style.animation="w3m-view-height 150ms forwards ease",this.style.height="auto"),setTimeout(()=>{this.prevHeight=i,this.style.animation="unset"},z.o.ANIMATION_DURATIONS.ModalHeight)}),null===(e=this.resizeObserver)||void 0===e||e.observe(this.getWrapper())}disconnectedCallback(){var e;null===(e=this.resizeObserver)||void 0===e||e.unobserve(this.getWrapper()),this.unsubscribe.forEach(e=>e())}render(){return o.qy`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case"AccountSettings":return o.qy`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return o.qy`<w3m-account-view></w3m-account-view>`;case"AllWallets":return o.qy`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return o.qy`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return o.qy`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return o.qy`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return o.qy`<w3m-connect-view></w3m-connect-view>`;case"Create":return o.qy`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return o.qy`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return o.qy`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return o.qy`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return o.qy`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return o.qy`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return o.qy`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return o.qy`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return o.qy`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return o.qy`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return o.qy`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return o.qy`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return o.qy`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return o.qy`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return o.qy`<w3m-network-switch-view></w3m-network-switch-view>`;case"Profile":return o.qy`<w3m-profile-view></w3m-profile-view>`;case"SwitchAddress":return o.qy`<w3m-switch-address-view></w3m-switch-address-view>`;case"Transactions":return o.qy`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return o.qy`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return o.qy`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return o.qy`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return o.qy`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return o.qy`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return o.qy`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return o.qy`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return o.qy`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return o.qy`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return o.qy`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return o.qy`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return o.qy`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return o.qy`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return o.qy`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return o.qy`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return o.qy`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return o.qy`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return o.qy`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return o.qy`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return o.qy`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return o.qy`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return o.qy`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return o.qy`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return o.qy`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return o.qy`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return o.qy`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return o.qy`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return o.qy`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return o.qy`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return o.qy`<w3m-pay-loading-view></w3m-pay-loading-view>`}}onViewChange(e){ne.hide();let t=z.o.VIEW_DIRECTION.Next;const{history:i}=u.I.state;i.length<this.prevHistoryLength&&(t=z.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=i.length,this.viewDirection=t,setTimeout(()=>{this.view=e},z.o.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("div")}};ue.styles=we,de([(0,a.wk)()],ue.prototype,"view",void 0),de([(0,a.wk)()],ue.prototype,"viewDirection",void 0),ue=de([(0,y.EM)("w3m-router")],ue);const pe=o.AH`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var me=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};const he="scroll-lock";class ve extends o.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=s.H.state.enableEmbedded,this.open=c.W.state.open,this.caipAddress=l.W.state.activeCaipAddress,this.caipNetwork=l.W.state.activeCaipNetwork,this.shake=c.W.state.shake,this.filterByNamespace=w.a.state.filterByNamespace,this.initializeTheming(),d.N.prefetchAnalyticsConfig(),this.unsubscribe.push(c.W.subscribeKey("open",e=>e?this.onOpen():this.onClose()),c.W.subscribeKey("shake",e=>this.shake=e),l.W.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),l.W.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),s.H.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),w.a.subscribeKey("filterByNamespace",e=>{var t;this.filterByNamespace===e||null!==(t=l.W.getAccountData(e))&&void 0!==t&&t.caipAddress||(d.N.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded)return c.W.close(),void this.prefetch();this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.style.cssText=`\n      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};\n    `,this.enableEmbedded?o.qy`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?o.qy`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return o.qy` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,r.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){await m.safeClose()}initializeTheming(){const{themeVariables:e,themeMode:t}=h.W.state,i=y.Zv.getColorTheme(t);(0,y.RF)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),v.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=he,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${he}"]`);e&&e.remove()}onAddKeyboardListener(){var e;this.abortController=new AbortController;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("wui-card");null===t||void 0===t||t.focus(),window.addEventListener("keydown",e=>{if("Escape"===e.key)this.handleClose();else if("Tab"===e.key){const{tagName:i}=e.target;!i||i.includes("W3M-")||i.includes("WUI-")||null===t||void 0===t||t.focus()}},this.abortController)}onRemoveKeyboardListener(){var e;null===(e=this.abortController)||void 0===e||e.abort(),this.abortController=void 0}async onNewAddress(e){const t=l.W.state.isSwitchingNamespace,i=g.w.getPlainAddress(e),o=t&&i;!i&&!t?c.W.close():o&&u.I.goBack(),await p.U.initializeIfEnabled(),this.caipAddress=e,l.W.setIsSwitchingNamespace(!1)}onNewNetwork(e){var t,i,o;const a=this.caipNetwork,r=null===a||void 0===a||null===(t=a.caipNetworkId)||void 0===t?void 0:t.toString(),s=null===a||void 0===a?void 0:a.chainNamespace,w=null===e||void 0===e||null===(i=e.caipNetworkId)||void 0===i?void 0:i.toString(),d=null===e||void 0===e?void 0:e.chainNamespace,p=r!==w,m=p&&!(s!==d),h=(null===a||void 0===a?void 0:a.name)===n.o.UNSUPPORTED_NETWORK_NAME,v="ConnectingExternal"===u.I.state.view,g=!(null!==(o=l.W.getAccountData(null===e||void 0===e?void 0:e.chainNamespace))&&void 0!==o&&o.caipAddress),y="UnsupportedChain"===u.I.state.view;let f=!1;c.W.state.open&&!v&&(g?p&&(f=!0):(y||m&&!h)&&(f=!0)),f&&"SIWXSignMessage"!==u.I.state.view&&u.I.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(d.N.prefetch(),d.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}ve.styles=pe,me([(0,a.MZ)({type:Boolean})],ve.prototype,"enableEmbedded",void 0),me([(0,a.wk)()],ve.prototype,"open",void 0),me([(0,a.wk)()],ve.prototype,"caipAddress",void 0),me([(0,a.wk)()],ve.prototype,"caipNetwork",void 0),me([(0,a.wk)()],ve.prototype,"shake",void 0),me([(0,a.wk)()],ve.prototype,"filterByNamespace",void 0);let ge=class extends ve{};ge=me([(0,y.EM)("w3m-modal")],ge);let ye=class extends ve{};ye=me([(0,y.EM)("appkit-modal")],ye)}}]);
//# sourceMappingURL=6192.935da18b.chunk.js.map