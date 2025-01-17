$(document).ready(function(){

var JSON = 
    {
	default_menu: 
	[
		{name: 'JOB', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//
			{name: '취준생',link: '24', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//
				{name: 'JOB속보',link: '149', sub: null},	
				{name: '취업도우미',link: '157', sub: null},	
				{name: 'Budget analysis',link: '148', sub: null},	
				{name: '청년',link: '156', sub: null},	
				{name: '중장년',link: '155', sub: null},	
				{name: '대기업족',link: '152', sub: null},	
				{name: '공시족',link: '150', sub: null},	
				{name: '일본을 뚫어라',link: '153', sub: null},	
				{name: '글로벌JOB',link: '151', sub: null},	
				{name: '종합',link: '154', sub: null},
				{name: '박용인의 JOB카툰',link: '170', sub: null},
				{name: '박시영의 뉴 잡툰',link: '169', sub: null}
			]},
			{name: '신중년',link: '279', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//
				{name: '인터뷰',link: '280', sub: null},	
				{name: '정부지원정책',link: '281', sub: null},	
				{name: '혁신일자리',link: '282', sub: null},	
				{name: '재취업일자리',link: '283', sub: null},	
				{name: '비정규직일자리',link: '284', sub: null},
				{name: '공공일자리',link: '285', sub: null}
			]},
			{name: '직장인',link: '25', sub:
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '직업이야기',link: '141', sub: null},	
				{name: 'JOB談',link: '134', sub: null},	
				{name: '대기업',link: '137', sub: null},	
				{name: '중소기업',link: '140', sub: null},	
				{name: '공기업',link: '135', sub: null},	
				{name: '금융업',link: '136', sub: null},	
				{name: '식품·유통',link: '138', sub: null},	
				{name: 'IT/게임',link: '133', sub: null},	
				{name: '종합',link: '139', sub: null}
			]},	
			{name: '창직/창업',link: '26', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '스타트업',link: '143', sub: null},	
				{name: '창업도우미',link: '146', sub: null},	
				{name: '프렌차이즈',link: '147', sub: null},	
				{name: '자영업',link: '144', sub: null},	
				{name: '1인창업',link: '142', sub: null},	
				{name: '종합',link: '145', sub: null}
			]},				
			{name: '미래일자리',link: '27', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '직업의 미래',link: '124', sub: null},	
				{name: 'CEO북클럽',link: '123', sub: null}
			]},
			{name: '일자리정책',link: '28', sub:  
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '정부',link: '130', sub: null},	
				{name: '국회',link: '127', sub: null},	
				{name: '사회',link: '129', sub: null},	
				{name: '지자체',link: '132', sub: null},	
				{name: '軍',link: '125', sub: null},	
				{name: '교육',link: '126', sub: null},	
				{name: '미디어',link: '128', sub: null},	
				{name: '종합',link: '131', sub: null}
			]}

		]},
		{name: 'ESG', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//
			{name: '환경',link: '241', sub: null},
			{name: '사회',link: '242', sub: null},
			{name: '지배구조',link: '243', sub: null},
			{name: '종합',link: '244', sub: null}
		]},				
		{name: '금융·증권', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//
			{name: '경제정책',link: '29', sub: null},
			{name: '금융',link: '30', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '금융',link: '120', sub: null},	
				{name: '증권',link: '122', sub: null},	
				{name: '버핏이라면',link: '121', sub: null},	
				{name: '가상화폐',link: '119', sub: null}
			]},			
			{name: '증권',link: '274', sub: null},
			{name: '글로벌경제',link: '31', sub: null},
			{name: '거꾸로 읽는 경제',link: '32', sub: null},
			{name: '기획',link: '33', sub: null},
			{name: '종합',link: '34', sub: null}
		]},		
		{name: '비즈', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: '산업',link: '35', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '자동차',link: '168', sub: null},	
				{name: '업계소식',link: '167', sub: null},	
				{name: '생활경제',link: '166', sub: null}
			]},
			{name: '재계',link: '36', sub: null},
			{name: '부동산',link: '39', sub: null},
			{name: '기획',link: '40', sub: null},
			{name: '종합',link: '41', sub: null}
		]},		

		{name: '과학/IT', link: '262', sub: 
		[
			{name: '섹션선택',link: '', sub: null},		
			{name: 'IT',link: '254', sub: null},
			{name: '게임',link: '255', sub: null},
			{name: '모바일',link: '256', sub: null},
			{name: '통신/미디어',link: '257', sub: null},
			{name: '보안',link: '258', sub: null},
			{name: '컴퓨터',link: '259', sub: null},
			{name: '과학일반',link: '260', sub: null}
		]},	
		
		{name: '생활·경제', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: '헬스/과학',link: '43', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '헬스클리닉',link: '165', sub: null}
			]},
			{name: '패션/뷰티',link: '44', sub:  
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '스타일보고서',link: '163', sub: null},	
				{name: '직장인 뷰티',link: '164', sub: null}
			]},
			{name: '여행/레저',link: '45', sub: null},
			{name: '음식/요리',link: '46', sub:   
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '캐리의 음식&도예',link: '162', sub: null},	
				{name: '직장인 쿡',link: '161', sub: null}
			]},
			{name: '식음료·유통',link: '37', sub: null},
			{name: '기획',link: '47', sub:    
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '심층기획',link: '160', sub: null},	
				{name: '나는 솔로다',link: '159', sub: null},
				{name: 'D씨의 정직한 체험담',link: '158', sub: null}
			]},
			{name: '종합',link: '48', sub: null}
		]},		

		{name: '정치', link: '261', sub: 
		[
			{name: '섹션선택',link: '', sub: null},	
			{name: '대통령실',link: '249', sub: null},
			{name: '국회/정당',link: '250', sub: null},
			{name: '북한',link: '251', sub: null},
			{name: '행정',link: '263', sub: null},
			{name: '국방/외교',link: '252', sub: null},
			{name: '정치일반',link: '253', sub: null}
		]},	
		
		{name: '스페셜기획', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: '국내 직장분석',link: '49', sub: 
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '직장 돋보기 분석',link: '173', sub: null},	
				{name: '라이벌 직장분석',link: '172', sub: null},	
				{name: '기업별입사전략',link: '171', sub: null}
			]},
			{name: '직업혁명',link: '51', sub: null},
			{name: '글로벌기획',link: '53', sub: null},
			{name: '민병두의 K-Sapience',link: '278', sub: null},
			{name: '이태희의 JOB채',link: '72', sub: null},
			{name: '올해의 10대 뉴스',link: '74', sub:  
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '2016년',link: '177', sub: null},	
				{name: '2017년',link: '178', sub: null},	
				{name: '2018년',link: '179', sub: null},	
				{name: '2019년',link: '180', sub: null}
			]},
			{name: '창간기획',link: '236', sub: null},
			{name: '심층기획',link: '75', sub:   
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '내부고발자',link: '174', sub: null},	
				{name: '재계 뉴 리더',link: '175', sub: null},	
				{name: '청년이 살아야 나라가 산다',link: '176', sub: null}
			]}
		]},		
		{name: '사람들', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: 'JOB인터뷰',link: '54', sub: null},
			{name: 'CEO인터뷰',link: '237', sub: null},
			{name: 'CEO리포트',link: '55', sub: null},
			{name: '인물탐구',link: '56', sub: null},
			{name: '뉴스 속 직업',link: '57', sub: null},
			{name: '인생 2막의 창업자들',link: '60', sub: null},
			{name: '인사/부고',link: '61', sub: null},
			{name: '지난기획',link: '59', sub: null}
		]},		
		{name: '이야기쉼터', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: '칼럼',link: '62', sub:   
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '김희철의 직업군인이야기',link: '196', sub: null},	
				{name: '최환종 나의 공군 이야기',link: '229', sub: null},	
				{name: '데스크칼럼',link: '197', sub: null},	
				{name: '전문가 칼럼',link: '224', sub: null},	
				{name: '이태희의 심호흡',link: '223', sub: null},	
				{name: '신재훈의 광고썰전',link: '209', sub: null},	
				{name: '이상호의 고공비행',link: '219', sub: null},	
				{name: '차병희의 사장의조건2',link: '225', sub: null},	
				{name: '윤재은 공간철학',link: '213', sub: null},	
				{name: '개봉작 프리뷰 - 볼까? 말까?',link: '190', sub: null},	
				{name: '송대욱의 건강 쓰리잘',link: '203', sub: null},	
				{name: '수필가 윤혜영의 문화산책',link: '206', sub: null},	
				{name: '엄주원의 이유있는 디자인',link: '210', sub: null},	
				{name: '이윤희의 RUN 114',link: '221', sub: null},	
				{name: '청년 칼럼',link: '226', sub: null},	
				{name: '김희철 칼럼',link: '195', sub: null},	
				{name: '프리마돈나 최주희',link: '231', sub: null},	
				{name: '최환종의 스쿠버 다이빙',link: '230', sub: null},	
				{name: '석하스님의 카이스트 수행기',link: '201', sub: null},	
				{name: '초현실주의 그림읽기',link: '227', sub: null},	
				{name: '우사라의 마음으로 그림읽기',link: '211', sub: null},	
				{name: '이나영의 Charm한 스토리',link: '217', sub: null},	
				{name: '고창신의 맞춤형 헬스',link: '192', sub: null},	
				{name: '권부원의 세상만사',link: '193', sub: null},	
				{name: '송진선 토탈 뷰티',link: '204', sub: null},	
				{name: '백연주의 영화 속 패션',link: '199', sub: null},	
				{name: '송대욱 체질개선',link: '202', sub: null},	
				{name: '이기명 뷰티일러스트',link: '215', sub: null},	
				{name: '서동순과 함께하는 종이접기',link: '200', sub: null},	
				{name: '쉐프 민상호의 감성요리',link: '207', sub: null},	
				{name: '이승재의 정경풍경',link: '220', sub: null},	
				{name: '신민형 생활문화시론',link: '208', sub: null},	
				{name: '도시농부 김대식의 실패 않는 귀농·귀촌',link: '198', sub: null},	
				{name: '강소슬 20-30 톡톡',link: '189', sub: null},	
				{name: '최동군의 나도 문화해설사',link: '228', sub: null},	
				{name: '이기수의 소비자트렌드',link: '216', sub: null},	
				{name: '송하식의 세상보기',link: '205', sub: null},	
				{name: '김나령 예술의 재발견',link: '194', sub: null},	
				{name: '헬레나 에그아트',link: '232', sub: null},	
				{name: '유준곤 덴탈EQ',link: '212', sub: null},	
				{name: '이미경 명작의 비밀',link: '218', sub: null},	
				{name: '건축과 시',link: '191', sub: null},	
				{name: '이종은 한옥이야기',link: '222', sub: null},	
				{name: '윤주의 스토리텔링',link: '214', sub: null}
			]},
			{name: '기자의 눈',link: '63', sub: null}
		]},	
		{name: '전국', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: '서울',link: '276', sub: null},
			{name: '경기',link: '64', sub: null},
			{name: '대구경북',link: '287', sub: null},
			{name: '부울경',link: '277', sub: null},
			{name: '대전',link: '65', sub: null},
			{name: '세종',link: '66', sub: null},
//			{name: '종합',link: '67', sub: null},
			{name: '공기업',link: '238', sub: null}
		]},		
		{name: '미네르바의 눈', link: '239', sub: 
		[
			{name: '섹션선택',link: '', sub: null}//		
		]},
		{name: '시큐리티팩트', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},//		
			{name: '방위산업',link: '68', sub: null},
			{name: '사이버안보',link: '69', sub: null},
			{name: '해외안보',link: '275', sub: null},
			{name: '소통시대',link: '70', sub:   
			[
				{name: '섹션선택',link: '', sub: null},//			
				{name: '김희철 칼럼',link: '182', sub: null},	
				{name: '송승종 칼럼',link: '184', sub: null},	
				{name: '장원준 칼럼',link: '187', sub: null},	
				{name: '류제승 칼럼',link: '183', sub: null},	
				{name: '원태재의 Old & New',link: '185', sub: null},	
				{name: '김한경 칼럼',link: '181', sub: null},	
				{name: '최기일 칼럼',link: '188', sub: null},	
				{name: '임방순 칼럼',link: '186', sub: null}
			]},
			{name: '종합',link: '71', sub: null}
		]},
		{name: 'MICE', link: '16', sub: 
		[
			{name: '섹션선택',link: '', sub: null},
			{name: '굿잡포럼',link: '269', sub: null},
			{name: 'ESG포럼',link: '270', sub: null},
			{name: '방산혁신포럼',link: '271', sub: null},
			{name: '지속가능경영소통대상',link: '272', sub: null}
		]},		
		{name: 'ENGLISH', link: '267', sub: 
		[
			{name: '섹션선택',link: '', sub: null}
		]}
	]
	}
	

	// 카테고리 선택시
	var total_default_menu = JSON.default_menu;
	var idx1;
	var idx2; 
	$("#default_menu1").on('change',function(){
		$(".third_section").hide();
		// 1뎁스 인덱스
		idx1 = $("#default_menu1 option").index( $("#default_menu1 option:selected") );

		// 2뎁스 초기화
		$("#default_menu2 option").remove();
		
		// 3뎁스 초기화
		$("#default_menu3 option").remove();
		
		// 2뎁스 옵션 넣기
		if(total_default_menu[idx1].sub.length>0){
			for (var i=0;i<total_default_menu[idx1].sub.length;i++) {
				$('#default_menu2').append("<option value='"+total_default_menu[idx1].sub[i].link+"'>"+total_default_menu[idx1].sub[i].name+"</option>");
			}
		}
	});
	
	$("#default_menu2").on('change',function(){
		$(".third_section").hide();
	
		// 1뎁스 인덱스
		idx1 = $("#default_menu1 option").index( $("#default_menu1 option:selected") );
		
		// 2뎁스 인덱스
		idx2 = $("#default_menu2 option").index( $("#default_menu2 option:selected") );

		// 3뎁스 초기화
		$("#default_menu3 option").remove();
		
		// 3뎁스 옵션 넣기
		if(total_default_menu[idx1].sub[idx2].sub.length>0){
			$(".third_section").show();
			for (var i=0;i<total_default_menu[idx1].sub[idx2].sub.length;i++) {
				$('#default_menu3').append("<option value='"+total_default_menu[idx1].sub[idx2].sub[i].link+"'>"+total_default_menu[idx1].sub[idx2].sub[i].name+"</option>");
			}
		}
	});
	
	// 이동버튼 클리시
	$("#menu_move").on('click',function(){
	
		var list_data ="";
		var param_data ="";
		/*
		if(window.location.href.indexOf("?")!=-1){
			param_data +="&";
		}else{
			param_data +="?";
		}
		*/
		if(ObjectUtils.isNotEmpty($("#default_menu1").val())){
			list_data = $("#default_menu1").val();
			param_data += "default_menu_param1="+$("#default_menu1 option").index( $("#default_menu1 option:selected") );
		}
		
		if(ObjectUtils.isNotEmpty($("#default_menu2").val())){
			list_data = $("#default_menu2").val();
			param_data += "&default_menu_param2="+$("#default_menu2 option").index( $("#default_menu2 option:selected") );
		}		

		if(ObjectUtils.isNotEmpty($("#default_menu3").val())){
			list_data = $("#default_menu3").val();
			param_data += "&default_menu_param3="+$("#default_menu3 option").index( $("#default_menu3 option:selected") );
		}				
		
		location.href="/list/"+list_data+"?"+param_data;
	});
	
	var url = location.pathname;
	
	if(url.indexOf('list') > -1 || url.indexOf('article') > -1 || url.indexOf('photo') > -1 || url.indexOf('video') > -1){
		//if(ObjectUtils.isNotEmpty($("#default_menu_param1").val())){
			loadMenu(total_default_menu);	
		//}
	}
});	
	
function loadMenu(menu){
	// param 여부
	var menu_param1 = $("#default_menu_param1").val();
	var menu_param2 = $("#default_menu_param2").val();
	var menu_param3 = $("#default_menu_param3").val();
	
	// 1뎁스 param값이 없으면->첫번째 index
	if(ObjectUtils.isEmpty(menu_param1)){
		var article_menu_code = $("#article_menu_code").val();
		var article_menu_code_substring="";

		if(ObjectUtils.isNotEmpty(article_menu_code)){

			article_menu_code_substring = article_menu_code.substring(0,3);
			if(article_menu_code_substring=="001"){//굿잡뉴스
				menu_param1="0";
			}else if(article_menu_code_substring=="018"){//ESG
				menu_param1="1";				
			}else if(article_menu_code_substring=="002"){//금융·증권 
				menu_param1="2";		
			}else if(article_menu_code_substring=="003"){//비즈
				menu_param1="3";	
			}else if(article_menu_code_substring=="020"){//과학/IT
				menu_param1="4";					
			}else if(article_menu_code_substring=="004"){//생활·경제
				menu_param1="5";			
			}else if(article_menu_code_substring=="016"){//정치
				menu_param1="6";											
			}else if(article_menu_code_substring=="005"){//스페셜기획
				menu_param1="7";	
			}else if(article_menu_code_substring=="006"){//사람들
				menu_param1="8";	
			}else if(article_menu_code_substring=="007"){//이야기쉼터
				menu_param1="9";	
			}else if(article_menu_code_substring=="008"){//전국
				menu_param1="10";	
			}else if(article_menu_code_substring=="017"){//미네르바의 눈
				menu_param1="11";				
			}else if(article_menu_code_substring=="009"){//시큐리티팩트
				menu_param1="12";
			}else if(article_menu_code_substring=="024"){//MICE
				menu_param1="13";				
			}else if(article_menu_code_substring=="023"){//ENGLISH
				menu_param1="14";	
			}else{//굿잡뉴스
				menu_param1="0";	
			}
		}		
		//menu_param1=0;
	}
	
	// 2뎁스 param값이 없으면->1뎁스에 대한 2뎁스 첫번째 index
	if(ObjectUtils.isEmpty(menu_param2)){
		menu_param2=0;
	}
	
	// 3뎁스 param값이 없으면->2뎁스에 대한 3뎁스 첫번째 index
	if(ObjectUtils.isEmpty(menu_param3)){
		menu_param3=0;
	}		
	
	// 뎁스 초기화
	//$("#default_menu1 option").remove();
	$("#default_menu2 option").remove();
	$("#default_menu3 option").remove();

	// 1뎁스 선택
	$("#default_menu1 option:eq("+menu_param1+")").attr("selected","selected");
	
	// 2뎁스 옵션 넣기
	if(menu[menu_param1].sub.length>0){
		for (var i=0;i<menu[menu_param1].sub.length;i++) {
			if(menu_param2==i){
				$('#default_menu2').append("<option value='"+menu[menu_param1].sub[i].link+"' selected='selected'>"+menu[menu_param1].sub[i].name+"</option>");
			}else{
				$('#default_menu2').append("<option value='"+menu[menu_param1].sub[i].link+"'>"+menu[menu_param1].sub[i].name+"</option>");				
			}
		}
	}
	
	// 3뎁스 옵션 넣기
	if(menu_param2>0){ // 2뎁스가 선택되어진게 있을 때
		if(menu[menu_param1].sub[menu_param2].sub.length>0){
			$(".third_section").show();
			for (var i=0;i<menu[menu_param1].sub[menu_param2].sub.length;i++) {
				if(menu_param3==i){
					$('#default_menu3').append("<option value='"+menu[menu_param1].sub[menu_param2].sub[i].link+"' selected='selected'>"+menu[menu_param1].sub[menu_param2].sub[i].name+"</option>");
				}else{
					$('#default_menu3').append("<option value='"+menu[menu_param1].sub[menu_param2].sub[i].link+"'>"+menu[menu_param1].sub[menu_param2].sub[i].name+"</option>");				
				}
			}
		}
	}		
}
	
// 화면 로딩시
//
