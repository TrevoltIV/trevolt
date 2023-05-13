





export default function Popularity(req, res) {
    const { posts } = req.body

    if (!posts[0].likes || !posts[0].comments.length || !posts[0].views || !posts[0].date) {
        console.log('Trevolt API Error: Post object is incomplete. Request must include an object with the following properties: likes (number), comments (array), views (number), date (number, unix time).')
        return res.status(400).json({ error: 'Post object incomplete' })
    }

    posts.forEach((post) => {
        if (typeof post.likes !== 'number' || typeof post.views !== 'number' || typeof post.date !== 'number' || !Array.isArray(post.comments)) {
            console.log('Trevolt API Error: One or more of the request object properties are of the wrong type. Request should be the following types: likes (number), comments (array), views (number), date (number, unix time).')
            return res.status(400).json({ error: 'Post data types are incorrect.' })
        }
    })

    let popularPosts = []

    posts.forEach((post) => {
        const currentDate = Date.now()
        const oneDay = 86400000
        const postDate = post.date

        const postLikes = post.likes
        const postComments = post.comments.length
        const postViews = post.views

        const postAge = currentDate - postDate / oneDay
        const postLikesRate = postLikes / postAge
        const postCommentsRate = (postComments / postAge) / 3
        
        const postRate = postLikesRate + postCommentsRate
        const postScore = postRate / postViews

        if (postAge < 0.2) {
            popularPosts.push({...post, score: postScore / 20000})
        } else {
            popularPosts.push({...post, score: postScore})
        }
    })

    popularPosts.sort((a, b) => b.score - a.score)
    return res.status(200).json(popularPosts)
}