---
title: APCS 中級入門- Flashingtw
date: 2026-06-01
categories: [競程]
tags: [C++,教學,APCS]
image: ../../assets/postsImages/home.png
---

# APCS 中級 基本教學 - by Flashingtw
預備知識: C++基本語法,~~中文閱讀能力~~

# 前言

我是閃光>:D

目前APCS只考了 識讀4/實作3(300滿分) ~~所以寫中級入門~~
AT coder Rating: 1105小綠人
CodeForces Rating: 1538小青人

由於筆者只會C++,所以以下的示範皆為C++,如果有Python使用者 ~~請自行翻譯~~
我自己是因為要考TOI TOI只給用C++所以也沒去學Python競程寫法
而且C++簡單多了

文字大多是口語化的,沒有很正式 有問題可以私訊我uwu

# 第一次寫題

## 1. 如何輸入輸出?
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
這邊先都拿歷屆當作範例題目uwu 然後都是用Zerojudge 比較簡單使用w

