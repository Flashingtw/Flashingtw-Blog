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
    "logo": ""
  },
  "cover": {
    "enable": true,
    "preload": true,
    "advancedCarousel": true,
    "fixedCover": {
      "enable": false,
      "url": "cover-1"
    },
    "coverUrls": [],
    "nextGradientCover": true
  },
  "sidebar": {
    "author": "Flashingtw",
    "description": "喜歡研究演算法 熱愛程式的人",
    "social": {
      "github": {
        "url": "https://github.com/Flashingtw",
        "icon": "i-ri-github-fill"
      },
      "email": {
        "url": "mailto:0624joshua@gmail.com",
        "icon": "i-ri-mail-line"
      },
      "Instagram": {
        "url": "https://www.instagram.com/dacsc_flash.zcx/",
        "icon": "i-ri-instagram-line"
      },
      "Threads": {
        "url": "https://www.threads.com/@flash.zcx",
        "icon": "i-ri-threads-line"
      }
    },
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
    "startColor": "#faa332",
    "endColor": "#F8C8DC"
  },
  "widgets": {
    "randomPosts": true,
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
        "cover": "assets/cp.jpg",
        "name": "題解"
      },
      {
        "cover": "assets/exp.jpg",
        "name": "心得"
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
    "description": "是大佬，這裡全部都是大佬!",
    "comments": false,
    "links": [
      {
        "author": "大安電資",
        "avatar": "https://cdn.discordapp.com/attachments/1524439663044071574/1524443072509771909/dacsssc.png?ex=6a4fc3bf&is=6a4e723f&hm=aeb2de50eba4a280e5d0baeecca0aa21e008015b3af6c1a67b7605d18c017ba6&",
        "desc": "DACSSSC | 大安高工電資社群",
        "color": "#ffe203",
        "siteImage": "https://cdn.discordapp.com/attachments/1524439663044071574/1524443072509771909/dacsssc.png?ex=6a4fc3bf&is=6a4e723f&hm=aeb2de50eba4a280e5d0baeecca0aa21e008015b3af6c1a67b7605d18c017ba6&",
        "title": "大安電資Discord Server",
        "url": "https://discord.gg/7k6GeHGH3"
      },
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
        "color": "#fd9b4b",
        "desc": "分享科技教學、程式開發、加密貨幣與生活隨筆的個人部落格。內容涵蓋隱私網路、應用程式分享，遊記等主題，記錄學習筆記、實作經驗與技術探索。",
        "siteImage": "https://yimang.tw/images/default-cover.webp",
        "title": "Yimang's blog",
        "url": "https://yimang.tw/"
      },
      {
        "author": "Sean Hawks",
        "avatar": "https://cdn.discordapp.com/attachments/1524439663044071574/1524439686834163854/image.png?ex=6a4fc098&is=6a4e6f18&hm=2ca97dc02129b2dd074fdb204cbafc6744fe2a270a969d206dc620bb252cf18e&",
        "desc": "Coding helps me survive; music makes me feel alive.",
        "siteImage": "https://cdn.discordapp.com/attachments/1524439663044071574/1524440186434490540/image.png?ex=6a4fc10f&is=6a4e6f8f&hm=e9233669a256fa7822471014930aac142471285278b8213a5d7c3fe4b3d5e3c5&",
        "title": "hawks.tw",
        "url": "hawks.tw",
        "color": "#97a4de"
      },
      {
        "author": "匿名用戶9487",
        "avatar": "https://cdn.discordapp.com/attachments/1524439663044071574/1524711893732819044/image.png?ex=6a50be1b&is=6a4f6c9b&hm=ecb9559df7e8ae64afe83a8e93ad84e2b6a6c26820065c3eec80e1cdbb9cfddd&",
        "desc": "井底的笨貓",
        "siteImage": "https://cdn.discordapp.com/attachments/1524439663044071574/1524711926108520539/image.png?ex=6a50be22&is=6a4f6ca2&hm=a4afd0f5246137cf63abc7e6bdb0ebbea1c235e8ea22f2329df5b367c20384f7&",
        "title": "匿名的貓貓",
        "url": "https://qwo877.github.io/me/",
        "color": "#d3aa8d"
      },
      {
        "author": "shrimp2845",
        "avatar": "https://cdn.discordapp.com/attachments/1524439663044071574/1524733802503606372/image.png?ex=6a50d282&is=6a4f8102&hm=2bbad259ee56789154ff336cf841166671cba9a3f7d505bc0ee23856e448d43f&",
        "desc": "ohhi?",
        "siteImage": "https://cdn.discordapp.com/attachments/1524439663044071574/1524733802994204702/image.png?ex=6a50d282&is=6a4f8102&hm=7a0bc04ed82839b566fb69a5ccfddea72ee86b2652279483b9e1df8a565d989b&",
        "title": "SHRIMP2845 の BLOG",
        "url": "https://shrimp2845-tw.github.io",
        "color": "#e6a1ff"
      }
    ]
  },
  
  "copyright": {
    "license": "CC-BY-NC-SA-4.0",
    "show": false
  }
});
