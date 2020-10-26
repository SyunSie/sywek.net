![sywek_origin](https://user-images.githubusercontent.com/8532735/97206378-9ccb6800-17f3-11eb-8151-8ef0c1a17fb1.png)


# Sywek.net Frontend
  
## 目的
    1. 製作一個blog ,並支援註冊使用。
    2. 由前端 Vuejs + 後端 Flask。
    3. 前端為 SPA ，主要由 restful API 進行資料交換。
    4. 支援RWD。
    5. Deploy on google App Engine 。
    6. 購買並使用Domain。
    7. Server Side Session。
    
  <br/>
  
 ## Demo video

[ sywek.net Backend on Github](https://github.com/SyunSie/sywek_net-back)   

[  Web App Hosting on GAE](https://sywek.net/#/)
 <br/>
  <br/>
  ### About   sywek.net   Links
[Sywek net blog (1) 整體架構設計](https://sywek.net/#/article/@3)

[Sywek net blog (2) 環境建置](https://sywek.net/#/article/@4)

[Sywek net blog (3) 前端功能實作](https://sywek.net/#/article/@5)

[Sywek net blog (4) 後端功能實作](https://sywek.net/#/article/@6)

[Sywek net blog (5) 部屬至google cloud platform](https://sywek.net/#/article/@7)

   <hr>
  <br/>
  <br/>
  
  
  ## 1. 理想架構
![理想架構 sywek (1)](https://user-images.githubusercontent.com/8532735/97208102-ba013600-17f5-11eb-8938-ec3f9e76c427.jpg)

    
  1. Cloud CDN 進行靜態檔案傳輸(image / video / static file)。
  2. Load Balancing 進行附載平衡，並依照User地區 連接最近的region-App-Server，同時Load Balancing 也進行單個region 多個instances 調度。
  3. App Server :進行商業邏輯、API等等資料處理，分布於多個region，由Load Balancer選擇最靠近User的Server 進行處理。
          3.a. App Engine : 具有Auto Scaling 功能，處理多個request，並對Data Mutation Services 發Request 等功能。
          3.b. Cloud SQL : 對App Server 來說 只進行讀取 (Read Only)。  
  4. Data Mutation Services (可以考慮改用BigTable): 主要對資料(SQL / Storage)寫入時進行驗證，並統一修改多個地區資料。
        4.a. 資料驗證，驗證完整性。
        4.b. 資料CRUD ，當處理時會對各個region的db(單筆資料) 進行lock ，防止修改時收到其他read-request。
        4.c. 當全部處理完時，對所region的單筆資料unlock。
  
  <hr>
    
  <br/>
    
    

  ## 2. 實際架構
![Untitled Diagram (9)](https://user-images.githubusercontent.com/8532735/97209155-f5e8cb00-17f6-11eb-9065-047ca8891515.jpg)
***會這樣做主要是因為***<br/>
        1. 使用人數不多，所以不需要理想架構來處理我的blog。<br/>
        2. 費用問題，這樣只需要用到Cloud SQL/Compute Engine / Cloud Storage，前面兩個都是使用免費版本，雖然很慢但是這樣我只需要負擔Cloud Storage費用。

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;對整體架構來說，只有某部分提升對整體運行不會有顯著效果，例如單獨將 google cloud compute (App Engine , Compute Engine..)提升至multi-instance，卻不提升cloud SQL (免費版 1個vCPU)，即使再多的compute-engine-instance也會卡在對cloud SQL 的IO上。
<hr>
  <br/>
  
  ## 3. Route
![Untitled Diagram (4)](https://user-images.githubusercontent.com/8532735/97208999-c0dc7880-17f6-11eb-8b99-3413467c74a9.jpg)<br/>
前端規劃使用SPA，因此部分Route path 前會有"#"符號。
1. /#/newArticle : 用於新增article。
2. /#/myArticles : 用於顯示當前user 所有文章。
3. /#/articles{?searchStr="&searchTag="} : 顯示搜尋文章。
4. /#/article/{articleHeader}@{articleId} :  顯示文章內容。
5. /#/editArticle/{articleId} : 編輯存在文章內容。
6. /#/user/profile : 編輯使用者資訊。
7. /#/signup : 註冊用戶。
8. /#/user/{userName}@{userId} : 顯示該作者所有文章及資訊。

<hr>
<br/>

### 4.Restful API
![Untitled Diagram (5)](https://user-images.githubusercontent.com/8532735/97210480-97bce780-17f8-11eb-8fed-d2f111783bb4.jpg)<br/><br/>
 #### ***Article API***
1. /api/article/ GET : 取得文章內容及相關資訊。
2. /api/article/edit/ GET : 取得文章內容。
3. /api/article/edit/ DELETE : 刪除文章。
4. /api/article/edit/ PATCH : 更新文章狀態(開放、私有)。
5. /api/article/edit/ PUT : 更新文章內容
6. /api/article/articlesInfo GET : 取得文章資訊(標題、文章、發布時間)。
7. /api/article/articlesInfo/author/ GET : 取得該作者所有文章資訊。
8. /api/article/edit POST : 發布新文章。
9. /api/article/recommandArticlesInfo GET : 取得推薦文章資訊。
10. /api/articles GET : 搜尋文章依據tag 、 相關文字)<br/><br/>
![Untitled Diagram (6)](https://user-images.githubusercontent.com/8532735/97210502-9db2c880-17f8-11eb-866b-9a0a6f1c3530.jpg)<br/><br/>
 #### ***User API***
1. /api/user/info/ GET : 取得目標用戶相關資訊。
2. /api/user POST : 註冊用戶。
3. /api/user DELETE : 刪除用戶。
4. /api/user/follow/ POST : 關注目標用戶。
5. /api/user/follow/ DELETE : 取消關注目標用戶。
6. /api/user/profile GET : 取得自我用戶資訊。
7. /api/user/profile POST : 更新自我用戶資訊。<br/><br/>
![Untitled Diagram (7)](https://user-images.githubusercontent.com/8532735/97210507-9f7c8c00-17f8-11eb-9f9d-96422d5be606.jpg)<br/><br/>
 #### ***Session API***
1. /api/session GET : 取得session token。
2. /api/session POST : 登入。
3. /api/session DELETE : 登出。
<hr>
<br/>

### 4.Frontend 架構
![sywek frontend](https://user-images.githubusercontent.com/8532735/97210944-45c89180-17f9-11eb-9021-7223991b3343.jpg)<br/><br/>
  root-component : 根元件，用於乘載所有元件。<br/>
  vue-component : vuejs 元件。<br/>
  view-component : 隨著route path 變化呈現元件。<br/>
  custom-component : 自製元件。<br/>
  custom-functional-component : 功能型元件，定義為沒有顯示或沒有固定顯示內容的元件，可自訂內容並附帶其他功能，或單純提供某些功能。<br/>

 1. App.vue (root-component) : 為整個網頁根元件，用來放置個頁面共有元件。<br/>
     1.a. webHeader :  web navigation 元件。<br/>
     1.b. login : 登入用元件<br/>
     1.c. router-view (vue component) : vuejs 元件，隨著route path變換內容，切換view-component。<br/><br/>

 2. view-component : 為 router-view 顯示元件。<br/>
     2.a. home : 底下為carousel元件，負責推薦文章顯示和輪播。<br/>
     2.b. editArticle : 用於3個route path( article(顯示文章) / editArticle(編輯文章) / newArticle(新增文章) ) ，因為3個頁面顯示內容大致相同所以使用同的view-component 在mount時依照不同route-path進行render或功能改變。<br/>
     2.c. articleList : 用於 2個route path (user(用戶資訊及用戶文章列表) / articles(搜尋文章列表))。<br/>
     2.d. myArticles : 顯示當前登入用戶所有公開及私有文章列表。<br/>
     2.e. signUp : 用於 2個route path (signUp(用戶註冊) / user-profile(用戶資訊編輯) )。<br/><br/>

 3. custom-component : 為自定義元件。<br/>
     3.a. ariticle : 用於顯示整篇文章(比如您正看的這篇文章)，用於顯示、編輯和新增文章，由articleHeader 、 articleFooter 和數個 articleSection組成，其中articleSection由數個contentElement組成。<br/>
         3.a.1. contentElement : 由狀態決定顯示內容，狀態分鼻有 text、image、video、 section、subTitle、header、 code 和 hyperlink。<br/>
         3.a.2. articleHeader : 顯示文章標題、副標題、作者資訊及tag。<br/>
         3.a.3. articleFooter : edit模式下用於發布文章，一般模式下用於回復文章內容。<br/>

     3.b. authorCard : 顯示作者頭像、名稱及相關連結等資訊。<br/>
     3.c. signUpForm : 用於用戶註冊及資訊更改。<br/><br/>


 4. custom-functional-component : 自定義功能型元件，為無故定顯示內容或單純提供功能之元件。<br/>
     4.a. itemInViewportList : 由數個inViewportItem組成，用於偵測底下inViewportItem 是否因為scroll顯示到畫面中，當顯示時會觸發事件。<br/>
         4.a.1. inViewportItem : 主要是用來放置顯示內容，並嵌入itemInViewportList 元件中，讓父元件偵測。<br/>
     4.b. imageBase64Reader : 用於讀取image，並轉換成base64格式回傳應用。<br/><br/>

 5. vuex store : 為vuejs附屬的狀態管理架構，用於各元件間狀態管理，避免層層傳遞帶來的複雜性。<br/>
     5.a. appStore : 管理root component狀態。<br/>
     5.b. articleStore : 管理文章編輯和顯示內容。<br/><br/>
<hr>
<br/><br/>

### 5.Backend 架構
![sywek backend archi (1)](https://user-images.githubusercontent.com/8532735/97211608-3e55b800-17fa-11eb-86a6-e93e7e60f28e.jpg)<br/><br/>
後端架構，採用python flask，運用route 區分出不同功能，<br/><br/>
    
#### ***route path :***<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index route ("/") : 渲染 index.html 檔案，index.html是前端vuejs生成檔案，為SPA架構，並運用restfulAPI 和 flask(後端)做資料交換。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;static file route ("/") : 用於返回其他檔案，比如.js file 、.css file 等等。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image file route ("/image/") : 經由GCStorageController 向google cloud SQL 下載資料並回傳影像。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restful API route ("/api/") : 當前端發出restful api request 會經由各格controller 和 model 並做出相應處理。<br/><br/>
   &nbsp;&nbsp;&nbsp;&nbsp;Session : Session 採用flask-session，使用server-side-session ，並將session資料加密存在GCP SQL中，原本是採用Redis，但因為費用問題所以改為Cloud SQL。<br/>


#### ***MVC :***<br/>
   1. Contorller : 為route提供功能，並經由Model向資料進行CRUD。<br/>
      1.a. SessionController : 負責 login 、logout。<br/>
      1.b. ArticleController : 負責 文章 新增、刪除、修改。<br/>
      1.c. UserController : 負責 用戶註冊、修改、刪除。<br/>
      1.d. GCSController : 負責 Google Cloud Storage 讀寫。<br/>

  2. Model : 向資料(資料庫) 進行CRUD 功能。<br/>
      UserModel 、 ArticleModel 、GCStorageModel : 使用base class(Article 、 User 、 GCStorage)向資料庫進行讀寫。<br/>
 

#### ***Base Class :***<br/>
   Article 、 User 、GCStorage : 為物件導向概念撰寫的class ， 進行文章、用戶相應處理，Article class 、 User class 底層使用SQL ORM向SQL Database 進行讀寫。<br/>
