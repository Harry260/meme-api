import axios from "axios";

const Reddit = {
	getUserInfo: (username) => {
		if (username === "[deleted]") {
			var deletedInfo = {
				data: {
					subreddit: {
						title: "Deleted User",
						icon_img: "https://www.redditstatic.com/icon.png",
						public_description: "This user has been deleted.",
					},
					name: "[deleted]",
				},
			};

			return new Promise(function (resolve, reject) {
				resolve(deletedInfo);
			});
		}

		var url = `https://www.reddit.com/user/${username}/about.json`;
		return axios.get(url).then((response) => {
			return response.data;
		});
	},
};

export default Reddit;
