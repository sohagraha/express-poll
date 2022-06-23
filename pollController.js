const Poll = require('./Poll');

exports.renderHome = (req, res, next) => {
    res.render('home');
}

exports.createPollController = (req, res, next) => {
    res.render('create')
}

exports.createPollPostController = async (req, res, next) => {
    let { title, description, options } = req.body;
    options = options.map(option => {
        return obj = {
            name: option,
            vote: 0
        }
    })
    const poll = new Poll({
        title,
        description,
        options
    });
    try {
        await poll.save();
        res.redirect('/polls');
    } catch (err) {
        console.log(err);
    }

    res.render('create');
}

exports.renderPolls = async (req, res, next) => {
    try {
        let polls = await Poll.find();
        res.render('polls', { polls });
    }
    catch (err) {
        console.log(err);
    }
}

exports.getSinglePoll = async (req, res, next) => {
    try {
        let poll = await Poll.findById(req.params.id);
        let options = [...poll.options];
        let result = [];
        options.forEach(option => {
            let percentage = (option.vote / poll.totalVote) * 100;
            result.push({
                ...option._doc,
                percentage: percentage ? percentage : 0
            })
        });
        res.render('viewPoll', { poll, result });
    }
    catch (err) {
        console.log(err);
    }
}
exports.postSinglePoll = async (req, res, next) => {
    let id = req.params.id
    let optionId = req.body.option
    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]

        let index = options.findIndex(o => o.id === optionId)
        options[index].vote = options[index].vote + 1

        let totalVote = poll.totalVote + 1

        await Poll.findOneAndUpdate(
            { _id: poll._id },
            { $set: { options, totalVote } }
        )

        res.redirect('/poll/' + id)

    } catch (e) {
        console.log(e)
    }
}