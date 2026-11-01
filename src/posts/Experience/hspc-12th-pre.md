---
title: 12屆成大賽初賽心得
date: 2026-05-31
categories: [心得]
tags: [C++,競程]
---
Rk. 關版前是4 - 感謝大電神們帶我

# 曹哥帶我飛

第一次跟曹大哥跟科班電神打團賽, 跟曹哥是在AA競程+脆上認識的
然後也感受到了智商的差距, 雄中果然不一樣, 一個寒假TOI就能200多分
之前有團練過, 只能說數學題根本被科班電神秒殺

---

# 開賽

由於題本沒照難度排, 我先把每題都看一看, 然後發現pI是簽到題就先跟隊友講一下然後把I寫掉了
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int INF = 1e9+9;
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    int n;
    cin>>n;
    string s;
    cin>>s;
    bool chk=0;
    for(int i=0;i<n-1;i++){
        if(s[i]=='W'&&s[i+1]!='A'){
            chk=1;
            break;
        }
    }
    if(s.back()=='W') chk=1;
    cout << (chk?"no":"yes") << '\n';
}
```
輕鬆簡單ww 

# 第一題 pH

## 思路
寫完簽到題後接著轉頭看其他題找到pH, 稍微研究一下後發現不能做的只有早下班跟晚上班兩種狀況, 
且這兩種狀況是不會衝突的, 也就是說可以直接二分搜不能做的人再拿總數減掉就可以了。 
拿下首殺
## 代碼
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int INF = 1e9+9;
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    ll n,q,t;
    cin>>n>>q>>t;
    vector<ll> L;
    vector<ll> R;
    L.reserve(n),R.reserve(n);
    for(int i=0;i<n;i++){
        ll l,r;
        cin>>l>>r;
        if(r-l>=t){
            L.push_back(l);
            R.push_back(r-t);
        }
    }
    sort(L.begin(),L.end());
    sort(R.begin(),R.end());
    int val = L.size();
    while(q--){
        ll ql,qr,x;
        cin>>ql>>qr>>x;
        if(qr-ql<t){
            cout << "No" << '\n';
            continue;
        }
        ll mx = qr-t;
        ll mn = ql;
        ll late = L.end() - upper_bound(L.begin(),L.end(),mx);
        ll ear = lower_bound(R.begin(),R.end(),mn) - R.begin();
        ll ava = val-late-ear;
        if(ava>=x) cout << "Yes" << '\n';
        else cout << "No" << '\n';
    }
}
```

# 第二題pG

## 思路
中間我去看其他題的時候隊友們已經速速寫了其他我沒看的題目, 
看到pG, 雖然pG據說是要用矩陣快速冪簡化成快速冪
但我當時是先觀察到-1,1在前面都在規則內的話不能連續出現兩次,
如果最後前綴和是1的話只能透過0,-1去轉到下一關,0的話只能透過0,1去下一關

## 推導
所以會找到這個轉移式

$dp[i][0] = dp[i-1][1]+dp[i-1][0]$
$dp[i][1] = dp[i-1][0]+dp[i-1][1]$

兩個式子右邊一樣,所以更新一次後兩個值就相同。再走一步就是把這個值加兩次：

$ dp[i+1][0] = 2 \cdot dp[i][0]$

照這樣推下去,$x \ge 0$時會是：
$
dp[i+x][0] = dp[i+x][1] = 2^x \cdot (dp[i-1][0] + dp[i-1][1])$
把這段寫成程式碼就過了, 但是那時候似乎測資有問題一直過不了 ~~害我很緊張~~
後面rejudge後就過了

## 代碼
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<ll,ll> pll;
const int INF = 1e9+9;
ll mod = 1e9+7;
ll fpow(ll base,ll p){
    ll res=1;
    while(p>0){
        if(p&1) res = (res*base)%mod;
        base = (base*base)%mod;
        p/=2;
    }
    return res;
}
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    ll n,m;
    cin>>n>>m;
    vector<pll> v(m);
    for(auto &[a,b]:v) cin>>a>>b;
    sort(v.begin(),v.end());
    ll dp0=1,dp1=0;
    ll cur=0;
    for(auto [a,b]:v){
        ll k = a-cur-1;
        if(k>0){
            ll sum = (dp0+dp1)%mod;
            ll val = (sum*fpow(2,k-1))%mod;
            dp0 = val;
            dp1 = val;
        }
        if(b==1) {
            dp1 = dp0;
            dp0 = 0;
        }
        else {
            dp0 = dp1;
            dp1 = 0;
        }
        cur = a;
    }
    if(cur<n){
        ll sum = (dp0+dp1)%mod;
        ll val = (sum*fpow(2,n-cur-1))%mod;
        dp0 = val;
        dp1 = val;
    }
    cout << (dp0+dp1)%mod << '\n';
}
```

# 第三題 pF

pG一直過不了但我也想不到我哪邊錯, 就先轉頭去看其他題目。
看了一下pF, 雖然題目叫做網路流很嚇人, 但我還是有乖乖看完題目。

## 思路

發現似乎就是個最短路徑問題但要處理種類而已, 中間比較疑惑的是為甚麼資料範圍是 16425
總之先搓了個有狀態的 Dijkstra , 種類用bitmask處理

然後丟上去發現RE了, 
那時候我整個很慌, 只寫了一題pH 跟簽到題, 其他兩題我都寫錯😭都快哭了。
但看了一下記憶體限制 `pF 256MB` 
而且最大步數根本超小不會需要用到int存,
所以把int改成short 之後就過了。

## 代碼

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const unsigned short INF = 65535;
const int N = 16450;
unsigned short dist[N][512][10];
struct EDGE{
    int u,type;
};
vector<EDGE> adj[N];
struct STATE{
    int u,d,mask,las;
    bool operator<(const STATE& oth) const{
        return d>oth.d;
    }
};

int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    int n,m,k,a,b;
    cin>>n>>m>>k>>a>>b;
    for(int i=1;i<=n;i++) {
        for(int j=0;j<512;j++){
            for(int k=0;k<10;k++) dist[i][j][k]=INF;
        }
    }
    for(int i=0;i<m;i++){
        int u,v,type;
        cin>>u>>v>>type;
        type--;
        adj[u].push_back({v,type});
        adj[v].push_back({u,type});
    }
    priority_queue<STATE> pq;
    pq.push({a,0,0,9});
    dist[a][0][9]=0;
    int ans = INF;
    while(!pq.empty()){
        auto [u,d,mask,las] = pq.top();
        pq.pop();
        if(u==b){
            ans = min(ans,d);
        }
        if(d>dist[u][mask][las]) continue;
        for(auto [v,t]:adj[u]){
            int nd = d+1;
            if(las!=9&&t!=las) nd++;
            if(!(mask&(1<<t))) nd++;
            if(nd>=dist[v][mask|(1<<t)][t]) continue;
            pq.push({v,nd,mask|(1<<t),t});
            dist[v][mask|(1<<t)][t] = nd;
        }
    }
    cout << ans << '\n';
}
```

# 小插曲

突然望哥叫我去看pD，已經寫好一大部分了但似乎WA
我是沒看題目但就代碼部分, 我原本以為是mid溢位但被打槍說那樣寫不會溢位~~對不起沒有認真上課~~,
最後是看到當 $d=1e9 , f=5e17$ 時,去二分搜的時候就會溢位,
原本想說要用甚麼方法去避免溢位, 但是最後直接__int128,又處理了一題w
原本解完後我想繼續看pG,結果發現有人pG過了?! 所以我又懷疑自己的解法有問題,
結果是官方在rejudge , rejudge完之後我們就變成第二名了。

# 第四題 pC

原本要看pG結果pG過了, 所以我就去幫曹大哥看pC。
曹大哥直接給DP+單調對列可以解決沒有噴霧的狀況, 看到之後我想說再套個二分搜試試?
但由於我的單調對列真的很爛, 所以我先寫了個暴力+DP解出來
## 暴力解代碼
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int INF = 1e9+9;
int n,m,k,d;
int grid[1005][1005];
bool chk(int tar){
    vector<vector<int>> dp(n+1,vector<int>(m+1,1e9));
    for(int i=0;i<n;i++) dp[i][0]=0;
    for(int j=1;j<m;j++){
        for(int i=0;i<n;i++){
            for(int k=max(0,i-d);k<=min(i+d,n-1);k++){
                dp[i][j] = min(dp[i][j],dp[k][j-1]+(grid[i][j]<tar?1:0));
            }
        }
    }
    for(int i=0;i<n;i++) if(dp[i][m-1]<=k) return 1;
    return 0;
}
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    cin>>n>>m>>k>>d;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cin>>grid[i][j];
        }
    }
    int l=0,r=1e9,ans=0;
    while(l<=r){
        int mid = (l+r)/2;
        if(chk(mid)){
            l = mid+1;
            ans = mid;
        }
        else{
            r = mid-1;
        }
    }
    cout << ans << '\n';
}
```
然後再把k迴圈用單調對列優化掉就可以了, 但我寫錯:( 我真的不會單調對列

## 單調對列優化
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int INF = 1e9+9;
int n,m,k,d;
int grid[1005][1005];
bool chk(int tar){
    vector<vector<int>> dp(n+1,vector<int>(m+1,1e9));
    for(int i=0;i<n;i++) dp[i][0]=(grid[i][0]<tar?1:0);
    for(int j=1;j<m;j++){
        deque<int> dq;
        for(int i=0;i<=min(d,n-1);i++) {
            while(!dq.empty()&&dp[dq.back()][j-1]>dp[i][j-1]) dq.pop_back();
            dq.push_back(i);
        }
        for(int i=0;i<n;i++){
            dp[i][j] = min(dp[i][j],dp[dq.front()][j-1]+(grid[i][j]<tar?1:0));
            
            while(!dq.empty()&&dq.front()<i-d+1) dq.pop_front();
            if(i+d+1<n){
                while(!dq.empty()&&dp[dq.back()][j-1]>dp[i+d+1][j-1]) dq.pop_back();
                dq.push_back(i+d+1);
            }
        }
    }
    for(int i=0;i<n;i++) if(dp[i][m-1]<=k) return 1;
    return 0;
}
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    cin>>n>>m>>k>>d;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cin>>grid[i][j];
        }
    }
    int l=0,r=1e9,ans=0;
    while(l<=r){
        int mid = (l+r)/2;
        if(chk(mid)){
            l = mid+1;
            ans = mid;
        }
        else{
            r = mid-1;
        }
    }
    cout << ans << '\n';
}
```

# 結束

pC過了之後我就沒做啥事跑去睡覺了w 剩下兩題都超難感覺是防破台用的
嚇哭了
總之關版前Rk是3
![alt text](https://flashing.tw/assets/postimage/hspc13.png)

真的很感謝電神們帶我飛
