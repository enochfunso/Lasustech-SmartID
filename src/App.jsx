import { useState, useEffect, useCallback, useRef } from "react";

// ── Assets (base64 embedded from uploads) ──────────────────────────────────
const LOGO = "/logo.jpg";
const BG = "/gate.jpg";
// ── Data ──────────────────────────────────────────────────────────────────
const STUDENTS = [
  { matric:"220303010003", surname:"BELLO", name:"Bello Toyyibah Olorunwa", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"BT", attendance:7 },
  { matric:"220303010001", surname:"ABDULSALAM", name:"Abdulsalam Sulaiman Babatunde", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"AS", attendance:6 },
  { matric:"220303010002", surname:"BALOGUN", name:"Balogun Sherifat Temitope", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"BS", attendance:6 },
  { matric:"220303010004", surname:"ENIOLA", name:"Eniola Hazzanat Kehinde", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"EH", attendance:9 },
  { matric:"220303010005", surname:"OSHIDERU", name:"Oshideru Basit Timileyin", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"OB", attendance:15 },
  { matric:"220303010006", surname:"IDOWU", name:"Idowu Morenike Yetunde", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"IM", attendance:6 },
  { matric:"220303010007", surname:"AGBOOLA", name:"Agboola Adeyinka Isaac", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:16 },
  { matric:"220303010008", surname:"ODUWOLE", name:"Oduwole Hassan Olabanji", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"OH", attendance:14 },
  { matric:"220303010009", surname:"EMMANUEL", name:"Emmanuel Raymond Bayo", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"ER", attendance:11 },
  { matric:"220303010011", surname:"MUTIU", name:"Mutiu Abdulwahab Olalekan", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"MA", attendance:9 },
  { matric:"220303010013", surname:"TALABI", name:"Talabi Olamide Abigeal", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"TO", attendance:16 },
  { matric:"220303010014", surname:"IGE", name:"Ige Oreoluwa Oluwanifemi", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"IO", attendance:11 },
  { matric:"220303010015", surname:"RAJI", name:"Raji Toheeb Oluwapelumi", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"RT", attendance:8 },
  { matric:"220303010016", surname:"OGBE", name:"Ogbe Ayobami Dennis", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:15 },
  { matric:"220303010017", surname:"AWOSANYA", name:"Awosanya Abayomi Micheal", dept:"Computer Science", level:"400L", group:1, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:9 },
  { matric:"220303010012", surname:"OLUWA", name:"Oluwa Agape Jomiloju", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:16 },
  { matric:"220303010018", surname:"TAIWO", name:"Taiwo Temiloluwa Adefolarin", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"TT", attendance:11 },
  { matric:"220303010019", surname:"OREAGBA", name:"Oreagba Ahmed Olasubomi", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:6 },
  { matric:"220303010020", surname:"OLOWU", name:"Olowu Nofisat Tomiwa", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"ON", attendance:7 },
  { matric:"220303010021", surname:"IBITAYO", name:"Ibitayo Emmanuel Oluwatosin", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"IE", attendance:13 },
  { matric:"220303010022", surname:"OLAGUNJU", name:"Olagunju Basheer Olaniyi", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:false, library:true, medical:true, avatar:"OB", attendance:16 },
  { matric:"220303010023", surname:"OKUNMOYINBO", name:"Okunmoyinbo Moshood Akande", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OM", attendance:10 },
  { matric:"220303010025", surname:"OYEWUMI", name:"Oyewumi Precious Adewale", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OP", attendance:10 },
  { matric:"220303010026", surname:"ODUNLAMI", name:"Odunlami Oludamilare Israel", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:11 },
  { matric:"220303010027", surname:"AMUSA", name:"Amusa Abdul Azeez Adeyinka", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:16 },
  { matric:"220303010028", surname:"ODUSOTE", name:"Odusote Mayowa Ebenezer", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OM", attendance:5 },
  { matric:"220303010029", surname:"ADEYEMI", name:"Adeyemi Temidayo Timilehin", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"AT", attendance:10 },
  { matric:"220303010030", surname:"JIMOH", name:"Jimoh Segun Oluwashoga", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"JS", attendance:6 },
  { matric:"220303010031", surname:"YAYA", name:"Yaya Yusuf Olakunle", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"YY", attendance:6 },
  { matric:"220303010032", surname:"ODUNLAMI", name:"Odunlami Ridwan Ayomide", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"OR", attendance:11 },
  { matric:"220303010033", surname:"MATTHEW", name:"Matthew Boluwatife Sesinu", dept:"Computer Science", level:"400L", group:2, fees:true, enrolled:true, library:true, medical:true, avatar:"MB", attendance:8 },
  { matric:"220303010040", surname:"AMUSA", name:"Amusa Mutmainah Titilope", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:10 },
  { matric:"220303010034", surname:"ALINA", name:"Alina Chikwado Godsaves", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AC", attendance:14 },
  { matric:"220303010035", surname:"BASHORUN", name:"Bashorun Ayomikun Elijah", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"BA", attendance:9 },
  { matric:"220303010036", surname:"DANESI", name:"Danesi Aishat Oyinkansola", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"DA", attendance:15 },
  { matric:"220303010037", surname:"SAULA", name:"Saula Quadri Toluwalase", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"SQ", attendance:8 },
  { matric:"220303010038", surname:"OWOYALUMO", name:"Owoyalumo Abdul-Akeem Akanji", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:13 },
  { matric:"220303010039", surname:"ABDULGANIU", name:"Abdulganiu Imran Oreoluwa", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AI", attendance:16 },
  { matric:"220303010041", surname:"ADELEYE", name:"Adeleye Jamaldeen Ademola", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AJ", attendance:15 },
  { matric:"220303010042", surname:"USIAGWU", name:"Usiagwu Nicholas Onyema", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"UN", attendance:7 },
  { matric:"220303010044", surname:"AKINWOLIRE", name:"Akinwolire Daniel Oluwatobi", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AD", attendance:10 },
  { matric:"220303010045", surname:"MATTI", name:"Matti Roqeeb Ayodeji", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"MR", attendance:7 },
  { matric:"220303010046", surname:"AGBOMABINI", name:"Agbomabini Yusuf Akanni", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AY", attendance:7 },
  { matric:"220303010047", surname:"BADA", name:"Bada Muiz Chika", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"BM", attendance:14 },
  { matric:"220303010048", surname:"BAYOR-BLACK", name:"Bayor-Black Khalil Olaoluwasubomi", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"BK", attendance:5 },
  { matric:"220303010049", surname:"AJIMALUFIN", name:"Ajimalufin Joshua Oluwatimilehin", dept:"Computer Science", level:"400L", group:3, fees:true, enrolled:true, library:true, medical:true, avatar:"AJ", attendance:6 },
  { matric:"220303010053", surname:"AKINRINADE", name:"Akinrinade Moses Imisioluwa", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:13 },
  { matric:"220303010050", surname:"ELIAS", name:"Elias Adedamola Tajudeen", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"EA", attendance:12 },
  { matric:"220303010051", surname:"LAJORIN", name:"Lajorin Tioluwani Abraham", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"LT", attendance:9 },
  { matric:"220303010052", surname:"HASSAN", name:"Hassan Samuel Imoleayo", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"HS", attendance:6 },
  { matric:"220303010054", surname:"DAUDA", name:"Dauda Adam Odunayo", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"DA", attendance:6 },
  { matric:"220303010055", surname:"MOHAMMED", name:"Mohammed Habeebat Ayomide", dept:"Computer Science", level:"400L", group:4, fees:false, enrolled:false, library:true, medical:true, avatar:"MH", attendance:8 },
  { matric:"220303010056", surname:"SODIQ", name:"Sodiq Ayomide John", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"SA", attendance:11 },
  { matric:"220303010057", surname:"TADE", name:"Tade Suleiman Boluwatife", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"TS", attendance:14 },
  { matric:"220303010058", surname:"KAZEEM", name:"Kazeem Ibrahim Omogbolahan", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"KI", attendance:8 },
  { matric:"220303010060", surname:"MUMUNI", name:"Mumuni Quadri Akorede", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"MQ", attendance:13 },
  { matric:"220303010061", surname:"HAMZAT", name:"Hamzat Lateefat Olashile", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"HL", attendance:5 },
  { matric:"220303010062", surname:"ASADE", name:"Asade Fawaz Adedamola", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"AF", attendance:8 },
  { matric:"220303010063", surname:"ROSANWO", name:"Rosanwo Emmanuel Oluwajuwon", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"RE", attendance:16 },
  { matric:"220303010065", surname:"AMISU", name:"Amisu Mariam Tolulope", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:6 },
  { matric:"220303010067", surname:"OLAGESHIN", name:"Olageshin Jesujinde Samuel", dept:"Computer Science", level:"400L", group:4, fees:true, enrolled:true, library:true, medical:true, avatar:"OJ", attendance:8 },
  { matric:"220303010010", surname:"ADEBISI", name:"Adebisi Emmanuel Oluwatobi", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"AE", attendance:13 },
  { matric:"220303010068", surname:"ABIODUN", name:"Abiodun Oluwatofope Timothy", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"AO", attendance:12 },
  { matric:"220303010069", surname:"SHOREMI", name:"Shoremi Olasubomi Rinsayo", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"SO", attendance:14 },
  { matric:"220303010070", surname:"SOLUADE", name:"Soluade Favour Ogooluwa", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"SF", attendance:8 },
  { matric:"220303010071", surname:"IREYIMIKA", name:"Ireyimika Perez Irebami", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"IP", attendance:11 },
  { matric:"220303010072", surname:"LOUIS", name:"Louis Praise Ezinne", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"LP", attendance:12 },
  { matric:"220303010073", surname:"OSHUN", name:"Oshun Ayomide Oluwapelumi", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:5 },
  { matric:"220303010074", surname:"ADEYEMO", name:"Adeyemo Idris Ayinde", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"AI", attendance:7 },
  { matric:"220303010075", surname:"OLABOYE", name:"Olaboye Sultan Damilare", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"OS", attendance:7 },
  { matric:"220303010076", surname:"ADEBOGUN", name:"Adebogun Oluwatobiloba Emmanuel", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"AO", attendance:10 },
  { matric:"220303010077", surname:"LAWAL", name:"Lawal Kareemot Oluwatosin", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"LK", attendance:12 },
  { matric:"220303010078", surname:"PIKUDA", name:"Pikuda Ayomide Oyindamola", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"PA", attendance:11 },
  { matric:"220303010079", surname:"OLOWOGABA", name:"Olowogaba Mayowa Isaac", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"OM", attendance:12 },
  { matric:"220303010083", surname:"ORIOLA", name:"Oriola Mijohotho Moses", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"OM", attendance:10 },
  { matric:"220303010086", surname:"EZECHINYERE", name:"Ezechinyere Chijioke Casmir", dept:"Computer Science", level:"400L", group:5, fees:true, enrolled:true, library:true, medical:true, avatar:"EC", attendance:14 },
  { matric:"220303010084", surname:"OLUWATOBI", name:"Oluwatobi Oluwaseyi Isaac", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:14 },
  { matric:"220303010081", surname:"ERIJO", name:"Erijo Ogheneovo Emmanuel", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"EO", attendance:10 },
  { matric:"220303010082", surname:"ONIKOSI", name:"Onikosi Oyekanmi Abdulmajid", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:11 },
  { matric:"220303010085", surname:"MOTAJO", name:"Motajo Sulaimon Ashafa", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"MS", attendance:7 },
  { matric:"220303010087", surname:"ARIYO", name:"Ariyo Aderonmulo Muhammed", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:14 },
  { matric:"220303010088", surname:"EWUNUGA", name:"Ewunuga Joshua Adefarasin", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"EJ", attendance:15 },
  { matric:"220303010089", surname:"ALSHAWWAL", name:"Alshawwal Abdulsalam Olakunmi", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:14 },
  { matric:"220303010090", surname:"AKEWUSOLA", name:"Akewusola Abdulsamad Oluwatomisin", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:5 },
  { matric:"220303010091", surname:"AKPAN", name:"Akpan Emmanuel Titus", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"AE", attendance:7 },
  { matric:"220303010092", surname:"ODUBONA", name:"Odubona Muiz Adegbola", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"OM", attendance:10 },
  { matric:"220303010093", surname:"SALAKO", name:"Salako Oluwatunmishe Ayokunle", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"SO", attendance:16 },
  { matric:"220303010094", surname:"RUFAI", name:"Rufai Aisha Olasiju", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"RA", attendance:16 },
  { matric:"220303010095", surname:"ADEYANJU", name:"Adeyanju Adesegun Oloja", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:7 },
  { matric:"220303010096", surname:"ADESANYA", name:"Adesanya Gabriel Babajide", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:true, medical:true, avatar:"AG", attendance:6 },
  { matric:"220303010097", surname:"OSOJA", name:"Osoja Christopher Oladimeji", dept:"Computer Science", level:"400L", group:6, fees:true, enrolled:true, library:false, medical:true, avatar:"OC", attendance:10 },
  { matric:"220303010098", surname:"OLADELE", name:"Oladele Niniola Deborah", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"ON", attendance:11 },
  { matric:"220303010099", surname:"OJOMO", name:"Ojomo Emmanuel Olarenwaju", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"OE", attendance:16 },
  { matric:"220303010100", surname:"ILORI", name:"Ilori David Oluwanimilo", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"ID", attendance:10 },
  { matric:"220303010101", surname:"ANIMASHAUN", name:"Animashaun Olaoluwakiishi Faizah", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"AO", attendance:5 },
  { matric:"220303010102", surname:"ESONWUNE", name:"Esonwune Chiamaka Rita", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"EC", attendance:11 },
  { matric:"220303010103", surname:"AKINYEMI", name:"Akinyemi Victor Olashile", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"AV", attendance:13 },
  { matric:"220303010104", surname:"OGUNTOKUN", name:"Oguntokun John Omobolaji", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"OJ", attendance:7 },
  { matric:"220303010105", surname:"OGUNSANWO", name:"Ogunsanwo Omotoyosi Adedamola", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:11 },
  { matric:"220303010106", surname:"SOIPE", name:"Soipe Nurudeen Olashile", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"SN", attendance:10 },
  { matric:"220303010107", surname:"ADEBAYO", name:"Adebayo Susan Moradeyo", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"AS", attendance:14 },
  { matric:"220303010108", surname:"ESAN", name:"Esan Tomisin Moses", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"ET", attendance:5 },
  { matric:"220303010110", surname:"SALISU", name:"Salisu Lateef Bolaji", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"SL", attendance:13 },
  { matric:"220303010111", surname:"SADIK", name:"Sadik Abdulazeez Olubiyi", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"SA", attendance:14 },
  { matric:"220303010112", surname:"SABITU", name:"Sabitu Mujidat Eniola", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:true, avatar:"SM", attendance:12 },
  { matric:"220303010113", surname:"JOLAOSO", name:"Jolaoso Isreal Damilare", dept:"Computer Science", level:"400L", group:7, fees:true, enrolled:true, library:true, medical:false, avatar:"JI", attendance:16 },
  { matric:"220303010109", surname:"NWAOKOLO", name:"Nwaokolo Joshua Bright", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"NJ", attendance:5 },
  { matric:"220303010114", surname:"ADAM", name:"Adam Muhammad Olawale", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:12 },
  { matric:"220303010115", surname:"OGUNTUNDE", name:"Oguntunde Idris Olamide", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"OI", attendance:5 },
  { matric:"220303010116", surname:"ADEBANJO", name:"Adebanjo Abdulrasheed Olatunji", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:8 },
  { matric:"220303010117", surname:"FAMUDITI", name:"Famuditi Babatomiwa Abdul-Hamid", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"FB", attendance:11 },
  { matric:"220303010118", surname:"OKE", name:"Oke Israel Gbolahan", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"OI", attendance:6 },
  { matric:"220303010119", surname:"ADETUNJI", name:"Adetunji Emmanuel Oluwafemi", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"AE", attendance:7 },
  { matric:"220303010120", surname:"ADEPOJU", name:"Adepoju Ayomide Samsondeen", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:11 },
  { matric:"220303010121", surname:"OTUN", name:"Otun Aishat Oluwatosin", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:8 },
  { matric:"220303010122", surname:"TAIWO", name:"Taiwo Oluwaseun Ezekiel", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"TO", attendance:5 },
  { matric:"220303010123", surname:"RASHEED", name:"Rasheed Oluwatosin Rofiat", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"RO", attendance:7 },
  { matric:"220303010124", surname:"AYILARA", name:"Ayilara Abdulmuqeet Eyitayo", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:6 },
  { matric:"220303010125", surname:"OKOROCHUKWU-IBE", name:"Okorochukwu-Ibe Victor Chigozie", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"OV", attendance:5 },
  { matric:"220303010127", surname:"AHISU", name:"Ahisu Oluwayemisi Janet", dept:"Computer Science", level:"400L", group:8, fees:true, enrolled:true, library:true, medical:true, avatar:"AO", attendance:15 },
  { matric:"220303010142", surname:"SULEGA", name:"Sulega Msughter David", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"SM", attendance:5 },
  { matric:"220303010126", surname:"OGUNSHE", name:"Ogunshe Eniola Obafemi", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"OE", attendance:10 },
  { matric:"220303010128", surname:"EZUN", name:"Ezun Oluwatosin Mayowa", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"EO", attendance:5 },
  { matric:"220303010129", surname:"DANIEL", name:"Daniel Williams Sunday", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"DW", attendance:14 },
  { matric:"220303010130", surname:"ONI", name:"Oni Opeyemi Olaoluwa", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:8 },
  { matric:"220303010131", surname:"SAKINMADE", name:"Sakinmade Feranmi Favour", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"SF", attendance:10 },
  { matric:"220303010132", surname:"ADESINA", name:"Adesina Timothy Adeyinka", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"AT", attendance:12 },
  { matric:"220303010133", surname:"AKINTOLA", name:"Akintola Oluwasegun Akinwole", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"AO", attendance:7 },
  { matric:"220303010134", surname:"BANKOLE", name:"Bankole Michael Oluwatosin", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"BM", attendance:12 },
  { matric:"220303010135", surname:"OLATUNBOSUN", name:"Olatunbosun Afeez Ololade", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:13 },
  { matric:"220303010136", surname:"ODUNAIYA", name:"Odunaiya Olaitan Basit", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:15 },
  { matric:"220303010137", surname:"ODUWOLE", name:"Oduwole Sheriff Olamilekan", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"OS", attendance:7 },
  { matric:"220303010138", surname:"HOMEVO", name:"Homevo Moses Olamilekan", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"HM", attendance:5 },
  { matric:"220303010139", surname:"OLANREWAJU", name:"Olanrewaju Abdulmalik Babatunde", dept:"Computer Science", level:"400L", group:9, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:16 },
  { matric:"220303010143", surname:"EHONDOR", name:"Ehondor Michael Osas", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"EM", attendance:8 },
  { matric:"220303010140", surname:"BABASOLA", name:"Babasola Imisioluwa Israel", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"BI", attendance:12 },
  { matric:"220303010141", surname:"ADESINA", name:"Adesina Adeoluwa Isaac", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:12 },
  { matric:"220303010144", surname:"OSHILAJA", name:"Oshilaja David Inioluwa", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"OD", attendance:11 },
  { matric:"220303010145", surname:"UGBODU", name:"Ugbodu Kingswill Osareme", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"UK", attendance:8 },
  { matric:"220303010146", surname:"SHODEINDE", name:"Shodeinde Boluwatife Adebayo", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"SB", attendance:5 },
  { matric:"220303010148", surname:"KINYOMI", name:"Kinyomi Boluwatife Timileyin", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"KB", attendance:9 },
  { matric:"220303010149", surname:"BADMUS", name:"Badmus Abdulmatin Ademola", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"BA", attendance:12 },
  { matric:"220303010150", surname:"IBRAHEEM", name:"Ibraheem Abdulbasit Olamilekan", dept:"Computer Science", level:"400L", group:10, fees:false, enrolled:true, library:true, medical:true, avatar:"IA", attendance:5 },
  { matric:"220303010151", surname:"BELLO-OSHODI", name:"Bello-Oshodi Ameer Eniola", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"BA", attendance:14 },
  { matric:"220303010152", surname:"AGBOOLA", name:"Agboola Monijesu Precious", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:5 },
  { matric:"220303010153", surname:"AKEREDOLU", name:"Akeredolu Tesleem Oladimeji", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"AT", attendance:13 },
  { matric:"220303010154", surname:"AKINFISOYE", name:"Akinfisoye Halleluyah Oluwatobi", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"AH", attendance:14 },
  { matric:"220303010155", surname:"SAKINMADE", name:"Sakinmade Damilare David", dept:"Computer Science", level:"400L", group:10, fees:true, enrolled:true, library:true, medical:true, avatar:"SD", attendance:15 },
  { matric:"220303010178", surname:"MACAULAY", name:"Macaulay Samson Oluwasegun", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"MS", attendance:7 },
  { matric:"220303010147", surname:"OGUNJEBE", name:"Ogunjebe Isreal Anuoluwapo", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"OI", attendance:9 },
  { matric:"220303010156", surname:"OGUNGBE", name:"Ogungbe Waris Itunu", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"OW", attendance:7 },
  { matric:"220303010157", surname:"AMUSU", name:"Amusu Peter Adesola", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"AP", attendance:14 },
  { matric:"220303010158", surname:"SHOMORIN", name:"Shomorin Rasheed Akorede", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"SR", attendance:15 },
  { matric:"220303010159", surname:"AWOYEMI", name:"Awoyemi Mubarak Adeshina", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:5 },
  { matric:"220303010160", surname:"AKANDE", name:"Akande Marvelous Temiloluwa", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:8 },
  { matric:"220303010162", surname:"BELLO", name:"Bello Abdulsamad Temitope", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"BA", attendance:9 },
  { matric:"220303010163", surname:"JOSEPH", name:"Joseph Isaac Olarewaju", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"JI", attendance:16 },
  { matric:"220303010164", surname:"ADESHINA", name:"Adeshina Abdulsalam Oluwapelumi", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:11 },
  { matric:"220303010167", surname:"ASIWAJU", name:"Asiwaju Musiliu Remilekun", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:10 },
  { matric:"220303010168", surname:"USMAN", name:"Usman Sofiat Motunrayo", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"US", attendance:11 },
  { matric:"220303010170", surname:"OGUNNORIN", name:"Ogunnorin Lukman Adeniyi", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"OL", attendance:7 },
  { matric:"220303010171", surname:"OLANREWAJU", name:"Olanrewaju Abdul-Basit Akinbobola", dept:"Computer Science", level:"400L", group:11, fees:true, enrolled:true, library:true, medical:true, avatar:"OA", attendance:13 },
  { matric:"220303010185", surname:"SHOFUNDE", name:"Shofunde Jubril Ajibola", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"SJ", attendance:16 },
  { matric:"220303010161", surname:"OBAFEMI", name:"Obafemi Joshua Inioluwa", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"OJ", attendance:11 },
  { matric:"220303010166", surname:"AKINLOLU", name:"Akinlolu Habeeb Babatunde", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"AH", attendance:7 },
  { matric:"220303010165", surname:"OGUNSANYA", name:"Ogunsanya Basit Omogoriola", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"OB", attendance:8 },
  { matric:"220303010169", surname:"OKANLAWON", name:"Okanlawon Oluwatosin Roliat", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:13 },
  { matric:"220303010175", surname:"ENOFE", name:"Enofe Iyosayi Princewill", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"EI", attendance:5 },
  { matric:"220303010179", surname:"FALOLU", name:"Falolu Toluwalafe Kayode", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"FT", attendance:7 },
  { matric:"220303010180", surname:"ALUKO", name:"Aluko Ajibola Abideen", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:6 },
  { matric:"220303010181", surname:"AJAYI", name:"Ajayi Murisiku Ajadi", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"AM", attendance:11 },
  { matric:"220303010182", surname:"TIJANI", name:"Tijani Olatomiwa David", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"TO", attendance:6 },
  { matric:"220303010184", surname:"AKINREMI", name:"Akinremi Akeem Akintayo", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"AA", attendance:10 },
  { matric:"220303010187", surname:"ETIMIRI", name:"Etimiri Oluwafikayomi Okikiola", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"EO", attendance:8 },
  { matric:"220303010188", surname:"STEPHEN", name:"Stephen Praise Oghenefegor", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"SP", attendance:8 },
  { matric:"220303010194", surname:"TIJANI", name:"Tijani Olawale Michael", dept:"Computer Science", level:"400L", group:12, fees:true, enrolled:true, library:true, medical:true, avatar:"TO", attendance:6 },
  { matric:"230303010164", surname:"ADEKANYE", name:"Adekanye Emmanual", dept:"Computer Science", level:"400L", group:13, fees:false, enrolled:true, library:true, medical:true, avatar:"AE", attendance:9 },
  { matric:"220303010173", surname:"ALFRED", name:"Alfred Oluwatimilehin Emmanuel", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"AO", attendance:16 },
  { matric:"220303010174", surname:"ESANGBEDO-PHILIPS", name:"Esangbedo-Philips Osagie Valentino", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"EO", attendance:5 },
  { matric:"220303010176", surname:"ISKILU", name:"Iskilu Faruq Midomiton", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"IF", attendance:14 },
  { matric:"220303010177", surname:"GEORGE", name:"George Joseph Gift", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"GJ", attendance:8 },
  { matric:"220303010183", surname:"AFOLABI", name:"Afolabi Faruq Adebayo", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"AF", attendance:12 },
  { matric:"220303010189", surname:"ONI", name:"Oni Ibukun Victor", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"OI", attendance:9 },
  { matric:"220303010190", surname:"OLUKOYA", name:"Olukoya Olaoluwa John", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"OO", attendance:11 },
  { matric:"220303010191", surname:"FUNSO", name:"Funso Enoch Ayomiposi", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"FE", attendance:10 },
  { matric:"220303010192", surname:"OLUSESI", name:"Olusesi Rasak Wonder", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"OR", attendance:9 },
  { matric:"220303010193", surname:"ENANG", name:"Enang Mark Repene", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"EM", attendance:7 },
  { matric:"220303010195", surname:"METAJUWA", name:"Metajuwa Isaiah Ayobambo", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"MI", attendance:10 },
  { matric:"230303010162", surname:"MUFTAU", name:"Muftau Mutiat Olamide", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"MM", attendance:8 },
  { matric:"230303010177", surname:"MAKINDE", name:"Makinde Gabriel", dept:"Computer Science", level:"400L", group:13, fees:true, enrolled:true, library:true, medical:true, avatar:"MG", attendance:16 }
];


const STAFF_DB = [
  { id:"STF001", surname:"OKONKWO", name:"Dr. J. Okonkwo",    role:"Lecture Attendance", section:"attendance" },
  { id:"STF002", surname:"ADELEKE", name:"Mrs. R. Adeleke",   role:"Library Staff",      section:"library"    },
  { id:"STF003", surname:"BELLO",   name:"Dr. A. Bello",      role:"Medical Officer",    section:"medical"    },
  { id:"STF004", surname:"COKER",   name:"Mr. P. Coker",      role:"Exam Invigilator",   section:"exam"       },
];

const SECTIONS = [
  { id:"attendance", label:"Lecture Attendance", icon:"A", desc:"Log student presence", color:"#3b82f6", accent:"rgba(59,130,246,0.15)" },
  { id:"exam",       label:"Exam Verification",  icon:"E", desc:"Verify exam eligibility", color:"#8b5cf6", accent:"rgba(139,92,246,0.15)" },
  { id:"library",    label:"Library Access",     icon:"L", desc:"Manage library entry", color:"#10b981", accent:"rgba(16,185,129,0.15)" },
  { id:"medical",    label:"Medical Centre",     icon:"M", desc:"Verify health coverage", color:"#f59e0b", accent:"rgba(245,158,11,0.15)" },
];

const COURSES = ["CSC 401","CSC 403","CSC 405","CSC 407","CSC 409","CSC 411"];

function eligible(s, sec) {
  if (sec === "attendance") return s.enrolled;
  if (sec === "exam")       return s.fees && s.enrolled;
  if (sec === "library")    return s.library;
  if (sec === "medical")    return s.medical;
  return false;
}

function denyReason(s, sec) {
  if (sec === "exam") {
    if (!s.fees)    return "School fees not paid";
    if (!s.enrolled) return "Course registration incomplete";
  }
  if (sec === "library") return "Library subscription inactive";
  if (sec === "medical") return "Medical cover not active";
  return "Access restricted";
}

// Static QR: unique per student, no timestamp (screenshot protection handles security)
function makeQR(s) {
  const sig = btoa(s.matric + "LASUSTECH2026").replace(/[+/=]/g, "").slice(0, 12).toUpperCase();
  return `LASUSTECH|${s.matric}|STATIC|${sig}`;
}

// ── Simple QR Component using QR Server API (always works) ────────────────
function QRCode({ value, size = 220 }) {
  // QR Server API returns an image; we can set a cache buster for fresh QR
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (!value) return;
    // Use qrserver.com – free, reliable, no library needed
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=0a0a20`;
    setSrc(url);
  }, [value, size]);
  if (!src) return <div style={{ width: size, height: size, background: "#fff" }} />;
  return <img src={src} width={size} height={size} alt="QR Code" />;
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [scr,      setScr]      = useState("welcome");
  const [student,  setStudent]  = useState(null);
  const [staff,    setStaff]    = useState(null);
  const [section,  setSection]  = useState(null);
  const [scanLog,  setScanLog]  = useState([]);
  const [scanRes,  setScanRes]  = useState(null);
  const [scanning, setScanning] = useState(false);
  const [modal,    setModal]    = useState(null);   // "granted"|"denied"
  const [err,      setErr]      = useState("");
  const [form,     setForm]     = useState({ id:"", surname:"" });
  const [course,   setCourse]   = useState(COURSES[0]);
  const [toast,    setToast]    = useState(null);
  const studentRef = useRef(null);

  const go = (page) => { setErr(""); setScr(page); };
  const showToast = (msg, type="info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const studentLogin = () => {
    const s = STUDENTS.find(x => x.matric === form.id.trim() && x.surname === form.surname.trim().toUpperCase());
    if (!s) { setErr("Invalid credentials. Check matric number and surname."); return; }
    studentRef.current = s;
    setStudent(s); setForm({ id:"", surname:"" }); go("dash");
  };

  const staffLogin = () => {
    const s = STAFF_DB.find(x => x.id === form.id.trim().toUpperCase() && x.surname === form.surname.trim().toUpperCase() && x.section === section.id);
    if (!s) {
      const hint = STAFF_DB.find(x => x.section === section.id);
      setErr("Invalid credentials." + (hint ? ` Try: ${hint.id} / ${hint.surname}` : ""));
      return;
    }
    setStaff(s); setForm({ id:"", surname:"" }); setScanLog([]); setScanRes(null); go("scan");
  };

  // Process a decoded QR string (real camera) OR a direct matric (manual pick)
  const doScan = (input = null) => {
    if (!input) return;
    setScanRes(null);
    let picked = null;
    // Parse QR payload: LASUSTECH|matric|STATIC|sig
    if (typeof input === "string" && input.startsWith("LASUSTECH|")) {
      const parts = input.split("|");
      if (parts.length >= 3) {
        const matric = parts[1];
        picked = STUDENTS.find(x => x.matric === matric);
        if (!picked) { showToast("Student not found in system", "warn"); return; }
      }
    } else {
      // Direct matric string (manual list tap)
      picked = STUDENTS.find(x => x.matric === input);
    }
    if (!picked) { showToast("Unrecognised QR code", "warn"); return; }
    const ok = eligible(picked, section.id);
    const reason = ok ? "Access granted" : denyReason(picked, section.id);
    const entry = { ...picked, granted:ok, reason, time: new Date().toLocaleTimeString("en-NG",{hour:"2-digit",minute:"2-digit",second:"2-digit"}), course: section.id === "attendance" ? course : null };
    setScanRes(entry);
    setScanLog(prev => [entry, ...prev.slice(0,14)]);
    setModal(ok ? "granted" : "denied");
    setTimeout(() => setModal(null), 3500);
  };

  return (
    <div className="app">
      <style>{CSS}</style>
      <div className="bg" style={{ backgroundImage:`url(${BG})` }} />
      <div className="overlay" />

      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      {modal && (
        <div className="modal-bg">
          <div className={`modal-card ${modal}`}>
            <div className="modal-icon">{modal === "granted" ? "✓" : "✗"}</div>
            <div className="modal-status">{modal === "granted" ? "ACCESS GRANTED" : "ACCESS DENIED"}</div>
            {scanRes && (
              <>
                <div className="modal-name">{scanRes.name}</div>
                <div className="modal-detail">{scanRes.matric} · {scanRes.dept}</div>
                <div className="modal-reason">{scanRes.reason}</div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="wrap">
        {scr === "welcome"  && <Welcome go={go} />}
        {scr === "role"     && <Role go={go} />}
        {scr === "s-login"  && <StudentLogin form={form} setForm={setForm} onLogin={studentLogin} err={err} go={go} />}
        {scr === "dash"     && student && <Dashboard student={student} go={go} />}
        {scr === "sections" && <SectionSelect go={go} setSection={setSection} />}
        {scr === "st-login" && section && <StaffLogin section={section} form={form} setForm={setForm} onLogin={staffLogin} err={err} go={go} />}
        {scr === "scan"     && section && staff && (
          <Scanner section={section} staff={staff} scanning={scanning} scanRes={scanRes}
            scanLog={scanLog} doScan={doScan} go={go} course={course} setCourse={setCourse}
            students={STUDENTS} studentRef={studentRef} />
        )}
      </div>
    </div>
  );
}

// ── Welcome ───────────────────────────────────────────────────────────────
function Welcome({ go }) {
  return (
    <div className="center-page fade">
      <div className="glass-card" style={{ maxWidth:520, padding:"3rem 2.5rem", textAlign:"center" }}>
        <div className="logo-ring">
          <img src={LOGO} alt="LASUSTECH" className="logo-img" />
        </div>
        <p className="eyebrow">Lagos State University of Science and Technology</p>
        <h1 className="display-title">Unified Smart<br />ID Card System</h1>
        <p className="sub-text">One digital identity for every campus service — attendance, exams, library &amp; medical</p>
        <div className="chip-row">
          {[["Attendance","Attendance"],["Exam Access","Exam Access"],["Library","Library"],["Medical","Medical"]].map(([icon,l]) => (
            <span key={l} className="chip">{icon} {l}</span>
          ))}
        </div>
        <div className="demo-badge">
          <span className="demo-dot" />
          Demo Mode — Digital simulation of the RFID/NFC physical system
        </div>
        <button className="btn-primary" style={{ width:"100%", marginTop:"1.5rem" }} onClick={() => go("role")}>
          Get Started →
        </button>
        <p className="footer-note">UMSIDCS · Final Year Project · Funso Enoch Ayomiposi · 2025/2026</p>
      </div>
    </div>
  );
}

// ── Role ──────────────────────────────────────────────────────────────────
function Role({ go }) {
  return (
    <div className="center-page fade">
      <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
        <button className="btn-ghost" onClick={() => go("welcome")} style={{ marginBottom:12 }}>← Back</button>
        <h2 className="page-title">Select Your Role</h2>
        <p className="page-sub">Choose how you'd like to access the system</p>
      </div>
      <div className="role-grid">
        {[
          { page:"s-login",  icon:"S", title:"Student",  sub:"View your dynamic QR code &amp; campus access status", color:"#3b82f6", tags:["Dynamic QR","Access status","Real-time refresh"] },
          { page:"sections", icon:"F", title:"Staff",    sub:"Scan student QR codes and manage section access",       color:"#8b5cf6", tags:["QR Scanner","Scan log","Section control"] },
        ].map(r => (
          <div key={r.page} className="role-card" style={{ "--rc":r.color }} onClick={() => go(r.page)}>
            <div className="role-icon-wrap">{r.icon}</div>
            <h3 className="role-title">{r.title}</h3>
            <p className="role-sub" dangerouslySetInnerHTML={{ __html: r.sub }} />
            <div className="role-tags">
              {r.tags.map(t => <span key={t} className="role-tag">{t}</span>)}
            </div>
            <div className="role-line" style={{ background:`linear-gradient(90deg,transparent,${r.color},transparent)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Student Login ─────────────────────────────────────────────────────────
function StudentLogin({ form, setForm, onLogin, err, go }) {
  const demos = [["220303010191","FUNSO"],["220303010150","ADEBAYO"],["220303010200","IBRAHIM"],["220303010175","OKAFOR"],["220303010188","TAIWO"]];
  return (
    <div className="center-page fade">
      <div className="glass-card" style={{ maxWidth:420 }}>
        <div className="card-header">
          <img src={LOGO} alt="" className="header-logo" />
          <div>
            <div className="header-title">Student Portal</div>
            <div className="header-sub">LASUSTECH UMSIDCS</div>
          </div>
        </div>
        <h2 className="form-title">Student Login</h2>
        <p className="form-sub">Enter your credentials to view your digital ID card</p>
        <div className="field">
          <label className="lbl">Matric Number</label>
          <input className="inp" placeholder="e.g. 220303010191" value={form.id}
            onChange={e => setForm(p => ({...p, id:e.target.value}))}
            onKeyDown={e => e.key === "Enter" && onLogin()} />
        </div>
        <div className="field">
          <label className="lbl">Surname</label>
          <input className="inp" placeholder="e.g. FUNSO" value={form.surname}
            onChange={e => setForm(p => ({...p, surname:e.target.value}))}
            onKeyDown={e => e.key === "Enter" && onLogin()} />
        </div>
        {err && <div className="err-box">{err}</div>}
        <div className="btn-row" style={{ marginTop:"1.25rem" }}>
          <button className="btn-ghost" style={{ flex:1 }} onClick={() => go("role")}>← Back</button>
          <button className="btn-primary" style={{ flex:2 }} onClick={onLogin}>Login →</button>
        </div>
        <div className="demo-panel">
          <p className="demo-panel-label">Demo Accounts</p>
          {demos.map(([m,s]) => (
            <p key={m} className="demo-cred" onClick={() => { /* auto-fill */ }}>
              <code>{m}</code> / <code>{s}</code>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Student Dashboard ─────────────────────────────────────────────────────
function Dashboard({ student, go }) {
  const qrPayload = makeQR(student);
  const [blurred, setBlurred] = useState(false);

  // Screenshot protection: blur QR when tab loses focus
  useEffect(() => {
    const onHide = () => setBlurred(document.hidden);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("blur", () => setBlurred(true));
    window.addEventListener("focus", () => setBlurred(false));
    return () => {
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  return (
    <div className="dash-page fade">
      <div className="dash-topbar">
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src={LOGO} alt="" style={{ width:32, height:32, objectFit:"contain", borderRadius:"50%", background:"rgba(255,255,255,0.07)", padding:2 }} />
          <span className="topbar-brand">UMSIDCS</span>
        </div>
        <button className="btn-ghost" style={{ fontSize:12, padding:"7px 14px" }} onClick={() => go("role")}>
          Logout
        </button>
      </div>

      <div className="dash-grid">
        {/* Profile Card */}
        <div className="glass-card" style={{ padding:"1.5rem" }}>
          <div className="profile-head">
            <div className="avatar">{student.avatar}</div>
            <div>
              <div className="profile-name">{student.name}</div>
              <div className="profile-matric">{student.matric}</div>
              <div className="profile-dept">{student.dept} · {student.level}</div>
            </div>
          </div>
          <div className="divider" />
          <div className="info-rows">
            <div className="info-row"><span className="ir-label">Session</span><span className="ir-val">2025/2026</span></div>
            <div className="info-row"><span className="ir-label">College</span><span className="ir-val">Basic Sciences</span></div>
            <div className="info-row"><span className="ir-label">Attendance</span><span className="ir-val" style={{ color:"#10b981" }}>8 sessions</span></div>
          </div>
          <div className="divider" />
          <div className="flag-grid">
            {[["Fees Paid",student.fees],["Enrolled",student.enrolled],["Library",student.library],["Medical",student.medical]].map(([l,ok]) => (
              <span key={l} className={`flag ${ok?"flag-ok":"flag-no"}`}>{ok?"✓":"✗"} {l}</span>
            ))}
          </div>
        </div>

        {/* QR Card */}
        <div className="glass-card qr-card" style={{ padding:"2rem", textAlign:"center" }}>
          <p className="qr-label">Campus Access QR — Unique to your account</p>

          {/* QR with screenshot blur overlay */}
          <div className="qr-ring" style={{ position:"relative", display:"inline-block" }}>
            <QRCode value={qrPayload} size={220} />
            {blurred && (
              <div style={{
                position:"absolute", inset:0, borderRadius:8,
                background:"rgba(10,10,30,0.92)",
                backdropFilter:"blur(12px)",
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:8
              }}>
                <div style={{ fontSize:24, color:"rgba(255,255,255,0.6)" }}>&#9679;&#9679;&#9679;</div>
                <p style={{ color:"rgba(255,255,255,0.55)", fontSize:12, margin:0 }}>Return to app to view QR</p>
              </div>
            )}
          </div>

          <p className="qr-hint" style={{ marginTop:12 }}>
            Present to staff scanner · QR blurs when you switch apps
          </p>

          {/* Service Status */}
          <div className="service-grid">
            {SECTIONS.map(s => {
              const ok = eligible(student, s.id);
              return (
                <div key={s.id} className="service-chip" style={{ borderColor: ok ? s.color+"44" : "rgba(239,68,68,0.25)", background: ok ? s.accent : "rgba(239,68,68,0.06)" }}>
                  <span className="service-dot" style={{ background: ok ? s.color : "#ef4444" }} />
                  <span className="service-name">{s.label}</span>
                  <span className={`bdg ${ok?"bdg-ok":"bdg-no"}`}>{ok?"Open":"Closed"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section Select ────────────────────────────────────────────────────────
function SectionSelect({ go, setSection }) {
  return (
    <div className="center-page fade">
      <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
        <button className="btn-ghost" onClick={() => go("role")} style={{ marginBottom:12 }}>← Back</button>
        <h2 className="page-title">Staff Portal</h2>
        <p className="page-sub">Select your campus section to continue</p>
      </div>
      <div className="section-grid">
        {SECTIONS.map(s => (
          <div key={s.id} className="section-tile" style={{ "--sc":s.color, "--sa":s.accent }}
            onClick={() => { setSection(s); go("st-login"); }}>
            <div className="section-icon">{s.icon}</div>
            <div className="section-name">{s.label}</div>
            <div className="section-desc">{s.desc}</div>
            <div className="section-line" style={{ background:`linear-gradient(90deg,transparent,${s.color},transparent)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Staff Login ───────────────────────────────────────────────────────────
function StaffLogin({ section, form, setForm, onLogin, err, go }) {
  const hint = STAFF_DB.find(x => x.section === section.id);
  return (
    <div className="center-page fade">
      <div className="glass-card" style={{ maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
          <div style={{ fontSize:44, marginBottom:8 }}>{section.icon}</div>
          <h2 className="form-title">{section.label}</h2>
          <p className="form-sub">Staff authentication required</p>
        </div>
        <div className="field">
          <label className="lbl">Staff ID</label>
          <input className="inp" placeholder={hint ? `e.g. ${hint.id}` : "STF001"} value={form.id}
            onChange={e => setForm(p => ({...p, id:e.target.value}))}
            onKeyDown={e => e.key === "Enter" && onLogin()} />
        </div>
        <div className="field">
          <label className="lbl">Surname</label>
          <input className="inp" placeholder={hint ? `e.g. ${hint.surname}` : ""} value={form.surname}
            onChange={e => setForm(p => ({...p, surname:e.target.value}))}
            onKeyDown={e => e.key === "Enter" && onLogin()} />
        </div>
        {err && <div className="err-box">{err}</div>}
        <div className="btn-row" style={{ marginTop:"1.25rem" }}>
          <button className="btn-ghost" style={{ flex:1 }} onClick={() => go("sections")}>← Back</button>
          <button className="btn-primary" style={{ flex:2 }} onClick={onLogin}>Authenticate →</button>
        </div>
        {hint && (
          <div className="demo-panel">
            <p className="demo-panel-label">Demo Credential</p>
            <p className="demo-cred"><code>{hint.id}</code> / <code>{hint.surname}</code></p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Scanner ───────────────────────────────────────────────────────────────
// ==================== UPDATED Scanner Component with Camera ====================
function Scanner({ section, staff, scanning, scanRes, scanLog, doScan, go, course, setCourse, students }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const lastQR = useRef("");

  // Load jsQR dynamically
  useEffect(() => {
    if (window.jsQR) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        scanLoop();
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError(err.name === "NotAllowedError" 
        ? "Camera permission denied. Please allow camera access."
        : "Could not start camera. Using manual mode.");
    }
  };

  const stopCamera = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  const scanLoop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== 4) {
      rafRef.current = requestAnimationFrame(scanLoop);
      return;
    }
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (w === 0 || h === 0) {
      rafRef.current = requestAnimationFrame(scanLoop);
      return;
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    if (window.jsQR) {
      const code = window.jsQR(imageData.data, w, h);
      if (code && code.data !== lastQR.current) {
        lastQR.current = code.data;
        doScan(code.data);
        // debounce: ignore same QR for 3 seconds
        setTimeout(() => { lastQR.current = ""; }, 3000);
      }
    }
    rafRef.current = requestAnimationFrame(scanLoop);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  return (
    <div className="scan-page fade">
      <div className="scan-topbar">
        <div>
          <div className="scan-section-name">{section.icon} {section.label}</div>
          <div className="scan-staff-name">{staff.name} · {staff.role}</div>
        </div>
        <button className="btn-ghost" style={{ fontSize:12, padding:"7px 14px" }} onClick={() => go("sections")}>← Exit</button>
      </div>

      <div className="scan-grid">
        {/* Left Column: Scanner & Manual Inputs */}
        <div>
          {section.id === "attendance" && (
            <div className="glass-card" style={{ padding:"1rem 1.25rem", marginBottom:12 }}>
              <p className="lbl" style={{ marginBottom:10 }}>Active Course</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {COURSES.map(c => (
                  <button key={c} className={course===c ? "course-btn active" : "course-btn"} onClick={() => setCourse(c)}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* Camera Scanner */}
          <div className="glass-card" style={{ padding:"1.5rem", textAlign:"center", marginBottom:12 }}>
            <div className="scanner-frame" style={{ position:"relative", marginBottom:16 }}>
              {!cameraActive && !cameraError && (
                <div className="scan-idle">
                  <button className="btn-primary" onClick={startCamera}>📷 Start Camera Scanner</button>
                </div>
              )}
              {cameraError && (
                <div className="scan-idle" style={{ color:"#fca5a5" }}>
                  <p>{cameraError}</p>
                  <button className="btn-ghost" style={{ marginTop:8 }} onClick={() => setCameraError(null)}>Retry</button>
                </div>
              )}
              <video ref={videoRef} style={{ display: cameraActive ? "block" : "none", width:"100%", borderRadius:8 }} playsInline muted />
              <canvas ref={canvasRef} style={{ display:"none" }} />
              {cameraActive && (
                <div className="scan-line" style={{ position:"absolute", left:0, right:0, top:"50%", transform:"translateY(-50%)", height:2, background:"#818cf8", animation:"scan-mv 2s ease-in-out infinite" }} />
              )}
            </div>

            {scanRes && (
              <div className={`result-card ${scanRes.granted?"rc-ok":"rc-no"}`} style={{ marginTop:16, textAlign:"left" }}>
                <div className="result-head">
                  <div className="avi" style={{ background: scanRes.granted?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)", color: scanRes.granted?"#6ee7b7":"#fca5a5" }}>
                    {scanRes.avatar}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="res-name">{scanRes.name}</div>
                    <div className="res-sub">{scanRes.dept} · {scanRes.level}</div>
                    {scanRes.course && <div className="res-course">Course: {scanRes.course}</div>}
                  </div>
                  <span className={`bdg ${scanRes.granted?"bdg-ok":"bdg-no"}`}>{scanRes.granted?"ACCESS OK":"BLOCKED"}</span>
                </div>
              </div>
            )}

            {cameraActive && (
              <button className="btn-ghost" style={{ marginTop:12 }} onClick={stopCamera}>Stop Camera</button>
            )}
          </div>

          {/* Manual QR Input & Student List */}
          <div className="glass-card" style={{ padding:"1.25rem" }}>
            <p className="lbl" style={{ marginBottom:10 }}>Manual QR Entry (if camera fails)</p>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <input type="text" id="manualQrInput" placeholder="Paste QR data or matric" style={{ flex:1, padding:8, borderRadius:8, border:"none" }} />
              <button className="btn-primary btn-sm" onClick={() => {
                const val = document.getElementById("manualQrInput").value;
                if (val) doScan(val);
              }}>Verify</button>
            </div>
            <p className="lbl" style={{ marginBottom:10 }}>Quick Select Student</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {students.slice(0, 8).map(s => (
                <button key={s.matric} className="student-btn" onClick={() => doScan(s.matric)}>
                  <div className="avi sm" style={{ background:"rgba(99,102,241,0.2)", color:"#a5b4fc" }}>{s.avatar}</div>
                  <div style={{ flex:1, textAlign:"left" }}>
                    <div className="sb-name">{s.name}</div>
                    <div className="sb-sub">{s.matric}</div>
                  </div>
                  <span className={`bdg ${eligible(s, section.id)?"bdg-ok":"bdg-no"}`} style={{ fontSize:10 }}>
                    {eligible(s, section.id) ? "✓" : "✗"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Scan Log & Stats */}
        <div>
          <div className="glass-card" style={{ padding:"1.25rem" }}>
            <div className="log-header">
              <p className="lbl">Scan Log</p>
              <span className="log-count">{scanLog.length} scans</span>
            </div>
            {scanLog.length === 0 ? (
              <div className="log-empty">No scans yet. Use the scanner to begin.</div>
            ) : (
              <div className="log-list">
                {scanLog.map((e, i) => (
                  <div key={i} className="log-row" style={{ borderLeft:`3px solid ${e.granted?"#10b981":"#ef4444"}` }}>
                    <div className="avi sm" style={{ background:e.granted?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)", color:e.granted?"#6ee7b7":"#fca5a5" }}>
                      {e.avatar}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div className="log-name">{e.name}</div>
                      <div className="log-meta">{e.matric}{e.course ? ` · ${e.course}` : ""}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <span className={`bdg ${e.granted?"bdg-ok":"bdg-no"}`} style={{ fontSize:10 }}>{e.granted?"✓":"✗"}</span>
                      <div className="log-time">{e.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding:"1.25rem", marginTop:12 }}>
            <p className="lbl" style={{ marginBottom:12 }}>Session Stats</p>
            <div className="stat-grid">
              {[
                ["Total Scans",  scanLog.length],
                ["Granted",      scanLog.filter(x => x.granted).length],
                ["Denied",       scanLog.filter(x => !x.granted).length],
                ["Success Rate", scanLog.length ? Math.round(scanLog.filter(x=>x.granted).length/scanLog.length*100)+"%" : "—"],
              ].map(([l,v]) => (
                <div key={l} className="stat-chip">
                  <div className="stat-val">{v}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Crimson+Pro:ital,wght@1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Outfit',sans-serif;background:#06091a;}
.app{min-height:100vh;position:relative;overflow-x:hidden;}
.bg{position:fixed;inset:0;z-index:0;background-size:cover;background-position:center;filter:brightness(.28) saturate(.6);}
.overlay{position:fixed;inset:0;z-index:1;background:linear-gradient(135deg,rgba(4,15,50,.85)0%,rgba(12,4,40,.78)100%);}
.wrap{position:relative;z-index:2;min-height:100vh;}

/* Glass */
.glass-card{background:rgba(255,255,255,.08);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.13);border-radius:24px;padding:2rem;}

/* Buttons */
.btn-primary{background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#fff;border:none;border-radius:50px;padding:13px 28px;font-size:14px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .3s;letter-spacing:.2px;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(99,102,241,.5);}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none;}
.btn-ghost{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.8);border-radius:50px;padding:11px 22px;font-size:13px;font-weight:500;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .25s;}
.btn-ghost:hover{background:rgba(255,255,255,.15);}

/* Layout */
.center-page{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:1.5rem;}
.dash-page{min-height:100vh;padding:1.25rem;display:flex;flex-direction:column;}
.scan-page{min-height:100vh;padding:1.25rem;display:flex;flex-direction:column;}

/* Topbars */
.dash-topbar,.scan-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;}
.topbar-brand{font-family:'Outfit',sans-serif;color:#fff;font-size:15px;font-weight:700;}
.scan-section-name{font-weight:700;color:#fff;font-size:15px;}
.scan-staff-name{color:rgba(255,255,255,.35);font-size:12px;margin-top:2px;}

/* Dashboard grid */
.dash-grid{display:grid;grid-template-columns:320px 1fr;gap:1rem;flex:1;}
@media(max-width:800px){.dash-grid{grid-template-columns:1fr;}}

/* Scanner grid */
.scan-grid{display:grid;grid-template-columns:1fr 360px;gap:1rem;flex:1;}
@media(max-width:900px){.scan-grid{grid-template-columns:1fr;}}

/* Typography */
.eyebrow{color:rgba(255,255,255,.4);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;margin-bottom:10px;}
.display-title{font-family:'Outfit',sans-serif;font-size:clamp(26px,5vw,34px);font-weight:800;color:#fff;line-height:1.15;margin-bottom:12px;}
.sub-text{color:rgba(255,255,255,.45);font-size:14px;line-height:1.65;margin-bottom:20px;}
.page-title{font-family:'Outfit',sans-serif;color:#fff;font-size:26px;font-weight:800;margin-bottom:6px;}
.page-sub{color:rgba(255,255,255,.4);font-size:13px;}
.form-title{font-family:'Outfit',sans-serif;color:#fff;font-size:21px;font-weight:700;margin-bottom:5px;}
.form-sub{color:rgba(255,255,255,.4);font-size:13px;margin-bottom:20px;}

/* Chip row */
.chip-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:18px;}
.chip{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:5px 12px;color:rgba(255,255,255,.55);font-size:12px;}
.demo-badge{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);border-radius:10px;padding:8px 14px;font-size:12px;color:rgba(245,158,11,.9);display:flex;align-items:center;gap:7px;justify-content:center;}
.demo-dot{width:7px;height:7px;background:#f59e0b;border-radius:50%;flex-shrink:0;animation:pulse-dot 1.5s ease-in-out infinite;}
@keyframes pulse-dot{0%,100%{opacity:1;}50%{opacity:.3;}}
.footer-note{color:rgba(255,255,255,.18);font-size:11px;margin-top:18px;}

/* Logo */
.logo-ring{width:96px;height:96px;border-radius:50%;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;overflow:hidden;box-shadow:0 0 30px rgba(99,102,241,.25);}
.logo-img{width:86px;height:86px;object-fit:contain;}

/* Role cards */
.role-grid{display:flex;gap:18px;flex-wrap:wrap;justify-content:center;}
.role-card{background:rgba(255,255,255,.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:2.25rem 2rem;max-width:280px;width:100%;cursor:pointer;text-align:center;transition:all .3s;}
.role-card:hover{transform:translateY(-6px);background:rgba(255,255,255,.13);border-color:var(--rc,#fff);}
.role-icon-wrap{font-size:50px;margin-bottom:14px;}
.role-title{font-family:'Outfit',sans-serif;color:#fff;font-size:22px;font-weight:700;margin-bottom:8px;}
.role-sub{color:rgba(255,255,255,.45);font-size:13px;line-height:1.55;margin-bottom:14px;}
.role-tags{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-bottom:16px;}
.role-tag{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:3px 10px;color:rgba(255,255,255,.35);font-size:11px;}
.role-line{height:2px;border-radius:2px;margin-top:2px;}

/* Section tiles */
.section-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;max-width:560px;width:100%;}
.section-tile{background:rgba(255,255,255,.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:1.75rem 1.5rem;cursor:pointer;text-align:center;transition:all .3s;}
.section-tile:hover{transform:translateY(-5px);background:var(--sa,rgba(255,255,255,.13));border-color:var(--sc,rgba(255,255,255,.3));}
.section-icon{font-size:34px;margin-bottom:12px;}
.section-name{font-family:'Outfit',sans-serif;color:#fff;font-size:15px;font-weight:700;margin-bottom:5px;}
.section-desc{color:rgba(255,255,255,.4);font-size:12px;line-height:1.5;}
.section-line{height:2px;border-radius:2px;margin-top:14px;}

/* Form */
.field{margin-bottom:14px;}
.lbl{color:rgba(255,255,255,.5);font-size:11px;font-weight:600;letter-spacing:.9px;text-transform:uppercase;margin-bottom:7px;display:block;}
.inp{width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;padding:13px 16px;font-size:14px;font-family:'Outfit',sans-serif;outline:none;transition:border-color .3s;}
.inp::placeholder{color:rgba(255,255,255,.28);}
.inp:focus{border-color:rgba(99,102,241,.65);background:rgba(255,255,255,.1);}
.err-box{background:rgba(239,68,68,.14);border:1px solid rgba(239,68,68,.3);border-radius:12px;padding:11px 14px;color:#fca5a5;font-size:13px;margin-top:10px;}
.btn-row{display:flex;gap:10px;}
.demo-panel{margin-top:18px;background:rgba(99,102,241,.09);border:1px solid rgba(99,102,241,.2);border-radius:14px;padding:12px 14px;}
.demo-panel-label{color:rgba(255,255,255,.45);font-size:11px;font-weight:600;letter-spacing:.5px;margin-bottom:8px;text-transform:uppercase;}
.demo-cred{color:rgba(255,255,255,.35);font-size:12px;line-height:1.9;}
.demo-cred code{color:rgba(255,255,255,.55);font-family:monospace;}

/* Card header */
.card-header{display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;}
.header-logo{width:38px;height:38px;object-fit:contain;border-radius:50%;background:rgba(255,255,255,.07);padding:2px;}
.header-title{font-family:'Outfit',sans-serif;color:#fff;font-size:15px;font-weight:700;}
.header-sub{color:rgba(255,255,255,.35);font-size:11px;margin-top:1px;}

/* Profile */
.profile-head{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.avatar{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#1d4ed8,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 4px 20px rgba(99,102,241,.35);}
.profile-name{font-family:'Outfit',sans-serif;color:#fff;font-size:17px;font-weight:700;line-height:1.3;}
.profile-matric{color:#818cf8;font-size:12px;font-weight:600;margin-top:3px;}
.profile-dept{color:rgba(255,255,255,.4);font-size:12px;margin-top:1px;}
.divider{height:1px;background:rgba(255,255,255,.08);margin:14px 0;}
.info-rows{display:flex;flex-direction:column;gap:0;}
.info-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05);}
.info-row:last-child{border:none;}
.ir-label{color:rgba(255,255,255,.4);font-size:13px;}
.ir-val{color:#fff;font-size:13px;font-weight:600;}
.flag-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px;}
.flag{padding:5px 10px;border-radius:8px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px;}
.flag-ok{background:rgba(16,185,129,.15);color:#6ee7b7;border:1px solid rgba(16,185,129,.25);}
.flag-no{background:rgba(239,68,68,.15);color:#fca5a5;border:1px solid rgba(239,68,68,.25);}

/* QR card */
.qr-card{}
.qr-label{color:rgba(255,255,255,.4);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;margin-bottom:18px;}
.qr-ring{display:inline-block;border-radius:18px;padding:14px;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.1);margin-bottom:16px;animation:pulse-qr 2.5s ease-in-out infinite;}
@keyframes pulse-qr{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.3);}50%{box-shadow:0 0 0 16px rgba(99,102,241,0);}}
.timer-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.timer-lbl{color:rgba(255,255,255,.4);font-size:12px;}
.timer-count{font-size:14px;font-weight:700;}
.progress-track{height:4px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden;margin-bottom:12px;}
.progress-fill{height:100%;border-radius:4px;transition:width 1s linear,background .5s;}
.qr-hint{color:rgba(255,255,255,.22);font-size:11px;margin-bottom:18px;}
.service-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px;}
.service-chip{border-radius:12px;padding:10px;display:flex;flex-direction:column;align-items:flex-start;gap:5px;border-width:1px;border-style:solid;}
.service-name{color:#fff;font-size:11px;font-weight:600;}

/* Badges */
.bdg{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;}
.bdg-ok{background:rgba(16,185,129,.18);color:#6ee7b7;border:1px solid rgba(16,185,129,.3);}
.bdg-no{background:rgba(239,68,68,.18);color:#fca5a5;border:1px solid rgba(239,68,68,.3);}

/* Scanner */
.scanner-frame{width:260px;height:260px;position:relative;margin:0 auto;background:rgba(0,0,0,.4);border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.corner{position:absolute;width:38px;height:38px;border-color:#818cf8;border-style:solid;}
.corner.tl{top:0;left:0;border-width:3px 0 0 3px;border-radius:4px 0 0 0;}
.corner.tr{top:0;right:0;border-width:3px 3px 0 0;border-radius:0 4px 0 0;}
.corner.bl{bottom:0;left:0;border-width:0 0 3px 3px;border-radius:0 0 0 4px;}
.corner.br{bottom:0;right:0;border-width:0 3px 3px 0;border-radius:0 0 4px 0;}
.scan-inner{display:flex;flex-direction:column;align-items:center;width:100%;}
.scan-line{position:absolute;left:6px;right:6px;height:2px;background:linear-gradient(90deg,transparent,#818cf8,transparent);animation:scan-mv 2s ease-in-out infinite;}
@keyframes scan-mv{0%{top:6px;opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{top:250px;opacity:0;}}
.scan-spinner{font-size:30px;color:#818cf8;animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.scan-idle,.scan-result-mini{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;}
.srm-status{font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;margin-bottom:6px;}
.srm-status.ok{color:#6ee7b7;}
.srm-status.no{color:#fca5a5;}
.srm-name{color:#fff;font-size:14px;font-weight:600;}
.srm-detail{color:rgba(255,255,255,.45);font-size:12px;margin-top:4px;}

/* Result card */
.result-card{border-radius:14px;padding:14px;}
.rc-ok{background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);}
.rc-no{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);}
.result-head{display:flex;align-items:center;gap:12px;}
.res-name{color:#fff;font-weight:600;font-size:14px;}
.res-sub{color:rgba(255,255,255,.4);font-size:12px;margin-top:2px;}
.res-course{color:rgba(255,255,255,.3);font-size:11px;margin-top:1px;}

/* Avatar */
.avi{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;font-family:'Outfit',sans-serif;flex-shrink:0;}
.avi.sm{width:38px;height:38px;font-size:13px;}

/* Courses */
.course-btn{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Outfit',sans-serif;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.7);}
.course-btn.active{background:linear-gradient(135deg,#1d4ed8,#7c3aed);border:none;color:#fff;}
.course-btn:hover{background:rgba(255,255,255,.14);}

/* Student picker */
.student-btn{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;cursor:pointer;transition:all .2s;width:100%;}
.student-btn:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.15);}
.student-btn:disabled{opacity:.5;cursor:not-allowed;}
.sb-name{color:#fff;font-size:13px;font-weight:500;}
.sb-sub{color:rgba(255,255,255,.35);font-size:11px;margin-top:1px;}

/* Scan log */
.log-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.log-count{color:rgba(255,255,255,.25);font-size:12px;}
.log-empty{color:rgba(255,255,255,.25);font-size:13px;text-align:center;padding:2rem 0;}
.log-list{display:flex;flex-direction:column;gap:8px;max-height:380px;overflow-y:auto;}
.log-row{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.04);border-radius:10px;border-left-width:3px;border-left-style:solid;}
.log-name{color:#fff;font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.log-meta{color:rgba(255,255,255,.35);font-size:11px;margin-top:2px;}
.log-time{color:rgba(255,255,255,.25);font-size:10px;margin-top:3px;}

/* Stats */
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.stat-chip{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:12px;padding:12px;text-align:center;}
.stat-val{font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:#818cf8;}
.stat-lbl{color:rgba(255,255,255,.35);font-size:10px;text-transform:uppercase;letter-spacing:.6px;margin-top:3px;}

/* Modal overlay */
.modal-bg{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;animation:fade-in .3s ease;}
.modal-card{border-radius:28px;padding:2.5rem;text-align:center;max-width:360px;width:90%;animation:slide-up .35s ease;}
.modal-card.granted{background:rgba(6,24,15,.96);border:2px solid rgba(16,185,129,.6);}
.modal-card.denied{background:rgba(24,6,6,.96);border:2px solid rgba(239,68,68,.6);}
.modal-icon{font-size:64px;margin-bottom:10px;}
.modal-status{font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;margin-bottom:10px;}
.modal-card.granted .modal-status{color:#6ee7b7;}
.modal-card.denied .modal-status{color:#fca5a5;}
.modal-name{color:#fff;font-size:16px;font-weight:600;margin-bottom:4px;}
.modal-detail{color:rgba(255,255,255,.4);font-size:13px;margin-bottom:8px;}
.modal-reason{color:rgba(255,255,255,.5);font-size:13px;font-style:italic;}
@keyframes fade-in{from{opacity:0;}to{opacity:1;}}
@keyframes slide-up{from{transform:translateY(30px);opacity:0;}to{transform:translateY(0);opacity:1;}}

/* Toast */
.toast{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;z-index:2000;animation:toast-in .3s ease;backdrop-filter:blur(10px);}
.toast-info{background:rgba(99,102,241,.9);color:#fff;}
.toast-warn{background:rgba(245,158,11,.9);color:#000;}
.toast-ok{background:rgba(16,185,129,.9);color:#fff;}
@keyframes toast-in{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

/* Animation */
.fade{animation:fadeUp .4s ease both;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}

/* Scrollbar */
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.18);border-radius:2px;}
`;
