---
title: APCS 中級入門- Flashingtw
date: 2026-08-11
categories: [教學]
tags: [C++,競程,APCS]
image: ../../assets/postsImages/APCS-mid.jpg
cover: ../../assets/postsImages/APCS-mid.jpg
---

# APCS 中級 基本教學 - by Flashingtw
預備知識: C++基本語法,~~中文閱讀能力~~

# 前言

我是閃光>:D

目前APCS只考了 識讀4/實作3(300滿分) ~~所以寫中級入門~~
AT coder Rating: 1364小青人
CodeForces Rating: 1820小藍人 但很久沒打了

由於筆者只會C++,所以以下的示範皆為C++,如果有Python使用者 ~~請自行翻譯~~
我自己是因為要考TOI TOI只給用C++所以也沒去學Python競程寫法
而且C++簡單多了

文字大多是口語化的,沒有很正式 有問題可以私訊我uwu

## 如果你是完全零基礎

不要想著一天把整篇背完,那樣只會看到 `vector` 就開始頭痛。可以照這個順序慢慢來：

```text
第 1 週：輸入輸出、變數、if、for、while
第 2 週：一維陣列、統計、最大最小值
第 3 週：string、函式、簡單模擬
第 4 週：二維陣列、四方向移動
第 5 週：前綴和、差分、sort、vector、pair
第 6 週：刷 APCS 初級到中級的歷屆題
```

每學一個東西就寫幾題小題目,不要只看文章點頭。看懂和自己能 AC 中間,通常隔著一堆很欠揍的編譯錯誤跟 WA ww

# 基本輸入輸出

## 1. 如何輸入輸出?

如果你現在是完全從零開始,不用先被「中級」兩個字嚇到。這篇先把目標定在實作 3 級分需要的東西：基本語法、一維和二維陣列、函式、模擬、前綴和、差分、字串和一點 STL。

不用一開始研究 DP、圖論或一堆很玄的演算法。先練到題目看得懂,可以把流程完整寫出來,這比較重要。

### 競程常用開頭

你可能會常看到別人的程式一開始寫這兩行：

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

它們是輸入輸出加速設定。`ios::sync_with_stdio(false)` 會關掉 C++ 的 `cin/cout` 和 C 語言 `scanf/printf` 之間的同步,讓 `cin/cout` 跑快一點；`cin.tie(nullptr)` 則是解除 `cin` 和 `cout` 的綁定,讀資料前不用每次都先把輸出 flush 掉。

APCS 這種「輸入都給好,最後輸出答案」的題目可以直接用。完整的競程模板通常長這樣：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // 開始寫題目
}
```

有些人會寫成縮短版：

```cpp
ios::sync_with_stdio(0);
cin.tie(0);
```

`0` 也能用,但我比較推薦上面的 `false` 和 `nullptr`,看程式的人比較知道它們是在做什麼。

用了 `sync_with_stdio(false)` 後,不要在同一支程式混用 `cin/cout` 和 `scanf/printf`,不然輸入順序可能出現奇怪問題。互動式題目則要小心解除 tie 後的 flush,需要即時送出答案時可以用 `endl` 或 `cout.flush()`。

### 基本輸入
要解題,肯定會有些"需求"的麻 , 根據題意先選擇怎麼輸入
最簡單且一般的題目,可能只有幾個變數,跟幾個ifelse
把一個輸入變成變數的方式是這樣:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    
    cout << n;
}
```
這段代碼 n是變數名稱, cin把數值輸入進n後 再把n輸出出來

### 一維陣列/字串輸入
但如果是一段數列或字串呢?
一段數列的話:
```cpp
#include <iostream>
using namespace std;
int v[1005];

int main(){
    int n;
    cin>>n;
    for(int i=0; i<n; i++){
        cin>>v[i];
    }
    
    for(int i=0; i<n; i++){
        cout << v[i] << " ";
    }
    return 0;
}
```
這樣子是把一段長度為ｎ的數列　輸入到ｖ這個陣列裡面,且n<=1000

字串有兩種方式可以輸入,一種是輸入到傳統字元陣列裡,一種是輸入到STL string
個人比較喜歡輸入到STL string,字元陣列不太習慣用:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
    string s;
    cin>>s;
    
    cout << s;
}
```
cstring跟一般的陣列一樣支援中括弧[i]取第i個元素(字元)

### 二維陣列輸入

除了一維陣列跟字串外 中級也很愛考二維陣列的使用
二維陣列也是可以輸入的
這段是一個最高長1000,最寬長1000的二維陣列輸入
```cpp
#include <bits/stdc++.h>
using namespace std;
int grid[1005][1005];

int main(){
    int h,w;
    cin>>h>>w;
    for(int i=0;i<h;i++){
        for(int j=0;j<w;j++){
            cin>>grid[i][j];
        }
    }
    
    for(int i=0;i<h;i++){
        for(int j=0;j<w;j++){
            cout << grid[i][j];
        }
        cout << '\n';
    }
}
```
1005是習慣開稍微大一點,但其實真的要避免的話開到1001就夠了
i的上限是h（高度）,代表垂直方向的座標；j 的上限是w（寬度）,代表水平方向的座標
二維陣列習慣表示grid[i][j]為第i列第j行的元素 
畫出來的話 [0][0] 會在最左上角 **要記得陣列是從0開始的,不要寫成i<=h,j<=w了**
i越大會是越下面的元素 j越大會是越右邊的元素
所以在一個高h,寬w 的陣列 最右下角的元素會是grid[h-1][w-1]

如果習慣陣列是從1開始的話也可以把陣列開大一點後從1開始 
0開始或1開始在不同題目上也會有差別

# 第一次AC

如果考過初級或有在寫題目的話應該是已經會解題了
中級就只是解的範圍變大一點而已

在解題的時候,先把題目一個字一個字讀完後再分成 輸入,處理,輸出 三段實作
但有些題目會要你在處理時輸出, 就看題目如何說明了

中級的題目大多只要按照題目意思直接做就可以了,不像是中高級,高級還需要去想時間複雜度來優化演算法來解題
但「直接做」不是看到題目就開始亂打,而是先把每一句話翻成一個小步驟

這邊拿 APCS 官方題本範例來練,題目原文可以在文末找到

有發現哪裡寫得不清楚就 DC 敲我 uwu

# 時間複雜度：先知道程式跑幾次

時間複雜度不是在算程式到底跑幾秒,而是在看資料變大時,程式大概要多做多少工作。

- `O(1)`：不管資料多大,處理步驟大致固定,例如只看三個壘包。
- `O(n)`：資料有 n 筆,大約掃過一次,例如找陣列最大值。
- `O(n^2)`：常見於兩層都跑 n 次的迴圈,例如暴力比較所有配對。

所以如果有 n 筆資料、q 次區間查詢,每次都重新加總可能是 `O(nq)`；先做前綴和後,就能變成建立 `O(n)`、查詢 `O(1)`。

不用一看到 `O(n^2)` 就嚇到。限制只有 50、100 的題目,暴力通常就可以；限制到 100000 時,才需要認真想怎麼降複雜度。

# 函式：把重複的事情包起來

實作 3 級分不需要一開始就寫出什麼超複雜的 class,但至少要會用函式把重複邏輯拆開：

```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(2, 3) << '\\n';
}
```

先記住三件事就好：參數是丟進去的資料,`return` 是拿回來的答案,`void` 代表這個函式不回傳值。當一個 `main()` 開始超過一百行,通常就是該拆函式了。

之後寫二維陣列時,也可以把邊界判斷包成函式：

```cpp
bool inside(int r, int c, int n, int m) {
    return 0 <= r && r < n && 0 <= c && c < m;
}
```

這樣主程式讀起來會比較像題目本身,也比較不容易漏掉某一個邊界條件。

# 模擬題：照題意逐步執行

先來一題 APCS 105 年 10 月的《棒球遊戲》

這題原版規則和輸入格式比較長,這裡先把它縮成適合第一次練習的版本。球員打擊結果只有下面幾種：

- `1B`、`2B`、`3B`、`HR`：打者和壘上的跑者一起前進 1、2、3、4 格
- `FO`、`GO`、`SO`：出局,壘上的人不動
- 跑者或打者前進超過三壘就回本壘,分數加一
- 三個出局後清空壘包

輸入第一行是 `n b`,代表接下來有 `n` 個打擊結果,要模擬到總共 `b` 個出局；第二行有 `n` 個結果。輸出總得分。

## 範例手算

```text
輸入
7 3
1B 2B FO HR GO 1B SO
```

我用 `[一壘, 二壘, 三壘]` 記目前壘包：

| 打擊 | 發生什麼事 | 壘包 | 得分 | 出局 |
| --- | --- | --- | --- | --- |
| `1B` | 打者上一壘 | `[●, -, -]` | 0 | 0 |
| `2B` | 一壘跑者到三壘,打者上二壘 | `[-, ●, ●]` | 0 | 0 |
| `FO` | 出局,跑者不動 | `[-, ●, ●]` | 0 | 1 |
| `HR` | 二壘、三壘和打者都回本壘 | `[-, -, -]` | 3 | 1 |
| `GO` | 再一個出局 | `[-, -, -]` | 3 | 2 |
| `1B` | 打者上一壘 | `[●, -, -]` | 3 | 2 |
| `SO` | 第三個出局,清空壘包 | `[-, -, -]` | 3 | 3 |

答案就是 `3`。這種表格很笨但很好用,先把每一步狀態寫出來,程式通常就不會突然開始通靈 ww

## 解法思路

只要記四件事：三個壘包有沒有人、目前得分、出局數、目前這球要前進幾格。處理安打時一定從三壘往一壘搬,不然前面剛搬過去的人可能又被搬一次。

## 完整程式碼（教學用簡化版輸入）

注意：下面的 `n b` 和打擊結果格式是為了練習模擬自己設計的,不是官方《棒球遊戲》的完整輸入格式。它只保留壘包、得分和出局的核心邏輯,所以適合先學會怎麼模擬；要解原題時,還是要依官方題目重新處理輸入。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, targetOut;
    cin >> n >> targetOut;

    bool base[4] = {};
    int score = 0;
    int out = 0;

    for (int turn = 0; turn < n && out < targetOut; turn++) {
        string result;
        cin >> result;

        int move = 0;
        if (result == "1B") move = 1;
        else if (result == "2B") move = 2;
        else if (result == "3B") move = 3;
        else if (result == "HR") move = 4;

        if (move == 0) {
            out++;
            if (out % 3 == 0) {
                base[1] = base[2] = base[3] = false;
            }
            continue;
        }

        bool nextBase[4] = {};
        for (int b = 1; b <= 3; b++) {
            if (!base[b]) continue;
            int destination = b + move;
            if (destination >= 4) score++;
            else nextBase[destination] = true;
        }

        if (move < 4) nextBase[move] = true;
        else score++;

        for (int b = 1; b <= 3; b++) base[b] = nextBase[b];
    }

    cout << score << '\\n';
    return 0;
}
```

## 常見錯誤

- 壘包搬家方向寫反,同一個跑者被搬兩次。
- 忘記把打者算進去,`1B` 不只是搬舊跑者。
- 三出局沒有清壘,下一局沿用上一局的跑者。
- 把 `HR` 當成只清壘,忘記打者也得分。
- 把 `FO` 當成清空壘包,但一般出局時跑者不會自動消失。

## 時間複雜度

每次打擊只掃三個壘包,所以每次是 `O(1)`。有 `n` 個打擊結果時,總時間是 `O(n)`,額外空間是 `O(1)`。

# 陣列統計：計數、最大最小值、出現次數

模擬題是在記「現在的狀態」,統計題是在記「到目前為止看過什麼」。

例如輸入 `1 3 3 2 1 3`,要找最大值、最小值,以及 3 出現幾次：

```cpp
int n;
cin >> n;

int x;
cin >> x;
int maximum = x;
int minimum = x;
int countThree = (x == 3);

for (int i = 1; i < n; i++) {
    cin >> x;
    maximum = max(maximum, x);
    minimum = min(minimum, x);
    if (x == 3) countThree++;
}
```

最大值和最小值不要亂設成 `0`,如果所有數字都是負數答案就會錯。最安全是先讀第一個數當初始值。

如果題目要統計每個分數出現幾次,可以用陣列：

```cpp
int count[101] = {};
for (int i = 0; i < n; i++) {
    int score;
    cin >> score;
    count[score]++;
}
```

分數範圍是 0 到 100 才能這樣開。這篇先用範圍固定的計數陣列；`map` 和 `unordered_map` 可以等基礎穩定後再學,它們適合處理範圍很大或是字串當 key 的情況。

### 小練習

輸入 n 個整數,輸出最大值、最小值,以及最大值出現幾次。先不要用排序,練習只掃一次陣列完成。

# 前綴和：快速計算區間總和

如果題目只問一次總和,直接用迴圈加起來就好。但如果它問很多次「第 l 個到第 r 個的總和」,每次重新跑一遍就會慢成 `O(nq)`。

前綴和就是先把前面累積過的答案存起來：

```cpp
vector<long long> a(n);
vector<long long> prefix(n + 1, 0);
for (int i = 0; i < n; i++) {
    cin >> a[i];
    prefix[i + 1] = prefix[i] + a[i];
}

int l, r;
cin >> l >> r;

// a[l] 到 a[r] 的總和（左右都包含）
long long sum = prefix[r + 1] - prefix[l];
```

這裡故意開 `n + 1` 格,讓 `prefix[0]` 代表「前面沒有任何數」,查詢公式就不用一直判斷 `l` 是不是 0。

如果有 `q` 次查詢,建立前綴和是 `O(n)`,每次查詢是 `O(1)`,總共 `O(n + q)`。這招看起來很樸素,但 APCS 真的很常用。

# 差分陣列：快速處理區間加值

前綴和是「快速查詢區間」,差分是「快速修改區間」。假設要把 `l` 到 `r` 全部加上 `x`,不用每格都改,只記兩個邊界：

```cpp
diff[l] += x;
diff[r + 1] -= x;
```

最後再對 `diff` 做一次累加,就得到每一格真正增加多少：

```cpp
long long add = 0;
for (int i = 0; i < n; i++) {
    add += diff[i];
    a[i] += add;
}
```

差分陣列最容易錯的地方是 `r + 1`。所以陣列通常會多開一格,例如 `diff[n + 1]`,避免最後一個位置越界。

先把一維前綴和與差分練熟就好,二維版本可以等遇到題目再延伸,不用第一天就把自己炸爛。

### 小練習

輸入一個陣列和 q 個查詢,每個查詢給 `l r`,輸出 `a[l]` 到 `a[r]` 的總和。試著比較暴力版本和前綴和版本的寫法。

# 字串處理：逐字掃描、切割、格式判斷

字串題常常不是演算法很難,而是題目把規則寫得很細。看到字串先問：我要找字元、找一段文字,還是把它切成好幾段？

逐字掃描：

```cpp
string s;
cin >> s;

int digitCount = 0;
for (char ch : s) {
    if ('0' <= ch && ch <= '9') digitCount++;
}
```

APCS 大部分的單字、數字、沒有空白的字串,直接用 `cin >> s` 就好。這也是我最常用的寫法：

```cpp
string s;
cin >> s;
```

只有題目明確說一整行可能包含空白時,才需要 `getline`。而且如果前面剛用過 `cin >> x`,要注意輸入留下的換行：

```cpp
string line;
getline(cin >> ws, line);
```

所以不是 `getline` 不能用,只是不用每題都拿它出來增加麻煩 ww

格式判斷也可以一個字元一個字元做。例如判斷是不是只有英文字母：

```cpp
bool ok = !s.empty();
for (char ch : s) {
    if (!(('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z'))) {
        ok = false;
    }
}
```

切割字串時,先找分隔符號的位置,再用 `substr`。不要直接假設每段長度一樣,題目通常就是故意放不一樣長的測資來抓這個。

### 小練習

輸入一個沒有空白的字串,輸出裡面數字字元、英文字母和其他字元各有幾個。

# 二維陣列：四方向移動、邊界判斷

四方向移動建議固定寫成陣列,不要每次手打四個 `if`：

```cpp
int dr[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};

for (int k = 0; k < 4; k++) {
    int nr = r + dr[k];
    int nc = c + dc[k];
    if (0 <= nr && nr < n && 0 <= nc && nc < m) {
        // grid[nr][nc] 是合法的鄰居
    }
}
```

邊界判斷一定要在存取 `grid[nr][nc]` 之前。順序寫反就算只有一個角落越界,也可能直接 RE。

### 小練習

輸入一張數字地圖和一個座標,輸出這格上下左右合法鄰居的總和。座標在角落時也不能越界。

# 排序與 STL：sort、vector、pair

陣列要排序時直接用 `sort`：

```cpp
vector<int> a = {4, 1, 7, 1};
sort(a.begin(), a.end()); // 1 1 4 7
sort(a.rbegin(), a.rend()); // 7 4 1 1
```

如果每筆資料有兩個欄位,例如「分數和編號」,用 `pair` 很方便：

```cpp
vector<pair<int, int>> students;
students.push_back({90, 3});
students.push_back({85, 1});
sort(students.begin(), students.end());
```

預設會先比 `first`,`first` 一樣才比 `second`。如果題目要求分數高的在前面、編號小的在前面,可以自己寫 comparator,不要排序完再用很多交換硬修。

### 小練習

輸入 n 位學生的分數和編號,先依分數由高到低排序；分數相同時,編號小的在前面。

# 除錯與常見 WA：越界、型別、換行、初始化

- **越界**：`a[n]` 是第 `n+1` 個,合法最後一格是 `a[n-1]`。
- **型別太小**：總和、乘法、答案可能超過 `int`,先看限制再決定要不要用 `long long`。
- **換行沒處理**：`cin >> x` 後接 `getline` 要先吃掉換行。
- **變數沒初始化**：計數器、答案、布林陣列都先給初值。
- **測資之間沒有重設**：多組測資時,每一組的陣列和計數都要重新建立或清空。
- **輸出多一個空格或少一個換行**：答案看起來一樣,評測還是可能 WA。

我自己除錯會先拿最小測資：只有一格、只有一次操作、剛好在邊界、答案是 0。這些案例最容易看出來是初始化錯還是流程錯。

# 中級考前清單

考前至少把下面幾件事練到不用查語法：

- `for`、`while`、`if` 和巢狀迴圈
- 一維陣列、二維陣列、`string`
- `vector`、`pair`、`sort`
- `max`、`min`、`abs`
- 四方向移動與邊界判斷
- `cin >> s` 讀字串；知道什麼時候才需要 `getline`
- 函式、前綴和、差分陣列
- 用一個小範例手算,再逐行對照程式

看到新題目時,先不要急著想「這是不是 DP」。先把輸入、處理、輸出分開,問自己目前要記哪些狀態。能照題意跑完的題目,先拿到分再說；真的遇到時間不夠,才回頭看哪一段需要優化。

《棒球遊戲》官方題本：[105 年 10 月 29 日 APCS 實作題 PDF](https://apcs.csie.ntnu.edu.tw/wp-content/uploads/2018/12/1051029APCSImplementation.pdf)

其他題目可以到 [APCS Online 題庫](https://apcsonline.org/zh/problems/) 找同類型的模擬、統計和陣列題。

這篇先寫到這裡,如果還是 WA 就把測資和你寫的程式一起 DC 丟過來,我可以幫你一起抓是哪個小地方在搞事 uwu
