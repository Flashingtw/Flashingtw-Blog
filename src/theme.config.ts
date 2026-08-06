import { defineConfig, type FriendLinkConfig } from "./toolkit/themeConfig";
import { isThemeColorValue } from "./toolkit/themeColor";
import friendsList from "./assets/friends.json";

const configuredFriends: FriendLinkConfig[] = friendsList.map((friend) => {
  const configuredFriend: FriendLinkConfig = {
    url: friend.url,
    title: friend.title,
    desc: friend.desc,
    author: friend.author,
    avatar: friend.avatar,
    siteImage: friend.siteImage,
  };

  if (friend.color && isThemeColorValue(friend.color)) {
    configuredFriend.color = friend.color;
  }

  return configuredFriend;
});

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
    "siteCreatedAt": "2026-07-06T00:00:00Z",
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
    "links": configuredFriends,
  },
  
  "copyright": {
    "license": "CC-BY-NC-SA-4.0",
    "show": false
  }
});
