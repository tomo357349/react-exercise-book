import { http, HttpResponse } from 'msw';

const tsv = `ja	en	alpha3	alpha2 flag
アイスランド,Iceland,ISL,IS,🇮🇸
アイルランド,Ireland,IRL,IE,🇮🇪
アゼルバイジャン,Azerbaijan,AZE,AZ,🇦🇿
アフガニスタン,Afghanistan,AFG,AF,🇦🇫
アメリカ合衆国,United States of America,USA,US,🇺🇸
アメリカ領ヴァージン諸島,Virgin Islands (U.S.),VIR,VI,🇻🇮
アメリカ領サモア,American Samoa,ASM,AS,🇦🇸
アラブ首長国連邦,United Arab Emirates,ARE,AE,🇦🇪
アルジェリア,Algeria,DZA,DZ,🇩🇿
アルゼンチン,Argentina,ARG,AR,🇦🇷
アルバ,Aruba,ABW,AW,🇦🇼
アルバニア,Albania,ALB,AL,🇦🇱
アルメニア,Armenia,ARM,AM,🇦🇲
アンギラ,Anguilla,AIA,AI,🇦🇮
アンゴラ,Angola,AGO,AO,🇦🇴
アンティグア・バーブーダ,Antigua and Barbuda,ATG,AG,🇦🇬
アンドラ,Andorra,AND,AD,🇦🇩
イエメン,Yemen,YEM,YE,🇾🇪
イギリス,United Kingdom of Great Britain and Northern Ireland,GBR,GB,🇬🇧
イギリス領インド洋地域,British Indian Ocean Territory,IOT,IO,🇮🇴
イギリス領ヴァージン諸島,Virgin Islands (British),VGB,VG,🇻🇬
イスラエル,Israel,ISR,IL,🇮🇱
イタリア,Italy,ITA,IT,🇮🇹
イラク,Iraq,IRQ,IQ,🇮🇶
イラン・イスラム共和国,Iran (Islamic Republic of),IRN,IR,🇮🇷
インド,India,IND,IN,🇮🇳
インドネシア,Indonesia,IDN,ID,🇮🇩
ウォリス・フツナ,Wallis and Futuna,WLF,WF,🇼🇫
ウガンダ,Uganda,UGA,UG,🇺🇬
ウクライナ,Ukraine,UKR,UA,🇺🇦
ウズベキスタン,Uzbekistan,UZB,UZ,🇺🇿
ウルグアイ,Uruguay,URY,UY,🇺🇾
エクアドル,Ecuador,ECU,EC,🇪🇨
エジプト,Egypt,EGY,EG,🇪🇬
エストニア,Estonia,EST,EE,🇪🇪
エスワティニ,Eswatini,SWZ,SZ,🇸🇿
エチオピア,Ethiopia,ETH,ET,🇪🇹
エリトリア,Eritrea,ERI,ER,🇪🇷
エルサルバドル,El Salvador,SLV,SV,🇸🇻
オーストラリア,Australia,AUS,AU,🇦🇺
オーストリア,Austria,AUT,AT,🇦🇹
オーランド諸島,Åland Islands,ALA,AX,🇦🇽
オマーン,Oman,OMN,OM,🇴🇲
オランダ,Netherlands,NLD,NL,🇳🇱
ガーナ,Ghana,GHA,GH,🇬🇭
カーボベルデ,Cabo Verde,CPV,CV,🇨🇻
ガーンジー,Guernsey,GGY,GG,🇬🇬
ガイアナ,Guyana,GUY,GY,🇬🇾
カザフスタン,Kazakhstan,KAZ,KZ,🇰🇿
カタール,Qatar,QAT,QA,🇶🇦
合衆国領有小離島,United States Minor Outlying Islands,UMI,UM,
カナダ,Canada,CAN,CA,🇨🇦
ガボン,Gabon,GAB,GA,🇬🇦
カメルーン,Cameroon,CMR,CM,🇨🇲
ガンビア,Gambia,GMB,GM,🇬🇲
カンボジア,Cambodia,KHM,KH,🇰🇭
北マケドニア,North Macedonia,MKD,MK,🇲🇰
北マリアナ諸島,Northern Mariana Islands,MNP,MP,🇲🇵
ギニア,Guinea,GIN,GN,🇬🇳
ギニアビサウ,Guinea-Bissau,GNB,GW,🇬🇼
キプロス,Cyprus,CYP,CY,🇨🇾
キューバ,Cuba,CUB,CU,🇨🇺
キュラソー,Curaçao,CUW,CW,🇨🇼
ギリシャ,Greece,GRC,GR,🇬🇷
キリバス,Kiribati,KIR,KI,🇰🇮
キルギス,Kyrgyzstan,KGZ,KG,🇰🇬
グアテマラ,Guatemala,GTM,GT,🇬🇹
グアドループ,Guadeloupe,GLP,GP,🇬🇵
グアム,Guam,GUM,GU,🇬🇺
クウェート,Kuwait,KWT,KW,🇰🇼
クック諸島,Cook Islands,COK,CK,🇨🇰
グリーンランド,Greenland,GRL,GL,🇬🇱
クリスマス島,Christmas Island,CXR,CX,🇨🇽
グレナダ,Grenada,GRD,GD,🇬🇩
クロアチア,Croatia,HRV,HR,🇭🇷
ケイマン諸島,Cayman Islands,CYM,KY,🇰🇾
ケニア,Kenya,KEN,KE,🇰🇪
コートジボワール,Côte d'Ivoire,CIV,CI,🇨🇮
ココス（キーリング）諸島,Cocos (Keeling) Islands,CCK,CC,🇨🇨
コスタリカ,Costa Rica,CRI,CR,🇨🇷
コモロ,Comoros,COM,KM,🇰🇲
コロンビア,Colombia,COL,CO,🇨🇴
コンゴ共和国,Congo,COG,CG,🇨🇬
コンゴ民主共和国,Congo / Democratic Republic of the,COD,CD,🇨🇩
サウジアラビア,Saudi Arabia,SAU,SA,🇸🇦
サウスジョージア・サウスサンドウィッチ諸島,South Georgia and the South Sandwich Islands,SGS,GS,🇬🇸
サモア,Samoa,WSM,WS,🇼🇸
サントメ・プリンシペ,Sao Tome and Principe,STP,ST,
サン・バルテルミー,Saint Barthélemy,BLM,BL,🇧🇱
ザンビア,Zambia,ZMB,ZM,🇿🇲
サンピエール島・ミクロン島,Saint Pierre and Miquelon,SPM,PM,🇵🇲
サンマリノ,San Marino,SMR,SM,🇸🇲
サン・マルタン（フランス領）,Saint Martin (French part),MAF,MF,🇲🇫
シエラレオネ,Sierra Leone,SLE,SL,🇸🇱
ジブチ,Djibouti,DJI,DJ,🇩🇯
ジブラルタル,Gibraltar,GIB,GI,🇬🇮
ジャージー,Jersey,JEY,JE,🇯🇪
ジャマイカ,Jamaica,JAM,JM,🇯🇲
ジョージア,Georgia,GEO,GE,🇬🇪
シリア・アラブ共和国,Syrian Arab Republic,SYR,SY,🇸🇾
シンガポール,Singapore,SGP,SG,🇸🇬
シント・マールテン（オランダ領）,Sint Maarten (Dutch part),SXM,SX,🇸🇽
ジンバブエ,Zimbabwe,ZWE,ZW,🇿🇼
スイス,Switzerland,CHE,CH,🇨🇭
スウェーデン,Sweden,SWE,SE,🇸🇪
スーダン,Sudan,SDN,SD,🇸🇩
スヴァールバル諸島およびヤンマイエン島,Svalbard and Jan Mayen,SJM,SJ,🇸🇯
スペイン,Spain,ESP,ES,🇪🇸
スリナム,Suriname,SUR,SR,🇸🇷
スリランカ,Sri Lanka,LKA,LK,🇱🇰
スロバキア,Slovakia,SVK,SK,🇸🇰
スロベニア,Slovenia,SVN,SI,🇸🇮
セーシェル,Seychelles,SYC,SC,🇸🇨
赤道ギニア,Equatorial Guinea,GNQ,GQ,🇬🇶
セネガル,Senegal,SEN,SN,🇸🇳
セルビア,Serbia,SRB,RS,🇷🇸
セントクリストファー・ネイビス,Saint Kitts and Nevis,KNA,KN,🇰🇳
セントビンセント・グレナディーン,Saint Vincent and the Grenadines,VCT,VC,🇻🇨
セントヘレナ・アセンションおよびトリスタンダクーニャ,Saint Helena / Ascension and Tristan da Cunha,SHN,SH,🇸🇭
セントルシア,Saint Lucia,LCA,LC,🇱🇨
ソマリア,Somalia,SOM,SO,🇸🇴
ソロモン諸島,Solomon Islands,SLB,SB,🇸🇧
タークス・カイコス諸島,Turks and Caicos Islands,TCA,TC,🇹🇨
タイ,Thailand,THA,TH,🇹🇭
大韓民国,Korea (the Republic of),KOR,KR,🇰🇷
台湾（中華民国）,Taiwan / Province of China,TWN,TW,🇹🇼
タジキスタン,Tajikistan,TJK,TJ,🇹🇯
タンザニア,Tanzania / United Republic of,TZA,TZ,🇹🇿
チェコ,Czechia,CZE,CZ,🇨🇿
チャド,Chad,TCD,TD,🇹🇩
中央アフリカ共和国,Central African Republic,CAF,CF,🇨🇫
中華人民共和国,China,CHN,CN,🇨🇳
チュニジア,Tunisia,TUN,TN,🇹🇳
朝鮮民主主義人民共和国,Korea (the Democratic People's Republic of),PRK,KP,🇰🇵
チリ,Chile,CHL,CL,🇨🇱
ツバル,Tuvalu,TUV,TV,🇹🇻
デンマーク,Denmark,DNK,DK,🇩🇰
ドイツ,Germany,DEU,DE,🇩🇪
トーゴ,Togo,TGO,TG,🇹🇬
トケラウ,Tokelau,TKL,TK,🇹🇰
ドミニカ共和国,Dominican Republic,DOM,DO,🇩🇴
ドミニカ国,Dominica,DMA,DM,🇩🇲
トリニダード・トバゴ,Trinidad and Tobago,TTO,TT,🇹🇹
トルクメニスタン,Turkmenistan,TKM,TM,🇹🇲
トルコ,Turkey,TUR,TR,🇹🇷
トンガ,Tonga,TON,TO,🇹🇴
ナイジェリア,Nigeria,NGA,NG,🇳🇬
ナウル,Nauru,NRU,NR,🇳🇷
ナミビア,Namibia,NAM,NA,🇳🇦
南極,Antarctica,ATA,AQ,🇦🇶
ニウエ,Niue,NIU,NU,🇳🇺
ニカラグア,Nicaragua,NIC,NI,🇳🇮
ニジェール,Niger,NER,NE,🇳🇪
日本,Japan,JPN,JP,🇯🇵
西サハラ,Western Sahara,ESH,EH,🇪🇭
ニューカレドニア,New Caledonia,NCL,NC,🇳🇨
ニュージーランド,New Zealand,NZL,NZ,🇳🇿
ネパール,Nepal,NPL,NP,🇳🇵
ノーフォーク島,Norfolk Island,NFK,NF,🇳🇫
ノルウェー,Norway,NOR,NO,🇳🇴
ハード島とマクドナルド諸島,Heard Island and McDonald Islands,HMD,HM,🇭🇲
バーレーン,Bahrain,BHR,BH,🇧🇭
ハイチ,Haiti,HTI,HT,🇭🇹
パキスタン,Pakistan,PAK,PK,🇵🇰
バチカン市国,Holy See,VAT,VA,🇻🇦
パナマ,Panama,PAN,PA,🇵🇦
バヌアツ,Vanuatu,VUT,VU,🇻🇺
バハマ,Bahamas,BHS,BS,🇧🇸
パプアニューギニア,Papua New Guinea,PNG,PG,🇵🇬
バミューダ,Bermuda,BMU,BM,🇧🇲
パラオ,Palau,PLW,PW,🇵🇼
パラグアイ,Paraguay,PRY,PY,🇵🇾
バルバドス,Barbados,BRB,BB,🇧🇧
パレスチナ,Palestine / State of,PSE,PS,🇵🇸
ハンガリー,Hungary,HUN,HU,🇭🇺
バングラデシュ,Bangladesh,BGD,BD,🇧🇩
東ティモール,Timor-Leste,TLS,TL,🇹🇱
ピトケアン,Pitcairn,PCN,PN,🇵🇳
フィジー,Fiji,FJI,FJ,🇫🇯
フィリピン,Philippines,PHL,PH,🇵🇭
フィンランド,Finland,FIN,FI,🇫🇮
ブータン,Bhutan,BTN,BT,🇧🇹
ブーベ島,Bouvet Island,BVT,BV,🇧🇻
プエルトリコ,Puerto Rico,PRI,PR,🇵🇷
フェロー諸島,Faroe Islands,FRO,FO,🇫🇴
フォークランド（マルビナス）諸島,Falkland Islands (Malvinas),FLK,FK,🇫🇰
ブラジル,Brazil,BRA,BR,🇧🇷
フランス,France,FRA,FR,🇫🇷
フランス領ギアナ,French Guiana,GUF,GF,🇬🇫
フランス領ポリネシア,French Polynesia,PYF,PF,🇵🇫
フランス領南方・南極地域,French Southern Territories,ATF,TF,
ブルガリア,Bulgaria,BGR,BG,🇧🇬
ブルキナファソ,Burkina Faso,BFA,BF,🇧🇫
ブルネイ・ダルサラーム,Brunei Darussalam,BRN,BN,🇧🇳
ブルンジ,Burundi,BDI,BI,🇧🇮
ベトナム,Viet Nam,VNM,VN,🇻🇳
ベナン,Benin,BEN,BJ,🇧🇯
ベネズエラ・ボリバル共和国,Venezuela (Bolivarian Republic of),VEN,VE,🇻🇪
ベラルーシ,Belarus,BLR,BY,🇧🇾
ベリーズ,Belize,BLZ,BZ,🇧🇿
ペルー,Peru,PER,PE,🇵🇪
ベルギー,Belgium,BEL,BE,🇧🇪
ポーランド,Poland,POL,PL,🇵🇱
ボスニア・ヘルツェゴビナ,Bosnia and Herzegovina,BIH,BA,🇧🇦
ボツワナ,Botswana,BWA,BW,🇧🇼
ボネール、シント・ユースタティウスおよびサバ,Bonaire / Sint Eustatius and Saba,BES,BQ,
ボリビア多民族国,Bolivia (Plurinational State of),BOL,BO,🇧🇴
ポルトガル,Portugal,PRT,PT,🇵🇹
香港,Hong Kong,HKG,HK,🇭🇰
ホンジュラス,Honduras,HND,HN,🇭🇳
マーシャル諸島,Marshall Islands,MHL,MH,🇲🇭
マカオ,Macau,MAC,MO,🇲🇴
マダガスカル,Madagascar,MDG,MG,🇲🇬
マヨット,Mayotte,MYT,YT,🇾🇹
マラウイ,Malawi,MWI,MW,🇲🇼
マリ,Mali,MLI,ML,🇲🇱
マルタ,Malta,MLT,MT,🇲🇹
マルティニーク,Martinique,MTQ,MQ,🇲🇶
マレーシア,Malaysia,MYS,MY,🇲🇾
マン島,Isle of Man,IMN,IM,🇮🇲
ミクロネシア連邦,Micronesia (Federated States of),FSM,FM,🇫🇲
南アフリカ,South Africa,ZAF,ZA,🇿🇦
南スーダン,South Sudan,SSD,SS,🇸🇸
ミャンマー,Myanmar,MMR,MM,🇲🇲
メキシコ,Mexico,MEX,MX,🇲🇽
モーリシャス,Mauritius,MUS,MU,🇲🇺
モーリタニア,Mauritania,MRT,MR,🇲🇷
モザンビーク,Mozambique,MOZ,MZ,🇲🇿
モナコ,Monaco,MCO,MC,🇲🇨
モルディブ,Maldives,MDV,MV,🇲🇻
モルドバ共和国,Moldova / Republic of,MDA,MD,🇲🇩
モロッコ,Morocco,MAR,MA,🇲🇦
モンゴル,Mongolia,MNG,MN,🇲🇳
モンテネグロ,Montenegro,MNE,ME,🇲🇪
モントセラト,Montserrat,MSR,MS,🇲🇸
ヨルダン,Jordan,JOR,JO,🇯🇴
ラオス人民民主共和国,Lao People's Democratic Republic,LAO,LA,🇱🇦
ラトビア,Latvia,LVA,LV,🇱🇻
リトアニア,Lithuania,LTU,LT,🇱🇹
リビア,Libya,LBY,LY,🇱🇾
リヒテンシュタイン,Liechtenstein,LIE,LI,🇱🇮
リベリア,Liberia,LBR,LR,🇱🇷
ルーマニア,Romania,ROU,RO,🇷🇴
ルクセンブルク,Luxembourg,LUX,LU,🇱🇺
ルワンダ,Rwanda,RWA,RW,🇷🇼
レソト,Lesotho,LSO,LS,🇱🇸
レバノン,Lebanon,LBN,LB,🇱🇧
レユニオン,Réunion,REU,RE,
ロシア連邦,Russian Federation,RUS,RU,🇷🇺`;

const data = tsv.replaceAll('\r', '').split('\n').slice(1).map(line => {
  const tokens = line.split(',');
  return {
    value: tokens[2],
    desc: (tokens[4] || '') + ' ' + tokens[1],
  };
}).sort((a, b) => {
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
});

const handlers = [
    http.get('/api/country', async () => {
      await wait(1500); // ロードが遅れた状況をテストしたい
  		return HttpResponse.json(data);
    }),
];
export default handlers;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}