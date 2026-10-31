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

目前APCS只考了 識讀4/實作4(240分) ~~所以寫中級入門~~
AT coder Rating: 1364小青人
CodeForces Rating: 1820小藍人 但很久沒打了

由於筆者只會C++,所以以下的示範皆為C++,如果有Python使用者 ~~請自行翻譯~~
我自己是因為要考TOI TOI只給用C++所以也沒去學Python競程寫法
而且C++簡單多了(暴言)

文字大多是口語化的,沒有很正式 有問題可以私訊我uwu

## 先看哪裡

如果連變數、`if`、`for`、`while` 都還沒用過,先把基本語法補一下,後面的範例比較跟得上。

接著可以照輸入輸出、陣列、字串的順序看,再往下寫模擬跟前綴和。已經會的部分就跳過。

看完基本的就寫寫看題目, 看懂別人的題解跟自己寫代碼中間還是差很多的。

# 基本輸入輸出

## 競程常用開頭

你可能會常看到別人的程式一開始寫這兩行：

```cpp
ios::sync_with_stdio(0),cin.tie(0);
```

這兩行是輸入輸出加速。`ios::sync_with_stdio(0)` 關掉 `cin/cout` 和 `scanf/printf` 的同步；`cin.tie(0)` 則是讓 `cin` 讀資料前不用每次先把 `cout` 的內容送出去。

APCS 題目可以直接加在 `main()` 開頭：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0),cin.tie(0);

    // 開始寫題目
}
```

加了這兩行後,整支程式就用 `cin/cout`,別又混進 `scanf/printf`。如果以後寫到需要邊輸出邊等回應的互動題,才要另外注意 flush,用 `endl` 或 `cout.flush()` 把內容送出去。

## 基本輸入
要解題,肯定會有些"需求"的麻 , 根據題意先選擇怎麼輸入
最簡單且一般的題目,可能只有幾個變數,跟幾個if/else
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

## 一維陣列/字串輸入
但如果是一段數列或字串呢?
一段數列的話:
```cpp
#include <bits/stdc++.h>
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
這樣子是把一段長度為ｎ的數列　輸入到v這個陣列裡面,且n<=1000

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

## 二維陣列輸入

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

# 時間複雜度

雖然中級題目比較不會有TLE的問題但時間複雜度還是要講一下

時間複雜度可以拿來估計資料變多後,程式的運算量會怎麼增加。像迴圈掃過 n 個數,就要做大約 n 次；如果每次又把全部的數掃一遍,就變成大約 n² 次。

- `O(1)`：不管資料多大,處理步驟大致固定,例如只看三個壘包。
- `O(n)`：資料有 n 筆,大約掃過一次,例如找陣列最大值。
- `O(n^2)`：常見於兩層都跑 n 次的迴圈,例如暴力比較所有配對。

例如有 n 筆資料、q 次區間查詢,每次都重新加總可能會跑到 `O(nq)`。後面會講的前綴和,可以花 `O(n)` 建好,之後每次用 `O(1)` 查詢。

要不要優化還是看資料範圍。n 只有 50、100 時,兩層迴圈通常沒問題；如果 n 到 100000,就得想別的做法了。

# 函式

重複用到的步驟可以拆成函式：

```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(2, 3) << '\n';
}
```

參數是丟進去的資料,`return` 是拿回來的答案,`void` 代表這個函式不回傳值。

之後寫二維陣列時,也可以把邊界判斷包成函式：

```cpp
bool inside(int r, int c, int n, int m) {
    return 0 <= r && r < n && 0 <= c && c < m;
}
```

之後算出一個新座標,就能用 `inside(r, c, n, m)` 判斷能不能走,不用到處重寫同一串條件。

# 寫一題看看：棒球遊戲

這邊用 APCS 105 年 10 月的《棒球遊戲》來練習。

讀完題目後,先想清楚要記什麼、每次操作會改變什麼,再分成輸入、處理、輸出來寫。這題就要一直記著壘上有沒有人,碰到不同打擊結果再更新。

原題的輸入格式比較長,這裡先用簡化版,完整題本放在文末。先看這幾個規則：

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

答案是 `3`。先把每次打擊後的壘包寫出來,再照這個流程實作。

## 解法思路

三個壘包用 `base` 記,另外記得分跟出局數。碰到安打就算每個跑者會到哪裡,超過三壘的加分,還在壘上的就留下來,最後也要算打者。

下面用 `nextBase` 暫存移動後的壘包,全部算完才寫回 `base`。這樣讀到的都是這次打擊前的位置,同一個人不會被搬兩次。

## 程式碼

下面的 `n b` 是練習用的輸入格式。要交官方原題的話,得照題本重寫輸入部分,不能整段貼過去。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0),cin.tie(0);

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

## 如果算出來不一樣

可以拿上面的表格對照,看是哪一次打擊開始不一樣。安打要算到打者自己,所以全壘打不能只把原本壘上的人清掉。

另外,一般出局時跑者還在壘上,要等三出局才清壘。如果直接在原陣列裡搬人,也要小心別把剛移動過的跑者又搬一次。

## 時間複雜度

每次打擊只掃三個壘包,所以每次是 `O(1)`。有 `n` 個打擊結果時,總時間是 `O(n)`,額外空間是 `O(1)`。

# 陣列統計

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

這裡先拿第一個數當最大值跟最小值。最大值如果直接設 `0`,碰到全部都是負數的測資就會錯。

如果題目要統計每個分數出現幾次,可以用陣列：

```cpp
int count[101] = {};
for (int i = 0; i < n; i++) {
    int score;
    cin >> score;
    count[score]++;
}
```

這樣開是因為分數只會在 0 到 100 之間。範圍很大或要用字串當 key 時,再考慮 `map`、`unordered_map`。

可以自己改一版試試：輸入 n 個整數,輸出最大值、最小值,還有最大值出現幾次。這次不用排序,掃一次陣列就好。

# 前綴和

只問一次總和的話,用迴圈加起來就好。如果有 q 次查詢,每次都問第 l 個到第 r 個的總和,一直重新加就可能跑到 `O(nq)`。

可以先把前面累積的總和存起來：

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

`prefix[i + 1]` 存的是 `a[0]` 到 `a[i]` 的總和。多開一格是為了留 `prefix[0] = 0`,查到最左邊時也能用同一個式子。

如果有 `q` 次查詢,建立前綴和是 `O(n)`,每次查詢是 `O(1)`,總共 `O(n + q)`。

這段可以補上 q 次查詢,每次讀 `l r`,輸出 `a[l]` 到 `a[r]` 的總和。也可以寫個每次重新加的版本,比較兩種寫法。

# 差分陣列

如果題目要把第 l 個到第 r 個數全部加上 x,而且要做很多次,每次跑迴圈去改也會很慢。可以先用差分記住這次加值從哪裡開始、在哪裡結束：

```cpp
diff[l] += x;
diff[r + 1] -= x;
```

全部操作做完後,再一路累加 `diff`,算出每一格總共要加多少：

```cpp
long long add = 0;
for (int i = 0; i < n; i++) {
    add += diff[i];
    a[i] += add;
}
```

要留意 `r + 1`。如果 r 已經是最後一格,`diff` 還得有地方放這個結束位置,所以通常會多開一格,像 `diff[n + 1]`。

先練一維前綴和與差分,二維版本等遇到題目再看。

# 字串

像要數字串裡有幾個數字字元,就把每個字元看一遍：

```cpp
string s;
cin >> s;

int digitCount = 0;
for (char ch : s) {
    if ('0' <= ch && ch <= '9') digitCount++;
}
```

題目給的字串沒有空白時,用 `cin >> s` 就能讀：

```cpp
string s;
cin >> s;
```

如果要把一整行連同空白一起讀進來,就用 `getline`。前面如果剛用過 `cin >> x`,要記得還有換行留在輸入裡：

```cpp
string line;
getline(cin >> ws, line);
```

格式判斷也可以一個字元一個字元做。例如判斷是不是只有英文字母：

```cpp
bool ok = !s.empty();
for (char ch : s) {
    if (!(('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z'))) {
        ok = false;
    }
}
```

要切成幾段的話,可以找分隔符號的位置再用 `substr`。每段長度不一定一樣,這個要看題目。

前面的數數字範例也可以加上英文字母跟其他字元的計數,試著把三種數量分別印出來。

# 四方向移動

走格子時常常要看上下左右,可以把座標變化存成兩個陣列：

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

每跑一次迴圈就得到一個方向的 `nr, nc`。先確定座標在範圍內,再讀 `grid[nr][nc]`,順序反過來就可能 RE。

可以拿一張數字地圖試試,輸入一個座標,把它上下左右合法格子的數字加起來。也記得試地圖四個角落。

# sort、vector、pair

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

`pair` 預設先比 `first`,相同才比 `second`。題目如果要求不同的順序,就自己寫比較函式給 `sort`。

例如把範例改成輸入 n 位學生的分數和編號,要求分數高的排前面,同分時編號小的在前面。可以試著寫出這個比較函式。

# WA 了先查這些

- **越界**：`a[n]` 是第 `n+1` 個,合法最後一格是 `a[n-1]`。
- **型別太小**：總和、乘法、答案可能超過 `int`,先看限制再決定要不要用 `long long`。
- **換行沒處理**：`cin >> x` 後接 `getline` 要先吃掉換行。
- **變數沒初始化**：計數器、答案、布林陣列都先給初值。
- **測資之間沒有重設**：多組測資時,每一組的陣列和計數都要重新建立或清空。
- **輸出多一個空格或少一個換行**：答案看起來一樣,評測還是可能 WA。

除錯可以先試只有一格、只有一次操作、剛好在邊界、答案是 0 的測資,看是哪一步開始跟自己算的不一樣。

# 接著寫題目

看完可以去找 APCS 初級到中級的歷屆題寫。卡住的話,先用小範例手算一次,再對照自己的程式,看從哪一步開始不一樣。

如果流程算得對但跑太慢,再回來看複雜度,找是哪一段做了太多次。

《棒球遊戲》官方題本：[105 年 10 月 29 日 APCS 實作題 PDF](https://apcs.csie.ntnu.edu.tw/wp-content/uploads/2018/12/1051029APCSImplementation.pdf)

其他題目可以到 [APCS Online 題庫](https://apcsonline.org/zh/problems/) 找同類型的模擬、統計和陣列題。

有問題可以把程式跟測資一起 DC 丟我 uwu
