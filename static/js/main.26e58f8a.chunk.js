(this.webpackJsonpnuzlocketracker=this.webpackJsonpnuzlocketracker||[]).push([[0],{271:function(t,e,n){},272:function(t,e,n){},330:function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i),a=n(11),s=n.n(a),r=(n(271),n.p+"static/media/logo.6ce24c58.svg"),c=(n(272),n(34)),l=n(25),u=n(36),d=n(60),h=n(102),b=n(144),v=n(342),p=n(343),j=n(346),g=n(344),m=n(255),f=n(347),O=n(345),x=n(258),k=n.n(x),y=n(257),w=n.n(y),D=n(13),C=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),i=e.call(this,t),console.log("Debug: New encounter component created:"),console.log(t),i.load=i.load.bind(Object(u.a)(i)),i.state={style:{alignItems:"center",justifyContent:"space-evenly","text-align":"center",color:"red","vertical-align":"middle"}},i}return Object(l.a)(n,[{key:"load",value:function(){var t,e,n,i,o=this;this.props.db.getOrAdd(null===(t=this.props)||void 0===t||null===(e=t.db)||void 0===e?void 0:e.db,null===(n=this.props)||void 0===n?void 0:n.title,"encounters",{title:null===(i=this.props)||void 0===i?void 0:i.title,time:null},(function(t){console.log("Updating encounter state..."),o.setState((function(e){return{title:o.props.title,time:null===t||void 0===t?void 0:t.time}}))}))}},{key:"setEncounterTime",value:function(t){this.props.db.save("encounters",{title:this.props.title,time:t}),this.load()}},{key:"componentDidMount",value:function(){this.load()}},{key:"render",value:function(){var t,e,n,i,o,a=this;return Object(D.jsxs)(f.a,{children:[Object(D.jsx)(O.a,{align:"center",width:"30%",children:Object(D.jsxs)(b.a,{children:[Object(D.jsx)("img",{src:this.props.sprite+""}),this.props.encounter.title]})}),Object(D.jsxs)(O.a,{width:"30%",align:"center",children:[Object(D.jsxs)("b",{children:["Level ",this.props.encounter.level]}),null!==(t=this.props.encounter)&&void 0!==t&&t.location?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("br",{})," ",this.props.encounter.location]}):""]}),Object(D.jsx)(O.a,{width:"40%",children:"function"==typeof(null===(e=this.state)||void 0===e||null===(n=e.time)||void 0===n?void 0:n.toLocaleTimeString)?null===(i=this.state)||void 0===i?void 0:i.time.toLocaleTimeString("en-GB",{timeZone:"UTC"}):"--:--:--"}),Object(D.jsx)(O.a,{children:(null===(o=this.state)||void 0===o?void 0:o.time)>0?Object(D.jsx)(w.a,{onClick:function(t){return a.setEncounterTime(null)}}):Object(D.jsx)(k.a,{onClick:function(t){return a.setEncounterTime(a.props.time)}})})]})}}]),n}(o.a.Component),S=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={time:i.props.data.time||new Date(0),style:{alignItems:"center",justifyContent:"space-evenly","vertical-align":"middle"}},console.log("Debug: NuzlockeTable created with props:"),console.log(t),i.timerChangeEvent=i.timerChangeEvent.bind(Object(u.a)(i)),i}return Object(l.a)(n,[{key:"timerChangeEvent",value:function(t){this.setState((function(e){return{time:t}})),this.props.autosave&&this.props.db.save("games",{title:this.props.data.title,time:this.state.time})}},{key:"resetEncounterTime",value:function(t){var e=this.state.data;e.battleencounters[t].time=null,this.setState((function(t){return{data:e}}))}},{key:"render",value:function(){var t,e,n=this;return Object(D.jsxs)(b.a,{component:v.a,textAlign:"center",sx:this.state.style,children:[Object(D.jsx)(m.a,{debug:!1,auto:!0,onTimerChange:this.timerChangeEvent,time:this.state.time}),Object(D.jsx)(p.a,{variant:"h4",children:this.props.data.title}),Object(D.jsx)(j.a,{component:v.a,children:Object(D.jsx)("table",{children:Object(D.jsx)(g.a,{children:null===(t=this.props.data)||void 0===t||null===(e=t.battleencounters)||void 0===e?void 0:e.map((function(t,e){var i=n.props.data.sprites.find((function(e){return e.name==t.opponent})).url,o=n.props.data.title+"_"+t.title;return Object(D.jsx)(C,{db:n.props.db,title:o,sprite:i,encounter:t,time:n.state.time},o)}))})})})]})}}]),n}(o.a.Component);var T=function(t){return console.log("Debug: Initial data object:"),console.log(t.data),Object(D.jsxs)("header",{className:"App-header",children:[Object(D.jsx)(S,{db:window.dbService,data:t.data,autosave:!0}),Object(D.jsx)("img",{src:r,className:"App-logo",alt:"logo"})]})},E=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,350)).then((function(e){var n=e.getCLS,i=e.getFID,o=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),i(t),o(t),a(t),s(t)}))},I=function(){function t(e){var n=this;Object(c.a)(this,t),this.successCallback=e,this.db=null,this.dbRequest=null,this.serverData=null,fetch("data/games.json").then((function(t){return t.json()})).then((function(t){n.serverData=t,n.dbRequest=window.indexedDB.open("nuzlocketracker"),n.dbRequest.onerror=function(t){alert("You have not given this page the required permissions to save local state. This page will not work correctly.")}.bind(n),n.dbRequest.onupgradeneeded=function(t){console.log("Database debug: Upgrade needed..."),this.db=t.target.result,this.db.createObjectStore("games",{keyPath:"title"}),this.db.createObjectStore("encounters",{keyPath:"title"}),this.db.createObjectStore("locations",{keyPath:"title"})}.bind(n),n.dbRequest.onsuccess=function(t){console.log("Database debug: Initial database request succeeded..."),this.db=t.target.result,this.db.onerror=function(t){console.log("Database error: "+t.target.error.message)},this.loadInitial(e)}.bind(n)}))}return Object(l.a)(t,[{key:"loadInitial",value:function(t){var e=this;fetch(this.serverData.games.filter((function(t){return t.name==e.serverData.default}))[0].path).then((function(t){return t.json()})).then((function(n){var i;e.getOrAdd(e.db,null===(i=e.serverData)||void 0===i?void 0:i.default,"games",{title:n.title,time:null},(function(e){n.time=null===e||void 0===e?void 0:e.time,null===t||void 0===t||t(n)}))}))}},{key:"getOrAdd",value:function(t,e,n,i,o){var a=t.transaction(n,"readonly").objectStore(n).get(e);return a.onsuccess=function(e){e.target.result?null===o||void 0===o||o(e.target.result):(t.transaction(n,"readwrite").objectStore(n).add(i),null===o||void 0===o||o())}.bind(this),a.onsuccess}},{key:"saveToDB",value:function(t,e,n,i){t.transaction(e,"readwrite").objectStore(e).put(n,i)}},{key:"save",value:function(t,e,n){this.saveToDB(this.db,t,e,n)}}]),t}();window.dbService=new I((function(t){s.a.render(Object(D.jsx)(o.a.StrictMode,{children:Object(D.jsx)(T,{data:t})}),document.getElementById("root")),E()}))}},[[330,1,2]]]);
//# sourceMappingURL=main.26e58f8a.chunk.js.map