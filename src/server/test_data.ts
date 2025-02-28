import Model from './model/Model'

function random_img(is_thread: boolean) {

    const has_img = Math.round((Math.random()))

    if (has_img || is_thread) {
        const random_num = Math.floor((Math.random() * 11))
        return `/assets/dev/thread${random_num}.jpg`
    } else {
        return ""
    }
}

async function create_test_data() {

    const boards = ['test', 'someboard', 'fooboard']
    const AppModel = new Model(100, 300, boards)
    await AppModel.initModel()

    for (let board of boards) {

        // Create a bunch of threads
        for (let thread_id, i = 0; i < 95; i++) {
            thread_id = await AppModel.createThread(
                `#${i} thread`,
                "no subject",
                `i am the OP of thread ${i}`,
                random_img(true),
                board
            )

            // Create a bunch of posts for each thread
            for (let j = 0; j < 50; j++) {
                await AppModel.createPost(
                    `#${j} post in thread: ${i}`,
                    `this is post ${j} in thread ${i}`,
                    random_img(false),
                    board,
                    thread_id
                )
            }
        }
    }


}

export default create_test_data