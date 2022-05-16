function getParameterObj(subreddits, max, filter) {
	var param = {};
	if (subreddits) {
		if (subreddits.includes(",")) {
			subreddits = subreddits.split(",");

			var tempLastIds = {};
			var tempSubreddits = [];

			subreddits.forEach((sr) => {
				if (sr.includes(":")) {
					var split = sr.split(":");
					var p1 = split[0];
					var p2 = split[1];

					tempSubreddits.push(p1);
					tempLastIds[p1] = p2;
				} else {
					tempSubreddits.push(sr);
				}
			});
		}

		param.subreddits = tempSubreddits;
		param.lastIDs = tempLastIds;
	}
	if (max) {
		param.max = parseInt(max);
	}
	if (filter) {
		param.filter = filter;
	}
	return param;
}

export default getParameterObj;
