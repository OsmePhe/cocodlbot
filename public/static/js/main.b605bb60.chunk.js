(this.webpackJsonpfront_bot=this.webpackJsonpfront_bot||[]).push([[0],{22:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(33),r=n.n(s),i=(n(44),n(45),n(46),n(12)),o=n(2),l=n(10),d=n(11),j=n(8),h=n(14),b=n(15),u=(n(22),n(13)),m=(n(47),n(0)),O=function(e){var t=e.home;return Object(m.jsx)("div",{id:"cartoucheContainer",children:Object(m.jsx)("div",{children:Object(m.jsxs)("div",{className:"page-header header-cartouche",children:[Object(m.jsx)("div",{className:"col-sm-10",children:Object(m.jsx)("img",{className:"imgLogo","data-key":"",src:t?"../logo.png":"../../logo.png",alt:"cocodlbot"})})," ",Object(m.jsxs)("div",{className:"headerAccueil",children:[!t&&Object(m.jsx)(u.a,{variant:"secondary",children:Object(m.jsx)(i.b,{to:{pathname:"/home/"},className:"home-btn",children:"Home"})}),Object(m.jsx)(u.a,{variant:"secondary",children:"About"})]})]})})})},x=(n(57),n(58),n(37)),p=function(e){var t=e.file,n=e.fileName,a=e.urlTweet,c=Object(x.a)(),s=c.download,r=c.error;return Object(m.jsxs)("div",{className:"row",children:[Object(m.jsx)("div",{className:"col text-center",children:Object(m.jsxs)("div",{className:"btn-event",children:[Object(m.jsx)(u.a,{variant:"secondary",onClick:function(){return s(t,n)},children:"Download"}),a&&Object(m.jsx)(u.a,{variant:"secondary",onClick:function(){return window.open(a,"_blank")},children:"View original tweet"}),Object(m.jsx)(u.a,{variant:"secondary",onClick:function(){return window.open("https://twitter.com/cocodlbot/","_blank")},children:"Follow coco_bot"})]})}),r&&Object(m.jsxs)("p",{children:["possible error ",JSON.stringify(r)]})]})},v=n(24).default,f=function(e){Object(h.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={id:null,url:null},a.searchVideoFromTweet=a.searchVideoFromTweet.bind(Object(j.a)(a)),a}return Object(d.a)(n,[{key:"searchVideoFromTweet",value:function(e){var t=this;v.get("/tweet/"+e+".mp4/0",{}).then((function(e){e.data.err||e.data&&(t.setState({url:e.data.data}),console.log(e),t.setState({redirect:!0}))})).catch((function(e){console.log("login error",e)}))}},{key:"componentDidMount",value:function(){var e=this.props.location.pathname.substring(12),t=this.searchVideoFromTweet(e);this.setState({id:e}),this.setState({url:t})}},{key:"render",value:function(){var e=this.state,t=e.id,n=e.url;return Object(m.jsxs)("div",{children:[Object(m.jsx)(O,{home:!1}),Object(m.jsx)("div",{id:"mainTweetVidContainer",children:n&&Object(m.jsxs)("div",{id:"tweetVidContainer",className:"col-sm-12",children:[Object(m.jsx)("video",{width:"700",height:"400",controls:!0,children:Object(m.jsx)("source",{src:n.id_tweet,type:"video/mp4"})}),n&&Object(m.jsx)(p,{file:n.id_tweet,fileName:t+".mp4",urlTweet:this.props.history.location.state?this.props.history.location.state.url:n.expanded_url})]})})]})}}]),n}(c.a.Component),g=n(24).default,w=function(e){Object(h.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).searchQueryWord=function(e){g.get("/tweet/"+a.state.handleValue+"/1",{}).then((function(e){e.data.err||e.data&&(a.setState({dataTweet:e.data.data}),e.data.data&&a.setState({redirect:!0}))})).catch((function(e){console.log("login error",e)}))},a.state={handleValue:"",redirect:!1,tamponObjUrl:[],objUrl:[]},a.handleSearch=a.handleSearch.bind(Object(j.a)(a)),a.searchQueryWord=a.searchQueryWord.bind(Object(j.a)(a)),a.convertDate=a.convertDate.bind(Object(j.a)(a)),a}return Object(d.a)(n,[{key:"handleSearch",value:function(e){this.setState({handleValue:e.target.value}),""===e.target.value.trim()&&this.setState({redirect:!1}),e.preventDefault()}},{key:"convertDate",value:function(e){function t(e){return e<10?"0"+e:e}var n=new Date(e);return[t(n.getDate()),t(n.getMonth()+1),n.getFullYear()].join("/")}},{key:"componentDidMount",value:function(){var e=this;g.get("/tweet/",{}).then((function(t){t.data.err||t.data&&e.setState({objUrl:t.data.data,tamponObjUrl:t.data.data})})).catch((function(e){console.log("login error",e)}))}},{key:"componentDidUpdate",value:function(e,t){t.redirect!==this.state.redirect&&this.setState({tamponObjUrl:this.state.backHome||""===this.state.handleValue.trim()?this.state.objUrl:this.state.dataTweet})}},{key:"render",value:function(){var e=this.state.tamponObjUrl,t=this.convertDate;return Object(m.jsxs)("div",{id:"mainContainer",className:"text-center col-sm-12",children:[Object(m.jsxs)("div",{children:[Object(m.jsx)("br",{}),Object(m.jsx)("h1",{children:"Cocodlbot"})]}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)("div",{className:"wrap-search",children:Object(m.jsxs)("div",{className:"search-div",children:[Object(m.jsx)("input",{type:"text",className:"search-term",value:this.state.handleValue,onChange:this.handleSearch,placeholder:"What are you looking for? Use key-words"}),Object(m.jsx)("button",{type:"submit",className:"searchButton",onClick:this.searchQueryWord,children:Object(m.jsx)("i",{className:"fa fa-search"})})]})}),Object(m.jsx)("br",{}),Object(m.jsx)("div",{children:Object(m.jsx)("h5",{children:"Latest downloads"})}),Object(m.jsxs)("div",{id:"divMainContainer",className:"main-container-pos col-sm-12",children:[this.props.location&&Object(m.jsx)(f,{}),!!e&&0!==e.length&&e.map((function(e,n){return Object(m.jsx)(i.b,{to:{pathname:e.url_tweet.includes(".mp4")?"/home/tweet/"+e.url_tweet.substring(0,e.url_tweet.indexOf(".mp4")):e.url_tweet,state:{url:e.expanded_url,urlTweet:e.id_tweet}},className:"disp-card",children:Object(m.jsx)("div",{id:"tweetVidContainer"+n,className:"col-sm-12","data-key":n,children:Object(m.jsx)("div",{id:"tweetVid"+n,children:Object(m.jsxs)("div",{className:"card",children:[Object(m.jsxs)("div",{className:"card_image",children:[" ",Object(m.jsx)("img",{src:e.thumbnail,alt:"cocodlbot"})," "]})," ",Object(m.jsxs)("div",{className:"card_title title-white",children:[Object(m.jsxs)("h5",{children:["Mise en ligne par ",Object(m.jsx)("b",{children:e.user_info.substring(e.user_info.lastIndexOf("%")+1).trim()})]}),Object(m.jsxs)("h5",{children:["Le ",Object(m.jsx)("b",{children:t(e.user_info.substring(0,e.user_info.split("").findIndex((function(e){return"%"===e}))).trim())})]})]})]})})},n)})}))]})]})}}]),n}(c.a.Component),y=function(e){e.dataTwitTwittos;return Object(m.jsx)("div",{})},N=(n(77),function(e){var t=e.sendApply;return Object(m.jsx)("footer",{className:"footerContainer",children:Object(m.jsxs)("form",{onSubmit:t,method:"POST",children:[Object(m.jsx)("div",{className:"container  py-5",children:Object(m.jsxs)("div",{className:"row py-4",children:[Object(m.jsx)("div",{className:"col-lg-4 col-md-6 mb-4 mb-lg-0",children:Object(m.jsx)("p",{className:"font-italic text-muted"})}),Object(m.jsxs)("div",{className:"",children:[Object(m.jsx)("h6",{className:"text-uppercase font-weight-bold mb-4",children:"Newsletter (not functional yet)"}),Object(m.jsx)("p",{className:"text-muted mb-4",children:"If you have any comments, send them to us ! Thank you"}),Object(m.jsx)("div",{className:"p-1 rounded border",children:Object(m.jsxs)("div",{className:"input-group",children:[Object(m.jsx)("input",{type:"text",name:"comments",placeholder:"Enter your comments","aria-describedby":"button-addon1",className:"form-control border-0 shadow-0"}),Object(m.jsx)("div",{className:"input-group-append",children:Object(m.jsx)("input",{id:"sendApply",className:"btn btn-info",type:"submit"})})]})})]})]})}),Object(m.jsx)("div",{className:"footerContainer py-4",children:Object(m.jsx)("div",{className:"container text-center",children:Object(m.jsx)("p",{className:"text-muted mb-0 py-2",children:"\xa9 2022 Cocodlbot All rights reserved."})})})]})})}),k=n(39),S=(n(78),function(e){Object(h.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={dataTweet:[]},a.handleResultSearch=a.handleResultSearch.bind(Object(j.a)(a)),a.sendApply=a.sendApply.bind(Object(j.a)(a)),a}return Object(d.a)(n,[{key:"handleResultSearch",value:function(e){this.setState({dataTweet:e})}},{key:"sendApply",value:function(e){e.preventDefault(),k.a.sendForm("service_sesd4wt","template_92teviy",e.target,"CrsU2_MNNmQBFSHza").then((function(e){console.log(e.text)}),(function(e){console.log(e.text)})),e.target.reset()}},{key:"render",value:function(){return Object(m.jsxs)("div",{className:"wrapper",id:"container",children:[Object(m.jsx)(O,{home:!0}),Object(m.jsx)(y,{}),Object(m.jsx)(w,{resultSearch:this.state.dataTweet}),Object(m.jsx)("div",{id:"modalContainer"}),Object(m.jsx)(N,{sendApply:this.sendApply})]})}}]),n}(a.Component)),C=n(38),_=(n(79),function(e){return Object(C.a)(e),Object(m.jsxs)("div",{className:"mainbox",children:[Object(m.jsx)("div",{className:"err",children:"4"}),Object(m.jsx)("i",{className:"far fa-question-circle fa-spin"}),Object(m.jsx)("div",{className:"err2",children:"4"}),Object(m.jsxs)("div",{className:"msg",children:["Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?",Object(m.jsxs)("p",{children:["Let's go ",Object(m.jsx)("a",{href:"#",children:"home"})," and try from there."]})]})]})}),T=function(){return Object(m.jsxs)(o.c,{children:[Object(m.jsx)(o.a,{exact:!0,path:"/",component:S}),Object(m.jsx)(o.a,{exact:!0,path:"/home",component:S}),Object(m.jsx)(o.a,{exact:!0,path:"/home/tweet",component:S}),Object(m.jsx)(o.a,{exact:!0,path:"/home/tweet/:id",component:f}),Object(m.jsx)(o.a,{path:"*",component:_})]})},V=function(){return Object(m.jsx)(T,{})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,81)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(i.a,{children:Object(m.jsx)(V,{})})}),document.getElementById("root")),D()}},[[80,1,2]]]);
//# sourceMappingURL=main.b605bb60.chunk.js.map