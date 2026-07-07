---
title: 競程題解筆記
date: 2026-03-01
categories: [題解]
tags: [C++,競程]
---

# 競程題解筆記

拿來做些小筆記,題解用的

# ATCoder ABC
## ABC-450 pE
雖然題目要求$S_{10}$$^{18}$ 的l,r
但其實算到總長度超過$10^{18}$的就夠了,因為l,r最多就到$10^{18}$

因為全部字串都是1,2組成 所以我們可以先做些預處理

預處理:
$S_1$,$S_2$的長度,包含的每個字母數量,包含的字母數量的前綴和
$S_3$~$S_{88}$ 的長度及包含字母數量

分治:
由於當前字串k 由k-1,k-2組成
如果所需長度<=k-1那k-2的地方不會用到直接遞迴就好
如果> 就加上預處理的表+去k-2遞迴 cur減掉k-1的長度

```cpp
if(cur<=len[k-1]){
    return solve(k-1,cur,tar);
}
if(cur>len[k-1]){
    return cnt[k-1][tar]+solve(k-2,cur-len[k-1],tar);
}
```
終止條件: 
k=0時 回傳0
k=1時 回傳字串1要求字母的前綴 2同理

能求一個點的包含,就能求一個區間的包含
我們只要找R點的答案減掉L-1的答案 就可以了

## ABC-451 - pE
給一張矩陣圖 判斷是不是一顆樹
因為是樹,兩點權最小的就會是樹邊,直接跑MST, 
之後再用每個點跑一次BFS/DFS 一個一個核對是不是正確的距離
總複雜度 $O(N^2 logN)$

## ABC-451 - pF
邊兩端點必定異色,為二分圖
只要確定一個點 其他點也確定,最小數量為 min(同色,異色)
帶權DSU d[u]為u與root的相對顏色 如果兩個根一樣,下次加邊d[u]==d[v] 那二分圖就炸了 之後可以瘋狂輸出-1

如果沒炸就看
兩個root都是同個顏色的話就可以直接兩個相加
如果兩個不同顏色代表原本v的異色就會是u的同色 所以v的異色加給u的同色 反之亦然

## ABC-452 - pD
找"不包含"的 = 全部-包含的 正難則反

預處理一個nextpos陣列,在第i格最近的字母j位置

枚舉每個L 去找到他的極限R,這樣[L,R]必定包含T字串
[L,R+1]也必定包含
將這些值用n-R 可以算出以L為邊界 R從R到n這些字串都是包含T字串的S子字串
全部加起來之後用S的全部子字串減掉剛剛算出來的包含字串即可

## ABC-453 - pG

```cpp
int node_cnt = 0; //版本數量
vector<Edge> adj[M]; //版本連接版本的樹
vector<Q> queries[M];//每個版本裡面的詢問
ll ans[M]; //q詢問
int cur_ver[N]; // 第i個陣列在版本樹裡面的版本
int actval[200005]; //當前陣列
```
把詢問離線處理+版本樹後直接用一顆BIT處理掉
type 1的詢問 把y陣列複製到x陣列 
-> x陣列的版本改成y陣列的版本
type 2的詢問 把x陣列的第i格改成v
-> 延伸x當前版本 創造新節點(node_cnt++) 並將資訊放在邊上 接在x當前版本後面
type 3的詢問 queries[x的當前版本] pushback一個詢問

dfs運作:
```cpp
void dfs(int u){
    for(auto q:queries[u]){
        ans[q.id] = bit.query(q.l,q.r);
    }
    for(auto e:adj[u]){
        int old_val = actval[e.idx];
        actval[e.idx] = e.val;
        bit.add(e.idx, e.val-old_val);
        dfs(e.to);
        bit.add(e.idx, old_val-e.val);
        actval[e.idx] = old_val;
    }
}
```
進入當前版本時 先回答所有詢問
之後再利用當前版本的邊上的資訊 修改 點,值
回朔完後再把 點,值 改回去

# ATCoder AWC

## AWC-0029 - pE

**題目敘述:**
> 給定一張圖n點m邊 n<=300,m<=n(n-1)
> 再給s,k k為目的地點
> 求從s開始走全部k個地點再走回s的最小距離


N<=300 , k<=15
反射動作TSP ,n<=300距離就用floyd-warshall找最小

```cpp
dp[mask][i] //定義為 走過mask的點最後停在i上的最小距離
轉移式:
從u走到v
枚舉u
dp[new_mask][v] = min(dp[new_mask][v],dp[mask][u]+dist[u][v])
```

ans求法:
把每個u,fullmask枚舉出來
```cpp
int full = (1<<k)-1;
ll ans = INF;
for(int i=0;i<k;i++){
    ans = min(ans,dp[full][i]+dist[ver[i]][s]);
    }
if(ans==INF) cout << -1;
else cout << ans;
```

要先枚舉u再枚舉v 而且要判斷u有沒有在mask裡

## AWC-0034 pE
N<=16還是反射TSP (雖然想了有點久
定義dp[mask][u] 為放mask最後停在u的最大值
```cpp
轉移式:
dp[new_mask][v] = max(dp[new_mask][v],dp[mask][u]+abs(p[u]-p[v])*w[cur-1]);
```
其中 cur為mask所包含的1個數
每次轉移時 從每個mask裡面原有的1(u) 轉移至mask裡面有的0(v)

## AWC-0038 pD
總共答案為 $C \sum _{i=1} ^n w_i$
C 就是從挑 ⌊N/2⌋ 人開始，一路加到挑滿 N−1 人的所有組合數總和：
$C =\sum _{k=\lfloor N/2 \rfloor} ^{N-1} \pmatrix{N-1\\k}$

優化:
N為偶數時
剩下的人為N-1 是奇數
總共選擇的方法數為 $C = {2^{N-1} \over 2}$ = $2^{N-2}$

當N為奇數：

剩下的N-1人是偶數。
除了對稱的右半邊，我們要加總的範圍還剛好跨過了最中間的那一項 $\binom{N-1}{(N-1)/2}$。
包含了一半的總和，再補上中間項的一半。
$$C = 2^{N-2} + \frac{\binom{N-1}{(N-1)/2}}{2}$$

## AWC-0038 pE
因為N<=40 選擇用折半枚舉
先枚舉左邊每個子集的容量(如果會衝突直接跳過)

之後做SOS DP
對於每個i 如果mask有i 則把i取消跟原本的取max
因為i從小往上跑,大集合裡的小集合已經會是最佳答案了
$O(N⋅2^{N/2})$
之後再枚舉右半
只要枚舉的集合是合法的,則把會與裡面點衝突的左半點關掉,直接去拿剛剛dp完的數值,相加與答案取max

最後輸出答案要再對M取min

## AWC-0042 pE
定義R[i]為第i天選擇休息的最大金額
W[i] 為第i天選擇工作的最大金額
每次轉移時 思考"上次做不同的選擇是甚麼"

算工作就找 上次最大的選擇休息休息金額
算休息就找 上次最大的選擇工作金額

滑窗找極值->單調對列優化

計算上次工作到今天休息的金額:
連續陣列相加->前綴和

# Sprout-2026
## w3 - 染色遊戲
O(N) 的解:
枚舉t 0~n
計算每個矩形的面積,兩兩矩形的交集
```cpp
//面積計算:
int area(rect x){
    int wid = max(0,x.r-x.l+1);
    int hei = max(0,x.t-x.b+1);
    return wid*hei;
}
//交集計算:
rect a(rect x,rect y){
    int l = max(x.l,y.l);
    int r = min(x.r,y.r);
    int t = min(x.t,y.t);
    int b = max(x.b,y.b);
    return {l,r,b,t};
}
```
然後去排容排一下就有答案了
## w3 - 樹重心

寫這題的時候忘記怎麼求了(x
總之就是對於每個點 找子樹最大值(函向上子樹)不超過n/2的點
都是樹重心

# CodeForces

## ECR 118 - pE
觀察到 S(x) 會是 頭+尾
head 為x 尾是u由x的數位和(sum of digit)所遞迴形成的

不變量: 字串的總和不變
假設x的數位和是Y 知道Y就可以知道後面的"尾巴"部分是甚麼了
Y+ digitsum(尾) = total

接下來就是模擬 尾巴的形成 
再計算總共的sum是不是跟total一樣
如果sum=total 再檢查字數有沒有一樣
都一樣的話就可以輸出答案了

## CR 1093 - pD

