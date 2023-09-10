# We-log-Backend
WeLog 백엔드 API를 직접 구현한다.

# ERD
https://dbdiagram.io/d/64f7540802bd1c4a5e037b11

# 설계 가능한 백엔드 API 예상도
## 메인 Page

* 회원가입 / signUp
고객의 이름, 이메일, 비밀번호, 연락처를 기반으로 회원가입.
bcrypt를 통한 DB저장시에 암호화. (hash를 통한 더욱 더 강력한 보안상의 암호화 설정 가능)


* 로그인 /signIn
카카오 로그인 API (GET)  // 시간상 카카오 로그인으로 진행을 하지 못하였으나 따로 유저의 정보를 개인 DB로 받는 방향성으로 다시 재구성 하였습니다.
유저가 로그인을하면 서버는 유저의 정보에 기반한 Token을 발급해서 유저에게 전달하고 유저는 서버에 요청을 할때마다 Token을 전달하는식으로 검증한다.
즉, 유저가 요청을 했을때만 토큰을 확인하면되니 세션 관리가 필요가 없어 서버의 자원을 아낄수 있다.

* 유저 글 불러오기 / getAllPosts
모든 유저의 글 (GET)

* 기간 선택(최근 글 불러오기) / 아직 미구현 사항.
게시글 필터링

## 글 작성하기 Page
* 글 작성하기
게시글 작성 (POST) / createposts, loginRequired
임시저장 게시글 불러오기 (GET)
이미지 업로드 (multer / s3 활용) / 미구현(진행예정)

* 댓글 남기기 / addComment, getComment
user_id와 post_id로 게시글을 남기도록 구현 (POST)
해당 글의 user_id와 post_id를 기반으로 한 comments 테이블 값 조회 (GET)

* 좋아요 
특정 유저의 글에 좋아요를 누를 수 있게 함. (POST) / likePostById

## 마이 페이지
* 발행한 글 (GET) 
 -> userId 기반 post 불러오기
* 임시 저장 글 (GET) 
-> post테이블의 status_id 값이 임시 인 게시글을 불러오기 진행
* 좋아요 표시한 글 불러오기 (GET) 
-> post_like 테이블을 만들어, SQL상에서 CONSTRAINT unique_user_post UNIQUE (user_id, post_id) 로 같은 유저가 같은 포스트에 좋아요를 두번 이상 못누르게 구분 함.
