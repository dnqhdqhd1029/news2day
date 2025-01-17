var mediaData = {
    mediaDomain : '',
    mediaCdn : ''
};


/*전체메뉴 드롭다운*/
$(function () {

    var pathName = location.pathname;

    //메인 페이지
    if (pathName == "/" || pathName == "main" || pathName == "/main") {
        MAIN.init();
    // 메트로in,서민금융,Job&에듀
    }else if(pathName.indexOf('section') >-1 || pathName.indexOf('list') > -1 ||
	pathName.indexOf('opinion') > -1 || pathName.indexOf('plan') > -1 || pathName.indexOf('local') > -1 || pathName.indexOf('newsList') > -1){
        SECTION.init();
		LIST.init();
    //상세
    }else if(pathName.indexOf('article') > -1 || pathName.indexOf('newsView') > -1){
        VIEW.init();

    }else if(pathName.indexOf('search') > -1 ){
        SEARCH.init();

    }else if(pathName.indexOf('member') > -1 ){
        MEMBER.init();
    }else if(pathName.indexOf('event') > -1 ){
        EVENT.init();
    }else if(pathName.indexOf('photo') > -1 ){
        /*t*/
        PHOTO.init();
    }else if (/^\/company\/.*?/.test(pathName)) {
        COMPANY.init();
    }
    servicePopup.init();
    SRV.init();
});
//*전체메뉴 드롭다운*/
var offset = 0;
var page = 2;
//기본
var SRV = {
    init : function () {
        var self = this;
        console.log("SRV.INIT");
        self.eventBind();
        self.mediaData();
        self.boardPopup();
        //self.mainHeadLine();
        //self.statisticsInit();

    },
    eventBind : function(){
        var self = this ;

         $('.main-menu').on('click', function () {
            if (!($('body').hasClass('body-small'))) {
                $("body").toggleClass("menu-drop");
                // SmoothlyMenu();
            }
        });

        $(".top-search-ico").on('click',function () {
            $("#m_search_box_02").slideToggle("fast");

        });


        $(".top-menu-ico").on('click',function () {

            $('#side-menu').stop().animate({
                'marginLeft': ''
            }, 200);
        });


        $(".cancel-ico-01").on('click',function () {

            $('#side-menu').stop().animate({
                'marginLeft': '-100%'
            }, 200);
        });

        $(".btn_search_input,.m_btn_search_input").on("keyup", function () {
            var  txt = $(this).val();
			if (window.event.keyCode == 13) {
				SRV.goPage('/search?searchText='+encodeURI(txt));
			}
        });
        $("#btn_search_click").on("click", function(){
            SRV.goPage('/search?searchText='+encodeURI($(".btn_search_input").val()));
        });



    },

    mediaData : function(){
        $.ajax({
            url: "/rest/media",
            contentType: "application/json",
            type: "GET",
            dataType:"JSON",
            success: function(data){
                mediaData.mediaCdn = data.mediaCdn;
                mediaData.mediaDomain = data.mediaDomain;
            },
            error: function (error){
                //alert('다시 시도하세요');
            }
        });

    },

    boardPopup : function(obj){
        console.log(obj);
        // 모바일
        if(ObjectUtils.deviceChk()){

        }else{

        // PC

        }

    },
	banner : function(){
		$(".banner_render a").off().on('click',function (){
			var bannerSeq = $(this).attr('target').replace('banner_','');
			var url = window.location.href;
			var left = $(this).offset().left;
			var top = $(this).offset().top;
			var today = new Date();
			var obj = {'bannerSeq' : bannerSeq, 'url' : url, 'today' : today, 'left' : left , 'top' : top};
			$.ajax({
				url: "/rest/banner/count",
				type: "POST",
				dataType:"JSON",
				data: obj,
				success: function(data){

				},
				error: function (error){
					console.log(error);
				}
			});
		});

	},
    //이동
    goPage : function (url, target) {
        if (ObjectUtils.isNotEmpty(url)) {
            target = ObjectUtils.isEmpty(target) ? "_self" : target;
            window.open(url, target);
        }
    },
    eventKey : function(){
        //엔터
        if(event.keyCode == 13){
            SEARCH.goSearch();
        }

    },


    mainHeadLine : function(){



            window.artyom = new Artyom();
            if(artyom.speechSupported()){
                artyom.ArtyomVoicesIdentifiers["ko-KR"] = ["Google 한국의", "ko-KR", "ko_KR"];
                artyom.initialize({
                    lang:"ko-KR",
                    debug:false
                }).then(function(){
                }).catch(function(err){
                    console.log(err);
                });
            }else{
                //alert("지원하지 않는 브라우저입니다.");
                /* $("#contents").prop("disabled", "disabled");
                    $("#ttsBtn").hide();
                */

            }

            $(".speaker-listbox").on("click", function(){

                var agent = navigator.userAgent.toLowerCase();
                if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                    alert("익스플로러에서는 제공되지 않는 기능입니다. \n 크롬에서 이용해주세요.");
                }else{

                    var flag = $(".speaker-listbox").hasClass('true') ;
                    var contents = $("#speaker").text();
                    var rightContents = $("#speaker_right").text();
                    if(flag) {
                      $(".speaker-listbox").removeClass('true');
                        artyom.shutUp();
                    }else{

                      $(".speaker-listbox").addClass('true');

                        artyom.say(contents,{
                            onEnd: function(){
                                artyom.say(rightContents,{
                                onEnd: function(){
                                    $(".speaker-listbox").removeClass('true');
                                    artyom.shutUp();
                                }

                                });
                            }

                        });
                    }
                }

            });


    }/*,

    statisticsInit : function(){
      if(!wcs_add) var wcs_add = {};
      wcs_add["wa"] = "73667ba2315ec4";
      if(window.wcs) {
        wcs_do();
      }
    },*/



};

//메인 페이지
var MAIN = {
    init : function () {
        console.log("MAIN INIT");
        var self = this;
        self.eventBind();
    },
    eventBind : function() {
        var self = this;

        $(".latest-news-arrow").on("click", function(){
           $("#dropdown_show").toggleClass('show');
        });

    }
};



var SECTION = {
    init : function (){
        var self = this;
        self.plan();
    },
    plan : function () {


        $(".plan_area").css({"display":"block"});
        $("#div_section").after($("#plan_series").html());
        $(".section_template").next().remove();

    }



};
var VIEW = {
	sectionEnum : {
        /*굿잡뉴스*/'/00/01/CA/001':{menu:16},
		/*굿잡뉴스 > 취준생*/'/00/01/CA/001001':{menu:16},
		/*굿잡뉴스 > 취준생 > JOB속보*/'/00/01/CA/001001001':{menu:16},
		/*굿잡뉴스 > 취준생 > 취업도우미*/'/00/01/CA/001001002':{menu:16},
		/*굿잡뉴스 > 취준생 > Budget analysis*/'/00/01/CA/001001003':{menu:16},
		/*굿잡뉴스 > 취준생 > 청년*/'/00/01/CA/001001004':{menu:16},
		/*굿잡뉴스 > 취준생 > 중장년*/'/00/01/CA/001001005':{menu:16},
		/*굿잡뉴스 > 취준생 > 대기업족*/'/00/01/CA/001001006':{menu:16},
		/*굿잡뉴스 > 취준생 > 공시족*/'/00/01/CA/001001007':{menu:16},
		/*굿잡뉴스 > 취준생 > 일본을 뚫어라*/'/00/01/CA/001001008':{menu:16},
		/*굿잡뉴스 > 취준생 > 글로벌JOB*/'/00/01/CA/001001009':{menu:16},
		/*굿잡뉴스 > 취준생 > 종합*/'/00/01/CA/001001010':{menu:16},
		/*굿잡뉴스 > 직장인*/'/00/01/CA/001002':{menu:16},
		/*굿잡뉴스 > 직장인 > 직업이야기*/'/00/01/CA/001002011':{menu:16},
		/*굿잡뉴스 > 직장인 > JOB談*/'/00/01/CA/001002012':{menu:16},
		/*굿잡뉴스 > 직장인 > 대기업*/'/00/01/CA/001002013':{menu:16},
		/*굿잡뉴스 > 직장인 > 중소기업*/'/00/01/CA/001002014':{menu:16},
		/*굿잡뉴스 > 직장인 > 공기업*/'/00/01/CA/001002015':{menu:16},
		/*굿잡뉴스 > 직장인 > 금융업*/'/00/01/CA/001002016':{menu:16},
		/*굿잡뉴스 > 직장인 > IT/게임*/'/00/01/CA/001002017':{menu:16},
		/*굿잡뉴스 > 직장인 > 종합*/'/00/01/CA/001002018':{menu:16},
		/*굿잡뉴스 > 창직·창업*/'/00/01/CA/001003':{menu:16},
		/*굿잡뉴스 > 창직·창업 > 스타트업*/'/00/01/CA/001003019':{menu:16},
		/*굿잡뉴스 > 창직·창업 > 창업도우미*/'/00/01/CA/001003020':{menu:16},
		/*굿잡뉴스 > 창직·창업 > 프렌차이즈*/'/00/01/CA/001003021':{menu:16},
		/*굿잡뉴스 > 창직·창업 > 자영업*/'/00/01/CA/001003022':{menu:16},
		/*굿잡뉴스 > 창직·창업 > 1인창업*/'/00/01/CA/001003023':{menu:16},
		/*굿잡뉴스 > 창직·창업 > 종합*/'/00/01/CA/001003024':{menu:16},
		/*굿잡뉴스 > 미래일자리*/'/00/01/CA/001004':{menu:16},
		/*굿잡뉴스 > 미래일자리 > 직업의 미래*/'/00/01/CA/001004025':{menu:16},
		/*굿잡뉴스 > 미래일자리 > CEO북클럽*/'/00/01/CA/001004026':{menu:16},
		/*굿잡뉴스 > 일자리정책*/'/00/01/CA/001005':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 정부*/'/00/01/CA/001005027':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 국회*/'/00/01/CA/001005028':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 사회*/'/00/01/CA/001005029':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 지자체*/'/00/01/CA/001005030':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 軍*/'/00/01/CA/001005031':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 교육*/'/00/01/CA/001005032':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 미디어*/'/00/01/CA/001005033':{menu:16},
		/*굿잡뉴스 > 일자리정책 > 종합*/'/00/01/CA/001005034':{menu:16},
		
        /*ESG*/'/00/01/CA/018':{menu:240},
		/*ESG > 환경*/'/00/01/CA/018001':{menu:240},
		/*ESG > 사회*/'/00/01/CA/018002':{menu:240},
		/*ESG > 지배구조*/'/00/01/CA/018003':{menu:240},		
		/*ESG > 종합*/'/00/01/CA/018004':{menu:240},
		
		/*금융·증권*/'/00/01/CA/002':{menu:17},
		/*금융·증권 > 경제정책*/'/00/01/CA/002006':{menu:17},
		/*금융·증권 > 금융/증권*/'/00/01/CA/002007':{menu:17},
		/*금융·증권 > 금융/증권 > 금융*/'/00/01/CA/002007035':{menu:17},
		/*금융·증권 > 금융/증권 > 증권*/'/00/01/CA/002007036':{menu:17},
		/*금융·증권 > 금융/증권 > 가상화폐*/'/00/01/CA/002007037':{menu:17},
		/*금융·증권 > 글로벌경제*/'/00/01/CA/002008':{menu:17},
		/*금융·증권 > 거꾸로 읽는 경제*/'/00/01/CA/002009':{menu:17},
		/*금융·증권 > 기획*/'/00/01/CA/002010':{menu:17},
		/*금융·증권 > 종합*/'/00/01/CA/002011':{menu:17},

		/*비즈*/'/00/01/CA/003':{menu:18},
		/*비즈 > 산업*/'/00/01/CA/003012':{menu:18},
		/*비즈 > 산업 > 자동차*/'/00/01/CA/003012038':{menu:18},
		/*비즈 > 산업 > 업계소식*/'/00/01/CA/003012039':{menu:18},
		/*비즈 > 산업 > 생활경제*/'/00/01/CA/003012040':{menu:18},
		/*비즈 > 재계*/'/00/01/CA/003013':{menu:18},
		/*비즈 > IT/게임*/'/00/01/CA/003015':{menu:18},
		/*비즈 > 부동산*/'/00/01/CA/003016':{menu:18},
		/*비즈 > 기획*/'/00/01/CA/003017':{menu:18},
		/*비즈 > 종합*/'/00/01/CA/003018':{menu:18},

		/*생활·경제*/'/00/01/CA/004':{menu:42},
		/*생활·경제 > 헬스/과학*/'/00/01/CA/004019':{menu:42},
		/*생활·경제 > 헬스/과학 > 헬스클리닉*/'/00/01/CA/004019041':{menu:42},
		/*생활·경제 > 패션/뷰티*/'/00/01/CA/004020':{menu:42},
		/*생활·경제 > 패션/뷰티 > 스타일보고서*/'/00/01/CA/004020042':{menu:42},
		/*생활·경제 > 패션/뷰티 > 직장인 뷰티*/'/00/01/CA/004020043':{menu:42},
		/*생활·경제 > 여행/레저*/'/00/01/CA/004021':{menu:42},
		/*생활·경제 > 음식/요리*/'/00/01/CA/004022':{menu:42},
		/*생활·경제 > 음식/요리 > 캐리의 음식&도예*/'/00/01/CA/004022044':{menu:42},
		/*생활·경제 > 음식/요리 > 직장인 쿡*/'/00/01/CA/004022045':{menu:42},
		/*생활·경제 > 식음료/유통*/'/00/01/CA/003014':{menu:18},
		/*생활·경제 > 기획*/'/00/01/CA/004023':{menu:42},
		/*생활·경제 > 기획 > 심층기획*/'/00/01/CA/004023046':{menu:42},
		/*생활·경제 > 기획 > 나는 솔로다*/'/00/01/CA/004023047':{menu:42},
		/*생활·경제 > 기획 > D씨의 정직한 체험담*/'/00/01/CA/004023048':{menu:42},
		/*생활·경제 > 종합*/'/00/01/CA/004024':{menu:42},

		/*스페셜기획*/'/00/01/CA/005':{menu:19},
		/*스페셜기획 > 국내 직장분석*/'/00/01/CA/005025':{menu:19},
		/*스페셜기획 > 국내 직장분석 > 직장 돋보기 분석*/'/00/01/CA/005025049':{menu:19},
		/*스페셜기획 > 국내 직장분석 > 라이벌 직장분석*/'/00/01/CA/005025050':{menu:19},
		/*스페셜기획 > 국내 직장분석 > 기업별입사전략*/'/00/01/CA/005025051':{menu:19},
		/*스페셜기획 > 굿잡코리아포럼*/'/00/01/CA/005026':{menu:19},
		/*스페셜기획 > 직업혁명*/'/00/01/CA/005027':{menu:19},
		/*스페셜기획 > JOB카툰*/'/00/01/CA/005028':{menu:19},
		/*스페셜기획 > JOB카툰 > 박용인의 JOB카툰*/'/00/01/CA/005028052':{menu:19},
		/*스페셜기획 > JOB카툰 > 박시영의 뉴 잡툰*/'/00/01/CA/005028053':{menu:19},
		/*스페셜기획 > 글로벌기획*/'/00/01/CA/005029':{menu:19},
		/*스페셜기획 > 이태희의 JOB채*/'/00/01/CA/005030':{menu:19},
		/*스페셜기획 > 민경철의 검사수첩*/'/00/01/CA/005031':{menu:19},
		/*스페셜기획 > 올해의 10대 뉴스*/'/00/01/CA/005032':{menu:19},
		/*스페셜기획 > 올해의 10대 뉴스 > 2016년*/'/00/01/CA/005032054':{menu:19},
		/*스페셜기획 > 올해의 10대 뉴스 > 2017년*/'/00/01/CA/005032055':{menu:19},
		/*스페셜기획 > 올해의 10대 뉴스 > 2018년*/'/00/01/CA/005032056':{menu:19},
		/*스페셜기획 > 올해의 10대 뉴스 > 2019년*/'/00/01/CA/005032057':{menu:19},
		/*스페셜기획 > 심층기획*/'/00/01/CA/005033':{menu:19},
		/*스페셜기획 > 심층기획 > 내부고발자*/'/00/01/CA/005033058':{menu:19},
		/*스페셜기획 > 심층기획 > 재계 뉴 리더*/'/00/01/CA/005033059':{menu:19},
		/*스페셜기획 > 심층기획 > 청년이 살아야 나라가 산다*/'/00/01/CA/005033060':{menu:19},
		/*스페셜기획 > 인포잡스*/'/00/01/CA/005034':{menu:19},

		/*사람들*/'/00/01/CA/006':{menu:20},
		/*사람들 > JOB인터뷰*/'/00/01/CA/006035':{menu:20},
		/*사람들 > CEO리포트*/'/00/01/CA/006036':{menu:20},
		/*사람들 > 인물탐구*/'/00/01/CA/006037':{menu:20},
		/*사람들 > 뉴스 속 직업*/'/00/01/CA/006038':{menu:20},
		/*사람들 > 인스타 스타*/'/00/01/CA/006039':{menu:20},
		/*사람들 > 지난기획*/'/00/01/CA/006040':{menu:20},
		/*사람들 > 인생 2막의 창업자들*/'/00/01/CA/006041':{menu:20},
		/*사람들 > 인사·부음*/'/00/01/CA/006042':{menu:20},

		/*이야기쉼터*/'/00/01/CA/007':{menu:21},
		/*이야기쉼터 > 칼럼*/'/00/01/CA/007043':{menu:21},
		/*이야기쉼터 > 칼럼 > 김희철의 직업군인이야기*/'/00/01/CA/007043061':{menu:21},
		/*이야기쉼터 > 칼럼 > 최환종 나의 공군 이야기 */'/00/01/CA/007043062':{menu:21},
		/*이야기쉼터 > 칼럼 > 데스크칼럼*/'/00/01/CA/007043063':{menu:21},
		/*이야기쉼터 > 칼럼 > 전문가 칼럼*/'/00/01/CA/007043064':{menu:21},
		/*이야기쉼터 > 칼럼 > 이태희의 심호흡*/'/00/01/CA/007043065':{menu:21},
		/*이야기쉼터 > 칼럼 > 이상호의 고공비행*/'/00/01/CA/007043066':{menu:21},
		/*이야기쉼터 > 칼럼 > 차병희의 사장의조건2*/'/00/01/CA/007043067':{menu:21},
		/*이야기쉼터 > 칼럼 > 윤재은 공간철학*/'/00/01/CA/007043068':{menu:21},
		/*이야기쉼터 > 칼럼 > 개봉작 프리뷰 - 볼까? 말까?*/'/00/01/CA/007043069':{menu:21},
		/*이야기쉼터 > 칼럼 > 송대욱의 건강 쓰리잘*/'/00/01/CA/007043070':{menu:21},
		/*이야기쉼터 > 칼럼 > 수필가 윤혜영의 문화산책*/'/00/01/CA/007043071':{menu:21},
		/*이야기쉼터 > 칼럼 > 엄주원의 이유있는 디자인*/'/00/01/CA/007043072':{menu:21},
		/*이야기쉼터 > 칼럼 > 이윤희의 RUN 114*/'/00/01/CA/007043073':{menu:21},
		/*이야기쉼터 > 칼럼 > 청년 칼럼*/'/00/01/CA/007043074':{menu:21},
		/*이야기쉼터 > 칼럼 > 김희철 칼럼*/'/00/01/CA/007043075':{menu:21},
		/*이야기쉼터 > 칼럼 > 프리마돈나 최주희*/'/00/01/CA/007043076':{menu:21},
		/*이야기쉼터 > 칼럼 > 최환종의 스쿠버 다이빙*/'/00/01/CA/007043077':{menu:21},
		/*이야기쉼터 > 칼럼 > 석하스님의 카이스트 수행기*/'/00/01/CA/007043078':{menu:21},
		/*이야기쉼터 > 칼럼 > 초현실주의 그림읽기*/'/00/01/CA/007043079':{menu:21},
		/*이야기쉼터 > 칼럼 > 우사라의 마음으로 그림읽기*/'/00/01/CA/007043080':{menu:21},
		/*이야기쉼터 > 칼럼 > 이나영의 Charm한 스토리*/'/00/01/CA/007043081':{menu:21},
		/*이야기쉼터 > 칼럼 > 고창신의 맞춤형 헬스*/'/00/01/CA/007043082':{menu:21},
		/*이야기쉼터 > 칼럼 > 권부원의 세상만사*/'/00/01/CA/007043083':{menu:21},
		/*이야기쉼터 > 칼럼 > 송진선 토탈 뷰티*/'/00/01/CA/007043084':{menu:21},
		/*이야기쉼터 > 칼럼 > 백연주의 영화 속 패션*/'/00/01/CA/007043085':{menu:21},
		/*이야기쉼터 > 칼럼 > 송대욱 체질개선*/'/00/01/CA/007043086':{menu:21},
		/*이야기쉼터 > 칼럼 > 이기명 뷰티일러스트*/'/00/01/CA/007043087':{menu:21},
		/*이야기쉼터 > 칼럼 > 서동순과 함께하는 종이접기*/'/00/01/CA/007043088':{menu:21},
		/*이야기쉼터 > 칼럼 > 쉐프 민상호의 감성요리*/'/00/01/CA/007043089':{menu:21},
		/*이야기쉼터 > 칼럼 > 이승재의 정경풍경*/'/00/01/CA/007043090':{menu:21},
		/*이야기쉼터 > 칼럼 > 신민형 생활문화시론*/'/00/01/CA/007043091':{menu:21},
		/*이야기쉼터 > 칼럼 > 도시농부 김대식의 실패 않는 귀농·귀촌*/'/00/01/CA/007043092':{menu:21},
		/*이야기쉼터 > 칼럼 > 강소슬 20-30 톡톡*/'/00/01/CA/007043093':{menu:21},
		/*이야기쉼터 > 칼럼 > 최동군의 나도 문화해설사*/'/00/01/CA/007043094':{menu:21},
		/*이야기쉼터 > 칼럼 > 이기수의 소비자트렌드*/'/00/01/CA/007043095':{menu:21},
		/*이야기쉼터 > 칼럼 > 송하식의 세상보기*/'/00/01/CA/007043096':{menu:21},
		/*이야기쉼터 > 칼럼 > 김나령 예술의 재발견*/'/00/01/CA/007043097':{menu:21},
		/*이야기쉼터 > 칼럼 > 헬레나 에그아트*/'/00/01/CA/007043098':{menu:21},
		/*이야기쉼터 > 칼럼 > 유준곤 덴탈EQ*/'/00/01/CA/007043099':{menu:21},
		/*이야기쉼터 > 칼럼 > 이미경 명작의 비밀*/'/00/01/CA/007043100':{menu:21},
		/*이야기쉼터 > 칼럼 > 건축과 시*/'/00/01/CA/007043101':{menu:21},
		/*이야기쉼터 > 칼럼 > 이종은 한옥이야기*/'/00/01/CA/007043102':{menu:21},
		/*이야기쉼터 > 칼럼 > 윤주의 스토리텔링*/'/00/01/CA/007043103':{menu:21},
		/*이야기쉼터 > 기자의 눈*/'/00/01/CA/007044':{menu:21},

		/*전국*/'/00/01/CA/008':{menu:22},
		/*전국 > 서울*/'/00/01/CA/008053':{menu:22},
		/*전국 > 경기*/'/00/01/CA/008044':{menu:22},
		/*전국 > 부울경*/'/00/01/CA/008052':{menu:22},
		/*전국 > 대전*/'/00/01/CA/008050':{menu:22},
		/*전국 > 세종*/'/00/01/CA/008051':{menu:22},
		/*전국 > 공기업*/'/00/01/CA/008049':{menu:22},

		/*시큐리티팩트*/'/00/01/CA/009':{menu:23},
		/*시큐리티팩트 > 방위산업*/'/00/01/CA/009049':{menu:23},
		/*시큐리티팩트 > 사이버안보*/'/00/01/CA/009050':{menu:23},
		/*시큐리티팩트 > 소통시대*/'/00/01/CA/009051':{menu:23},
		/*시큐리티팩트 > 소통시대 > 김희철 칼럼*/'/00/01/CA/009051104':{menu:23},
		/*시큐리티팩트 > 소통시대 > 송승종 칼럼*/'/00/01/CA/009051105':{menu:23},
		/*시큐리티팩트 > 소통시대 > 장원준 칼럼*/'/00/01/CA/009051106':{menu:23},
		/*시큐리티팩트 > 소통시대 > 류제승 칼럼*/'/00/01/CA/009051107':{menu:23},
		/*시큐리티팩트 > 소통시대 > 원태재의 Old & New*/'/00/01/CA/009051108':{menu:23},
		/*시큐리티팩트 > 소통시대 > 김한경 칼럼*/'/00/01/CA/009051109':{menu:23},
		/*시큐리티팩트 > 소통시대 > 최기일 칼럼*/'/00/01/CA/009051110':{menu:23},
		/*시큐리티팩트 > 소통시대 > 임방순 칼럼*/'/00/01/CA/009051111':{menu:23},
		/*시큐리티팩트 > 안보종합*/'/00/01/CA/009052':{menu:23},

		/*MICE*/'/00/01/CA/024':{menu:268},
		/*MICE > 굿잡포럼*/'/00/01/CA/024001':{menu:268},
		/*MICE > ESG포럼*/'/00/01/CA/024002':{menu:268},
		/*MICE > 방산혁신포럼*/'/00/01/CA/024003':{menu:268},
		/*MICE > 지속가능경영소통대상*/'/00/01/CA/024004':{menu:268},

		/*보도자료*/'/00/01/CA/010':{menu:82},
		/*보도자료 > JOB*/'/00/01/CA/010053':{menu:82},
		/*보도자료 > 금융·증권*/'/00/01/CA/010054':{menu:82},
		/*보도자료 > 금융·증권 > 은행*/'/00/01/CA/010054112':{menu:82},
		/*보도자료 > 금융·증권 > 증권*/'/00/01/CA/010054113':{menu:82},
		/*보도자료 > 금융·증권 > 보험*/'/00/01/CA/010054114':{menu:82},
		/*보도자료 > 금융·증권 > 카드*/'/00/01/CA/010054115':{menu:82},
		/*보도자료 > 금융·증권 > 가상화폐*/'/00/01/CA/010054116':{menu:82},
		/*보도자료 > 금융·증권 > 서민금융*/'/00/01/CA/010054117':{menu:82},
		/*보도자료 > 금융·증권 > 부동산*/'/00/01/CA/010054118':{menu:82},
		/*보도자료 > 비즈*/'/00/01/CA/010055':{menu:82},
		/*보도자료 > 비즈 > 자동차*/'/00/01/CA/010055119':{menu:82},
		/*보도자료 > 비즈 > IT/게임*/'/00/01/CA/010055121':{menu:82},
		/*보도자료 > 비즈 > 업계소식*/'/00/01/CA/010055122':{menu:82},
		/*보도자료 > 생활·경제*/'/00/01/CA/010056':{menu:82},
		/*보도자료 > 생활·경제 > 헬스·과학*/'/00/01/CA/010056123':{menu:82},
		/*보도자료 > 생활·경제 > 패션·뷰티*/'/00/01/CA/010056124':{menu:82},
		/*보도자료 > 생활·경제 > 여행·레저*/'/00/01/CA/010056125':{menu:82},
		/*보도자료 > 생활·경제 > 음식·요리*/'/00/01/CA/010056126':{menu:82},
		/*보도자료 > 생활·경제 > 식음료·유통*/'/00/01/CA/010055120':{menu:82},
		/*보도자료 > 공기업*/'/00/01/CA/010057':{menu:82},
		/*보도자료 > 지자체*/'/00/01/CA/010058':{menu:82}
    },

     init : function () {
        var self = this;
        console.log("VIEW INIT");
        self.eventBind();
        //self.articleListen();
        //self.restCount();
        self.menuActive();
        self.clickDelBtn();
		self.commentList();
		
        //self.contentMetro();
		//self.imgIcoAppend();
		//self.metroBylineRemove();
    },
    txtCount : function () {
        $("#lenthChk").html($("textarea[name=commentBody]").val().length);
    },
	menuActive : function () {
        var self = this;
        var section = null;

        // if (ObjectUtils.isNotEmpty(SE)) {
        //     for (var i=0; i<SE.length; i++) {
        //         if ("/00/01/CA/001" != SE[i].organizationalUnit) {
        //             section = self.sectionEnum[SE[i].organizationalUnit];
        //             break;
        //         }
        //     }
        // } else if (ObjectUtils.isNotEmpty(CA)) {
        //     for (var i=0; i<CA.length; i++) {
        //         if ("/00/01/CA/001" != CA[i].organizationalUnit) {
        //             section = self.sectionEnum[CA[i].organizationalUnit];
        //             break;
        //         }
        //     }
        // }

        if (ObjectUtils.isNotEmpty(CA)) {
            for (var i=0; i<CA.length; i++) {
                    section = self.sectionEnum[CA[i].organizationalUnit];
                    break;
            }
        }
        if (ObjectUtils.isNotEmpty(section)) {
            LIST.menuOn(LIST.menuEnum[section.menu]);
			LIST.menuViewActive(LIST.menuEnum[section.menu]);
        }
    },
    eventBind : function() {
       var self = this;

       var mainTitle = $("input[class='siteViewTitlte']").val();
       var newsId = $("input[class='siteStoryId']").val();
		var sizeCount=0;

       //글자크기 조절
       $(".txt-sizeup").on("click", function() {
		   if(sizeCount < 3){
            var font_size = $(".view_con").css("fontSize");
						font_size =	font_size.replace('px','');
						font_size = Number(font_size) + 5;

            $('.view_con').css('font-size', font_size+'px');
			sizeCount++;
		   }

       });

        $(".txt-sizedown").on("click", function() {
			if(sizeCount > -2){
            var font_size = $(".view_con").css("fontSize");
						font_size =	font_size.replace('px','');
            font_size = Number(font_size) - 5;
            $('.view_con').css('font-size', font_size+'px');
			sizeCount--;
			}

       });

        //카카오스토리공유
        $(".sns_kakaoStory").on("click", function(){
            var url = window.location.href+'?sns=ks';
            window.open('https://story.kakao.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(mainTitle),'',"scrollbars=yes,resizable=yes width=500,height=600");
        });
        //밴드공유
        $(".sns_band").on("click", function(){
          var url = window.location.href+'?sns=bn';
            window.open('http://band.us/plugin/share?body=' + encodeURIComponent(mainTitle) + ' - ' + encodeURIComponent(url) + '&route=', "scrollbars=yes,resizable=yes width=500,height=600");
        });
        //페이스북공유
        $(".sns_faceBook").on("click", function(){
          var url = window.location.href+'?sns=fb';
            window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(url), '',"scrollbars=yes,resizable=yes width=500,height=600")

        });
        //트위터공유
        $(".sns_twitter").on("click", function(){
            var url = window.location.href+'?sns=tw';
            var href ="https://twitter.com/intent/tweet?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(mainTitle);
            var a = window.open(href,'twitter','');

            if(a){
               a.focus();
            }
        });

        //글자크기
       $(".txt-sizebtn").on("click", function(){
           if($(".sns-share-layer").css("display") == 'block'){
                $(".sns-share-layer").slideToggle("fast");
            }
            $(".sns-txtsize-layer").slideToggle("fast");


        });

        //공유버튼
        $(".share-btn").on("click", function(){
            if($(".sns-txtsize-layer").css("display") == 'block'){
                $(".sns-txtsize-layer").slideToggle("fast");
            }
            $(".sns-share-layer").slideToggle("fast");


        });

         // 프린트 팝업
        $(".print-ico").on("click", function() {

            if(ObjectUtils.isNotEmpty(newsId)){
                window.open("/print/"+newsId, "print팝업", "width=820, height=800, menubar=no, status=no, toolbar=no, scroll=yes, resizable=yes, top=0, left=0, toolbar=no");
            }
        });

        // 기사 상세 이미지 클릭 시 팝업
        $('.left-container .article-txt-contents img').on('click', function(){

            var url = $(this).attr('src');

            if(url.indexOf('/.cache/512')> -1 || url.indexOf('/.cache/128') > -1){
                url  = url.substring(0,49)  +  url.substring(60) ;
            }


			window.open(url,"_blank","width=850,height=550,menubar=no, status=no, toolbar=no, scroll=yes, resizable=yes, top=0, left=0, toolbar=no");

        });

        $(".delIco").on('click', function(){
            $(this).closest('span').html();
        });
  
        $("#commentCre").on('click', function(){
			
			var offset = 0;	
			var page = $("#page").val();	
			
			if(page == ''){
				page = 2;
			}
			/*
          if(!$("input[name=userName]").prop("readonly")){
              if (grecaptcha.getResponse().length == 0) {
                  alert('로봇을 체크하세요.');
                  return;
              }
          }*/
  
            if(ObjectUtils.isEmpty($("textarea[name=commentBody]").val())){
                alert('내용을 입력하세요');
                return;
            }
  
            if(ObjectUtils.isEmpty($("input[name=userName]").val())){
                alert('닉네임을 입력하세요');
                return;
            }
  
            if(!$("input[name=userName]").prop("readonly")){
              if(ObjectUtils.isEmpty($("input[name=userPw]").val())){
                  alert('비밀번호를 입력하세요');
                  return;
              }
            }
  
          var data = {
            contentId : newsId,
            contentTitle : mainTitle,
            commentBody : $("textarea[name=commentBody]").val(),
            userId : $("input[name=userName]").val(),
            pw : ($("input[name=userName]").prop("readonly")) ? '' : $("input[name=userPw]").val(),
            writeName : $("#writeName").html(),
         	page : page,
		    offset : offset
          };
  
          $.ajax({
              url: "/rest/createComment",
              type: "POST",
              dataType:"JSON",
              data: data,
              success: function(data){
                  if(data.message == 'SUCCESS'){
                      if(!$("input[name=userName]").prop("readonly")){
                          $("input[name=userName]").val('');
                          $("input[name=userPw]").val('');
                      }
                      $("#lenthChk").html('0');
                      $("textarea[name=commentBody]").val('');
                      self.drawCommentList(data);
                  }
              },
              error: function (error){
                  alert('다시 시도하세요');
              }
          });
        });
  
  
  
      },
  
      clickDelBtn : function () {
        var self = this;
  
          $(".reply_delete_custom").off().on('click', function() {
			var page = $("#page").val();	
			
			if(page == ''){
				page = 2;
			}
              var data = {
                  contentId : $("input[class='siteStoryId']").val(),
                  pw : '',
                  commentSeq : $(this).next('.commentId').val(),
				  page : page,
				  offset : offset
                }
                self.deleteComment(data);
          });
  
          $(".reply_delete_ico").off().on('click', function(){
            $(this).prev('div.delete_input').css('display','block');
            $(this).css('display','none');
          });
  
          $(".password_cancel_btn").off().on('click', function(){
            var $selete= $(this).parents('div.delete_input');
            $selete.css('display','none');
            $selete.next('img.reply_delete_ico').css('display','block');
          });
  
          $(".password_del_btn").off().on('click', function(){
			 var page = $("#page").val();	
			
			if(page == ''){
				page = 2;
			}
			  
            if(ObjectUtils.isEmpty($(this).prev('input[name=delPassword]').val())){
              alert('비밀번호를 입력하세요');
              return;
            }else{
              var data = {
                contentId : $("input[class='siteStoryId']").val(),
                pw : $(this).prev('input[name=delPassword]').val(),
                commentSeq : $(this).next('.commentId').val(),
				page : page,
				offset : offset
              }
              self.deleteComment(data);
            }
          });
		  
		$(".replyMoreView").off().on('click', function(){		  			
			page++;
			$("#page").val(page);
            self.commentList(page);
        
        });
		  
      },
  
      deleteComment : function (data) {
        var self = this;
        $.ajax({
            url: "/rest/deleteComment",
            type: "POST",
            dataType:"JSON",
            data: data,
            success: function(data){
              if(data.message == 'FAILPW'){
                alert('패스워드가 일치하지 않습니다');
              }else if(data.message == 'SUCCESS'){
                self.drawCommentList(data);
              }
            },
            error: function (error){
                alert('다시 시도하세요');
            }
        });
      },
  	// 댓글 리스트
	commentList : function (page) {
	
		var self = this;
	
		var newsId = $("input[class='siteStoryId']").val();		
		
		if(typeof page == 'undefined'){
			page = 2;
		}
		
		var data = {
			contentId : newsId,
			page : page,
			offset : offset
		};
  
		$.ajax({
			url: "/rest/commentList",
			type: "GET",
			dataType:"JSON",
			data: data,
			success: function(data){		

				self.drawCommentList(data);	
				SRV.mediaData();				
			},
			error: function (error){
				console.log('댓글을 불러올 수 없습니다');
			}
		});
	},
	
     drawCommentList : function (o){
      var self = this;
     $("#commentList").empty();
     let html = '';
	 var pageCount = 0;
	 var pageSize = o.comment.pageSize;
     var userName = $("input[name=userName]").val();
	 var contentsUrl = $("#contentsUrl").val(); 	  
     var contentsUrl2 = contentsUrl.replace("data2", "");
	 
         $.each(o.comment.commentList, function (i, item){

             var agent = navigator.userAgent.toLowerCase();
               var frDate = item.updateDatettime;
               if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
                   //ie
                   frDate = frDate.split('.')[0];
               }else{

                   frDate = frDate;
               }

		   var date = new Date(frDate);
		   var year = date.getFullYear();
		   var month = ObjectUtils.pad(date.getMonth()+1,2);
		   var day = ObjectUtils.pad(date.getDate(),2);
		   var hh = ObjectUtils.pad(date.getHours(),2);
		   var mm = ObjectUtils.pad(date.getMinutes(),2);
		   var updateDate = year + '-' + month + '-' + day + ' ' + hh + ':' + mm;
			if(i<pageSize){				 
			   html += '<div class="reply_txt">';
			   html += '<div class="reply_title_set">';
			   html += '<span>'+item.updateId+'</span>';
			   html += '<span>'+updateDate+'</span>';
			   html += '</div>';
			   html += '<div class="reply_contents">';
			   html += '<p>'+item.commentBody+'</p>';
			   html += '</div>';
			   html += '<div class="reply_edit_area">';
			   html += '<div class="delete_input">';
			   html += '<div class="delete_wrap">';
			   html += '<input type="password" class="form-control w180" placeholder="비밀번호를 입력하세요" name="delPassword">';
			   html += '<button class="btn btn-type-blue password_del_btn">삭제</button>';
			   html += '<input class="commentId" style="display:none" value="'+item.commentSeq+'">';
			   html += '<button class="btn btn-type-gray password_cancel_btn">취소</button>';
			   html += '</div>';
			   html += '</div>';
			   if(ObjectUtils.isNotEmpty(item.customYn) && item.customYn == 'N'){
				 html += '<img src="'+contentsUrl2+'data1/resources/pc/images/ico/delete_ico.png" alt="삭제" class="reply_delete_ico"/>';
			   }
			   if(ObjectUtils.isNotEmpty(item.customYn) && (item.customYn == 'Y') && (userName == item.registId)){
				 html += '<img src="'+contentsUrl2+'data1/resources/pc/images/ico/delete_ico.png" alt="삭제" class="reply_delete_ico"/>';
				 html += '<input class="commentId" style="display:none" value="'+item.commentSeq+'">';
			   }
			   
			   html += '</div>';
			   html += '</div>';
			   
			   pageCount = i+1;
			}

       });
		
		var getPage = (page - 1) * 10;
		var commentCount = o.comment.count - pageCount;
		if(pageCount == getPage && getPage < o.comment.count){
			html += '<div class="repl_more replyMoreView">댓글 더보기</div>'; 
		}
		
       
      
       $(".commentCnt").html('댓글('+o.comment.count+')');
       $("#commentList").append(html);
	   
       self.clickDelBtn();
        
    },


    articleListen : function(){

        var url = window.location.href ;
        if(url.indexOf('article') > -1){

             window.artyom = new Artyom();
            if(artyom.speechSupported()){
                artyom.ArtyomVoicesIdentifiers["ko-KR"] = ["Google 한국의", "ko-KR", "ko_KR"];
                artyom.initialize({
                    lang:"ko-KR",
                    debug:false
                }).then(function(){
                }).catch(function(err){
                    console.log(err);
                });
            }else{
                //alert("지원하지 않는 브라우저입니다.");
                /* $("#contents").prop("disabled", "disabled");
                    $("#ttsBtn").hide();
                */

            }

            $("#news_listen").on("click", function(){

                var agent = navigator.userAgent.toLowerCase();
                if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                    alert("익스플로러에서는 제공되지 않는 기능입니다. \n 크롬에서 이용해주세요.");
                }else{

                    var flag = $("#news_listen").hasClass('true') ;
                    var contents = $(".article-txt-contents").text() ;


                    if(flag) {
                        $("#news_listen").removeClass('true');
                        artyom.shutUp();
                    }else{

                        $("#news_listen").addClass('true');

                        artyom.say(contents,{
                            onEnd: function(){
                                $(".speaker-listbox").removeClass('true');
                                artyom.shutUp();
                            }

                        });
                    }

                }
            });


        }
    },
    restCount : function(){

        var url = window.location.pathname ;
		var referrer = document.referrer;
		referrer = referrer.split(".")[1]
        var newsId = url.substring(url.lastIndexOf('/')+1);
		console.log(referrer);
		if(!referrer){
			referrer = 'other';
		}
        var obj = {id : newsId,
				   referrer : referrer
		};
        $.ajax({
            url: "/rest/count",
            type: "POST",
            dataType:"JSON",
            data: obj,
            success: function(data){

            },
            error: function (error){
                console.log(error);
            }
        });


    },
    contentMetro : function(){

        if($(".article-txt-contents .col-12 p").length > 0){
            for(var i= 0 ; $(".article-txt-contents .col-12 p").length; i++){
                if( ($(".article-txt-contents .col-12 p").eq(i).html() != '&nbsp;') && ($(".article-txt-contents .col-12 p").eq(i).attr('class') != 'sub_news_title')
					&& ($(".article-txt-contents .col-12 p").eq(i).parent('blockquote').length < 1)){

                    var metro_ = "[메트로신문] "+$(".article-txt-contents .col-12 p").eq(i).html() ;
                    $(".article-txt-contents .col-12 p").eq(i).html(metro_);
                    break;
                }

            }



        }


    },
	imgIcoAppend : function(){
		var self = this;
		var $imags = $('.left-container .article-txt-contents img');
		$.each($imags, function (i, v) {
			if (v.complete && !v.naturalWidth && !v.naturalHeight) {
				$(v).attr('src', 'http://cdn.news2day.co.kr/data1/resources/pc/images/etc/noImg_blank.png');
				$(v).attr('width', '100%');
			}
			else {
				var imgIcoUrl = "http://cdn.news2day.co.kr/data1/resources/pc/images/ico/img_zoom_ico_03.png";
				var imgTag = "<img src='"+imgIcoUrl+"'class='article_img_zoom' alt='원본이미지보기' title=''>" ;
				$(v).after(imgTag);
			}
		});
		self.imgIcoClick();
	},
	imgIcoClick : function(){
		$(".article_img_zoom").on("click",function(){
			var num = $(".article_img_zoom").index(this);
			$('.left-container .article-txt-contents img').not("img.article_img_zoom").eq(num).trigger('click');
		});



	},
	metroBylineRemove : function(){
		if($(".byline_replace").length > 1){
			if($(".byline_replace").html().indexOf('메트로신문 메트로신문') > -1 ){
				var byline_head = $(".byline_replace").eq(0).html();
				var byline_content = $(".byline_replace").eq(1).html();

				byline_head = byline_head.substring($(".byline_replace").eq(0).html().indexOf('메트로신문 메트로신문')+6);
				byline_content = byline_content.substring($(".byline_replace").eq(1).html().indexOf('메트로신문 메트로신문')+6);

				$(".byline_replace").eq(0).html(byline_head);
				$(".byline_replace").eq(1).html(byline_content);
			}
		}
	}

};


var SEARCH = {
    init : function () {
        var self = this;

        self.startSearch();
        //input을 datepicker로 선언
        $("#to").datepicker({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
            ,changeYear: true //콤보박스에서 년 선택 가능
            ,changeMonth: true //콤보박스에서 월 선택 가능
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            ,minDate: "-10Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+10Y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });

        $("#from").datepicker({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
            ,changeYear: true //콤보박스에서 년 선택 가능
            ,changeMonth: true //콤보박스에서 월 선택 가능
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            ,minDate: "-10Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+10Y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });



        $("#to").on("click", function() {
            $('#to').datepicker('setDate'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        });


        $("#from").on("click", function() {
            $('#from').datepicker('setDate'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        });



    },

    startSearch : function (){

        var searchText = ObjectUtils.getParameterByName('searchText');
        $("#searchText").val(searchText);
        if(!ObjectUtils.isEmpty(searchText)){SEARCH.goSearch();}else{
			var html ="";
			html += "<span>' '</span>";
            html += "<span>검색결과 ( 검색결과가 없습니다)</span>";
			html += "  <ul class='result_guideTxt'>";
            html += "<li>단어의 철자가 정확한지 확인해보세요</li>";
            html += "<li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해보세요</li>";
            html += "</ul>";

			$(".result-txt").html(html);
			$(".search-opt-container").css({"display":"none"});

		}
    },

    goSearch : function (pageNum,sort){

        if (typeof pageNum == "undefined" || pageNum == null || pageNum == "undefined" || pageNum == '' || pageNum < 2) {
            pageNum = 1;
        }
        if(sort=='_score'){
            $("#sort_new").removeClass('active');
            $("#sort_exact").addClass('active');
        }else{
            $("#sort_new").addClass('active');
            $("#sort_exact").removeClass('active');
        }


        if(ObjectUtils.isEmpty($("#searchText").val())){
            alert("검색내용을 입력하세요.");
            return false;
        }else{

            $.ajax({

                url: "/rest/search",
                type: "GET",
                contentType: "application/json",
                dataType:"JSON",
                data: {
                    //searchText : "\"" + $("#searchText").val() + " \"",
					searchText : $("#searchText").val(),
                    searchType : 'all',
                    from : $("#from").val(),
                    to : $("#to").val(),
                    page : pageNum,
                    sort : sort
                },
                success: function(data){
					var html = '<span id="result-search-text"></span> <span id="result-search-count"></span>';



					//$(".search-opt-container").css({"display":"block"});
					//$(".result-txt").children().remove();
					//$(".result-txt").html(html);
                    //$("#result-search-text").html("'"+data.searchText+"'");
                    $("#result-search-count").html("["+ObjectUtils.commaAdd(data.pages.totalElements)+"건]");
                    SEARCH.renderArticle(data);
                    SEARCH.renderPaging(data,sort);

                },
                error: function (error){
                    console.log(error);
                }

            });
        }
    },

    renderArticle : function (data){
        var html = "";
        if (data.list && data.list.length > 0) {
            $.each(data.list,function(idx, obj){

				var agent = navigator.userAgent.toLowerCase();
				var frDate = obj.firstReleaseDate;
				if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
					frDate = frDate.split('.')[0];
				}else{
					frDate = frDate;
				}

                var date = new Date(frDate);
				if (isNaN(date)) {
					date = new Date(frDate.split('.')[0]);
				}

                var year = date.getFullYear();
                var month = ObjectUtils.pad(date.getMonth()+1,2);
                var day = ObjectUtils.pad(date.getDate(),2);
                var hh = ObjectUtils.pad(date.getHours(),2);
                var mm = ObjectUtils.pad(date.getMinutes(),2);
                var ss = ObjectUtils.pad(date.getSeconds(),2);
                var relDate = year+'-'+month+'-'+day;
                var linkUrl = "/article/"+obj.id;
                var subTitle = obj.subTitle ;
                var imgSrc = obj.imgSrc ;
				var writerName = "";
				if(ObjectUtils.isEmpty(obj.writerList)){
					writerName = obj.createdBy;
				}else{
					writerName = obj.writerList[0].WRITER_NAME;
				}

                html +="<li>";
                html +="<a href='"+linkUrl+"'>";
                html +="<dl>";

                if(!ObjectUtils.isEmpty(obj.imgSrc)){
					if(imgSrc.indexOf('/0540/') > -1){
						imgSrc = data.contentsUrl + obj.imgSrc;
					}else if(imgSrc.indexOf('/exposure/') > -1){
						imgSrc = data.contentsUrl + obj.imgSrc;
					}else{
						imgSrc = data.contentsUrl + obj.imgSrc.substring(0,26) + ".cache/128/" + obj.imgSrc.substring(26);
					}

					html +="	<dd class='img'>";
					html +='	<div class="news_photo__ mobile_is img_box" style="width:92px;height:62px;background:url('+imgSrc+') center 30% no-repeat; background-size:cover;" title="'+obj.title+'">';
					html +="	</div>";
					html +="	</dd>";
                }


				html +='	<dt class="title">'+obj.title+'</dt>';
                html +='	<dd class="date">'+relDate+'</dd>';
                html +="</dl>";
                html +="</a>";
                html +="</li>";

            });
        }
        $("#ariticle_list").html(html);
    },

    renderPaging : function (data,sort){
        var html = "";
        var currentPage = data.pages.number+1;
        var size = data.size;
        var totalCount = data.totalElements;
        var lastPage = data.pages.totalPages;
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var pagePerBlock = 10;

        //모바일 시 페이징 처리
        if(ObjectUtils.deviceChk()){
            pagePerBlock = 5 ;
        }
        var pageGroup = Math.ceil(currentPage/pagePerBlock);
        var last = pageGroup * pagePerBlock;
        var start = (pageGroup -1)*pagePerBlock+1;



        html += '<ul class="pagination-list">'
        if(currentPage > 1){
            if(pagePerBlock == 10){
                html += '<li class="arrow-list"> <a href="#" onclick=SEARCH.goSearch(1,\''+sort+'\');><img  src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/first_arrow_active.png" alt="처음으로"></a></li>';
            }

            html += '<li class="arrow-list mr10"> <a href="#" onclick=SEARCH.goSearch('+prePage+',\''+sort+'\');><img src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/prv_arrow_active.png" alt="이전으로"></a></li>';
        }else{
            if(pagePerBlock == 10){
                html += '<li class="arrow-list" style=""> <a href="#"><img src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/first_arrow.png" alt="처음으로"></a></li>';
            }
            html += '<li class="arrow-list mr10" style=""> <a href="#"><img src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/prv_arrow.png" alt="이전으로"></a></li>';
        }
        for(var i=start; i <= last; i++){
            if(i > lastPage) break;
            if(i == currentPage){
                html += '<li><a class="active" href="#">'+i+'</a></li>'
            }else{
                html += '<li><a href="#" onclick=SEARCH.goSearch('+i+',\''+sort+'\');>'+i+'</a></li>'
            }
        }

        if(currentPage < lastPage){
            html += '<li class="arrow-list ml10" style=""> <a href="#" onclick=SEARCH.goSearch('+nextPage+',\''+sort+'\');><img src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/next_arrow_active.png" alt="다음으로"></a></li>';
            if(pagePerBlock == 10){
                html += '<li class="arrow-list" style=""> <a href="#" onclick=SEARCH.goSearch('+lastPage+',\''+sort+'\');><img src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/end_arrow_active.png" alt="끝으로"></a></li>';
            }
        }else{
            html += '<li class="arrow-list ml10"> <a href="#"><img src="//cdn.news2day.co.kr/data1/resources/pc/images/ico/next_arrow.png" alt="다음으로"></a></li>';
            if(pagePerBlock == 10){
                html += '<li class="arrow-list"> <a href="#"><img src="//cdn.news2day.co.kr/data1/resources/mobile/images/icon/end_arrow.png" alt="끝으로"></a></li>';
            }
        }
        html += '</ul>';
        $("#pagination").html(html);
    }

};


var MEMBER = {

    init : function (){
      var self = this;
      console.log("MEMBER");

      var pathName = location.pathname;
      if(pathName.indexOf('member/join') > -1){
          self.joinPage();
      }

      if(pathName.indexOf('member/login') > -1){
        self.saveIdLogin();
      }

      if(ObjectUtils.isNotEmpty($("#hiddenNumber").val())){
        self.numberSetting();
      }

      self.eventBind();

    },
    joinPage : function (){
		var chkStatus = $("#chkStatus").val();
		if(chkStatus == "FAIL"){
			alert("회원가입동의후 가입이 가능합니다.");
			location.href="/member/agree";
		}

        var name = ObjectUtils.getParameterByName('name');
        var email = ObjectUtils.getParameterByName('email');

        $("input[name='memberName']").val(name);
        $("input[name='memberEmail']").val(email);
    },

    numberSetting : function () {
      var str = $("#hiddenNumber").val().split('-');
      $(".selPhone").val(str[0]).prop("selected", true);
      $("#numberOne").val(str[1]);
      $("#numberTwo").val(str[2]);
    },

    saveIdLogin : function () {
      var self = this;
        var userInputId = self.getCookieLogin("userInputId");//저장된 쿠기값 가져오기
        $("input[name='j_username']").val(userInputId);

        if($("input[name='j_username']").val() != ""){
            $("#idSaveCheck").attr("checked", true);
          }
    },

    setCookieLogin : function(cookieName, value, exdays){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
        document.cookie = cookieName + "=" + cookieValue;
    },

    deleteCookieLogin : function(cookieName){
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() - 1);
      document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
    },

    getCookieLogin : function(cookieName) {
      cookieName = cookieName + '=';
      var cookieData = document.cookie;
      var start = cookieData.indexOf(cookieName);
      var cookieValue = '';
      if(start != -1){
          start += cookieName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cookieValue = cookieData.substring(start, end);
      }
      return unescape(cookieValue);
  },

    eventBind : function () {
      var self = this;
            $("#idSaveCheck").on("change",function(){ // 체크박스에 변화가 발생시
                    if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
                        var userInputId = $("input[name='j_username']").val();
                        self.setCookieLogin("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
                    }else{ // ID 저장하기 체크 해제 시,
                        self.deleteCookieLogin("userInputId");
                    }
                });

              $("input[name='j_username']").on("keyup",function(){ // ID 입력 칸에 ID를 입력할 때,
                  if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
                    var userInputId = $("input[name='j_username']").val();
                    self.setCookieLogin("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
              }
          });
    /*
        // address 찾기
        $("#address_find").on("click", function(){

            new daum.Postcode({
                oncomplete: function(data) {

                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = ''; // 참고항목 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if(data.userSelectedType === 'R'){
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if(data.buildingName !== '' && data.apartment === 'Y'){
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if(extraAddr !== ''){
                            extraAddr = ' (' + extraAddr + ')';
                        }
                        // 조합된 참고항목을 해당 필드에 넣는다.
                        //  document.getElementById("sample6_extraAddress").value = extraAddr;

                    } else {
                        // document.getElementById("sample6_extraAddress").value = '';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('memberZipcode').value = data.zonecode;
                    document.getElementById("memberAddress").value = addr + extraAddr ;


                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("memberAddressDetail").focus();
                }
            }).open();

        });

        */


        // id찾기
        $("#btn_findId").on("click", function(){

            if(ObjectUtils.isEmpty($("#id_prime_name").val()) || ObjectUtils.isEmpty($("#id_prime_email").val()) ){
                alert("아이디 또는 이메일을 입력하세요");
                return false;
            }else{

                //email validation
                var email = $("#id_prime_email").val();
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }else{
                    $.ajax({

                        url: "/rest/findId",
                        type: "GET",
                        contentType: "application/json",
                        dataType:"JSON",
                        data: {
                            memberName : $("#id_prime_name").val(),
                            memberEmail :$("#id_prime_email").val()
                        },
                        success: function(data){

                            if(data.message == "SUCCESS"){
                                alert("회원님의 ID는 "+data.id+" 입니다.");
                            }else{
                                alert("일치하는 회원 정보가 없습니다.");
                            }
                        },
                        error: function (error){
                            console.log(error);
                        }

                    });

                }
            }
        });

        // pw 찾기
        $("#btn_findPw").on("click", function(){
            if(ObjectUtils.isEmpty($("#pw_prime_id").val()) || ObjectUtils.isEmpty($("#pw_prime_name").val()) || ObjectUtils.isEmpty($("#pw_prime_email").val()) ){
                alert("회원 정보를 입력하세요.");
                return false;
            }else{
                //email validation
                var email = $("#pw_prime_email").val();
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }else{

                    var obj = {
                        memberId : $("#pw_prime_id").val(),
                        memberName : $("#pw_prime_name").val(),
                        memberEmail :$("#pw_prime_email").val()
                    };

                    $.ajax({

                        url: "/rest/findPassword",
                        type: "POST",
                        contentType: "application/json",
                        dataType:"JSON",
                        data: JSON.stringify(obj),
                        beforeSend:function(){
                            var html = "<div id='notify' style='margin-top:1px;'><span style='color:red; font-weight:bold;'>잠시만 기다려주세요.</span></div>";
                            $("#btn_findPw").before(html);
                        },
                        success: function(data){

                            $('#notify').remove();
                            if(data.message == "SUCCESS"){
                                alert("입력하신 이메일로 임시 비밀번호를 발송하였습니다.");
                            }else{
                                alert("일치하는 회원 정보가 없습니다.");
                            }

                        },
                        error: function (error){
                            console.log(error);
                        }

                    });
                }
            }

        });

        //회원가입 동의 페이지
        $("#user-create-apply").on("click", function(){

            var chk = document.getElementById("info-create-apply").checked;
            var name = $("#name").val();
            var email = $("#email").val();

            if(!chk){
                alert("약관에 동의 하시기 바랍니다.");
                $('#info-create-apply').focus();
                return false;
            }

            if(ObjectUtils.isEmpty(name)){
                alert("이름을 입력하세요.");
                $('#name').focus();
                return false;
            }

            if(ObjectUtils.isEmpty(email)){
                alert("이메일을 입력하세요.");
                $('#email').focus();
                return false;
            }else{
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }
            }

			var url = "/member/join?name="+name+"&email="+email;
			var form = document.createElement("form");
			form.setAttribute("action", url);
			form.setAttribute("method", "post");
			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "name");
			field.setAttribute("value", name);
			form.appendChild(field);

			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "email");
			field.setAttribute("value", email);
			form.appendChild(field);

			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "chk");
			field.setAttribute("value", chk);
			form.appendChild(field);

			document.body.appendChild(form);
			form.submit();

        });



        //회원정보 변경
        $("#memberUpdate").on("click", function(){
            var obj = {};


            // Password Checked(자릿수)
            if ($('#passwd1').val().length < 4){
                alert("사용 규칙 안내:\n\n패스워드는 최소 4자리 이상  입력하세요.");   return false;
            }

            // Password Checked(입력형식)
            if ($('#passwd1').val().match(/(#|--|=|\')/) ){
                alert("패스워드 사용 규칙 안내:\n\n패스워드에 [#,--,=,']은 포함시킬수 없습니다.");   return false;
            }

            // Password Checked(비교)
            if ($('#passwd1').val() != $('#passwd2').val()){
                alert("패스워드 사용 규칙 안내:\n\n재입력 패스워드가 일치하지 않습니다. 다시 입력하세요.");   return false;
            }

            /*
            // NickName Checked
            if ($('#uniq_nicname').val() == "" || $('#uniq_nicname').val() != $("input[name='memberNickname']").val()){

                alert("사용 규칙 안내:\n\n닉네임 중복 검사를 먼저 하십시오.");   return false;
            }
            */

            // Email Checked
            if ($('#memberEmail').val() == "" || $('#memberEmail').val().match(/(@)/) == null){
                alert("사용하고 계시는 이메일 주소를 정확히 입력해 주십시오.");   return false;

            }
            //phoneNumber
            var phoneNumber = $(".phoneNumber");
            if(phoneNumber.length > 1){
                if(ObjectUtils.isEmpty($(".phoneNumber").eq(0).val()) || ObjectUtils.isEmpty($(".phoneNumber").eq(1).val())){
                    alert("휴대전화 번호를 입력하세요.");
                    return false;
                }else{
                    obj["memberNumber"] = $(".selPhone option:selected").val()+"-"+phoneNumber[0].value +"-"+ phoneNumber[1].value;
                }



            }


            var chk = document.getElementById("promotion_chk").checked;
            /*
            if(!chk){
                alert("약관에 동의 해주시기 바랍니다.");
                $('#promotion_chk').focus();
                return false;
            }
            */



            var arr = $("#form_memberUpdate").serializeArray();

            if(arr){
                obj = {};
                jQuery.each(arr, function() {

                    obj[this.name] = this.value;
                });
            }

            obj["receiveEmailYn"] = (chk? "Y":"N");
            obj["memberNumber"] = $(".selPhone option:selected").val()+"-"+phoneNumber[0].value +"-"+ phoneNumber[1].value;
            obj["memberEmail"] = $("#memberEmail").val();


            $.ajax({

                url: "/rest/updateUser",
                type: "POST",
                contentType: "application/json",
                dataType:"JSON",
                data: JSON.stringify(obj),
                success: function(data){

                    if(data.message == "SUCCESS"){
                        alert("회원정보가 변경 되었습니다. 다시 로그인해주세요.");
                        SRV.goPage('/j_spring_security_logout', '_self');
                        //location.href= "/member/login";
                    }else{
                        alert("다시 시도해주세요.");
                    }
                    //pw inputbox reset
                    $(".memberPassword").val('');
                },
                error: function (error){
                    console.log(error);
                }
            });

        });


        //idChk
        $(".idChk").on("click", function(){


            var memberId = $("input[name='memberId']").val();
            if(!(ObjectUtils.isEmpty(memberId))){


                var obj = {"memberId" : memberId};

                if (memberId.length < 4 || memberId.length > 10){
                    alert("사용 규칙 안내:\n\n회원 아이디란에 4자리 이상, 10자리 미만으로 입력해 주십시오.");
                    $("input[name='memberId']").focus();
                    return false;
                }

                if(!memberId.match(/^[a-zA-Z0-9]+$/)){
                    alert("사용 규칙 안내:\n\n영문자, 숫자 외에 다른 문자가 포함되었습니다.\n영문자, 숫자만 입력이 가능합니다.");
                    $("input[name='memberId']").focus();
                    return false;
                }


                $.ajax({

                    url: "/rest/idChk",
                    type: "POST",
                    contentType: "application/json",
                    dataType:"JSON",
                    data: JSON.stringify(obj),
                    success: function(data){

                        if(data == 0){

                            $("#notify_id").html("<font color='#0073AA'>사용가능하신 아이디입니다.</font>");
                            $("#uniq_id").val(memberId);

                        }else{

                            $("#notify_id").html("<font color='#B73535'>이미 사용중입니다 다시 입력하세요.</font>");
                            $("input[name='memberId']").val('');

                        }

                    },
                    error: function (error){
                        console.log(error);
                    }
                });

            }else{
                alert("아이디를 입력해주세요.");
                $("input[name='memberId']").focus();
                return false;
            }


        });

        //nickChk
        /*
        $("#nickChK").on("click", function(){



            var memberNickname = $("input[name='memberNickname']").val();
            var obj = {"memberNickname" : memberNickname};


            if(memberNickname == $("#uniq_nicname").val() ){
                $("#notify_nick").html("<font color='#0073AA'>기존 닉네임 사용 가능합니다.</font>");
                if(window.location.href.indexOf('sign') > -1){
                    $("#uniq_nicname").val(memberNickname);
                }

                return false;
            }


            if (memberNickname.length < 3 || memberNickname.length > 10){
                alert("사용 규칙 안내:\n\n회원 닉네임란에 3자리 이상, 10자리 미만으로 입력해 주십시오.");
                $("input[name='memberNickname']").focus();
                return false;
            }

            if (!memberNickname.match(/^[가-힣a-zA-Z0-9_-]+$/)){
                alert("사용 규칙 안내:\n\n한글, 영문자, 숫자, _, - 외에 다른 문자가 포함되었습니다.\n한글, 영문자, 숫자, _, - 만 입력이 가능합니다.");
                $("input[name='memberNickname']").focus();
                return false;
            }


            $.ajax({

                url: "/rest/nickChk",
                type: "POST",
                contentType: "application/json",
                dataType:"JSON",
                data: JSON.stringify(obj),
                success: function(data){

                    if(data == 0){
                        $("#notify_nick").html("<font color='#0073AA'>사용가능하신 닉네임입니다.</font>");
                        $("#uniq_nicname").val(memberNickname);

                    }else{

                        $("#notify_nick").html("<font color='#B73535'>이미 사용중입니다 다시 입력하세요.</font>");
                        $("input[name='memberNickname']").val('');
                    }


                },
                error: function (error){
                    console.log(error);
                }
            });




        });
        */

        //회원가입
        $("#memberSign").on("click", function(){
             var obj = {};
            // Id Checked
            if ($('#uniq_id').val() == "" || $('#uniq_id').val() != $("input[name='memberId']").val()){
                alert("사용 규칙 안내:\n\n회원아이디 중복 검사를 먼저 하십시오.");   return false;
            }


            // Password Checked(자릿수)
            if ($('#passwd1').val().length < 4){
                alert("사용 규칙 안내:\n\n패스워드는 최소 4자리 이상  입력하세요.");   return false;
            }

            // Password Checked(입력형식)
            if ($('#passwd1').val().match(/(#|--|=|\')/) ){
                alert("패스워드 사용 규칙 안내:\n\n패스워드에 [#,--,=,']은 포함시킬수 없습니다.");   return false;
            }

            // Password Checked(비교)
            if ($('#passwd1').val() != $('#passwd2').val()){
                alert("패스워드 사용 규칙 안내:\n\n재입력 패스워드가 일치하지 않습니다. 다시 입력하세요.");   return false;
            }

            // NickName Checked
            /*
            if ($('#uniq_nicname').val() == "" || $('#uniq_nicname').val() != $("input[name='memberNickname']").val()){
                alert("사용 규칙 안내:\n\n닉네임 중복 검사를 먼저 하십시오.");   return false;
            }
            */

            if(ObjectUtils.isEmpty($("input[name='memberName']").val())){
                $("input[name='memberName']").focus();
                alert("회원 이름을 입력하세요.");   return false;

            }

            // Email Checked
            if ($('#memberEmail').val() == "" || $('#memberEmail').val().match(/(@)/) == null){
                alert("사용하고 계시는 이메일 주소를 정확히 입력해 주십시오.");   return false;

            }

            //phoneNumber
            var phoneNumber = $(".phoneNumber");
            if(phoneNumber.length > 1){
                if(ObjectUtils.isEmpty($(".phoneNumber").eq(0).val()) || ObjectUtils.isEmpty($(".phoneNumber").eq(1).val())){
                    alert("휴대전화 번호를 입력하세요.");
                    return false;
                }



            }



            var chk = document.getElementById("promotion_chk").checked;
            /*
            if(!chk){
                alert("약관에 동의 해주시기 바랍니다.");
                $('#promotion_chk').focus();
                return false;
            }
            */


            var arr = $("#form_memberSign").serializeArray();

            if(arr){
                obj = {};

                jQuery.each(arr, function(index,item) {
                  obj[this.name] = this.value;
                });
            }
            obj["receiveEmailYn"] = (chk? "Y":"N");
            obj["memberNumber"] = $(".selPhone option:selected").val()+"-"+phoneNumber[0].value +"-"+ phoneNumber[1].value;


            $.ajax({

                url: "/rest/createUser",
                type: "POST",
                contentType: "application/json",
                dataType:"JSON",
                data: JSON.stringify(obj),
                success: function(data){

                    if(data.message == "SUCCESS"){
                        alert("회원가입이 완료 되었습니다.");
                        location.href ="/member/login";
                    }else{
                        alert("다시 시도해주세요.");
                        location.href ="/signup";
                    }

                },
                error: function (error){
                    console.log(error);
                }
            });
        });


        //회원탈퇴
        $("#memberLeave").on("click", function(){

            var flag = confirm("정말 탈퇴하시겠습니까?");
            if(flag){

                var obj ={};

                $.ajax({

                    url: "/rest/deleteUser",
                    type: "PUT",
                    contentType: "application/json",
                    dataType:"JSON",
                    data:JSON.stringify(obj),
                    success: function(data){

                        if(data == 1 ){
                            alert("회원탈퇴가 완료되었습니다.");
                            location.href="/" ;
                        }else{
                            alert("다시 시도해주세요.");
                        }
                    },
                    error: function (error){
                        console.log(error);
                    }
                });

            }

        });

    }


};


var EVENT = {
  init : function(){
    var self = this ;
    self.eventBind();
  },
  eventBind : function(){
    var self = this ;
    $(".forum-tab-container ul li").click(function(){
        $(".forum-tab-container ul li").removeClass('active');
        $(this).addClass('active');
        var tabId = $(this).data('tab');
        $("div[id^=tab]").css({"display":"none"});
        $("#"+tabId).css({"display":"block"});

    });

    $("#relSelect").on("change",function(){
        var seq = Number($("#relSelect :selected").val());
        //관련지난칼럼 제외
        if(seq > 0 ){
            SRV.goPage("/eventDetail?seq="+seq,'_self');
        }

    });

    $("#event_regist").click(function(){
          var seq = ObjectUtils.getParameterByName('seq');
          console.log("seq :::"+  seq);
          if((ObjectUtils.isEmpty(seq))){
              alert("잘못된 접근입니다.");
              return false;
          }else{
              $("input[name='seq']").val(seq);
              console.log($("input[name='seq']").val());
          }
          var depart = $("input[name='txt_depart']").val();
          var position = $("input[name='txt_position']").val();
          var name = $("input[name='txt_name']").val();
          var phone = $("input[name='txt_phone']").val();
          var email = $("input[name='txt_email']").val();

          if((ObjectUtils.isEmpty(depart))){
              alert("회사(학교)명 을 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(position))){
              alert("직책을 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(name))){
              alert("직책을 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(phone))){
              alert("연락처를 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(email))){
              alert("이메일을 입력하세요.");
              return false;
          }else{
              var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }
          }




          var obj = {};
          var arr = $("#event_member_regist").serializeArray();
          console.log(obj);
            if(arr){
                obj = {};
                jQuery.each(arr, function(index,item) {
                    obj[this.name] = this.value;
                });
            }
          $.ajax({
                    url: "/rest/eventRegist",
                    type: "POST",
                    contentType: "application/json",
                    dataType:"JSON",
                    data: JSON.stringify(obj),
                    success: function(data){
                        console.log(data);
                        if(data.message == 'SUCCESS' ){
                            alert("사전등록 되었습니다.");
                            //location.href="/" ;
                        }else{
                            alert("다시 시도해주세요.");
                            location.href="/" ;
                        }
                    },
                    error: function (error){
                        console.log(error);
                    }
                });
    });


  }
};

var PHOTO = {

    init: function () {
        var self = this;
        self.active();
        self.eventBind();

    },
    active : function(){

      var self = this ;
      var type = ObjectUtils.getParameterByName('type');

      $(".photo-tab-container .photo_tab").removeClass('active');
      if(ObjectUtils.isEmpty(type)){
            $(".photo-tab-container .all").addClass('active');
      }else{
          $(".photo-tab-container ."+type).addClass('active');
      }

    },
    eventBind : function(){
        // pho
        var self = this;
        var type = ObjectUtils.getParameterByName('type');

        var page = 2;
        $("#more_photo").click(function(){
            $.ajax({
                    url: "/rest/photo",
                    type: "GET",
                    contentType: "application/json",
                    dataType:"JSON",
                    data:{
                        "type" : type,
                        "page" : page,
                        "size":"20"
                     },
                    success: function(data){
                        var row = 0 ;
                        console.log(data);
                        page++;


                        if(data.length > 0 ){
                            var html ="";
                            for(var i=0; i < data.length; i++ ){
                                if(((i%4) == 0)){
                                    html += "<div class='row mb25'>" ;
                                }
                                html +="<div class='col-lg-3 col-6'>" ;
                                html +=  "<a href='/article/"+data[i].id+"'>";
                                html +=    "<div class='photo_news_imgBox'>" ;
                                if(!ObjectUtils.isEmpty(data[i].imgSrc)){
                                    html +=      "<img src='"+data[i].contentsUrl+data[i].imgSrc+"' alt='포토뉴스 이미지'>" ;
                                }
                                    html +=          "<div class='photonews_title_bar'>";
                                if(!ObjectUtils.isEmpty(data[i].viewTitle)){
                                    html +=             "<p>"+data[i].viewTitle+"</p>";
                                }else{
                                    html +=             "<p>"+data[i].title+"</p>";
                                }

                                html +=            "</div>";
                                html +=     "</div>";
                                html +=  "</a>";
                                html +="</div>";
                                if( (i == (data.length-1)) || i ==((row * 4)+3) ){
                                        row++;
                                        console.log("row ::"+ row);
                                        html +="</div>";
                                }
                            }
                            if(!(ObjectUtils.isEmpty(html))){
                                $("#photoList_area").append(html);
                            }

                        }else{
                            alert("더 이상 기사가 없습니다.");
                        }

                    },
                    error: function (error){
                        console.log(error);
                    }
          });
        });
    }



};




var servicePopup = {

     /*코드성 데이터 */
    limitEnum: {
        D : {name: "하루동안"},
        W : {name: "일주일동안"},
        N : {name: "다시"}
    },

    init: function () {
        var self = this;

        var pageSeq = $('body').data("pageSeq");
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        var today = year + "-" + month + "-" + day;


        self.selectLimitPopupList(today, pageSeq,self);

    },


    popupClose : function (name, cookieValue, day) {
        var self = this;

        self.setCookie(name, cookieValue, day);

    },

    layerPopupClose : function (id) {
        $('#'+id).attr("style", "display:none;");

    },

    setCookie : function (name,value,day) { // 쿠키이름, 쿠키값, 쿠키삭제되는 날짜 (쿠키가 없으면 팝업
        // 보여주고, 있으면 안보여주고) value가 false일때도 안보여줌

      /*  var today = new Date();
        today.setDate(today.getDate() + day);
        var expireDate = today.toGMTString();

var aa = name+'='+escape(value)+';expires=' + expireDate + ';';
console.log(aa);
        document.cookie=name+'='+escape(value)+';expires=' + expireDate + ';'; */
        var date = new Date();
        date.setTime(date.getTime() + (day*24*60*60*1000));
        document.cookie=escape(name)+'='+escape(value)+';expires=' + date.toUTCString() + ';';
    },

    getCookie : function (name) {

        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        var result =  value? value[2] : null;

        return result;

    },

    deleteCookie : function (name) {

        var date = new Date();
        date.setDate(date.getDate() -1);
        var expiresDate = date.toUTCString();

        document.cookie=name+'=true; expires='+expiresDate+';';

    },


    selectLimitPopupList : function (today, pageSeq,self) {

        var self = this;
        var searchData = {
            nowDate : today,
            pageSeq : pageSeq
        };

        $.ajax({
            type : "GET",
            data : searchData,
            url : "/rest/popup",
            success: function (data) {
                console.log(data);
                self.popupOpen(data);
            }
        });
    },

    popupOpen : function (data) {

        var self = this;


        $.each(data, function (i, item) {
            var target ='';

            var expireDate = 0;
            var setValue = true;
            var cookieName = 'cookieName'+item.popupSeq;
            var cookieStatus = servicePopup.getCookie(cookieName);

            (item.popupLinkOption == 'N'? target = '_blank':'');

            if(item.popupLimitSetting == 'N'){
                setValue = false;
                expireDate = 10000;
            }else if(item.popupLimitSetting == 'W'){
                expireDate = 7;
            }else if(item.popupLimitSetting == 'D'){
                expireDate = 1;
            }

            if(ObjectUtils.isNotEmpty(cookieStatus)){
                if(cookieStatus == 'false'){
                    //다시보지않는 팝업
                }
            }else{
            	var winWidth = document.body.clientWidth;	// 현재창의 너비

                // 팝업 위치지정
                var popupX = (window.screen.width / 2) - (200 / 2);
                var popupY = (window.screen.height / 2) - 300;

                /*
                var containerEl = $(".contents01");
                var containerX = containerEl.offset().left;
                var containerY = containerEl.offset().top;

                var topNewsContainerEl = $(".hd_container");
                var topNewsContainerX = topNewsContainerEl.offset().left;
                var topNewsContainerY = topNewsContainerEl.offset().top;


                if(item.popupLocation == 'L'){     // 왼쪽
                    if(winWidth >= 768){
                        popupX = 0 + containerX - item.popupWidth - 5;
                    }else{
                        popupX = topNewsContainerX;
                        popupY = topNewsContainerY + 60;
                    }
                }else if(item.popupLocation == 'R'){// 오른쪽
                    popupX=winWidth - (item.popupWidth+20);
                }
                */
                if(item.popupLocation == 'L'){     // 왼쪽
                    popupX=0;
                }else if(item.popupLocation == 'R'){// 오른쪽
                    popupX=winWidth;
                }
                // 2020.03.16 myahn
                // 팝업 타입 추가(레이어 팝업:L, 윈도우팝업:W)
                if(item.popupType == "L") {

                	var layerId = "layerPopup_" + item.popupSeq;
                    var layerDiv = document.createElement("div");
                    var layerInnerHTML = "";

                    document.body.appendChild(layerDiv);

                    layerDiv.id = layerId;
                    layerDiv.setAttribute("class","modal-content");
                    layerDiv.style.position = "absolute";
                    layerDiv.style.display = "none";
                    //layerDiv.style.top = popupY;
					layerDiv.style.top = '16%';
					layerDiv.style.left = '50%';
					layerDiv.style.width = '80%';
					layerDiv.style.transform = 'translate(-50%, 0)';
                    layerDiv.style.height = "auto";
                    layerDiv.style.backgroundColor = "#fff";
                    layerDiv.style.zIndex = 1000;

                    /* 2020.03.20 myahn
                     * 헤더 부분 삭제
                    layerInnerHTML += ' <div class="modal-header pop_header_style">';
                    layerInnerHTML += ' 	<h5 class="modal-title bol" id="exampleModalScrollableTitle">' + item.popupName + '</h5>';
                    layerInnerHTML += ' 	<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="servicePopup.layerPopupClose(\''+layerId+'\');">';
                    layerInnerHTML += '     	<span aria-hidden="true">×</span>';
                    layerInnerHTML += ' 	</button>';
                    layerInnerHTML += ' </div>';
                    */

                    layerInnerHTML += '	<div class="modal-body" style="padding:0px;">';
                    layerInnerHTML += '		<div class="pop-container">';

                    if(item.popupKinds == 'I') {

                        layerInnerHTML += '			<div class="pop-ad-container" style="padding:10px;">';
                        if(ObjectUtils.isNotEmpty(item.popupLinkUrl)){
                        	layerInnerHTML += '			<a href="'+item.popupLinkUrl+'" target="'+target+'"><img src="http:'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'"></a>';
                        }else{
                        	layerInnerHTML += '			<img src="http:'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'">';
                        }
                        layerInnerHTML += '			</div>';
                    }
                    else {
                        layerInnerHTML += '			<div class="pop-ad-container" style="padding:10px;height:' + (item.popupHeight-100) + ';">';
                    	layerInnerHTML +=          		item.popupBody;
                        layerInnerHTML += '			</div>';
                    }
                    layerInnerHTML += '			<div class="ad-under-opt" style="height:35px;border-top:1px #d7d7d7 solid;">';
                    layerInnerHTML += '				<div class="form-check-inline pl15" style="margin-top:5px;margin-botton:5px;">';
                    layerInnerHTML += '					<input onclick="servicePopup.popupClose(\''+cookieName+'\',\''+setValue+'\',\''+expireDate+'\'); servicePopup.layerPopupClose(\''+layerId+'\');" name="'+item.popupSeq+'popup_limit_value"  type="checkbox" class="form-check-input">';
                    layerInnerHTML += '         		<label type="checkbox"class="form-check-label">'+self.limitEnum[item.popupLimitSetting].name+' 보지 않기</label>';
                    layerInnerHTML += '     		</div>';
                    layerInnerHTML += '     		<button type="button" class="btn btn-info" onclick="servicePopup.layerPopupClose(\'' + layerId + '\');">닫기</button>';
                    layerInnerHTML += '			</div>';
                    layerInnerHTML += '		</div>';
                    layerInnerHTML += '	</div>';

                    layerDiv.innerHTML = layerInnerHTML;
                    layerDiv.style.display  = "block";

                    $('#'+layerId).draggable({'cancel':'.ad-under-opt'});
                }
                else {
                    var option = "width="+ (item.popupWidth) + ", height="+ (item.popupHeight+60) + ", left="+ popupX + ",  top="+ popupY + "";
                	var w = window.open("", "popupName"+item.popupSeq, option);
                    var $h = $(w.document.head);
                    var $w = $(w.document.body);
                    let windowPopup = "";
                    let windowHead = "";

                	windowHead += '<meta charset="utf-8">';
                    windowHead += '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">';

                    if(item.popupKinds == 'I'){

                        windowPopup += '<div class="pop-container">';
                        windowPopup += '    <div class="pop-ad-container">';

                        if(ObjectUtils.isNotEmpty(item.popupLinkUrl)){
                          windowPopup += '        <a href="'+item.popupLinkUrl+'" target="'+target+'"><img src="http://'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'"></a>';
                        }else{
                          windowPopup += '            <img src="http:'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'">';
                        }

                        windowPopup += '    </div>';
                        windowPopup += '    <div class="ad-under-opt">';
                        windowPopup += '        <div class="form-check-inline pl15" style="margin-top:20px;">';
                        windowPopup += '            <input onclick="opener.servicePopup.popupClose(\''+cookieName+'\',\''+setValue+'\',\''+expireDate+'\'); window.close();" id="values" name="'+item.popupSeq+'popup_limit_value" type="checkbox" class="form-check-input">';
                        windowPopup += '            <label type="checkbox"class="form-check-label">'+self.limitEnum[item.popupLimitSetting].name+' 보지 않기</label>';
                        windowPopup += '        </div>';
                        windowPopup += '    </div>';
                        windowPopup += '</div>';

                    }else{
                        windowPopup += '<div class="pop-container">';
                        windowPopup += '    <div class="pop-ad-container">';
                        windowPopup +=          item.popupBody;
                        windowPopup += '    </div>';
                        windowPopup += '    <div class="ad-under-opt">';
                        windowPopup += '        <div class="form-check-inline pl15" style="margin-top:20px;">';
                        windowPopup += '             <input onclick="opener.servicePopup.popupClose(\''+cookieName+'\',\''+setValue+'\',\''+expireDate+'\'); window.close();" name="'+item.popupSeq+'popup_limit_value"  type="checkbox" class="form-check-input">';
                        windowPopup += '             <label type="checkbox"class="form-check-label">'+self.limitEnum[item.popupLimitSetting].name+' 보지 않기</label>';
                        windowPopup += '        </div>';
                        windowPopup += '     </div>';
                        windowPopup += '</div>';
                    }

                    $h.html(windowHead);
                    $w.html(windowPopup);
                }
            }
        });

    },
};




//고객센터
var COMPANY = {
    init : function () {
        var self = this;
        self.menuActive();
    },
    //메뉴 ACTIVE
    menuActive : function () {
        var self = this;
        var pathName = location.pathname;
        var arr = /^\/company\/(.*?)$/.exec(pathName);
        $(".li_" + arr[1]).addClass("active");
    }
};

var ObjectUtils = {
    // 값의 유무 체크
    isEmpty : function(val) {
        var self = this;
        if (val === undefined) return true;
        if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
            return false;
        if (typeof (val) == 'object') {
            var flag = true;
            for (var f in val) {
                flag = false;
            }
            return flag;
        }
        if (null == val || null === val || "" == val || val == undefined || typeof(val) == undefined || "undefined" == val || "NaN" == val || "null" == val) {
            return true;
        } else {
            return false;
        }
    },

    // 값의 유무 체크
    isNotEmpty: function (val) {
        var self = this;
        return !this.isEmpty(val);
    },

    //숫자 인지 체크
    isNumeric : function(val) {
        var self = this;
        if (!/^[0-9]+$/.test(val)) {
            return false;
        } else {
            return true;
        }
    },

    //숫자가 포함 되어 있는지 체크
    isContainNumber : function(val) {
        var self = this;
        if(/[0-9]/.test(val)){
            return true;
        } else {
            return false;
        }
    },

    // URL or IP 형식 체크
    isDomain : function (val) {
        //TODO 체크 형식 나중에 풀어랏
        // var self = this;
        // if (/^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/.test(val)) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    },

    //////////////////////// CONVERTER ///////////////////////

    //날짜를 문자로 변환
    dateToStr : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            console.error("date 값이 없습니다.");
            return "";
        }
        return moment.utc(date).format(config.datetimeFormat);
    },

    //날짜를 문자로 변환 (YYYY-MM-DD)
    dateToStrFormat : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            //console.error("date 값이 없습니다.");
            return "";
        }
        return moment.utc(date).format(config.dateFormat);
    },

    htmlEscape : function (str) {
        var self = this;
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        if (self.isEmpty(str)) {
            return str;
        }
        return String(str).replace(/[&<>"'`=\/]/g,
            function (s) { return entityMap[s]; });
    },

    //해당 문자열 모두 치환
    replaceAll : function (content, before, after) {
        return content.split(before).join(after);
    },
    //자리수 pad 0
    pad : function (n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },

    getParameterByName : function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    deviceChk : function (){
        var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
        for (var info in mobileKeyWords) {
            if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
                return true;

            }
        }
        return false;

    }

};

//리스트 페이지
var LIST = {
  menuEnum : {
	     16 : {ONE:0,SA : 'JOB'} , 24 : {ONE:0,SA : '취준생' , PA : 'JOB'} , 25 : {ONE:0,SA : '직장인' , PA : 'JOB'} , 26 : {ONE:0,SA : '창직·창업' , PA : 'JOB'} , 27 : {ONE:0,SA : '미래일자리' , PA : 'JOB'} , 28 : {SA : '일자리정책' , PA : 'JOB'}
	  ,   240 : {ONE:1,SA : 'ESG'} , 241 : {ONE:1,SA : '환경' , PA : 'ESG'} , 242 : {ONE:1,SA : '사회' , PA : 'ESG'} , 243 : {ONE:1,SA : '지배구조' , PA : 'ESG'} , 244 : {ONE:1,SA : '종합' , PA : 'ESG'}		 
     , 17 : {ONE:2,SA : '금융·증권'} , 29 : {ONE:2,SA : '경제정책' , PA : '금융·증권'} , 30 : {ONE:2,SA : '금융/증권' , PA : '금융·증권'} , 31 : {ONE:2,SA : '글로벌경제' , PA : '금융·증권'} , 32 : {ONE:2,SA : '거꾸로 읽는 경제' , PA : '금융·증권'} , 33 : {ONE:2,SA : '기획' , PA : '금융·증권'} , 34 : {ONE:2,SA : '종합' , PA : '금융·증권'}
     , 18 : {ONE:3,SA : '비즈'} , 35 : {ONE:3,SA : '산업' , PA : '비즈'} , 36 : {ONE:3,SA : '재계' , PA : '비즈'} , 38 : {ONE:3,SA : 'IT/게임' , PA : '비즈'} , 39 : {ONE:3,SA : '부동산' , PA : '비즈'} , 40 : {ONE:3,SA : '기획' , PA : '비즈'} , 41 : {ONE:3,SA : '종합' , PA : '비즈'}
     , 262 : {ONE:4,SA : '과학/IT'} , 254 : {ONE:4,SA : 'IT' , PA : '과학/IT'} , 255 : {ONE:4,SA : '게임' , PA : '과학/IT'} , 256 : {ONE:4,SA : '모바일' , PA : '과학/IT'} , 257 : {ONE:4,SA : '통신,미디어' , PA : '과학/IT'} , 258 : {ONE:4,SA : '보안' , PA : '과학/IT'} , 259 : {ONE:4,SA : '컴퓨터' , PA : '과학/IT'} , 260 : {ONE:4,SA : '과학일반' , PA : '과학/IT'}	 
	   , 42 : {ONE:5,SA : '생활경제'} , 43 : {ONE:5,SA : '헬스.과학' , PA : '생활경제'} , 44 : {ONE:5,SA : '패션.뷰티' , PA : '생활경제'} , 45 : {ONE:5,SA : '여행.레져' , PA : '생활경제'} , 46 : {ONE:5,SA : '음식.요리' , PA : '생활경제'} , 37 : {ONE:3,SA : '식음료/유통' , PA : '생활경제'} , 47 : {ONE:5,SA : '기획' , PA : '생활경제'} , 48 : {ONE:5,SA : '종합' , PA : '생활경제'}
	   , 261 : {ONE:6,SA : '정치'} , 249 : {ONE:6,SA : '대통령실' , PA : '정치'} , 250 : {ONE:6,SA : '국회,정당' , PA : '정치'} , 251 : {ONE:6,SA : '북한' , PA : '정치'} , 263 : {ONE:6,SA : '행정' , PA : '정치'} , 252 : {ONE:6,SA : '국방,외교' , PA : '정치'} , 253 : {ONE:6,SA : '정치일반' , PA : '정치'}	   
     , 19 : {ONE:7,SA : '스페셜기획'} , 49 : {ONE:7,SA : '국내 직장분석' , PA : '스페셜기획'} , 76 : {ONE:7,SA : 'ESG국회포럼' , PA : '스페셜기획'} , 50 : {ONE:7,SA : '굿잡코리아포럼' , PA : '스페셜기획'} , 51 : {ONE:7,SA : '직업혁명' , PA : '스페셜기획'} , 52 : {ONE:7,SA : 'JOB카툰' , PA : '스페셜기획'} , 53 : {ONE:7,SA : '글로벌기획' , PA : '스페셜기획'} , 72 : {ONE:7,SA : '이태희의 JOB채' , PA : '스페셜기획'} , 73 : {ONE:7,SA : '민경철의 검사수첩' , PA : '스페셜기획'} , 74 : {ONE:7,SA : '올해의 10대 뉴스' , PA : '스페셜기획'}
     , 75 : {ONE:7,SA : '심층기획' , PA : '스페셜기획'}
	   , 20 : {ONE:8,SA : '사람들'} , 54 : {ONE:8,SA : 'JOB인터뷰' , PA : '사람들'} , 55 : {ONE:8,SA : 'CEO리포트' , PA : '사람들'} , 56 : {ONE:8,SA : '인물탐구' , PA : '사람들'} , 57 : {ONE:8,SA : '뉴스 속 직업' , PA : '사람들'} , 58 : {ONE:8,SA : '인스타 스타' , PA : '사람들'} , 59 : {ONE:8,SA : '지난기획' , PA : '사람들'} , 60 : {ONE:8,SA : '인생 2막의 창업자들' , PA : '사람들'} , 61 : {ONE:8,SA : '인사.부음' , PA : '사람들'}
     , 21 : {ONE:9,SA : '이야기쉼터'} , 62 : {ONE:9,SA : '칼럼' , PA : '이야기쉼터'} , 63 : {ONE:9,SA : '기자의 눈' , PA : '이야기쉼터'}
     , 22 : {ONE:10,SA : '전국'} , 64 : {ONE:10,SA : '경기' , PA : '전국'} , 65 : {ONE:10,SA : '대전' , PA : '전국'} , 66 : {ONE:10,SA : '세종' , PA : '전국'} , 238 : {ONE:10,SA : '공기업' , PA : '전국'}
	 , 239 : {ONE:11,SA : '미네르바의 눈'}
     , 23 : {ONE:12,SA : '시큐리티팩트'} , 68 : {ONE:12,SA : '방위산업' , PA : '시큐리티팩트'} , 69 : {SONE:12,A : '사이버안보' , PA : '시큐리티팩트'} , 70 : {ONE:12,SA : '소통시대' , PA : '시큐리티팩트'} , 71 : {ONE:12,SA : '안보종합' , PA : '시큐리티팩트'}
     , 268 : {ONE:13,SA : 'MICE'} , 269 : {ONE:13,SA : '굿잡포럼' , PA : 'MICE'} , 270 : {ONE:13,SA : 'ESG포럼' , PA : 'MICE'} , 271 : {ONE:13,SA : '방산혁신포럼' , PA : 'MICE'} , 272 : {ONE:13,SA : '지속가능경영소통대상' , PA : 'MICE'}	 
     , 82 : {ONE:999,SA : '보도뉴스'}
   },
    init : function () {
        var self = this;
			var arr = /^\/.*?\/([0-9]*)$/.exec(location.pathname);
			var menu = self.menuEnum[arr[1]];
			self.menuOn(menu);
			self.menuActive(menu);
		},
    //메뉴 ACTIVE
	menuOn : function (menu) {
		if (ObjectUtils.isNotEmpty(menu)) {
			$("div[data-layout-area=\"MENU\"] ul li").removeClass("on");
            $("div[data-layout-area=\"MENU\"] ul li").eq(menu.ONE).addClass("on");
		}
	},
    menuActive : function (menu) {
       var self = this;

       var url = location.pathname;
       var paName, sName, pathName;

       url = url.split('/');

       var num = url[url.length - 1];
       var menu = self.menuEnum[num];
       console.log(self.menuEnum[num]);

       if (ObjectUtils.isNotEmpty(menu.PA)) {
         paName = menu.PA;
         pathName = ' > ' +menu.PA + ' > ' +menu.SA;
       }else{
        paName = menu.SA;
        pathName = ' > ' + menu.SA;
       }

       sName = menu.SA;
       $("#homeSectionName").html("Home" + pathName);
       $(".parentSection").val(paName);
       $("#sectionNameVal").html(sName);
	   $("#sectionNameVal2").html(sName);
    },
	menuViewActive : function (menu) {
		var sName = menu.SA;
		$("#sectionNameVal").html(sName);
	}
};



/*ie 썸네일*/
$(document).ready(function (){

  if(typeof IE_TYPE != "undefined" && IE_TYPE){
    return ;
  }

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if (ie) {
    $(".list-imgBox").each(function () {
        var $container = $(this),
            imgUrl = $container.find("img").prop("src");
        if (imgUrl) {
            $container.css({"backgroundImage": 'url(' + imgUrl + ')',
                            "background-size": "cover",
                            "height": "91px",
                            "width": "135px",
                            "max-width": "100%",
                            "background-position": "0 29%"});
     }
    });
  }

});


$(document).ready(function (){

  if(typeof IE_TYPE != "undefined" && IE_TYPE){
    return ;
  }

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if (ie) {
    $(".article-card-img").each(function () {
        var $container = $(this),
            imgUrl = $container.find("img").prop("src");
        if (imgUrl) {
            $container.css({"backgroundImage": 'url(' + imgUrl + ')',
                            "background-size": "cover",
                            "height": "161px",
                            "width": "260.5px",
                            "max-width": "100%",
                            "background-position": "0 29%"});
     }
    });
  }

});



$(document).ready(function (){

  if(typeof IE_TYPE != "undefined" && IE_TYPE){
    return ;
  }

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if (ie) {
    $(".series-img-box").each(function () {
        var $container = $(this),
            imgUrl = $container.find("img").prop("src");
        if (imgUrl) {
            $container.css({"backgroundImage": 'url(' + imgUrl + ')',
                            "background-size": "cover",
                            "height": "81px",
                            "width": "124px",
                            "max-width": "100%",
                            "background-position": "0 29%"});
     }
    });
  }

});

var ObjectUtils = {
    // 媛믪쓽 �좊Т 泥댄겕
    isEmpty : function(val) {
        var self = this;
        if (val === undefined) return true;
        if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
            return false;
        if (typeof (val) == 'object') {
            var flag = true;
            for (var f in val) {
                flag = false;
            }
            return flag;
        }
        if (null == val || null === val || "" == val || val == undefined || typeof(val) == undefined || "undefined" == val || "NaN" == val || "null" == val) {
            return true;
        } else {
            return false;
        }
    },

    // 媛믪쓽 �좊Т 泥댄겕
    isNotEmpty: function (val) {
        var self = this;
        return !this.isEmpty(val);
    },

    //�レ옄 �몄� 泥댄겕
    isNumeric : function(val) {
        var self = this;
        if (!/^[0-9]+$/.test(val)) {
            return false;
        } else {
            return true;
        }
    },

    //�レ옄媛� �ы븿 �섏뼱 �덈뒗吏� 泥댄겕
    isContainNumber : function(val) {
        var self = this;
        if(/[0-9]/.test(val)){
            return true;
        } else {
            return false;
        }
    },

    // URL or IP �뺤떇 泥댄겕
    isDomain : function (val) {
        //TODO 泥댄겕 �뺤떇 �섏쨷�� ���대옃
        // var self = this;
        // if (/^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/.test(val)) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    },

    //////////////////////// CONVERTER ///////////////////////

    //�좎쭨瑜� 臾몄옄濡� 蹂���
    dateToStr : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            console.error("date 媛믪씠 �놁뒿�덈떎.");
            return "";
        }
        return moment.utc(date).format(config.datetimeFormat);
    },

    //�좎쭨瑜� 臾몄옄濡� 蹂��� (YYYY-MM-DD)
    dateToStrFormat : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            //console.error("date 媛믪씠 �놁뒿�덈떎.");
            return "";
        }
        return moment.utc(date).format(config.dateFormat);
    },

    htmlEscape : function (str) {
        var self = this;
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        if (self.isEmpty(str)) {
            return str;
        }
        return String(str).replace(/[&<>"'`=\/]/g,
            function (s) { return entityMap[s]; });
    },

    //�대떦 臾몄옄�� 紐⑤몢 移섑솚
    replaceAll : function (content, before, after) {
        return content.split(before).join(after);
    },
    //�먮━�� pad 0
    pad : function (n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },

    getParameterByName : function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    deviceChk : function (){
        var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
        for (var info in mobileKeyWords) {
            if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
                return true;

            }
        }
        return false;

    },

	 commaAdd : function(str){
    	/*泥ル떒�� 援щ텇湲고샇 異붽�*/
    	    str = String(str);
    	    str = str.replace(/[^\d]+/g, '');
    	    str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

    	    return str;

	 }


};
