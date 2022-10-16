// npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all

// npx dotenv sequelize db:seed:all

//heroku restart && heroku pg:reset DATABASE --confirm soundcloudproj && heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all

//heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all

//git push heroku main

router.get('/', async (req, res) => {
	let { page, size, title, createdAt } = req.query;

	if (!page || isNaN(page) || page <= 0) {
		page = 1;
	}
	if (!size || isNaN(size) || size <= 0) {
		size = 20;
	}

	if (size > 20) {
		size = 20;
	}

	page = Number(page);
	size = Number(size);

	const where = {};
	if (title) {
		where.title = title;
	}
	if (createdAt) {
		where.createdAt = createdAt;
	}

	if (number) {
		if (!isNaN(number) && number >= 1) {
			where.number = parseInt(number);
		} else {
			res.status(400);
			return res.json({
				errors: [
					{
						page: 'Page must be greater than or equal to 1',
						size: 'Size must be greater than or equal to 1',
						createdAt: 'CreatedAt is invalid',
					},
				],
			});
		}
	}

  // const user = await Song.findAll({
	// 	include: {
	// 		model: User,
	// 		attributes: ['id', 'username', 'previewImage'],
	// 	},

	const song = await Song.findAll({
		where,
		limit: size,
		offset: size * (page - 1),
	});
	return res.json({
		songs,
		page,
		size,
	});
});
