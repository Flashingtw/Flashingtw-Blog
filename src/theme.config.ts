import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  "siteName": "Flashingtw's Blog",
  "locale": "zh-TW",
  "analytics": {
    "googleAnalytics": {
      "measurementId": ""
    },
    "umami": {
      "websiteId": "",
      "scriptUrl": ""
    }
  },
  "nav": [
    {
      "dropbox": {
        "enable": false,
        "items": []
      },
      "href": "/",
      "icon": "i-ri-home-line",
      "text": "首頁"
    },
    {
      "dropbox": {
        "enable": false,
        "items": []
      },
      "href": "/about/",
      "icon": "i-ri-user-3-line",
      "text": "關於我"
    },
    {
      "dropbox": {
        "enable": true,
        "items": [
          {
            "dropbox": {
              "enable": false,
              "items": []
            },
            "href": "/categories/",
            "icon": "i-ri-book-shelf-fill",
            "text": "分類"
          },
          {
            "dropbox": {
              "enable": false,
              "items": []
            },
            "href": "/tags/",
            "icon": "i-ri-price-tag-3-fill",
            "text": "標籤"
          }
        ]
      },
      "href": "/archives/",
      "icon": "i-ri-quill-pen-fill",
      "text": "文章"
    },
    {
      "dropbox": {
        "enable": false,
        "items": []
      },
      "href": "/friends/",
      "icon": "i-ri-link",
      "text": "友鏈"
    },
    {
      "dropbox": {
        "enable": false,
        "items": []
      },
      "href": "/moments/",
      "icon": "i-ri-chat-quote-line",
      "text": "動態"
    },
    {
      "dropbox": {
        "enable": false,
        "items": []
      },
      "href": "/statistics/",
      "icon": "i-ri-bar-chart-box-line",
      "text": "統計"
    }
  ],
  "brand": {
    "title": "Flashingtw's Blog",
    "subtitle": "一個小小競程仔的網站",
    "logo": "/assets/images/avatar.avif"
  },
  "cover": {
    "enable": true,
    "preload": true,
    "advancedCarousel": false,
    "fixedCover": {
      "enable": false,
      "url": "cover-4"
    },
    "coverUrls": [],
    "nextGradientCover": true
  },
  "sidebar": {
    "author": "Flashingtw",
    "description": "喜歡研究演算法 熱愛程式的人",
    "social": {},
    "menu": []
  },
  "footer": {
    "since": 2026,
    "icon": {
      "name": "sakura rotate",
      "color": "var(--color-pink)"
    },
    "count": true,
    "powered": true,
    "icp": {
      "enable": false,
      "icpnumber": "津ICP备2022001375号",
      "icpurl": "https://beian.miit.gov.cn/"
    }
  },
  "tagCloud": {
    "startColor": "var(--grey-6)",
    "endColor": "var(--color-blue)"
  },
  "widgets": {
    "randomPosts": false,
    "recentComments": false,
    "recentCommentsLimit": 10
  },
  "comments": {
    "enable": false,
    "waline": {
      "serverURL": "",
      "lang": "zh-CN"
    }
  },
  "hyc": {
    "enable": false,
    "aiSummary": {
      "enable": true,
      "title": "AI 摘要",
      "showModel": true,
      "cardExcerptSource": "default"
    },
    "aiRecommend": {
      "enable": true,
      "limit": 3,
      "minSimilarity": 0.4
    }
  },
  "diagnostics": {
    "suppressFsWatcherMaxListenersWarning": true
  },
  "nyxPlayer": {
    "enable": false,
    "preset": "shokax",
    "darkModeTarget": ":root[data-theme=\"dark\"]",
    "urls": [
      {
        "name": "默认歌单",
        "url": "https://music.163.com/#/playlist?id=2943811283"
      }
    ]
  },
  "visibilityTitle": {
    "enable": false,
    "leaveTitle": "👀 你先忙，我等你回来~",
    "returnTitle": "🎉 欢迎回来！",
    "restoreDelay": 3000
  },
  "home": {
    "selectedCategories": [
      {
        "name": "Tutorial"
      },
      {
        "name": "Frontend"
      }
    ],
    "pageSize": 5,
    "title": {
      "behavior": "custom",
      "customTitle": "Flashingtw's Blog"
    }
  },
  "layout": {
    "mode": "three-column",
    "rightSidebar": {
      "order": [
        "announcement",
        "search",
        "calendar",
        "recentMoments",
        "tagCloud"
      ],
      "announcement": true,
      "search": true,
      "calendar": true,
      "recentMoments": true,
      "randomPosts": false,
      "tagCloud": true
    }
  },
  "friends": {
    "title": "朋友們!",
    "description": "朋友們都是大佬阿QAQ",
    "comments": false,
    "links": [
      {
        "author": "Robin Chiang",
        "avatar": "https://robin-tw.xyz/avatar.jpg",
        "desc": "望見那無垠的天空, 尋回那一天的答案",
        "siteImage": "https://robin-tw.xyz/assets/desktop-banner/6.webp",
        "title": "Robin's Blog",
        "url": "https://robin-tw.xyz/"
      },
      {
        "author": "Yimang",
        "avatar": "https://yimang.tw/images/avatar.webp",
        "desc": "分享科技教學、程式開發、加密貨幣與生活隨筆的個人部落格。內容涵蓋隱私網路、應用程式分享，遊記等主題，記錄學習筆記、實作經驗與技術探索。",
        "siteImage": "https://yimang.tw/images/default-cover.webp",
        "title": "Yimang's blog",
        "url": "https://yimang.tw/"
      }
    ]
  },
  "copyright": {
    "license": "CC-BY-NC-SA-4.0",
    "show": false
  }
});
