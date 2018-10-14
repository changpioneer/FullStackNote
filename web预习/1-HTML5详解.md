**一、H5新标签的兼容问题**

H5的新标签在谷歌等浏览器是可以支持的，但是IE不支持。为了兼容IE浏览器，有两种解决方式。

***解决方法一：***
在该标签的CSS中设置该标签display: block;然后通过DOM的方式创建这个标签document.createElement("header");

```
<style type="text/css">
        header{
            width: 100%;
            height: 100px;
            background-color: red;
            font-size: 50px;
            text-align: center;
            display: block;
        }
    </style>
    <script type="text/javascript">
        document.createElement("header");
    </script>
```

***解决方法二：***
引入外部的html5shiv.js文件，
`<script src="html5shiv.js"></script>`

但是谷歌浏览器是支持的，所以加入html5shiv.js文件是多余的。所以加入以下代码，如果是IE8就请求这个文件，如果是其他的就不请求这个文件。
cc:ie6 + tab键 

```
</head>
    <!--如果浏览器小于IE8就执行里面的代码，并且该命令只针对IE浏览器-->
    <!--[if lte IE 8]>
        <script src="html5shiv.js"></script>
    <![endif]-->
<body>
```

**二、H5中的多媒体标签**

***1、音频标签***
谷歌浏览器不支持autoplay属性；

`<audio src="火影.mp3" controls autoplay loop></audio>`

audio标签的属性：
![audio属性](https://github.com/changpioneer/FullStackNote/blob/master/picture/audio_pro.png)

***2、视频标签***
谷歌浏览器不支持autoplay属性，但是加上muted属性后可以自动播放，但是视频是静音的；

`<video src="火影.mp3" muted controls autoplay loop></video>`

video标签的属性：
![video属性](https://github.com/changpioneer/FullStackNote/blob/master/picture/video_pro.png)









