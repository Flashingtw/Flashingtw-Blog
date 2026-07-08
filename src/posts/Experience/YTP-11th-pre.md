---
title: 11屆YTP初賽心得
date: 2026-07-07
categories: [心得]
tags: [競程,C++]
---
Rk.Unknown 還沒出來
# 小閒聊
這次跟成大賽一樣是曹哥跟科班電神帶我飛，有人還記錯日期記成禮拜三很有料ww。

開始前還在找曹哥，至少最後有找到人了。<br/>

# 解決HelloWorld

剛開始時，我不知道題本有密碼~~沒在看訊息~~ 又處理了一兩分鐘才打開<br/>
一打開就是Hello World跟隊友講了一下說我來寫就速速解決掉了。
```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int INF = 1e9+9;
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    cout << "Hello World!" << '\n';
}
```
非常輕鬆，我的vscode有模板所以也沒花甚麼時間打其他的。
接下來隊友已經拿走2,3 結果我直接把1跳掉了往4看，4看了一下資料範圍跟大概的題敘之後就跳過了<br/>
感覺有點麻煩，往5看。

# 整場唯一寫出來的題目

剛看到5我以為就是一個從**左上角走到右下中間有障礙物的方法** 直接寫了一個超簡單dp出來，但測了一下測資後發現有問題才回去看題目<br/>
結果發現竟然`*`不是障礙物是黑磚，題目的要求簡單來講就是: <br/>**有一個燈泡初始是關閉的，踩上黑磚後會變換燈泡的開關，要求走到最右下的時候燈泡要是開著的**<br/>

稍微改一下DP轉移式而已<br/>

```cpp
if(g[i][j]=='.'){
    dp[j][0] = (dp[j-1][0] + last[j][0]) % mod;
    dp[j][1] = (dp[j-1][1] + last[j][1]) % mod;
}
else{
    dp[j][0] = (dp[j-1][1] + last[j][1]) % mod;
    dp[j][1] = (dp[j-1][0] + last[j][0]) % mod;
}
```
但其實也還好，多加一個狀態維度而已，只是我感覺1024mb不夠用我開的又是longlong我就又加了個Rolling DP優化
最後把分拿滿

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int INF = 1e9+9;
const ll mod = 998244353;
int main(){
    ios::sync_with_stdio(0),cin.tie(0);
    int n,m;
    cin>>n>>m;
    vector<vector<char>> g(n+1,vector<char>(m+1));
    vector<vector<ll>> dp(m+1,vector<ll>(2));
    vector<vector<ll>> last(m+1,vector<ll>(2));
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cin>>g[i][j];
        }
    }
    last[1][0] = 1;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(g[i][j]=='.'){
                dp[j][0] = (dp[j-1][0] + last[j][0]) % mod;
                dp[j][1] = (dp[j-1][1] + last[j][1]) % mod;
            }
            else{
                dp[j][0] = (dp[j-1][1] + last[j][1]) % mod;
                dp[j][1] = (dp[j-1][0] + last[j][0]) % mod;
            }
        }
        dp.swap(last);
    }
    cout << last[m][1] << '\n';
}
```

接著隊友已經解決掉1了2,3也都快好了 超級快，才過20分鐘而已，
接著在等隊友的同時，我也邊看題目邊把能喇的子題喇一喇。<br/>
原本想說試試看6但是看那個資料範圍 $N \le 100$ 相當詭異，看題目也沒有甚麼想法，
就先跳過看7，看到7那個 $n\le10^{6}$ 也是有點愣住，這資料範圍怎麼解?<br/>
但看到有個 $n\le 3000$ 的子任務，直接先寫個 $O(N^2)$ 的暴力解 然後我就負責擺爛了
後來隊友有解出來 說是**把曼哈頓距離用座標轉換成切比雪夫距離**
但我聽不懂 總之滿分解

後面就沒上分了跑去睡覺

---

# 最後解了這些:
**1: 滿
2: 滿
3: 滿
4: 4
5: 滿
6: 0
7: 滿
8: 4**

只能說我根本躺分