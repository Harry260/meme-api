# Memes Api

<h1 align="center">
   <br>
    <img src="./public/images/icon.png" alt="Bob The Bot" width="200">
   <br>
   Memable API<br>
</h1>

<h4 align="center">
    Memable is a Meme Explorer website (im working on) and this is a prototype of the API i created for it. It is powered by Rddit!
</h4>

<h4 align="center">
<img src="./public/images/Reddit-Logo.png" alt="Bob The Bot" width="200">
</h4>

<hr>

## Table of content

-   [Usage](#usage)
-   [Endpoints](#endpoints)
-   [Deploy](#deploy)
-   [Support](#show-your-support)

<br>

## Usage

### Clone the repo

```bat
git clone https://github.com/harry260/meme-api
```

#### Install dependencies

```bat
npm install
```

### Run the server

```bat
npm start
```

<br>

## Endpoints

### `/memes`

```
/memes?subreddits=<subreddit1>,<subreddit>:<last_post_id>&filter=<filter>&max=<max>
```

| Parameter  | Description                                                                               | Example                                               |
| ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| subreddits | Comma separated list of subreddits. Use colon to separate if you need to set last post id | subreddits=wholesomememes:`lastIdLOL`,memes,dankmemes |
| filter     | Add filter (`hot`\|`top`\|`new`\|`controversial` \| `raising`)                            | filter=hot                                            |
| max        | Maximum number of memes from each subreddit. Doesn't mean the exact count.                | max=50                                                |

````

#### Example request & response

```bat
/memes?subreddits=memes,dankmemes:uc569x,wholesomememes&filter=hot&max=69
````

<a href="./example-response.json">

| Example response |
| ---------------- |

</a>
<br>

## Deploy

You can deploy this to either Vercel or Railway or any other hosting service.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/eG-c3u?referralCode=Xot9yF)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fharry260%2Fmeme-api&project-name=memeable-api&repo-name=meme-api-repo)

## Show your support

Show your support by 🌟 Starring this repo or buy me a coffee!
<br><br>
<a href="https://www.buymeacoffee.com/harrytom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a><br>
<br>
