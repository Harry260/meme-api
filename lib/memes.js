import axios from "axios";
import Reddit from "./reddit.js";

class Memes {
	constructor(config = {}) {
		// Create an array of one element if parameter is passed as string
		if (typeof config.subreddits === "string") {
			config.subreddits = [config.subreddits];
		}

		// Set maxiuum memes
		this.max = config.max ?? 10;

		var availableFilters = ["top", "hot", "new", "controversial", "rising"];

		this.filter = availableFilters.includes(config.filter)
			? config.filter
			: false;

		// Set the subreddit
		this.subreddits = config.subreddits ?? [
			"memes",
			"dankmemes",
			"wholesomememes",
		];
	}

	getMultipleSubreddits(callback, lastIds = {}) {
		var subreddits = this.subreddits;
		var result = {};

		console.log("Fetching data from subreddits: ", subreddits);
		subreddits.forEach((subreddit, index) => {
			var last = lastIds[subreddit] ?? false;
			var processedRedditcount = index + 1;

			this.getSubreddit(
				subreddit,
				(data) => {
					result[subreddit] = data;
					if (processedRedditcount === subreddits.length) {
						var finalResult = {
							success: true,
							data: result,
							properties: {
								subreddits: subreddits,
								max: this.max,
								filter: this.filter,
							},
						};

						this._callback(callback, finalResult);
					}
				},
				last
			);
		});
	}

	getSubreddit(subreddit, callback, lastid) {
		var memes = [];
		var url = this._getApiUrl(subreddit, lastid);

		this._fetchData(url, (result) => {
			var data = result.data;
			var processeMemeCount = 0;

			if (result.success) {
				data.map((meme) => {
					processeMemeCount++;
					meme = meme.data;

					if (!meme.url.endsWith(".jpg")) {
						return;
					}
					var memeResult = {
						id: meme.id,
						title: meme.title,
						url: meme.url,
						subreddit: meme.subreddit,
						ups: meme.ups,
						downs: meme.downs,
						score: meme.score,
						created: meme.created,
						NSFW: meme.over_18,
						spoiler: meme.spoiler,
						permalink: meme.permalink,
					};

					Reddit.getUserInfo(meme.author).then((authorResult) => {
						authorResult = authorResult.data;
						var sr = authorResult.subreddit || {};

						var name = sr.title;
						var profile = sr.icon_img;
						var id = authorResult.name;
						var description =
							sr.public_description ?? "I love reddit!";

						memeResult.author = {
							name,
							profile,
							id,
							description,
						};

						memes.push(memeResult);
						if (processeMemeCount === data.length) {
							this._callback(callback, memes);
						}
					});
				});
			}
		});
	}

	_getAuthorInfo(author, callback) {
		this._fetchData(
			`https://www.reddit.com/user/${author}/about.json`,
			(result) => {
				if (result.error === 404) {
					this._callback(callback, {
						success: false,
						error: "User not found!",
					});
				} else {
					this._callback(callback, {
						success: true,
						data: result.data,
					});
				}
			}
		);
	}

	_fetchData(url, cb) {
		axios
			.get(url)
			.then((response) => {
				const data = response.data.data.children;
				if (data.length === 0) {
					cb({
						success: false,
						data: "No such subreddit, or it may be private!",
					});
				} else {
					cb({
						success: true,
						data: data,
					});
				}
			})
			.catch((error) => console.log(error));
	}

	_callback(e, t) {
		var data = t ?? {};
		const cb = e ?? false;
		if (typeof cb === "function") {
			cb(data);
		}
	}

	_getApiUrl(subreddit, lId) {
		var filter = this.filter;

		if (subreddit) {
			var params = {};

			if (lId) {
				params.after = lId;
			}
			params.limit = this.max;

			const sp = new URLSearchParams(params);

			var url = `https://www.reddit.com/r/${subreddit}${
				filter ? `/${filter}` : ""
			}.json?${sp}`;

			console.log("Fetching data from URL: ", url);
			return url;
		} else {
			return `https://www.reddit.com/r/memes.json?${this.max}`;
		}
	}
}

export default Memes;
