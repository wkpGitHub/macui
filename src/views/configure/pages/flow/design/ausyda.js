import * as d3 from 'd3'

function getId () {
  return Math.random().toString(16).slice(2) + '-' + Math.random().toString(16).slice(6)
}
const iconHtmlMap = {
  start: '<svg viewBox="0 0 14 14" class="icon-flow-start"><title>开始</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  transform="translate(-24.000000, -119.000000)"><g  transform="translate(24.000000, 119.000000)"><rect  x="0" y="0" width="14" height="14"></rect><g  transform="translate(4.843553, 3.875000)" fill="#FFFFFF" fill-rule="nonzero"><g ><path d="M0.567757553,6.13057769 C0.706753664,6.20845457 0.862462291,6.24950026 1.0207913,6.25 C1.21481242,6.24844339 1.40422283,6.18907595 1.56603546,6.07910258 L4.48870452,4.10039864 C4.81177035,3.88084907 5.00426901,3.5078842 4.99987093,3.11001717 C5.0056203,2.72309889 4.81897612,2.35985472 4.50474111,2.14640277 L1.55601259,0.171816849 C1.25777121,-0.0371088557 0.870768955,-0.0569843925 0.553725525,0.120341714 C0.200639293,0.334511484 -0.011268745,0.728826826 0.000463074478,1.1498443 L0.000463074478,5.10107513 C-0.0097328944,5.52543861 0.208301484,5.92111839 0.567757553,6.13057769 Z" ></path></g></g></g></g></g></svg>',
  delete: '<svg viewBox="0 0 16 16" class=" icon-flow-node-trash"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1461.000000, -194.000000)"><g  transform="translate(1339.000000, 192.000000)"><g  transform="translate(96.000000, 0.000000)"><g  transform="translate(26.000000, 2.000000)"><g ><rect  x="0" y="0" width="16" height="16"></rect></g><line x1="6" y1="1.52178925" x2="10" y2="1.52178925"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="2" y1="3.46254494" x2="14" y2="3.46254494"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><rect  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" x="3.4936589" y="3.46254494" width="9" height="10.5374551"></rect><line x1="6.73081313" y1="7.5" x2="6.73081313" y2="10.5"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="9.26918687" y1="7.5" x2="9.26918687" y2="10.5"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line></g></g></g></g></g></svg>',
  folded: '<svg viewBox="0 0 20 20" class=" icon-api-folded"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  transform="translate(-2008.000000, -165.000000)"><g  transform="translate(2008.000000, 165.000000)"><g  fill="#2468F2"><rect  x="0" y="0" width="20" height="20"></rect></g><g  transform="translate(4.000000, 4.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="0" x2="6" y2="2.5" ></line><polyline  transform="translate(5.990102, 2.345051) scale(-1, 1) rotate(-180.000000) translate(-5.990102, -2.345051) " points="4.3 3.190102 5.99010177 1.50000023 7.68020353 3.190102"></polyline><line x1="0" y1="5.5" x2="12" y2="5.5" ></line><polyline  points="4.3 9.4401018 5.99010177 7.75 7.68020353 9.4401018"></polyline><line x1="6" y1="8" x2="6" y2="11"  transform="translate(6.000000, 9.500000) scale(-1, 1) rotate(-180.000000) translate(-6.000000, -9.500000) "></line></g></g></g></g></svg>',
  expand: '<svg viewBox="0 0 20 20" class=" icon-api-unfold"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  transform="translate(-2008.000000, -351.000000)"><g  transform="translate(1969.000000, 351.000000)"><g  transform="translate(39.000000, 0.000000)"><rect  fill="#2468F2" x="0" y="0" width="20" height="20"></rect><g  transform="translate(4.000000, 5.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><polyline  points="4.3 1.69010177 5.99010177 0 7.68020353 1.69010177"></polyline><line x1="6" y1="0.25" x2="6" y2="3.75" ></line><line x1="0" y1="3.75" x2="12" y2="3.75" ></line><line x1="0" y1="6.75" x2="12" y2="6.75" ></line><line x1="6" y1="6.75" x2="6" y2="9.75"  transform="translate(6.000000, 8.250000) scale(-1, 1) rotate(-180.000000) translate(-6.000000, -8.250000) "></line><polyline  transform="translate(5.990102, 9.595051) scale(-1, 1) rotate(-180.000000) translate(-5.990102, -9.595051) " points="4.3 10.440102 5.99010177 8.7500002 7.68020353 10.440102"></polyline></g></g></g></g></g></svg>',
  branch: '<svg viewBox="0 0 20 21" class=" icon-api-branch"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round"><g  transform="translate(-62.000000, -266.000000)" stroke="#FFFFFF" stroke-width="1.25"><g  transform="translate(62.000000, 266.325991)"><line x1="10" y1="2.93279569" x2="9.98330538" y2="7.82479094"  stroke-linecap="round"></line><polyline  stroke-linecap="round" points="18.0795319 15.6128675 15.5060024 18.1093506 12.932473 15.6128675"></polyline><polyline  stroke-linecap="round" points="7.01909246 15.6128675 4.44556305 18.1093506 1.87203364 15.6128675"></polyline><polyline  points="10 7.82985041 4.41193867 10.8737023 4.46225767 17.368569"></polyline><polyline  transform="translate(12.794031, 12.599210) scale(-1, 1) translate(-12.794031, -12.599210) " points="15.5880613 7.82985041 10 10.8737023 10 17.368569"></polyline></g></g></g></svg>',
  break: '<svg viewBox="0 0 21 21" class=" icon-api-break"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  transform="translate(-436.000000, -266.000000)"><g  transform="translate(436.313708, 266.325991)"><rect  x="0" y="0" width="20" height="20"></rect><g  transform="translate(2.039029, 1.875000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"><line x1="14.9413584" y1="8.125" x2="9.41321446" y2="8.125" ></line><circle  cx="7.04755884" cy="8.125" r="2.125"></circle><path d="M15,3.65625 C14.6793712,3.17317813 14.3082739,2.72614062 13.8941862,2.32258406 C12.4199722,0.885885 10.4005748,0 8.17305073,0 C3.65919741,0 0,3.63768437 0,8.125 C0,12.6123156 3.65919741,16.25 8.17305073,16.25 C10.4005748,16.25 12.4199722,15.3641312 13.8941862,13.9274281 C14.3082739,13.5238594 14.6793712,13.0768219 15,12.59375" ></path></g><polyline  stroke="#FFFFFF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" transform="translate(15.868207, 10.017947) rotate(-315.000000) translate(-15.868207, -10.017947) " points="14.280621 8.40498047 17.4557926 8.40498047 17.4557926 11.6309127"></polyline></g></g></g></svg>',
  loop: '<svg viewBox="0 0 16 16" class=" icon-api-loop"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  x="0" y="0" width="16" height="16"></rect><polyline  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round" points="4.5625 11.4375 2.6875 11.4375 2.6875 13.3125"></polyline><polyline  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round" points="13.3125 13.3125 11.4375 13.3125 11.4375 11.4375"></polyline><polyline  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round" points="11.4375 4.5625 13.3125 4.5625 13.3125 2.6875"></polyline><polyline  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round" points="2.6875 2.6875 4.5625 2.6875 4.5625 4.5625"></polyline><path d="M4.5625,2.77939062 C2.86805625,3.89734375 1.75,5.81809375 1.75,8 C1.75,8.318625 1.77384375,8.6316875 1.81984375,8.9375"  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.93746875,14.1801562 C8.63165625,14.2261562 8.31859375,14.25 7.99996875,14.25 C5.8180625,14.25 3.8973125,13.1319375 2.77935937,11.4375"  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.1801562,7.0625 C14.2261562,7.3683125 14.25,7.681375 14.25,8 C14.25,10.1819062 13.1319375,12.1026562 11.4375,13.220625"  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.0625,1.81984375 C7.3683125,1.77384375 7.681375,1.75 8,1.75 C10.1819062,1.75 12.1026562,2.86805625 13.220625,4.5625"  stroke="#FFFFFF" stroke-width="1.07142857" stroke-linecap="round" stroke-linejoin="round"></path></g></g></svg>',
  'date-format': '<svg viewBox="0 0 16 16" class=" icon-api-date-format"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><path d="M1.66666667,6.33333333 L14.3333333,6.33333333 L14.3333333,13.3333333 C14.3333333,13.7015333 14.0348667,14 13.6666667,14 L2.33333333,14 C1.96514333,14 1.66666667,13.7015333 1.66666667,13.3333333 L1.66666667,6.33333333 Z"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.66666667,3 C1.66666667,2.63181 1.96514333,2.33333333 2.33333333,2.33333333 L13.6666667,2.33333333 C14.0348667,2.33333333 14.3333333,2.63181 14.3333333,3 L14.3333333,6.33333333 L1.66666667,6.33333333 L1.66666667,3 Z"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><line x1="5.33333333" y1="1.33333333" x2="5.33333333" y2="4"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="10.6666667" y1="1.33333333" x2="10.6666667" y2="4"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="9.33333333" y1="11.3333333" x2="11.3333333" y2="11.3333333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="4.66666667" y1="11.3333333" x2="6.66666667" y2="11.3333333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="9.33333333" y1="8.66666667" x2="11.3333333" y2="8.66666667"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="4.66666667" y1="8.66666667" x2="6.66666667" y2="8.66666667"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line></g></g></svg>',
  coder: '<svg viewBox="0 0 16 16" class=" icon-api-coder"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  x="0" y="0" width="16" height="16"></rect><path d="M13.0375,7.675 L13.0375,4.75 L10.1125,1.5 L3.2875,1.5 C2.92851475,1.5 2.6375,1.79101475 2.6375,2.15 L2.6375,13.85 C2.6375,14.208995 2.92851475,14.5 3.2875,14.5 L7.1875,14.5"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><line x1="8.8125" y1="10.925" x2="13.3625" y2="10.925"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="8.8125" y1="12.875" x2="13.3625" y2="12.875"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="13.3625" y1="10.925" x2="11.7375" y2="9.3"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="10.4375" y1="14.5" x2="8.8125" y2="12.875"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><polyline  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" points="9.7875 1.5 9.7875 4.75 13.0375 4.75"></polyline></g></g></svg>',
  continue: '<svg viewBox="0 0 21 21" class=" icon-api-continue"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  transform="translate(-307.000000, -266.000000)"><g  transform="translate(307.313708, 266.325991)"><rect  x="0" y="0" width="20" height="20"></rect><polygon  stroke="#FFFFFF" stroke-width="1.25" stroke-linejoin="round" points="8.83135281 10 8.83135281 7.33281746 11.0540049 8.66640873 13.276657 10 11.0540049 11.3335913 8.83135281 12.6671825"></polygon><g  transform="translate(2.039029, 1.875000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"><path d="M15,3.65625 C14.6793712,3.17317813 14.3082739,2.72614062 13.8941862,2.32258406 C12.4199722,0.885885 10.4005748,0 8.17305073,0 C3.65919741,0 0,3.63768437 0,8.125 C0,12.6123156 3.65919741,16.25 8.17305073,16.25 C10.4005748,16.25 12.4199722,15.3641312 13.8941862,13.9274281 C14.3082739,13.5238594 14.6793712,13.0768219 15,12.59375" ></path></g><polyline  stroke="#FFFFFF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" points="14.930267 13.4374775 18.1054386 13.4374775 18.1054386 16.6634097"></polyline></g></g></g></svg>',
  exit: '<svg viewBox="0 0 16 16" class=" icon-api-exit"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  x="0" y="0" width="16" height="16"></rect><g  transform="translate(6.000000, 6.497066)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><line x1="0.5" y1="3" x2="0.5" y2="0" ></line><line x1="3.5" y1="3" x2="3.5" y2="0" ></line></g><circle  stroke="#FFFFFF" stroke-linejoin="round" cx="8" cy="8" r="6.50240427"></circle></g></g></svg>',
  mapping: '<svg viewBox="0 0 16 16" class=" icon-api-mapping"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><g  transform="translate(2.000000, 2.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><line x1="8.66666667" y1="6" x2="8.66666667" y2="8.33333333" ></line><line x1="6" y1="3" x2="6" y2="8.33333333" ></line><line x1="3.33333333" y1="4.33333333" x2="3.33333333" y2="8.33333333" ></line><polyline  points="0 4 0 0 12 7.39963646e-14 12 4"></polyline><polyline  transform="translate(6.000000, 10.000000) scale(1, -1) translate(-6.000000, -10.000000) " points="0 12 0 8 12 8 12 12"></polyline></g></g></g></svg>',
  'create-data-records': '<svg viewBox="0 0 16 16" class=" icon-api-create-data-records"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  x="0" y="0" width="16" height="16"></rect><line x1="9.47035404" y1="11.0181142" x2="14.470354" y2="11.0181142"  stroke="#FFFFFF" stroke-linecap="round"></line><line x1="11.970354" y1="13.5181142" x2="11.970354" y2="8.51811421"  stroke="#FFFFFF" stroke-linecap="round"></line><polyline  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" points="9.47035404 14.4947447 2.50475625 14.4947447 2.50475625 1.71371716 12.7586033 1.71371716 12.7586033 5.99022478"></polyline><line x1="5.47035404" y1="4.5" x2="9.47035404" y2="4.5"  stroke="#FFFFFF" stroke-linecap="round"></line><line x1="5.47035404" y1="7.08810507" x2="7.89397599" y2="7.08810507"  stroke="#FFFFFF" stroke-linecap="round"></line></g></g></svg>',
  'update-data-records': '<svg viewBox="0 0 16 16" class=" icon-api-update-data-records"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  x="0" y="0" width="16" height="16"></rect><g  transform="translate(1.963298, 2.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><path d="M0,6 C0,2.6862915 2.6862915,0 6,0 C7.65735633,0 9.15776333,0.671979951 10.2436277,1.75834651" ></path><polyline  transform="translate(10.479231, 1.972611) scale(1, -1) rotate(45.000000) translate(-10.479231, -1.972611) " points="8.97623139 2.72411128 10.4848911 1.22111128 11.9822314 2.72411128"></polyline></g><g  transform="translate(8.000000, 10.805960) scale(-1, -1) translate(-8.000000, -10.805960) translate(1.963298, 7.805960)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><path d="M0,6 C0,2.6862915 2.6862915,0 6,0 C7.65735633,0 9.15776333,0.671979951 10.2436277,1.75834651" ></path><polyline  transform="translate(10.479231, 1.972611) scale(1, -1) rotate(45.000000) translate(-10.479231, -1.972611) " points="8.97623139 2.72411128 10.4848911 1.22111128 11.9822314 2.72411128"></polyline></g></g></g></svg>',
  'query-data-records': '<svg viewBox="0 0 16 16" class=" icon-api-query-data-records"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><line x1="1.50246765" y1="2.33337333" x2="14.5009356" y2="2.33337333"  stroke="#FFFFFF" stroke-linecap="round"></line><line x1="1.50246765" y1="7.6667" x2="5.16913432" y2="7.6667"  stroke="#FFFFFF" stroke-linecap="round"></line><line x1="1.50246765" y1="13.0000333" x2="5.16913432" y2="13.0000333"  stroke="#FFFFFF" stroke-linecap="round"></line><path d="M10.334269,11.3333667 C11.899069,11.3333667 13.1676023,10.0648333 13.1676023,8.50003333 C13.1676023,6.93523333 11.899069,5.6667 10.334269,5.6667 C8.76946897,5.6667 7.50093564,6.93523333 7.50093564,8.50003333 C7.50093564,10.0648333 8.76946897,11.3333667 10.334269,11.3333667 Z"  stroke="#FFFFFF"></path><line x1="12.1676023" y1="10.6667" x2="14.5009356" y2="13.0168667"  stroke="#FFFFFF" stroke-linecap="round"></line></g></g></svg>',
  'delete-data-records': '<svg viewBox="0 0 17 16" class=" icon-api-delete-data-records"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  transform="translate(0.262783, 0.000000)"><g  fill="#FFFFFF" fill-opacity="0.01" fill-rule="nonzero"><rect  x="0" y="0" width="16" height="16"></rect></g><polygon  stroke="#FFFFFF" stroke-linejoin="round" points="4 4 12 4 12 14 4 14"></polygon><line x1="2.5" y1="4" x2="13.5" y2="4"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="6.5" y1="7" x2="6.5" y2="11"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="9.5" y1="7" x2="9.5" y2="11"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="9.5" y1="2" x2="6.5" y2="2"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line></g></g></svg>',
  http: '<svg viewBox="0 0 16 16" class=" icon-api-http"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect  x="0" y="0" width="16" height="16"></rect><polygon  stroke="#FFFFFF" stroke-linejoin="round" points="2 3 8.0012 3 14 3 14 13 2 13"></polygon><path d="M3.95358565,9.5 L3.95358565,8.37654263 L5.06547405,8.37654263 L5.06547405,9.5 L5.60810047,9.5 L5.60810047,6.8582 L5.06547405,6.8582 L5.06547405,7.90142499 L3.95358565,7.90142499 L3.95358565,6.8582 L3.40290047,6.8582 L3.40290047,9.5 L3.95358565,9.5 Z M7.28524228,9.5 L7.28524228,7.34646322 L8.08710047,7.34646322 L8.08710047,6.8582 L5.92260047,6.8582 L5.92260047,7.34646322 L6.71274282,7.34646322 L6.71274282,9.5 L7.28524228,9.5 Z M9.64631659,9.5 L9.64631659,7.34646322 L10.4481748,7.34646322 L10.4481748,6.8582 L8.28367478,6.8582 L8.28367478,7.34646322 L9.07381712,7.34646322 L9.07381712,9.5 L9.64631659,9.5 Z M11.1869154,9.5 L11.1869154,8.4862 L11.7649005,8.4862 C12.4087005,8.4862 12.7306005,8.2124 12.7306005,7.6685 C12.7306005,7.1283 12.4087005,6.8582 11.7723005,6.8582 L10.6771005,6.8582 L10.6771005,9.5 L11.1869154,9.5 Z M11.7357159,8.07250993 L11.1940034,8.07250993 L11.1940034,7.26879055 L11.7357159,7.26879055 C11.8982297,7.26879055 12.0193183,7.29893003 12.0957954,7.36255781 C12.1722725,7.42283676 12.2136975,7.52330169 12.2136975,7.66730141 C12.2136975,7.81130113 12.175459,7.91511489 12.0989819,7.97874267 C12.0225049,8.03902163 11.9014162,8.07250993 11.7357159,8.07250993 Z"  fill="#FFFFFF" fill-rule="nonzero"></path></g></svg>',
  apicenter: '<svg viewBox="0 0 16 16" class=" icon-api-apicenter"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><path d="M12.3333333,7.33336667 L11.3333333,8.33336667 L7.66666667,4.6667 L8.66666667,3.6667 C9.16666667,3.16667333 11,2.33335 12.3333333,3.6667 C13.6666667,5.00003333 12.8333333,6.83333333 12.3333333,7.33336667 Z"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><line x1="14" y1="2" x2="12.3333333" y2="3.66666667"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><path d="M3.66666667,8.66663333 L4.66666667,7.66663333 L8.33333333,11.3333 L7.33333333,12.3333 C6.83333333,12.8333333 5,13.6666667 3.66666667,12.3333 C2.33333333,10.9999667 3.16666667,9.16666667 3.66666667,8.66663333 Z"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><line x1="7.66666667" y1="10.6666667" x2="9" y2="9.33333333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="2" y1="14" x2="3.66666667" y2="12.3333333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="5.33333333" y1="8.33333333" x2="6.66666667" y2="7"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line></g></g></svg>',
  flow: '<svg viewBox="0 0 16 16" class=" icon-api-flow"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  fill="#FFFFFF"><rect  fill-opacity="0.01" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><g  transform="translate(1.500000, 1.000000)"><path d="M6.5,0 C7.23096511,0 7.83981186,0.522850854 7.97295275,1.21496507 L7.96173087,1.16501488 C10.8476936,1.82821186 13,4.41275689 13,7.5 C13,8.35391853 12.8353373,9.16937802 12.5360319,9.91635837 C12.8195348,10.1832659 13,10.570558 13,11 C13,11.8284271 12.3284271,12.5 11.5,12.5 C11.194561,12.5 10.9104444,12.4087078 10.673448,12.2519212 C10.7249638,12.2859807 10.7783156,12.3167524 10.8336022,12.3442137 L10.7793455,12.3926843 C9.63603186,13.3934897 8.13884496,14 6.5,14 C4.83498005,14 3.31617932,13.3739611 2.16614446,12.34443 L2.29403781,12.2728711 L2.29403781,12.2728711 C2.06523315,12.4163439 1.79238604,12.5 1.5,12.5 C0.671572875,12.5 0,11.8284271 0,11 C0,10.5659895 0.18432535,10.1750304 0.478963092,9.90113583 L0.4635581,9.91565903 L0.4635581,9.91565903 C0.164662727,9.16937802 0,8.35391853 0,7.5 C0,4.41275689 2.15230636,1.82821186 5.03826913,1.16501488 L5.03475903,1.17747507 C5.18231393,0.504056693 5.78229259,0 6.5,0 Z M5.13320579,2.11885227 L5.15578635,2.16639778 L5.15578635,2.16639778 C2.76817179,2.76501257 1,4.92601696 1,7.5 C1,8.2078156 1.13370676,8.88440231 1.37724081,9.50588067 L1.5,9.5 L1.41885992,9.50215719 C1.44572507,9.50072515 1.47277785,9.5 1.5,9.5 C2.32842712,9.5 3,10.1715729 3,11 C3,11.2342987 2.94628146,11.4560507 2.85048876,11.6536118 L2.86406039,11.6248454 L2.86406039,11.6248454 C3.83161179,12.480775 5.10517015,13 6.5,13 C7.89482985,13 9.16838821,12.480775 10.1379375,11.6250627 L10.1048364,11.5520151 C10.0371805,11.3811641 10,11.194924 10,11 C10,10.1715729 10.6715729,9.5 11.5,9.5 L11.6327382,9.50579266 C11.6290396,9.50546836 11.6253372,9.50515748 11.6216309,9.50486008 C11.8662932,8.88440231 12,8.2078156 12,7.5 C12,4.92601696 10.2318282,2.76501257 7.84385277,2.16535497 L7.83881221,2.17716316 C7.59138843,2.66537545 7.08477209,3 6.5,3 C5.89222688,3 5.36887867,2.63853395 5.13320579,2.11885227 Z M1.5,10.5 C1.22385763,10.5 1,10.7238576 1,11 C1,11.2761424 1.22385763,11.5 1.5,11.5 C1.77614237,11.5 2,11.2761424 2,11 C2,10.7238576 1.77614237,10.5 1.5,10.5 Z M11.5,10.5 C11.2238576,10.5 11,10.7238576 11,11 C11,11.2761424 11.2238576,11.5 11.5,11.5 C11.7761424,11.5 12,11.2761424 12,11 C12,10.7238576 11.7761424,10.5 11.5,10.5 Z M6.5,5.6 C7.6045695,5.6 8.5,6.4954305 8.5,7.6 C8.5,8.7045695 7.6045695,9.6 6.5,9.6 C5.3954305,9.6 4.5,8.7045695 4.5,7.6 C4.5,6.4954305 5.3954305,5.6 6.5,5.6 Z M6.5,6.6 C5.94771525,6.6 5.5,7.04771525 5.5,7.6 C5.5,8.15228475 5.94771525,8.6 6.5,8.6 C7.05228475,8.6 7.5,8.15228475 7.5,7.6 C7.5,7.04771525 7.05228475,6.6 6.5,6.6 Z M6.5,1 C6.22385763,1 6,1.22385763 6,1.5 C6,1.77614237 6.22385763,2 6.5,2 C6.77614237,2 7,1.77614237 7,1.5 C7,1.22385763 6.77614237,1 6.5,1 Z" ></path></g></g></g></svg>',
  connector: '<svg viewBox="0 0 16 16" class=" icon-api-connector"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><circle  stroke="#FFFFFF" cx="3.48749769" cy="12.9941766" r="1"></circle><circle  stroke="#FFFFFF" cx="12.1549723" cy="3.52609326" r="1"></circle><path d="M7.8490703,4.38303318 C7.8490703,3.17861817 6.87269901,2.20224688 5.668284,2.20224688 C4.46386898,2.20224688 3.48749769,3.17861817 3.48749769,4.38303318"  stroke="#FFFFFF" stroke-linejoin="round"></path><path d="M3.48749769,11.7139372 L3.48749769,4.30732705 M7.8490703,4.30732705 L7.8490703,11.7139372"  stroke="#FFFFFF"></path><path d="M12.2106429,13.9786353 C12.2106429,12.7742203 11.2342716,11.797849 10.0298566,11.797849 C8.82544158,11.797849 7.8490703,12.7742203 7.8490703,13.9786353"  stroke="#FFFFFF" stroke-linejoin="round" transform="translate(10.029857, 12.888242) scale(1, -1) translate(-10.029857, -12.888242) "></path><path d="M7.8490703,11.8735552 L7.8490703,4.46694503 M12.2106429,4.46694503 L12.2106429,11.8735552"  stroke="#FFFFFF" transform="translate(10.029857, 8.170250) scale(1, -1) translate(-10.029857, -8.170250) "></path></g></g></svg>',
  email: '<svg viewBox="0 0 16 16" class=" icon-api-email"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><g  fill-rule="nonzero"><rect  x="0" y="0" width="16" height="16"></rect><rect  fill-opacity="0.01" fill="#FFFFFF" x="0" y="0" width="16" height="16"></rect></g><g  transform="translate(1.333333, 2.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"><polyline  points="10.6666667 3.33333333 13.3333333 3.33333333 13.3333333 7.66666667 13.3333333 12 0 12 0 7.66666667 0 3.33333333 2.66666667 3.33333333"></polyline><line x1="6.66666667" y1="4.66666667" x2="6.66666667" y2="0" ></line><polyline  points="8.66666667 2 6.66666667 0 4.66666667 2"></polyline><polyline  points="0 3.33333333 6.66666667 8.33333333 13.3333333 3.33333333"></polyline></g></g></g></svg>',
  notification: '<svg viewBox="0 0 16 16" class=" icon-api-notification"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><polygon  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" points="14.6666667 2 1.33333333 2 1.33333333 12 4.33333333 12 4.33333333 13.6666667 7.66666667 12 14.6666667 12"></polygon><line x1="4.66666667" y1="6.5" x2="4.66666667" y2="7.5"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="8" y1="6.5" x2="8" y2="7.5"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line><line x1="11.3333333" y1="6.5" x2="11.3333333" y2="7.5"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></line></g></g></g></svg>',
  'datasource-sql': '<svg viewBox="0 0 16 16" class=" icon-api-sql"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g ><g ></g><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0.0000145833333" y="0" width="16" height="16"></rect><path d="M13.8333625,4.20833333 C13.8333625,4.20833333 13.8333625,11.5181708 13.8333625,12.0833333 C13.8333625,13.0498292 11.2216625,13.8333333 8,13.8333333 C4.7783375,13.8333333 2.16666667,13.0498292 2.16666667,12.0833333 C2.16666667,11.5415042 2.16666667,4.20833333 2.16666667,4.20833333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.8333333,9.45833333 C13.8333333,10.4248292 11.2216625,11.2083333 8,11.2083333 C4.7783375,11.2083333 2.16666667,10.4248292 2.16666667,9.45833333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.8333333,6.83333333 C13.8333333,7.79982917 11.2216625,8.58333333 8,8.58333333 C4.7783375,8.58333333 2.16666667,7.79982917 2.16666667,6.83333333"  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path><ellipse  stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" cx="8" cy="3.91666667" rx="5.83333333" ry="1.75"></ellipse></g></g></svg>',
  script: '<svg viewBox="0 0 16 16" class=" icon-api-script"><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><g ><rect  fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="16" height="16"></rect><g  transform="translate(2.000000, 2.000000)" stroke="#FFFFFF" stroke-linecap="round"><polyline  stroke-linejoin="round" points="3.6 2.7 0 6.42966 3.6 9.9"></polyline><polyline  stroke-linejoin="round" points="8.4 2.7 12 6.42966 8.4 9.9"></polyline><line x1="7.2" y1="0" x2="5.1" y2="12" ></line></g></g></g></svg>',
  set: `<svg viewBox="0 0 16 16" class=" icon-api-set">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g></g>
      <g>
        <g>
          <rect x="0" y="0" width="16" height="16"></rect>
          <polygon stroke="#FFFFFF" stroke-linejoin="round" points="2 2 8.0012 2 14 2 14 14 2 14"></polygon>
          <path d="M7.1751718,4.45633542 C7.60924166,4.17835264 8.3252388,4.22909125 8.6671506,4.26741509 C8.81111347,4.28360826 9.12794084,4.31275597 9.09522201,4.62474441 C9.06959225,4.87411925 8.70150538,4.84874995 8.60389419,4.84874995 C8.0073208,4.84874995 7.36166915,4.54323878 7.01539483,5.80090844 L7.01539483,5.80090844 L6.85343661,6.59005567 L7.67249807,6.59005567 C7.8230047,6.59005567 7.94515501,6.71096468 7.94515501,6.85994186 C7.94515501,7.00891904 7.8230047,7.12982806 7.67249807,7.12982806 L7.67249807,7.12982806 L6.73728475,7.12982806 L6.001111,10.7090588 C6.001111,10.7090588 5.93022019,11.2844561 5.5730396,11.2623254 C5.5561858,11.26128 5.54034416,11.2592996 5.52545987,11.2564631 L5.56521029,11.2430535 C5.53430007,11.2561818 5.50106164,11.2629478 5.46747899,11.2629478 L4.47124867,11.2629478 C4.34190551,11.2629478 4.23705215,11.1580945 4.23705215,11.0287513 L4.23705215,11.0261898 C4.2369092,10.8974298 4.33465452,10.7897039 4.46280835,10.7772245 C4.71628018,10.7525418 4.93703598,10.712122 5.12507575,10.6559649 C5.24601401,10.6198473 5.33214614,10.571486 5.38347213,10.5108808 L6.08127214,7.12982806 L4.97319432,7.12982806 C4.8783097,7.12982806 4.79627026,7.08136849 4.74856539,7.00827931 L4.72705199,6.96505215 L4.73683182,6.94874317 C4.75310987,6.93361406 4.77915475,6.9211161 4.78892157,6.90335583 C4.77427133,6.88855562 4.72299548,6.87572876 4.72299548,6.85994186 L4.72205199,6.95505215 L4.71956024,6.94921672 L4.7054452,6.88315207 C4.7174421,6.6305386 4.83086739,6.59005567 4.97319432,6.59005567 L4.97319432,6.59005567 L6.19851463,6.59005567 L6.36919787,5.78471527 C6.49025756,5.21471563 6.74001132,4.73539775 7.1751718,4.45633542 Z M11.1292428,6.68505561 C11.2132212,6.72985672 11.2568463,6.78167487 11.2622994,6.83997028 C11.2672072,6.8982657 11.244304,6.95548157 11.1919539,7.01215767 L10.2065717,8.07011155 L11.1788664,9.38985504 C11.209404,9.42925842 11.2170384,9.47675839 11.1995883,9.52857654 C11.1843195,9.58147424 11.11561,9.61817876 11.0245425,9.66675827 C10.9258407,9.71803665 10.8402265,9.7131787 10.7791513,9.69644575 C10.7197121,9.67917304 10.6662713,9.64030943 10.6215556,9.58147424 L9.80140349,8.50732719 L8.80620565,9.57607651 C8.68732722,9.7034628 8.55263469,9.72235483 8.39885617,9.63221284 C8.33559976,9.59550832 8.21999321,9.45948568 8.20636037,9.39795162 C8.19327283,9.33695734 8.21781196,9.27272443 8.28106837,9.20417334 L9.3815118,8.01883318 L8.57990038,6.96897588 C8.54663623,6.92093614 8.54336435,6.86479981 8.56953942,6.80110667 C8.59462386,6.73741353 8.65406307,6.69962946 8.71731948,6.66238517 C8.8083869,6.61164656 8.89181993,6.61002725 8.9534404,6.6148852 C9.01560618,6.6186636 9.07177351,6.65374881 9.12357833,6.7185215 L9.7899519,7.57837891 L10.5964711,6.70880559 C10.6662713,6.63215791 10.7453418,6.6051693 10.8216858,6.5835784 C10.8974844,6.5619875 11.0474457,6.63971473 11.1292428,6.68505561 Z" fill="#FFFFFF" fill-rule="nonzero"></path>
        </g>
        <path d="M0,0 L14.5,0 C15.3284271,-5.96268804e-16 16,0.671572875 16,1.5 L16,1.5 L16,14.5 C16,15.3284271 15.3284271,16 14.5,16 L14.5,16 L0,16 L0,15.5 L14.5,15.5 C15.0522847,15.5 15.5,15.0522847 15.5,14.5 L15.5,1.5 C15.5,0.94771525 15.0522847,0.5 14.5,0.5 L0,0.5 L0,0 Z"></path>
      </g>
    </g>
  </svg>`
}

const nodeConfig = {
  start: {
    x: 44,
    y: 68,
    enter (selection) {
      selection.html(`
        <div class="node-start">${iconHtmlMap.start}</div>
        <span class="node-label">开始</span>
      `)
    }
  },
  end: {
    x: 44,
    y: 68,
    enter (selection) {
      selection.append('div').attr('class', 'node-end').html('<div class="icon-end"></div>')
      selection.append('span').classed('node-label', true)
    }
  },
  set: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.set)
      selection.append('span').classed('node-label', true)
    }

  },
  branch: {
    x: 48,
    y: 48,
    enter (selection) {
      const toorBar = selection.select('.node-toolbar')
      toorBar.insert('div', '.trash').attr('class', 'node-tool-outer icon-expand').on('click', d => {
        d3.event.stopPropagation()
        d.folded = !d.folded
        this.update()
      })
      toorBar.insert('div', '.icon-expand').attr('class', 'node-tool-outer icon-add').attr('title', '添加分支').html('<div class="line-1"></div><div class="line-2"></div>').on('click', d => {
        d3.event.stopPropagation()
        d.folded = false
        this.emit('addBranch', d)
      })
      selection.append('div').attr('class', 'node-logic')
    },
    update (selection) {
      selection.select('.icon-expand').attr('title', d => d.folded ? '展开子节点' : '收起子节点').html(d => d.folded ? iconHtmlMap.folded : iconHtmlMap.expand)
      selection.select('.node-logic').html(d => d.folded ? `<span class="rotate-45 node-children-count">${this.getChildrenSize(d, true)}</span>` : iconHtmlMap.branch)
    }
  },
  'branch-close': {
    x: 48,
    y: 48,
    enter (selection) {
      selection.append('div').attr('class', 'node-logic').html(iconHtmlMap.branch)
    }
  },
  break: {
    x: 48,
    y: 48,
    enter (selection) {
      selection.append('div').attr('class', 'node-logic node-icon-break-wrapper').html(iconHtmlMap.break)
    }
  },
  'date-format': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap['date-format'])
      selection.append('span').classed('node-label', true)
    }
  },
  coder: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.coder)
      selection.append('span').classed('node-label', true)
    }
  },
  loop: {
    x: 48,
    y: 48,
    enter (selection) {
      const toorBar = selection.select('.node-toolbar')
      toorBar.insert('div', '.trash').attr('class', 'node-tool-outer icon-expand').on('click', d => {
        d3.event.stopPropagation()
        d.folded = !d.folded
        this.update()
      })
      selection.append('div').attr('class', 'node-logic node-icon-loop-wrapper')
      selection.append('span').attr('class', 'loop-label').text(d => d.title).style('left', d => `${-d.width / 2 + 32}px`)
    },
    update (selection, data) {
      selection.select('.icon-expand').attr('title', d => d.folded ? '展开子节点' : '收起子节点').html(d => d.folded ? iconHtmlMap.folded : iconHtmlMap.expand)
      selection.select('.node-logic').html(d => d.folded ? `<span class="rotate-45 node-children-count">${this.getChildrenSize(d, true)}</span>` : iconHtmlMap.loop)

      if (data.folded) {
        selection.select('.loop-label').remove()
        selection.select('.loop-mask').remove()
      } else {
        // const height = data.children.at(-1).top - data.top - 24
        const loopMask = selection.select('.loop-mask').size() ? selection.select('.loop-mask') : selection.append('div').attr('class', 'loop-mask')
        const loopLabel = selection.select('.loop-label').size() ? selection.select('.loop-label') : selection.append('span').attr('class', 'loop-label')
        loopMask.style('width', d => d.width + 'px').style('height', d => `${d.height}px`)
        loopLabel.text(d => d.title).style('left', d => `${-d.width / 2 + 32}px`)
      }
    }
  },
  'loop-close': {
    x: 0,
    y: 0
  },
  'delete-data-records': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap['delete-data-records'])
      selection.append('span').classed('node-label', true)
    }
  },
  'create-data-records': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').attr('class', 'icon-outer icon-crud').html(iconHtmlMap['create-data-records'])
      selection.append('span').classed('node-label', true)
    }
  },
  'update-data-records': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').attr('class', 'icon-outer icon-crud').html(iconHtmlMap['update-data-records'])
      selection.append('span').classed('node-label', true)
    }
  },
  'query-data-records': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').attr('class', 'icon-outer icon-crud').html(iconHtmlMap['query-data-records'])
      selection.append('span').classed('node-label', true)
    }
  },
  mapping: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.mapping)
      selection.append('span').classed('node-label', true)
    }
  },
  http: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.http)
      selection.append('span').classed('node-label', true)
    }
  },
  apicenter: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.apicenter)
      selection.append('span').classed('node-label', true)
    }
  },
  flow: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.flow)
      selection.append('span').classed('node-label', true)
    }
  },
  connector: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.connector)
      selection.append('span').classed('node-label', true)
    }
  },
  email: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.email)
      selection.append('span').classed('node-label', true)
    }
  },
  notification: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.notification)
      selection.append('span').classed('node-label', true)
    }
  },
  'auto-entity-add-records': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.notification)
      selection.append('span').classed('node-label', true)
    }
  },
  'update-entity-add-records': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.notification)
      selection.append('span').classed('node-label', true)
    }
  },
  'web-api': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.notification)
      selection.append('span').classed('node-label', true)
    }
  },
  'examine-and-approve-task': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.notification)
      selection.append('span').classed('node-label', true)
    }
  },
  script: {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap.script)
      selection.append('span').classed('node-label', true)
    }
  },
  'datasource-sql': {
    x: 140,
    y: 64,
    enter (selection) {
      selection.append('div').classed('icon-outer', true).html(iconHtmlMap['datasource-sql'])
      selection.append('span').classed('node-label', true)
    }
  },
  continue: {
    x: 48,
    y: 48,
    enter (selection) {
      selection.append('div').attr('class', 'node-logic node-icon-continue-wrapper').html(iconHtmlMap.continue)
    }
  },
  exit: {
    x: 48,
    y: 48,
    enter (selection) {
      selection.append('div').attr('class', 'node-logic').html(iconHtmlMap.exit)
    }
  }
}
export class Ausyda {
  constructor ({ el, nodes, links }) {
    this.initDom(el)
    this.nodes = nodes
    this.links = links
    this.update()
    this._events = {}
  }

  initDom (el) {
    this._el = d3.select(el).attr('class', 'api-editor').append('div').attr('class', 'api-editor-view').append('div').attr('class', 'api-editor-view-container')
    this.viewLayer = this._el.append('div').attr('class', 'api-editor-view-layer')
    this.linkLayer = this.viewLayer.append('svg').attr('class', 'link-layer')
    this.transform = d3.zoomIdentity
    const zoomFn = d3.zoom().on('zoom', () => {
      const { transform } = d3.event
      const { x, y, k } = transform
      this.transform = transform
      this.viewLayer.style('transform', `translate(${x}px, ${y}px) scale(${k})`)
    })
    this._el.call(zoomFn)
    this._el.on('click', () => {
      this.nodes.forEach(node => {
        node.active = false
      })
      this.update()
    })
    this._el.on('dragenter', () => {
      const { event } = d3
      event.preventDefault()
    })
    this._el.on('dragover', () => {
      const { event } = d3
      event.preventDefault()
    })
    this._el.on('drop', () => {
      const { event } = d3
      const rect = this._el.node().getBoundingClientRect()
      const title = JSON.parse(event.dataTransfer.getData('node'))
      this.addNode({
        type: 'coder',
        id: getId(),
        title,
        x: this.transform.invertX(event.x - rect.left),
        y: this.transform.invertY(event.y - rect.top)
      })
    })
  }

  bindDrag () {
    const that = this
    return d3.drag().on('drag', function () {
      const { x, y } = d3.event
      console.log('d3.event', d3.event)
      d3.select(this).style('top', d => {
        d.y = y
        return `${y}px`
      }).style('left', d => {
        d.x = x
        return `${x}px`
      })
      that.update()
    })
  }

  linkNode (position) {
    return (selection) => {
      let rect = { x: 0, y: 0 }
      let targetNode
      const _link = {
        id: getId()
      }
      const bindMove = (e) => {
        const x = this.transform.invertX(e.x - rect.x)
        const y = this.transform.invertY(e.y - rect.y)
        targetNode = this.quadtree.find(x, y, 20)
        if (targetNode && targetNode.node.id !== _link.source) {
          _link.x = undefined
          _link.y = undefined
          _link.target = targetNode.node.id
          _link.targetPosition = targetNode.position
        } else {
          _link.target = undefined
          _link.targetPosition = undefined
          _link.x = x
          _link.y = y
        }
        this.updateLinks()
      }
      const bindUp = () => {
        this._el.style('cursor', '')
        if (targetNode && targetNode.node.id !== _link.source) {
          this.links[this.links.length - 1] = {
            id: _link.id,
            source: _link.source,
            sourcePosition: _link.sourcePosition,
            target: targetNode.node.id,
            targetPosition: targetNode.position
          }
        } else {
          this.links.pop()
        }
        document.removeEventListener('mousemove', bindMove)
        document.removeEventListener('mouseup', bindUp)
      }
      selection.on('mousedown', (d) => {
        d3.event.stopPropagation()
        this._el.style('cursor', 'pointer')
        _link.source = d.id
        _link.sourcePosition = position
        this.links.push(_link)
        rect = this._el.node().getBoundingClientRect()
        document.addEventListener('mousemove', bindMove)
        document.addEventListener('mouseup', bindUp)
      })
    }
  }

  updatePointers () {
    this.pointers = []
    this.nodes.forEach(node => {
      const { x = 0, y = 0 } = nodeConfig[node.type]
      this.pointers.push(
        {
          position: 'top',
          x: node.x,
          y: node.y - y / 2,
          node
        },
        {
          position: 'bottom',
          x: node.x,
          y: node.y + y / 2,
          node
        },
        {
          position: 'left',
          x: node.x - x / 2,
          y: node.y,
          node
        },
        {
          position: 'right',
          x: node.x + x / 2,
          y: node.y,
          node
        }
      )
    })
    // console.log(this.pointers)
    this.quadtree = d3.quadtree().x(d => d.x).y(d => d.y).addAll(this.pointers)
  }

  updateNodes () {
    const that = this
    const updateSelections = this.viewLayer.selectAll('.action-node').data(this.nodes, d => d.id)
    const enterSelections = updateSelections.enter().append('div').attr('class', d => `action-node node-middle action-node--${d.type}`)
    enterSelections.append('div').attr('class', 'node-pointer node-pointer-top').call(this.linkNode('top'))
    enterSelections.append('div').attr('class', 'node-pointer node-pointer-bottom').call(this.linkNode('bottom'))
    enterSelections.append('div').attr('class', 'node-pointer node-pointer-left').call(this.linkNode('left'))
    enterSelections.append('div').attr('class', 'node-pointer node-pointer-right').call(this.linkNode('right'))
    enterSelections.each(function (data) {
      const selection = d3.select(this)
      const toorBar = selection.append('div').classed('node-toolbar', true)
      // 添加删除按钮
      toorBar.append('div').attr('class', 'node-tool-outer trash').html(iconHtmlMap.delete).on('click', d => {
        d3.event.stopPropagation()
        const cb = () => {
          that.nodes = that.nodes.filter(node => node.id !== d.id)
          that.links = that.links.filter(link => ![link.source, link.target].includes(d.id))
          that.update()
        }
        that.emit('deleteNode', d, cb)
      })
      nodeConfig[data.type].enter?.call(that, selection)
    })
    const mergeSelections = updateSelections.merge(enterSelections)
      .style('top', d => `${d.y}px`)
      .style('left', d => `${d.x}px`)
      .classed('is-active', d => d.active)
      .call(this.bindDrag())
      .on('click', (d) => {
        d3.event.stopPropagation()
        this.nodes.forEach(node => {
          node.active = node.id === d.id
        })
        this.update()
      })

    mergeSelections.each(function (data) {
      const selection = d3.select(this)
      nodeConfig[data.type].update?.call(that, selection, data)
      selection.select('.node-label')?.text(d => d.title)
    })

    updateSelections.exit().remove()
  }

  updateLinks () {
    // const link = {
    //   source: 'nodeid',
    //   sourcePosition: 'left',
    //   target: 'nodeid',
    //   targetPosition: 'left'
    // }
    const updateSelections = this.linkLayer.selectAll('.link-group').data(this.links, d => d.id)
    const enterSelections = updateSelections.enter().append('g').attr('class', 'link-group')
    enterSelections.append('path').attr('class', 'link-path')
    enterSelections.append('g').attr('class', 'line-add-button').html('<circle r="8" cx="0" cy="0"></circle><line stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" x1="-3" x2="3" y1="0" y2="0"></line><line stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" x1="0" x2="0" y1="-3" y2="3"></line>')
      .on('click', d => {
        d3.event.stopPropagation()
        this.links.forEach(link => { link.active = link.id === d.id })
        this.updateLinks()
        this.emit('addNode', d)
      })
    enterSelections.append('text').attr('fill', 'currentColor')
    enterSelections.append('path').attr('class', 'link-path-marker-end')
    const mergeSelections = updateSelections.merge(enterSelections).classed('is-active', d => d.active)
      .on('click', d => {
        d3.event.stopPropagation()
        // 如果点击的是path 和 text, 并且是分支
        if (['path', 'text'].includes(d3.event.target.tagName)) {
          this.links.forEach(link => { link.active = link.id === d.id })
          this.updateLinks()
          d.source?.type === 'branch' && this.emit('updateBranch', d.target)
        }
      })

    mergeSelections.select('.link-path').attr('d', (d) => {
      d.cpt = this.computedPath(d)
      return d.cpt.pathD
    })
    mergeSelections.select('.line-add-button').attr('transform', ({ cpt }) => {
      return cpt.linkAddPosition
    })

    mergeSelections.select('.link-path-marker-end').attr('transform', ({ cpt }) => {
      return cpt.markerEnd.transform
    }).attr('d', ({ cpt }) => {
      return cpt.markerEnd.d
    })

    updateSelections.exit().remove()
  }

  computedPath ({ source, target, sourcePosition, targetPosition, x, y }) {
    const sourceNode = this.nodeMap[source]
    const sourceConfig = nodeConfig[sourceNode.type]
    const { x: x0, y: y0 } = this.getPointerPosition(sourcePosition, sourceNode, sourceConfig)
    let pathD = ''
    if (x && y) {
      // eslint-disable-next-line no-var
      var relativePosition = this.getRelativePosition({ x0, y0 }, { x1: x, y1: y })
    } else {
      /* eslint-disable */
      var targetNode = this.nodeMap[target]
      var targetConfig = nodeConfig[targetNode.type]
      var { x: x1, y: y1 } = this.getPointerPosition(targetPosition, targetNode, targetConfig)
      var relativePosition = this.getRelativePosition({x0, y0}, {x1, y1})
       /* eslint-enable */
    }
    const markerEnd = {
      transform: `translate(${x}, ${y})`,
      d: 'M-6,0 L6,0 L0,8 Z'
    }
    let linkAddPosition = 'translate(-1000, -1000)'
    if (sourcePosition === 'top') {
      if (x && y) {
        pathD = `M${x0}, ${y0} L${x0}, ${y} L${x} ${y}`
        if (relativePosition.startsWith('center-top')) {
          markerEnd.transform = `translate(${x}, ${y + 8}) rotate(180)`
          pathD = `M${x0}, ${y0} L${x0}, ${(y + y0) / 2} L ${x}, ${(y + y0) / 2} L${x},${y}`
        } else if (relativePosition.startsWith('center-middle')) {
          markerEnd.transform = `translate(${x}, ${y - 8})`
          pathD = `M${x0}, ${y0} L${x0}, ${(y + y0) / 2} L ${x}, ${(y + y0) / 2} L${x},${y}`
        } else if (relativePosition.startsWith('center-bottom')) {
          markerEnd.transform = `translate(${x}, ${y - 8})`
          pathD = `M${x0}, ${y0} L${x0}, ${(y + y0) / 2} L ${x}, ${(y + y0) / 2} L${x},${y}`
        } else if (relativePosition.startsWith('left')) {
          markerEnd.transform = `translate(${x - 8}, ${y})`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        } else if (relativePosition.startsWith('right')) {
          markerEnd.transform = `translate(${x + 8}, ${y}) rotate(180)`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        }
      } else if (targetPosition === 'top') {
        markerEnd.transform = `translate(${x1}, ${y1 - 8})`
        linkAddPosition = `translate(${(x1 + x0) / 2}, ${Math.min(y1, y0) - 16})`
        pathD = `M${x0}, ${y0} L${x0}, ${Math.min(y1, y0) - 16} L ${x1}, ${Math.min(y1, y0) - 16} L${x1},${y1}`
      } else if (targetPosition === 'bottom') {
        markerEnd.transform = `translate(${x1}, ${y1 + 8}) rotate(180)`
        linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0) / 2})`
        if (y1 + 16 > y0) {
          pathD = `M${x0}, ${y0} L${x0}, ${y0 - 16} L ${(x1 + x0) / 2}, ${y0 - 16} L ${(x1 + x0) / 2}, ${y1 + 16} L ${x1}, ${y1 + 16} L${x1},${y1}`
        } else {
          pathD = `M${x0}, ${y0} L${x0}, ${(y1 + y0) / 2} L ${x1}, ${(y1 + y0) / 2} L${x1},${y1}`
        }
      } else if (targetPosition === 'left') {
        markerEnd.transform = `translate(${x1 - 8}, ${y1})`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        if (x0 > x1 - 16) {
          if (y1 + 16 > y0) {
            linkAddPosition = `translate(${x1 - 16}, ${(y1 + Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${x1 - 16} ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${x1 - 16} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${(y0 + y1) / 2} L${x1 - 16} ${(y0 + y1) / 2} L${x1 - 16} ${y1} L${x1} ${y1}`
          }
        } else {
          if (y1 + 16 > y0) {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${(x1 + x0) / 2} ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${(x1 + x0) / 2} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${x0}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${y1} L${x1} ${y1}`
          }
        }
      } else if (targetPosition === 'right') {
        markerEnd.transform = `translate(${x1 + 8}, ${y1}) rotate(180)`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        if (x1 > x0 - 16) {
          if (y1 + 16 > y0) {
            linkAddPosition = `translate(${x1 + 16}, ${(y1 + Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${x1 + 16} ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${x1 + 16} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${(y0 + y1) / 2} L${x1 + 16} ${(y0 + y1) / 2} L${x1 + 16} ${y1} L${x1} ${y1}`
          }
        } else {
          if (y1 + 16 > y0) {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${(x1 + x0) / 2} ${Math.min((y0 - 16), (y1 - targetConfig.y / 2 - 16))} L${(x1 + x0) / 2} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${x0}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${y1} L${x1} ${y1}`
          }
        }
      }
    } else if (sourcePosition === 'bottom') {
      if (x && y) {
        pathD = `M${x0}, ${y0} L${x0}, ${y} L${x} ${y}`
        if (relativePosition.startsWith('center-top')) {
          markerEnd.transform = `translate(${x}, ${y + 8}) rotate(180)`
          pathD = `M${x0}, ${y0} L${x0}, ${(y + y0) / 2} L ${x}, ${(y + y0) / 2} L${x},${y}`
        } else if (relativePosition.startsWith('center-middle')) {
          markerEnd.transform = `translate(${x}, ${y + 8}) rotate(180)`
          pathD = `M${x0}, ${y0} L${x0}, ${(y + y0) / 2} L ${x}, ${(y + y0) / 2} L${x},${y}`
        } else if (relativePosition.startsWith('center-bottom')) {
          markerEnd.transform = `translate(${x}, ${y - 8})`
          pathD = `M${x0}, ${y0} L${x0}, ${(y + y0) / 2} L ${x}, ${(y + y0) / 2} L${x},${y}`
        } else if (relativePosition.startsWith('left')) {
          markerEnd.transform = `translate(${x - 8}, ${y})`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        } else if (relativePosition.startsWith('right')) {
          markerEnd.transform = `translate(${x + 8}, ${y}) rotate(180)`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        }
      } else if (targetPosition === 'top') {
        markerEnd.transform = `translate(${x1}, ${y1 - 8})`
        linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0) / 2})`
        if (y0 > y1 - 16) {
          pathD = `M${x0}, ${y0} L${x0}, ${y0 + 16} L${(x1 + x0) / 2}, ${y0 + 16} L${(x1 + x0) / 2}, ${y1 - 16} L${x1}, ${y1 - 16} L${x1},${y1}`
        } else {
          pathD = `M${x0}, ${y0} L${x0}, ${(y1 + y0) / 2} L ${x1}, ${(y1 + y0) / 2} L${x1},${y1}`
        }
      } else if (targetPosition === 'bottom') {
        markerEnd.transform = `translate(${x1}, ${y1 + 8}) rotate(180)`
        linkAddPosition = `translate(${(x1 + x0) / 2}, ${Math.max(y1, y0) + 16})`
        pathD = `M${x0}, ${y0} L${x0}, ${Math.max(y1, y0) + 16} L ${x1}, ${Math.max(y1, y0) + 16} L${x1},${y1}`
      } else if (targetPosition === 'left') {
        markerEnd.transform = `translate(${x1 - 8}, ${y1})`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        if (x0 > x1 - 16) {
          if (y0 > y1 - 16) {
            linkAddPosition = `translate(${x1 - 16}, ${(y1 + Math.max((y0 + 16), y1 + targetConfig.y / 2 + 16)) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${Math.max((y0 + 16), y1 + targetConfig.y / 2 + 16)} L${x1 - 16} ${Math.max((y0 + 16), y1 + targetConfig.y / 2 + 16)} L${x1 - 16} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${(y0 + y1) / 2} L${x1 - 16} ${(y0 + y1) / 2} L${x1 - 16} ${y1} L${x1} ${y1}`
          }
        } else {
          if (y0 > y1 - 16) {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0 + 16) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${y0 + 16} L${(x1 + x0) / 2} ${y0 + 16} L${(x1 + x0) / 2} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${x0}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${y1} L${x1} ${y1}`
          }
        }
      } else if (targetPosition === 'right') {
        markerEnd.transform = `translate(${x1 + 8}, ${y1}) rotate(180)`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        if (x1 > x0 - 16) {
          if (y0 > y1 - 16) {
            linkAddPosition = `translate(${x1 + 16}, ${(y1 + Math.max((y0 + 16), y1 + targetConfig.y / 2 + 16)) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${Math.max((y0 + 16), y1 + targetConfig.y / 2 + 16)} L${x1 + 16} ${Math.max((y0 + 16), y1 + targetConfig.y / 2 + 16)} L${x1 + 16} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${(y0 + y1) / 2} L${x1 + 16} ${(y0 + y1) / 2} L${x1 + 16} ${y1} L${x1} ${y1}`
          }
        } else {
          if (y0 > y1 - 16) {
            linkAddPosition = `translate(${(x1 + x0) / 2}, ${(y1 + y0 + 16) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${y0 + 16} L${(x1 + x0) / 2} ${y0 + 16} L${(x1 + x0) / 2} ${y1} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${x0}, ${(y1 + y0) / 2})`
            pathD = `M${x0}, ${y0} L${x0}, ${y1} L${x1} ${y1}`
          }
        }
      }
    } else if (sourcePosition === 'left') {
      if (x && y) {
        pathD = `M${x0}, ${y0} L${x}, ${y0} L${x} ${y}`
        if (relativePosition === 'left-middle') {
          markerEnd.transform = `translate(${x - 8}, ${y})`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
          pathD = `M${x0}, ${y0} L${(x + x0) / 2}, ${y0} L ${(x + x0) / 2}, ${y} L${x},${y}`
        } else if (relativePosition === 'center-middle') {
          markerEnd.transform = `translate(${x - 8}, ${y}) rotate(180)`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
          pathD = `M${x0}, ${y0} L${(x + x0) / 2}, ${y0} L ${(x + x0) / 2}, ${y} L${x},${y}`
        } else if (relativePosition === 'right-middle') {
          markerEnd.transform = `translate(${x + 8}, ${y}) rotate(180)`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
          pathD = `M${x0}, ${y0} L${(x + x0) / 2}, ${y0} L ${(x + x0) / 2}, ${y} L${x},${y}`
        } else if (relativePosition.endsWith('top')) {
          markerEnd.transform = `translate(${x}, ${y + 8}) rotate(180)`
        }
      } else if (targetPosition === 'top') {
        markerEnd.transform = `translate(${x1}, ${y1 - 8})`
        if (y0 > y1 - 16) {
          if (x0 < x1 + 16) {
            linkAddPosition = `translate(${(Math.min((x0 - 16), x1 - targetConfig.x / 2 - 16) + x1) / 2}, ${y1 - 16})`
            pathD = `M${x0}, ${y0} L${Math.min((x0 - 16), x1 - targetConfig.x / 2 - 16)}, ${y0} L${Math.min((x0 - 16), x1 - targetConfig.x / 2 - 16)}, ${y1 - 16} L${x1}, ${y1 - 16} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 - 16 + x1) / 2}, ${y1 - 16})`
            pathD = `M${x0}, ${y0} L${x0 - 16}, ${y0} L${x0 - 16}, ${y1 - 16} L${x1}, ${y1 - 16} L${x1} ${y1}`
          }
        } else {
          if (x0 < x1 + 16) {
            linkAddPosition = `translate(${(x0 - 16 + x1) / 2}, ${(y0 + y1) / 2})`
            pathD = `M${x0}, ${y0} L${x0 - 16}, ${y0} L${x0 - 16}, ${(y0 + y1) / 2} L${x1}, ${(y0 + y1) / 2} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 + x1) / 2}, ${y0})`
            pathD = `M${x0}, ${y0} L${x1}, ${y0} L${x1} ${y1}`
          }
        }
      } else if (targetPosition === 'bottom') {
        markerEnd.transform = `translate(${x1}, ${y1 + 8}) rotate(180)`
        if (y0 < y1 + 16) {
          if (x0 < x1 + 16) {
            linkAddPosition = `translate(${(Math.min((x0 - 16), x1 - targetConfig.x / 2 - 16) + x1) / 2}, ${y1 + 16})`
            pathD = `M${x0}, ${y0} L${Math.min((x0 - 16), x1 - targetConfig.x / 2 - 16)}, ${y0} L${Math.min((x0 - 16), x1 - targetConfig.x / 2 - 16)}, ${y1 + 16} L${x1}, ${y1 + 16} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 - 16 + x1) / 2}, ${y1 + 16})`
            pathD = `M${x0}, ${y0} L${x0 - 16}, ${y0} L${x0 - 16}, ${y1 + 16} L${x1}, ${y1 + 16} L${x1} ${y1}`
          }
        } else {
          if (x0 < x1 + 16) {
            linkAddPosition = `translate(${(x0 - 16 + x1) / 2}, ${(y0 + y1) / 2})`
            pathD = `M${x0}, ${y0} L${x0 - 16}, ${y0} L${x0 - 16}, ${(y0 + y1) / 2} L${x1}, ${(y0 + y1) / 2} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 + x1) / 2}, ${y0})`
            pathD = `M${x0}, ${y0} L${x1}, ${y0} L${x1} ${y1}`
          }
        }
      } else if (targetPosition === 'left') {
        markerEnd.transform = `translate(${x1 - 8}, ${y1})`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        linkAddPosition = `translate(${Math.min(x1, x0) - 16}, ${(y0 + y1) / 2})`
        pathD = `M${x0}, ${y0} L${Math.min(x1, x0) - 16}, ${y0} L ${Math.min(x1, x0) - 16}, ${y1} L${x1},${y1}`
      } else if (targetPosition === 'right') {
        markerEnd.transform = `translate(${x1 + 8}, ${y1}) rotate(180)`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        linkAddPosition = `translate(${(x0 + x1) / 2}, ${(y0 + y1) / 2})`
        if (x0 < x1 + 16) {
          pathD = `M${x0}, ${y0} L${x0 - 16}, ${y0} L${x0 - 16}, ${(y0 + y1) / 2} L${x1 + 16}, ${(y0 + y1) / 2} L${x1 + 16}, ${y1} L${x1} ${y1}`
        } else {
          pathD = `M${x0}, ${y0} L${(x1 + x0) / 2}, ${y0} L ${(x1 + x0) / 2}, ${y1} L${x1},${y1}`
        }
      }
    } else if (sourcePosition === 'right') {
      if (x && y) {
        pathD = `M${x0}, ${y0} L${x}, ${y0} L${x} ${y}`
        if (relativePosition === 'left-middle') {
          markerEnd.transform = `translate(${x - 8}, ${y})`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
          pathD = `M${x0}, ${y0} L${(x + x0) / 2}, ${y0} L ${(x + x0) / 2}, ${y} L${x},${y}`
        } else if (relativePosition === 'center-middle') {
          markerEnd.transform = `translate(${x - 8}, ${y}) rotate(180)`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
          pathD = `M${x0}, ${y0} L${(x + x0) / 2}, ${y0} L ${(x + x0) / 2}, ${y} L${x},${y}`
        } else if (relativePosition === 'right-middle') {
          markerEnd.transform = `translate(${x + 8}, ${y}) rotate(180)`
          markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
          pathD = `M${x0}, ${y0} L${(x + x0) / 2}, ${y0} L ${(x + x0) / 2}, ${y} L${x},${y}`
        } else if (relativePosition.endsWith('top')) {
          markerEnd.transform = `translate(${x}, ${y + 8}) rotate(180)`
        }
      } else if (targetPosition === 'top') {
        markerEnd.transform = `translate(${x1}, ${y1 - 8})`
        if (y0 > y1 - 16) {
          if (x1 < x0 + 16) {
            linkAddPosition = `translate(${(Math.max((x0 + 16), x1 + targetConfig.x / 2 + 16) + x1) / 2}, ${y1 - 16})`
            pathD = `M${x0}, ${y0} L${Math.max((x0 + 16), x1 + targetConfig.x / 2 + 16)}, ${y0} L${Math.max((x0 + 16), x1 + targetConfig.x / 2 + 16)}, ${y1 - 16} L${x1}, ${y1 - 16} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 + 16 + x1) / 2}, ${y1 - 16})`
            pathD = `M${x0}, ${y0} L${x0 + 16}, ${y0} L${x0 + 16}, ${y1 - 16} L${x1}, ${y1 - 16} L${x1} ${y1}`
          }
        } else {
          if (x1 < x0 + 16) {
            linkAddPosition = `translate(${(x0 + 16 + x1) / 2}, ${y1 - 16})`
            pathD = `M${x0}, ${y0} L${x0 + 16}, ${y0} L${x0 + 16}, ${y1 - 16} L${x1}, ${y1 - 16} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 + x1) / 2}, ${y0})`
            pathD = `M${x0}, ${y0} L${x1}, ${y0} L${x1} ${y1}`
          }
        }
      } else if (targetPosition === 'bottom') {
        markerEnd.transform = `translate(${x1}, ${y1 + 8}) rotate(180)`
        if (y0 < y1 + 16) {
          if (x1 < x0 + 16) {
            linkAddPosition = `translate(${(Math.max((x0 + 16), x1 + targetConfig.x / 2 + 16) + x1) / 2}, ${y1 + 16})`
            pathD = `M${x0}, ${y0} L${Math.max((x0 + 16), x1 + targetConfig.x / 2 + 16)}, ${y0} L${Math.max((x0 + 16), x1 + targetConfig.x / 2 + 16)}, ${y1 + 16} L${x1}, ${y1 + 16} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 + 16 + x1) / 2}, ${y1 + 16})`
            pathD = `M${x0}, ${y0} L${x0 + 16}, ${y0} L${x0 + 16}, ${y1 + 16} L${x1}, ${y1 + 16} L${x1} ${y1}`
          }
        } else {
          if (x1 < x0 + 16) {
            linkAddPosition = `translate(${(x0 + 16 + x1) / 2}, ${y1 + 16})`
            pathD = `M${x0}, ${y0} L${x0 + 16}, ${y0} L${x0 + 16}, ${y1 + 16} L${x1}, ${y1 + 16} L${x1} ${y1}`
          } else {
            linkAddPosition = `translate(${(x0 + x1) / 2}, ${y0})`
            pathD = `M${x0}, ${y0} L${x1}, ${y0} L${x1} ${y1}`
          }
        }
      } else if (targetPosition === 'left') {
        markerEnd.transform = `translate(${x1 - 8}, ${y1})`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        linkAddPosition = `translate(${(x0 + x1) / 2}, ${(y0 + y1) / 2})`
        if (x1 < x0 + 16) {
          pathD = `M${x0}, ${y0} L${x0 + 16}, ${y0} L${x0 + 16}, ${(y1 + y0) / 2} L${x1 - 16}, ${(y1 + y0) / 2} L${x1 - 16}, ${y1} L${x1} ${y1}`
        } else {
          pathD = `M${x0}, ${y0} L${(x1 + x0) / 2}, ${y0} L ${(x1 + x0) / 2}, ${y1} L${x1},${y1}`
        }
      } else if (targetPosition === 'right') {
        markerEnd.transform = `translate(${x1 + 8}, ${y1}) rotate(180)`
        markerEnd.d = 'M0,-6 L0,6 L8,0 Z'
        linkAddPosition = `translate(${Math.max(x1, x0) + 16}, ${(y0 + y1) / 2})`
        pathD = `M${x0}, ${y0} L${Math.max(x1, x0) + 16}, ${y0} L ${Math.max(x1, x0) + 16}, ${y1} L${x1},${y1}`
      }
    }
    return { markerEnd, pathD, linkAddPosition }
  }

  getRelativePosition ({ x0, y0 }, { x1, y1 }) {
    let position = ''
    if (Math.abs(x0 - x1) < 16) {
      position += 'center'
    } else if (x0 < x1) {
      position += 'left'
    } else {
      position += 'right'
    }

    if (Math.abs(y0 - y1) < 16) {
      position += '-middle'
    } else if (y0 > y1) {
      position += '-top'
    } else {
      position += '-bottom'
    }
    return position
  }

  getPointerPosition (position, node, config) {
    let x = 0; let y = 0
    if (position === 'top') {
      x = node.x
      y = node.y - config.y / 2
    } else if (position === 'bottom') {
      x = node.x
      y = node.y + config.y / 2
    } else if (position === 'left') {
      x = node.x - config.x / 2
      y = node.y
    } else if (position === 'right') {
      x = node.x + config.x / 2
      y = node.y
    }
    return { x, y }
  }

  setNodeMap () {
    this.nodeMap = this.nodes.reduce((total, current) => {
      total[current.id] = current
      return total
    }, {})
  }

  update () {
    this.setNodeMap()
    this.updateNodes()
    this.updatePointers()
    this.updateLinks()
    // console.log('this.nodes', this.nodes)
    // console.log('this.links', this.links)
  }

  /**
   * 新增节点
   * @param {*} node
   */
  addNode (node) {
    this.nodes.push(node)
    this.update()
  }

  /**
   * 更新节点
   * @param {*} node
   */
  updateNode (node) {
    this.nodes.forEach(n => {
      if (n.id === node?.id) {
        Object.assign(n, node)
        this.update()
      }
    })
  }

  /**
   * 新增分支
   * @param {*} node
   * @param {*} parent
   */
  addBranch (node, parent) {
    const index = parent.children.length - 1
    parent.children.splice(index, 0, {
      expression: '分支',
      conditionType: 'formula',
      conditions: '1 === 1',
      ...node
    })
    this.update()
  }

  /**
   * 更新分支
   * @param {} node
   */
  updateBranch (node) {
    this.nodes.forEach(n => {
      if (n.id === node?.id) {
        Object.assign(n, node)
        this.updateLinks()
      }
    })
  }

  getChildrenSize (data, deep) {
    let size = 0
    const fn = (data) => {
      data.children.forEach(item => {
        if (!['loop-close', 'branch-close'].includes(item.type)) ++size
        if (deep && item.children) fn(item)
      })
    }
    fn(data, deep)
    return size
  }

  on (type, fn) {
    if (this._events[type]) {
      this._events[type].push(fn)
    } else {
      this._events[type] = [fn]
    }
  }

  off (type) {
    this._events[type] = []
  }

  emit (type, ...args) {
    (this._events[type] || []).forEach(fn => {
      fn.call(this, ...args)
    })
  }
}
