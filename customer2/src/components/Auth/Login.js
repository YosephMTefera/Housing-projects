import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { TbTargetArrow } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { language } from "../../utils/part-1lan";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const divisionState = useSelector((state) => state?.allDivisions);

  useEffect(() => {
    dispatch(fetchAllDivision());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findActiveDivision = divisionState?.divisions?.filter((div)=>div?.status ==="active");
  const findNotspecialDivision = findActiveDivision?.filter((div)=>div?.special ==="no");

  if(divisionState?.limitError) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
    {translationState?.lan ==="En" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>}
    {translationState?.lan ==="Am" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።</p>}
    {translationState?.lan ==="Or" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa</p>}
    {translationState?.lan ==="Tg" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።</p>}
    {translationState?.lan ==="Sm" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin</p>}
    {translationState?.lan ==="Af" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>}

</div>
  return (
    <>
      <div className="w-[100%]  min-h-[50vh] flex flex-col items-center justify-center">
        <div className=" h-[100%]  z-[-1] flex flex-col items-center relative">
          <div className="w-[100%] h-[600px]">
            <img
              className="w-[100vw] h-[100%] object-cover"
              src={require("../../CAS/overlay.png")}
              alt=""
            />
          </div>

          <div
            className={
              "w-[80%] absolute top-[50%]   mx-auto flex flex-col items-center gap-[20px] max-sm1:w-[90%] max-md2:text-[20px] max-sm1:text-[16px]"
            }
          >
            {translationState?.lan ==="En" &&   <h1 className="text-[#0C73B8] text-[24px] text-center font-bold uppercase max-sm1:text-[16px]">
              {language?.bannerTitle[0]}
            </h1>}
            {translationState?.lan ==="Am" &&   <h1 className="text-[#0C73B8] text-[40px] text-center font-bold uppercase max-sm1:text-[20px]">
              {language?.bannerTitle[1]}
            </h1>}
            {translationState?.lan ==="Or" &&   <h1 className="text-[#0C73B8] text-[24px] text-center font-bold uppercase max-sm1:text-[16px]">
              {language?.bannerTitle[2]}
            </h1>}
            {translationState?.lan ==="Tg" &&   <h1 className="text-[#0C73B8] text-[40px] text-center font-bold uppercase max-sm1:text-[20px]">
              {language?.bannerTitle[3]}
            </h1>}
            {translationState?.lan ==="Sm" &&   <h1 className="text-[#0C73B8] text-[24px] text-center font-bold uppercase max-sm1:text-[16px]">
              {language?.bannerTitle[4]}
            </h1>}
            {translationState?.lan ==="Af" &&   <h1 className="text-[#0C73B8] text-[24px] text-center font-bold uppercase max-sm1:text-[16px]">
              {language?.bannerTitle[5]}
            </h1>}

            {translationState?.lan==="En" &&     
            <span className="text-[#EFB200] text-[24px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.bannerSubTitle[0]}
            </span> }
            {translationState?.lan==="Am" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px]">
              {language?.bannerSubTitle[1]}
            </span> }
            {translationState?.lan==="Or" &&     
            <span className="text-[#EFB200] text-[24px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.bannerSubTitle[2]}
            </span> }
            {translationState?.lan==="Tg" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px]">
              {language?.bannerSubTitle[3]}
            </span> }
            {translationState?.lan==="Sm" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.bannerSubTitle[4]}
            </span> }
            {translationState?.lan==="Af" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.bannerSubTitle[5]}
            </span> }
      
      
      
          </div>
        </div>
      </div>

      {divisionState?.divisions?.length > 0 && (
        <div className="w-[100%] p-4 min-h-[400px]  bg-[#F9F9F9] py-10">
          <div className="w-[100%] flex flex-col justify-center items-center gap-[10px]">
            <span className="text-[#0C73B8] text-[24px] font-bold uppercase max-sm1:text-[18px]">
            {translationState?.lan==="En" &&     
            <span className="text-[#EFB200] text-[24px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.services[0]}
            </span> }
            {translationState?.lan==="Am" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px]">
              {language?.services[1]}
            </span> }
            {translationState?.lan==="Or" &&     
            <span className="text-[#EFB200] text-[24px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.services[2]}
            </span> }
            {translationState?.lan==="Tg" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px]">
              {language?.services[3]}
            </span> }
            {translationState?.lan==="Sm" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.services[4]}
            </span> }
            {translationState?.lan==="Af" &&     
            <span className="text-[#EFB200] text-[30px] font-bold uppercase max-md2:text-[16px] max-sm1:text-[12px]">
              {language?.services[5]}
            </span> }
            </span>
            <div className="w-[4%] h-[5px] bg-[#EFB200]"></div>
          </div>

          {divisionState?.loading ? (
            <Loading
              addtionalStyle={"flex justify-center items-center my-[30px]"}
            />
          ) : (
            <div className="w-[70%]  mt-[50px] grid grid-cols-4 gap-[10px]  mx-auto max-lg2:w-[80%]  max-lg1:w-[90%] max-lg:grid-cols-2 max-sm1:grid-cols-1">
              {findNotspecialDivision?.map((division, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/division/${division?._id}`)}
                    className="w-[100%]  col-span-1 h-[200px] flex flex-col justify-center  rounded-[10px] border border-[#EFB200] items-center gap-[20px] bg-white  p-4 cursor-pointer"
                  >
                    {/* <div>
                      <img src={require("../../CAS/Ellipse 5.png")} alt="" />
                    </div> */}
                    <div className="flex flex-col items-center justify-center gap-[10px] text-center">
                      <span className=" text-[#0C73B8] text-[18px] capitalize font-bold max-lg2:text-[14px]">
                        {translationState?.lan === "En" && division?.name_en}
                        {translationState?.lan === "Am" && division?.name_am}
                        {translationState?.lan === "Or" && division?.name_or}
                        {translationState?.lan === "Tg" && division?.name_tg}
                        {translationState?.lan === "Sm" && division?.name_sm}
                        {translationState?.lan === "Af" && division?.name_af}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="w-[80%] my-[50px] mx-auto max-lg2:w-[90%]">
        <div className="w-[100%] flex flex-col justify-center items-center gap-[10px]">
          {translationState?.lan==="En" &&   <span className="text-[#0C73B8] text-[24px] font-bold uppercase max-sm1:text-[18px]">
            About Us
          
          </span>}
          {translationState?.lan==="Am" &&   <span className="text-[#0C73B8] text-[40px] font-bold uppercase max-sm1:text-[30px]">
            ስለ እኛ
          </span>}
          {translationState?.lan==="Or" &&   <span className="text-[#0C73B8] text-[24px] font-bold uppercase max-sm1:text-[18px]">
            waa’ee keenya
          </span>}
          {translationState?.lan==="Tg" &&   <span className="text-[#0C73B8] text-[24px] font-bold uppercase max-sm1:text-[30px]">
          ብዛዕባና ዝምልከት
          </span>}
          {translationState?.lan==="Sm" &&   <span className="text-[#0C73B8] text-[24px] font-bold uppercase max-sm1:text-[18px]">
          nagu saabsan
          </span>}
          {translationState?.lan==="Af" &&   <span className="text-[#0C73B8] text-[24px] font-bold uppercase max-sm1:text-[18px]">
          About Us
          </span>}
        
        
          <div className="w-[4%] h-[5px] bg-[#EFB200]"></div>
        </div>
        <div className="w-[100%] my-[50px] grid grid-cols-2 gap-[50px] max-lg:grid-cols-1">
          <div className="col-span-1 w-[100%] h-[100%] flex flex-col gap-[20px] text-gray-800 leading-[30px]">
            <p>
              {translationState?.lan ==="En" && "The Addis Ababa city administration is implementing a number ofchanges in order to make the services provided to the city residents clear, fast and effective and to ensure its usefulness."}
              {translationState?.lan ==="Am" && "የአዲስ አበባ ከተማ አስተዳደር ለከተማው ነዋሪዎች የሚሰጠውን አገልግሎት ግልጽ፣ ፈጣንና ውጤታማ ለማድረግና ተጠቃሚነቱን ለማረጋገጥ በርካታ ለውጦችን በማድረግ ላይ ይገኛል።"}
              {translationState?.lan ==="Or" && "Bulchiinsi magaalaa Addis Ababa tajaajila jiraattota magaalichaaf kennamu ifa, saffisaa fi bu’a qabeessa taasisuu fi faayidaa isaa mirkaneessuuf jijjiirama hedduu hojiirra oolchaa jira."}
              {translationState?.lan ==="Tg" && "ምምሕዳር ከተማ ኣዲስ ኣበባ ንነበርቲ ከተማ ኣዲስ ኣበባ ዝወሃብ ግልጋሎት ግልፂ፣ ቅልጡፍን ውፅኢታዊን ንምግባርን ጠቕሙ ንምርግጋፅን ብርክት ዝበሉ ለውጥታት የተግብር ኣሎ።"}
              {translationState?.lan ==="Sm" && "Maamulka magaalada Addis Ababa ayaa wada isbedello kala duwan si ay u noqdaan kuwa cad oo degdeg ah oo wax ku ool ah adeegyada ay u hayaan shacabka magaalada, isla markaana loo xaqiijiyo faa’iidadooda."}
              {translationState?.lan ==="Af" && "The Addis Ababa city administration is implementing a number ofchanges in order to make the services provided to the city residents clear, fast and effective and to ensure its usefulness."}

            
            </p>
            <p>
            {translationState?.lan ==="En" && `The Housing Development Corporation is an institution owned by the administration and established to implement various housing development programs with partners in a way that is linked to the continuous development plan in order to further accelerate the structural changes and the expansion of service sectors resulting from the rapid development journey being recorded in the city.`}
              {translationState?.lan ==="Am" && `የቤቶች ልማት ኮርፖሬሽን በከተማዋ እየተመዘገበ ያለው ፈጣን የልማት ጉዞ የሚያስከትለውን መዋቅራዊ ለውጥ እና የአገልግሎት ዘርፎች መስፋፋትን የበለጠ ለማፋጠን የከተማዋን ነዋሪ የመኖሪያ ቤት እጥረት እየተቀረፈ እንዲሄድ ቀጣይነት ካለው ልማት ዕቅድ  ጋር በሚያስተሳስር መንገድ የተለያዩ የቤት ልማት ፕሮግራምን ከአጋር አካላት ጋር በመቀናጀት በአስተዳደሩ ባለቤትነት በከተማዋ ለመተግበር የተቋቋመ ተቋም ነው፡፡`}
             
              {translationState?.lan ==="Or" && `Dhaabbanni Misooma Manneen Jijjiirama caasaa fi babal’ina dameewwan tajaajilaa saffisaan uumaman daran saffisiisuuf jecha sagantaalee misooma mana jireenyaa adda addaa michoota waliin haala karoora misooma walitti fufiinsa qabuun walqabatee hojiirra oolchuuf hundeeffame dha imala misoomaa magaalattii keessatti galmaa’aa jira.`}
              {translationState?.lan ==="Tg" && `
ኮርፖሬሽን ልምዓት ኣባይቲ በቲ ምምሕዳር ዝውነንን ካብቲ ቅልጡፍ ዝፍጠር መዋቕራዊ ለውጥታትን ምስፍሕፋሕ ዘፈር ኣገልግሎትን ብዝበለፀ ንምቅልጣፍ ምስ መሻርኽቲ ዝተፈላለዩ መደባት ልምዓት ኣባይቲ ንምትግባር ዝተመስረተ ትካል እዩ። ልምዓታዊ ጉዕዞ ኣብ ከተማ መቐለ ይምዝገብ ኣሎ።`}
              {translationState?.lan ==="Sm" && `Hay’adda Horumarinta guryuhu waa hay’ad uu maamulku leeyahay oo loo asaasay in ay hirgeliso barnaamijyo kala duwan oo lagu horumarinayo guryaha oo lala wadaago hay’ado la shaqeeya hab ku xidhan qorshaha horumarinta ee joogtada ah si loo sii dardar geliyo isbedellada qaabdhismeedka iyo balaadhinta qaybaha adeegyada ee ka dhashay sida xawliga ah. Socdaalkii horumarineed ee magaalada laga duubay.`}
              {translationState?.lan ==="Af" && "The Addis Ababa city administration is implementing a number ofchanges in order to make the services provided to the city residents clear, fast and effective and to ensure its usefulness."}
            
            </p>
          </div>
          <div className="w-[100%] h-[100%] col-span-1 px-4 grid grid-cols-2 gap-[10px] max-sm1:grid-cols-1">
            <img
              src={
                "https://business.linkupaddis.com/wp-content/uploads/2021/06/houses.jpg"
              }
              alt=""
              className="w-[100%] h-[200px]  object-cover  border border-[#EFB200] rounded-[10px] max-sm1:h-[300px]"
            />
            <img
              src={require("../../CAS/about.jpg")}
              alt=""
              className="object-contain w-[100%] h-[200px]  border border-[#EFB200] rounded-[10px] max-sm1:h-[300px]"
            />
            <img
              src={require("../../CAS/housingImg-1.jpg")}
              alt=""
              className="object-contain w-[100%] h-[200px]  border border-[#EFB200] rounded-[10px] max-sm1:h-[300px]"
            />
            <img
                   src={require("../../CAS/housingImg-2.jpg")}
              alt=""
              className="w-[100%] h-[200px]  object-cover  border border-[#EFB200] rounded-[10px] max-sm1:h-[300px]"
            />
          </div>
        </div>
        <div className="w-[80%] my-[70px] mx-auto grid grid-cols-2 gap-[40px] max-lg2:w-[90%] max-lg:w-[100%] max-md1:grid-cols-1">
          <div className="col-span-1 flex flex-col justify-center items-center gap-[20px]">
            <TbTargetArrow className="text-[100px] text-[#0C73B8]" />
            {translationState?.lan ==="En" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Mission</h3>}
            {translationState?.lan ==="Am" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">ተልዕኮ</h3>}
            {translationState?.lan ==="Or" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Ergama</h3>}
            {translationState?.lan ==="Tg" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">ተልእኾ</h3>}
            {translationState?.lan ==="Sm" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Hawlgalka</h3>}
            {translationState?.lan ==="Af" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Mission</h3>}

            {translationState?.lan ==="En" &&   <p className="text-center text-gray-600 text-[14px] w-[70%]">
              

            To address the shortage of housing in Addis Ababa city, by developing a coordinated system, involving contractors and consultants, building quality, cost-effective and clean houses that are comfortable and clean for living in a short period of time, and to transfer the houses to the community in a fair and reliable manner.


            </p> }
            
            {translationState?.lan ==="Am" && <p className="text-center text-gray-600 text-[14px] w-[70%]">
              በአዲስ አበባ ከተማ የሚታየውን የመኖሪያ ቤት እጥረት ለመቅረፍ ቅንጅታዊ አሰራርን በማጎልበት፣ የስራ ተቋራጮችንና አማካሪዎችን በማሳተፍ ጥራት፣ ወጪን ቆጣቢ እና በአጭር ጊዜ ውስጥ ለኑሮ ምቹና ፅዱ የሆኑ ቤቶችን በመገንባት ለህብረተሰቡ ፍትሃዊ እና ታአማኒነት በተላበሰ መልኩ ቤቶችን እንዲተላለፉ ማድረግ ነው፡፡
            </p> }
            
            {translationState?.lan ==="Or" && <p className="text-center text-gray-600 text-[14px] w-[70%]">
              Hanqina mana jireenyaa magaalaa Addis Ababa keessatti mul’atu furuuf, sirna qindoomina qabu qopheessuun, kontiraaktarootaa fi gorsitoota hirmaachisuun, qulqullina ijaarsaa, baasii xiqqaa fi qulqullina manneen jireenyaaf mijataa fi qulqulluu ta’an yeroo gabaabaa keessatti, manneen dabarsuu dha hawaasaaf haala haqa qabeessaa fi amanamaa ta’een.
            </p> }
            
            {translationState?.lan ==="Tg" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
            
ኣብ ከተማ ኣዲስ ኣበባ ዘሎ ሕፅረት ኣባይቲ ንምፍታሕ፣ ዝተዋደደ ስርዓት ብምምዕባል፣ ኮንትራክተራትን ኣማኸርትን ብምስታፍ፣ ፅሬት ህንፀት፣ ዋጋ ዝቕንስን ፅሩይን ንመነባብሮ ዝምችእን ፅሩይን ኣባይቲ ኣብ ሓፂር እዋን ብምስግጋር፣ ነቶም ኣባይቲ ምስግጋር እዩ። ናብ ሕብረተሰብ ብፍትሓውን ዘተኣማምንን መንገዲ።
            </p> }
            
            {translationState?.lan ==="Sm" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              
Si wax looga qabto guri la’aanta ka jirta magaalada Addis Ababa, iyadoo la samaynayo nidaam isku xidhan, oo qandaraasleyaal iyo la-taliyayaal ka qayb qaadanayaan, dhisidda tayo, kharash iyo guryo nadiif ah oo raaxo iyo nadiif ah oo lagu noolaado muddo gaaban gudaheed, waa in guryaha lagu wareejiyo. bulshada si cadaalad ah oo la isku hallayn karo.
            </p> }
            
            {translationState?.lan ==="Af" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              To address the shortage of housing in Addis Ababa city, by developing a coordinated system, involving contractors and consultants, building quality, cost-effective and clean houses that are comfortable and clean for living in a short period of time, and to transfer the houses to the community in a fair and reliable manner.
            </p> }
          
        
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center gap-[20px]">
            <FaEye className="text-[100px] text-[#0C73B8]" />
            {translationState?.lan ==="En" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Vision</h3>}
            {translationState?.lan ==="Am" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">ራዕይ</h3>}
            {translationState?.lan ==="Or" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Mul'ata</h3>}
            {translationState?.lan ==="Tg" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">ራእይ</h3>}
            {translationState?.lan ==="Sm" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Aragtida</h3>}
            {translationState?.lan ==="Af" &&   <h3 className="text-[#EFB200] text-[30px] font-bold">Mission</h3>}
         

            {translationState?.lan ==="En" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              By providing Addis Ababa residents with inexpensive, high-quality, accessible, and livable homes, citizens will be able to become homeowners in 2030.
            </p> }
            
            {translationState?.lan ==="Am" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              
              በአዲስ አበባ ከተማ የነዋሪዎችን አቅም ያገናዘቡ፣ጥራት ያላቸው፣ ተደራሽ፣ለኑሮ ምቹ የሆኑ የመኖሪያ ቤቶች እንዲቀርቡ በማድረግ በ2022 ዓ.ም.የቤት ባለቤት ሆነው ማየት፡፡
            </p> }
            
            {translationState?.lan ==="Or" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              
              Magaalaa Addis Ababa keessatti, mana jireenyaa qulqullina olaanaa qabu, dhaqqabamaa, jireenyaaf mijatu kan dandeettii jiraattotaa tilmaama keessa galche dhiyeessuudhaan, bara 2022tti abbaa manaa akka ta’an arguuf.
            </p> }
            
            {translationState?.lan ==="Tg" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              
              ኣብ ከተማ ኣዲስ ኣበባ፣ ዓቕሚ ነበርቲ ኣብ ግምት ዘእተወ ልዑል ፅሬት ዘለዎ፣ ተበፃሒ፣ ንመነባብሮ ዝኸውን ኣባይቲ ብምቕራብ፣ ኣብ ዓመት 2022 ወነንቲ ገዛውቲ ክኾኑ ምርኣይ።
            </p> }
            
            {translationState?.lan ==="Sm" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              Magaalada Addis Ababa, iyadoo la siinayo guryo tayo sare leh, la heli karo, lagu noolaan karo taasoo tixgalinaysa awoodda dadka deggan, si loo arko inay noqdaan mulkiilayaal guri sanadka 2022.
            </p> }
            
            {translationState?.lan ==="Af" &&     <p className="text-center text-gray-600 text-[14px] w-[70%]">
              By providing Addis Ababa residents with inexpensive, high-quality, accessible, and livable homes, citizens will be able to become homeowners in 2030.
            </p> }
          </div>
        </div>
      </div>

      <div>
      
        <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63049.66298446406!2d38.72826568791095!3d9.0085424092144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x164b85a4e7548891%3A0x4f68f867abf9533e!2sAddis%20Ababa%20Housing%20Development%20and%20Administration%20Bureau%2C%202Q59%2BCQ8%2C%20Dem.%20Rep.%20Congo%20St%2C%20Addis%20Ababa!3m2!1d9.0085462!2d38.7694666!5e0!3m2!1sen!2set!4v1716976813903!5m2!1sen!2set"       title="Addis Ababa Housing Development Corporation"    width="100%"
          height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <Footer />
    </>
  );
}

export default Login;
